import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

async function builtCss() {
  const dir = path.join(dist, '_astro');
  const files = (await readdir(dir)).filter((name) => name.endsWith('.css'));
  const sheets = await Promise.all(files.map((name) => readFile(path.join(dir, name), 'utf8')));
  return sheets.join('\n');
}

async function built(route) {
  // build.format 'file': /work/tapytap is dist/work/tapytap.html.
  const relative = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`;
  return readFile(path.join(dist, relative), 'utf8');
}

test('all required static routes are built', async () => {
  for (const route of ['/', '/work', '/work/steam-kz', '/work/interactivelab', '/work/sendoff', '/work/tapytap', '/about', '/contact']) {
    const html = await built(route);
    assert.match(html, /<!DOCTYPE html>/i, route);
  }
});

test('home exposes identity, four projects, and the full working stack', async () => {
  const html = await built('/');
  assert.match(html, /Бакытжан Избасаров/);
  assert.match(html, /Frontend Developer/);
  assert.match(html, /STEAM\.KZ Platform/);
  assert.match(html, /InteractiveLAB/);
  assert.match(html, /Sendoff/);
  assert.match(html, /TapyTap/);
  assert.match(html, /React Native \+ Expo/);
  assert.match(html, /Docker \+ Docker Compose/);
  assert.doesNotMatch(html, /Одно сотрудничество с постепенным переходом/);
});

test('work, about, and contact have distinct responsibilities', async () => {
  const work = await built('/work');
  const about = await built('/about');
  const contact = await built('/contact');

  assert.match(work, /Четыре проекта показывают разные стороны/);
  assert.match(about, /Одно сотрудничество с постепенным переходом/);
  assert.match(about, /React Native \+ Expo/);
  assert.match(about, /Docker \+ Docker Compose/);
  assert.match(contact, /Ищу постоянную frontend-позицию и беру проекты на фрилансе/);
  assert.match(contact, /href="mailto:bakytzhan\.izbassarov@gmail\.com"/);
});

test('case pages render content collection stories', async () => {
  const steam = await built('/work/steam-kz');
  const interactive = await built('/work/interactivelab');
  const sendoff = await built('/work/sendoff');
  const tapytap = await built('/work/tapytap');

  assert.match(steam, /Моя роль \/ где проходит граница/);
  assert.match(steam, /одна аналитическая модель/i);
  assert.match(interactive, /Chrome 83/);
  assert.match(interactive, /подписан и раздаётся школам/);
  assert.match(sendoff, /запрос вместо строки ввода/);
  assert.match(sendoff, /v0\.2\.0/);
  assert.match(tapytap, /Expo SDK 57/);
  assert.match(tapytap, /In development/);
});

test('job portfolio does not inherit Personal Platform visual language', async () => {
  for (const route of ['/', '/work', '/about', '/contact']) {
    const html = await built(route);
    assert.doesNotMatch(html, /Steppe Signal/i);
    assert.doesNotMatch(html, /Personal field station/i);
    assert.doesNotMatch(html, /Editorial Field Station/i);
  }
});

test('the site never becomes a React SPA', async () => {
  const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  const all = { ...pkg.dependencies, ...pkg.devDependencies };
  assert.equal(all.react, undefined);
  assert.equal(all['react-dom'], undefined);
});

test('CV is a real PDF file', async () => {
  const pdf = await readFile(path.join(root, 'public/cv.pdf'));
  assert.equal(pdf.subarray(0, 4).toString('ascii'), '%PDF');
  assert.ok(pdf.length > 1024);
});

test('the rejected visual direction stays gone', async () => {
  // Four layouts in a row reproduced the same paper/hairline/State-Lens grammar
  // because docs/design prescribed it. See docs/design/reference-board.md.
  for (const route of ['/', '/work', '/about', '/contact']) {
    const html = await built(route);
    assert.doesNotMatch(html, /Proof before performance/i, route);
    assert.doesNotMatch(html, /State Lens/i, route);
    assert.doesNotMatch(html, /IBM Plex Sans Condensed/i, route);
  }

  const css = await builtCss();
  assert.doesNotMatch(css, /#f1f1ed|#e7ece9/i, 'paper palette');
  assert.doesNotMatch(css, /Plex Sans Condensed/i, 'condensed display face');
});

test('the site is dark by default and offers a theme toggle', async () => {
  const html = await built('/');
  assert.match(html, /<html[^>]+data-theme="dark"/);
  assert.match(html, /data-theme-toggle/);

  const css = await builtCss();
  assert.match(css, /--color-bg:\s*#0e0e10/, 'dark tokens on :root');
  assert.match(css, /\[data-theme=["']?light["']?\]/, 'light theme override');
});

test('projects are presented as a rail and panel without client-side JavaScript', async () => {
  const html = await built('/');
  assert.match(html, /name="project"/);
  // Four radio inputs, one per project, and no framework hydration.
  assert.equal(html.match(/name="project"/g).length, 4);
  assert.doesNotMatch(html, /astro-island/);
  // One panel is pre-selected server-side, so the section works with JS disabled.
  assert.match(html, /type="radio"[^>]*checked/);
});

test('metadata never uses centred dot separators', async () => {
  // The author dislikes them specifically; the house separator is "//" or "/".
  for (const route of ['/', '/work', '/about', '/contact']) {
    const html = await built(route);
    const body = html.slice(html.indexOf('<body'));
    assert.doesNotMatch(body, /\u00b7/, `centred dot on ${route}`);
  }
});

test('homepage sections are indexed and named', async () => {
  const html = await built('/');
  // Identity carries no marker: the h1 is the page heading, not section 00.
  assert.doesNotMatch(html, /SECTION\s*<span[^>]*>\/\/<\/span>\s*00/);
  for (const [index, name] of [['01', 'Projects'], ['02', 'Experience'], ['03', 'Stack']]) {
    assert.match(html, new RegExp(`SECTION\\s*<span[^>]*>//</span>\\s*${index}`), `marker ${index}`);
    assert.match(html, new RegExp(name), `section name ${name}`);
  }
});

