# Security

Manifold is a local HTTP access layer, not a token marketplace. It does not sell,
lease, or broker third-party model tokens. Upstream account permissions, terms,
and model billing remain between the user and each provider.

## Local boundary and HTTP requests

The gateway binds to `127.0.0.1`. Only `/llm.txt` and `/llms.txt` are public.
Health, model, and inference requests require a master gateway key (`ldd_` plus
16 random bytes encoded as hex) or a valid Local Session Key. The app validates
hosted HTTPS URLs and restricts optional-auth local-server URLs to supported
local endpoints. Native forwarding uses GET/POST, refuses redirects, and cannot
escape the configured provider origin.

Settings uses a nonce-based Content-Security-Policy, context isolation, and a
preload bridge. Model requests use HTTP backends. Diagnostics reads only the
application and gateway logs; no external credential or usage stores are imported.
Logs redact sensitive credentials and request/response payload fields.

## Credential storage

Config and secret files have restricted local permissions. API keys and browser
OAuth tokens use the shared credential codec backed by asynchronous Electron
safeStorage and the operating system keyring. OAuth records remain in a separate
local file. If encryption is unavailable or fails, credential writes fail; there
is no plaintext fallback. Access and
refresh tokens never cross the renderer bridge or appear in setup snippets.

## Local Session Keys

Tokens beginning `mf_session_` authenticate only to Manifold. They are shown
once, stored as SHA-256 hashes, checked with timing-safe comparisons, and support
expiry and revocation. Free permits three active keys; Pro adds unlimited keys,
project policies, allowed route names, provider scopes, audits, and pairing.
The **Pair a local tool** flow must be human-armed and expires after about 60 seconds.

A session key cannot mint another key by itself. Key creation requires the master
key or a valid pairing code. Tokens are gateway credentials, not provider API
keys, prepaid model credits, or a way to bypass provider billing.

## Workspace and issue hygiene

With a chosen workspace, built-in Chat can run bounded read tools. Pro adds
write/edit tools with approval by default. Workspace file access uses containment
and symlink checks. Redact provider keys, gateway/session keys, OAuth tokens,
license keys, private prompts, and raw provider responses before sharing issues.
