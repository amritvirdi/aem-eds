import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * contributor: writer/photographer details card.
 * Authoring (one contributor per block instance):
 *   Row 1: avatar image
 *   Row 2: name
 *   Row 3: title / role (e.g. "Photographer")
 * Supports multiple contributors by using one row per person with
 * cells [avatar | name | title].
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Multi-cell layout: each row is one contributor (avatar | name | title)
  const multiPerRow = rows.length > 0 && rows[0].children.length >= 2;

  const people = [];
  if (multiPerRow) {
    rows.forEach((row) => {
      const cells = [...row.children];
      people.push({
        avatar: cells.find((c) => c.querySelector('picture, img')),
        name: cells.find((c) => !c.querySelector('picture, img') && c.textContent.trim()),
        title: cells.filter((c) => !c.querySelector('picture, img') && c.textContent.trim())[1],
      });
    });
  } else {
    // Stacked layout: row1 avatar, row2 name, row3 title
    people.push({
      avatar: rows[0],
      name: rows[1],
      title: rows[2],
    });
  }

  const list = document.createElement('ul');
  list.className = 'contributor-list';

  people.forEach((p) => {
    const li = document.createElement('li');
    li.className = 'contributor-card';

    if (p.avatar) {
      const avatar = document.createElement('div');
      avatar.className = 'contributor-avatar';
      const img = p.avatar.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '200' }]);
        avatar.append(pic);
      }
      li.append(avatar);
    }

    const body = document.createElement('div');
    body.className = 'contributor-body';
    if (p.name && p.name.textContent.trim()) {
      const nameEl = document.createElement('p');
      nameEl.className = 'contributor-name';
      nameEl.textContent = p.name.textContent.trim();
      body.append(nameEl);
    }
    if (p.title && p.title.textContent.trim()) {
      const titleEl = document.createElement('p');
      titleEl.className = 'contributor-title';
      titleEl.textContent = p.title.textContent.trim();
      body.append(titleEl);
    }
    li.append(body);
    list.append(li);
  });

  block.textContent = '';
  block.append(list);
}
