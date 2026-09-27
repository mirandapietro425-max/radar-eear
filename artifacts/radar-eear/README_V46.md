# RADAR EEAR — V46 Mobile Study & Persistence

V46 is the engineering integration layer over the completed V45 content/assets package. Manus is treated as a supplier of content, question packs, assets and source/licence manifests; this repository contains the application integration.

## Integrated material

- 28 complete study guides: 7 Portuguese, 7 English, 7 Mathematics, 7 Physics.
- 420 content-linked questions: 15 per content, available by `contentId`.
- 85 library records from the V45 library package, with legal-access handling in the reader/repository layer.
- 75 curiosity images.
- 31+ Atlas photos (the repository currently contains 32 local photos).
- 31 thinker portraits.
- 4 subject images and 7 pedagogical diagrams.

The pre-existing question pool is preserved; the 420 V45 questions are an additional, explicitly content-linked layer.

## Daily-use/mobile improvements

- Study timer is timestamp-based and displays `MM:SS` under one hour and `HH:MM:SS` from one hour onward.
- Timer state is persistent across navigation and reloads using localStorage plus IndexedDB durable state.
- Study resume state stores current content, route, elapsed time and status.
- Mobile study dock exposes previous/next content and play/pause in thumb reach.
- Desktop/mobile top bar has browser history back/forward controls.
- PWA manifest uses standalone display and study shortcuts.
- Install prompt is available where the browser exposes `beforeinstallprompt`.
- Study notifications can request browser permission and surface pending review information.
- Wake Lock is opt-in; the timer itself remains timestamp-based, so elapsed time is reconstructed after the device wakes.
- Media Session pause/play handlers are registered where supported. Lock-screen controls are browser/OS dependent and are not guaranteed without actual media playback.
- Content cards show real question-attempt progress and `Novo / n tent. / Concluído` states.
- The History route is available at `/historia` and content linking is preserved for `Brasil antigo`.

## Persistence / database model

The app is designed for local-first continuity:

1. UI state is loaded from the existing user storage layer.
2. A durable IndexedDB snapshot is written after state changes.
3. The browser Storage Persistence API is requested where available.
4. The profile screen provides JSON backup export/import.
5. When Supabase environment variables and a valid session are configured, study events, attempts, review states, book progress/notes, Bible state, simulations, games and resume state are synchronized with an offline queue.

A cloud database is **not claimed as active** unless valid Supabase configuration exists at deployment time.

## Validation

- `scripts/validate-v46.mjs`: **23/23 checks passed**.
- `scripts/parse-all-ts.mjs`: **37/37 TypeScript/TSX source files parsed without syntax diagnostics**.
- Runtime smoke remains available through `npm run test:runtime`.

Full `typecheck`/`build` must be executed in an environment matching the repository engine requirement (`Node >=24 <25`) with dependencies installed. This working environment currently uses Node 22 and does not contain a complete local dependency installation, so those two commands are not represented as passed here.
