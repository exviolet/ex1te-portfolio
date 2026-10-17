// Резюме. Публичная версия для сайта — без телефона:
//   typst compile --font-path fonts --ignore-system-fonts cv.typ public/cv.pdf
// Версия для работодателей — с телефоном, в репозиторий и в public/ не кладётся:
//   typst compile --font-path fonts --ignore-system-fonts --input phone="+7 …" cv.typ ~/Documents/cv-izbasarov.pdf
// Номер передаётся при сборке, чтобы не лежать в исходнике.
// Факты берутся из кейсов (src/content/work) и src/data — при правке там
// сверяй и здесь.

#set document(title: "Бакытжан Избасаров — Frontend Developer", author: "Бакытжан Избасаров")
#set page(paper: "a4", margin: (x: 18mm, y: 16mm))
#set text(font: "Onest", size: 11pt, lang: "ru")
#set par(leading: 0.62em, justify: false)
#set list(indent: 0.4em, body-indent: 0.5em, spacing: 0.6em)
#show link: set text(fill: rgb("#1f4fd1"))
#show raw: set text(font: "JetBrains Mono", size: 1.05em)

#let accent = rgb("#1f4fd1")
#let muted = rgb("#5b5f66")

#let section(title) = {
  v(1.1em)
  text(size: 9.5pt, weight: "semibold", tracking: 0.08em, fill: accent, upper(title))
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

#text(size: 24pt, weight: "bold")[Бакытжан Избасаров]
#v(-0.6em)
#text(size: 12.5pt)[Frontend Developer · React, TypeScript]\
#text(fill: muted)[Астана · офис / гибрид / удалённо]

#let phone = sys.inputs.at("phone", default: none)

#text(fill: muted)[
  #if phone != none [#link("tel:" + phone.replace(" ", ""))[#phone] ·]
  #link("mailto:bakytzhan.izbassarov@gmail.com")[bakytzhan.izbassarov\@gmail.com] ·
  #link("https://bakytzhan.pages.dev")[bakytzhan.pages.dev] ·
  #link("https://github.com/exviolet")[github.com/exviolet] ·
  #link("https://t.me/ex1te0")[t.me/ex1te0]
]

// ── О себе ──────────────────────────────────────────────

#section("О себе")
Год коммерческой работы над продуктовыми интерфейсами на React и TypeScript:
ролевые кабинеты, аналитика, отчёты, офлайн-клиент для Android. Довожу задачу
до релиза — в том числе серверную часть на PHP и деплой, когда они нужны фиче.
Портфолио с разбором кейсов — на #link("https://bakytzhan.pages.dev")[bakytzhan.pages.dev].

// ── Опыт ────────────────────────────────────────────────

#section("Опыт")

#entry(link("https://steam.kz/")[STEAM.KZ], "Frontend Developer", "Август 2025 — сентябрь 2026")
#text(fill: muted)[Образовательная компания (steam.kz, experimentum.kz). Стажировка, затем
оплачиваемая проектная работа; сейчас — фриланс.]

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
- Написал деплой SPA на серверы Ubuntu (staging и прод) shell-скриптами через rsync;
  на прод скрипт пускает только ветку main с тегом релиза.
- Поднял локальную копию прода в Docker Compose (MariaDB, PHP-FPM, nginx, wp-cli).
  Скрипт восстановления разворачивает бэкап, обезличивает персональные данные и
  глушит отправки в WhatsApp и Telegram — а если обезвредить не удалось, падает.
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
- Заложил архитектуру админ-панели (React, TypeScript, Mantine, TanStack Router и
  Query): каркас, сессия с обменом токенов, тема, общая таблица с поиском и
  фильтрами. Дальше разделы развивал напарник.
- Стек: React, TypeScript, Vite, Vitest, Capacitor 7, IndexedDB, Android.

#subentry("Инфраструктура и интеграции", "2025 — 2026")
- Вёл еженедельные и ежемесячные резервные копии сайтов steam.kz и experimentum.kz
  (WordPress), участвовал в их восстановлении после сбоев.
- Разворачивал сервисы компании в Docker: n8n, WordPress, Supabase.
- Собирал в n8n прототипы ботов для WhatsApp, Instagram и Telegram на API Meta.
  Этот опыт потом лёг в рассылку отчётов и челлендж платформы STEAM.KZ.

// ── Проекты ─────────────────────────────────────────────

#section("Проекты")

#entry(link("https://sendoff-editor.pages.dev/")[Sendoff], "личный open-source", "Март 2026")
- Редактор для Linux: готовит многострочный запрос и отправляет его в tmux, Herdr
  или Orca. Публичный релиз v0.2.0 (AppImage), 149 тестов.
- React, TypeScript, Zustand, IndexedDB, Tauri 2, Rust.

#v(0.3em)
#entry("TapyTap", "мобильное приложение", "2025 — сейчас")
- Трекер привычек: 15 экранов — привычки, календарь с тепловой картой,
  статистика, журнал заметок, архив. Основная часть написана в июне 2025.
- В октябре 2026 свёл два слоя данных в один стор на Zustand: ушли три ошибки
  с потерей данных, код стал короче на 461 строку.
- Закрыл дыру в правилах доступа Supabase (RLS), через которую пользователь мог
  читать и менять чужие данные; проверил 14 сценариями на двух аккаунтах.
  Схему базы перенёс в миграции в репозитории.
- React Native, Expo SDK 57, TypeScript, Zustand, Supabase.

// ── Навыки ──────────────────────────────────────────────

#section("Навыки")
#grid(
  columns: (auto, 1fr),
  column-gutter: 1em,
  row-gutter: 0.7em,
  text(fill: muted)[Frontend], [React, TypeScript, JavaScript, TanStack, Zustand, Mantine, Angular, Astro, HTML / CSS, TailwindCSS],
  text(fill: muted)[Мобильное и desktop], [React Native + Expo, Capacitor / Android, Tauri / Rust],
  text(fill: muted)[Backend и данные], [WordPress / PHP, REST API / OpenAPI, IndexedDB, Supabase],
  text(fill: muted)[Сборка и тесты], [Vite, Vitest, Bun, Git],
  text(fill: muted)[Инфраструктура], [Docker, Docker Compose, nginx, rsync, n8n],
  text(fill: muted)[Интеграции], [WhatsApp Cloud API, Instagram Graph API, Telegram Bot API],
  text(fill: muted)[Linux], [Основная рабочая среда с 2025 года: Arch, Niri и Quickshell,
    до этого Manjaro, Hyprland, Sway, GNOME. Деплой на серверы Ubuntu
    #box[shell-скриптами].],
  text(fill: muted)[Языки], [Русский, казахский],
)

// ── Образование ─────────────────────────────────────────

#section("Образование")
#entry("Колледж KSA (Kazakhstani Swiss American)", "", "2022 — 2025")
Квалификация — разработчик программного обеспечения. #text(fill: muted)[Специальность «Программное обеспечение (по видам)».]
