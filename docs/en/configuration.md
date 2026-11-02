# Configuration

Settings contains Dashboard, Gateway, Connect, Providers, Routes, Usage & Cost,
Diagnostics, Appearance, About, and Help. Chat is a separate view using the same
gateway and provider configuration.

## Gateway and Connect

The default base URL is `http://127.0.0.1:17680/v1`; the host stays `127.0.0.1`.
Gateway controls start, stop, restart, port, the master key, and session keys.
Free includes three active `mf_session_` keys. Pro adds policy management and
**Pair a local tool**, a human-armed window for key minting without the master key.

Connect provides OpenAI SDK, Anthropic SDK, and curl examples. Use a gateway key
in clients, while keeping upstream provider credentials inside Manifold.
OpenAI clients use the `/v1` base URL; Anthropic clients use the gateway origin.
Only `/llm.txt` and `/llms.txt` are public; health probes require authentication.

## Providers and catalogs

Choose **Remote** for a preset, **Custom** for manually configured HTTP URLs,
or **Subscription** for browser OAuth with Codex.
Manifold includes 27 quick-add presets including Ollama, LM Studio, and vLLM.
Local servers can be keyless if the server itself allows unauthenticated access.

Every configured HTTP API or local server counts as a remote or local-server provider:
Free permits 3 and Pro permits 10. Browser-connected accounts are available on
both tiers and do not count toward that HTTP-provider cap. Enable toggles apply
live without restarting the gateway.

Use **Refresh models** after changing an HTTP provider's URL or key. Remote
catalogs also refresh after add, after launch, and every 12 hours. Failed refreshes
keep the existing list; changed catalogs are saved and the gateway is rebuilt.

## Routes, usage, and Diagnostics

Free includes one named Route; Pro supports unlimited Routes. Both tiers can
configure weighted/failover ordering; retrying other providers after retryable
Chat/Messages errors and model aliases require Pro.

Usage & Cost summarizes only the gateway's own request ledger. Free retains
7 days and Pro supports 30 days. Diagnostics subscribes only to `app.log` and
`gateway.log`; All combines those two sources. Copy only redacted log snippets.

## Appearance and account

Appearance applies light/dark glass themes, accent, density, text size, and
English/Chinese language changes. About handles licenses, purchases, restoration,
and device management. Microsoft Store and existing direct-download installations use web
checkout; the Mac App Store candidate uses native StoreKit 2 verification on-device, without the License Server. Direct downloads are retired. See [Plans](plans.md).
