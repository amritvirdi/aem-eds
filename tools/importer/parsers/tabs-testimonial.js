/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base: tabs.
 * Source: https://wknd-trendsetters.site/about-us
 * Generated: 2026-09-22
 *
 * Tabs convention: first row = block name; each subsequent row = one tab with
 * cell 1 = tab label and cell 2 = tab content. Here each row pairs a tab-menu
 * button (avatar + name + role) as the label with its matching tab pane
 * (photo + name + role + quote) as the content, paired by index.
 */
export default function parse(element, { document }) {
  // Tab panes hold the switchable content; tab-menu buttons hold the labels.
  const panes = Array.from(element.querySelectorAll('.tabs-content .tab-pane, .tab-pane'));
  const buttons = Array.from(element.querySelectorAll('.tab-menu .tab-menu-link, .tab-menu button, button.tab-menu-link'));

  const cells = [];
  const count = Math.max(panes.length, buttons.length);
  for (let i = 0; i < count; i += 1) {
    const button = buttons[i];
    const pane = panes[i];

    // Label cell: the button's inner content (avatar + name + role).
    const labelCell = button ? Array.from(button.children) : [];
    // Content cell: the pane's inner content (photo + name + role + quote).
    const contentCell = pane ? Array.from(pane.children) : [];

    // Skip fully empty tab rows.
    if (labelCell.length === 0 && contentCell.length === 0) continue;

    cells.push([labelCell, contentCell]); // two-column tab row: label + content
  }

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
