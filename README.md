# Manifold Support

Public documentation and support intake for **Manifold**, the AI Model Hub from
Lingphi AI.

Manifold is a desktop tray app that exposes one local OpenAI- and
Anthropic-compatible gateway at `http://127.0.0.1:17680/v1`. Users can connect
local CLI providers and remote API providers once, then point compatible clients
at the same local endpoint.

## Read the docs

- English: [docs/en/index.md](docs/en/index.md)
- 中文: [docs/zh/index.md](docs/zh/index.md)
- Release notes: [docs/en/release-notes.md](docs/en/release-notes.md) /
  [docs/zh/release-notes.md](docs/zh/release-notes.md)

The company portal at [lingphi.com](https://lingphi.com) provides a short product
entry point. This repository is the maintainable documentation set for Manifold:
setup guides, concepts, API examples, pricing notes, troubleshooting, and user
issues.

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
npm test
```

Keep this repository focused on Manifold only. Future Lingphi products should use
their own support repositories so users can find the right docs and issues
without crossing product boundaries.
