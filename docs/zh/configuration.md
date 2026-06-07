# 配置

Manifold 的配置围绕本地网关、服务商、Routes 和用量可见性展开。

## 网关

默认 base URL 是：

```text
http://127.0.0.1:17680/v1
```

host 只允许 loopback。如果 `17680` 已被其它本地进程占用，可以在 Settings
中修改端口。每个请求都需要 `Authorization: Bearer ldd_<your-key>`；部分
Anthropic 风格客户端也可以使用兼容的 key header。
在开发工程中的工具使用 Manifold 时，建议生成 `mf_session_<short-lived-key>`
这样的短期本地会话密钥，避免真实服务商凭证进入项目环境。

## 本地 CLI 服务商

本地服务商依赖已经安装并认证过的命令行工具。如果检测不到服务商，请先在终端
确认对应命令位于 PATH 且可以正常运行，再提交支持问题。

## 远程 API 服务商

添加服务商表单被收敛成三个入口：

- **Local CLI**：同一台机器上已安装并认证的 Claude、Codex 或 Gemini。
- **Remote**：内置预设下拉框。
- **Custom**：手动填写 provider id、显示名称、兼容 base URL 和模型列表。

Manifold 内置 27 个 quick-add 预设，覆盖托管 API 与本地服务器运行时。
托管预设包括 OpenAI、Anthropic、Gemini API、DeepSeek、GLM、Mistral、
Groq、xAI、OpenRouter、Together、Moonshot/Kimi、Qwen、Perplexity、
Fireworks、Cerebras、Cohere、NVIDIA NIM、SambaNova、MiniMax、Doubao、
ERNIE、Hunyuan、StepFun 和 SiliconFlow。

Ollama、LM Studio、vLLM 是本地服务器预设。它们指向 localhost 上的
OpenAI 兼容 URL；如果本地服务器本身不要求认证，可以不填写 API key。如果
本地服务器要求 key，请在 Manifold 中填写，Manifold 会作为 bearer auth 发送。

Free 包含 1 个远程或本地服务器服务商；Pro 最多支持 10 个远程或本地服务器
服务商。本地 CLI 服务商不计入这个远程服务商限制。

## Routes 与别名

Routes 为客户端创建稳定模型名。当你想把客户端从一个后端切换到另一个后端、
同时不修改客户端配置时，应使用 Routes。加权路由、fallback 和模型别名属于
Pro 能力。

## 本地会话密钥

本地会话密钥由 Manifold 在本机生成，供 Claude Code、测试脚本或项目内工具
访问 Manifold localhost 网关。它只认证到 Manifold 本地网关，不暴露、不替代、
不销售、租借或中转服务商 API key。项目结束或密钥可能进入日志时应立即撤销。

当前生成器只要求标签和有效期。项目策略、allow-list、按项目归因和批量撤销
属于 Pro 方向的策略能力；除非你安装的 Manifold 版本在 UI 中明确显示这些
控制项，否则不要假设它们已经可用。

## 语言

Manifold 支持 English 和简体中文。它可以跟随操作系统语言，也可以在 Settings
中手动覆盖。
