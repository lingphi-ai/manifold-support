# Manifold Documentation

Manifold is a desktop app and local HTTP gateway at `http://127.0.0.1:17680/v1`.
These docs describe the current source implementation, package v0.8.0. Direct-download distribution is retired; use the store availability links below.

The **0.8.0 source candidate** changes MAS Pro to a US$2.00-base permanent
unlock. MAS uses on-device native StoreKit 2 verification, without the Lingphi License Server. Native purchase acceptance remains pending. The 0.7.0
TestFlight build below is the older annual-subscription binary. See [Plans](plans.md).

## Release status — 2026-11-01

- **0.8.0 (0.8.0)**: the universal native StoreKit 2 build is processed and Ready to Test internally. France is excluded from app and IAP availability; its Missing Compliance gate was cleared with the truthful encryption questionnaire. This is not a public release or purchase acceptance.

- **0.7.0 is not a public release.** The universal macOS App Store build
  0.7.0 (0.7.0) has been uploaded and processed in TestFlight, but remains
  **Missing Compliance**. No usable private TestFlight installation or real
  StoreKit purchase/restore acceptance is claimed.
- The latest public GitHub release checked on this date is **v0.6.0**, with macOS
  arm64/x64 DMGs and Windows x64/arm64 ZIPs. These are historical archives, not the current distribution channel. Direct downloads are retired.
- Windows 0.7.0 has not completed a new build and native Store acceptance. The
  existing Microsoft Store listing does not establish 0.7.0 availability.
- Current guides describe the 0.8.0 source. Claude and Gemini subscription OAuth
  have been removed; their API-key providers remain supported. Codex OAuth
  remains implemented, with OpenAI distribution approval still pending.
- See [release notes](release-notes.md) for store gates and historical changes.

## What Manifold does

- Connects hosted HTTP APIs and local servers using 27 quick-add presets,
  including Ollama, LM Studio, and vLLM.
- Connects Codex subscription accounts through browser OAuth.
  Authorization and refresh use Manifold's own account store.
- Exposes OpenAI Chat Completions, Anthropic Messages, model listing, embeddings,
  and provider-native forwarding through one loopback endpoint.
- Refreshes remote catalogs on add, on Refresh models, after launch, and every 12 hours.
- Provides weighted or failover Routes, scoped session credentials, gateway usage,
  Diagnostics, and built-in Chat with optional workspace tools.
- Keeps model calls on HTTP. Manifold does not sell, lease, or broker third-party
  model tokens; upstream access and billing remain with each provider.

Free includes 3 HTTP providers, 1 Route, 3 active session keys, and 7-day usage.
Pro supports 10 HTTP providers, unlimited Routes and keys, Chat/Messages fallback,
model aliases, policy management, 30-day usage, and agent write/edit tools.
Browser-connected subscription accounts are available on both tiers.

## Downloads

Use the product portal to check Microsoft Store availability and the pending Mac App Store release. The GitHub release link is historical only:

https://github.com/lingphi-ai/manifold-support/releases/latest

https://www.lingphi.com/manifold/#downloads

Release packages cover macOS arm64, macOS x64, Windows x64, and Windows arm64.
Store editions have their own packaging and billing flows.

## Start here

- [Quick start](quick-start.md): install, connect a provider, and make a request.
- [Concepts](concepts.md): models, Routes, session keys, and gateway usage.
- [Configuration](configuration.md): Settings and Chat.
- [API reference](api-reference.md): endpoints and authentication.
- [Security](security.md): credential storage and local boundaries.
- [Plans](plans.md): Free and Pro capabilities.
- [Troubleshooting](troubleshooting.md): setup and request failures.
- [Release notes](release-notes.md): public release history.

## Support

Open an issue with the app version, operating system, provider type, endpoint,
response status, and a redacted error. Never include keys, account tokens,
private prompts, or raw provider responses.
