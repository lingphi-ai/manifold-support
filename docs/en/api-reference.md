# API Reference

Base URL:

```text
http://127.0.0.1:17680/v1
```

Authentication:

```text
Authorization: Bearer ldd_<your-key>
```

For project-scoped tools, the bearer value can be a short-lived Local Session Key:

```text
Authorization: Bearer mf_session_<short-lived-key>
```

Anthropic-style clients can also use `x-api-key` when supported by the client.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1/models` | List available models and routes. |
| GET | `/v1/:provider/models` | List models for one provider. |
| POST | `/v1/chat/completions` | OpenAI-compatible chat request. |
| POST | `/v1/:provider/chat/completions` | Force one provider for chat. |
| POST | `/v1/messages` | Anthropic-compatible Messages request. |
| POST | `/v1/:provider/messages` | Force one provider for Messages. |
| POST | `/v1/embeddings` | Embedding request when supported. |
| POST | `/v1/native/:provider/*` | Provider-native passthrough. |

## Examples

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

```bash
curl http://127.0.0.1:17680/v1/messages \
  -H "x-api-key: ldd_<your-key>" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model":"manifold-default","max_tokens":256,"messages":[{"role":"user","content":"Hello"}]}'
```

Errors use a structured body with a code, message, and type. If you report an API
issue, include the path, method, response status, and redacted response body.

Provider API keys are never sent to clients as part of the Manifold API. Clients
only send a Manifold gateway key or Local Session Key to `127.0.0.1`; Manifold
then calls the user-configured provider from the local app.
