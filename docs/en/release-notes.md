# Release Notes

Public Manifold installers, archives, and user-visible release notes are
published from the latest manifold-support release:

https://github.com/lingphi-ai/manifold-support/releases/latest

The private Manifold source repository remains internal and is not the public
download destination.

## v0.1.12 App Store edition

Date: 2026-06-23

- App Store edition: the in-app purchase flow now shows full subscription details
  and links to the Privacy Policy and Terms of Use (EULA) before you subscribe.

## v0.1.11 live provider toggles

Date: 2026-06-23

- Enabling or disabling a provider now takes effect live, with no gateway
  restart.
- The UI refreshes in place: row state, the enabled-provider count, and provider
  health all update without reopening Settings.
- No window flash when the gateway starts, stops, or restarts, or when opening
  Settings from the tray.

## v0.1.10 pair a CLI improvements

Date: 2026-06-22

- "Pair a CLI" now shows a ready-to-paste `curl` mint command.
- Fixed placeholder interpolation in the pairing UI so the example values render
  correctly.
- Gateway start and restart update in place with no window flash.

## v0.1.9 discovery and pairing

Date: 2026-06-21

- New `/llm.txt` discovery endpoint so agents and tools can learn the gateway's
  capabilities.
- New `POST /v1/session-keys` mint endpoint plus "Pair a CLI": a keyless,
  human-armed pairing flow for connecting coding tools.
- New Help panel with an in-app developer manual.
- Connect now lists the new endpoints.
- Remote-provider errors are passed through verbatim so you see the upstream
  message.
- Session-key checks fail closed when verification cannot complete.
- Dashboard fixes: real app version, provider health, and recent requests.

## v0.1.8 Mac App Store and OAuth providers

Date: 2026-06-15

- Mac App Store edition: remote-only and sandboxed, with StoreKit in-app purchase
  for Subscribe and Restore.
- CLI subscription providers via OAuth (Claude, Codex, Gemini), with a per-row
  CLI ⇄ OAuth transport toggle.
- CLI tool-calling via prompt emulation.
- Function calling / `tool_use` support for remote providers.
- OAuth providers can be added directly from Settings.

## v0.1.4–v0.1.7 store packaging and audit fixes

Date: 2026-06-09 .. 2026-06-12

- Microsoft Store packaging: Store DisplayName "Manifold AI Model Hub", branded
  Store tiles, and certification fixes.
- The Microsoft Store edition uses Stripe rather than platform in-app purchase.
- Security and correctness audit fixes.

## v0.1.3 product behavior update

Date: 2026-06-08

Status: private source tag is `v0.1.3`; the public support release channel still
points to the latest mirrored installer release until a new public installer is
published.

User-visible changes reflected in these docs:

- Remote model catalogs now refresh automatically when a remote provider is
  added, shortly after app launch, and every 12 hours. Users can still click
  Refresh models manually.
- Provider setup is clearer about live model fetch behavior: a failed catalog
  fetch does not block setup and keeps the existing seed model list.
- Routes are documented as the Pro model load balancer with both failover and
  weighted distribution. Real provider smoke testing verified both strategies.
- Local Session Keys are documented with Pro policy controls: project name,
  route/provider allow-lists, request counts, bulk revoke, and audit log.
- API docs now include `/health/live`, `/health/ready`, `/v1/embeddings`, and
  `/v1/native/:provider/*`, plus streaming behavior and route matching.
- Security docs now describe safeStorage-backed secrets, URL safety checks,
  native passthrough constraints, device-bound license tokens, and the non-resale
  boundary.
- Release operations now include a release-sync workflow that can mirror private
  Manifold release installers into the public `manifold-support` release with
  the same tag.

## v0.1.2 public desktop release

Date: 2026-06-07

Public assets:

Release page: https://github.com/lingphi-ai/manifold-support/releases/tag/v0.1.2

- `Manifold-0.1.2-mac-arm64.dmg`
- `Manifold-0.1.2-mac-arm64.zip`
- `Manifold-0.1.2-mac-x64.dmg`
- `Manifold-0.1.2-mac-x64.zip`
- `Manifold-0.1.2-win-arm64.zip`
- `Manifold-0.1.2-win-x64.zip`

Use this release page as the public download entry for Manifold until a newer
public release is mirrored. The private Manifold source repository remains
internal; users should not need access to it to install or report issues for the
desktop app.

## v0.1.1 provider catalog and desktop build targets

Date: 2026-06-05

User-visible changes:

- Desktop build targets now cover macOS arm64, macOS x64, Windows x64, and
  Windows arm64.
- The Add provider flow is collapsed into **Local CLI**, **Remote**, and
  **Custom**. Remote providers are selected from a dropdown instead of a wide
  multi-tab layout.
- Manifold ships 27 quick-add provider presets. The catalog includes hosted API
  providers such as OpenAI, Anthropic, Gemini API, DeepSeek, GLM, OpenRouter,
  Qwen, Moonshot/Kimi, Perplexity, Fireworks, Cerebras, Cohere, NVIDIA NIM,
  SambaNova, MiniMax, Doubao, ERNIE, Hunyuan, StepFun, and SiliconFlow.
- Ollama, LM Studio, and vLLM are built-in local-server presets. They use
  localhost OpenAI-compatible URLs and allow keyless upstream access when the
  local server itself does not require auth.
- Built-in provider names are localized in the Chinese UI for providers with
  recognizable Chinese names, such as GLM, Qwen, DeepSeek, and Moonshot/Kimi.

## v0.1.0 early product documentation

The initial documentation release created the public support and documentation
home for Manifold before public installers and the expanded provider catalog.

Initial documentation included:

- Quick start for the local gateway at `http://127.0.0.1:17680/v1`.
- Concepts for gateway, providers, model ids, routes, fallback, and usage.
- API reference for `/v1/models`, `/v1/chat/completions`, and `/v1/messages`.
- Security documentation for Local Session Keys and the non-resale boundary.
- Free and Pro plan notes, including Pro at `$2/year`.
- Troubleshooting guidance and structured issue templates.

## Maintainer rule

Each release entry should include date, version, user-visible changes, installer
status, and known support impact. Attach public binaries and checksum files,
when published, to the corresponding manifold-support release. Keep entries
concise and link to related issues when a change fixes a reported problem.
