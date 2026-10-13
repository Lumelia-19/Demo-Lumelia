# billel-helali-site

Personal site and interactive CV of Billel Helali: Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion and
Lenis, exported as a static site. The backdrop is a WebGL2 field of glyphs that keeps re-forming as you scroll:
noise becoming signal, the idea behind "zero to one, safely".

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static export in out/
npm start          # serves out/ locally
```

Node 20.9 or later. `npm run build` needs no environment variables; set `NEXT_PUBLIC_SITE_URL` to the final
domain so canonical links, the sitemap and social cards point at it.

## Where things live

| Path | What |
| --- | --- |
| `src/content/profile.ts` | Name, contact, headline figures, "who I am" |
| `src/content/products.ts` | The four products: pitch, facts, colour and case file |
| `src/content/expertise.ts` | Sensitive-data files, standards, working principles |
| `src/content/experience.ts` | Career timeline and toolbox |
| `src/content/media.ts` | Every image and video on the site |
| `src/components/chapters/` | One file per chapter of the home page, plus the two dossier demos |
| `src/components/field/` | The glyph field: atlas, shaders, formations |
| `public/cv/` | The PDF CV offered for download |
| `public/fonts/` | Self-hosted, subset fonts |

Content mirrors the CV. Only facts verified in the product code or on the live sites belong here; change both
together.

## The glyph field

`GlyphField` draws a few thousand characters (Latin, digits, code symbols and Arabic letters) on one canvas behind
the page. Every chapter tells it which formation to take:

```tsx
<section data-field={SLOTS.lock} data-field-alpha="0.6">
```

The field morphs from one formation to the next while the following chapter scrolls in, and `data-field-alpha`
sets how visible it is (0 hides it, for the paper pages). The six formations live in `field/shapes.ts`: the
"0→1" mark, the galaxy, scattered dust, the padlock, the "BH" initials and the final "1". A formation is whatever
a `draw` callback paints on a canvas (each opaque cell becomes a glyph), so any text or drawing can become one;
keep their number at six or change the attribute layout in `GlyphField.tsx` and `shaders.ts` together.

The pointer pushes glyphs aside and lights some of them up. With `prefers-reduced-motion`, the field holds still,
formations switch without travelling and the preloader is skipped. Without WebGL2 the page simply has no field.

## Motion

- `RevealObserver` adds `.in` to anything carrying `data-reveal` or `data-split` once it is on screen; the
  transitions themselves are CSS (`globals.css`), so the text is in the HTML from the start.
- `data-reveal="declassify"` with an inner `.redact` span renders text under per-line black bars that lift once
  seen (security dossier, §03 of each case file).
- `Scramble` decodes mono labels, `Split` raises headline words, `ScrollWords` lights words with the scroll,
  `Marquee` speeds up with scroll velocity.
- The preloader counts 0.00 to 1.00 once per tab session (`sessionStorage`), then the hero forms.
- The custom cursor and magnetic buttons only exist for a fine pointer; touch screens keep the native behaviour.

## Media

Raw files go in `media-src/` (ignored by git), web-ready files in `public/media/`. `media.config.json` lists the
jobs; `npm run media` (or `npm run media -- farouk` for one job) turns a clip into a seamless muted loop (MP4 +
WebM + WebP poster) and an image into WebP. It needs `ffmpeg` on the PATH.

Farouk.app and EchoTrust still use Pexels footage. To swap one for a real capture:

1. drop the recording in `media-src/captures/`;
2. add or edit its job in `media.config.json`, then run `npm run media -- <id>`;
3. point the entry in `src/content/media.ts` at `/media/<id>` and delete its `placeholder` field. The
   "Placeholder footage" captions and the footer credits disappear on their own.

Captures must only show demo data, never a real user's.

## Fonts

All under the SIL Open Font License, subset and served from `public/fonts/`: Bricolage Grotesque (display and
body), Instrument Serif italic (accents), JetBrains Mono (labels), and the Arabic letters of Noto Kufi Arabic for
the glyph field. The `-arrows` files only carry the arrow glyphs, loaded through `unicode-range`.

## Social card

`src/app/opengraph-image.png` (and its `twitter-image.png` twin) comes from `scripts/og.html`, which draws the
"0→1" glyph mark on a canvas. After editing it:
`npm i --no-save playwright && npx playwright install chromium && npm run og`.

## Deploy

Any static host works. On Vercel, import the repository with the Next.js preset; the static export is detected
from `next.config.ts`.
