# Timotheus Gmeiner — Personal Site

React + Vite portfolio. All content is driven by `public/site.json`; assets live in `public/`.

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
│   ├── timo_1.png             # Nav photo
│   └── work-images/           # Project images (PNG)
├── src/
│   ├── main.jsx               # Entry, mounts App, imports index.css
│   ├── App.jsx                # Loads site.json, renders all sections
│   ├── index.css              # Global styles
│   ├── components/
│   │   ├── Nav.jsx            # Navigation with photo
│   │   ├── AboutSection.jsx   # Hero copy, statements, outcomes
│   │   ├── PrinciplesSection.jsx
│   │   ├── WorksSection.jsx   # Project list with grid layout
│   │   ├── WorkDetail.jsx     # Expandable project detail (situation/action/result/lesson)
│   │   ├── PatentsSection.jsx
│   │   ├── PressSection.jsx
│   │   ├── TalksSection.jsx   # Talks with clickable links
│   │   └── ArticlesSection.jsx # Articles with optional links
│   └── utils/
│       └── imageMap.js        # IMAGE_FILENAME_MAP, getProjectImageUrl, formatProjectTitle
├── index.html                 # Vite entry (do not edit generated dist/index.html)
├── vite.config.js
└── package.json
```

## Commands

| Command           | Description                |
|-------------------|----------------------------|
| `npm run dev`     | Vite dev server            |
| `npm run build`   | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally      |

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

## Data flow

- **Runtime**: `App.jsx` fetches `/site.json` at mount; images served from `/timo_1.png` and `/work-images/`
- **Title formatting**: `formatProjectTitle` in `imageMap.js` handles capitalization and preserves acronyms (MRI, AI, R&D) and specific titles
- **Deploy**: `npm run build` outputs to `dist/`; Vercel auto-detects Vite
