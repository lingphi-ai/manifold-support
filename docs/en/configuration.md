# Configuration

Manifold configuration is organized around the Settings panels: Dashboard,
Gateway, Connect, Providers, Routes, Usage & Cost, Diagnostics, Appearance, and
About.

## Dashboard

Dashboard is the operating view. Use it to confirm whether the gateway is
running, see enabled providers, inspect recent requests, and jump to the panel
that owns a problem.

If there are no providers yet, start in **Providers**.

## Gateway

The default base URL is:

```text
http://127.0.0.1:17680/v1
```

The host is always `127.0.0.1`. The port can be changed if another local process
already uses `17680`. Saving gateway settings restarts the gateway so clients
see the new port or provider configuration.

Every route except `/llm.txt` requires one of these local credentials:

- the generated Manifold API key, usually `ldd_<...>`;
- or a Local Session Key, usually `mf_session_<...>`, when Pro session keys are
  enabled.

Config is plain local JSON written with `0600` permissions; API keys and other
secrets are encrypted at rest (on macOS through the Keychain via `safeStorage`).

Regenerating the Manifold API key restarts the gateway and invalidates clients
that still use the old key.

## Connect

Connect is the copy/paste panel for clients. It shows:

- the local base URL;
- gateway key copy controls;
- OpenAI-compatible examples;
- Anthropic-compatible examples for tools such as Claude Code;
- per-provider endpoint paths;
- route names and provider ids that users can call.

For Claude Code, configure the base URL without `/v1`:

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:17680
export ANTHROPIC_API_KEY=mf_session_<short-lived-key>
```

With Pro session keys, **Pair a CLI** lets a tool mint its own scoped
`mf_session_` key through a short pairing code, so it never needs the master API
key.

## Providers

The provider form has three modes:

- **Local CLI**: Claude, Codex, or Gemini installed and authenticated on the same
  machine. Manifold can auto-detect the binary path from the user's PATH and
  login shell. Each CLI row has a live CLI⇄OAuth transport toggle: `cli` spawns
  the binary, while `oauth` calls the provider's OAuth-authenticated subscription
  API directly. Function/tool calls work for the local CLIs through read-only
  prompt emulation.
- **Remote**: quick-add presets for hosted APIs and local servers.
- **Custom**: a manually entered provider id, display label, model list, OpenAI
  base URL, Anthropic base URL, and API key.

Enabling or disabling a provider applies live; no restart is needed.

Manifold includes 27 quick-add presets across hosted APIs and local-server
runtimes. Hosted presets include OpenAI, Anthropic, Gemini API, DeepSeek, GLM,
Mistral, Groq, xAI, OpenRouter, Together, Moonshot/Kimi, Qwen, Perplexity,
Fireworks, Cerebras, Cohere, NVIDIA NIM, SambaNova, MiniMax, Doubao, ERNIE,
Hunyuan, StepFun, and SiliconFlow.

Ollama, LM Studio, and vLLM are local-server presets. They point to localhost
OpenAI-compatible URLs and can be added without an upstream API key when the
local server itself allows keyless access.

For plan limits, every hosted API preset and local-server preset counts as a
remote or local-server provider. Local CLI providers do not count against that
limit. Free allows one remote provider; Pro allows up to 10.

On the Mac App Store build, Manifold is sandboxed and remote-only — the Local CLI
mode is unavailable there.

## Model refresh

When a remote provider is added, Manifold tries to replace preset seed models
with the provider's live `/v1/models` catalog. This is best effort. If the
provider is offline, the key is wrong, or the endpoint does not return a usable
list, Manifold keeps the existing model list.

Use **Refresh models** in a provider row after changing credentials or starting a
local server. Manifold also refreshes enabled remote providers shortly after
launch and every 12 hours. A stable catalog is a no-op; changed catalogs are
saved and the gateway is restarted once.

## Routes

Routes are Pro. Create them in **Routes** when clients need one stable model name
that can move across providers.

A route has:

- an id, which is the model name clients call;
- a strategy: `failover` or `weighted`;
- one or more targets, each with a provider, optional upstream model, and weight.

Failover uses target order. Weighted routing chooses the first target by relative
weight and keeps the rest as fallback order. A target is skipped when it cannot
serve the requested API format.

## Usage & Cost

Usage & Cost has two views:

- **via gateway**: requests that flowed through Manifold, including remote
  providers and local CLIs called through the gateway;
- **CLI logs**: local provider usage read from each CLI's own local usage logs
  when available.

Free is clamped to the 7-day usage window. Pro unlocks full usage history.

## Diagnostics

Diagnostics tails app, gateway, and provider logs. Use it when:

- a provider cannot be detected;
- a request returns a provider error;
- model refresh does not update the catalog;
- a gateway restart fails;
- Routes do not behave as expected.

Copy only redacted log snippets into issues.

## Appearance and language

Appearance controls style, light/dark mode, accent color, text size, and
language. Manifold supports English and Simplified Chinese. It can follow the
operating system language or use a manual override.

## About, subscription, and devices

About contains subscription controls, license activation, billing portal links,
device management, and product information. Free covers one remote provider with
a 7-day usage window; Pro ($2/year) raises the remote-provider limit to 10 and
unlocks Routes, session keys, model aliases, full usage history, and device
management. Billing and license links are opened only through allow-listed HTTPS
hosts. Pro license tokens are product-scoped and device-bound.

Manifold is distributed through direct download, the Mac App Store, and the
Microsoft Store.
