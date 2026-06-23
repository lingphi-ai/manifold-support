# Manifold Documentation

Manifold is a local AI model gateway for developer tools. It runs as a desktop
tray app and exposes a single compatible endpoint at
`http://127.0.0.1:17680/v1`. Compatible clients can list models, send OpenAI
Chat Completions, send Anthropic Messages, request embeddings, or forward
provider-native calls through Manifold.

These docs reflect Manifold `v0.1.12` product behavior. The latest public
desktop installer is distributed through the public support release channel and
the Lingphi portal.

## What Manifold does

- Runs a local gateway bound to `127.0.0.1`, never a public network listener.
- Connects local CLI providers: Claude, Codex, and Gemini when those CLIs are
  installed and authenticated on the same machine. Each can be reached either
  through the local CLI binary ("CLI" transport) or directly via the provider's
  OAuth-authenticated API ("OAuth" transport) that reuses the user's
  subscription. A per-row CLI⇄OAuth toggle in **Providers** switches transport
  live.
- Connects hosted API providers through 27 quick-add presets including OpenAI,
  Anthropic, Gemini API, DeepSeek, GLM, Mistral, Groq, xAI, OpenRouter,
  Together, Qwen, Moonshot/Kimi, Perplexity, Fireworks, Cerebras, Cohere,
  NVIDIA NIM, SambaNova, MiniMax, Doubao, ERNIE, Hunyuan, StepFun, and
  SiliconFlow.
- Connects local-server presets such as Ollama, LM Studio, and vLLM using
  localhost OpenAI-compatible URLs and optional upstream authentication.
- Enables or disables a provider instantly with no gateway restart; the UI
  updates in place.
- Surfaces endpoints and SDK setup snippets in the **Connect** panel, and ships
  an in-app developer manual in the **Help** panel.
- Publishes `/llm.txt`, an auth-exempt discovery doc at the gateway root that
  coding agents and CLIs can read to learn the available endpoints.
- Refreshes remote model catalogs when a provider is added, when the user clicks
  Refresh models, shortly after launch, and then every 12 hours.
- Supports Pro Routes: stable client-facing model names with failover or
  weighted distribution across provider/model targets.
- Supports Local Session Keys for project tools (Pro), with TTL, optional
  project names, route/provider allow-lists, request counts, bulk revoke, and
  audit logging. `POST /v1/session-keys` mints short-lived scoped keys, and a
  CLI can self-mint one via **Pair a CLI** (Gateway → Session keys) without the
  master key.
- Keeps upstream provider billing and credentials between the user and each
  provider. Manifold does not sell, lease, or broker third-party model tokens.

## Downloads and releases

Public Manifold desktop downloads are published from this repository's latest
GitHub Release:

https://github.com/lingphi-ai/manifold-support/releases/latest

The Lingphi portal also provides direct platform downloads:

https://www.lingphi.com/manifold/#download

The public release channel is expected to provide macOS arm64, macOS x64,
Windows x64, and Windows arm64 builds. Manifold is also distributed through the
Mac App Store (a remote-only edition with StoreKit in-app purchase) and the
Microsoft Store.

Use those pages for public installers, archives, and user-visible release notes.
The private Manifold source repository remains internal and should not be used as
the public download destination.

## Start here

- [Quick start](quick-start.md): install, add a provider, and send the first
  request.
- [Concepts](concepts.md): understand the gateway, providers, model ids, Routes,
  session keys, and usage records.
- [Configuration](configuration.md): configure Gateway, Connect, Providers,
  Routes, Usage, Diagnostics, Appearance, and About panels.
- [API reference](api-reference.md): request paths, authentication, model
  routing, streaming, embeddings, and native passthrough.
- [Security](security.md): provider credential isolation, Local Session Keys,
  URL safety, license boundaries, and non-resale positioning.
- [Plans](plans.md): Free and Pro limits. Free allows one remote provider (local
  CLI providers are unlimited); Pro ($2/year) adds up to 10 remote providers,
  Routes, session keys, model aliases, and full usage history.
- [Troubleshooting](troubleshooting.md): common setup and provider problems.
- [Release notes](release-notes.md): product status, downloads, and changes.

## Support

If the docs do not answer your question, open an issue from the repository's
issue templates. Include your operating system, Manifold version, provider type,
endpoint path, request format, response status, and the exact error message after
redacting secrets.

This repository is the support home for Manifold only. Keeping the docs scoped to
one product makes it easier for users to search, follow issues, and maintain
accurate setup instructions.
