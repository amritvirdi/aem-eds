/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards.
 * Source: https://wknd-trendsetters.site/about-us
 * Generated: 2026-09-22
 *
 * Custom image-only gallery variant of cards: first row = block name; each
 * subsequent row = one card. Cards carry an image and no text, so each row has
 * a single image cell. The cards-gallery block JS marks single-image cells as
 * card-image tiles.
 */
export default function parse(element, { document }) {
  // Each direct child div is one square tile wrapping a single image.
  const tiles = element.querySelectorAll(':scope > div');

  const cells = [];
  tiles.forEach((tile) => {
    const img = tile.querySelector('img');
    if (img) cells.push([img]); // single-cell (image-only) card row
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
