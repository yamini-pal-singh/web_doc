# Shunya Labs — Documentation Site

Static documentation site for the Shunya Labs voice AI stack (ASR, TTS, Vāķ Translation, voice agents). Built to be clean, persona-driven, and deployable anywhere.

## Run locally

```bash
python3 -m http.server 8765
open http://localhost:8765
```

The site uses root-relative paths (`/asset/...`, `/asr/...`), so it must be served from the repo root — opening `index.html` directly with `file://` will not resolve links or assets correctly.

## Structure

```
/                           Landing / Quick Start Hub
/assets/
  /css/main.css             Design system & theme tokens
  /js/
    theme.js                Light / dark / auto + persistence
    shell.js                Shared header + sidebar injection
    nav.js                  Sidebar build, TOC, code tabs, search
/get-started/               What is Shunya · Quickstart · Capability matrix · Glossary
/personas/                  Developer · Researcher · Enterprise · Operator
/asr/                       Overview · Models · Configuration · Features · Streaming · Dashboard · API reference
/tts/                       Overview · Quickstart · Voices · Audio formats · Expression styles · Voice cloning · Streaming · LLM→TTS · API reference
/translation/               Vāķ Translate overview
/solutions/                 BFSI · Healthcare · Contact centres · Media
/deployment/                Cloud · on-prem · air-gapped
/security/                  Compliance & privacy
```

## What's built

- 32 content pages across 8 sections
- Dark / light / auto-detect theme toggle with persistence
- Multi-language code sample tabs
- Mermaid flow diagrams
- Per-page table of contents (scroll-spy)
- Keyboard-friendly search (`/` to focus, Enter to jump to first match)
- Responsive layout — mobile drawer menu under 900 px

## Deploying

Drop the whole tree on any static host — Netlify, Vercel, GitHub Pages, S3+CloudFront, or an Nginx behind your VPN for internal-only docs.

Example `netlify.toml`:

```toml
[build]
  publish = "."
```

## Editing

- **Navigation** is in `/assets/js/nav.js` — single source of truth; every page inherits it.
- **Theme tokens** are in `/assets/css/main.css` at the top (`:root` and `html.dark`).
- **Page template** — copy any file under `/asr/` or `/tts/` as a starting point. The shell auto-injects the header and sidebar; you only write the `<main>` content.

## Known limitations

- Search is currently sidebar-scoped, not full-text. A proper Lunr/FlexSearch index is a future enhancement.
- Screenshots of the Shunya dashboard are represented as CSS-styled mocks in `/asr/dashboard.html` pending real captures.
- Integration guides (Salesforce, Genesys, Twilio, WhatsApp) are referenced but not yet written out — hooks exist in `/personas/enterprise.html`.
