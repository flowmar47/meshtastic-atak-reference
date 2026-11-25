import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

test("icon.svg is valid UTF-8 geometric SVG without Latin-1 corruption", () => {
  const buf = fs.readFileSync(path.join(ROOT, "icon.svg"));
  assert.equal(buf.includes(0xd7), false, "icon.svg must not contain raw 0xD7 byte");
  const svg = buf.toString("utf8");
  assert.match(svg, /^<svg\s[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  assert.match(svg, /<\/svg>\s*$/);
  assert.doesNotMatch(svg, /<text\b/i, "icon.svg should use geometric paths, not system fonts");
});

test("PNG PWA icons exist and have valid PNG signatures", () => {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  for (const name of ["icon-192.png", "icon-512.png", "icon-maskable-512.png"]) {
    const buf = fs.readFileSync(path.join(ROOT, name));
    assert.ok(buf.subarray(0, 8).equals(sig), `${name} must be a valid PNG`);
  }
});

test("manifest.json and vercel.json are valid JSON with required PWA and security fields", () => {
  const manifest = JSON.parse(read("manifest.json"));
  assert.equal(manifest.start_url, "/");
  assert.ok(manifest.icons.some((i) => i.sizes === "192x192" && i.type === "image/png"));
  assert.ok(manifest.icons.some((i) => i.sizes === "512x512" && i.purpose === "maskable"));
  for (const icon of manifest.icons) {
    const file = icon.src.replace(/^\//, "");
    assert.ok(fs.existsSync(path.join(ROOT, file)), `manifest icon ${file} missing`);
  }

  const vercel = JSON.parse(read("vercel.json"));
  const sources = vercel.headers.map((h) => h.source);
  assert.ok(sources.includes("/"), "vercel.json should configure / headers");
  assert.ok(sources.includes("/sw.js"), "vercel.json should configure /sw.js headers");
});

test("sw.js syntax compiles and all ASSETS exist on disk", () => {
  const sw = read("sw.js");
  new vm.Script(sw, { filename: "sw.js" });
  const match = sw.match(/const ASSETS = (\[[\s\S]*?\]);/);
  assert.ok(match, "ASSETS array missing in sw.js");
  const assets = JSON.parse(match[1]);
  for (const asset of assets) {
    if (asset === "/") continue;
    const rel = asset.replace(/^\//, "");
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `sw.js asset ${rel} missing`);
  }
  assert.match(sw, /ignoreSearch:\s*true/, "sw.js should match cached requests with ignoreSearch");
  assert.match(sw, /e\.request\.mode === "navigate"/, "sw.js should handle offline navigations");
});

test("index.html structure, accessibility, dialog, dark-mode, and data integrity", () => {
  const html = read("index.html");

  // Dark mode & landmarks
  assert.match(html, /<meta name="color-scheme" content="dark">/);
  assert.match(html, /color-scheme:\s*dark;/);
  assert.match(html, /<a href="#main-content" class="skip-link/);
  assert.match(html, /<main id="main-content"/);

  // Native <dialog> without redundant role="dialog" or aria-modal
  assert.match(html, /<dialog id="shortcuts-dialog" closedby="any" aria-labelledby="sc-title">/);
  assert.doesNotMatch(html, /role="dialog"/);
  assert.doesNotMatch(html, /aria-modal="true"/);

  // Unique HTML IDs in static markup (exclude inline <script> template strings)
  const staticHtml = html.replace(/<script>[\s\S]*?<\/script>/g, "");
  const ids = [...staticHtml.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  assert.deepEqual(dupes, [], `Duplicate DOM IDs found: ${dupes.join(", ")}`);

  // Extract inline script & validate syntax + data integrity
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(scriptMatch, "Inline <script> missing");
  const scriptCode = scriptMatch[1];
  new vm.Script(scriptCode, { filename: "index.html#script" });

  // Evaluate data declarations only inside an isolated VM context
  const dataCode = scriptCode.split("/* ── State & DOM refs ── */")[0];
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(
    dataCode + "\nthis.__DATA = { CATS, CAT_DESC, QUICK_START, FIELD_CHECKLIST, PRESETS, ENTRIES };",
    ctx
  );
  const { CATS, CAT_DESC, QUICK_START, FIELD_CHECKLIST, PRESETS, ENTRIES } = ctx.__DATA;

  assert.equal(CATS.length, 10);
  assert.ok(ENTRIES.length >= 65);
  assert.equal(PRESETS.length, 9);

  for (const cat of CATS) {
    assert.ok(CAT_DESC[cat], `Missing CAT_DESC for ${cat}`);
    assert.ok(ENTRIES.some((e) => e.cat === cat), `No entries for category ${cat}`);
  }

  const entryIds = new Set();
  for (const e of ENTRIES) {
    assert.ok(e.id && /^[a-z0-9-]+$/.test(e.id), `Invalid entry id: ${e.id}`);
    assert.equal(entryIds.has(e.id), false, `Duplicate entry id: ${e.id}`);
    assert.equal(ids.includes(e.id), false, `Entry id collides with static DOM id: ${e.id}`);
    entryIds.add(e.id);
    assert.ok(CATS.includes(e.cat), `Unknown category ${e.cat} on ${e.id}`);
    assert.ok(e.q && e.a, `Missing q/a on ${e.id}`);
    if (e.cmd) {
      assert.doesNotMatch(e.cmd, /\bnetwork\.enabled\b/, `Invalid protobuf network.enabled on ${e.id}`);
      assert.doesNotMatch(e.cmd, /\bmeshtastic --ota-update\b/, `Invalid --ota-update flag on ${e.id}`);
    }
  }

  for (const e of ENTRIES) {
    for (const rel of e.related || []) {
      assert.ok(entryIds.has(rel), `Broken related link "${rel}" on ${e.id}`);
    }
  }
  for (const qs of QUICK_START) {
    assert.ok(entryIds.has(qs.id), `Broken QUICK_START target "${qs.id}"`);
  }
  for (const item of FIELD_CHECKLIST) {
    assert.ok(entryIds.has(item.id), `Broken FIELD_CHECKLIST target "${item.id}"`);
  }
});
