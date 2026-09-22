/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters site-wide cleanup.
 * Removes non-authorable site chrome so the import contains only page-level
 * authorable content. All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Breadcrumbs live inside the article-header section (columns-article block).
    // Verified in cleaned.html: <div class="breadcrumbs"> ... </div>
    // Remove before block parsing so it never lands in a block cell.
    WebImporter.DOMUtils.remove(element, [
      '.breadcrumbs', // verified: article-header section navigation, non-authorable
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome. Selectors verified in cleaned.html:
    //   <a href="#main-content" class="skip-link">
    //   <div class="navbar"> ... nav / mega menu ...
    //   <footer class="footer inverse-footer"> ...
    WebImporter.DOMUtils.remove(element, [
      'a.skip-link', // verified: skip-to-content link
      '.navbar', // verified: top navigation bar + mega menu
      'nav.nav-menu', // verified: nested nav menu (defensive)
      'footer', // verified: site footer
    ]);
  }
}
