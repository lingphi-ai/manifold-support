# 配置

Manifold 的配置围绕 Settings 中的几个面板展开：Dashboard、Gateway、Connect、
Providers、Routes、Usage & Cost、Diagnostics、Appearance 和 About。

## Dashboard

Dashboard 是运行状态视图。用它确认网关是否运行、服务商是否启用、最近请求是否
进入 Manifold，并快速跳转到负责该问题的面板。

如果还没有服务商，从 **Providers** 开始。

## Gateway

默认 base URL：

```text
http://127.0.0.1:17680/v1
```

host 始终是 `127.0.0.1`。如果本机其它进程占用了 `17680`，可以修改端口。保存
网关设置会重启网关，因此客户端也需要同步更新端口。

除 `/llm.txt` 外，每个路由都需要本地凭证：

- Manifold 生成的 API key，通常是 `ldd_<...>`；
- 或 Pro 会话密钥启用时的本地会话密钥，通常是 `mf_session_<...>`。

配置是写入 `0600` 权限的本地纯 JSON；API key 和其它密钥在静态时加密存储（在
macOS 上通过 `safeStorage` 使用 Keychain）。

重新生成 Manifold API key 会重启网关，并使仍使用旧 key 的客户端失效。

## Connect

Connect 是复制给客户端使用的面板，包含：

- 本地 base URL；
- 网关 key 复制控件；
- OpenAI 兼容示例；
- Claude Code 等 Anthropic 兼容工具的示例；
- 按服务商指定的端点路径；
- 可以调用的 route 名称和 provider id。

Claude Code 的 base URL 不带 `/v1`：

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:17680
export ANTHROPIC_API_KEY=mf_session_<short-lived-key>
```

启用 Pro 会话密钥后，**Pair a CLI**（配对 CLI）让工具通过一个短配对码自行生成
带 scope 的 `mf_session_` key，因此无需主 API key。

## Providers

添加服务商表单有三种模式：

- **Local CLI**：同一台机器上已经安装并认证的 Claude、Codex 或 Gemini。
  Manifold 可以从 PATH 和登录 shell 中自动检测 binary 的绝对路径。每个 CLI 行
  都有一个实时生效的 CLI⇄OAuth 传输切换：`cli` 会启动 binary，`oauth` 则直接
  调用服务商基于 OAuth 认证的订阅 API。本地 CLI 通过只读 prompt 模拟支持
  function/tool 调用。
- **Remote**：托管 API 和本地服务器 quick-add 预设。
- **Custom**：手动填写 provider id、显示名称、模型列表、OpenAI base URL、
  Anthropic base URL 和 API key。

启用或停用服务商实时生效，无需重启。

Manifold 内置 27 个 quick-add 预设，覆盖托管 API 与本地服务器运行时。托管预设
包括 OpenAI、Anthropic、Gemini API、DeepSeek、GLM、Mistral、Groq、xAI、
OpenRouter、Together、Moonshot/Kimi、Qwen、Perplexity、Fireworks、Cerebras、
Cohere、NVIDIA NIM、SambaNova、MiniMax、Doubao、ERNIE、Hunyuan、StepFun 和
SiliconFlow。

Ollama、LM Studio、vLLM 是本地服务器预设。它们指向 localhost 上的 OpenAI
兼容 URL；如果本地服务器本身不要求认证，可以不填写上游 API key。

在版本额度中，每个托管 API 预设和本地服务器预设都算作远程或本地服务器服务商。
本地 CLI 服务商不计入该限制。Free 允许一个远程服务商；Pro 最多允许 10 个。

在 Mac App Store 版本中，Manifold 运行在沙箱中且仅支持远程服务商——Local CLI
模式在该版本中不可用。

## 模型刷新

添加远程服务商时，Manifold 会尝试用服务商实时 `/v1/models` 目录替换预设的
种子模型。这个过程是 best effort：如果服务商离线、key 错误或端点没有返回可用
列表，Manifold 会保留现有模型列表。

修改凭证或启动本地服务器后，可以在服务商行点击 **Refresh models**。Manifold
也会在应用启动后和每 12 小时刷新已启用远程服务商。目录未变化时不会保存或重启；
目录变化时会保存并重启一次网关。

## Routes

Routes 是 Pro 能力。当客户端需要一个稳定模型名，并希望后端服务商可以切换时，
在 **Routes** 中创建。

一条 route 包含：

- id，即客户端请求中的模型名；
- 策略：`failover` 或 `weighted`；
- 一个或多个目标，每个目标包含服务商、可选上游模型和权重。

Failover 按目标顺序尝试。Weighted 根据相对权重选择首选目标，其余目标仍作为
fallback 顺序。如果目标不能处理当前 API 格式，会被跳过。

## Usage & Cost

Usage & Cost 有两个视图：

- **via gateway**：经过 Manifold 网关的请求，包括远程服务商和经网关调用的本地
  CLI；
- **CLI logs**：从部分 CLI 自己的本地用量日志读取的数据。

Free 限制在 7 天用量窗口。Pro 解锁完整用量历史。

## Diagnostics

Diagnostics 会 tail app、gateway 和 provider 日志。遇到以下情况时优先查看：

- 服务商无法检测；
- 请求返回 provider error；
- 模型刷新没有更新目录；
- 网关重启失败；
- Routes 行为不符合预期。

提交 issue 时只复制隐藏敏感信息后的日志片段。

## 外观和语言

Appearance 控制样式、浅色/深色模式、accent 颜色、字体大小和语言。Manifold
支持 English 和简体中文，可以跟随系统语言，也可以手动覆盖。

## About、订阅和设备

About 包含订阅、许可证激活、账单入口、设备管理和产品信息。Free 覆盖一个远程
服务商和 7 天用量窗口；Pro（每年 $2）将远程服务商上限提升到 10，并解锁 Routes、
会话密钥、模型别名、完整用量历史和设备管理。应用打开的账单和许可证链接只允许
指向受信任的 HTTPS host。Pro 许可证 token 会绑定 Manifold 产品和设备。

Manifold 通过直接下载、Mac App Store 和 Microsoft Store 分发。
