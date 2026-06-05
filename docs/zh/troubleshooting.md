# 故障排查

## 网关未就绪

确认 Manifold 正在托盘中运行，并且配置端口没有被其它本地进程占用。默认网关
为 `http://127.0.0.1:17680/v1`。如果你修改过端口，也需要同步修改客户端配置。

## 返回 Unauthorized

每个请求都需要 Manifold 生成的 API key。只有在你能同步更新所有客户端时，才
应重新生成 key。提交日志前请隐藏 key。

## 服务商没有模型

对于本地 CLI 服务商，请在终端运行服务商自己的命令，并确认已经认证。对于远程
服务商，请检查 base URL、API key 和模型列表。有些服务商会分别提供 OpenAI
兼容 URL 和 Anthropic 兼容 URL。

对于 Ollama、LM Studio 或 vLLM，请先确认本地服务器已经在预设 URL 上运行，
再刷新模型：

- Ollama: `http://localhost:11434/v1`
- LM Studio: `http://localhost:1234/v1`
- vLLM: `http://localhost:8000/v1`

如果本地服务器允许免 key 访问，这些预设可以不填写 API key。如果服务器要求
认证，请在 Manifold 中填写 key 后重新测试。

## 无法再添加远程服务商

Free 包含 1 个远程或本地服务器服务商。本地 CLI 服务商不计入该限制，但托管
API 预设和本地服务器预设会计入。需要最多 10 个远程/本地服务器服务商时，请
升级到 Pro。

## Routes 没有 fallback

Fallback 属于 Pro 能力。同时要确认目标服务商支持请求格式。不能处理
Anthropic Messages 的服务商，无法作为 Anthropic 请求的 fallback 目标。

## 提交 issue 时

请提供操作系统、Manifold 版本、服务商类型、端点路径、请求格式、响应状态码，
以及隐藏敏感信息后的错误消息。不要包含本地 API key、远程服务商 key、许可证
key 或私有 prompt。
