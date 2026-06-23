# Plans

Manifold has Free and Pro tiers. The core local gateway and local CLI providers
remain available on both tiers.

## Free

Free is intended for individual local workflows and first-time setup.

- Unlimited local CLI providers.
- 1 remote or local-server provider.
- 27 quick-add provider presets, including hosted APIs plus Ollama, LM Studio
  and vLLM local-server presets.
- OpenAI- and Anthropic-compatible local gateway.
- Model listing, chat completions, Messages requests, embeddings when supported,
  and provider-native passthrough.
- 7-day usage window.
- Local-only gateway bound to `127.0.0.1`.

Remote provider limits apply to hosted API presets and local-server presets
because both are configured as HTTP providers. The limit does not apply to local
CLI providers such as Claude, Codex, or Gemini.

## Pro

Pro is priced at **$2/year** (annual, auto-renewing) and is intended for users
who depend on multiple providers, stable model names, routing policy, and safer
project credentials.

- Up to 10 remote or local-server providers.
- Routes with failover and weighted distribution.
- Fallback across compatible providers.
- Model aliases.
- Full usage history.
- Local Session Keys with TTL, optional project, route/provider allow-lists,
  request counts, bulk revoke, and audit log.
- Device management for active license seats.
- Priority support through GitHub Issues.

Routes and fallback are enforced at request time. If Pro lapses, stored Routes
and Pro-only session key behavior do not continue as free runtime features.

## How to purchase

- Direct download and the Microsoft Store edition use **Stripe** for checkout.
- The Mac App Store edition uses **in-app purchase** (StoreKit), with Subscribe
  and Restore in the purchase flow.

## Billing boundary

Manifold pricing covers Manifold features only. Upstream model usage remains
between the user and each provider. Manifold does not resell provider tokens,
does not include third-party model credits, and does not change provider terms or
billing.

If the app behavior differs from this page, open an issue with the Manifold
version, operating system, license status, and a short reproduction.
