# 配置

设置包含控制面板、网关、连接、供应商、路由、用量与成本、诊断、外观、关于和帮助。
对话是单独的视图，使用相同的网关与供应商配置。

## 网关与连接

默认 base URL 为 `http://127.0.0.1:17680/v1`，host 固定为 `127.0.0.1`。
网关页管理启动、停止、重启、端口、主密钥和会话密钥。
Free 包含 3 个 `mf_session_` 有效密钥；Pro 增加策略管理及“配对本地工具”。
配对需要手动开启，工具可以用短期配对码生成密钥而无需主密钥。

Connect 提供 OpenAI SDK、Anthropic SDK 和 curl 示例。
客户端填写网关凭证，上游原始密钥保留在 Manifold 中。
OpenAI 客户端使用 `/v1` base URL，Anthropic 客户端使用网关 origin。
仅 `/llm.txt` 和 `/llms.txt` 公开；健康检查也需要认证。

## 供应商与模型目录

选择 **Remote** 添加预设，**Custom** 配置 HTTP 地址，或 **Subscription**
在浏览器中授权 Codex 账户。
Manifold 提供 27 个 quick-add 预设，包括 Ollama、LM Studio、vLLM。
本地服务器允许免认证访问时，可以不填上游密钥。

每个 HTTP API 或本地服务器都计为一个远程或本地服务器服务商：Free 最多 3 个，
Pro 最多 10 个。浏览器授权账户在两种版本中都可用，且不占 HTTP 供应商限额。
启用或停用供应商会即时生效，无需重启网关。

更新 HTTP 地址或密钥后，点击 **Refresh models**。
目录还会在添加后、启动后及每 12 小时刷新。失败时保留已有列表；目录变化后
保存配置并重建网关。

## 路由、用量与诊断

Free 包含 1 条命名路由，Pro 不限数量。两者都支持 weighted / failover 排序；
Chat/Messages 可重试失败后的跨供应商回退和模型别名需要 Pro。

用量与成本只汇总网关自身记录的请求。Free 保留 7 天，Pro 支持 30 天。
诊断仅订阅 `app.log` 和 `gateway.log`，“全部”合并这两个来源。
分享日志前请先脱敏。

## 外观与账户

外观页即时应用浅色/深色毛玻璃主题、强调色、密度、字号和中英文切换。
关于页提供购买及恢复。Microsoft Store 与已有官网版使用网页结算及授权设备管理；
MAS 0.8.0 候选版通过原生 StoreKit 2 本机验证，不依赖 Lingphi 授权服务。官网直装版停止提供。详见[版本与计划](plans.md)。
