# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Контракт проекта

`AGENTS.md` — обязательный к соблюдению контракт (stack/route/visual/content boundaries). Читай его перед любым структурным изменением; при конфликте с этим файлом приоритет у `AGENTS.md`.

`HANDOFF.md` — состояние работы между сессиями: что закрыто, что открыто, что решено не делать. Читай перед началом работы, обновляй в конце. Он в репозитории, потому что по проекту ходят и другие агенты, у которых нет памяти Claude Code.

Ключевые запреты, закреплённые тестами (`tests/site.test.mjs`): нет `react`/`react-dom` в зависимостях; в HTML не должно появляться визуального языка Personal Platform (`Steppe Signal`, `Editorial Field Station`, `Personal field station`). GSAP — осознанная зависимость под одну подпись (см. `AGENTS.md`). CSS-фреймворка нет, хотя `TailwindCSS` числится в стеке автора на `/` и `/about` — это заявленный навык, а не зависимость.

## Команды

```bash
bun install
bun run dev                       # astro dev
bun run verify                    # astro check + astro build + node --test (основной гейт)
bun run test                      # только тесты; ТРЕБУЕТ свежий dist/ — сначала bun run build
node --test tests/site.test.mjs   # один файл тестов
node --test --test-name-pattern 'CV placeholder' tests/*.test.mjs   # один тест
```

Тесты работают не с dev-сервером, а с собранными файлами в `dist/`: они читают `dist/<route>/index.html` и проверяют наличие конкретных русских строк. Поэтому после правки контента или разметки прогоняй `bun run verify`, а не `bun run test` в одиночку.

После структурных изменений AGENTS.md требует визуальной проверки затронутых маршрутов на desktop и на 390px.

## Архитектура

Astro 7, `output: 'static'`, `trailingSlash: 'never'`, TypeScript strict. `client:*`-директив нет и не должно быть — фреймворковых компонентов на клиенте не существует. `<script>` есть в четырёх компонентах (`PageMotion`, `ProjectRail`, `ThemeToggle`, `Portrait`), и все они — усиление: контент читается и работает без них.

**Три источника контента, у каждого своя роль:**

1. `src/content/work/*.md` — case studies. Схема в `src/content.config.ts` (glob loader + zod). Обязательные поля: `title`, `summary`, `context`, `status` (`production|pre-launch|released`), `role`, `team`, `period`, `homepageOrder`, плюс `featured`/`technologies`/`published`. Порядок на `/` и `/work` задаётся `homepageOrder`, а не файловой системой; `published: false` убирает кейс из обоих индексов и из `getStaticPaths`.
2. `src/data/*.ts` — типизированные `as const` модули для не-кейсового контента: `site.ts` (identity/availability), `experience.ts`, `skills.ts`, `contact.ts`. Текст правится здесь, не в разметке страниц.
3. `src/data/workMedia.ts` — мост между кейсами и медиа. Ключ — slug кейса; изображения импортируются как `ImageMetadata` для `astro:assets`, а видео/PDF ссылаются на `public/` строками. У кейса может не быть hero — тогда задаётся `placeholder`, и `ProjectMedia.astro` рендерит текстовую заглушку (так сейчас живёт `interactivelab`).

Slug кейса везде выводится как `entry.id.replace(/\.md$/, '')` — эта же строка служит ключом в `workMedia` и в мапе подписей внутри `src/pages/work/[slug].astro`. Добавляя кейс, обнови обе мапы, иначе `media` будет `undefined`.

**Слои рендера:** `BaseLayout.astro` (html/head/header/footer + импорт всех глобальных стилей) → `CaseLayout.astro` (обвязка кейса: факты, медиа, aside, named slot `caption`) → страница. Страницы в `src/pages/` только собирают данные и передают их в компоненты.

**CSS в три уровня, без CSS-фреймворка:**
- `src/styles/tokens.css` — единственное место для палитры, шрифтов, шкалы отступов и `--shell`. Хардкод цветов в компонентах считается регрессом.
- `src/styles/{reset,base,layout,typography,motion}.css` — глобальные, подключены в `BaseLayout`.
- `src/styles/routes/*.css` — по одному файлу на маршрут, импортируется самой страницей (или `CaseLayout` для `case.css`).
- Стили конкретного компонента живут в scoped `<style>` внутри `.astro`-файла; пересечение границы компонента — только через `:global()`.

Общий layout-примитив один — `.shell` (ширина + центрирование). `.route-section`, `.route-heading` и `.two-column` удалены вместе с проходом по внутренним маршрутам: первые два несли ритм «мелкий лейбл слева / описание справа», который доска называет читающимся как ИИ-слоп. Секции на всех маршрутах открываются `SectionHead` (`NAME ——— [ SECTION // NN ]`), страницы — `.page-marker` (`[ Work ]`). Ритм секций задаётся в `src/styles/routes/*.css` по маршруту, а не общим правилом. Брейкпоинты — 840px и 520/620px.

## Контент и приватность

Русский — основной язык v1. Утверждения в кейсах должны быть подтверждаемыми; STEAM.KZ-скриншоты сделаны на синтетических staging-данных, InteractiveLAB явно помечен как pre-launch. Контакты в `src/data/contact.ts` настоящие (Telegram, GitHub, Instagram); email там намеренно отсутствует, пока нет реального адреса. Placeholder остался один — `public/cv.pdf` (тест проверяет только что это валидный PDF > 1KB).

## Дизайн-направление

`docs/design/reference-board.md` — единственный источник визуального направления. Читай его перед любой правкой разметки или CSS: identity-first порядок, тёмная база с переключателем темы, скруглённая геометрия, mono только для utility, секция PROJECTS как рейка с панелью, и явный список отклонённой грамматики в конце.

Предыдущая редакция этого файла была построена на внешнем шортлисте, который пользователь не выбирал, и породила четыре отклонённых макета подряд. Она и прототипы (`home-visual-prototype.html`, `reference-board.html`) удалены. Не восстанавливай их и не выводи решения из `../job-portfolio-sketches/DESIGN-DIAGNOSIS.md` и `sketches/` — это исторические отклонённые артефакты.

Evidence packs и контентная архитектура по-прежнему лежат вне репозитория: `/home/ex1te/Projects/Personal/job-portfolio-sketches`.
