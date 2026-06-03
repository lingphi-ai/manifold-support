# Configuration

Manifold configuration is centered on the local gateway, providers, routes, and
usage visibility.

## Gateway

The default base URL is:

```text
http://127.0.0.1:17680/v1
```

The host is loopback only. The port can be changed in Settings if another local
process already uses `17680`. Every request requires `Authorization: Bearer
ldd_<your-key>` or an accepted compatible key header for Anthropic-style clients.

## Local CLI providers

Local providers depend on tools already installed and authenticated on your
machine. If a provider cannot be detected, confirm the binary is available on
your PATH and works from a terminal before opening a support issue.

## Remote API providers

Remote providers need a label, compatible base URL, model list, and API key.
Free includes 1 remote provider. Pro supports up to 10 remote providers.

## Routes and aliases

Routes create stable model names for clients. Use them when you want to switch a
client from one backend to another without editing the client configuration.
Weighted routing, fallback, and model aliases are Pro capabilities.

## Language

Manifold supports English and Simplified Chinese. It can follow the operating
system locale or use a manual override in Settings.
