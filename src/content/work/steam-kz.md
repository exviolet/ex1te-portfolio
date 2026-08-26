---
title: STEAM.KZ Platform
summary: Две React/TypeScript SPA для учителей, школ, кураторов и управления образовательной WordPress/LearnDash-платформой.
context: Коммерческий продукт
status: production
role: Frontend Developer
team: STEAM.KZ
period: Март — август 2026
featured: true
homepageOrder: 1
technologies:
  - React 19
  - TypeScript
  - TanStack Query
  - TanStack Router
  - TanStack Table
  - WordPress REST API
  - PHP
  - mPDF / FPDI
published: true
---

## Контекст

STEAM.KZ уже использовала WordPress и LearnDash для образовательного контента. Продукту потребовались отдельные рабочие поверхности для учителей, администраторов школ, кураторов и управления платформой.

Задача была не в переписывании существующей системы с нуля, а в создании связного application layer поверх WordPress: маршрутизации, состояния, ролевого доступа, аналитики и отчётности.

## Моя роль / граница ownership

Моя основная зона — frontend и пользовательские сценарии. Я разрабатывал Platform Admin и Client SPA, формы, таблицы, фильтры, ролевую навигацию, WordPress cookie/nonce integration, аналитику и reporting flow.

Я не создавал WordPress, LearnDash или исходную контентную платформу. Кейс относится к кастомному продуктовому слою STEAM.KZ, связанным REST/PHP-функциям и поставке изменений.

## Решение 1 / одна аналитическая модель, разные роли

Platform Admin фильтрует данные по периоду, региону и школе. Curator переходит от общего обзора к выбранной школе. School Admin автоматически ограничен своей school membership.

Это не три независимых dashboard-макета, а разные уровни доступа к одной продуктовой модели.

## Решение 2 / нативная WordPress-аутентификация

Client SPA использует WordPress cookie authentication и REST nonce вместо отдельного JWT-слоя. После login создаётся session token, выдаются cookies и актуальный nonce, а стандартный `wp_login` hook сохраняет согласованность с login analytics.

## Решение 3 / отчёт как продолжение интерфейса

School Admin и Curator формируют PDF по школе. Reporting pipeline собирает KPI и teacher activity, поддерживает русские и казахские глифы, повторяет шапку таблицы и использует фирменный A4-бланк через FPDI.

На production-данных проявились ограничения temp-каталога mPDF и длины имён файлов внутри ZIP. Исправления вошли в release runbook и последующие версии.

## Результат / проверка

- две React SPA и четыре ролевые поверхности;
- month/year/custom analytics;
- PDF reporting;
- staging-copy;
- production tag `v2.2-2026-08-14`;
- проверенные release assets.

## Ограничения

Нет подтверждённых revenue/adoption metrics. Количество школ и пользователей не является моим личным результатом. Я не разработал всю STEAM.KZ с нуля.
