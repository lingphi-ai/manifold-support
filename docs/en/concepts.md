# Concepts

## Gateway

The gateway is Manifold's local HTTP server. It listens on
`127.0.0.1:17680` by default and exposes compatible `/v1` endpoints. Clients only
need to know the local endpoint and the Manifold API key.

## Providers

A provider is a backend Manifold can call. Providers can be local CLI tools or
remote HTTP APIs. Local CLI providers are useful when you already authenticate a
tool on your machine. Remote providers use API keys and compatible base URLs.

## Model ids

Manifold can expose provider-scoped model ids such as `provider/model`. Use a
scoped id when you want to force a specific provider. Use a route or bare model
name when you want Manifold to choose among compatible providers.

## Routes

Routes are client-facing model names. A route can point to one or more provider
targets. Pro routes support weighted targets and fallback, so client
configuration can stay stable while backend choices change.

## Usage

Manifold records request metadata and token estimates so users can inspect usage
by model, provider, and day. Free keeps a shorter window; Pro unlocks full usage
history.

## Local-first security

The gateway is bound to loopback only. Configuration and secrets are stored
locally, and logs should redact sensitive values. Treat provider keys and
Manifold keys as secrets.
