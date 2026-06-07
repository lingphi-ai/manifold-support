# 发布说明

Manifold 的公开安装包、压缩包和用户可见的发布说明发布在
manifold-support latest Release：

https://github.com/lingphi-ai/manifold-support/releases/latest

私有 Manifold 源码仓库保持内部使用，不作为公开下载入口。

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

该 release 页面是 Manifold 的公开下载入口。私有 Manifold 源码仓库保持内部
使用；用户安装桌面应用或提交 issue 时不需要访问源码仓库。

## v0.1.1 服务商目录与桌面构建目标

日期：2026-06-05

用户可见变化：

- 桌面构建目标覆盖 macOS arm64、macOS x64、Windows x64 和 Windows arm64。
  早期构建可能仍未签名；只有在文件来自可信 Lingphi 发布源时，才应继续通过
  操作系统的安全提示流程。
- 添加服务商流程收敛为 **Local CLI**、**Remote** 和 **Custom**。Remote
  服务商从下拉框选择，不再使用过宽的多标签布局。
- Manifold 内置 27 个 quick-add 服务商预设。目录包括 OpenAI、Anthropic、
  Gemini API、DeepSeek、GLM、OpenRouter、Qwen、Moonshot/Kimi、
  Perplexity、Fireworks、Cerebras、Cohere、NVIDIA NIM、SambaNova、
  MiniMax、Doubao、ERNIE、Hunyuan、StepFun、SiliconFlow 等托管 API。
- Ollama、LM Studio、vLLM 成为内置本地服务器预设。它们使用 localhost 上的
  OpenAI 兼容 URL，并在本地服务器本身不要求认证时允许免 key 上游访问。
- 中文界面对有明确中文名称的内置服务商做了品牌本地化，例如 GLM、Qwen、
  DeepSeek、Moonshot/Kimi。
- 本地会话密钥生成器不再显示 Project 字段。当前 UI 只要求标签和有效期；
  项目策略和 allow-list 属于明确暴露这些控制项的构建版本。

## v0.1.0 早期产品文档

Manifold 处于早期产品开发阶段。这个初始文档版本在上面的安装包与服务商目录
工作之前，建立了该产品的公开支持与文档主页。

初始文档包括：

- `http://127.0.0.1:17680/v1` 本地网关快速开始。
- 网关、服务商、模型 ID、Routes、fallback 和用量的核心概念。
- `/v1/models`、`/v1/chat/completions` 和 `/v1/messages` 的 API 参考。
- 本地会话密钥与非转售边界的安全文档。
- Free 与 Pro 版本说明，包括 Pro 价格 `$2/year`。
- 故障排查指南和结构化 issue 模板。

未来发布说明应记录用户可见的变化：安装包开放、支持的操作系统、服务商行为、
API 变化、版本限制变化和已知支持问题。公开二进制文件以及已经发布的校验文件
应附加到对应的 manifold-support release。条目应保持简洁，并在修复用户报告的
问题时链接相关 issue。

## 维护规则

每次发布都应包含日期、版本号和用户需要知道的变化。内部重构只有在影响配置、
端点行为、服务商兼容性、价格限制或故障排查步骤时才需要写入发布说明。

如果某个版本有已知问题，请直接写在该版本条目下，并链接到对应 issue。用户
阅读发布说明时应能判断是否需要升级、是否需要修改客户端配置，以及遇到问题时
应该去哪里继续排查。
