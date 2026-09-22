/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay. Base: hero.
 * Source: https://wknd-trendsetters.site/about-us
 * Generated: 2026-09-22
 *
 * Hero convention (1 column, 3 rows): row 1 = block name; row 2 = background
 * image; row 3 = heading + subheading + CTA. Each content row is a single cell.
 * The hero-overlay block JS keys off a picture in the first content row, so the
 * background image must be its own row.
 */
export default function parse(element, { document }) {
  // Background image: the full-bleed cover/overlay image.
  const bgImage = element.querySelector('img.utility-overlay, img[class*="overlay"], img.cover-image, img');

  // Overlaid content: heading, subheading, and CTA button.
  const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
  const subheading = element.querySelector('p, .subheading, [class*="subheading"]');
  const ctas = Array.from(element.querySelectorAll('.button-group a, a.button'));

  const cells = [];

  // Row 2: background image (single cell), only if present.
  if (bgImage) cells.push([bgImage]);

  // Row 3: heading + subheading + CTA all in one cell.
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctas);

  // Empty-block guard.
  if (!bgImage && contentCell.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push([contentCell]); // 1-column content row: one cell holding all elements

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
