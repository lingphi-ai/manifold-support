# Quick Start

This guide gets a compatible client talking to Manifold through the local gateway
at `http://127.0.0.1:17680/v1`.

Manifold `v0.1.1` targets macOS Apple Silicon, macOS Intel, Windows x64, and
Windows arm64 builds. Early builds may be unsigned: on macOS use right-click
Open if Gatekeeper blocks the app; on Windows choose the SmartScreen "More info"
path only when the file came from a trusted Lingphi release.

## Requirements

- A supported desktop operating system.
- At least one local CLI provider already installed and authenticated, one
  hosted API provider with an API key, or one local OpenAI-compatible server
  such as Ollama, LM Studio, or vLLM.
- A client that can use OpenAI-style or Anthropic-style endpoints.

## Steps

1. Launch Manifold and keep the tray app running.
2. Open Settings and add a provider. Choose **Local CLI** for Claude, Codex, or
   Gemini; choose **Remote** for a quick-add preset; choose **Custom** for a
   provider not in the preset list.
3. For remote presets, pick from the provider dropdown. Manifold ships 27
   quick-add presets including OpenAI, Anthropic, DeepSeek, GLM, OpenRouter,
   Qwen, Moonshot/Kimi, Perplexity, Fireworks, Cerebras, Cohere, NVIDIA NIM,
   SambaNova, MiniMax, Doubao, ERNIE, Hunyuan, StepFun, SiliconFlow, Ollama,
   LM Studio, and vLLM.
4. If you choose Ollama, LM Studio, or vLLM, the default localhost URL can run
   without an API key when that local server is configured without auth. Click
   Refresh models after the local server is running.
5. Open the Connect panel and copy the local base URL plus a generated Manifold
   key. For project tools, prefer a short-lived Local Session Key instead of a
   long-lived gateway key.
6. Configure your client to use the base URL `http://127.0.0.1:17680/v1`.
7. Test the connection by listing models.

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

Then send a chat request:

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer mf_session_<short-lived-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"manifold-default","messages":[{"role":"user","content":"Hello"}]}'
```

## Security note

Manifold binds the gateway to `127.0.0.1` and requires a bearer token on each
request. Provider API keys stay in Manifold local storage. Local Session Keys are
scoped credentials for the Manifold localhost gateway; they are generated with a
label and TTL, shown once, revocable, and not provider API keys or model credits.
Do not share generated keys in issues,
screenshots, shell history, or support logs.
