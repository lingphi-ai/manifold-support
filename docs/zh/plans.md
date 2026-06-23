# 版本与计划

Manifold 提供 Free 和 Pro 两个版本。核心本地网关和本地 CLI 服务商在两个版本中
都可用。

## Free

Free 适合个人本地工作流和首次配置。

- 不限数量的本地 CLI 服务商。
- 1 个远程或本地服务器服务商。
- 27 个 quick-add 服务商预设，包括托管 API 以及 Ollama、LM Studio、vLLM
  本地服务器预设。
- 兼容 OpenAI 和 Anthropic 的本地网关。
- 模型列表、chat completions、Messages 请求、服务商支持时的 embeddings，以及
  provider-native passthrough。
- 7 天用量窗口。
- 只绑定 `127.0.0.1` 的本地网关。

远程服务商限制适用于托管 API 预设和本地服务器预设，因为二者都作为 HTTP
服务商配置；它不限制 Claude、Codex、Gemini 这类本地 CLI 服务商。

## Pro

Pro 价格为 **$2/year**（按年订阅，自动续费），适合依赖多个服务商、稳定模型名、
路由策略和更安全项目凭证的用户。

- 最多 10 个远程或本地服务器服务商。
- 支持 failover 和 weighted 分发的 Routes。
- 兼容服务商之间的 fallback。
- 模型别名。
- 完整用量历史。
- 本地会话密钥：TTL、可选项目、route/provider allow-list、请求次数、批量撤销
  和审计日志。
- 已激活许可证设备管理。
- 通过 GitHub Issues 获得优先支持。

Routes 和 fallback 会在请求路径上检查权限。如果 Pro 失效，已保存的 Routes 和
Pro-only 会话密钥行为不会继续作为免费运行时能力存在。

## 如何购买

- 直接下载版本和 Microsoft Store 版本通过 **Stripe** 结算。
- Mac App Store 版本使用**应用内购买**（StoreKit），购买流程中提供 Subscribe 和
  Restore。

## 账单边界

Manifold 价格只覆盖 Manifold 自身能力。上游模型使用量仍由用户和对应服务商
结算。Manifold 不转售 provider token，不包含第三方模型额度，也不会改变服务商
条款或账单。

如果应用行为与本页不同，请提交 issue，并附上 Manifold 版本、操作系统、许可证
状态和简短复现步骤。
