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
3. Open the Connect panel and copy the local base URL plus generated Manifold API
   key.
4. Configure your client to use the base URL `http://127.0.0.1:17680/v1`.
5. Test the connection by listing models.

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

Then send a chat request:

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"manifold-default","messages":[{"role":"user","content":"Hello"}]}'
```

## Security note

Manifold binds the gateway to `127.0.0.1` and requires a bearer token on each
request. Do not share the generated key in issues, screenshots, shell history, or
support logs.
