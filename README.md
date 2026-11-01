# Manifold Support

Public documentation and support intake for **Manifold**, the AI Model Hub from
Lingphi AI.

Manifold is a desktop tray app that exposes one local OpenAI- and
Anthropic-compatible gateway at `http://127.0.0.1:17680/v1`. Users configure
HTTP API providers, local model servers such as Ollama, LM Studio, and vLLM, or
browser-connected subscription accounts, then use the gateway from SDK clients.

The maintained guides now follow the current source implementation (package
`v0.8.0`). Public installer versions may differ; choose downloads from:

https://github.com/lingphi-ai/manifold-support/releases/latest

The current guides describe HTTP provider setup, browser OAuth, Free/Pro limits,
Routes, Local Session Keys, gateway-only usage, and application/gateway Diagnostics.

MAS billing update: **0.8.0 candidate** uses a non-consumable permanent unlock,
US base price $2.00. New binary and native purchase/restore acceptance are pending;
0.7.0 remains the historical annual-product TestFlight build.

## Release status — 2026-11-01

- **0.7.0 is not a public release.** The universal macOS App Store build
  0.7.0 (0.7.0) has been uploaded and processed in TestFlight, but remains
  **Missing Compliance**. No usable private TestFlight installation or real
  StoreKit purchase/restore acceptance is claimed.
- The latest public GitHub release checked on this date is **v0.6.0**, with macOS
  arm64/x64 DMGs and Windows x64/arm64 ZIPs. The download links below follow the
  latest public release; they do not provide the private 0.7.0 store build.
- Windows 0.7.0 has not completed a new build and native Store acceptance. The
  existing Microsoft Store listing does not establish 0.7.0 availability.
- Current guides describe the 0.8.0 source. Claude and Gemini subscription OAuth
  have been removed; their API-key providers remain supported. Codex OAuth
  remains implemented, with OpenAI distribution approval still pending.
- See [release notes](docs/en/release-notes.md) for store gates and historical changes.

## Read the docs

- Website: [doc.lingphi.ai/manifold](https://doc.lingphi.ai/manifold/)
- GitHub Pages upstream: [lingphi-ai.github.io/manifold-support](https://lingphi-ai.github.io/manifold-support/)
- English: [docs/en/index.md](docs/en/index.md)
- 中文: [docs/zh/index.md](docs/zh/index.md)
- Release notes: [docs/en/release-notes.md](docs/en/release-notes.md) /
  [docs/zh/release-notes.md](docs/zh/release-notes.md)

The company portal at [www.lingphi.com](https://www.lingphi.com) provides a short
product entry point and direct per-platform downloads at
[www.lingphi.com/manifold/#downloads](https://www.lingphi.com/manifold/#downloads).
This repository is the maintainable documentation set for Manifold: setup
guides, concepts, API examples, pricing notes, troubleshooting, and user issues.

Security note: Manifold can generate short-lived Local Session Keys for tools
such as project applications and test runners. These keys authenticate only to the local Manifold gateway.
Manifold does not sell, lease, or broker third-party model tokens.

## Support scope

Use GitHub Issues for:

- Bugs that can be reproduced with Manifold.
- Provider setup problems.
- Missing or unclear documentation.
- Questions about Routes, usage history, local gateway configuration, session
  keys, releases, or plans.

Please do not paste secrets. Redact local API keys, provider API keys, license
keys, Local Session Keys, private prompts, and raw provider responses before
posting logs or configuration snippets.

## 0.7.0 documentation verification (2026-11-01)

The bilingual guides were reconciled with the 0.7.0 source and the dated
TestFlight/privacy acceptance record maintained in the private app repository
(`docs/superpowers/plans/2026-11-01-store-0.7.0-acceptance.md`).
`npm run verify` passed: site generation, documentation/link checks and docs
gateway checks. GitHub's release API reports v0.6.0; all four versioned platform
DMG/ZIP asset URLs returned HTTP 302 on HEAD. Live portal download checks were
blocked (HTTP 403; browser client also blocked download navigation), so their
end-to-end delivery is not counted as passing. Local preview confirms the
release state and billing text. No new 0.7.0 public release is created by this
documentation commit. Push/Pages publication is separate from local verification.
The repository package version 0.1.0 identifies documentation tooling, not the app.

## Maintainer workflow

Run the docs guard before merging documentation changes:

```bash
npm run build
npm test
```

`docs/en` and `docs/zh` are the source files. `npm run build` renders the public
website into `dist/` with the same visual language as the Lingphi portal. GitHub
Pages deploys that generated site from the workflow in
[.github/workflows/pages.yml](.github/workflows/pages.yml).

The Cloudflare Worker in [worker/docs-gateway.js](worker/docs-gateway.js)
provides the product documentation path:

- `https://doc.lingphi.ai/manifold/` proxies this GitHub Pages site.
- `https://doc.lingphi.com/manifold/` redirects to the `.ai` canonical host.
- Future products can add their own path routes without changing this
  repository's support and issue scope.

Deploy the gateway after Cloudflare auth is available:

```bash
npm run deploy:gateway
```

Keep this repository focused on Manifold only. Future Lingphi products should use
their own support repositories so users can find the right docs and issues
without crossing product boundaries.

Release asset rule: the Lingphi portal links directly to GitHub latest-release
assets for each supported platform. When publishing a new Manifold release,
either update the portal asset filenames or upload stable alias filenames such as
`Manifold-mac-arm64.dmg`, `Manifold-mac-x64.dmg`, `Manifold-win-x64.zip`, and
`Manifold-win-arm64.zip`. The private Manifold repo also includes a release-sync
workflow that can mirror public installers into this repository's release with
the same tag.
