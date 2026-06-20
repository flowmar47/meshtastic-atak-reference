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
