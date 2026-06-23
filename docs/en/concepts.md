# Concepts

## Gateway

The gateway is Manifold's local HTTP server. It listens on `127.0.0.1:17680` by
default and exposes compatible `/v1` endpoints. Clients only need the local base
URL and a Manifold key. The host is forced to loopback; LAN exposure is disabled
by design.

## Providers

A provider is one backend that Manifold can call.

- **Local CLI providers** are command-line tools already installed and
  authenticated on the same machine: Claude, Codex, and Gemini. A CLI provider
  has a transport: **`cli`** spawns the binary, while **`oauth`** calls the
  provider's OAuth-authenticated subscription API directly. The CLI⇄OAuth toggle
  is per row and applies live.
- **Remote providers** are HTTP APIs using OpenAI-compatible or
  Anthropic-compatible base URLs.
- **Local-server providers** such as Ollama, LM Studio, and vLLM are configured
  as remote-style HTTP providers because Manifold calls them over localhost.
  They support optional upstream authentication.

Remote provider URLs are validated before they are stored. Hosted providers must
use safe HTTPS URLs; local-server presets are the exception that can use
localhost HTTP.

Enabling or disabling a provider applies live; no restart is needed.

### CLI tool calling

Function/tool calls are supported for the local CLIs through prompt emulation.
They run read-only: Manifold surfaces the tool call back to the client but never
executes a tool itself, so this path is zero-risk.

## Model catalogs

Each provider has a model catalog. Local CLIs use built-in known model lists.
Remote providers start with seed models from the preset or custom form, then
Manifold tries to fetch the live catalog from the provider's `/v1/models`
endpoint.

Catalog refresh happens in four places:

- when a remote provider is added;
- when the user clicks **Refresh models**;
- shortly after app launch;
- every 12 hours while the app is running.

If the live fetch fails, setup continues with the existing model list. Manifold
only saves and restarts the gateway when a remote catalog actually changed.

## Model ids

Manifold accepts several model-id styles:

- A bare model id such as `deepseek-chat` lets Manifold choose compatible
  providers in priority order.
- A provider-scoped id such as `openrouter/openai/gpt-4o-mini` forces a
  provider. Manifold splits only the first `/`, so vendor model ids that contain
  slashes still work.
- A route name such as `fast-coder` uses a configured Pro Route.
- A model alias can rewrite one client-facing name to another target when Pro is
  active.

`GET /v1/models` namespaces provider models as `provider/model` so aggregate
lists stay unique.

## Routes

Routes are client-facing model names that fan out to one or more provider/model
targets. They are the model load balancer.

- **Failover** (`failover`) tries targets in order.
- **Weighted** (`weighted`) chooses the first target using relative weights, then uses the
  remaining targets as fallback order.

Routes are enforced on the request path, not only in the UI. If Pro lapses,
stored routes are ignored and Manifold falls back to ordinary provider routing.

## Local Session Keys

Local Session Keys are Manifold-generated gateway credentials for local tools.
They start with `mf_session_`, are stored as hashes, shown once, and can expire
or be revoked. In Pro, keys can also carry an optional TTL, a project name, route
allow-list, provider allow-list, request count, last-used timestamp, and audit
events.

Session keys authenticate to the local gateway only. They are not provider API
keys and not prepaid model credits.

**Pair a CLI** lets a tool mint its own session key through a short pairing code,
so it never needs the master API key.

## Usage

Manifold records gateway requests with provider id, model, estimated or reported
tokens, cache tokens, and optional session-key attribution. The Usage panel also
has a CLI-log view for providers that keep their own local usage ledgers. Free is
limited to a shorter usage window; Pro unlocks full history.

## Free and Pro

- **Free** allows one remote provider (local CLIs are unlimited), no Routes,
  session keys, or model aliases, and clamps usage history to 7 days.
- **Pro** ($2/year) allows up to 10 remote providers, Routes, session keys, model
  aliases, full usage history, and device management.

## Distribution channels

Manifold ships through several channels: direct download, the Mac App Store, and
the Microsoft Store. The Mac App Store build is sandboxed and remote-only — local
CLI providers are unavailable there.

## Local-first security

Configuration is local JSON written with `0600` permissions; API keys and other
secrets are encrypted at rest (on macOS through the Keychain via `safeStorage`).
License state, session key hashes, logs, and usage data also live on the user's
machine. The gateway is hard-locked to `127.0.0.1`, and a Bearer API key
(`ldd_…`) is required on every route except `/llm.txt`. Provider credentials are
never returned through the Manifold API. Logs and issue reports should still be
treated as sensitive because prompts, model names, and error bodies may reveal
private workflow details.
