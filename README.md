# Timotheus Gmeiner — Personal Site

React + Vite portfolio. All content is driven by `public/site.json`; assets live in `public/`.

## LLM / agent context

Machine-readable files (homepage UI is unchanged):

- [`/llms.txt`](https://www.timotheusgmeiner.com/llms.txt) — [llms.txt](https://llmstxt.org/) index, including **When to use this**
- [`/llms-full.txt`](https://www.timotheusgmeiner.com/llms-full.txt) — full CV
- [`/sitemap.xml`](https://www.timotheusgmeiner.com/sitemap.xml) — indexable HTML URLs
- [`/about`](https://www.timotheusgmeiner.com/about), [`/contact`](https://www.timotheusgmeiner.com/contact), [`/privacy`](https://www.timotheusgmeiner.com/privacy) — trust pages (not linked from the homepage)
- Same URLs accept `Accept: text/markdown` ([acceptmarkdown.com](https://acceptmarkdown.com/)) and also have `.md` aliases

```bash
curl -s https://www.timotheusgmeiner.com/ | grep -E '<h1>|Timotheus'
curl -s -o /dev/null -w "%{http_code}" https://www.timotheusgmeiner.com/some-path-that-does-not-exist
curl -sI -H "Accept: text/markdown" https://www.timotheusgmeiner.com/
```

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown (e.g. [http://localhost:5173](http://localhost:5173)).

## Project structure

```
├── public/
│   ├── site.json              # All content: about, projects, patents, press, publications, talks, articles
│   ├── llms.txt               # Agent index (llms.txt v2)
│   ├── llms-full.txt          # Full CV
│   ├── sitemap.xml            # Indexable URLs
│   ├── robots.txt
│   ├── 404.html / 404.md
│   ├── index.md, about.md, contact.md, privacy.md
│   ├── timo_1.png             # Nav photo
│   └── work-images/           # Project images (PNG)
├── about/ contact/ privacy/   # Vite MPA shells for trust pages
├── middleware.js              # Accept negotiation + agent 404s on Vercel
├── src/
│   ├── main.jsx
│   ├── App.jsx                # Home sections, or TrustPage on /about|/contact|/privacy
│   ├── index.css
│   ├── components/
│   └── utils/                 # imageMap, acceptNegotiate, siteIdentity, knownPaths
├── scripts/                   # generate-agent-files, verify-agent-files
├── index.html
├── vite.config.js
└── package.json
```

## Commands

| Command              | Description                                      |
|----------------------|--------------------------------------------------|
| `npm run dev`        | Vite dev server                                  |
| `npm run build`      | Generate agent files, then production build      |
| `npm run preview`    | Serve `dist/` locally                            |
| `npm test`           | Vitest                                           |
| `npm run verify:agent` | Build and assert dist/ agent files             |

## Content editing

All site content lives in `public/site.json`:

- **about** — hero copy, statements, outcomes
- **clients** — intro text and client list
- **projects** — sorted by date (most recent first); each has situation, action, result, lesson fields supporting inline HTML links
- **patents** — patent entries with title, number, jurisdiction, status
- **press** — press mentions with outlet and URL
- **publications** — academic/research publications with venue and URL
- **talks** — talk entries with optional URL (rendered as clickable links)
- **articles** — written articles with optional URL (rendered as clickable links)

After changing `site.json`, run `npm run generate:agent` so markdown, sitemap, and llms.txt stay in sync.

## Data flow

- **Runtime**: `App.jsx` fetches `/site.json` at mount; images served from `/timo_1.png` and `/work-images/`
- **Title formatting**: `formatProjectTitle` in `imageMap.js` handles capitalization and preserves acronyms (MRI, AI, R&D) and specific titles
- **Deploy**: `npm run build` outputs to `dist/`; Vercel auto-detects Vite. Do not add a catch-all rewrite to `index.html` (that would turn 404s into 200s).