test('icons come from Iconoir and are inlined, never Lucide', async () => {
  const html = await built('/');
  assert.match(html, /<svg[^>]*class="icon"/, 'inlined icon');
  assert.match(html, /stroke="currentColor"/, 'icon inherits colour');
  assert.doesNotMatch(html, /lucide/i);
});

test('the footer carries the closing call on every route', async () => {
  for (const route of ['/', '/work', '/about', '/contact']) {
    const html = await built(route);
    const footer = html.slice(html.indexOf('<footer'));
    assert.match(footer, /Расскажите про задачу/, route);
    // The closing line names Telegram, so the accent button has to land there.
    assert.match(footer, /href="https:\/\/t\.me\/ex1te0"/, route);
    assert.match(footer, /Меню/, route);
    assert.match(footer, /Соцсети/, route);
    assert.match(footer, /© \d{4} Бакытжан Избасаров/, route);
    // Removed on request: build credit, location, and the live clock.
    assert.doesNotMatch(footer, /GSAP/, route);
    assert.doesNotMatch(footer, /Казахстан/, route);
    assert.doesNotMatch(footer, /data-local-clock/, route);
  }
});

test('the watermark spotlight is inert until a pointer drives it', async () => {
  const html = await built('/');
  const css = await builtCss();
  // Two stacked copies: the base is always visible, the glow only inside the mask.
  assert.match(html, /ghost-base/);
  assert.match(html, /ghost-glow/);
  // Starts fully transparent, so nothing animates on its own.
  assert.match(css, /--spot-o,\s*0/);
  assert.match(css, /mask-image:radial-gradient/);
  // The glow traces an outline; a filled glow would flood the letters.
  assert.match(css, /-webkit-text-stroke:2px/);
  // Mask coordinates carry a unit, or the whole gradient goes invalid and
  // the layer renders unmasked.
  assert.match(css, /calc\(var\(--spot-x[^)]*\)\s*\*\s*1px\)/);
});

test('the homepage does not repeat the closing call above the footer', async () => {
  const html = await built('/');
  const main = html.slice(html.indexOf('<main'), html.indexOf('<footer'));
  assert.doesNotMatch(main, /SECTION\s*<span[^>]*>\/\/<\/span>\s*04/);
});

