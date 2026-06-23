# 核心概念

## 网关

网关是 Manifold 的本地 HTTP 服务。默认监听 `127.0.0.1:17680`，并提供兼容的
`/v1` 端点。客户端只需要本地 base URL 和 Manifold key。host 被强制为
loopback；Manifold 不提供局域网暴露能力。

## 服务商

服务商是 Manifold 可以调用的一个后端。

- **本地 CLI 服务商**：同一台机器上已经安装并认证的 Claude、Codex、Gemini。
  CLI 服务商有一种传输方式：**`cli`** 会启动 binary，**`oauth`** 则直接调用
  服务商基于 OAuth 认证的订阅 API。CLI⇄OAuth 切换按行控制，且实时生效。
- **远程服务商**：使用 OpenAI 兼容或 Anthropic 兼容 base URL 的 HTTP API。
- **本地服务器服务商**：Ollama、LM Studio、vLLM 这类 localhost 服务。它们在
  Manifold 中按远程 HTTP 服务商处理，并支持可选上游认证。

远程服务商 URL 在保存前会校验。托管服务商必须使用安全 HTTPS URL；本地服务器
预设是允许 localhost HTTP 的例外。

启用或停用服务商实时生效，无需重启。

### CLI 工具调用

本地 CLI 通过 prompt 模拟支持 function/tool 调用。这些调用以只读方式运行：
Manifold 会把工具调用回传给客户端，但自身从不执行任何工具，因此该路径零风险。

## 模型目录

每个服务商都有模型目录。本地 CLI 使用内置已知模型列表。远程服务商先使用预设
或自定义表单里的种子模型，然后 Manifold 会尝试从服务商的 `/v1/models` 获取
实时目录。

模型目录刷新发生在四个位置：

- 添加远程服务商时；
- 用户点击 **Refresh models** 时；
- 应用启动后不久；
- 应用运行期间每 12 小时。

如果实时获取失败，配置会继续使用已有模型列表。只有目录实际变化时，Manifold
才会保存并重启网关。

## 模型 ID

Manifold 接受几种模型 ID：

- `deepseek-chat` 这类普通模型名会让 Manifold 按优先级选择兼容服务商。
- `provider/model` 这类带服务商前缀的 ID 会强制使用某个服务商。Manifold 只按
  第一个 `/` 切分，因此 OpenRouter 这类带斜杠的模型名仍可工作。
- `fast-coder` 这类 route 名称会使用配置好的 Pro Route。
- 模型别名可以在 Pro 生效时把一个客户端名称改写到另一个目标。

`GET /v1/models` 会把聚合模型命名为 `provider/model`，避免不同服务商的模型名
冲突。

## Routes

Routes 是面向客户端的模型名，可以分发到一个或多个 provider/model 目标。它是
Manifold 的模型负载均衡器。

- **Failover** (`failover`) 按目标顺序尝试。
- **Weighted** (`weighted`) 按相对权重选择首选目标，并把剩余目标作为 fallback
  顺序。

Routes 在请求路径上也会检查 Pro 权限，而不仅是 UI 控制。如果 Pro 失效，已存
Routes 会被忽略，Manifold 会回到普通服务商路由。

## 本地会话密钥

本地会话密钥是 Manifold 为本机工具生成的网关凭证。它以 `mf_session_` 开头，
以 hash 存储，只显示一次，并可过期或撤销。在 Pro 中，key 还可以带可选 TTL、
项目名、route allow-list、provider allow-list、请求次数、最近使用时间和审计
事件。

本地会话密钥只认证到本地网关。它不是服务商 API key，也不是预付费模型额度。

**Pair a CLI**（配对 CLI）让工具通过一个短配对码自行生成会话密钥，因此无需
主 API key。

## 用量

Manifold 会记录经过网关的请求，包括服务商 ID、模型、上游返回或估算的 token、
cache token，以及可选的 session-key 归因。Usage 面板还可以读取部分 CLI 自己
的本地用量日志。Free 保留较短窗口，Pro 解锁完整历史。

## Free 与 Pro

- **Free** 允许一个远程服务商（本地 CLI 不限），不包含 Routes、会话密钥或模型
  别名，用量历史限制为 7 天。
- **Pro**（每年 $2）允许最多 10 个远程服务商，并包含 Routes、会话密钥、模型
  别名、完整用量历史和设备管理。

## 分发渠道

Manifold 通过多个渠道分发：直接下载、Mac App Store 和 Microsoft Store。Mac
App Store 版本运行在沙箱中且仅支持远程服务商——本地 CLI 服务商在该版本中
不可用。

## 本地优先安全模型

配置是写入 `0600` 权限的本地 JSON；API key 和其它密钥在静态时加密存储（在
macOS 上通过 `safeStorage` 使用 Keychain）。许可证状态、会话密钥 hash、日志
和用量数据也保存在用户机器上。网关被硬锁定在 `127.0.0.1`，除 `/llm.txt` 外
每个路由都需要 Bearer API key（`ldd_…`）。服务商凭证不会通过 Manifold API
返回给客户端。日志和 issue 仍应当视为敏感，因为 prompt、模型名和错误响应
可能暴露私有工作流。
