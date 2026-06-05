# Manifold Support

Public documentation and support intake for **Manifold**, the AI Model Hub from
Lingphi AI.

Manifold is a desktop tray app that exposes one local OpenAI- and
Anthropic-compatible gateway at `http://127.0.0.1:17680/v1`. Users can connect
local CLI providers and remote API providers once, then point compatible clients
at the same local endpoint.

The current product docs track Manifold `v0.1.1`. That release line adds
multi-architecture desktop build targets, a Remote provider dropdown with 27
quick-add presets, keyless local-server presets for Ollama, LM Studio and vLLM,
and the simplified Local Session Key generator for project tools.

## Read the docs

- Website: [doc.lingphi.ai/manifold](https://doc.lingphi.ai/manifold/)
- GitHub Pages upstream: [lingphi-ai.github.io/manifold-support](https://lingphi-ai.github.io/manifold-support/)
- English: [docs/en/index.md](docs/en/index.md)
- 中文: [docs/zh/index.md](docs/zh/index.md)
- Release notes: [docs/en/release-notes.md](docs/en/release-notes.md) /
  [docs/zh/release-notes.md](docs/zh/release-notes.md)

The company portal at [www.lingphi.com](https://www.lingphi.com) provides a short product
entry point. This repository is the maintainable documentation set for Manifold:
setup guides, concepts, API examples, pricing notes, troubleshooting, and user
issues.

Security note: Manifold can generate short-lived Local Session Keys for tools
such as Claude Code. These keys only authenticate to the local Manifold gateway.
Manifold does not sell, lease, or broker third-party model tokens.

## Support scope

Use GitHub Issues for:

- Bugs that can be reproduced with Manifold.
- Provider setup problems.
- Missing or unclear documentation.
- Questions about routes, usage history, local gateway configuration, or plans.

Please do not paste secrets. Redact local API keys, provider API keys, license
keys, and private prompts before posting logs or configuration snippets.

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
