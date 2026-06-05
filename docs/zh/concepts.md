# 核心概念

## 网关

网关是 Manifold 的本地 HTTP 服务。默认监听 `127.0.0.1:17680`，并提供兼容的
`/v1` 端点。客户端只需要知道本地端点和 Manifold API key。

## 服务商

服务商是 Manifold 可以调用的后端。服务商可以是本地 CLI 工具，也可以是远程
HTTP API。本地 CLI 适合已经在机器上登录认证的工具；远程服务商使用 API key
和兼容 base URL。

Manifold 现在也把本地 OpenAI 兼容服务器作为远程风格的服务商处理，因为它们
同样通过 HTTP 调用。Ollama、LM Studio 和 vLLM 有内置预设，默认使用
localhost URL，并支持可选认证。这样无论上游是 CLI 订阅、托管 API 账号还是
本地模型服务器，客户端都可以继续使用同一个 Manifold 端点。

## 模型 ID

Manifold 可以暴露 `provider/model` 形式的服务商作用域模型 ID。需要指定某个
服务商时使用这种 ID；希望 Manifold 在兼容服务商之间选择时，可以使用 route
或普通模型名。

## Routes

Routes 是面向客户端的模型名。一个 route 可以指向一个或多个服务商目标。Pro
Routes 支持加权目标和 fallback，因此客户端配置可以保持稳定，后端选择可以
在 Manifold 中调整。

## 用量

Manifold 会记录请求元数据和 token 估算，方便按模型、服务商和日期查看用量。
Free 保留较短窗口，Pro 解锁完整用量历史。

## 本地优先安全模型

网关只绑定 loopback。配置和密钥存储在本地，日志应隐藏敏感值。请把服务商
key 与 Manifold key 都当作密钥处理。

本地会话密钥也处在这个本地优先边界内。它由 Manifold 生成，存储为 hash，
只显示一次，并可按有效期过期。项目工具拿到的是网关凭证，而不是真实服务商
key。
