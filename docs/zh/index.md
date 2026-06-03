# Manifold 文档

Manifold 是一个本地 AI 模型网关。它以桌面托盘应用运行，并在
`http://127.0.0.1:17680/v1` 暴露一个兼容端点。兼容客户端可以通过这个端点
列出模型、发送 OpenAI Chat Completions、发送 Anthropic Messages、请求
embeddings，或使用服务商原生透传能力。

## 从这里开始

- [快速开始](quick-start.md)：启动 Manifold、添加服务商并发送第一个请求。
- [核心概念](concepts.md)：理解网关、服务商、Routes、模型 ID 和用量历史。
- [配置](configuration.md)：配置本地 CLI、远程 API、端点和安全选项。
- [API 参考](api-reference.md)：路径、认证方式和 curl 示例。
- [安全](security.md)：本地会话密钥、服务商密钥隔离，以及非转售边界。
- [版本与计划](plans.md)：Free 与 Pro 的能力边界。
- [故障排查](troubleshooting.md)：常见配置和服务商问题。
- [发布说明](release-notes.md)：产品状态和变更记录。

## 支持

如果文档没有解决你的问题，请使用仓库的 issue 模板。提交时请包含操作系统、
Manifold 版本、服务商类型、使用的端点路径，以及隐藏敏感信息后的错误消息。

本仓库只服务 Manifold 这个产品。单产品范围可以让用户更容易搜索文档、跟踪
issue，并保持配置说明准确。
