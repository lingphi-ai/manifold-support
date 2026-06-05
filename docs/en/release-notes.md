# Release Notes

## v0.1.1 provider catalog and desktop build targets

Date: 2026-06-05

User-visible changes:

- Desktop build targets now cover macOS arm64, macOS x64, Windows x64, and
  Windows arm64. Early builds may still be unsigned, so follow the operating
  system warning flow only for files from a trusted Lingphi release.
- The Add provider flow is collapsed into **Local CLI**, **Remote**, and
  **Custom**. Remote providers are selected from a dropdown instead of a wide
  multi-tab layout.
- Manifold ships 27 quick-add provider presets. The catalog includes hosted API
  providers such as OpenAI, Anthropic, Gemini API, DeepSeek, GLM, OpenRouter,
  Qwen, Moonshot/Kimi, Perplexity, Fireworks, Cerebras, Cohere, NVIDIA NIM,
  SambaNova, MiniMax, Doubao, ERNIE, Hunyuan, StepFun, and SiliconFlow.
- Ollama, LM Studio, and vLLM are now built-in local-server presets. They use
  localhost OpenAI-compatible URLs and allow keyless upstream access when the
  local server itself does not require auth.
- Built-in provider names are localized in the Chinese UI for providers with
  recognizable Chinese names, such as GLM, Qwen, DeepSeek, and Moonshot/Kimi.
- The Local Session Key generator no longer shows a Project field. The shipping
  UI asks for a label and TTL; project policies and allow-lists remain policy
  work for builds that explicitly expose them.

## v0.1.0 early product documentation

Manifold is in early product development. This initial documentation release
created the public support and documentation home for the product before the
installer and provider catalog work above.

Initial documentation includes:

- Quick start for the local gateway at `http://127.0.0.1:17680/v1`.
- Concepts for gateway, providers, model ids, routes, fallback, and usage.
- API reference for `/v1/models`, `/v1/chat/completions`, and `/v1/messages`.
- Security documentation for Local Session Keys and the non-resale boundary.
- Free and Pro plan notes, including Pro at `$2/year`.
- Troubleshooting guidance and structured issue templates.

Future release notes should record user-visible changes: installer availability,
supported operating systems, provider behavior, API changes, plan changes, and
known support issues. Keep entries concise and link to related issues when a
change fixes a reported problem.
