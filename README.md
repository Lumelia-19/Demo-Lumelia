# billel-helali-site

Personal site and interactive CV of Billel Helali: Next.js 16 (App Router), React 19, Tailwind CSS 4 and Motion,
exported as a static site.

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
| `src/content/products.ts` | The four products and their case studies |
| `src/content/expertise.ts` | Sensitive-data cards, standards, working principles |
| `src/content/experience.ts` | Career timeline and toolbox |
| `src/content/media.ts` | Every image and video on the site |
| `public/cv/` | The PDF CV offered for download |

Content mirrors the CV. Only facts verified in the product code or on the live sites belong here; change both
together.

## Media

Raw files go in `media-src/` (ignored by git), web-ready files in `public/media/`. `media.config.json` lists the
jobs; `npm run media` (or `npm run media -- farouk` for one job) turns a clip into a seamless muted loop (MP4 +
WebM + WebP poster) and an image into WebP. It needs `ffmpeg` on the PATH.

Farouk.app, EchoTrust, the hero and the "who I am" block still use Pexels footage. To swap one for a real
capture:

1. drop the recording in `media-src/captures/`;
2. add or edit its job in `media.config.json`, then run `npm run media -- <id>`;
3. point the entry in `src/content/media.ts` at `/media/<id>` and delete its `placeholder` field. The
   "Placeholder footage" captions and the footer credits disappear on their own.

Captures must only show demo data, never a real user's.

## Social card

`src/app/opengraph-image.png` (and its `twitter-image.png` twin) comes from `scripts/og.html`. After editing it:
`npm i --no-save playwright && npx playwright install chromium && npm run og`.

## Deploy

Any static host works. On Vercel, import the repository with the Next.js preset; the static export is detected
from `next.config.ts`.
