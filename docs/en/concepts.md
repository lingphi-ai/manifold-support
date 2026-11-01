# Concepts

## Gateway and providers

The gateway listens on `127.0.0.1:17680` and uses loopback only. A provider is
an HTTP backend: a hosted API, a local model server, or a browser-connected
subscription account. Remote APIs use configured OpenAI/Anthropic-compatible
URLs; OAuth accounts use their subscription backend and Manifold's own tokens.
Enabling or disabling a provider applies live.

Ollama, LM Studio, and vLLM use local HTTP URLs and optional upstream auth.
Hosted URLs are validated and require safe HTTPS endpoints.

## Model catalogs and ids

Remote catalogs refresh on add, on Refresh models, after launch, and every 12 hours.
If a refresh fails, the existing model list stays available. Subscription model
catalogs are curated and resolved for the connected account where applicable.

- `provider/model` forces a configured provider; only the first slash is split.
- A bare model id uses compatible providers in priority order.
- A configured Route name selects weighted or failover targets.
- Pro model aliases can rewrite a client-facing name.

## Routes and tool calls

Routes map a stable model name to provider/model targets. `weighted` chooses
by relative weight; `failover` keeps target order. Free includes one Route;
Pro includes unlimited Routes and retrying compatible providers after retryable
Chat/Messages errors. Streaming cannot switch providers after output starts.

Gateway tool calls are returned to the client. Built-in Chat uses the same local
gateway. With a chosen workspace, Chat can execute bounded read tools on both
tiers; Pro adds write/edit tools with approval unless enabled for that chat.

## Local Session Keys

Keys beginning `mf_session_` authenticate only to Manifold. The app stores
hashes, shows new keys once, and supports expiry and revocation. Free permits
three active keys. Pro adds unlimited keys, project and route/provider policies,
audit events, and the human-armed **Pair a local tool** flow.

## Usage and security

Usage comes exclusively from requests recorded by Manifold's gateway, with
input/output/cache-creation/cache-read tokens and estimated model costs.
Free retains 7 days and Pro supports 30 days. Diagnostics reads application and
gateway logs only.

Only `/llm.txt` and `/llms.txt` are public. Health and model endpoints require a
master or active session key. API keys and browser OAuth tokens use OS-backed
safeStorage encryption. Credential writes fail if encryption is unavailable;
there is no plaintext fallback. OAuth records use a separate local file.
Provider credentials are never returned to API clients.

All distribution channels use HTTP providers and browser OAuth accounts; store
packaging and billing differ. See [Plans](plans.md) for current limits.
