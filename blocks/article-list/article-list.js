import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * article-list: dynamically lists magazine articles from the query index.
 *
 * Reads /query-index.json (generated per helix-query.yaml) and renders every
 * entry whose path is under /magazine/ (excluding the magazine landing page),
 * newest first when a `date` field is present.
 *
 * Optional authoring config (first cell of first row):
 *   - a path prefix to filter by (default `/magazine/`)
 *   - a number to limit the count
 */
async function fetchIndex(indexPath = '/magazine/query-index.json') {
  // Production serves content at the site root, so the absolute index path is
  // correct there. Some local dev setups serve content under a "/content"
  // prefix, so fall back to that if the root path is unavailable.
  const candidates = [indexPath];
  if (window.location.pathname.startsWith('/content/')) {
    candidates.unshift(`/content${indexPath}`);
  } else {
    candidates.push(`/content${indexPath}`);
  }

  for (let i = 0; i < candidates.length; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const resp = await fetch(candidates[i]);
      if (resp.ok) {
        // eslint-disable-next-line no-await-in-loop
        const json = await resp.json();
        return Array.isArray(json.data) ? json.data : [];
      }
    } catch (e) {
      // try next candidate
    }
  }
  return [];
}

export default async function decorate(block) {
  // Read optional config from authored cells before clearing the block.
  let prefix = '/magazine/';
  let limit = 0;
  [...block.querySelectorAll('div')].forEach((cell) => {
    const text = cell.textContent.trim();
    if (/^\//.test(text)) prefix = text;
    else if (/^\d+$/.test(text)) limit = parseInt(text, 10);
  });

  block.textContent = '';

  const data = await fetchIndex();
  let articles = data
    .filter((item) => item.path && item.path.startsWith(prefix))
    // exclude the section landing page itself (e.g. /magazine or /magazine/)
    .filter((item) => item.path.replace(/\/$/, '') !== prefix.replace(/\/$/, ''));

  // newest first when dates are available. `date` may be an ISO string
  // (e.g. "2024-05-12") or a numeric timestamp; fall back to lastModified.
  const toTime = (item) => {
    if (item.date) {
      const t = Date.parse(item.date);
      if (!Number.isNaN(t)) return t;
      const n = parseInt(item.date, 10);
      if (!Number.isNaN(n)) return n;
    }
    return parseInt(item.lastModified, 10) || 0;
  };
  articles.sort((a, b) => toTime(b) - toTime(a));

  if (limit > 0) articles = articles.slice(0, limit);

  if (articles.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'article-list-empty';
    empty.textContent = 'No articles published yet.';
    block.append(empty);
    return;
  }

  const list = document.createElement('ul');
  list.className = 'article-list-items';

  articles.forEach((article) => {
    const li = document.createElement('li');
    const card = document.createElement('a');
    card.className = 'article-list-card';
    card.href = article.path;

    if (article.image) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'article-list-image';
      const pic = createOptimizedPicture(article.image, article.title || '', false, [{ width: '750' }]);
      imgWrap.append(pic);
      card.append(imgWrap);
    }

    const body = document.createElement('div');
    body.className = 'article-list-body';

    if (article.tag) {
      const tag = document.createElement('span');
      tag.className = 'article-list-tag';
      tag.textContent = article.tag;
      body.append(tag);
    }

    const title = document.createElement('h3');
    title.className = 'article-list-title';
    title.textContent = article.title || article.path;
    body.append(title);

    if (article.description) {
      const desc = document.createElement('p');
      desc.className = 'article-list-desc';
      desc.textContent = article.description;
      body.append(desc);
    }

    card.append(body);
    li.append(card);
    list.append(li);
  });

  block.append(list);
}
