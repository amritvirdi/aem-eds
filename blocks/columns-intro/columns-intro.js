export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-intro-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pictures = col.querySelectorAll('picture');

      // image cell: one or more pictures, no text
      if (pictures.length && !col.querySelector('h1, h2, h3, h4, h5, h6')) {
        col.classList.add('columns-intro-img-col');
        if (pictures.length > 1) col.classList.add('columns-intro-img-stack');
        return;
      }

      // text cell: headings and/or CTA links, no picture
      if (!pictures.length && (col.querySelector('h1, h2, h3') || col.querySelector('a'))) {
        col.classList.add('columns-intro-text');

        // group standalone CTA links (a paragraph whose only child is a link)
        const ctaParas = [...col.querySelectorAll(':scope > p')].filter(
          (p) => p.childNodes.length === 1
            && p.firstElementChild
            && p.firstElementChild.tagName === 'A',
        );

        if (ctaParas.length) {
          const group = document.createElement('div');
          group.className = 'columns-intro-cta';
          ctaParas[0].before(group);
          ctaParas.forEach((p, i) => {
            const a = p.querySelector('a');
            a.classList.add('button', i === 0 ? 'primary' : 'secondary');
            group.append(a);
            p.remove();
          });
        }
      }
    });
  });
}
