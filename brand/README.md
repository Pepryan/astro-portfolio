# Brand marks

Monoline marks built on the same construction as the site's `>_` favicon:
32-unit grid, 3-unit strokes, round caps, the prompt cursor `_` as the accent.
Glyphs are drawn paths (no font needed), so the SVGs render the same everywhere.

| File | Use it for |
| --- | --- |
| `mark.svg` | Primary mark `>_` — favicon, avatars, app icons (also `public/favicon.svg`) |
| `f.svg` | `F_` — tiny spaces where a letter reads better than a symbol |
| `r.svg` | `R_` — same, for "Ryan" contexts |
| `fr.svg` | `FR` monogram — an R whose F-strokes are white and whose R-completion is blue |
| `feram-wordmark-light.svg` / `-dark.svg` | Mark + `feram` lockup, for light / dark backgrounds |
| `feram-prompt-light.svg` / `-dark.svg` | `>feram_` prompt lockup without a tile, for headers and banners |

Colours (from `src/styles/tokens.css`): ink `#171717`, paper `#fafafa`,
accent `#1d4ed8` on light / `#60a5fa` on dark.

Rules of thumb: keep clear space of at least half the tile around a mark,
don't recolour the cursor to anything but the accent, and don't set the
wordmark in a font — use the SVGs.

Regenerate after editing the geometry: `python3 brand/generate.py brand`.
Open `brand/index.html` in a browser to see every mark on light and dark.
