import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Interval dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Interval — Privacy-first meeting budgets<\/title>/i);
  assert.match(html, /Make room for work\./);
  assert.match(html, /Google Calendar connected/);
  assert.match(html, /No meeting content stored/);
  assert.match(html, /Privacy-first meeting budgets for calmer, more focused teams/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the MVP privacy-safe and interactive", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Credits = meeting minutes ÷ 30 × internal participants/);
  assert.match(page, /Private event ·/);
  assert.match(page, /No titles/);
  assert.match(page, /No descriptions/);
  assert.match(page, /setWeeklyBudget/);
  assert.match(page, /setMinutes/);
  assert.match(layout, /images: \["\/og\.png"\]/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
