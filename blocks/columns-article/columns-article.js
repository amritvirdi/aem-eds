export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-article-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-article-img-col');
        }
      } else {
        // text cell: breadcrumbs, heading, byline metadata
        col.classList.add('columns-article-text');
      }
    });
  });
}
