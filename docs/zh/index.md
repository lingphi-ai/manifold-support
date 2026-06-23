# Manifold 文档

Manifold 是面向开发工具的本地 AI 模型网关。它以桌面托盘应用运行，并在
`http://127.0.0.1:17680/v1` 暴露一个兼容端点。兼容客户端可以列出模型、发送
OpenAI Chat Completions、发送 Anthropic Messages、请求 embeddings，或通过
Manifold 转发服务商原生 API。

本文档反映 Manifold `v0.1.12` 的产品行为。公开桌面安装包通过公共 support
release 渠道和 Lingphi 主站分发。

## Manifold 做什么

- 在本机运行只绑定 `127.0.0.1` 的本地网关，不暴露公网或局域网入口。
- 连接本地 CLI 服务商：同一台机器上已经安装并登录的 Claude、Codex、Gemini。
  每个都可以通过本地 CLI binary（"CLI" 传输方式）访问，或直接通过服务商
  OAuth 认证的 API（"OAuth" 传输方式）复用用户的订阅访问。**Providers**
  中每行的 CLI⇄OAuth 开关可实时切换传输方式。
- 连接托管 API 服务商：内置 27 个 quick-add 预设，包括 OpenAI、Anthropic、
  Gemini API、DeepSeek、GLM、Mistral、Groq、xAI、OpenRouter、Together、
  Qwen、Moonshot/Kimi、Perplexity、Fireworks、Cerebras、Cohere、NVIDIA NIM、
  SambaNova、MiniMax、Doubao、ERNIE、Hunyuan、StepFun、SiliconFlow。
- 连接本地服务器预设：Ollama、LM Studio、vLLM，使用 localhost 上的 OpenAI
  兼容 URL，并支持可选上游认证。
- 启用或禁用服务商即时生效，无需重启网关；UI 原地更新。
- 在 **Connect** 面板展示端点和 SDK 配置代码片段，并在 **Help** 面板内置
  开发者手册。
- 发布 `/llm.txt`：网关根路径下一个免认证的发现文档，编码 agent 和 CLI
  可以读取它来了解可用端点。
- 在添加远程服务商、用户点击 Refresh models、应用启动后和每 12 小时时刷新
  远程模型目录。
- 支持 Pro Routes：稳定的客户端模型名，可以用 failover 或 weighted 策略指向
  多个服务商/模型目标。
- 支持本地会话密钥（Pro）：TTL、可选项目名、route/provider allow-list、请求
  次数、批量撤销和审计日志。`POST /v1/session-keys` 可签发短期受限密钥；CLI
  也可以通过 **Pair a CLI**（Gateway → Session keys）在不使用主密钥的情况下
  自行签发一个。
- 上游服务商的账号、账单和凭证仍属于用户与对应服务商之间。Manifold 不销售、
  租借或中转第三方模型 token。

## 下载与发布

Manifold 的公开桌面安装包发布在本仓库的 latest GitHub Release：

https://github.com/lingphi-ai/manifold-support/releases/latest

Lingphi 主站也提供按平台选择的直接下载入口：

https://www.lingphi.com/manifold/#download

公开 release 渠道应提供 macOS arm64、macOS x64、Windows x64 和 Windows arm64
构建。Manifold 也通过 Mac App Store（仅远程服务商版本，使用 StoreKit 应用内
购买）和 Microsoft Store 分发。

这些页面用于公开安装包、压缩包和用户可见的发布说明。私有 Manifold 源码仓库
保持内部使用，不作为公开下载入口。

## 从这里开始

- [快速开始](quick-start.md)：安装、添加服务商并发送第一个请求。
- [核心概念](concepts.md)：理解网关、服务商、模型 ID、Routes、会话密钥和用量。
- [配置](configuration.md)：配置 Gateway、Connect、Providers、Routes、Usage、
  Diagnostics、Appearance 和 About 面板。
- [API 参考](api-reference.md)：请求路径、认证方式、模型路由、streaming、
  embeddings 和原生透传。
- [安全](security.md)：服务商凭证隔离、本地会话密钥、URL 安全、许可证边界和
  非转售定位。
- [版本与计划](plans.md)：Free 和 Pro 的能力边界。Free 允许一个远程服务商
  （本地 CLI 服务商不限数量）；Pro（每年 2 美元）增加至多 10 个远程服务商、
  Routes、会话密钥、模型别名和完整用量历史。
- [故障排查](troubleshooting.md)：常见配置和服务商问题。
- [发布说明](release-notes.md)：产品状态、下载和变更记录。

## 支持

如果文档没有解决你的问题，请使用仓库的 issue 模板。提交时请包含操作系统、
Manifold 版本、服务商类型、端点路径、请求格式、响应状态码，以及隐藏敏感信息
后的错误消息。

本仓库只服务 Manifold 这个产品。单产品范围可以让用户更容易搜索文档、跟踪
issue，并保持配置说明准确。
