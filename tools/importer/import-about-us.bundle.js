/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-about-us.js
  var import_about_us_exports = {};
  __export(import_about_us_exports, {
    default: () => import_about_us_default
  });

  // tools/importer/parsers/columns-intro.js
  function parse(element, { document: document2 }) {
    const columns = element.querySelectorAll(":scope > div");
    const textCol = columns[0] || null;
    const imageCol = columns[1] || null;
    const leftCell = [];
    const heading = textCol && textCol.querySelector('h1, h2, h3, [class*="heading"]');
    if (heading) leftCell.push(heading);
    const subheading = textCol && textCol.querySelector('p, .subheading, [class*="subheading"]');
    if (subheading) leftCell.push(subheading);
    const ctas = textCol ? Array.from(textCol.querySelectorAll(".button-group a, a.button")) : [];
    leftCell.push(...ctas);
    const rightCell = imageCol ? Array.from(imageCol.querySelectorAll("img")) : [];
    if (leftCell.length === 0 && rightCell.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cells.push([leftCell, rightCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-intro", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document: document2 }) {
    const columns = element.querySelectorAll(":scope > div");
    const imageCol = columns[0] || null;
    const metaCol = columns[1] || null;
    const leftCell = imageCol ? Array.from(imageCol.querySelectorAll("img")) : [];
    const rightCell = metaCol ? Array.from(metaCol.children) : [];
    if (leftCell.length === 0 && rightCell.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cells.push([leftCell, rightCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document: document2 }) {
    const tiles = element.querySelectorAll(":scope > div");
    const cells = [];
    tiles.forEach((tile) => {
      const img = tile.querySelector("img");
      if (img) cells.push([img]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document: document2 }) {
    const panes = Array.from(element.querySelectorAll(".tabs-content .tab-pane, .tab-pane"));
    const buttons = Array.from(element.querySelectorAll(".tab-menu .tab-menu-link, .tab-menu button, button.tab-menu-link"));
    const cells = [];
    const count = Math.max(panes.length, buttons.length);
    for (let i = 0; i < count; i += 1) {
      const button = buttons[i];
      const pane = panes[i];
      const labelCell = button ? Array.from(button.children) : [];
      const contentCell = pane ? Array.from(pane.children) : [];
      if (labelCell.length === 0 && contentCell.length === 0) continue;
      cells.push([labelCell, contentCell]);
    }
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document: document2 }) {
    const cards = element.querySelectorAll(":scope > a.article-card, :scope > a.card-link, :scope > a");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img");
      const body = card.querySelector(".article-card-body");
      if (!img && !body) return;
      const imageCell = img || "";
      let textCell = "";
      if (body) {
        const href = card.getAttribute("href");
        if (href) {
          const link = document2.createElement("a");
          link.href = href;
          link.append(...body.childNodes);
          textCell = link;
        } else {
          textCell = Array.from(body.childNodes);
        }
      }
      cells.push([imageCell, textCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document: document2 }) {
    const items = element.querySelectorAll(":scope > details.faq-item, :scope > details, details.faq-item");
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector("summary, .faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!summary && !answer) return;
      let titleCell = "";
      if (summary) {
        const questionText = summary.querySelector("span");
        titleCell = questionText || summary.textContent.trim();
      }
      const contentCell = answer ? Array.from(answer.childNodes) : "";
      cells.push([titleCell, contentCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-overlay.js
  function parse7(element, { document: document2 }) {
    const bgImage = element.querySelector('img.utility-overlay, img[class*="overlay"], img.cover-image, img');
    const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
    const subheading = element.querySelector('p, .subheading, [class*="subheading"]');
    const ctas = Array.from(element.querySelectorAll(".button-group a, a.button"));
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctas);
    if (!bgImage && contentCell.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".breadcrumbs"
        // verified: article-header section navigation, non-authorable
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "a.skip-link",
        // verified: skip-to-content link
        ".navbar",
        // verified: top navigation bar + mega menu
        "nav.nav-menu",
        // verified: nested nav menu (defensive)
        "footer"
        // verified: site footer
      ]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function querySection(root, selectors) {
    for (const sel of selectors) {
      const el = root.querySelector(sel);
      if (el) return el;
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = querySection(element, section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || querySection(element, section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-about-us.js
  var parsers = {
    "columns-intro": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-overlay": parse7
  };
  var PAGE_TEMPLATE = {
    name: "about-us",
    description: "About Us / case-study page: intro columns, article header, image gallery, testimonial tabs, article cards, FAQ accordion, and closing hero banner.",
    urls: [
      "https://wknd-trendsetters.site/about-us"
    ],
    blocks: [
      {
        name: "columns-intro",
        instances: ["#main-content > header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl"]
      },
      {
        name: "columns-article",
        instances: ["#main-content > section.section:nth-of-type(1) .grid-layout.tablet-1-column.grid-gap-lg"]
      },
      {
        name: "cards-gallery",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(2) .grid-layout.desktop-4-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: ["#main-content > section.section:nth-of-type(3) .tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(4) .grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: ["#main-content > section.section:nth-of-type(5) .faq-list"]
      },
      {
        name: "hero-overlay",
        instances: ["#main-content > section.section.inverse-section .grid-layout.desktop-1-column"]
      }
    ],
    sections: [
      {
        id: "rc1",
        name: "intro",
        selector: ["#main-content > header.section.secondary-section"],
        style: "grey",
        blocks: ["columns-intro"],
        defaultContent: []
      },
      {
        id: "rc2",
        name: "article-header",
        selector: ["#main-content > section.section:nth-of-type(1)"],
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "rc3",
        name: "snapshot-gallery",
        selector: ["#main-content > section.section.secondary-section:nth-of-type(2)"],
        style: "grey",
        blocks: ["cards-gallery"],
        defaultContent: ["#main-content > section.section.secondary-section:nth-of-type(2) .utility-text-align-center.utility-margin-bottom-8rem"]
      },
      {
        id: "rc4",
        name: "testimonials",
        selector: ["#main-content > section.section:nth-of-type(3)"],
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "rc5",
        name: "latest-articles",
        selector: ["#main-content > section.section.secondary-section:nth-of-type(4)"],
        style: "grey",
        blocks: ["cards-article"],
        defaultContent: ["#main-content > section.section.secondary-section:nth-of-type(4) .utility-text-align-center"]
      },
      {
        id: "rc6",
        name: "faq",
        selector: ["#main-content > section.section:nth-of-type(5)"],
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: ["#main-content > section.section:nth-of-type(5) .h2-heading", "#main-content > section.section:nth-of-type(5) .subheading"]
      },
      {
        id: "rc7",
        name: "closing-cta",
        selector: ["#main-content > section.section.inverse-section"],
        style: "dark",
        blocks: ["hero-overlay"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_about_us_default = {
    transform: (payload) => {
      const {
        document: document2,
        url,
        html,
        params
      } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_about_us_exports);
})();
