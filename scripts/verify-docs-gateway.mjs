const { default: worker } = await import("../worker/docs-gateway.js");

const calls = [];

globalThis.fetch = async (url, init) => {
  calls.push({ url, init });

  if (url.endsWith("/redirect-me")) {
    return new Response(null, {
      status: 301,
      headers: {
        location: "https://lingphi-ai.github.io/manifold-support/en/security/",
      },
    });
  }

  return new Response("<!doctype html><title>Manifold Documentation</title>", {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-security-policy": "default-src 'none'",
    },
  });
};

await assertRedirect(
  "https://doc.lingphi.com/manifold/en/security/?ref=test",
  301,
  "https://doc.lingphi.ai/manifold/en/security/?ref=test",
);

await assertRedirect(
  "https://doc.lingphi.ai/",
  302,
  "https://doc.lingphi.ai/manifold/",
);

await assertRedirect(
  "https://doc.lingphi.ai/manifold",
  308,
  "https://doc.lingphi.ai/manifold/",
);

const response = await worker.fetch(new Request("https://doc.lingphi.ai/manifold/en/security/?q=1"));
assert(response.status === 200, "expected proxied response status 200");
assert(calls.at(-1).url === "https://lingphi-ai.github.io/manifold-support/en/security/?q=1", "expected GitHub Pages upstream URL");
assert(calls.at(-1).init.redirect === "manual", "expected manual upstream redirect handling");
assert(response.headers.get("x-content-type-options") === "nosniff", "expected security header");
assert(!response.headers.has("content-security-policy"), "expected upstream CSP to be removed");

await assertRedirect(
  "https://doc.lingphi.ai/manifold/redirect-me",
  301,
  "https://doc.lingphi.ai/manifold/en/security/",
);

const missing = await worker.fetch(new Request("https://doc.lingphi.ai/unknown"));
assert(missing.status === 404, "expected unknown docs path to return 404");
assert((await missing.text()).includes("doc.lingphi.ai/manifold"), "expected product index link");

console.log("docs gateway verification passed");

async function assertRedirect(input, status, location) {
  const response = await worker.fetch(new Request(input));
  assert(response.status === status, `expected ${input} to return ${status}, got ${response.status}`);
  assert(response.headers.get("location") === location, `expected ${input} location ${location}, got ${response.headers.get("location")}`);
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}
