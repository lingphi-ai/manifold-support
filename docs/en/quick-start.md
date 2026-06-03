# Quick Start

This guide gets a compatible client talking to Manifold through the local gateway
at `http://127.0.0.1:17680/v1`.

Public downloads are coming soon. The workflow below describes the intended
first-run flow once the desktop app is installed.

## Requirements

- A supported desktop operating system.
- At least one local CLI provider already installed and authenticated, or one
  remote API provider with an API key.
- A client that can use OpenAI-style or Anthropic-style endpoints.

## Steps

1. Launch Manifold and keep the tray app running.
2. Open Settings and add a provider. Local CLI providers are auto-detected when
   possible; remote providers need a compatible base URL and API key.
3. Open the Connect panel and copy the local base URL plus a generated Manifold
   key. For project tools, prefer a short-lived Local Session Key instead of a
   long-lived gateway key.
4. Configure your client to use the base URL `http://127.0.0.1:17680/v1`.
5. Test the connection by listing models.

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

Then send a chat request:

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer mf_session_<short-lived-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"manifold-default","messages":[{"role":"user","content":"Hello"}]}'
```

## Security note

Manifold binds the gateway to `127.0.0.1` and requires a bearer token on each
request. Provider API keys stay in Manifold local storage. Local Session Keys are
scoped credentials for the Manifold localhost gateway; they are not provider API
keys and they are not model credits. Do not share generated keys in issues,
screenshots, shell history, or support logs.
