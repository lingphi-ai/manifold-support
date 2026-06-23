# 发布说明

Manifold 的公开安装包、压缩包和用户可见的发布说明发布在
manifold-support latest Release：

https://github.com/lingphi-ai/manifold-support/releases/latest

私有 Manifold 源码仓库保持内部使用，不作为公开下载入口。

## v0.1.12 App Store 版本

日期：2026-06-23

- App Store 版本：应用内购买流程在订阅前会展示完整的订阅详情，并提供隐私政策
  和使用条款（EULA）链接。

## v0.1.11 服务商开关实时生效

日期：2026-06-23

- 启用或停用服务商现在实时生效，无需重启网关。
- 界面就地刷新：行状态、已启用服务商数量和服务商健康状态都会更新，无需重新打开
  设置。
- 网关启动、停止、重启，或从托盘打开设置时，窗口不再闪烁。

## v0.1.10 Pair a CLI 改进

日期：2026-06-22

- "Pair a CLI" 现在会显示一条可直接粘贴的 `curl` 铸造命令。
- 修复了配对界面中的占位符插值，示例值现在正确渲染。
- 网关启动和重启就地更新，窗口不再闪烁。

## v0.1.9 发现与配对

日期：2026-06-21

- 新增 `/llm.txt` 发现端点，让 agent 和工具能了解网关的能力。
- 新增 `POST /v1/session-keys` 铸造端点，以及 "Pair a CLI"：一个免 key、由人工
  确认的配对流程，用于连接编码工具。
- 新增 Help 面板，内置开发者手册。
- Connect 现在列出这些新端点。
- 远程服务商错误原样透传，让你看到上游消息。
- 会话密钥校验在无法完成验证时按 fail closed 处理。
- Dashboard 修复：真实应用版本、服务商健康状态和最近请求。

## v0.1.8 Mac App Store 与 OAuth 服务商

日期：2026-06-15

- Mac App Store 版本：仅远程、沙箱化，使用 StoreKit 应用内购买实现 Subscribe 和
  Restore。
- 通过 OAuth 的 CLI 订阅服务商（Claude、Codex、Gemini），每行带 CLI ⇄ OAuth
  传输方式切换。
- 通过 prompt 模拟实现 CLI 工具调用。
- 远程服务商支持 function calling / `tool_use`。
- 可直接从设置添加 OAuth 服务商。

## v0.1.4–v0.1.7 商店打包与审计修复

日期：2026-06-09 .. 2026-06-12

- Microsoft Store 打包：Store DisplayName "Manifold AI Model Hub"、品牌化 Store
  磁贴，以及认证修复。
- Microsoft Store 版本使用 Stripe，而非平台应用内购买。
- 安全与正确性审计修复。

## v0.1.3 产品行为更新

日期：2026-06-08

状态：私有源码 tag 已到 `v0.1.3`；在新的公开安装包发布前，公共 support release
渠道仍指向最新已同步安装包。

本文档反映的用户可见变化：

- 远程模型目录会在添加远程服务商、应用启动后和每 12 小时时自动刷新。用户仍可
  手动点击 Refresh models。
- 服务商配置说明明确了实时模型获取行为：目录获取失败不会阻断配置，会保留已有
  种子模型列表。
- Routes 被明确为 Pro 模型负载均衡器，支持 failover 和 weighted 分发。真实
  provider smoke test 已验证两种策略。
- 本地会话密钥文档更新为 Pro 策略能力：项目名、route/provider allow-list、
  请求次数、批量撤销和审计日志。
- API 文档加入 `/health/live`、`/health/ready`、`/v1/embeddings` 和
  `/v1/native/:provider/*`，并补充 streaming 行为和 route 匹配规则。
- 安全文档补充 safeStorage secret、URL 安全检查、原生透传限制、设备绑定许可证
  token 和非转售边界。
- 发布流程加入 release-sync workflow，可以把私有 Manifold release 安装包同步到
  同 tag 的公开 `manifold-support` release。

## v0.1.2 公开桌面版本

日期：2026-06-07

公开资产：

版本页面：https://github.com/lingphi-ai/manifold-support/releases/tag/v0.1.2

- `Manifold-0.1.2-mac-arm64.dmg`
- `Manifold-0.1.2-mac-arm64.zip`
- `Manifold-0.1.2-mac-x64.dmg`
- `Manifold-0.1.2-mac-x64.zip`
- `Manifold-0.1.2-win-arm64.zip`
- `Manifold-0.1.2-win-x64.zip`

在更新公开 release 同步前，该页面仍是 Manifold 的公开下载入口。私有 Manifold
源码仓库保持内部使用；用户安装桌面应用或提交 issue 时不需要访问源码仓库。

## v0.1.1 服务商目录与桌面构建目标

日期：2026-06-05

用户可见变化：

- 桌面构建目标覆盖 macOS arm64、macOS x64、Windows x64 和 Windows arm64。
- 添加服务商流程收敛为 **Local CLI**、**Remote** 和 **Custom**。Remote 服务商
  从下拉框选择，不再使用过宽的多标签布局。
- Manifold 内置 27 个 quick-add 服务商预设。目录包括 OpenAI、Anthropic、
  Gemini API、DeepSeek、GLM、OpenRouter、Qwen、Moonshot/Kimi、Perplexity、
  Fireworks、Cerebras、Cohere、NVIDIA NIM、SambaNova、MiniMax、Doubao、
  ERNIE、Hunyuan、StepFun、SiliconFlow 等托管 API。
- Ollama、LM Studio、vLLM 成为内置本地服务器预设。它们使用 localhost 上的
  OpenAI 兼容 URL，并在本地服务器本身不要求认证时允许免 key 上游访问。
- 中文界面对有明确中文名称的内置服务商做了品牌本地化，例如 GLM、Qwen、
  DeepSeek、Moonshot/Kimi。

## v0.1.0 早期产品文档

初始文档版本在公开安装包和扩展服务商目录之前，建立了 Manifold 的公开支持与
文档主页。

初始文档包括：

- `http://127.0.0.1:17680/v1` 本地网关快速开始。
- 网关、服务商、模型 ID、Routes、fallback 和用量的核心概念。
- `/v1/models`、`/v1/chat/completions` 和 `/v1/messages` 的 API 参考。
- 本地会话密钥与非转售边界的安全文档。
- Free 与 Pro 版本说明，包括 Pro 价格 `$2/year`。
- 故障排查指南和结构化 issue 模板。

## 维护规则

每次发布都应包含日期、版本号、用户可见变化、安装包状态和支持影响。公开二进制
文件以及已经发布的校验文件应附加到对应的 manifold-support release。条目应保持
简洁，并在修复用户报告的问题时链接相关 issue。
