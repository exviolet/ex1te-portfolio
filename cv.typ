// Резюме. Публичная версия для сайта — без телефона:
//   typst compile --font-path fonts --ignore-system-fonts cv.typ public/cv.pdf
// Версия для работодателей — с телефоном, в репозиторий и в public/ не кладётся:
//   typst compile --font-path fonts --ignore-system-fonts --input phone="+7 …" cv.typ ~/Documents/cv-izbasarov.pdf
// Номер передаётся при сборке, чтобы не лежать в исходнике.
// Факты берутся из кейсов (src/content/work) и src/data — при правке там
// сверяй и здесь.

#set document(title: "Бакытжан Избасаров — Frontend Developer", author: "Бакытжан Избасаров")
#set page(paper: "a4", margin: (x: 16mm, y: 12mm))
#set text(font: "Onest", size: 9.2pt, lang: "ru")
#set par(leading: 0.55em, justify: false)
#set list(indent: 0.4em, body-indent: 0.5em, spacing: 0.42em)
#show link: set text(fill: rgb("#1f4fd1"))
#show raw: set text(font: "JetBrains Mono", size: 1.05em)

#let accent = rgb("#1f4fd1")
#let muted = rgb("#5b5f66")

#let section(title) = {
  v(0.7em)
  text(size: 8.5pt, weight: "semibold", tracking: 0.08em, fill: accent, upper(title))
  v(-0.5em)
  line(length: 100%, stroke: 0.4pt + muted.lighten(50%))
  v(0.1em)
}

#let entry(title, meta, period) = {
  grid(
    columns: (1fr, auto),
    [*#title* #h(0.3em) #text(fill: muted)[#meta]],
    text(fill: muted)[#period],
  )
  v(-0.2em)
}

#let subentry(title, period) = {
  v(0.35em)
  grid(
    columns: (1fr, auto),
    text(weight: "semibold")[#title],
    text(fill: muted)[#period],
  )
  v(-0.3em)
}

// ── Шапка ───────────────────────────────────────────────

#text(size: 20pt, weight: "bold")[Бакытжан Избасаров]
#v(-0.6em)
#text(size: 11pt)[Frontend Developer · React, TypeScript] #h(0.4em) #text(fill: muted)[Астана · офис / гибрид / удалённо]

#let phone = sys.inputs.at("phone", default: none)

#text(fill: muted)[
  #if phone != none [#link("tel:" + phone.replace(" ", ""))[#phone] ·]
  #link("mailto:bakytzhan.izbassarov@gmail.com")[bakytzhan.izbassarov\@gmail.com] ·
  #link("https://ex1te.pages.dev")[ex1te.pages.dev] ·
  #link("https://github.com/exviolet")[github.com/exviolet] ·
  #link("https://t.me/ex1te0")[t.me/ex1te0]
]

// ── О себе ──────────────────────────────────────────────

#section("О себе")
Год коммерческой работы над продуктовыми интерфейсами на React и TypeScript:
ролевые кабинеты, аналитика, отчёты, офлайн-клиент для Android. Довожу задачу
до релиза — в том числе серверную часть на PHP, когда она нужна фиче.
Портфолио с разбором кейсов — на #link("https://ex1te.pages.dev")[ex1te.pages.dev].

// ── Опыт ────────────────────────────────────────────────

#section("Опыт")

#entry(link("https://steam.kz/")[STEAM.KZ], "Frontend Developer", "Август 2025 — сентябрь 2026")
#text(fill: muted)[Образовательная компания. Стажировка, затем оплачиваемая проектная
работа на двух продуктах; сейчас — фриланс.]

#subentry("Платформа STEAM.KZ", "Март — сентябрь 2026")
#text(fill: muted)[Надстройка над WordPress и LearnDash, 94 школы.]
- Разработал две React/TypeScript SPA — административную и клиентскую — и четыре
  ролевых кабинета: учитель, администратор школы, куратор, управление платформой.
- Построил аналитику с одной моделью данных и тремя уровнями доступа: по месяцу,
  году и произвольному периоду, с фильтрами по региону и школе.
- Сделал PDF-отчёты по школе (mPDF / FPDI, русские и казахские глифы, фирменный бланк A4).
- Вёл серверную часть ежемесячной рассылки отчётов в WhatsApp (Meta Cloud API):
  планировщик, воркер с повторами, вебхуки, эскалация в Telegram. Первая боевая
  рассылка дошла до 80 школ из 94.
- Нашёл на пилоте, что статус `sent` не означает доставку, и добавил учёт
  вебхука статусов: недошедшие отчёты пишутся с причиной и уходят на повтор.
- Реализовал челлендж для учителей с проверкой соавторства роликов через
  Instagram Graph API.
- Стек: React 19, TypeScript, TanStack Query / Router / Table, WordPress REST API, PHP.

#subentry([#link("https://interactivelab.kz/")[InteractiveLAB] · владелец клиентской части], "Июль — сентябрь 2026")
#text(fill: muted)[Учебные симуляторы для школьных панелей METZ (Android 11, WebView Chrome 83), в том числе без сети. Команда — два разработчика.]
- Отвечал за клиент целиком: интерфейс на React, офлайн-контент в IndexedDB,
  обёртка на Capacitor, сборка и подписание APK, проверка на реальной панели.
- Сделал скачивание контента с прогрессом, остановкой и отчётом о недокачанном —
  для школьной сети с постоянными обрывами.
- Настроил проверку итоговой сборки на совместимость с Chrome 83 и вторую
  проверку релизного APK (подпись, `cleartext`, только `https://`).
- Релизный APK раздаётся школам, текущая версия — 0.1.2.
- Стек: React, TypeScript, Vite, Vitest, Capacitor 7, IndexedDB, Android.

// ── Проекты ─────────────────────────────────────────────

#section("Проекты")

#entry(link("https://sendoff-editor.pages.dev/")[Sendoff], "личный open-source", "Март 2026")
- Редактор для Linux: готовит многострочный запрос и отправляет его в tmux, Herdr
  или Orca. Публичный релиз v0.2.0 (AppImage), 149 тестов.
- React, TypeScript, Zustand, IndexedDB, Tauri 2, Rust.

#v(0.3em)
#entry("TapyTap", "мобильное приложение", "2025 — сейчас")
- Трекер привычек со статистикой, календарём и журналом заметок.
- React Native, Expo, TypeScript, Zustand, Supabase.

// ── Навыки ──────────────────────────────────────────────

#section("Навыки")
#grid(
  columns: (auto, 1fr),
  column-gutter: 1em,
  row-gutter: 0.55em,
  text(fill: muted)[Frontend], [React, TypeScript, JavaScript, TanStack, Zustand, Angular, Astro, HTML / CSS, TailwindCSS],
  text(fill: muted)[Мобильное и desktop], [React Native + Expo, Capacitor / Android, Tauri / Rust],
  text(fill: muted)[Backend и данные], [WordPress / PHP, REST API / OpenAPI, IndexedDB, Supabase],
  text(fill: muted)[Инструменты], [Vite, Vitest, Bun, Git, Docker, Linux],
  text(fill: muted)[Языки], [Русский, казахский],
)

// ── Образование ─────────────────────────────────────────

#section("Образование")
#entry("Колледж KSA (Kazakhstani Swiss American)", "Программное обеспечение", "2022 — 2025")
