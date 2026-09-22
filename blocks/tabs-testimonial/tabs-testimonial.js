// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

function groupText(scope) {
  // Wrap the non-image <p> elements into a single text wrapper so the
  // image/text pair can be laid out (and vertically centered) as two columns.
  const ps = [...scope.querySelectorAll(':scope > p')];
  const imageP = ps.find((p) => p.querySelector('picture, img'));
  const textPs = ps.filter((p) => p !== imageP);
  if (!textPs.length) return;
  const textWrap = document.createElement('div');
  textWrap.className = 'tabs-testimonial-text';
  textPs.forEach((p) => textWrap.append(p));
  scope.append(textWrap);
}

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-testimonial-list';
  tablist.setAttribute('role', 'tablist');

  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel (the row becomes the panel; keeps only the content cell)
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-testimonial-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-testimonial-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    groupText(button);

    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();

    // after removing the tab (label) cell, the remaining cell is the content
    const content = tabpanel.querySelector(':scope > div');
    if (content) groupText(content);
  });

  // source layout: active panel ABOVE the tab menu
  block.append(tablist);
}
