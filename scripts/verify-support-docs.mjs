import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "README.md",
  ".gitignore",
  "site/styles.css",
  "scripts/build-site.mjs",
  "docs/en/index.md",
  "docs/en/quick-start.md",
  "docs/en/concepts.md",
  "docs/en/configuration.md",
  "docs/en/api-reference.md",
  "docs/en/security.md",
  "docs/en/plans.md",
  "docs/en/troubleshooting.md",
  "docs/en/release-notes.md",
  "docs/zh/index.md",
  "docs/zh/quick-start.md",
  "docs/zh/concepts.md",
  "docs/zh/configuration.md",
  "docs/zh/api-reference.md",
  "docs/zh/security.md",
  "docs/zh/plans.md",
  "docs/zh/troubleshooting.md",
  "docs/zh/release-notes.md",
  ".github/ISSUE_TEMPLATE/bug_report.yml",
  ".github/ISSUE_TEMPLATE/docs_request.yml",
  ".github/ISSUE_TEMPLATE/question.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/workflows/pages.yml",
];

const requiredBuiltFiles = [
  "dist/index.html",
  "dist/en/index.html",
  "dist/en/quick-start/index.html",
  "dist/en/api-reference/index.html",
  "dist/en/security/index.html",
  "dist/zh/index.html",
  "dist/zh/quick-start/index.html",
  "dist/zh/api-reference/index.html",
  "dist/zh/security/index.html",
  "dist/assets/styles.css",
  "dist/.nojekyll",
];

const mustMention = {
  "README.md": ["Manifold", "docs/en", "docs/zh", "Issues", "127.0.0.1:17680", "npm run build"],
  "docs/en/index.md": ["Manifold", "Quick start", "Support"],
  "docs/zh/index.md": ["Manifold", "快速开始", "支持"],
  "docs/en/plans.md": ["Free", "Pro", "$2/year", "1 remote provider", "10 remote providers"],
  "docs/zh/plans.md": ["Free", "Pro", "$2/year", "1 个远程服务商", "10 个远程服务商"],
  "docs/en/api-reference.md": ["/v1/models", "/v1/chat/completions", "/v1/messages"],
  "docs/zh/api-reference.md": ["/v1/models", "/v1/chat/completions", "/v1/messages"],
  "docs/en/security.md": ["Local Session Keys", "Claude Code", "mf_session_", "does not sell, lease, or broker"],
  "docs/zh/security.md": ["本地会话密钥", "Claude Code", "mf_session_", "不销售、租借或中转"],
  "site/styles.css": ["--ink", "--accent", "font-family", "container-x", "doc-shell"],
  ".github/workflows/pages.yml": ["github-pages", "npm run build", "actions/deploy-pages"],
  "dist/en/index.html": ["Lingphi", "Manifold Documentation", "doc-shell", "assets/styles.css"],
  "dist/zh/index.html": ["Lingphi", "Manifold 文档", "doc-shell", "assets/styles.css"],
  "dist/en/security/index.html": ["Local Session Keys", "does not sell, lease, or broker", "mf_session_"],
  "dist/zh/security/index.html": ["本地会话密钥", "不销售、租借或中转", "mf_session_"],
};

let failed = false;

function fail(message) {
  failed = true;
  console.error(`FAIL: ${message}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    fail(`missing ${file}`);
  }
}

for (const file of requiredBuiltFiles) {
  if (!existsSync(join(root, file))) {
    fail(`missing built site file ${file}`);
  }
}

for (const [file, terms] of Object.entries(mustMention)) {
  if (!existsSync(join(root, file))) continue;
  const text = read(file);
  for (const term of terms) {
    if (!text.includes(term)) {
      fail(`${file} missing ${term}`);
    }
  }
}

for (const file of requiredFiles.filter((file) => file.endsWith(".md"))) {
  if (!existsSync(join(root, file))) continue;
  const text = read(file).trim();
  if (text.length < 450) {
    fail(`${file} is too short to be useful`);
  }
}

for (const file of requiredFiles.filter((file) => file.startsWith(".github/ISSUE_TEMPLATE/") && file.endsWith(".yml") && !file.endsWith("config.yml"))) {
  if (!existsSync(join(root, file))) continue;
  const text = read(file);
  for (const key of ["name:", "description:", "body:"]) {
    if (!text.includes(key)) {
      fail(`${file} missing ${key}`);
    }
  }
}

if (existsSync(join(root, ".github/ISSUE_TEMPLATE/config.yml"))) {
  const text = read(".github/ISSUE_TEMPLATE/config.yml");
  for (const key of ["blank_issues_enabled:", "contact_links:"]) {
    if (!text.includes(key)) {
      fail(`.github/ISSUE_TEMPLATE/config.yml missing ${key}`);
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("support docs verification passed");
