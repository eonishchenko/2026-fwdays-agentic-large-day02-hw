# AGENTS.md

## Project Structure

Excalidraw is a **monorepo** with a clear separation between the core library and the application:

- **`packages/excalidraw/`** - Main React component library published to npm as `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Full-featured web application (excalidraw.com) that uses the library
- **`packages/`** - Core packages: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** - Integration examples (NextJS, browser script)

## Development Workflow

1. **Package Development**: Work in `packages/*` for editor features
2. **App Development**: Work in `excalidraw-app/` for app-specific features
3. **Testing**: Always run `yarn test:update` before committing
4. **Type Safety**: Use `yarn test:typecheck` to verify TypeScript

## Development Commands

```bash
yarn test:typecheck  # TypeScript type checking
yarn test:update     # Run all tests (with snapshot updates)
yarn fix             # Auto-fix formatting and linting issues
```

## Architecture Notes

### Package System

- Uses Yarn workspaces for monorepo management
- Internal packages use path aliases (see `vitest.config.mts`)
- Build system uses esbuild for packages, Vite for the app
- TypeScript throughout with strict configuration

## Memory Bank

Актуальний **Memory Bank** цього репозиторію зберігається у `docs/memory/` і слугує стислим джерелом правди про контекст, архітектуру, рішення та поточний стан форку Excalidraw.

- **Де шукати**:
  - `docs/memory/projectbrief.md` — що це за репозиторій, межі системи, “що вважати готовим”.
  - `docs/memory/productContext.md` — UX/UI цілі та типові сценарії (малювання, експорт, collab, library, embed SDK).
  - `docs/memory/techContext.md` — стек і runtime (Node/Yarn, React/TS/Vite, тести, Docker, env).
  - `docs/memory/systemPatterns.md` — ключові патерни (composition root, ActionManager, Store/History, collab, static delivery).
  - `docs/memory/decisionLog.md` — ключові архітектурні рішення + наслідки (lifecycle, side effects).
  - `docs/memory/activeContext.md` — “де ми зараз” (короткий статус, локальні зміни/борг, перелік відомих проблем).
  - `docs/memory/progress.md` — короткий прогрес/статистика (станом на останнє оновлення).

- **Важливі факти про форк**:
  - **Git-історія форку коротка**: активні коміти починаються з **2026-03-23** (більшість роботи — документація/Memory Bank у березні–квітні 2026).
  - **Монорепа**: `excalidraw-app` (Vite SPA) + `packages/*` (ядро редактора та npm-пакети) + `examples/*`.
  - **Dev-потік**: `excalidraw-app` у dev резолвить `@excalidraw/*` напряму на сорси з `packages/*` (через Vite alias).

- **Технічні “якорі” (швидкий орієнтир)**:
  - **Стек**: React 19, TypeScript 5.9, Vite 5, Vitest; колаборація — `socket.io-client` + Firebase (Firestore/Storage).
  - **Команди**: див. `docs/memory/techContext.md` (типово `yarn start`, `yarn build`, `yarn test`, `yarn test:typecheck`, `yarn fix`).
  - **Продакшн**: статична збірка (`vite build`) + Nginx (multi-stage `Dockerfile`).

- **Ключові патерни (застосовувати при змінах)**:
  - **Єдиний шлях змін**: `ActionManager` → `App.syncActionResult` → `Store.commit` (узгодження state/undo/redo/scene).
  - **Поділ рендеру**: статичний/інтерактивний canvas для продуктивності.
  - **Багаторівневий state**: AppState (React) + Scene/Store (канонічні елементи) + Jotai atoms (локальний UI).

- **Відомі ризики (коротко)**:
  - **FileManager save**: після помилки збереження можливе блокування повторних спроб.
  - **UIOptions normalize**: FIXME про нормалізацію/мутацію опцій у рендері та взаємодію з `React.memo`.
  - **Collab start**: чутливість до порядку socket-подій/реконектів.
