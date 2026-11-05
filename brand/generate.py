#!/usr/bin/env python3
# Usage: python3 brand/generate.py brand
"""Generate the brand SVG set into brand/. Monoline glyphs, stroke 3, round caps —
the same construction as the >_ chevron in public/favicon.svg."""
import os, sys
OUT = sys.argv[1]
INK, PAPER, ACCENT, ACCENT_LIGHT = '#171717', '#fafafa', '#1d4ed8', '#60a5fa'
STROKE = 'fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"'

def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w*8}" height="{h*8}" role="img" aria-label="{title}">\n'
            f'  <title>{title}</title>\n{body}</svg>\n')

def tile(color=INK, rx=7):
    return f'  <rect width="32" height="32" rx="{rx}" fill="{color}"/>\n'

def caret(x, color, y=19.5):
    return f'  <rect x="{x}" y="{y}" width="7.5" height="3" rx="1" fill="{color}"/>\n'

def path(d, color):
    return f'  <path d="{d}" stroke="{color}" {STROKE}/>\n'

# ---------- lowercase monoline glyphs: baseline 22.5, x-height 13.5 ----------
def g_f(x):  return (f"M{x+3} 22.5V11C{x+3} 8.6 {x+4.6} 7.5 {x+7.5} 7.5M{x} 13.5H{x+7}", 7.5)
def g_e(x):  return (f"M{x} 18H{x+9}A4.5 4.5 0 1 0 {x+7.68} 21.18", 9)
def g_r(x):  return (f"M{x} 22.5V13.5M{x} 17.5C{x} 15 {x+2} 13.5 {x+4.5} 13.5H{x+7}", 7)
def g_a(x):  return (f"M{x+9} 18A4.5 4.5 0 1 0 {x} 18A4.5 4.5 0 1 0 {x+9} 18M{x+9} 13.5V22.5", 9)
def g_m(x):  return (f"M{x} 22.5V13.5M{x} 16.5A3 3 0 0 1 {x+6} 16.5V22.5M{x+6} 16.5A3 3 0 0 1 {x+12} 16.5V22.5", 12)

def word(x0, glyphs, color, gap=5.5):
    d, x = [], x0
    for g in glyphs:
        p, w = g(x); d.append(p); x += w + gap
    return path(''.join(d), color), x - gap   # path, right edge

CHEVRON = "M9.5 10.5 15 16l-5.5 5.5"

def write(name, w, h, body, title):
    with open(os.path.join(OUT, name), 'w') as f: f.write(svg(w, h, body, title))
    print('wrote', name)

# 1) The mark: >_ on a tile (same as favicon)
write('mark.svg', 32, 32, tile() + path(CHEVRON, PAPER) + caret(17, ACCENT_LIGHT), 'febryan.web.id mark')

# 2) F_  — F on a tile with the prompt cursor
F = "M10 22.5V9.5H18.5M10 16H16.5"
write('f.svg', 32, 32, tile() + path(F, PAPER) + caret(19.5, ACCENT_LIGHT), 'F')

# 3) R_  — R on a tile with the prompt cursor
R = "M9.5 22.5V9.5H14.75A3.25 3.25 0 0 1 14.75 16H9.5M14 16 18 22.5"
write('r.svg', 32, 32, tile() + path(R, PAPER) + caret(20.5, ACCENT_LIGHT), 'R')

# 4) FR monogram — an R whose F-part is paper and whose R-completion is accent:
#    read it as "F" + the strokes that turn it into "R"
FR_F = "M10.5 23V9H17M10.5 16H16"
FR_R = "M17 9A3.5 3.5 0 0 1 17 16H16M16 16 21.5 23"
write('fr.svg', 32, 32, tile() + path(FR_F, PAPER) + path(FR_R, ACCENT_LIGHT), 'FR')

# 5) Wordmark: [>_] feram — light (for light backgrounds) and dark
for variant, ink, acc, tile_c, chev_c in [('light', INK, ACCENT, INK, PAPER), ('dark', PAPER, ACCENT_LIGHT, PAPER, INK)]:
    w_path, right = word(44, [g_f, g_e, g_r, g_a, g_m], ink)
    body = tile(tile_c) + path(CHEVRON, chev_c) + caret(17, acc) + w_path
    write(f'feram-wordmark-{variant}.svg', round(right + 2), 32, body, 'feram')

# 6) Prompt lockup: > feram_  (no tile) — light and dark
for variant, ink, acc in [('light', INK, ACCENT), ('dark', PAPER, ACCENT_LIGHT)]:
    chev = path("M3 10.5 8.5 16 3 21.5", acc)
    w_path, right = word(18, [g_f, g_e, g_r, g_a, g_m], ink)
    body = chev + w_path + caret(right + 4.5, acc)
    write(f'feram-prompt-{variant}.svg', round(right + 4.5 + 7.5 + 2), 32, body, 'feram')
