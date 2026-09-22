/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://wknd-trendsetters.site/about-us
 * Generated: 2026-09-22
 *
 * Accordion convention: first row = block name; each subsequent row = one item
 * with cell 1 = title/question and cell 2 = content/answer. Each source item is
 * a <details> with a <summary> (question, plus a decorative +/- icon) and a
 * .faq-answer body.
 */
export default function parse(element, { document }) {
  // Each direct child <details> is one FAQ item.
  const items = element.querySelectorAll(':scope > details.faq-item, :scope > details, details.faq-item');

  const cells = [];
  items.forEach((item) => {
    const summary = item.querySelector('summary, .faq-question');
    const answer = item.querySelector('.faq-answer');

    // Skip fully empty items.
    if (!summary && !answer) return;

    // Title cell: the question text only (drop the decorative toggle icon).
    let titleCell = '';
    if (summary) {
      const questionText = summary.querySelector('span');
      titleCell = questionText || summary.textContent.trim();
    }

    // Content cell: the answer body content.
    const contentCell = answer ? Array.from(answer.childNodes) : '';

    cells.push([titleCell, contentCell]); // title cell + content cell
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
