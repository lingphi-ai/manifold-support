import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

const site = {
  title: "Manifold Documentation",
  zhTitle: "Manifold 文档",
  endpoint: "http://127.0.0.1:17680/v1",
  repo: "https://github.com/lingphi-ai/manifold-support",
  issues: "https://github.com/lingphi-ai/manifold-support/issues/new/choose",
  portal: "https://www.lingphi.com",
};

const docs = [
  { slug: "index", file: "index.md", en: "Overview", zh: "概览" },
  { slug: "quick-start", file: "quick-start.md", en: "Quick start", zh: "快速开始" },
  { slug: "concepts", file: "concepts.md", en: "Concepts", zh: "核心概念" },
  { slug: "configuration", file: "configuration.md", en: "Configuration", zh: "配置" },
  { slug: "api-reference", file: "api-reference.md", en: "API reference", zh: "API 参考" },
  { slug: "security", file: "security.md", en: "Security", zh: "安全" },
  { slug: "plans", file: "plans.md", en: "Plans", zh: "版本与计划" },
  { slug: "troubleshooting", file: "troubleshooting.md", en: "Troubleshooting", zh: "故障排查" },
  { slug: "release-notes", file: "release-notes.md", en: "Release notes", zh: "发布说明" },
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets"), { recursive: true });
await copyFile(join(root, "site/styles.css"), join(dist, "assets/styles.css"));
await writeFile(join(dist, ".nojekyll"), "");

for (const locale of ["en", "zh"]) {
  for (const page of docs) {
    const source = await readFile(join(root, "docs", locale, page.file), "utf8");
    const title = extractTitle(source) ?? labelFor(locale, page);
    const html = markdownToHtml(source);
    const output = page.slug === "index"
      ? join(dist, locale, "index.html")
      : join(dist, locale, page.slug, "index.html");
    await writeOutput(output, renderPage({ locale, page, title, content: html }));
  }
}

await writeOutput(join(dist, "index.html"), renderRootRedirect());

console.log("built support site in dist/");

function writeOutput(path, content) {
  return mkdir(dirname(path), { recursive: true }).then(() => writeFile(path, content));
}

function labelFor(locale, page) {
  return locale === "zh" ? page.zh : page.en;
}

function pageOutput(locale, slug) {
  return slug === "index"
    ? join(dist, locale, "index.html")
    : join(dist, locale, slug, "index.html");
}

function hrefBetween(fromOutput, toOutput) {
  let href = relative(dirname(fromOutput), toOutput).replaceAll("\\", "/");
  if (!href.startsWith(".")) href = `./${href}`;
  return href.replace(/index\.html$/, "");
}

function assetHref(output, asset) {
  let href = relative(dirname(output), join(dist, "assets", asset)).replaceAll("\\", "/");
  if (!href.startsWith(".")) href = `./${href}`;
  return href;
}

function renderPage({ locale, page, title, content }) {
  const output = pageOutput(locale, page.slug);
  const alternateLocale = locale === "zh" ? "en" : "zh";
  const alternate = docs.find((item) => item.slug === page.slug) ?? docs[0];
  const homeHref = hrefBetween(output, pageOutput(locale, "index"));
  const alternateHref = hrefBetween(output, pageOutput(alternateLocale, alternate.slug));
  const stylesHref = assetHref(output, "styles.css");
  const localeTitle = locale === "zh" ? site.zhTitle : site.title;
  const description = locale === "zh"
    ? "Manifold 的网页文档、配置指南、API 示例和支持入口。"
    : "Web documentation, setup guides, API examples, and support links for Manifold.";

  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} - Lingphi AI</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${stylesHref}">
</head>
<body>
  ${renderNav({ locale, homeHref, alternateHref })}
  <main>
    <section class="doc-hero">
      <div class="container-x doc-hero-inner">
        <div>
          <span class="eyebrow on-dark">Lingphi AI / Manifold</span>
          <h1 class="headline">${escapeHtml(localeTitle)}</h1>
          <p>${escapeHtml(description)}</p>
          <div class="hero-actions">
            <a class="btn btn-primary-light" href="${homeHref}">${locale === "zh" ? "阅读文档" : "Read docs"}</a>
            <a class="btn btn-ghost-light" href="${site.issues}">${locale === "zh" ? "提交 issue" : "Create an issue"}</a>
          </div>
        </div>
        <div class="hero-panel">
          <p class="hero-panel-label">${locale === "zh" ? "本地端点" : "Local endpoint"}</p>
          <code>${site.endpoint}</code>
          <p class="hero-panel-label" style="margin-top:1.25rem">${locale === "zh" ? "维护源" : "Maintenance source"}</p>
          <code>docs/${locale}/*.md</code>
        </div>
      </div>
    </section>
    <section class="container-x doc-shell">
      ${renderSidebar({ locale, page, output })}
      <article class="doc-content">
        ${content}
      </article>
    </section>
  </main>
  ${renderFooter(locale)}
</body>
</html>
`;
}

function renderNav({ locale, homeHref, alternateHref }) {
  return `<header class="site-nav">
    <div class="container-x site-nav-inner">
      <a class="logo" href="${homeHref}" aria-label="Lingphi AI home">
        <span class="logo-word"><span>Ling</span><span>phi</span></span>
        <span class="logo-badge">AI</span>
      </a>
      <nav class="nav-links" aria-label="Primary">
        <a href="${homeHref}">${locale === "zh" ? "文档" : "Docs"}</a>
        <a href="${site.issues}">${locale === "zh" ? "支持" : "Support"}</a>
        <a href="${site.portal}">Portal</a>
        <a href="${alternateHref}">${locale === "zh" ? "English" : "中文"}</a>
      </nav>
      <a class="nav-lang-mobile" href="${alternateHref}">${locale === "zh" ? "English" : "中文"}</a>
    </div>
  </header>`;
}

function renderSidebar({ locale, page, output }) {
  const links = docs.map((item) => {
    const href = hrefBetween(output, pageOutput(locale, item.slug));
    const active = item.slug === page.slug ? " active" : "";
    return `<a class="${active.trim()}" href="${href}">${escapeHtml(labelFor(locale, item))}</a>`;
  }).join("\n");

  return `<aside class="doc-sidebar">
    <p class="doc-sidebar-title">${locale === "zh" ? "Manifold 文档" : "Manifold docs"}</p>
    <nav aria-label="Documentation">${links}</nav>
  </aside>`;
}

function renderFooter(locale) {
  return `<footer class="footer">
    <div class="container-x footer-inner">
      <div>© 2026 Lingphi AI LLC. ${locale === "zh" ? "Manifold 支持文档。" : "Manifold support documentation."}</div>
      <div><a href="${site.repo}">GitHub</a> · <a href="${site.portal}">lingphi.com</a></div>
    </div>
  </footer>`;
}

function renderRootRedirect() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Manifold Documentation - Lingphi AI</title>
  <meta http-equiv="refresh" content="0; url=./en/">
  <script>
    const target = navigator.language && navigator.language.toLowerCase().startsWith("zh") ? "./zh/" : "./en/";
    window.location.replace(target);
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./assets/styles.css">
</head>
<body class="root-choice">
  <main>
    <h1 class="headline">Manifold Documentation</h1>
    <p>Choose a language if you are not redirected automatically.</p>
    <div class="hero-actions" style="justify-content:center">
      <a class="btn btn-primary-light" href="./en/">English</a>
      <a class="btn btn-ghost-light" href="./zh/">中文</a>
    </div>
  </main>
</body>
</html>`;
}

function extractTitle(markdown) {
  const found = markdown.match(/^#\s+(.+)$/m);
  return found ? stripInline(found[1]) : null;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      out.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    if (isTableStart(lines, i)) {
      const rows = [];
      rows.push(parseTableRow(lines[i]));
      i += 2;
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
        rows.push(parseTableRow(lines[i]));
        i += 1;
      }
      const [head, ...body] = rows;
      out.push(`<table><thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        const item = [lines[i].replace(/^\s*-\s+/, "")];
        i += 1;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !/^\s*-\s+/.test(lines[i]) &&
          !/^\s*\d+\.\s+/.test(lines[i]) &&
          !/^(#{1,3})\s+/.test(lines[i]) &&
          !lines[i].startsWith("```") &&
          !isTableStart(lines, i)
        ) {
          item.push(lines[i].trim());
          i += 1;
        }
        items.push(item.join(" "));
      }
      out.push(`<ul>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const item = [lines[i].replace(/^\s*\d+\.\s+/, "")];
        i += 1;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !/^\s*-\s+/.test(lines[i]) &&
          !/^\s*\d+\.\s+/.test(lines[i]) &&
          !/^(#{1,3})\s+/.test(lines[i]) &&
          !lines[i].startsWith("```") &&
          !isTableStart(lines, i)
        ) {
          item.push(lines[i].trim());
          i += 1;
        }
        items.push(item.join(" "));
      }
      out.push(`<ol>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      continue;
    }

    const paragraph = [line.trim()];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("```") &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^\s*[-\d]+\.\s+/.test(lines[i]) &&
      !/^\s*-\s+/.test(lines[i]) &&
      !isTableStart(lines, i)
    ) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    out.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }

  return out.join("\n");
}

function isTableStart(lines, index) {
  return Boolean(
    lines[index] &&
    lines[index + 1] &&
    /^\s*\|.*\|\s*$/.test(lines[index]) &&
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
  );
}

function parseTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const safeHref = escapeHtml(href);
    return `<a href="${safeHref}">${label}</a>`;
  });
  return html;
}

function stripInline(value) {
  return value.replace(/\*\*/g, "").replace(/`/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
