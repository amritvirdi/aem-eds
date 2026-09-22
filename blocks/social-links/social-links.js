import { decorateIcons } from '../../scripts/aem.js';

/**
 * social-links: renders a row of social media icon links.
 * Authoring: each row is `platform | url` (e.g. `Facebook | https://...`).
 * The platform name maps to an /icons/<platform>.svg icon.
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'social-links-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const platform = (cells[0]?.textContent || '').trim();
    if (!platform) return;
    const name = platform.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // URL can be an authored link or plain text in the second cell
    const link = cells[1]?.querySelector('a');
    const href = link ? link.getAttribute('href') : (cells[1]?.textContent || '#').trim() || '#';

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.title = platform;
    a.setAttribute('aria-label', platform);
    if (href.startsWith('http')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    const icon = document.createElement('span');
    icon.className = `icon icon-${name}`;
    a.append(icon);
    li.append(a);
    list.append(li);
  });

  block.textContent = '';
  block.append(list);
  decorateIcons(block);
}
