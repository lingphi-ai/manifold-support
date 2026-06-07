# Manifold Documentation

Manifold is a local AI model gateway. It runs as a desktop tray app and exposes a
single compatible endpoint at `http://127.0.0.1:17680/v1`. Compatible clients can
use that endpoint for model listing, OpenAI Chat Completions, Anthropic Messages,
embeddings, and provider-specific passthrough.

These docs track the current `v0.1.2` public release. The latest app changes add
public desktop downloads, a collapsed provider add flow, 27 quick-add provider
presets, keyless local-server presets for Ollama, LM Studio and vLLM, localized
provider names in Chinese, and the simplified Local Session Key generator for
project tools.

## Current capabilities

- Local CLI providers: Claude, Codex, and Gemini when those CLIs are installed
  and authenticated on the same machine.
- Hosted API presets: OpenAI, Anthropic, Gemini API, DeepSeek, GLM, OpenRouter,
  Qwen, Moonshot/Kimi, Perplexity, Fireworks, Cerebras, Cohere, NVIDIA NIM,
  SambaNova, MiniMax, Doubao, ERNIE, Hunyuan, StepFun, SiliconFlow, and more.
- Local-server presets: Ollama, LM Studio, and vLLM using OpenAI-compatible
  localhost URLs. These can run without an API key when the local server itself
  does not require one.
- Desktop build targets: macOS arm64, macOS x64, Windows x64, and Windows arm64.

## Downloads and releases

Public Manifold desktop downloads are published from this repository's latest
GitHub Release:

https://github.com/lingphi-ai/manifold-support/releases/latest

Use that page for public installers, archives, and user-visible release notes.
The private Manifold source repository remains internal and should not be used as
the public download destination.

The Lingphi portal also provides direct platform downloads:

https://www.lingphi.com/manifold/#download

## Start here

- [Quick start](quick-start.md): launch Manifold, add a provider, and send a
  first request.
- [Concepts](concepts.md): understand the gateway, providers, routes, model ids,
  and usage history.
- [Configuration](configuration.md): set up local CLIs, remote APIs, endpoint
  details, and security settings.
- [API reference](api-reference.md): paths, authentication, and curl examples.
- [Security](security.md): local session keys, provider key isolation, and the
  non-resale boundary.
- [Plans](plans.md): Free and Pro limits.
- [Troubleshooting](troubleshooting.md): common setup and provider problems.
- [Release notes](release-notes.md): product status, downloads, and changes.

## Support

If the docs do not answer your question, open an issue from the repository's
issue templates. Include your operating system, Manifold version, provider type,
the endpoint path you used, and the exact error message after redacting secrets.

This repository is the support home for Manifold only. Keeping the docs scoped to
one product makes it easier for users to search, follow issues, and maintain
accurate setup instructions.
