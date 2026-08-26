---
title: InteractiveLAB
summary: Offline-first React/Capacitor client для школьных Android-панелей с Chrome 83 и нестабильной сетью.
context: Коммерческий продукт
status: pre-launch
role: Client frontend owner
team: Два разработчика
period: Август 2026
featured: false
homepageOrder: 2
technologies:
  - React
  - TypeScript
  - Vite
  - Capacitor 7
  - IndexedDB
  - Android
published: true
---

## Контекст

InteractiveLAB доставляет интерактивные учебные симуляторы на школьные панели METZ, включая школы со слабой или отсутствующей сетью.

Целевая панель работает на Android 11 и WebView Chrome 83. Физический 4K-экран отдаёт CSS viewport 1280×720 при DPR 3, а удалённые DevTools недоступны.

## Моя роль / граница ownership

Я отвечаю за `client/`: React UI, offline content model, Capacitor wrapper, compatibility, APK и проверку на панели. Server/FastAPI/database принадлежат коллеге. Первоначальную admin-панель построил я и затем передал ownership.

## Решение 1 / APK shell и IndexedDB

Application shell включён в APK. Subjects, simulators, HTML-файлы, instructions и attachments хранятся в IndexedDB. Service worker сознательно не используется, чтобы не создавать второй cache lifecycle поверх нативной оболочки.

## Решение 2 / guard по итоговому bundle

Vite target установлен на Chrome 80. После сборки отдельный guard проверяет `dist` на синтаксис и CSS новее Chrome 83. ES5 diagnostic overlay показывает parse/runtime errors прямо на панели, потому что DevTools недоступны.

## Решение 3 / shared-device ownership

Offline-контент связан с user ID через owner marker. При входе другого учителя IndexedDB предыдущего пользователя очищается до загрузки нового каталога.

## Результат / проверка

Production build и Chrome 83 guard проходят. Offline download/restart flow, темы, kk/ru, video seek, instructions и attachments проверялись на реальной панели.

## Ограничения

Проект ещё не запущен в школах. Current release APK не готов к раздаче до появления HTTPS backend. Финальные portfolio media ждут следующего hardware-run.
