"""Link-preview cards (og:image) for Telegram, WhatsApp, LinkedIn and the rest.

One card for the site and one per case, 1200x630, written to public/og/.
Every line of text is converted to outlines from the fonts in fonts/, shaped
by HarfBuzz, so the PNG looks the same whatever fonts the machine has.

Rerun after changing a case's title, summary or context, or adding a case:

    python -m venv .venv-og && .venv-og/bin/pip install fonttools uharfbuzz
    .venv-og/bin/python scripts/og-cards.py

Needs ImageMagick (`magick`) to rasterise. tests/site.test.mjs checks that
every published case has its card.
"""

import re
import subprocess
import sys
import tempfile
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"
SITE = "bakytzhan.pages.dev"

# tokens.css, dark theme: the site opens dark.
BG, INK, BODY, MUTED, ACCENT = "#0e0e10", "#f2f2ef", "#b6b7bf", "#8a8a92", "#5ee6a8"
W, H, PAD = 1200, 630, 72


class Face:
    """One weight of a variable font: HarfBuzz shapes, fontTools draws."""

    def __init__(self, file: str, weight: int):
        path = ROOT / "fonts" / file
        blob = hb.Blob.from_file_path(str(path))
        self.hb = hb.Font(hb.Face(blob))
        self.hb.set_variations({"wght": weight})
        tt = instantiateVariableFont(TTFont(path), {"wght": weight})
        self.glyphs = tt.getGlyphSet()
        self.order = tt.getGlyphOrder()
        self.upem = tt["head"].unitsPerEm

    def shape(self, text: str, size: float, tracking: float = 0):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb, buf, {"kern": True, "liga": True})
        scale = size / self.upem
        run, x = [], 0.0
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            run.append((self.order[info.codepoint], x + pos.x_offset * scale))
            x += pos.x_advance * scale + tracking
        return run, x - tracking, scale

    def width(self, text: str, size: float, tracking: float = 0) -> float:
        return self.shape(text, size, tracking)[1]

    def path(self, text: str, size: float, x: float, baseline: float, fill: str, tracking: float = 0) -> str:
        run, _, scale = self.shape(text, size, tracking)
        parts = []
        for name, gx in run:
            pen = SVGPathPen(self.glyphs, lambda v: f"{v:.1f}")
            self.glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x + gx, baseline)))
            if pen.getCommands():
                parts.append(pen.getCommands())
        return f'<path fill="{fill}" d="{" ".join(parts)}"/>'


MONO = Face("JetBrainsMono[wght].ttf", 500)
DISPLAY = Face("Unbounded[wght].ttf", 600)
TEXT = Face("Onest[wght].ttf", 400)


def wrap(face: Face, text: str, size: float, width: float, max_lines: int) -> list[str]:
    # Prepositions and other one- or two-letter words never end a line: they
    # travel with the next word, as Russian typesetting expects.
    words = []
    for word in text.split():
        if words and len(words[-1]) <= 2 and words[-1].isalpha():
            words[-1] += " " + word
        else:
            words.append(word)
    lines, line = [], ""
    for word in words:
        trial = f"{line} {word}".strip()
        if line and face.width(trial, size) > width:
            lines.append(line)
            line = word
        else:
            line = trial
    lines.append(line)
    if len(lines) > max_lines:
        lines = lines[:max_lines]
        while face.width(lines[-1] + "…", size) > width:
            lines[-1] = lines[-1].rsplit(" ", 1)[0]
        lines[-1] = lines[-1].rstrip(",—–-:; ") + "…"
    return lines


def fit(face: Face, text: str, size: float, width: float) -> float:
    """Largest size up to `size` at which `text` fits on one line."""
    return min(size, size * width / face.width(text, size))


def frame(body: list[str], path: str) -> str:
    """The parts every card shares: the wordmark on top, the URL at the bottom."""
    top = MONO.path("[ BAKYTZHAN IZBASSAROV ]", 22, PAD, PAD + 16, INK, tracking=2.2)
    slash = MONO.path("//", 24, PAD, H - PAD, ACCENT)
    url = MONO.path(f"{SITE}{path}", 24, PAD + MONO.width("// ", 24), H - PAD, MUTED)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
        f'<rect width="{W}" height="{H}" fill="{BG}"/>{top}{"".join(body)}{slash}{url}</svg>'
    )


def case_card(title: str, summary: str, context: str, slug: str) -> str:
    inner = W - 2 * PAD
    kicker = MONO.path(f"[ {context} ]", 24, PAD, 214, MUTED)
    size = fit(DISPLAY, title, 92, inner)
    heading = DISPLAY.path(title, size, PAD - size * 0.04, 214 + 36 + size * 0.9, INK)
    top = 214 + 36 + size * 0.9 + 64
    # Three lines at 33px; a longer summary gets a fourth line at 30px rather
    # than an ellipsis.
    size, leading = 33, 44
    if len(wrap(TEXT, summary, size, inner - 40, 99)) > 3:
        size, leading = 30, 40
    lines = wrap(TEXT, summary, size, inner - 40, 4)
    text = [TEXT.path(line, size, PAD, top + i * leading, BODY) for i, line in enumerate(lines)]
    return frame([kicker, heading, *text], f"/work/{slug}")


def home_card(first: str, last: str, role: str) -> str:
    size = 104
    one = DISPLAY.path(first, size, PAD - 4, 268, INK)
    two = DISPLAY.path(last, size, PAD - 4, 268 + size * 1.08, ACCENT)
    sub = TEXT.path(role, 34, PAD, 268 + size * 1.08 + 76, BODY)
    return frame([one, two, sub], "")


def field(source: str, key: str) -> str:
    match = re.search(rf"^{key}: (.+)$", source, re.M)
    if not match:
        sys.exit(f"no `{key}:` in frontmatter")
    # Frontmatter lines are bare; site.ts lines end in `',`.
    return match.group(1).strip().rstrip(",").strip("'\"")


def render(svg: str, name: str):
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", suffix=".svg") as tmp:
        tmp.write(svg)
        tmp.flush()
        subprocess.run(["magick", "-background", "none", tmp.name, "-strip", str(OUT / f"{name}.png")], check=True)
    print(f"public/og/{name}.png")


def main():
    site = (ROOT / "src" / "data" / "site.ts").read_text()
    first, last = field(site, "  name").split(" ", 1)
    render(home_card(first, last, f"{field(site, '  role')} // React, TypeScript"), "home")

    for md in sorted((ROOT / "src" / "content" / "work").glob("*.md")):
        source = md.read_text().split("---", 2)[1]
        if field_or(source, "published", "true") == "false":
            continue
        render(case_card(field(source, "title"), field(source, "summary"), field(source, "context"), md.stem), md.stem)


def field_or(source: str, key: str, default: str) -> str:
    match = re.search(rf"^{key}: (.+)$", source, re.M)
    return match.group(1).strip() if match else default


if __name__ == "__main__":
    main()
