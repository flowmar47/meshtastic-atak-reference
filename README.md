# Meshtastic × ATAK — Field Reference

[![CI](https://github.com/flowmar47/meshtastic-atak-reference/actions/workflows/ci.yml/badge.svg)](https://github.com/flowmar47/meshtastic-atak-reference/actions/workflows/ci.yml) [![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen.svg)](https://meshtastic-atak-reference.vercel.app) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A searchable, **offline-capable** knowledge base and field toolkit for configuring **Meshtastic** radios, the **ATAK** (Android Team Awareness Kit) app, and bridging the two — so a team shares positions and chat over LoRa with no cell signal, no internet, and no fees.

**Live:** https://meshtastic-atak-reference.vercel.app

## Features

- **65+ entries** across 10 categories — Basics, Hardware, Meshtastic Setup, Channels & Privacy, Messaging & Location, ATAK Basics, Meshtastic + ATAK, Field Operations, Troubleshooting, and Glossary
- **Quick start guide** — five linked steps for your first hour
- **Pre-field checklist** — tick items off before leaving coverage (saved in `localStorage`), jump straight to each guide entry, reset, or export a timestamped Markdown checklist
- **Offline Field Tools** — LoRa modem preset comparison table, interactive **ATAK airtime & EU_868 duty-cycle estimator**, and an **offline CLI config builder** with cryptographic 256-bit Base64 PSK generation (`crypto.getRandomValues`)
- **Multi-token live search** — matches across questions, answers, tags, and CLI commands (`/` to focus, `Esc` to clear, clickable `#tag` pills, URL query sync `?q=...&cat=...`)
- **Deep links & Find-in-Page** — share URLs like `#set-region`, plus `hidden="until-found"` + `beforematch` support where browsers implement it
- **Keyboard navigation & native `<dialog>`** — `↑`/`↓` or `j`/`k` across entries, `Enter`/`Space` to toggle, `?` for shortcuts
- **Print-ready light theme** — `@media print` switches to crisp black-on-white formatting and keeps the pre-field checklist printable
- **PWA install & offline support** — SVG + raster `192px` / `512px` / maskable icons, offline navigation fallback, and live online/offline indicator
- **Zero-build static architecture** — opens directly from disk (`index.html`) with no bundler or runtime dependencies

## Use it locally

Open `index.html` in any browser — no server required.

For local development with PWA / service-worker support:

```bash
npx serve .
# or: python3 -m http.server 8080
```

## Validate

```bash
node --test tests/validate.test.mjs
```

## Deploy to Vercel

This repo deploys as a static site with no build step (`vercel.json` configures clean URLs, security headers, and service-worker cache headers). Every push to `master` deploys automatically when linked to Vercel.

## Content accuracy

Commands and values were verified against the [official Meshtastic docs](https://meshtastic.org/docs/) and the `meshtastic` CLI (`network.wifi_enabled`, radio-wide `lora.modem_preset`, managed flooding relay, and `REPEATER` deprecation notes in 2.6+/2.7+). Firmware and app versions evolve over time, so spot-check version-sensitive commands for your build.

### Sources

- [meshtastic.org/docs](https://meshtastic.org/docs/)
- [Meshtastic ATAK Plugin](https://meshtastic.org/docs/software/integrations/integrations-atak-plugin/)
- [LoRa configuration](https://meshtastic.org/docs/configuration/radio/lora/)
- [Supported hardware](https://meshtastic.org/docs/hardware/devices/)
- [tak.gov](https://www.tak.gov/)

## License

MIT — see [LICENSE](LICENSE).
