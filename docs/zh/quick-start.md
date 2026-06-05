# 快速开始

本指南帮助你通过 `http://127.0.0.1:17680/v1` 让兼容客户端连接到
Manifold 本地网关。

Manifold `v0.1.1` 面向 macOS Apple Silicon、macOS Intel、Windows x64 和
Windows arm64 构建。早期构建可能尚未签名：macOS 被 Gatekeeper 拦截时可以
使用右键 Open；Windows 出现 SmartScreen 时，只应在文件来自可信 Lingphi
发布源的情况下继续。

## 准备条件

- 支持的桌面操作系统。
- 至少一个已经安装并认证过的本地 CLI 服务商，一个带 API key 的托管 API
  服务商，或一个本地 OpenAI 兼容服务器，例如 Ollama、LM Studio、vLLM。
- 一个可以配置 OpenAI 风格或 Anthropic 风格端点的客户端。

## 步骤

1. 启动 Manifold，并保持托盘应用运行。
2. 打开 Settings 添加服务商。选择 **Local CLI** 添加 Claude、Codex 或
   Gemini；选择 **Remote** 使用 quick-add 预设；选择 **Custom** 添加预设中
   没有的服务商。
3. 使用 Remote 预设时，从服务商下拉框选择。Manifold 内置 27 个 quick-add
   预设，包括 OpenAI、Anthropic、DeepSeek、GLM、OpenRouter、Qwen、
   Moonshot/Kimi、Perplexity、Fireworks、Cerebras、Cohere、NVIDIA NIM、
   SambaNova、MiniMax、Doubao、ERNIE、Hunyuan、StepFun、SiliconFlow、
   Ollama、LM Studio 和 vLLM。
4. 如果选择 Ollama、LM Studio 或 vLLM，默认 localhost URL 可以在本地服务器
   不要求认证时不填写 API key。启动本地服务器后点击 Refresh models。
5. 在 Connect 面板复制本地 base URL 和 Manifold 生成的 key。给开发工程中的
   工具使用时，优先生成短期本地会话密钥，而不是长期网关 key。
6. 在客户端中配置 `http://127.0.0.1:17680/v1`。
7. 先通过列出模型验证连接。

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

然后发送一次聊天请求：

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer mf_session_<short-lived-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"manifold-default","messages":[{"role":"user","content":"Hello"}]}'
```

## 安全说明

Manifold 只绑定 `127.0.0.1`，并要求每个请求都携带 bearer token。真实服务商
API key 留在 Manifold 本地存储中。本地会话密钥只是访问 Manifold localhost
网关的受限凭证；生成时只需要标签和有效期，只显示一次，可随时撤销。它不是
服务商 API key，也不是模型额度。不要在 issue、截图、shell history 或支持
日志中公开生成的 key。
