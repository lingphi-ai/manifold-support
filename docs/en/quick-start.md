# Quick Start

This guide gets a compatible client talking to Manifold through the local gateway
at `http://127.0.0.1:17680/v1`.

These steps reflect Manifold `v0.1.12` behavior. Public installers are
distributed from the latest support release and the Lingphi product page:

https://github.com/lingphi-ai/manifold-support/releases/latest

https://www.lingphi.com/manifold/#download

The public installer channel currently provides macOS Apple Silicon, macOS
Intel, Windows x64, and Windows arm64 builds. Manifold is also available from
the Mac App Store (a remote-only edition with StoreKit in-app purchase) and the
Microsoft Store. Use only files from the Lingphi portal, the public
manifold-support release page, or those official app stores.

## Requirements

- A supported desktop operating system.
- At least one upstream provider:
  - a local CLI already installed and authenticated, such as Claude, Codex, or
    Gemini;
  - a hosted API provider with an API key;
  - or a local OpenAI-compatible server such as Ollama, LM Studio, or vLLM.
- A client that can use OpenAI-style or Anthropic-style endpoints.

## Add a provider

1. Launch Manifold and open Settings from the tray.
2. Open **Providers**.
3. Click **Add provider**.
4. Choose one provider type:
   - **Local CLI** for Claude, Codex, or Gemini.
   - **Remote** for a quick-add hosted API or local-server preset.
   - **Custom** for a provider not in the preset list.
5. For a local CLI, let Manifold auto-detect the binary or enter the path. Each
   CLI provider exposes a per-row **CLI⇄OAuth** toggle: keep "CLI" to shell out
   to the local binary, or switch to "OAuth" to reach the provider's API
   directly with your authenticated subscription. The change applies live.
6. For a remote preset, select the provider and enter the upstream API key when
   required.
7. For Ollama, LM Studio, or vLLM, start the local server first. These presets
   can run without an upstream key when the server itself does not require auth.

Enabling or disabling any provider takes effect instantly with no gateway
restart, and the Providers list updates in place.

When a remote provider is added, Manifold tries to fetch the provider's live
model catalog from `/v1/models`. If that fetch fails or returns no usable models,
Manifold keeps the seed model list so setup is not blocked. You can click
**Refresh models** later.

## Connect a client

The **Connect** panel shows the gateway endpoints plus ready-to-paste SDK setup
snippets; the in-app **Help** panel is a developer manual if you need more
detail.

1. Open **Connect**.
2. Copy the base URL:

```text
http://127.0.0.1:17680/v1
```

3. Copy the Manifold gateway API key, or create a Local Session Key when using a
   project-scoped tool (Pro). A CLI can also self-mint a short-lived scoped key
   via **Pair a CLI** (Gateway → Session keys) without the master key. Coding
   agents can read `http://127.0.0.1:17680/llm.txt`, an auth-exempt discovery
   doc, to learn the available endpoints.
4. Configure the client with the local base URL and key.
5. Test model listing:

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

6. Send a chat request:

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-4-6","messages":[{"role":"user","content":"Hello"}]}'
```

For Claude Code or another Anthropic-style client, use:

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:17680
export ANTHROPIC_API_KEY=mf_session_<short-lived-key>
```

## Use Routes when clients need stable names

Routes are Pro model names that Manifold serves to clients. A route can point to
one or more provider/model targets and use either:

- **Failover**: try targets in order until one compatible target succeeds.
- **Weighted**: distribute requests by weight, with the remaining targets still
  acting as fallback order.

Create Routes in **Routes**, then call the route name as the `model` in your
client request. Route names are not guaranteed to appear in `/v1/models`; clients
should use the route name you configured.

## Security note

Manifold binds the gateway to `127.0.0.1` and requires a bearer token on each
request. Provider API keys stay in Manifold local storage. Local Session Keys are
scoped credentials for the Manifold localhost gateway; they are generated with a
label, TTL, optional project, and optional route/provider allow-lists, shown
once, revocable, and not provider API keys or model credits.

Do not share generated keys in issues, screenshots, shell history, project env
files, or support logs.
