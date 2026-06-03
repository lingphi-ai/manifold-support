# Troubleshooting

## Gateway is not ready

Confirm Manifold is running in the tray and the configured port is not used by
another process. The default gateway is `http://127.0.0.1:17680/v1`. If you
changed the port, update your client configuration.

## Unauthorized response

Every request needs the generated Manifold API key. Regenerate the key only if
you can update all clients that depend on it. Redact keys before posting logs.

## Provider has no models

For local CLI providers, run the provider's own command in a terminal and confirm
it is authenticated. For remote providers, verify the base URL, API key, and
model list. Some providers expose OpenAI-compatible and Anthropic-compatible
URLs separately.

## Routes do not fail over

Fallback is a Pro capability. Also confirm the target providers support the
request format. A provider that cannot serve Anthropic Messages cannot be used as
an Anthropic fallback target.

## When opening an issue

Include operating system, Manifold version, provider type, endpoint path, request
format, response status, and a redacted error message. Do not include local API
keys, remote provider keys, license keys, or private prompts.
