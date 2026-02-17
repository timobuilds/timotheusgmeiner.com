# Timotheus Gmeiner — Personal Site

React + Vite portfolio. Content from `public/site.json`; assets in `public/`.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown (e.g. [http://localhost:5173](http://localhost:5173)).

## Project structure

```
├── public/
│   ├── site.json         # Content (content, projects, patents, press, publications)
│   ├── timo_1.png        # Nav photo
│   └── work-images/      # Project images (PNG)
├── src/
│   ├── main.jsx          # Entry, mounts App, imports index.css
│   ├── App.jsx            # Loads site.json, renders sections
│   ├── index.css          # Global styles
│   ├── components/        # Nav, AboutSection, PrinciplesSection, WorksSection, etc.
│   └── utils/
│       └── imageMap.js    # getProjectImageUrl, formatProjectTitle
├── index.html             # Vite entry (do not edit generated dist/index.html)
├── vite.config.js
└── package.json
```

## Commands

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Vite dev server          |
| `npm run build`   | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally    |

## Data flow

- **Runtime**: App fetches `/site.json` from public; assets at `/timo_1.png`, `/work-images/...`
- **Deploy**: Vite build outputs to `dist/`; Vercel auto-detects Vite (or set `outputDirectory: "dist"`).
