# Plans

Manifold has a Free tier and a Pro tier. Local CLI providers stay available on
both tiers because the core value is a reliable local gateway.

## Free

Free is intended for individual local workflows and first-time setup.

- Unlimited local CLI providers.
- 1 remote or local-server provider.
- 27 quick-add provider presets, including hosted APIs plus Ollama, LM Studio
  and vLLM local-server presets.
- OpenAI- and Anthropic-compatible local gateway.
- 7-day usage window.
- Local-only gateway bound to `127.0.0.1`.
- Manual Local Session Keys for safer project-level development.

## Pro

Pro is priced at **$2/year** and is intended for users who depend on multiple
providers and stable routing.

- Up to 10 remote or local-server providers.
- Routes with weighted targets.
- Fallback across compatible providers.
- Model aliases.
- Full usage history.
- Priority support through GitHub Issues.
- Advanced session policy, usage attribution, and bulk revoke are planned for
  heavier workflows.

Subscription handling is connected to Manifold licenses and will be enabled with
public desktop downloads. Pricing and limits should be treated as product
documentation; if the app behavior differs, open an issue with the version and a
short reproduction.

The remote provider limit applies to hosted API presets and local-server presets
because both are configured as HTTP providers. It does not limit local CLI
providers such as Claude, Codex, or Gemini.
