---
target: homepage (/)
total_score: 23
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
timestamp: 2026-08-23T22-35-45Z
slug: src-pages-index-astro
---
Method: dual-agent for the critique (A: design review · B: detector/browser). ⚠️ The audit half ran DEGRADED: single-context — AuditC went idle twice without delivering a report, so the five audit dimensions were measured in-thread by the parent.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of system status | 3 | Active workspace marked three ways. But `04 tapytap` is off-screen on mobile (rail scrollWidth 500 vs client 368), and `[ SECTION // NN ]` looks like a position indicator while being a static label. |
| 2 | Match system / real world | 2 | Every `h2` is English on a Russian page; `IDENTITY` is an internal designer label. Rail says `steam-kz`, panel says `STEAM.KZ Platform` — the visitor maps repo slugs to product names. |
| 3 | User control and freedom | 3 | Reversible, theme persists pre-paint with no FOUC. But no route from Workspaces to `/work`, no way to enlarge media. |
| 4 | Consistency and standards | 3 | Dialect holds. Three lapses: hand-picked `0.18s` durations in StackGrid against the project's own token rule; header hard-codes `/cv.pdf` while footer reads `contact.cv`; same destination is `Связаться` then `Написать`. |
| 5 | Error prevention | 2 | `mailto:hello@example.com` and `telegramOrLinkedIn: '#'` are live, clickable dead ends on the closing surface. |
| 6 | Recognition rather than recall | 2 | Four bare slugs with no descriptor. `sendoff` and `tapytap` communicate nothing before clicking. |
| 7 | Flexibility and efficiency | 3 | Radios form a real radio group: arrows walk the rail, focus ring lands on the visible label, hidden panels leave the tab order. Missing: skip link. |
| 8 | Aesthetic and minimalist design | 3 | Strongest axis. Undercut by ~220px empty column under the rail and by STACK being the most uniform block on a page whose brief warns against uniformity. |
| 9 | Recognise / diagnose / recover | 2 | Missing media handled with a sentence, not a broken frame — right instinct, wrong text: the author's backlog rendered as production copy. |
| 10 | Help and documentation | n/a | A four-section hiring homepage has no documentable surface. |
| **Total** | | **23/36** | Acceptable — real strengths, but the conversion surface is half-empty. |

## Audit Health Score

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2 | `<h2>Identity</h2>` precedes `<h1>` in built HTML; `.pill-accent:hover` drops to 4.16:1 in light theme; nav links 18px tall on mobile. |
| 2 | Performance | 3 | 1.3MB dist, 114KB JS of which 68KB is GSAP for four enhancements. Zero console errors, 16/16 requests OK. |
| 3 | Responsive design | 2 | Rail clips the fourth workspace at 390px; touch targets systemically 18-42px. No horizontal overflow. |
| 4 | Theming | 4 | Every base pair passes AA in both themes. Hard-coded colours only in a footer mask gradient and theme-color meta — both defensible. |
| 5 | Implementation integrity | 3 | Static scan clean (0 findings). Browser-rendered scan found 23 computed-style issues the source scan structurally cannot see. |
| **Total** | | **14/20** | Good — address accessibility and responsive. |

## Design Specificity Verdict

Split, and the split runs at the bottom edge of the Workspaces panel.

