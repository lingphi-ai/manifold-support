# 安全

Manifold 的定位是本地访问层，不是 token 市场。它帮助开发者避免把真实服务商
凭证写进项目目录、shell history、CI 日志和公开 issue。

## 本地会话密钥

本地会话密钥是 Manifold 在本机生成的短期凭证，供本机工具使用。它适合
Claude Code、测试脚本、项目脚本和其它需要调用 Manifold localhost 网关的
客户端，用来在开发工程中验证正式业务逻辑，同时避免真实 API key 泄漏。

本地会话密钥可以这样使用：

```bash
export ANTHROPIC_BASE_URL=http://127.0.0.1:17680
export ANTHROPIC_AUTH_TOKEN=mf_session_<short-lived-key>
```

这个 key 只把客户端认证到 `127.0.0.1` 上的 Manifold。它不会暴露真实的
Anthropic、OpenAI、DeepSeek、OpenRouter 或其它服务商 API key。

## 它是什么

- Manifold 本地网关凭证。
- 短期有效，可以撤销。
- 适合按项目或按开发任务生成。
- 用来让服务商凭证不进入源码和项目本地 env 文件。
- 当 Claude Code 等工具需要 Anthropic 风格兼容端点时，可以使用它替代真实
  服务商 key。

## 它不是什么

- 它不是 Anthropic、OpenAI、DeepSeek、OpenRouter 或其它服务商 API key。
- 它不是模型额度或预付费使用量。
- 它不会绕过服务商账号、服务商计费或服务商条款。
- Manifold 不销售、租借或中转第三方模型 token。
- 除非用户主动暴露本地 host，否则它不能让其它机器调用你的网关；Manifold 的
  设计目标就是只绑定本机。

## 推荐工作流

1. 在 Manifold 中添加服务商，把真实凭证保留在 Manifold 本地存储里。
2. 为每个项目或开发任务创建一个本地会话密钥。
3. 设置较短 TTL，例如 1 小时、1 天或 7 天。
4. 把 `mf_session_<short-lived-key>` 填入需要访问网关的本地工具。
5. 任务结束、共享项目之前，或密钥可能进入日志时，立即撤销该密钥。

## 安全边界

服务商凭证留在用户自己的机器上。项目工具只拿到访问 Manifold localhost 网关
的受限凭证。Manifold 再由本地桌面应用把请求路由到用户已配置的服务商。这是
凭证隔离和本地访问控制，不是 token 转售。

提交 issue 时，请同时隐藏服务商 key 和本地会话密钥。
