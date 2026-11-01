# 快速开始

本指南依据当前源码包 v0.8.0。公开安装包可能晚于源码，请从发布页面或产品入口
选择适合的平台：

https://github.com/lingphi-ai/manifold-support/releases/latest

https://www.lingphi.com/manifold/#downloads

平台包括 macOS Apple Silicon、macOS Intel、Windows x64 和 Windows arm64。

**0.8.0 源码候选版**将 MAS Pro 改为一次性永久解锁，美国基准价 US$2.00。
新构建和真实内购验收待完成。下方 0.7.0 TestFlight 状态属于旧年度订阅构建。
详见[版本与计划](plans.md)。

## 发布状态 — 2026-11-01

- **0.7.0 尚未公开发布。** 通用 macOS 商店构建 0.7.0 (0.7.0) 已上传
  TestFlight 并处理完成，但状态仍为 **Missing Compliance**。尚未完成可用的
  私有 TestFlight 安装及真实 StoreKit 购买／恢复验收。
- 当日核对的 GitHub 最新公开版为 **v0.6.0**，包含 macOS arm64/x64 DMG 和
  Windows x64/arm64 ZIP。以下下载入口跟随最新公开版，不提供私有 0.7.0 商店包。
- Windows 0.7.0 尚未完成新构建及原生商店验收；已有 Microsoft Store 页面
  不代表 0.7.0 已在该商店上架。
- 当前指南描述 0.8.0 源码。Claude 和 Gemini 订阅 OAuth 已移除，API 密钥接入
  仍保留。Codex OAuth 实现保留，OpenAI 分发授权仍待取得。
- 商店待办及历史变更见[发布说明](release-notes.md)。

## 连接供应商

1. 启动 Manifold，在设置中打开 **Providers**。
2. 点击 **Add provider**，选择 **Remote**、**Custom** 或 **Subscription**。
3. 托管 HTTP API 可以选择预设或填写兼容的 base URL，并在需要时保存上游密钥。
4. 使用 Ollama、LM Studio 或 vLLM 时，先启动本地服务器，再选择对应预设。
   服务器允许免认证访问时，可以不填上游密钥。
5. 订阅账户请选择 Codex，并在浏览器中完成 OAuth 授权。
   Manifold 使用自己的存储保存令牌并自动刷新。
6. 确认供应商已启用。更新 HTTP 地址或密钥后，点击 **Refresh models**。

## 连接客户端

**Connect** 提供 OpenAI SDK、Anthropic SDK 和 curl 示例。
从 **Gateway** 复制网关密钥，或生成 `mf_session_` 开头的会话密钥。
Free 包含 3 个有效会话密钥；Pro 提供不限数量的密钥和高级策略。

```bash
curl http://127.0.0.1:17680/v1/models   -H "Authorization: Bearer ldd_<your-key>"
```

从返回结果选择模型 ID，再发送请求：

```bash
curl http://127.0.0.1:17680/v1/chat/completions   -H "Authorization: Bearer ldd_<your-key>"   -H "Content-Type: application/json"   -d '{"model":"<model-id>","messages":[{"role":"user","content":"Hello"}]}'
```

Anthropic SDK 使用 `http://127.0.0.1:17680` 作为 base URL，并使用同一个网关
凭证。供应商的原始 API 密钥保留在 Manifold 中。

## 路由与安全

Free 包含 1 条路由；Pro 支持不限数量的路由，以及 Chat/Messages 可重试错误后
的跨供应商回退。创建路由后，以路由名作为请求的 model。
Pro 的“配对本地工具”会开启 60 秒配对窗口，工具可以生成限定范围的网关密钥。

仅 `/llm.txt` 和 `/llms.txt` 公开提供发现信息。健康检查、模型列表和推理请求
都需要主密钥或有效会话密钥。分享日志和截图前，请隐藏所有凭证和令牌。
