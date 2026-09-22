/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://wknd-trendsetters.site/about-us
 * Generated: 2026-09-22
 *
 * Cards convention: first row = block name; each subsequent row = one card with
 * cell 1 = image and cell 2 = text (tag, date, heading). Each source card is an
 * <a> wrapping an image div and a body div; the card link is preserved around
 * the text content so the whole card remains clickable.
 */
export default function parse(element, { document }) {
  // Each direct child anchor is one article card.
  const cards = element.querySelectorAll(':scope > a.article-card, :scope > a.card-link, :scope > a');

  const cells = [];
  cards.forEach((card) => {
    const img = card.querySelector('.article-card-image img, img');
    const body = card.querySelector('.article-card-body');

    // Skip fully empty cards.
    if (!img && !body) return;

    // Image cell.
    const imageCell = img || '';

    // Text cell: keep the card link wrapping the body content so the card stays linked.
    let textCell = '';
    if (body) {
      const href = card.getAttribute('href');
      if (href) {
        const link = document.createElement('a');
        link.href = href;
        link.append(...body.childNodes);
        textCell = link;
      } else {
        textCell = Array.from(body.childNodes);
      }
    }

    cells.push([imageCell, textCell]); // image cell + text cell
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
