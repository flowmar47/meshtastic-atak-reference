# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-file, searchable, offline-capable cheat-sheet for configuring Meshtastic LoRa radios, the ATAK (Android Team Awareness Kit) app, and bridging the two (Meshtastic ATAK plugin) so a team shares positions and chat over LoRa with no cell signal, no internet, and no fees. This is **reference content, not a buildable application** — there is no backend, no package manager, no build step, and no tests.

Default branch is `master`. Live at https://meshtastic-atak-reference.vercel.app.

## Architecture

Everything lives in **`index.html`**, which is fully self-contained: inline `<style>`, inline `<script>`, and zero build or runtime dependencies (web fonts degrade to system fonts). Supporting static files are `manifest.json`, `sw.js`, `vercel.json`, `icon.svg`, and the raster PWA icons (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`). The visual theme is "Editorial Dark" (with a light `@media print` override).

The content model lives near the top of the `<script>` block:

- `CATS` & `CAT_DESC` — the 10 categories (`Basics`, `Hardware`, `Meshtastic Setup`, `Channels & Privacy`, `Messaging & Location`, `ATAK Basics`, `Meshtastic + ATAK`, `Field Operations`, `Troubleshooting`, `Glossary`). Every entry's `cat` MUST match a `CATS` string.
- `QUICK_START` & `FIELD_CHECKLIST` — step/checklist items whose `id` fields must match real `ENTRIES` IDs.
- `PRESETS` — LoRa modem preset metadata powering the comparison table and ATAK airtime estimator.
- `ENTRIES` — knowledge base entries (`id`, `cat`, `tags`, `related`, `q`, `a`, optional `cmd`, optional `note`), supporting `**bold**` and `` `code` ``.

Runtime behavior (all in the same `<script>`): multi-token AND search on markdown-stripped text, clickable `#tag` filters, URL query sync (`?q=...&cat=...`), native `<dialog id="shortcuts-dialog">`, `hidden="until-found"` + `beforematch` entry panels, `ResizeObserver` sticky offset tracking, offline CLI config builder, and checklist persistence/Markdown export. To validate changes before committing, run:

```bash
node --test tests/validate.test.mjs
```

## Editing and deploying

- **Preview locally:** open `index.html` directly in a browser — no server needed.
- **Deploy:** hosted on Vercel (project config in `.vercel/`, which is gitignored; `vercel.json` sets `cleanUrls: true`). Deploys happen via the Vercel project linked to the `flowmar47/meshtastic-atak-reference` GitHub repo; use the Vercel CLI (`vercel`, `vercel --prod`) if deploying manually.

## Content accuracy

Commands and config values were verified against the official Meshtastic docs (meshtastic.org/docs) and the installed `meshtastic` CLI. Firmware/app versions drift, so spot-check version-sensitive `cmd` values when updating. Source links live in `README.md`.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **meshtastic-atak-reference** (25 symbols, 19 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "master"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/meshtastic-atak-reference/context` | Codebase overview, check index freshness |
| `gitnexus://repo/meshtastic-atak-reference/clusters` | All functional areas |
| `gitnexus://repo/meshtastic-atak-reference/processes` | All execution flows |
| `gitnexus://repo/meshtastic-atak-reference/process/{name}` | Step-by-step execution trace |

<!-- gitnexus:end -->
