# Manifold 文档

Manifold 是桌面应用和本地 HTTP 网关，默认地址为 `http://127.0.0.1:17680/v1`。
本文档依据当前源码实现编写，源码包版本为 v0.8.0。官网直装版已停止提供，
下载前请查看发布页面。

**0.8.0 源码候选版**将 MAS Pro 改为一次性永久解锁，美国基准价 US$2.00。
MAS 通过原生 StoreKit 2 在本机验证，不再依赖 Lingphi 授权服务器；真实内购验收仍待完成。下方 0.7.0 TestFlight 状态属于旧年度订阅构建。
详见[版本与计划](plans.md)。

## 发布状态 — 2026-11-01

- **0.8.0 (0.8.0)**：原生 StoreKit 2 通用构建已处理完成，可供内部测试。应用与内购均排除法国（174 个地区），加密问卷阻塞已解除；尚未公开发布，也不代表真实内购验收通过。

- **0.7.0 尚未公开发布。** 通用 macOS 商店构建 0.7.0 (0.7.0) 已上传
  TestFlight 并处理完成，但状态仍为 **Missing Compliance**。尚未完成可用的
  私有 TestFlight 安装及真实 StoreKit 购买／恢复验收。
- 当日核对的 GitHub 最新公开版为 **v0.6.0**，包含 macOS arm64/x64 DMG 和
  Windows x64/arm64 ZIP。这些仅为历史归档；官网直装版已停止提供，不提供私有商店构建。
- Windows 0.7.0 尚未完成新构建及原生商店验收；已有 Microsoft Store 页面
  不代表 0.7.0 已在该商店上架。
- 当前指南描述 0.8.0 源码。Claude 和 Gemini 订阅 OAuth 已移除，API 密钥接入
  仍保留。Codex OAuth 实现保留，OpenAI 分发授权仍待取得。
- 商店待办及历史变更见[发布说明](release-notes.md)。

## 主要功能

- 通过 HTTP 连接托管 API 和本地模型服务器，提供 27 个 quick-add 预设，
  包括 Ollama、LM Studio 和 vLLM。
- 在浏览器中授权 Codex 订阅账户，使用 Manifold 自己的账户
  存储保存授权信息并刷新令牌。
- 统一提供 OpenAI Chat Completions、Anthropic Messages、模型列表、embeddings
  和 provider-native 透传。
- 添加供应商、点击 Refresh models、启动后以及每 12 小时刷新远程模型目录。
- 支持 weighted / failover Routes、会话密钥、网关用量、诊断和内置对话。
- 模型请求通过 HTTP 发送。Manifold 不销售、租借或中转第三方模型 token；
  上游账户权限与模型费用仍由用户和供应商管理。

Free 包含 3 个 HTTP 供应商、1 条路由、3 个有效会话密钥和 7 天用量历史。
Pro 支持 10 个 HTTP 供应商、不限数量的路由与密钥、Chat/Messages 失败回退、
模型别名、密钥策略、30 天历史及 agent 写入工具。两种版本都支持浏览器授权账户。

## 下载

https://github.com/lingphi-ai/manifold-support/releases/latest

https://www.lingphi.com/manifold/#downloads

安装包覆盖 macOS arm64、macOS x64、Windows x64 和 Windows arm64。
商店版本使用各自的打包与购买流程。

## 开始使用

- [快速开始](quick-start.md)：连接供应商并发出请求。
- [核心概念](concepts.md)：模型、Routes、密钥和用量。
- [配置](configuration.md)：设置与对话。
- [API 参考](api-reference.md)：端点与认证。
- [安全](security.md)：凭证存储和本地边界。
- [版本与计划](plans.md)：Free 和 Pro。
- [故障排查](troubleshooting.md)：定位配置与请求问题。
- [发布说明](release-notes.md)：公开版本历史。

## 支持

提交问题时附上应用版本、系统、供应商类型、请求路径、状态码和脱敏错误。
不要提供密钥、授权令牌、私有提示词或原始上游响应。