**Authored for this product:** the Workspaces mechanism (rail labels are real repo slugs driving a panel — the author's actual niri/tmux gesture, zero-JS radios, GSAP only on handover); the portrait treatment (`filter: invert(1)` with `--portrait-field` matched to the inverted field so frame and image read as one rectangle); the identity moment (surname, not given name, in mint Unbounded); the `//` dialect applied without a single lapse.

**Category-interchangeable:** STACK (18 identical cells — replace the strings and it is any developer's portfolio); the EXPERIENCE timeline (accent stamp left, heading and paragraph right — the exact label-left/description-right rhythm the board bans); the identity block composition (name / role / paragraph / two pills / fact list / portrait right is the default developer hero).

The board asked for one playing mechanism and got a good one. It occupies roughly 400px of a ~2800px page; the rest is stock portfolio grammar.

**Deterministic scan:** source scan clean, exit 0, zero findings — verified as a genuine pass, not a silent skip (`.astro` is scannable, no ignore config exists, all 20 files reachable). Browser-rendered scan: 23 findings — 18 × undersized-ui-text at 10.56px (the STACK kickers), 3 × tiny-text (11.84px ×2, 11.52px), 1 × wide-tracking (0.06em on the wordmark), 1 × line-length (~90 chars). The 0-vs-23 gap is not a contradiction: a regex pass over `.astro` cannot see what `rem` resolves to after the cascade.

## Overall Impression

The engineering is better than the design. Theme handling, the zero-JS mechanism, motion gating, and focus management are all done by someone who reasoned about cost rather than appearance — that is rare and it shows. What lets the page down is that its one conversion surface has no content in three of four states, and the fourth argues against its own caption. A visitor decides here, and here is where the page has least to show.

The single biggest opportunity: make the Workspaces panels dense with what is actually hard about each project, instead of waiting for screenshots that may never arrive.

## What's Working

**The theme system is engineering-grade.** Pre-paint inline script reads localStorage before first paint, so a stored light theme never flashes dark. Both glyphs render and cross-fade, so the icon is correct before any script runs. The universal colour transition is armed for 320ms via `data-theme-anim` and then removed. Every base text pair passes AA in both themes — measured: ink 17.19/17.43, body 9.66/8.26, muted 5.63/5.48.

**Workspaces has no JavaScript dependency.** Radio inputs are the source of truth; `:checked ~` drives rail state and panel visibility; GSAP animates only the handover and stands down under reduced motion, including `clearProps` for motion disabled after a tween ran. Hidden panels keep their grid cell so switching never shifts the page, and `visibility: hidden` pulls their links from the tab order.

**The `//` dialect is applied with total discipline.** One separator, one technical motif, never a centred dot, never a competing second signal. This is why the site reads authored even where the layouts under it are generic.

## Priority Issues

### [P1] Three of four Workspaces have no content, and the fourth misrepresents the work
Panels `02` and `04` render a grey slab with an internal TODO. `03` renders a terminal at 1:1, unreadable at 567×400. `01` renders the WordPress/LearnDash course catalogue — a bright grid of third-party course art — under a caption reading «Две React/TypeScript SPA».
**Why it matters:** this is the entire conversion surface. Three of four give nothing to decide on; the fourth makes a reader conclude the React work is not what is being shown.
**Fix:** replace `workMedia.placeholder` backlog text with a dense technical block (the constraint that made the project hard); for `01` show his teacher/curator SPA, not the platform front page; crop `03` to a legible region instead of `object-fit: cover`.
**Command:** `/impeccable clarify`

### [P1] Heading order is inverted, and the accent CTA fails AA on hover
`<h2>Identity</h2>` is emitted before `<h1>` in `dist/index.html` — heading navigation starts at level 2 with an internal label before reaching the person's name. Separately, `.pill-accent:hover { opacity: 0.88 }` fades background and text together: light theme drops 5.17:1 → **4.16:1**, below AA, exactly while the pointer is on the primary CTA.
**Why it matters:** WCAG 2.1 SC 1.3.1 and SC 1.4.3. On an identity-first page the heading inversion also contradicts the page's own thesis.
**Fix:** render `SectionHead` after `SplitName` in the identity section, or drop the identity `h2` to a visually-hidden one placed after the `h1`. Replace the hover opacity with an explicit `--color-accent-hover` token per theme.
**Command:** `/impeccable audit`

### [P2] The fourth workspace does not exist on mobile, and touch targets are systemically small
At 390px the rail measures scrollWidth 500 against clientWidth 368; `04 tapytap` is not fully visible, signalled only by `scrollbar-width: thin`, which iOS does not render persistently. Measured target heights: nav links 18px, `.panel-open` 24px, footer links 24px, rail items 42px, pills 42px, icon actions 36×36.
**Why it matters:** a recruiter on a phone never learns the fourth project exists. Nav links at 18px are below the 24×24 minimum of WCAG 2.2 SC 2.5.8 on the element itself; the spacing exception may rescue them, but it is fragile.
**Fix:** add an accent fade mask on the rail's right edge on mobile and raise rail padding past 44px; raise nav link hit area with padding rather than font size.
**Command:** `/impeccable adapt`

### [P2] The first screen ends in a void because the reveal deletes the peek
Measured at 818px viewport: `.workspaces-section` sits at top 773px — a 45px peek — but all three `[data-reveal]` sections compute `opacity: 0` until scroll triggers them.
**Why it matters:** a visitor who does not scroll sees a one-screen site with no work on it. The board's own anti-reference list rejects «огромный пустой hero ради анимации»; this is that outcome produced by animation rather than by layout.
**Fix:** exclude the first `[data-reveal]` from the reveal set so Workspaces paints at rest, keeping the 14px/once/no-scrub cap intact.
**Command:** `/impeccable animate`

### [P3] STACK reproduces the uniformity the brief bans, and still proves nothing
18 identical cells, `// KIND` above a name. The one-surface geometry answers the hairline-box ban but not the «одинаковые сетки равных карточек … повторяющийся ритм» ban directly below it. Nothing distinguishes `React` (four cases deep) from `Angular` (no case uses it) or `Git`. The browser scan flags all 18 kickers at 10.56px, under an 11px floor for functional text.
**Why it matters:** the reason given for deleting the soft-skill entries — «перечень не доказывает» — applies unchanged to the surviving eighteen.
**Fix:** keep the grid, vary the weight — set the technologies the cases actually evidence at `--color-ink` with an accent kicker and drop the rest to `--color-muted`. Raise kickers to 0.7rem/11.2px. The block then carries a claim, and the uniformity breaks because emphasis is uneven.
**Command:** `/impeccable typeset`

## Persona Red Flags

**Impatient Power User** — reads name and role in two seconds, then hits a black fold with no cue. If they scroll, they click `02` and get a grey box saying media is pending a hardware run. They leave without opening a case. The one thing they needed — one piece of legible visual proof — never arrives.

**Distracted Mobile User** — sees three of four workspaces. The portrait, which the board calls an equal object of the composition, is pushed to top 670px at 200px wide. The STEAM.KZ panel gives ~550px of a desktop screenshot they cannot read or tap to enlarge. They tap `Telegram / LinkedIn` and the page reloads to `/#`.

**Accessibility-Dependent User** — two things are genuinely right: the split name exposes the full string via `aria-label` with per-letter spans hidden, and the nav marker uses `content: '/' / ''` to stay out of the a11y tree while `aria-current` carries state. What they hit: the inverted heading order; four workspace radios with no `fieldset`/`radiogroup` name, announcing as four loose radios; no skip link past six header controls.

## Minor Observations

- `.timeline-rule` renders an empty `<span>` on every row and is `display: none`. Dead markup.
- `.rail` leaves ~220px of empty column under four items on desktop; in light theme this reads as a white L-shaped hole.
- Header CV pill hard-codes `/cv.pdf`; footer reads `contact.cv`. Two sources of truth for one file.
- `.panel-open` uses `margin-top: auto`, so its position jumps ~60px between the STEAM.KZ panel and the placeholder panels — visible during the switch animation.
- `reset.css` sets `scroll-behavior: smooth` globally; correctly reset under reduced motion, but the board says «без smooth-scroll».
- In light theme the panel border `#e3e3e6` is nearly invisible and the STEAM.KZ screenshot is itself a light UI, so the boundary between the site and the screenshot inside it disappears.
- `CLAUDE.md` documents the status enum as `production|pre-launch|released`, but `content.config.ts:11` includes `building`. The doc is stale, not the schema.
- StackGrid's `0.18s ease` durations predate the token rule by hours and were written in the same session as the rule forbidding them.

## Questions to Consider

1. The one working screenshot is a WordPress course catalogue built from someone else's theme. What would Workspaces look like if `01` showed his teacher/curator SPA cropped to one screen of real interface?
2. What if the placeholder panels became the most interesting ones — carrying Chrome 83, unstable network, real METZ hardware — instead of apologising for missing media? Is this a content-format problem rather than a missing-asset problem?
3. If the rail is the one playful mechanism, why does it stop at four items? In niri/tmux the workspace switch is global. What if EXPERIENCE and STACK were workspaces `05` and `06`?
4. STACK is duplicated byte-for-byte from `/about` — same component, same data. `AGENTS.md` says `/about` owns skills. What does the homepage lose if STACK becomes six technologies and a link?
5. Is the English section labelling carrying character, or the last trace of a spec document?
