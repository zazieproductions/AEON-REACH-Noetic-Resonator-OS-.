# AEON-REACH Creative Workspace

A self-contained creative workspace for exploring sound, notes, visual relationships, and speculative idea prompts. The interface is a desktop-style React application with a browser-based Web Audio engine and two workspace modes: floating panels and a docked grid.

## Stack

- React 19 + TypeScript
- Vite 7 with Tailwind CSS 4
- Web Audio API for client-side sound interactions
- `vite-plugin-singlefile` for a portable production HTML artifact

## Prerequisites

- Node.js **20.19+** or **22.12+**
- npm (the lockfile is committed; prefer `npm ci` for repeatable installs)

## Getting started

```bash
npm ci
npm run dev
```

Vite will print the local URL. The development server listens on all interfaces, making it suitable for container and remote-preview environments as well.

## Quality checks and production build

```bash
npm run typecheck  # TypeScript validation
npm run build      # Production artifact in dist/
npm run check      # Typecheck followed by a production build
npm run preview    # Serve the production build
```

## Project structure

```text
src/
├── app/
│   └── App.tsx              # Application shell, desktop state, window orchestration
├── components/              # Feature panels and visual UI components
├── data/
│   └── notesData.ts         # Seeded note content and note generators
├── lib/
│   ├── AudioEngine.ts       # Lazily initialized Web Audio API service
│   └── cn.ts                # Shared class-name utility
├── index.css                # Global Tailwind entry point
└── main.tsx                 # React browser entry point

.env.example                 # Documented local environment-file convention
vite.config.ts               # Vite, React, Tailwind, and single-file build config
```

## Implementation notes

- Audio contexts are created lazily after a user interaction, which complies with modern browser autoplay rules.
- No backend or external API is required; creative data lives in the client for a portable experience.
- Keep browser-visible configuration under `VITE_` prefixes only. Do not put secrets in frontend environment variables.
- The production build is intentionally inlined into a single `dist/index.html`; `dist/` is generated and ignored by Git.
