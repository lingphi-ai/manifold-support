# API 参考

Base URL:

```text
http://127.0.0.1:17680/v1
```

网关只绑定 `127.0.0.1`，不用于接收局域网或公网流量。

## 认证

除 `GET /llm.txt`（以及 `/llms.txt`）和健康检查端点不需要认证外，每个请求都需要
`Authorization: Bearer <apiKey>`。

OpenAI 风格客户端应发送：

```text
Authorization: Bearer ldd_<your-key>
```

开发工程中的工具也可以使用本地会话密钥：

```text
Authorization: Bearer mf_session_<short-lived-key>
```

当客户端只能配置 Anthropic 风格 key header 时，也可以使用 `x-api-key`。

## 端点

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| GET | `/health/live` | 存活检查。 |
| GET | `/health/ready` | 就绪检查。 |
| GET | `/v1/models` | 以 `provider/model` 形式列出聚合模型。 |
| GET | `/v1/:provider/models` | 列出某个服务商的模型。 |
| POST | `/v1/chat/completions` | OpenAI 兼容聊天请求，按模型路由。 |
| POST | `/v1/:provider/chat/completions` | 指定某个服务商处理 OpenAI 聊天请求。 |
| POST | `/v1/messages` | Anthropic Messages 请求，按模型路由。 |
| POST | `/v1/claude/messages` | Messages 的 Claude 兼容别名。 |
| POST | `/v1/:provider/messages` | 指定某个服务商处理 Messages 请求。 |
| POST | `/v1/embeddings` | 服务商支持时发送 OpenAI 兼容 embeddings 请求。 |
| ALL | `/v1/native/:provider/*` | 对服务商原生 API 的底层透传。 |
| POST | `/v1/session-keys` | 签发短期、限定范围的本地会话密钥（Pro）。 |
| GET | `/llm.txt`（以及 `/llms.txt`） | 实时生成的 Markdown 发现文档，无需认证。 |

## 模型路由

`model` 字段控制路由方式：

- `provider/model` 强制使用某个已配置服务商，并把 `model` 发给上游。
- 普通模型名会按优先级在兼容服务商之间选择。
- Pro Route id 会分发到该 route 的目标。
- Pro 生效时，模型别名可以在路由前把一个客户端名称改写到另一个目标。

Routes 会先于普通模型路由匹配。route id 不保证出现在 `/v1/models` 中，客户端
应直接使用你配置的 route 名称。

## OpenAI chat 示例

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openrouter/openai/gpt-4o-mini",
    "messages": [{"role":"user","content":"Hello"}]
  }'
```

支持 streaming：

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "fast-coder",
    "stream": true,
    "messages": [{"role":"user","content":"Stream one short sentence."}]
  }'
```

远程 OpenAI stream 会在上游支持时使用 Server-Sent Events。如果服务商没有提供
streaming，Manifold 可以用完整响应模拟增量输出。

两种格式都支持工具/函数调用——OpenAI `functions` 和 Anthropic `tool_use`——
streaming 和非 streaming 请求均可。

## Anthropic Messages 示例

```bash
curl http://127.0.0.1:17680/v1/messages \
  -H "x-api-key: mf_session_<short-lived-key>" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 256,
    "messages": [{"role":"user","content":"Hello"}]
  }'
```

如果要强制某个支持 Anthropic 格式的服务商，可以调用 `/v1/:provider/messages`。

## Embeddings

使用 `/v1/embeddings` 调用 OpenAI 兼容远程服务商：

```bash
curl http://127.0.0.1:17680/v1/embeddings \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"openai/text-embedding-3-small","input":"hello"}'
```

Manifold 会按路由顺序尝试兼容服务商。如果没有服务商支持该模型的 embeddings，
请求会返回结构化错误。

## 原生透传

`/v1/native/:provider/*` 用于对服务商原生 API 的底层透传——Manifold 没有
标准化的服务商特定端点。该路由注册为 `ALL`，因此在路由层面会接受任意方法，
但对于远程服务商，原生转发**只允许 GET 和 POST**；其他方法会被安全 allow-list
拒绝。路径会被限制在配置的服务商 origin 内。带 allowed routes 的会话密钥不能
使用原生透传，因为原生透传绕过 route 名称。

## 会话密钥

`POST /v1/session-keys` 签发一个短期、限定范围的本地会话密钥（Pro）。可以用
主网关 key 认证，也可以用「Pair a CLI」窗口签发的 `pairing_code` 认证。请求体
接受 `label`、`ttl`（`1h`、`1d`、`7d`、`30d` 或 `never`）、`allowedRoutes`、
`allowedProviders` 和 `pairing_code`：

```bash
curl http://127.0.0.1:17680/v1/session-keys \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "claude-code",
    "ttl": "7d",
    "allowedRoutes": ["fast-coder"],
    "allowedProviders": ["openrouter"]
  }'
```

响应只返回一次新密钥：

```json
{ "token": "mf_session_<short-lived-key>", "expires_at": "2026-07-01T00:00:00.000Z" }
```

## 发现文档

`GET /llm.txt`（以及 `/llms.txt`）返回一个根据你的配置和服务商注册表实时生成的
Markdown 发现文档——base URL、已启用服务商、可调用模型和端点。它无需认证，
便于编码 agent 和 CLI 直接获取。

## 错误

错误响应是结构化 JSON：

```json
{
  "error": {
    "code": "provider_execution_error",
    "message": "Provider execution failed",
    "type": "api_error"
  }
}
```

常见 code 包括 `invalid_request`、`provider_not_found`、`provider_disabled`、
`provider_auth_required`、`not_supported`、`provider_unavailable` 和
`provider_execution_error`。

远程服务商的 HTTP 错误会原样透传——上游状态码和响应体保持不变，不做掩盖。

提交 API 问题时，请附上路径、方法、请求格式、响应状态码和隐藏敏感信息后的
响应体。
