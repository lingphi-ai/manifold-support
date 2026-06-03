# 快速开始

本指南帮助你通过 `http://127.0.0.1:17680/v1` 让兼容客户端连接到
Manifold 本地网关。

公开下载即将开放。下面的步骤描述安装桌面应用后的首次使用流程。

## 准备条件

- 支持的桌面操作系统。
- 至少一个已经安装并认证过的本地 CLI 服务商，或一个带 API key 的远程 API
  服务商。
- 一个可以配置 OpenAI 风格或 Anthropic 风格端点的客户端。

## 步骤

1. 启动 Manifold，并保持托盘应用运行。
2. 打开 Settings 添加服务商。本地 CLI 会尽量自动检测；远程服务商需要兼容
   base URL 和 API key。
3. 在 Connect 面板复制本地 base URL 和 Manifold 生成的 API key。
4. 在客户端中配置 `http://127.0.0.1:17680/v1`。
5. 先通过列出模型验证连接。

```bash
curl http://127.0.0.1:17680/v1/models \
  -H "Authorization: Bearer ldd_<your-key>"
```

然后发送一次聊天请求：

```bash
curl http://127.0.0.1:17680/v1/chat/completions \
  -H "Authorization: Bearer ldd_<your-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"manifold-default","messages":[{"role":"user","content":"Hello"}]}'
```

## 安全说明

Manifold 只绑定 `127.0.0.1`，并要求每个请求都携带 bearer token。不要在 issue、
截图、shell history 或支持日志中公开生成的 key。
