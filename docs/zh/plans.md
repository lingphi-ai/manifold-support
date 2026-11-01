# 版本与计划

Free 和 Pro 都提供本地 HTTP 网关、浏览器授权账户、模型列表、聊天请求、
Anthropic Messages、供应商支持时的 embeddings，以及 provider-native passthrough。
Manifold 包含 Ollama、LM Studio、vLLM 等 27 个预设。

## Free

- 3 个远程或本地服务器服务商。
- 浏览器授权的 Codex 订阅账户。
- 1 条路由，可配置 weighted 或 failover 排序。
- 3 个有效本地会话密钥，支持过期和撤销。
- 7 天网关用量历史。
- 内置对话和只读工作区 agent 工具。

## Pro

- 最多 10 个远程或本地服务器服务商。
- 不限数量的路由和有效本地会话密钥。
- Chat/Messages 可重试错误后的跨供应商回退，以及模型别名。
- 密钥策略、项目标签、route/provider 范围、工具配对、批量撤销、请求归因与审计。
- 30 天网关历史，以及 agent 写入和编辑工具。
- 许可证恢复和设备管理。

托管 API 与本地服务器均占远程供应商限额，浏览器 OAuth 账户不占此限额。
这些是应用自身的权限；上游账户权益和模型使用费用仍由供应商管理。

## 购买渠道

直接下载和 Microsoft Store 版本当前提供一次性 $2.99 购买，有效期 365 天，
不会自动续费。Mac App Store 版本使用 StoreKit 年度订阅，购买前请查看商店显示
的价格与条款。关于页按安装渠道提供购买与恢复入口。

Manifold 不销售、租借或中转供应商 token，不包含模型额度，也不能替代上游账户。
如果实际应用与文档不同，请附上版本、渠道、许可证状态和脱敏复现步骤反馈。

当前 0.7.0 商店候选版的真实 StoreKit 购买／恢复验收仍待完成，见[发布说明](release-notes.md)。
