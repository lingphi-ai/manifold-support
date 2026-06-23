# 故障排查

## 网关未就绪

确认 Manifold 正在托盘中运行，并且配置端口没有被其它本地进程占用。默认网关
为 `http://127.0.0.1:17680/v1`。如果你修改过端口，也需要同步修改客户端配置。

可以用 `/health/live` 和 `/health/ready` 区分进程是否存活、网关是否就绪。

## 返回 Unauthorized

每个请求都需要 Manifold 生成的 API key 或有效的本地会话密钥。只有在你能同步
更新所有客户端时，才应重新生成主 API key。提交日志前请隐藏 key。

如果本地会话密钥失败，请检查它是否已过期、已撤销、超出 route/provider
allow-list，或因为当前安装是 Free 而不可用。

## 服务商无法检测

对于本地 CLI 服务商，请在终端运行服务商自己的命令，并确认已经认证。如果
Manifold 是从 Finder 或桌面快捷方式启动的，请在 Providers 中使用 Auto Detect，
让 Manifold 解析 binary 的绝对路径。

对于远程服务商，请检查 base URL 和 API key。托管服务商必须使用安全 HTTPS
URL。localhost URL 只允许用于 Ollama、LM Studio、vLLM 这类本地服务器预设。

## 服务商没有模型

远程模型目录从 `/v1/models` 获取。如果服务商没有返回可用模型，Manifold 会保留
现有列表。

修正 provider key、修改 base URL 或启动本地服务器后，点击 **Refresh models**。
Manifold 也会在应用启动后和每 12 小时刷新已启用远程目录。

对于 Ollama、LM Studio 或 vLLM，请先确认本地服务器已经在预设 URL 上运行，再
刷新模型：

- Ollama: `http://localhost:11434/v1`
- LM Studio: `http://localhost:1234/v1`
- vLLM: `http://localhost:8000/v1`

如果本地服务器允许免 key 访问，这些预设可以不填写 API key。如果服务器要求
认证，请在 Manifold 中填写 key 后重新测试。

## 无法再添加远程服务商

Free 包含 1 个远程或本地服务器服务商。本地 CLI 服务商不计入该限制，但托管 API
预设和本地服务器预设会计入。需要最多 10 个远程/本地服务器服务商时，请升级到
Pro。

超出额度的远程服务商在实际服务集合中会被视为 disabled，而不只是添加表单被
限制。

## Routes 没有 fallback

Routes 和 fallback 属于 Pro 能力。同时确认：

- 客户端请求的 `model` 是 route id；
- 目标服务商已启用；
- 每个目标支持当前请求格式；
- 上游模型在目标服务商中存在；
- 主目标错误是可重试错误。不可重试的 provider error 会停止该 route。

不能处理 Anthropic Messages 的服务商，无法作为 Anthropic 请求的 fallback 目标。

## Streaming 中断或返回错误事件

如果服务商在第一个 stream byte 之前失败，Manifold 可以在 fallback 可用时尝试
下一个兼容目标。一旦已经开始写入 stream，Manifold 无法再修改 HTTP 状态码，只能
用 error event 结束 stream。

远程 stream 还带有字节上限和 idle timeout，用于保护本地应用。

## 服务商显示 "Disabled"

标记为 **Disabled** 的服务商已被停用，不会对外提供服务。请在 Providers 面板重新
启用；更改实时生效，无需重启网关。注意：Free 上超出额度的远程服务商在实际服务
集合中也会被视为 disabled。

## "Pair a CLI" 配对码过期

配对码只在很短的时间窗口内有效（约 60 秒）。如果在工具铸造 key 之前过期，请重新
触发 "Pair a CLI" 生成新的配对码，再把新的铸造命令粘贴到工具中。

## 编码工具无法铸造会话密钥

铸造会话密钥需要 Manifold 主 API key，或来自 "Pair a CLI" 的有效配对码。另外注意
本地会话密钥是 Pro 能力：在 Free 上会话密钥认证会被拒绝，只有主 key 可用。

## 用 /llm.txt 发现网关

agent 和工具可以获取 `/llm.txt` 来了解网关的能力和端点。当 agent 需要发现
Manifold 暴露了哪些功能时，把它指向该路径。

## 上游服务商错误原样显示

远程服务商错误会原样透传。如果请求失败时返回的消息不像是 Manifold 给出的，请仔细
阅读：那是上游服务商的错误（例如 key 错误、限流或未知模型）。请在对应服务商处
修复后重试。

## 原生透传失败

原生透传（native passthrough）只允许 `GET` 和 `POST`，拒绝 redirect，并拒绝逃出
服务商 origin 的路径。
带 allowed routes 的会话密钥不能使用原生透传，因为原生透传绕过 route 名称。

## 公开下载不是最新源码 tag

私有 Manifold 源码仓库可能已经有比公开 support release 更新的 tag。公开安装包
通过这里分发：

https://github.com/lingphi-ai/manifold-support/releases/latest

如果新源码 tag 已存在但公开 release 尚未移动，请等待 release-sync workflow，
或继续使用 latest 公共安装包。

## 提交 issue 时

请提供操作系统、Manifold 版本、服务商类型、端点路径、请求格式、响应状态码、
相关许可证版本，以及隐藏敏感信息后的错误消息。不要包含本地 API key、远程服务商
key、本地会话密钥、许可证 key、私有 prompt 或原始服务商响应。
