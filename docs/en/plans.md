# Plans

Free and Pro share the local HTTP gateway, browser OAuth accounts, model listing,
chat completions, Anthropic Messages, embeddings when supported, and
provider-native passthrough. Manifold includes 27 provider presets including
Ollama, LM Studio, and vLLM.

## Free

- 3 remote or local-server providers.
- Browser-connected Codex subscription accounts.
- 1 Route with weighted or failover target ordering.
- 3 active Local Session Keys with expiry and revocation.
- 7-day gateway usage history.
- Built-in Chat and read-only workspace agent tools.

## Pro

- 10 remote or local-server providers.
- Unlimited Routes and active Local Session Keys.
- Retryable Chat/Messages fallback and model aliases.
- Session policies, project labels, route/provider scope, pairing, bulk revoke,
  request attribution, and audit access.
- 30-day gateway usage history and agent write/edit tools.
- Purchase restoration; Windows license device management.

Remote caps include hosted API presets and local-server presets. Browser OAuth
accounts are outside that cap. Limits are enforced by the application; upstream
account entitlements and model billing remain provider-specific.

## Purchase channels

Direct-download distribution is retired. The Microsoft Store app offers a $2.99 purchase
valid for 365 days, without automatic renewal. The Mac App Store 0.8.0 candidate uses a non-consumable one-time permanent
unlock, with a US$2.00 base price and localized StoreKit pricing. It is not yet
released; native purchase/restore acceptance is pending. About contains the purchase and restore controls for the
installed edition.

Manifold does not sell, lease, or broker provider tokens, bundle model credits,
or replace an upstream provider account. Report a mismatch with the app version,
license status, channel, and a redacted reproduction.

For the new 0.8.0 store candidate, real StoreKit purchase/restore acceptance remains pending. See [release notes](release-notes.md).

The MAS candidate verifies Apple-signed transactions on-device using StoreKit 2. It never sends receipts or licensing device identifiers to Lingphi, and does not use server-issued entitlement tokens. Restore Purchases uses the same Apple Account. Windows and existing direct-download users retain the existing licensing service.
