# API 参考

Base URL:

```text
http://127.0.0.1:17680/v1
```

认证方式：

```text
Authorization: Bearer ldd_<your-key>
```

当客户端支持时，Anthropic 风格请求也可以使用 `x-api-key`。

## 端点

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| GET | `/v1/models` | 列出可用模型和 routes。 |
| GET | `/v1/:provider/models` | 列出某个服务商的模型。 |
| POST | `/v1/chat/completions` | OpenAI 兼容聊天请求。 |
| POST | `/v1/:provider/chat/completions` | 指定某个服务商处理聊天请求。 |
| POST | `/v1/messages` | Anthropic 兼容 Messages 请求。 |
| POST | `/v1/:provider/messages` | 指定某个服务商处理 Messages 请求。 |
| POST | `/v1/embeddings` | 服务商支持时发送 embeddings 请求。 |
| POST | `/v1/native/:provider/*` | 服务商原生透传。 |

## 示例

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

```bash
curl http://127.0.0.1:17680/v1/messages \
  -H "x-api-key: ldd_<your-key>" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model":"manifold-default","max_tokens":256,"messages":[{"role":"user","content":"Hello"}]}'
```

错误会使用包含 code、message 和 type 的结构化响应。提交 API 问题时，请附上
路径、方法、响应状态码和隐藏敏感信息后的响应体。
