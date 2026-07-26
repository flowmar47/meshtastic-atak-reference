# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-file, searchable, offline-capable cheat-sheet for configuring Meshtastic LoRa radios, the ATAK (Android Team Awareness Kit) app, and bridging the two (Meshtastic ATAK plugin) so a team shares positions and chat over LoRa with no cell signal, no internet, and no fees. This is **reference content, not a buildable application** — there is no backend, no package manager, no build step, and no tests.

Default branch is `master`. Live at https://meshtastic-atak-reference.vercel.app.

## Architecture

Everything lives in **`index.html`** (~29 KB), which is fully self-contained: inline `<style>`, inline `<script>`, no runtime dependencies (web fonts degrade to system fonts). The visual theme is "Editorial Dark".

The content model is a single JS array, `ENTRIES`, near the top of the `<script>` block. Each entry is an object:

- `cat` — one of the seven categories in the `CATS` array (`Basics`, `Meshtastic Setup`, `Channels & Privacy`, `Messaging & Location`, `ATAK Basics`, `Meshtastic + ATAK`, `Troubleshooting`). A new entry's `cat` MUST match a `CATS` string exactly or it won't get a filter chip.
- `q` — the question / title (supports `**bold**`).
- `a` — the answer (supports `**bold**`).
- `cmd` — optional CLI snippet; rendered with a copy-to-clipboard button.
- `note` — optional caveat line.

Runtime behavior (all in the same `<script>`): `render()` filters `ENTRIES` by the current category chip and search query (`matches()` searches across `q + a + cat + cmd + note`), `buildChips()` renders the category filters with live counts, and `highlight()` wraps matched query text. Keyboard: `/` focuses search, `Esc` clears/blurs. To add or edit reference material, edit the `ENTRIES` array — do not introduce a build pipeline.

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
