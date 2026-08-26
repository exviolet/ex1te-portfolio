---
title: Sendoff
summary: Linux prompt-first editor для подготовки и отправки многострочных запросов в Herdr, Orca и tmux.
context: Personal open-source product
status: released
role: Solo Product Engineer
team: Solo
period: "2026"
featured: false
homepageOrder: 3
technologies:
  - React
  - TypeScript
  - Zustand
  - IndexedDB
  - Tauri 2
  - Rust
published: true
---

## Контекст

Sendoff появился из ежедневной работы с terminal coding agents. Терминальный input неудобен для подготовки длинных структурированных запросов, а несколько агентов и проектов требуют явного target context.

Sendoff не запускает модели и не строит pipeline. Это сфокусированный editor/handoff tool.

## Моя роль

Я придумал продукт и отвечаю за product UX, React frontend, IndexedDB persistence, интеграции с tmux/Herdr/Orca, Tauri/Rust wrapper, tests, Linux distribution и публичную упаковку.

## Решение 1 / prompt-first поверхность

Основной объект — редактируемый draft: вкладки, workspaces, groups, поиск, slash menu, references и image paths. `Ctrl+Enter` передаёт весь prompt одним подтверждённым блоком.

## Решение 2 / явный terminal target

Target model сохраняет provider и стабильное описание привязки. Ephemeral handles не персистятся бездумно. При неоднозначности открывается unified picker для Herdr, Orca и tmux.

## Решение 3 / переносимый AppImage

Host build на Arch наследовал требование glibc 2.43. Публичный AppImage собирается в Ubuntu 22.04 container и требует glibc 2.35+, что подходит стабильным дистрибутивам.

## Результат / проверка

- публичный release `v0.2.0`;
- AppImage и SHA-256 digest;
- ежедневное использование двумя людьми;
- более 75 вкладок в dogfooding environment;
- TypeScript, lint и 149 tests проходят.

## Ограничения

Нет Windows/macOS builds и auto-update. Два пользователя не означают product-market fit. Новый landing и media пока находятся на локальной feature-ветке до merge/deploy.
