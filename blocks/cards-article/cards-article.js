import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * cards-article: 4-column grid of linked article cards.
 * Each authored row has an image cell and a body cell whose link text is
 * mashed as "{tag} {date}### {title}" (e.g. "Casual Cool May 12### Tennis style, redefined").
 * We split that into a tag pill, a date, and an uppercase heading, and make
 * the whole card a single link (matching the source design).
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const picture = row.querySelector('picture');
    const link = row.querySelector('a');
    const href = link ? link.getAttribute('href') : '#';

    // Parse the mashed link text: "{tag} {date}### {title}"
    const raw = (link ? link.textContent : '').trim();
    const [metaPart, ...titleParts] = raw.split('###');
    const title = titleParts.join('###').trim();

    // From metaPart, pull trailing date "Mon DD" (e.g. "May 12"); rest is the tag.
    let tag = metaPart.trim();
    let date = '';
    const dateMatch = tag.match(/\s+([A-Z][a-z]+\.?\s+\d{1,2})$/);
    if (dateMatch) {
      date = dateMatch[1].trim();
      tag = tag.slice(0, dateMatch.index).trim();
    }

    // Build the card as a single link
    const card = document.createElement('a');
    card.className = 'cards-article-card';
    card.href = href;

    const imgWrap = document.createElement('div');
    imgWrap.className = 'cards-article-card-image';
    if (picture) imgWrap.append(picture);
    card.append(imgWrap);

    const body = document.createElement('div');
    body.className = 'cards-article-card-body';

    const meta = document.createElement('div');
    meta.className = 'cards-article-card-meta';
    if (tag) {
      const tagEl = document.createElement('span');
      tagEl.className = 'cards-article-tag';
      tagEl.textContent = tag;
      meta.append(tagEl);
    }
    if (date) {
      const dateEl = document.createElement('span');
      dateEl.className = 'cards-article-date';
      dateEl.textContent = date;
      meta.append(dateEl);
    }
    if (meta.children.length) body.append(meta);

    if (title) {
      const h = document.createElement('h3');
      h.textContent = title;
      body.append(h);
    }

    card.append(body);
    li.append(card);
    ul.append(li);
  });

  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
