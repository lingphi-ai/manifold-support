# Quick Start

This guide follows the current source package v0.8.0. Public installers may lag
source; use the release page or Lingphi portal to choose your platform:

https://github.com/lingphi-ai/manifold-support/releases/latest

https://www.lingphi.com/manifold/#downloads

Packages cover macOS Apple Silicon, macOS Intel, Windows x64, and Windows arm64.

The **0.8.0 source candidate** changes MAS Pro to a US$2.00-base permanent
unlock. Its new binary and native purchase acceptance are pending. The 0.7.0
TestFlight build below is the older annual-subscription binary. See [Plans](plans.md).

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
- See [release notes](release-notes.md) for store gates and historical changes.

## Connect a provider

1. Launch Manifold and open **Providers** in Settings.
2. Click **Add provider** and choose **Remote**, **Custom**, or **Subscription**.
3. For a hosted HTTP API, select a preset or enter the supported base URLs, then
   save its upstream API key when required.
4. For Ollama, LM Studio, or vLLM, start the local server and choose its preset.
   A server that allows keyless access does not need an upstream key.
5. For a subscription account, choose Codex and complete the
   browser OAuth authorization. Manifold saves and refreshes its own tokens.
6. Confirm the provider is enabled. Use **Refresh models** to refresh an HTTP
   provider's model catalog after changing its URL or credentials.

## Connect a client

Open **Connect** for OpenAI SDK, Anthropic SDK, and curl examples. Copy the
endpoint and use the Manifold gateway key from **Gateway**, or generate a
session key there. Session tokens start with `mf_session_`; Free includes three
active keys, while Pro adds unlimited keys and advanced policy controls.

```bash
curl http://127.0.0.1:17680/v1/models   -H "Authorization: Bearer ldd_<your-key>"
```

Choose a returned model id, then send an OpenAI-style request:

```bash
curl http://127.0.0.1:17680/v1/chat/completions   -H "Authorization: Bearer ldd_<your-key>"   -H "Content-Type: application/json"   -d '{"model":"<model-id>","messages":[{"role":"user","content":"Hello"}]}'
```

For Anthropic SDK clients, use `http://127.0.0.1:17680` as the base URL and the
same gateway credential. Provider API keys stay inside Manifold.

## Routes and credentials

Free includes one Route; Pro allows unlimited Routes and retrying compatible
providers after retryable Chat/Messages failures. Configure a Route, then call
its name as the request model. With Pro, **Pair a local tool** opens a 60-second
pairing window for minting a scoped gateway key without sharing the master key.

Only `/llm.txt` and `/llms.txt` are public discovery documents. Health, model,
and inference requests require a master or valid session key. Redact all keys
and account tokens before sharing logs or screenshots.
