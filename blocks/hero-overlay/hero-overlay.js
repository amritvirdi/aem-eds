export default function decorate(block) {
  [...block.children].forEach((row) => {
    if (row.querySelector('picture')) {
      row.classList.add('hero-overlay-image');
    } else {
      row.classList.add('hero-overlay-content');
    }
  });

  if (!block.querySelector('.hero-overlay-image')) {
    block.classList.add('no-image');
  }
}
