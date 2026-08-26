# Project contract / ex1te job portfolio

## Purpose

Employer-facing frontend portfolio. It is separate from `ex1te.pages.dev` and must not become another personal archive.

## Session state

`HANDOFF.md` carries what this contract deliberately does not: what was finished in the last session, what is open, and what was decided against and why. Read it before starting work, and update it at the end of a session. It is committed, so it travels with the repo.

## Stack boundaries

- Astro + TypeScript + custom CSS.
- Tailwind is permitted but not adopted; the stylesheet is token-driven and small. Adopt it only if the author asks.
- GSAP drives four places and no more: the name assembling letter by letter, the single section reveal (`[data-reveal]`), the footer watermark, and the project-panel handover. Switching itself is CSS-only — radio inputs plus `:checked` — and GSAP animates only the handover between panels. All of it is gated on `html[data-motion="ready"]`, so the page reads fully without JavaScript. Do not add a fifth site, and do not widen the reveal: 14px, once, no scrub is the cap.
- State feedback — hover, press, theme swap, active markers — is CSS only, never GSAP. Timings come from the `--dur-*` and `--ease-*` tokens; do not hand-pick new durations.
- The portrait reveal is the fifth motion site and the only one added deliberately: a 14x14 grid of script-built cells carrying the photograph as background slices, revealed in shuffled order. It answers input and never plays on its own, requests nothing until it runs, and falls back to the illustration alone without JavaScript.
- The theme swap uses the View Transitions API: a diagonal band wipes from the right edge to the left over `--dur-wipe`, revealing the incoming theme while the outgoing snapshot is held still. Guarded by `@supports (view-transition-name: root)` and by reduced motion, both falling back to the 260ms colour transition. This is the one place where a symmetric ease is correct — it is a whole-canvas handover, not an element entrance.
- Do not turn the site into a React SPA.
- Client JavaScript must stay isolated to components that require it, and every interaction must work without it.

## Route boundaries

- `/` identifies the person and previews work.
- `/work` owns the project index.
- `/work/[slug]` owns case studies.
- `/about` owns biography, experience, and skills.
- `/contact` owns availability and contact channels.

Do not reassemble every section into one long homepage.

## Visual boundaries

### Direction (positive spec)

`docs/design/reference-board.md` is the single source of visual direction. Read it before changing any markup or CSS. In short:

- **Identity first.** Name, role, portrait come before any proof architecture. Do not open the homepage with a positioning slogan.
- **Dark by default**, light via an explicit theme toggle. Near-black field, quiet lines, one accent colour.
- **Rounded geometry.** `--radius-surface` on panels and media, `--radius-pill` on buttons, tags, and navigation.
- **Monospace for utility only** — navigation, metadata, labels. Body copy stays in the body face.
- **Projects are an index: rail + panel.** Zero-JS radio switching. This was once framed as the site's "one playful mechanism" borrowed from herdr/niri/tmux; the author rejected that framing on 2026-08-26 because a visitor reads it as a tab interface and the metaphor is never communicated. The site's playful mechanism is the identity portrait, which assembles into a real photograph of the author on pointer (viewport entry on touch). Decided 2026-08-26. Do not add a second one.
- **Indexed document.** Every homepage section carries a `[ SECTION // NN ]` marker and a plain uppercase name. `//` is the separator of the house dialect.
- **Icons: Iconoir only, semantically matched.** The icon's direction and behaviour must match the action — a download arrow points down into a tray, a navigation arrow points the way the user is going. No Lucide. Never decorative.
- **Ordinary sections are allowed to be ordinary.** Работы, Опыт, Стек, Контакт need no invented framing.

### Do not reproduce

The rejected direction. If any of this reappears in a layout, it is a regression:

- light paper field (`#f1f1ed`, `#e7ece9` and relatives);
- oversized condensed display type (>120px, IBM Plex Sans Condensed and similar);
- 1px hairline boxes drawn around every block;
- the State Lens / `Context → Constraint → Decision → Result` matrix;
- slogans such as "Proof before performance";
- **centred dot separators (`·`) in metadata** — the author dislikes them specifically; use `//`, `/`, or plain spacing;
- uniform grids of equal cards, tag clouds of pills, and an identical label/description rhythm repeated in every section. That symmetry is what reads as AI slop.

### Personal Platform

Do not reuse from Personal Platform:

- Editorial Field Station composition;
- Steppe Signal;
- its grid, archive labels, palette, type pairing, or OG card.

Shared identity allowed:

- ex1te;
- illustrated portrait source;
- real name;
- Kazakhstan context.

No Lucide icons, Unicode arrows, centered-dot metadata, ornamental separators, or generic AI/SaaS portfolio grammar. If icons become necessary, use Iconoir.

## Content and privacy

- Russian is the primary language in v1.
- Case claims must remain evidence-backed.
- Do not expose credentials, personal customer data, or privileged demo access.
- STEAM.KZ captures use synthetic staging data.
- InteractiveLAB remains explicitly pre-launch.
- Placeholder contact data and CV must be replaced before deployment.

## Verification

Before considering a structural change complete:

```bash
bun run verify
```

Then inspect desktop and 390px mobile renders for every affected route.
