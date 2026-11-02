# Release Notes

Public Manifold installers, archives, and user-visible release notes are
published from the latest manifold-support release:

https://github.com/lingphi-ai/manifold-support/releases/latest

The private Manifold source repository remains internal and is not the public
download destination.

## StoreKit 2 migration — 2026-11-01

The 0.8.0 MAS candidate now uses native StoreKit 2 on-device verification. No Lingphi receipt server or licensing identity is used. Direct downloads are retired; Windows retains its licensing service. Real TestFlight purchase/restore and privacy-label reconciliation remain release gates; the 0.8.0 encryption questionnaire is cleared for distribution excluding France. Historical release notes below describe their original implementations.

## 0.8.0 candidate — one-time App Store unlock

The source changes MAS Pro to a non-consumable permanent unlock, SKU
`com.lingphi.manifold.pro.lifetime`, US base price $2.00. The former annual
subscription is withdrawn from the submission draft. The universal 0.8.0 (0.8.0) binary is processed and Ready to Test internally. App and lifetime-IAP availability exclude France (174 regions); the build’s Missing Compliance gate is cleared. Real purchase/restore/refund acceptance and privacy-label reconciliation remain pending.
The 0.7.0 TestFlight binary still contains the old annual product and must not
be submitted for the new product. Historical GitHub releases remain archived at v0.6.0; direct downloads are retired. Microsoft Store billing remains $2.99 once for 365 days. MAS verifies ownership on-device with native StoreKit 2.

## 0.7.0 candidate — not publicly released

Status checked: 2026-11-01. Source/package version: **0.7.0**. TestFlight:
**0.7.0 (0.7.0), Missing Compliance**. Upload and processing are complete;
installation and payment acceptance are not.

The latest public GitHub release is **v0.6.0** on this date. Public download
links follow GitHub Releases, not the private TestFlight build. Windows 0.7.0
rebuild, registered Store package checks, WACK and native ARM64 acceptance remain
open. No 0.7.0 public store availability is claimed.

Current implementation removes local executable integration and Claude/Gemini
subscription OAuth; ordinary API-key and local HTTP model-server access remain.
Codex OAuth remains implemented, pending OpenAI distribution approval.

### Store release gates

- Resolve Apple encryption compliance and France documentation; France remains
  in scope and no approval or exemption is claimed.
- Configure the receipt shared secret on the actual production Gateway (the
  legacy License Worker configuration is not inherited), and prepare isolated
  Sandbox verification without enabling Sandbox receipts in production.
- Complete native purchase → server validation → Pro, restart, restore, renewal
  and refund acceptance using the store build.
- Replace/verify the current IAP screenshot, attach the annual subscription and
  build to the app submission. The annual IAP remains Prepare for Submission.
- Privacy labels for User ID, Device ID and Purchase History were published for
  App Functionality, linked to identity, with no tracking. The bilingual public
  privacy notice was published. This does not close the other store gates.

Web/Microsoft Store Pro is a $2.99 one-time purchase valid for 365 days, without
automatic renewal. The MAS edition uses an annual auto-renewing subscription;
use its displayed localized StoreKit price, not the web price.

## Historical releases

The entries below record earlier behavior. Removed subscription integrations
are historical and are not current setup instructions.

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

## v0.1.10 local tool pairing improvements

Date: 2026-06-22

- "Pair a local tool" now shows a ready-to-paste `curl` mint command.
- Fixed placeholder interpolation in the pairing UI so the example values render
  correctly.
- Gateway start and restart update in place with no window flash.

## v0.1.9 discovery and pairing

Date: 2026-06-21

- New `/llm.txt` discovery endpoint so agents and tools can learn the gateway's
  capabilities.
- New `POST /v1/session-keys` mint endpoint plus "Pair a local tool": a keyless,
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
- Browser-connected subscription accounts were introduced for Claude, Codex, and Gemini.
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
- The Add provider flow uses a type selector with preset and custom configuration. Remote providers are selected from a dropdown instead of a wide
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
