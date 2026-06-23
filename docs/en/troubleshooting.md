# Troubleshooting

## Gateway is not ready

Confirm Manifold is running in the tray and the configured port is not used by
another process. The default gateway is `http://127.0.0.1:17680/v1`. If you
changed the port, update your client configuration.

Use `/health/live` and `/health/ready` to distinguish a running process from an
unhealthy gateway.

## Unauthorized response

Every request needs the generated Manifold API key or an active Local Session
Key. Regenerate the main API key only if you can update all clients that depend
on it. Redact keys before posting logs.

If a Local Session Key fails, check whether it is expired, revoked, outside its
route/provider allow-list, or unavailable because the install is on Free.

## Provider cannot be detected

For local CLI providers, run the provider's own command in a terminal and confirm
it is authenticated. If Manifold was launched from Finder or a desktop shortcut,
use Auto Detect in Providers so Manifold resolves the absolute binary path.

For remote providers, verify the base URL and API key. Hosted providers must use
safe HTTPS URLs. Localhost URLs are allowed only for local-server presets such as
Ollama, LM Studio, and vLLM.

## Provider has no models

Remote model catalogs are fetched from `/v1/models`. If the provider returns no
usable models, Manifold keeps the existing list.

Click **Refresh models** after fixing the provider key, changing the base URL, or
starting a local server. Manifold also refreshes enabled remote catalogs shortly
after launch and every 12 hours while the app is running.

For Ollama, LM Studio, or vLLM, confirm the local server is running on the preset
URL before refreshing models:

- Ollama: `http://localhost:11434/v1`
- LM Studio: `http://localhost:1234/v1`
- vLLM: `http://localhost:8000/v1`

These presets can be keyless when the local server allows keyless access. If the
server requires auth, add the key in Manifold and test again.

## Cannot add another remote provider

Free includes 1 remote or local-server provider. Local CLI providers do not count
against that limit, but hosted API presets and local-server presets do. Upgrade
to Pro when you need up to 10 remote/local-server providers.

Over-cap remote providers are treated as disabled on the served set, not only in
the add form.

## Routes do not fail over

Routes and fallback are Pro capabilities. Also confirm:

- the client is calling the route id as the `model`;
- the target providers are enabled;
- each target supports the request format;
- the upstream model exists for the target provider;
- the primary error is retryable. Non-retryable provider errors stop the route.

A provider that cannot serve Anthropic Messages cannot be used as an Anthropic
fallback target.

## Streaming stops or returns an error event

When a provider fails before the first stream byte, Manifold can try the next
compatible target if fallback is available. Once bytes are already streaming,
Manifold cannot change the HTTP status code; it ends the stream with an error
event.

Remote streams also have byte caps and idle timeouts to protect the local app.

## Provider shows "Disabled"

A provider marked **Disabled** has been toggled off and is not served. Re-enable
it on the Providers panel; the change takes effect live, with no gateway restart.
Note that over-cap remote providers on Free are also treated as disabled on the
served set.

## "Pair a CLI" code expired

The pairing code is valid for a short window (about 60 seconds). If it expires
before the tool mints a key, re-arm "Pair a CLI" to generate a fresh code, then
paste the new mint command into the tool.

## A coding tool cannot mint a session key

Minting a session key requires either the master Manifold API key or a valid
pairing code from "Pair a CLI". Also note that Local Session Keys are a Pro
feature: on Free, session-key auth is rejected and only the master key works.

## Discovering the gateway with /llm.txt

Agents and tools can fetch `/llm.txt` to learn the gateway's capabilities and
endpoints. Point an agent at this path when it needs to discover what Manifold
exposes.

## Upstream provider error is shown verbatim

Remote-provider errors are passed through verbatim. If a request fails with a
message that did not come from Manifold, read it: it is the upstream provider's
error (for example a bad key, rate limit, or unknown model). Fix the issue with
that provider and retry.

## Native passthrough fails

Native passthrough allows only `GET` and `POST`, refuses redirects, and rejects
paths that escape the configured provider origin. A session key with allowed
routes cannot use native passthrough because passthrough bypasses route names.

## Public download is not the latest source tag

The private Manifold source repository can have a newer tag than the public
support release. Public installers are distributed through:

https://github.com/lingphi-ai/manifold-support/releases/latest

If a new source tag exists but the public release has not moved yet, wait for the
release-sync workflow or use the latest public installer documented there.

## When opening an issue

Include operating system, Manifold version, provider type, endpoint path, request
format, response status, license tier if relevant, and a redacted error message.
Do not include local API keys, remote provider keys, Local Session Keys, license
keys, private prompts, or raw provider responses.
