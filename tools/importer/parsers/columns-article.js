/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns.
 * Source: https://wknd-trendsetters.site/about-us
 * Generated: 2026-09-22
 *
 * Columns convention: first row = block name; content rows hold one cell per
 * column. Single content row with two columns:
 *   Left cell: cover image.
 *   Right cell: breadcrumb links + heading + author/date byline text.
 */
export default function parse(element, { document }) {
  // Outer grid-layout has two direct child divs: [0] image column, [1] metadata column.
  const columns = element.querySelectorAll(':scope > div');
  const imageCol = columns[0] || null;
  const metaCol = columns[1] || null;

  // Left (image) cell.
  const leftCell = imageCol ? Array.from(imageCol.querySelectorAll('img')) : [];

  // Right (metadata) cell: breadcrumbs, heading, and byline blocks preserved in order.
  const rightCell = metaCol ? Array.from(metaCol.children) : [];

  // Empty-block guard.
  if (leftCell.length === 0 && rightCell.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cells.push([leftCell, rightCell]); // one content row, two columns

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
