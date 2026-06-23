# 安全

Manifold 是本地访问层，不是 token 市场。它帮助开发者在使用真实上游服务商验证
真实业务逻辑时，避免把真实服务商凭证写进项目目录、shell history、CI 日志和
公开 issue。

## 本地网关边界

网关只绑定 `127.0.0.1`。Manifold 会强制 loopback host 配置，不用于暴露局域网
或公网入口。每个请求都需要 Manifold 网关 key（`ldd_…`，32 字节随机）或有效的
本地会话密钥。

设置窗口运行在严格的 Content-Security-Policy 下。服务商 CLI 以 `shell: false`
启动，带 120 秒超时和 10 MB 输出上限，并在请求取消时中止。应用日志会隐藏敏感
值——包括 `apikey`、`authorization`、`prompt`、`messages`、`response`、
`stdout`、`stderr`，以及任意 `mf_session_`、`ldd_`、`sk-` 或 `AIza` token。

## 服务商凭证

服务商凭证保留在用户自己的机器上。`config.json` 和 secret store 都以 `0600`
权限写入。远程 API key 存在 Manifold 的本地 secret store 中。当 Electron
safeStorage 和操作系统 keyring 可用时（例如 macOS Keychain），值会加密后存储。
如果系统级加密不可用，Manifold 会回落到 `0600` 权限的本地明文文件，并写入
警告日志。

服务商 key 不会通过 Manifold API 返回给客户端。客户端只拿到 Manifold 网关
凭证。

## URL 安全

托管远程服务商 URL 必须是安全 HTTPS URL。Manifold 会阻止 loopback、private、
link-local、metadata、wildcard-DNS 和嵌入 IP 的 host 模式，避免恶意自定义服务商
通过 SSRF 式配置拿到真实 provider key。

Ollama、LM Studio、vLLM 是明确的本地服务器预设。它们允许 localhost HTTP，
因为设计目标就是在同一台机器上运行，并且可以免上游 key。

服务商原生透传也受到限制：不跟随 redirect，并且路径必须留在配置的服务商
origin 内。对于远程服务商，原生转发**只允许 GET 和 POST**——安全 allow-list
会拒绝任何其他 HTTP 方法，尽管底层的 `ALL /v1/native/:provider/*` 路由在路由
层面会接受任意方法。

## 本地会话密钥

本地会话密钥是 Manifold 为本机工具生成的短期凭证，适合 Claude Code、测试脚本
和项目脚本。它以 `mf_session_` 开头，只显示一次，并可以撤销。系统只存储密钥的
SHA-256 hash，绝不保存原始值；校验采用时间恒定（timing-safe）且 fail-closed。

从 CLI 签发密钥使用「Pair a CLI」流程，需要明确的、由人手动触发的配对步骤，
因此密钥不会被静默签发。

在 Pro 中，本地会话密钥可以包含：

- 标签；
- TTL；
- 可选项目名；
- 允许的 route 名称；
- 允许的 provider id；
- 请求次数和最近使用时间；
- 创建、撤销、批量撤销和清理的审计事件。

示例：

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:17680
export ANTHROPIC_API_KEY=mf_session_<short-lived-key>
```

这个 key 只把客户端认证到 `127.0.0.1` 上的 Manifold。它不会暴露真实的
Anthropic、OpenAI、DeepSeek、OpenRouter 或其它服务商 API key。

## 它不是什么

- 它不是 Anthropic、OpenAI、DeepSeek、OpenRouter 或其它服务商 API key。
- 它不是模型额度或预付费使用量。
- 它不会绕过服务商账号、服务商计费或服务商条款。
- Manifold 不销售、租借或中转第三方模型 token。
- 除非用户在 Manifold 外部主动破坏本地边界，否则它不能让其它机器调用你的
  网关。

## 推荐工作流

1. 在 Manifold 中添加服务商，把真实凭证保留在 Manifold 本地存储里。
2. 为每个项目或开发任务创建一个本地会话密钥。
3. 设置较短 TTL，例如 1 小时、1 天或 7 天。
4. 如果工具只需要特定访问范围，设置 route/provider allow-list。
5. 把 `mf_session_<short-lived-key>` 填入需要访问网关的本地工具。
6. 任务结束、共享项目之前，或密钥可能进入日志时，立即撤销该密钥。

## 许可证和账单安全

Pro 由短期签名 entitlement token 解锁，token 绑定 Manifold 产品和设备。打包
版本始终强制许可证校验；开发覆盖环境变量在打包版本中会被忽略。

应用打开的账单和许可证链接只允许指向 Lingphi、Stripe 等 allow-list 中的 HTTPS
host。

## 提交 issue 前

请隐藏服务商 key、Manifold 网关 key、本地会话密钥、许可证 key、私有 prompt、
原始请求体和原始服务商响应，除非维护者明确要求你提供脱敏样例。
