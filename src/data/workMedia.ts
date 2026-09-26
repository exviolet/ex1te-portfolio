import type { ImageMetadata } from 'astro';

import steamHero from '../assets/work/steam-kz/user-home.png';
import steamAnalytics from '../assets/work/steam-kz/analytics.png';
import steamCurator from '../assets/work/steam-kz/curator-school.png';
import steamSchoolAdmin from '../assets/work/steam-kz/school-admin.png';
import steamReport from '../assets/work/steam-kz/report.png';
import sendoffHero from '../assets/work/sendoff/handoff.webp';
import sendoffTarget from '../assets/work/sendoff/target-picker.webp';
import sendoffSlashMenu from '../assets/work/sendoff/slash-menu.webp';

export interface FigureImage {
  src: ImageMetadata;
  alt: string;
}

/* A figure is evidence for one section of the case, not decoration hung at the
   end. `after` is the opening of the heading slug it belongs to — `CaseBody`
   matches it by prefix and throws at build time when nothing matches, so a
   renamed heading loses the build rather than silently losing the screenshot. */
export interface CaseFigure {
  after: string;
  images?: FigureImage[];
  video?: string;
  caption: string;
  action?: { label: string; href: string; icon: 'page' | 'media-video' };
}

export interface WorkMedia {
  hero?: ImageMetadata;
  heroAlt: string;
  placeholder?: string;
  figures?: CaseFigure[];
}

/* Which screenshot proves which claim is decided in the evidence packs outside
   the repo (`portfolio-capture/<slug>/selected/SELECTION.md`), including the
   rule that the curator and school-admin views must be shown as a pair rather
   than as two unrelated dashboards. */
export const workMedia: Record<string, WorkMedia> = {
  'steam-kz': {
    hero: steamHero,
    heroAlt: 'Пользовательская главная STEAM.KZ с курсами и предметами',
    figures: [
      {
        after: 'моя-роль',
        images: [{ src: steamAnalytics, alt: 'Обзор аналитики администратора платформы с фильтрами и KPI' }],
        caption: 'Административная SPA: фильтры по периоду, региону и школе над общей аналитикой.',
      },
      {
        after: 'решение-1',
        images: [
          { src: steamCurator, alt: 'Аналитика выбранной школы в интерфейсе куратора' },
          { src: steamSchoolAdmin, alt: 'Та же аналитика в интерфейсе администратора школы' },
        ],
        caption: 'Одна модель, разный охват: куратор выбирает школу, администратор школы уже в своей.',
      },
      {
        after: 'решение-3',
        images: [{ src: steamReport, alt: 'Первая страница PDF-отчёта по школе на фирменном бланке' }],
        caption: 'Страница сгенерированного отчёта. Синтетические данные, настоящий бланк и вёрстка.',
        action: { label: 'Отчёт целиком', href: '/documents/steam-kz-report.pdf', icon: 'page' },
      },
      {
        after: 'результат',
        video: '/video/steam-kz-analytics.mp4',
        caption: 'Переход от месячной аналитики к карточке учителя и к годовой. Без звука, 20 секунд.',
      },
    ],
  },
  interactivelab: {
    heroAlt: 'InteractiveLAB на школьной Android-панели',
    placeholder: 'Медиа с реальной METZ-панели появится после следующего прогона на железе.',
  },
  tapytap: {
    heroAlt: 'TapyTap на Android',
    placeholder: 'Скриншоты приложения будут добавлены после утверждения кейса.',
  },
  sendoff: {
    hero: sendoffHero,
    heroAlt: 'Окно Sendoff рядом с терминалом, в который уходит запрос',
    figures: [
      {
        after: 'решение-1',
        images: [{ src: sendoffSlashMenu, alt: 'Черновик запроса в Sendoff с открытым slash-меню' }],
        caption: 'Черновик набирается целиком, а заготовки вставляются с клавиатуры, без ухода к мыши.',
      },
      {
        after: 'решение-2',
        images: [{ src: sendoffTarget, alt: 'Общий выбор адреса отправки: Herdr, Orca и tmux в одном списке' }],
        caption: 'Herdr, Orca и tmux в одном списке — адрес выбирается явно, а не угадывается по активному окну.',
      },
      {
        after: 'результат',
        video: '/video/sendoff-handoff.mp4',
        caption: 'Черновик, Ctrl+Enter, один блок уходит в привязанный терминал. Без звука, 24 секунды.',
      },
    ],
  },
};
