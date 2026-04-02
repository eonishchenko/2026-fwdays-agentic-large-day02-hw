# Перевірка коду (code review)

Ти виконуєш **структурований рев’ю** змін у цьому репозиторії (Excalidraw fork, монорепа). Користувач вкаже контекст: PR, гілку, файли або вставить diff.

## Що зробити

1. **Визнач обсяг**: які файли/пакети змінені (`packages/excalidraw`, `excalidraw-app`, `packages/*`, конфіги).
2. **Перевір коректність і регресії**: логіка, edge cases, узгодженість з існуючими патернами (див. `.cursor/rules/architecture.mdc`, `docs/memory/systemPatterns.md`).
3. **Конвенції** (`.cursor/rules/conventions.mdc`): функціональні компоненти + hooks; **named exports**; `ComponentNameProps`; без `any` і без `@ts-ignore`; імена файлів/компонентів (PascalCase для компонентів, kebab-case для утиліт).
4. **Захищені файли** (`.cursor/rules/do-not-touch.mdc`): якщо торкнулися `renderer.ts`, `restore.ts`, `manager.ts`, `types.ts` у `packages/excalidraw` — познач як **високий ризик** і вимагай повного `yarn test:all` + явного схвалення.
5. **Безпека** (`.cursor/rules/security.mdc`): `VITE_*` лише публічні дані; `postMessage` / iframe — перевірка `origin`; обережно з `dangerouslySetInnerHTML` / ненадійним HTML; не логувати секрети/PII в Sentry.
6. **Тести** (`.cursor/rules/testing.mdc`): чи є релевантні тести або чи потрібні нові; снапшоти — лише навмисні зміни з поясненням.

## Верифікація (запропонуй або виконай з кореня репо)

- Мінімум для змін у коді: `yarn test:typecheck`.
- Ширше: `yarn test:code`, `yarn test:other`, `yarn test:app --watch=false` або цільовий фільтр Vitest.
- Для великих/ризикових змін: `yarn test:all`.

## Формат відповіді

- **Короткий висновок** (approve / з зауваженнями / блокери).
- **Знайдені проблеми** за пріоритетом (блокер / важливо / нітпік) з посиланнями на файли та рядки у форматі code citation, де це можливо.
- **Що перевірити вручну** (якщо потрібно): сценарії UI, collab, експорт тощо.

Якщо контексту недостатньо — попроси diff, список файлів або опис змін.