test('the current-stage marker follows the experience period', async () => {
  const html = await built('/');
  // The marker is derived from the period, not stored on a stage. While the
  // period read "настоящее время" it had to name the running stage; since the
  // work ended in September 2026 the period is closed and the marker must go.
  assert.match(html, /Август 2025 — сентябрь 2026/);
  // Narrow on purpose: TapyTap's period in the project rail still reads
  // "настоящее время", and the marker's rule lives in the inlined CSS.
  assert.doesNotMatch(html, /Август 2025 — настоящее время/);
  assert.doesNotMatch(html, /class="timeline-now/);
});

test('internal routes carry the same grammar as the homepage', async () => {
  // Before this pass they opened with a bare English word above the h1 and
  // used `.route-heading` / `.two-column`, which the board rejects.
  for (const [route, marker] of [['/work', 'Work'], ['/about', 'About'], ['/contact', 'Contact']]) {
    const html = await built(route);
    assert.match(html, new RegExp(`class="page-marker"[^>]*>\\[ ${marker} \\]`), `page marker on ${route}`);
  }

  const work = await built('/work');
  const about = await built('/about');
  for (const [index, name] of [['01', 'Index'], ['02', 'Elsewhere']]) {
    assert.match(work, new RegExp(`SECTION\\s*<span[^>]*>//</span>\\s*${index}`), `work marker ${index}`);
    assert.match(work, new RegExp(name), `work section ${name}`);
  }
  for (const [index, name] of [['01', 'Experience'], ['02', 'Stack'], ['03', 'Elsewhere']]) {
    assert.match(about, new RegExp(`SECTION\\s*<span[^>]*>//</span>\\s*${index}`), `about marker ${index}`);
    assert.match(about, new RegExp(name), `about section ${name}`);
  }

  // Case pages get the bracket form too, filled with the case's own context.
  // The context is Russian like every other marker: this slot sits next to
  // `[ Коммерческий продукт ]` on a neighbouring case, and an English phrase
  // there made one slot speak two languages.
  const sendoff = await built('/work/sendoff');
  assert.match(sendoff, /class="page-marker"[^>]*>\[ Личный open-source-продукт \]/);
});

test('the removed layout primitives do not come back', async () => {
  // `.route-section`, `.route-heading` and `.two-column` were deleted with the
  // internal-route pass. Their markup is the rejected grammar, so a route that
  // starts using them again is a regression, not a style choice.
  for (const route of ['/', '/work', '/about', '/contact', '/work/sendoff']) {
    const html = await built(route);
    const body = html.slice(html.indexOf('<body'));
    assert.doesNotMatch(body, /route-heading|two-column|route-section/, route);
  }
  const css = await builtCss();
  assert.doesNotMatch(css, /\.route-heading|\.two-column/, 'primitives left in the stylesheet');
});

test('one experience timeline serves both routes that show it', async () => {
  // /about used to render the same three stages as a different table.
  const home = await built('/');
  const about = await built('/about');
  for (const [route, html] of [['/', home], ['/about', about]]) {
    assert.match(html, /2026\/03/, `stamp format on ${route}`);
  }
});

test('the header wordmark is the person, not a category', async () => {
  const html = await built('/');
  assert.match(html, /\[ BAKYTZHAN IZBASSAROV \]/);
  assert.doesNotMatch(html, /EX1TE <span[^>]*>\/\/<\/span> FRONTEND/);
});

test('motion is an enhancement, never a prerequisite for reading the page', async () => {
  const html = await built('/');
  const css = await builtCss();

  // The name is split server-side, so it is complete markup before any script.
  assert.equal(html.match(/class="split-char[^"]*"/g).length, 17);
  assert.match(html, /class="split-name[^"]*" aria-label="Бакытжан Избасаров"/);

  // Every hiding rule is gated behind the motion flag, which the inline script
  // sets only when JS runs and reduced motion is not requested.
  assert.match(html, /prefers-reduced-motion: reduce/);
  assert.match(css, /html\[data-motion=["']?ready["']?\][^{]*\{opacity:0\}/);
  assert.doesNotMatch(css, /^\s*\[data-reveal\][^{]*\{opacity:0\}/m, 'ungated reveal rule');
});

test('canonical URLs match the served paths, without .html', async () => {
  assert.match(await built('/'), /<link rel="canonical" href="https:\/\/bakytzhan\.pages\.dev\/">/);
  assert.match(await built('/work'), /<link rel="canonical" href="https:\/\/bakytzhan\.pages\.dev\/work">/);
  assert.match(await built('/work/tapytap'), /<link rel="canonical" href="https:\/\/bakytzhan\.pages\.dev\/work\/tapytap">/);
  assert.doesNotMatch(await built('/404'), /rel="canonical"/);
});
