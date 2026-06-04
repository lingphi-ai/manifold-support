const CANONICAL_HOST = "doc.lingphi.ai";
const LEGACY_HOST = "doc.lingphi.com";
const MANIFOLD_PREFIX = "/manifold";
const MANIFOLD_UPSTREAM = "https://lingphi-ai.github.io/manifold-support";
const MANIFOLD_UPSTREAM_BASE = `${MANIFOLD_UPSTREAM}/`;

const securityHeaders = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.hostname === LEGACY_HOST) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/") {
      return Response.redirect(new URL(`${MANIFOLD_PREFIX}/`, url).toString(), 302);
    }

    if (url.pathname === MANIFOLD_PREFIX) {
      return Response.redirect(new URL(`${MANIFOLD_PREFIX}/`, url).toString(), 308);
    }

    if (!url.pathname.startsWith(`${MANIFOLD_PREFIX}/`)) {
      return new Response(renderProductIndex(), {
        status: 404,
        headers: {
          "content-type": "text/html; charset=utf-8",
          ...securityHeaders,
        },
      });
    }

    const upstreamPath = url.pathname.slice(MANIFOLD_PREFIX.length).replace(/^\/+/, "");
    const upstreamUrl = new URL(upstreamPath, MANIFOLD_UPSTREAM_BASE);
    upstreamUrl.search = url.search;

    const upstreamResponse = await fetch(upstreamUrl.toString(), {
      redirect: "manual",
      cf: {
        cacheEverything: true,
        cacheTtl: 300,
      },
    });

    if (isRedirect(upstreamResponse.status)) {
      return rewriteRedirect(upstreamResponse, url);
    }

    const headers = new Headers(upstreamResponse.headers);
    for (const [name, value] of Object.entries(securityHeaders)) {
      headers.set(name, value);
    }
    headers.delete("content-security-policy");
    headers.delete("content-security-policy-report-only");

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  },
};

function isRedirect(status) {
  return status >= 300 && status < 400;
}

function rewriteRedirect(response, requestUrl) {
  const location = response.headers.get("location");
  if (!location) {
    return new Response(null, { status: response.status, headers: securityHeaders });
  }

  const rewritten = rewriteLocation(location, requestUrl);
  return Response.redirect(rewritten, response.status);
}

function rewriteLocation(location, requestUrl) {
  const target = new URL(location, MANIFOLD_UPSTREAM_BASE);

  if (target.origin === new URL(MANIFOLD_UPSTREAM).origin) {
    const upstreamBasePath = new URL(MANIFOLD_UPSTREAM).pathname.replace(/\/$/, "");
    const path = target.pathname.startsWith(upstreamBasePath)
      ? target.pathname.slice(upstreamBasePath.length)
      : target.pathname;
    return new URL(`${MANIFOLD_PREFIX}${path}${target.search}${target.hash}`, requestUrl).toString();
  }

  return target.toString();
}

function renderProductIndex() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lingphi AI Documentation</title>
  <style>
    body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#101817;color:#eef5ef}
    main{min-height:100vh;display:grid;place-items:center;padding:2rem}
    section{max-width:680px}
    h1{font-size:clamp(2.25rem,6vw,4rem);line-height:1;margin:0 0 1rem}
    p{color:#bac8bf;font-size:1.05rem;line-height:1.7}
    a{color:#c9f28d;text-decoration:none;font-weight:600}
  </style>
</head>
<body>
  <main>
    <section>
      <h1>Lingphi AI Documentation</h1>
      <p>Manifold documentation is available at <a href="/manifold/">doc.lingphi.ai/manifold</a>.</p>
    </section>
  </main>
</body>
</html>`;
}
