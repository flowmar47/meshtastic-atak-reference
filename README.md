# Meshtastic × ATAK — Field Reference

A single-file, **searchable, offline-capable** cheat-sheet for configuring and using
**Meshtastic** radios, the **ATAK** (Android Team Awareness Kit) app, and getting the two
talking — so a team shares positions and chat over LoRa with no cell signal, no internet,
and no fees.

**Live:** _(Vercel link added after deploy)_

## Features

- 🔎 **Live search** across every question, answer, and CLI command (press `/` to focus, `Esc` to clear)
- 🗂️ **Category filters** — Basics · Meshtastic Setup · Channels & Privacy · Messaging & Location · ATAK Basics · Meshtastic + ATAK · Troubleshooting
- 📋 **Copy-to-clipboard** CLI snippets
- 📴 **Fully offline** — one self-contained `index.html`, no build step, no runtime dependencies (web fonts degrade gracefully to system fonts)
- 🎨 "Editorial Dark" visual theme

## Use it locally

Just open `index.html` in any browser — no server required.

## Content accuracy

Commands and values were verified against the [official Meshtastic docs](https://meshtastic.org/docs/)
and the installed `meshtastic` CLI. Firmware and app versions change over time, so spot-check
version-sensitive commands for your build.

### Sources

- [meshtastic.org/docs](https://meshtastic.org/docs/)
- [Meshtastic ATAK Plugin](https://meshtastic.org/docs/software/integrations/integrations-atak-plugin/)
- [LoRa configuration](https://meshtastic.org/docs/configuration/radio/lora/)
- [tak.gov](https://www.tak.gov/)

## License

MIT
