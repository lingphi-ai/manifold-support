# Manifold Documentation

Manifold is a local AI model gateway. It runs as a desktop tray app and exposes a
single compatible endpoint at `http://127.0.0.1:17680/v1`. Compatible clients can
use that endpoint for model listing, OpenAI Chat Completions, Anthropic Messages,
embeddings, and provider-specific passthrough.

## Start here

- [Quick start](quick-start.md): launch Manifold, add a provider, and send a
  first request.
- [Concepts](concepts.md): understand the gateway, providers, routes, model ids,
  and usage history.
- [Configuration](configuration.md): set up local CLIs, remote APIs, endpoint
  details, and security settings.
- [API reference](api-reference.md): paths, authentication, and curl examples.
- [Plans](plans.md): Free and Pro limits.
- [Troubleshooting](troubleshooting.md): common setup and provider problems.
- [Release notes](release-notes.md): product status and changes.

## Support

If the docs do not answer your question, open an issue from the repository's
issue templates. Include your operating system, Manifold version, provider type,
the endpoint path you used, and the exact error message after redacting secrets.

This repository is the support home for Manifold only. Keeping the docs scoped to
one product makes it easier for users to search, follow issues, and maintain
accurate setup instructions.
