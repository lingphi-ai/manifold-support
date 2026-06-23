# API Reference

Base URL:

```text
http://127.0.0.1:17680/v1
```

The gateway is bound to `127.0.0.1`. It is not designed to accept LAN or public
traffic.

## Authentication

Every route requires `Authorization: Bearer <apiKey>` except `GET /llm.txt`
(and `/llms.txt`) and the health probes, which are unauthenticated.

OpenAI-style clients should send:

```text
Authorization: Bearer ldd_<your-key>
```

Project tools can use a Local Session Key instead:

```text
Authorization: Bearer mf_session_<short-lived-key>
```

Anthropic-style clients can use `x-api-key` when that is the only configurable
key header.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health/live` | Liveness probe. |
| GET | `/health/ready` | Readiness probe. |
| GET | `/v1/models` | List aggregate provider models as `provider/model`. |
| GET | `/v1/:provider/models` | List models for one provider. |
| POST | `/v1/chat/completions` | OpenAI-compatible chat routed by model. |
| POST | `/v1/:provider/chat/completions` | Force one provider for OpenAI chat. |
| POST | `/v1/messages` | Anthropic Messages routed by model. |
| POST | `/v1/claude/messages` | Claude-compatible alias for Messages. |
| POST | `/v1/:provider/messages` | Force one provider for Messages. |
| POST | `/v1/embeddings` | OpenAI-compatible embeddings when the provider supports them. |
| ALL | `/v1/native/:provider/*` | Low-level passthrough to the provider's native API. |
| POST | `/v1/session-keys` | Mint a short-lived scoped Local Session Key (Pro). |
| GET | `/llm.txt` (and `/llms.txt`) | Live Markdown discovery doc. No authentication required. |

## Model routing

The `model` field controls routing:

- `provider/model` forces a configured provider and sends `model` upstream.
- a bare model id routes across compatible providers in priority order;
- a Pro Route id fans out to its route targets;
- a model alias can rewrite a client-facing name before routing when Pro is
  active.

Routes are matched before ordinary model routing. Route ids are not guaranteed to
appear in `/v1/models`, so clients should use the configured route name directly.

## OpenAI chat example

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openrouter/openai/gpt-4o-mini",
    "messages": [{"role":"user","content":"Hello"}]
  }'
```

Streaming is supported:

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "fast-coder",
    "stream": true,
    "messages": [{"role":"user","content":"Stream one short sentence."}]
  }'
```

Remote OpenAI streams use Server-Sent Events from the upstream when available.
If a provider does not expose streaming, Manifold can simulate deltas from the
full response.

Tool and function calling is supported in both formats — OpenAI `functions`
and Anthropic `tool_use` — for streaming and non-streaming requests.

## Anthropic Messages example

```bash
curl http://127.0.0.1:17680/v1/messages \
  -H "x-api-key: mf_session_<short-lived-key>" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 256,
    "messages": [{"role":"user","content":"Hello"}]
  }'
```

Clients can also call `/v1/:provider/messages` to force a provider that exposes
an Anthropic-compatible URL or native Anthropic Messages support.

## Embeddings

Use `/v1/embeddings` with an OpenAI-compatible remote provider:

```bash
curl http://127.0.0.1:17680/v1/embeddings \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"openai/text-embedding-3-small","input":"hello"}'
```

Manifold tries compatible providers in routing order. If no provider supports
embeddings for the requested model, the request returns a structured error.

## Native passthrough

Use `/v1/native/:provider/*` for low-level passthrough to a provider's native
API — provider-specific endpoints that Manifold does not normalize. The route is
registered as `ALL`, so it accepts any method at the routing layer, but native
forwarding for remote providers is restricted to **GET and POST only**; other
methods are rejected by a security allow-list. The path is constrained so it
cannot escape the configured provider origin. A session key with an allowed
route list cannot use native passthrough, because native passthrough bypasses
route names.

## Session keys

`POST /v1/session-keys` mints a short-lived, scoped Local Session Key (Pro).
It can be authenticated with the master gateway key, or with a `pairing_code`
issued by a "Pair a CLI" window. The request body accepts `label`,
`ttl` (`1h`, `1d`, `7d`, `30d`, or `never`), `allowedRoutes`,
`allowedProviders`, and `pairing_code`:

```bash
curl http://127.0.0.1:17680/v1/session-keys \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "claude-code",
    "ttl": "7d",
    "allowedRoutes": ["fast-coder"],
    "allowedProviders": ["openrouter"]
  }'
```

The response returns the new key once:

```json
{ "token": "mf_session_<short-lived-key>", "expires_at": "2026-07-01T00:00:00.000Z" }
```

## Discovery doc

`GET /llm.txt` (and `/llms.txt`) returns a Markdown discovery document
generated live from your config and provider registry — base URL, enabled
providers, callable models, and endpoints. It requires no authentication so
coding agents and CLIs can fetch it directly.

## Errors

Errors use a structured body:

```json
{
  "error": {
    "code": "provider_execution_error",
    "message": "Provider execution failed",
    "type": "api_error"
  }
}
```

Common codes include `invalid_request`, `provider_not_found`,
`provider_disabled`, `provider_auth_required`, `not_supported`,
`provider_unavailable`, and `provider_execution_error`.

Remote-provider HTTP errors are passed through verbatim — the upstream status
code and body are returned unchanged, not masked.

When opening an API issue, include the path, method, request format, response
status, and redacted response body.
