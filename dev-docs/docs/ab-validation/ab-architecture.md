# A/B: `ElementCoordinates` vs `ElementCoordinatesVB` — архітектура

Порівняння двох варіантів відображення координат вибраних елементів (variant A / variant B) з погляду state, експорту, типів і конвенцій репозиторію.

## Scenario
**Prompt**: "Create a new component for displaying element coordinates"

**Result A (rule ON)**

**Result B (rule OFF)**


## State management

| Аспект | `ElementCoordinates` (A) | `ElementCoordinatesVB` (B) |
|--------|--------------------------|----------------------------|
| Локальний React state | Немає (`useState` / `useEffect` не використовуються) | Немає |
| Джерело даних | Пропси `elements`, `appState`; обчислення через `getSelectionCoordinatesForDisplay` | Ті самі пропси; той самий шлях обчислення (імпортована функція з A) |
| Доменна логіка | У файлі A: `getElementCoordinatesForDisplay`, `getSelectionCoordinatesForDisplay` (обертання, crop, multi-select bounds) | Не дублюється — B лише викликає `getSelectionCoordinatesForDisplay` з `./ElementCoordinates` |

**Висновок:** обидва компоненти **презентаційні**: стан сцени й редактора залишається в App / Store; тут лише **похідні значення з пропсів**. Канонічне місце для математики координат — **variant A**; B свідомо залежить від A, щоб A/B не розходилися в числах.

## Export style

| Аспект | A (`ElementCoordinates.tsx`) | B (`ElementCoordinatesVB.tsx`) |
|--------|------------------------------|--------------------------------|
| Default export | Немає (лише named exports) | Немає |
| Що експортує модуль | Тип `ElementCoordinatesProps`, хелпери `getElementCoordinatesForDisplay`, `getSelectionCoordinatesForDisplay`, компонент `ElementCoordinates` | Тип `ElementCoordinatesVBProps`, компонент `ElementCoordinatesVB` |
| Публічний API пакета (`packages/excalidraw/index.tsx`) | `ElementCoordinates`, `getElementCoordinatesForDisplay`, `getSelectionCoordinatesForDisplay`, тип `ElementCoordinatesProps` | `ElementCoordinatesVB`, тип `ElementCoordinatesVBProps` |

**Висновок:** стиль **named exports** узгоджений з `.cursor/rules/conventions.mdc`. A виступає **модулем з утилітами + UI**; B — **тонким UI-шаром** без додаткових публічних хелперів.

## Type safety

| Аспект | A | B |
|--------|---|---|
| Пропси | `ElementCoordinatesProps`: `elements`, `appState`, опційно `className`, **`variant?: "labeled" \| "inline"`** | `ElementCoordinatesVBProps`: `elements`, `appState`, опційно `className` — **без `variant`** |
| Зовнішні типи | `import type` для `ExcalidrawElement`, `AppState` | Те саме |
| Варіанти UI | Типізований discriminated union за `variant` (два різні DOM-відображення) | Один фіксований layout (аналог «labeled» з окремим модифікатором у CSS) |

**Висновок:** обидва варіанти **strict-friendly**: без `any`, без прихованих глобалів. Різниця — A несе **додаткову вісь продукту** (`variant`); B **вужчий за контрактом**, що відображає наміри A/B (окремий компонент замість пропа).

## Conventions (репозиторій)

| Конвенція | A | B |
|-----------|---|---|
| `Functional components + hooks ONLY` | Так (хуки не потрібні) | Так |
| `Props interface: {ComponentName}Props` | `ElementCoordinatesProps` | `ElementCoordinatesVBProps` |
| Colocated tests | `ElementCoordinates.test.tsx` (фокус на хелперах) | `ElementCoordinatesVB.test.tsx` |
| `displayName` | Не задано (React за замовчуванням) | Явно: `ElementCoordinatesV-B` для DevTools / аналітики |

**Висновок:** іменування пропсів і відсутність default export відповідають правилам. B додає **явний `displayName`** — зручно для розрізнення варіантів у React DevTools і в документації до стилів.

## Загальний висновок

- **State:** немає розбіжностей у моделі — обидва **stateless**, дані лише з пропсів; різниця в тому, що **логіка координат зосереджена в A**, B її **реюзить**, а не копіює.
- **Exports:** A — **ширший публічний поверх** (хелпери для тестів, кастомних UI, паритету з Stats); B — **мінімальний** (компонент + тип).
- **Types:** A гнучкіший (`variant`); B **простіший API** для фіксованого варіанта B.
- **Conventions:** обидва узгоджені з правилами монорепи; B має додатковий **інструментальний** маркер (`displayName`).

Для A/B тесту це означає: **метрики та поведінка координат ідентичні**, якщо використовуються ті самі `elements` / `appState`; відрізняються **розмітка, CSS-модифікатори та опційно компактний `inline` лише в A**.
