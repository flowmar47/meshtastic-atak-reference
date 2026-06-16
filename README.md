# Meshtastic × ATAK — Field Reference

A searchable, **offline-capable** knowledge base for configuring and using **Meshtastic** radios, the **ATAK** (Android Team Awareness Kit) app, and getting the two talking — so a team shares positions and chat over LoRa with no cell signal, no internet, and no fees.

**Live:** https://meshtastic-atak-reference.vercel.app

## Features

- **50+ topics** across 10 categories — Basics, Hardware, Setup, Channels, Messaging, ATAK, Integration, Field Ops, Troubleshooting, and Glossary
- **Quick start guide** — five linked steps for your first hour
- **Pre-field checklist** — tick items off before you leave coverage (saved in your browser)
- **Live search** across every question, answer, tag, and CLI command (`/` to focus, `Esc` to clear)
- **Category filters** and a topic index for browsing
- **Deep links** — share a URL like `#set-region` to jump straight to an entry
- **Related topics** on every entry for cross-navigation
- **Keyboard navigation** — `↑`/`↓` or `j`/`k` to move, `Enter` to expand, `?` for shortcuts
- **Expand / collapse all** for printing or scanning
- **Copy-to-clipboard** CLI snippets
- **PWA install** — add to home screen for offline access in the field
- **Fully offline** — static files, no build step, no runtime dependencies
- **Editorial Dark** visual theme

## Use it locally

Open `index.html` in any browser — no server required.

For local development with PWA/service-worker support:

```bash
npx serve .
# or: python3 -m http.server 8080
```

Then open `http://localhost:3000` (or `:8080`).

## Deploy to Vercel

This repo is ready to deploy as a static site — no build command needed.

### One-click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/flowmar47/meshtastic-atak-reference)

### From the CLI

```bash
npm i -g vercel
vercel          # first deploy (follow prompts)
vercel --prod   # production deploy
```

### Git integration

1. Push this repo to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Leave **Framework Preset** as *Other* and **Build Command** empty.
4. Set **Output Directory** to `.` (root).
5. Deploy — every push to `master` will redeploy automatically.

`vercel.json` configures clean URLs, security headers, and service-worker caching.

## Content accuracy

Commands and values were verified against the [official Meshtastic docs](https://meshtastic.org/docs/) and the installed `meshtastic` CLI. Firmware and app versions change over time, so spot-check version-sensitive commands for your build.

### Sources

- [meshtastic.org/docs](https://meshtastic.org/docs/)
- [Meshtastic ATAK Plugin](https://meshtastic.org/docs/software/integrations/integrations-atak-plugin/)
- [LoRa configuration](https://meshtastic.org/docs/configuration/radio/lora/)
- [Supported hardware](https://meshtastic.org/docs/hardware/devices/)
- [tak.gov](https://www.tak.gov/)

## License

MIT
