import type { ImageMetadata } from 'astro';

import steamHero from '../assets/work/steam-kz/user-home.png';
import steamAnalytics from '../assets/work/steam-kz/analytics.png';
import steamReport from '../assets/work/steam-kz/report.png';
import sendoffHero from '../assets/work/sendoff/handoff.webp';
import sendoffTarget from '../assets/work/sendoff/target-picker.webp';

export interface WorkMedia {
  hero?: ImageMetadata;
  heroAlt: string;
  secondary?: ImageMetadata[];
  video?: string;
  document?: string;
  placeholder?: string;
}

export const workMedia: Record<string, WorkMedia> = {
  'steam-kz': {
    hero: steamHero,
    heroAlt: 'Пользовательская главная STEAM.KZ с курсами и предметами',
    secondary: [steamAnalytics, steamReport],
    document: '/documents/steam-kz-report.pdf',
  },
  interactivelab: {
    heroAlt: 'InteractiveLAB на школьной Android-панели',
    placeholder: 'Медиа с реальной METZ-панели будет добавлено после следующего hardware-run.',
  },
  tapytap: {
    heroAlt: 'TapyTap на Android',
    placeholder: 'Скриншоты приложения будут добавлены после утверждения кейса.',
  },
  sendoff: {
    hero: sendoffHero,
    heroAlt: 'Sendoff рядом с terminal coding agent',
    secondary: [sendoffTarget],
    video: '/video/sendoff-handoff.mp4',
  },
};
