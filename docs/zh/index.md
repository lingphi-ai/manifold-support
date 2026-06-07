# Manifold 文档

Manifold 是一个本地 AI 模型网关。它以桌面托盘应用运行，并在
`http://127.0.0.1:17680/v1` 暴露一个兼容端点。兼容客户端可以通过这个端点
列出模型、发送 OpenAI Chat Completions、发送 Anthropic Messages、请求
embeddings，或使用服务商原生透传能力。

本文档跟随当前 `v0.1.2` 公开版本。最新应用变更包括公开桌面下载、收敛后的
添加服务商流程、27 个 quick-add 服务商预设、Ollama / LM Studio / vLLM
免 key 本地服务器预设、中文界面的服务商品牌本地化，以及面向项目工具的简化
本地会话密钥生成器。

## 当前能力

- 本地 CLI 服务商：在同一台机器上已安装并认证的 Claude、Codex、Gemini。
- 托管 API 预设：OpenAI、Anthropic、Gemini API、DeepSeek、GLM、
  OpenRouter、Qwen、Moonshot/Kimi、Perplexity、Fireworks、Cerebras、
  Cohere、NVIDIA NIM、SambaNova、MiniMax、Doubao、ERNIE、Hunyuan、
  StepFun、SiliconFlow 等。
- 本地服务器预设：Ollama、LM Studio、vLLM，使用 OpenAI 兼容的 localhost
  URL。当本地服务器本身不要求认证时，可以不填写 API key。
- 桌面构建目标：macOS arm64、macOS x64、Windows x64、Windows arm64。

## 下载与发布

Manifold 的公开桌面安装包发布在本仓库的 latest GitHub Release：

https://github.com/lingphi-ai/manifold-support/releases/latest

该页面用于公开安装包、压缩包和用户可见的发布说明。私有 Manifold 源码仓库
保持内部使用，不作为公开下载入口。

Lingphi 主站也提供按平台选择的直接下载入口：

https://www.lingphi.com/manifold/#download

## 从这里开始

- [快速开始](quick-start.md)：启动 Manifold、添加服务商并发送第一个请求。
- [核心概念](concepts.md)：理解网关、服务商、Routes、模型 ID 和用量历史。
- [配置](configuration.md)：配置本地 CLI、远程 API、端点和安全选项。
- [API 参考](api-reference.md)：路径、认证方式和 curl 示例。
- [安全](security.md)：本地会话密钥、服务商密钥隔离，以及非转售边界。
- [版本与计划](plans.md)：Free 与 Pro 的能力边界。
- [故障排查](troubleshooting.md)：常见配置和服务商问题。
- [发布说明](release-notes.md)：产品状态、下载和变更记录。

## 支持

如果文档没有解决你的问题，请使用仓库的 issue 模板。提交时请包含操作系统、
Manifold 版本、服务商类型、使用的端点路径，以及隐藏敏感信息后的错误消息。

本仓库只服务 Manifold 这个产品。单产品范围可以让用户更容易搜索文档、跟踪
issue，并保持配置说明准确。
