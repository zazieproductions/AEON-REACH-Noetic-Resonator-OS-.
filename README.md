# Interactive Creative Mastermind Dashboard

An experimental, single-page creative workspace built with React, TypeScript, Vite, and Tailwind CSS. It presents a desktop-like interface for working through ideas, sonic material, notes, visual relationships, and speculative creative prompts.

## What is included

- Floating or grid-based dashboard windows
- Acoustic visualizer and browser-based audio engine
- Mind map, idea synthesizer, and creative-agent panels
- Color/sound synesthesia interface
- Note registry with seeded example material
- Help manual and visionary-focus simulator

## Quick start

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local address Vite prints in your browser (usually `http://localhost:5173`).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build. |
| `npm run typecheck` | Check TypeScript types without emitting files. |

## Project layout

```text
src/
  components/   Interactive workspace panels
  utils/        Audio engine, note data, and shared utilities
  App.tsx       Desktop shell and application state
  main.tsx      Browser entry point
  index.css     Global styles
```

## Notes

The audio functions rely on the Web Audio API, so sound interactions must be started by a user gesture in a modern browser. The Vite configuration intentionally uses `vite-plugin-singlefile`, which inlines the production app into a portable single HTML file.
