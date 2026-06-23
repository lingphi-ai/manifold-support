# 快速开始

本指南帮助你通过 `http://127.0.0.1:17680/v1` 让兼容客户端连接到 Manifold
本地网关。

以下步骤反映 Manifold `v0.1.12` 的行为。公开安装包通过 latest support release
和 Lingphi 产品页分发：

https://github.com/lingphi-ai/manifold-support/releases/latest

https://www.lingphi.com/manifold/#download

当前公开安装包渠道提供 macOS Apple Silicon、macOS Intel、Windows x64 和
Windows arm64 构建。Manifold 也可从 Mac App Store（仅远程服务商版本，使用
StoreKit 应用内购买）和 Microsoft Store 获取。只使用 Lingphi 主站、公开
manifold-support release 页面或这些官方应用商店中的文件。

## 准备条件

- 支持的桌面操作系统。
- 至少一个上游服务商：
  - 已安装并认证的本地 CLI，例如 Claude、Codex 或 Gemini；
  - 带 API key 的托管 API 服务商；
  - 或本地 OpenAI 兼容服务器，例如 Ollama、LM Studio、vLLM。
- 一个可以配置 OpenAI 风格或 Anthropic 风格端点的客户端。

## 添加服务商

1. 启动 Manifold，并从托盘打开 Settings。
2. 打开 **Providers**。
3. 点击 **Add provider**。
4. 选择一种服务商类型：
   - **Local CLI**：Claude、Codex 或 Gemini。
   - **Remote**：托管 API 或本地服务器 quick-add 预设。
   - **Custom**：预设中没有的服务商。
5. 对本地 CLI，让 Manifold 自动检测 binary，或手动输入路径。每个 CLI 服务商
   都有每行的 **CLI⇄OAuth** 开关：保留 "CLI" 会调用本地 binary，切换到
   "OAuth" 则用你已认证的订阅直接访问服务商 API。切换实时生效。
6. 对远程预设，选择服务商，并在需要时输入上游 API key。
7. 对 Ollama、LM Studio 或 vLLM，先启动本地服务器。当服务器本身不要求认证时，
   这些预设可以不填上游 key。

启用或禁用任何服务商即时生效，无需重启网关，Providers 列表原地更新。

添加远程服务商时，Manifold 会尝试从 `/v1/models` 获取实时模型目录。如果获取
失败或没有可用模型，Manifold 会保留种子模型列表，不会阻断配置。之后可以点击
**Refresh models**。

## 连接客户端

**Connect** 面板展示网关端点以及可直接粘贴的 SDK 配置代码片段；如果需要更多
细节，内置的 **Help** 面板是一份开发者手册。

1. 打开 **Connect**。
2. 复制 base URL：

```text
http://127.0.0.1:17680/v1
```

3. 复制 Manifold 网关 API key，或在给项目工具使用时创建本地会话密钥（Pro）。
   CLI 也可以通过 **Pair a CLI**（Gateway → Session keys）在不使用主密钥的
   情况下自行签发一个短期受限密钥。编码 agent 可以读取
   `http://127.0.0.1:17680/llm.txt`（免认证发现文档）来了解可用端点。
4. 在客户端里填入本地 base URL 和 key。
5. 先测试模型列表：

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

6. 发送一次聊天请求：

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-4-6","messages":[{"role":"user","content":"Hello"}]}'
```

Claude Code 或其它 Anthropic 风格客户端可以使用：

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:17680
export ANTHROPIC_API_KEY=mf_session_<short-lived-key>
```

## 使用 Routes 保持客户端稳定

Routes 是 Pro 模型名。一个 route 可以指向一个或多个 provider/model 目标，并
使用两种策略：

- **Failover**：按顺序尝试目标，直到一个兼容目标成功。
- **Weighted**：按权重分配首选目标，其余目标仍作为 fallback 顺序。

在 **Routes** 中创建 route 后，客户端请求里的 `model` 填 route 名称即可。
route 名称不保证出现在 `/v1/models` 中，客户端应直接使用你配置的名称。

## 安全说明

Manifold 只绑定 `127.0.0.1`，并要求每个请求都携带 bearer token。真实服务商
API key 留在 Manifold 本地存储中。本地会话密钥只是访问 Manifold localhost
网关的受限凭证；它包含标签、TTL、可选项目名，以及可选的 route/provider
allow-list。它只显示一次，可以撤销，不是服务商 API key，也不是模型额度。

不要在 issue、截图、shell history、项目 env 文件或支持日志中公开任何 key。
