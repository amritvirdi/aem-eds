/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-intro. Base: columns.
 * Source: https://wknd-trendsetters.site/about-us
 * Generated: 2026-09-22
 *
 * Columns convention: first row = block name; content rows hold one cell per
 * column. Here a single content row has two columns:
 *   Left cell: heading + subheading paragraph + two CTA buttons.
 *   Right cell: three stacked images.
 */
export default function parse(element, { document }) {
  // Outer grid-layout has two direct child divs: [0] text column, [1] image-stack column.
  const columns = element.querySelectorAll(':scope > div');
  const textCol = columns[0] || null;
  const imageCol = columns[1] || null;

  // Left (text) cell: heading, subheading, CTA buttons.
  const leftCell = [];
  const heading = textCol && textCol.querySelector('h1, h2, h3, [class*="heading"]');
  if (heading) leftCell.push(heading);
  const subheading = textCol && textCol.querySelector('p, .subheading, [class*="subheading"]');
  if (subheading) leftCell.push(subheading);
  const ctas = textCol
    ? Array.from(textCol.querySelectorAll('.button-group a, a.button'))
    : [];
  leftCell.push(...ctas);

  // Right (image) cell: all stacked images.
  const rightCell = imageCol ? Array.from(imageCol.querySelectorAll('img')) : [];

  // Empty-block guard.
  if (leftCell.length === 0 && rightCell.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cells.push([leftCell, rightCell]); // one content row, two columns

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-intro', cells });
  element.replaceWith(block);
}
