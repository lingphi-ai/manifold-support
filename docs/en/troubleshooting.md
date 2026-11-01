# Troubleshooting

## Gateway or authentication failure

Confirm the app is running and the configured port is free. The default endpoint
is `http://127.0.0.1:17680/v1`. Health probes, model listing, and inference require
a master or active session key through Bearer or x-api-key. Only `/llm.txt` and
`/llms.txt` are public. If a session key fails, check expiry, revocation, and any
route/provider restrictions. Free supports up to three active session keys.

## Provider is unavailable

For an HTTP API, check the configured URL, key, and supported request format.
For a browser-connected account, check its subscription status and reconnect in
Providers when authorization has expired. Account authorization happens through
the browser; Manifold stores and refreshes its own OAuth tokens.

For Ollama, LM Studio, or vLLM, start the local server first and verify its HTTP
address. A key is optional only when that local server allows unauthenticated access.

## Missing models or provider limits

Click **Refresh models** after fixing an HTTP URL/key. Automatic remote catalog
refresh runs after launch and every 12 hours. Failed refreshes keep existing models.
Free allows 3 HTTP providers and Pro 10; OAuth accounts are outside that cap.

## Routes or streaming failures

Confirm the client uses the Route name, the targets are enabled, and the target
supports the incoming protocol. Free includes one Route. Retrying another
provider after a retryable Chat/Messages error requires Pro. A stream cannot
switch providers after output has started. Upstream errors can be passed through;
use their status and message to identify bad keys, rate limits, or unknown models.

## Pairing and native passthrough

Pro **Pair a local tool** codes last about 60 seconds. Re-arm pairing if the
code expires. Key creation requires the master key or a valid pairing code.
Basic key generation is available on Free within its cap.

For native passthrough, use GET/POST, avoid redirects, and stay inside the
configured upstream origin. Route-scoped session keys cannot bypass Routes
through passthrough. Diagnostics reads application and gateway logs only.

## Downloads and support

Use https://github.com/lingphi-ai/manifold-support/releases/latest for public
installers. If a source tag is newer, the release-sync publication process may
still be pending. Report the app version, platform, channel, endpoint, status,
and redacted error. Do not share credentials, tokens, or private prompts.
