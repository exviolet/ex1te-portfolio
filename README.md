# ex1te portfolio

Employer-facing portfolio of Бакытжан Избасаров (ex1te), frontend developer. The site is in Russian.

## Stack

```text
Astro 7, static output
TypeScript 6, strict
Custom CSS on design tokens, no CSS framework
Content Collections for case studies
GSAP for four motion signatures, all optional: the page reads fully without JavaScript
Iconoir icons, inlined at build time
```

No client-side framework: there are no `client:*` islands, and the four small scripts on the site only enhance content that already works without them.

## Routes

```text
/                      identity, projects, experience, stack
/work                  case index
/work/steam-kz         role-based SPAs over WordPress, WhatsApp reports
/work/interactivelab   offline React/Capacitor client for school Android panels
/work/sendoff          Linux prompt editor that hands off to terminal agents
/work/tapytap          React Native habit tracker, in development
/about
/contact
/cv.pdf
```

## Commands

```bash
bun install
bun run dev
bun run verify   # astro check + production build + tests against dist/
```

Tests read the built HTML in `dist/`, so run `verify` rather than `test` alone after changing content or markup.

The CV is built separately with [Typst](https://typst.app) from `cv.typ`; build commands are in its header.

## For contributors and agents

`AGENTS.md` is the binding contract: stack, routes, visual and content boundaries. `docs/design/reference-board.md` is the only source of visual direction.
