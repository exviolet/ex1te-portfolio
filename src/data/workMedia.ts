import type { ImageMetadata } from 'astro';

import steamHero from '../assets/work/steam-kz/user-home.png';
import steamAnalytics from '../assets/work/steam-kz/analytics.png';
import steamCurator from '../assets/work/steam-kz/curator-school.png';
import steamSchoolAdmin from '../assets/work/steam-kz/school-admin.png';
import steamReport from '../assets/work/steam-kz/report.png';
import steamWaReport from '../assets/work/steam-kz/whatsapp-report.jpg';
import steamWaScoreList from '../assets/work/steam-kz/whatsapp-score-list.jpg';
import steamWaScoreStop from '../assets/work/steam-kz/whatsapp-score-stop.jpg';
import steamChallengeRejected from '../assets/work/steam-kz/challenge-rejected.png';
import steamChallengePrize from '../assets/work/steam-kz/challenge-prize.png';
import interactivelabHero from '../assets/work/interactivelab/panel-home-dark.jpg';
import interactivelabLoginDark from '../assets/work/interactivelab/panel-login-dark.jpg';
import interactivelabLoginLight from '../assets/work/interactivelab/panel-login-light.jpg';
import tapytapHero from '../assets/work/tapytap/home-light.jpg';
import tapytapEditTop from '../assets/work/tapytap/edit-top-light.jpg';
import tapytapEditReminders from '../assets/work/tapytap/edit-reminders-light.jpg';
import tapytapCalendar from '../assets/work/tapytap/calendar-dark.jpg';
import tapytapStats from '../assets/work/tapytap/stats-dark.jpg';
import tapytapHabitStats from '../assets/work/tapytap/habit-stats-dark.jpg';
import tapytapJournal from '../assets/work/tapytap/journal-dark.jpg';
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
        after: 'решение-2',
        images: [{ src: steamReport, alt: 'Первая страница PDF-отчёта по школе на фирменном бланке' }],
        caption: 'Страница сгенерированного отчёта. Синтетические данные, настоящий бланк и вёрстка.',
        action: { label: 'Отчёт целиком', href: '/documents/steam-kz-report.pdf', icon: 'page' },
      },
      {
        after: 'решение-2',
        images: [
          { src: steamWaReport, alt: 'Сообщение в WhatsApp с PDF-отчётом по школе за август и кнопкой «Оценить»' },
          { src: steamWaScoreList, alt: 'Список оценок платформы от 0 до 5 в WhatsApp' },
          { src: steamWaScoreStop, alt: 'Оценка 3, затем «стоп» и подтверждение отписки на казахском и русском' },
        ],
        caption: 'Пилот на проде: отчёт приходит в WhatsApp, оценка возвращается списком, «стоп» отписывает школу. Имя получателя скрыто.',
      },
      {
        after: 'решение-3',
        images: [
          { src: steamChallengeRejected, alt: 'Кабинет учителя: прогресс 1 из 2, ролик отклонён с причиной «не является рилсом»' },
          { src: steamChallengePrize, alt: 'Кабинет учителя: прогресс 2 из 2, оба ролика приняты, приз открыт' },
        ],
        caption: 'Кабинет учителя: ролик отклонён с причиной, затем возвращён в принятые — прогресс засчитан, приз открыт.',
      },
      {
        after: 'результат',
        video: '/video/steam-kz-analytics.mp4',
        caption: 'Переход от месячной аналитики к карточке учителя и к годовой.',
      },
    ],
  },
  interactivelab: {
    hero: interactivelabHero,
    heroAlt: 'Панель METZ с открытой главной InteractiveLAB: девять предметов и кнопка «Скачать всё»',
    figures: [
      {
        after: 'результат',
        images: [
          { src: interactivelabLoginDark, alt: 'Экран входа InteractiveLAB на панели в тёмной теме' },
          { src: interactivelabLoginLight, alt: 'Тот же экран входа в светлой теме' },
        ],
        caption: 'Вход на панели в тёмной и светлой теме. Язык переключается там же: ҚАЗ или РУС.',
      },
    ],
  },
  tapytap: {
    hero: tapytapHero,
    heroAlt: 'Главный экран TapyTap на iPhone: список привычек с категориями, сериями и отметками за день',
    figures: [
      {
        after: 'решение-1',
        images: [
          { src: tapytapEditTop, alt: 'Редактирование количественной привычки «Бегать утром»: тип, описание, цель серии, единица измерения' },
          { src: tapytapEditReminders, alt: 'Нижняя часть той же формы: категории и напоминание в 09:20 по понедельникам, средам и пятницам' },
        ],
        caption: 'Редактирование привычки после перехода на один стор. Напоминание, заданное при создании, на месте; раньше этот экран сохранял пустой список.',
      },
      {
        after: 'результат',
        images: [
          { src: tapytapCalendar, alt: 'Календарь привычки «Бегать утром» за октябрь 2026 и тепловая карта за полгода' },
          { src: tapytapStats, alt: 'Экран статистики: карта активности, продуктивность за неделю и месяц, список привычек с сериями' },
          { src: tapytapHabitStats, alt: 'Статистика одной привычки: текущая серия, всего выполнено, прогресс за две недели' },
          { src: tapytapJournal, alt: 'Журнал заметок, сгруппированных по месяцам и привязанных к привычкам' },
        ],
        caption: 'Календарь, статистика и журнал в тёмной теме, данные тестового аккаунта.',
      },
    ],
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
        caption: 'Черновик, Ctrl+Enter, один блок уходит в привязанный терминал.',
      },
    ],
  },
};
