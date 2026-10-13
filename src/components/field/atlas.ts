// The glyphs the field is made of: Latin letters and digits, code punctuation
// and the Arabic alphabet (ArabicPro). One texture, 16 glyphs per row.

const LATIN = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789abdefghkmnpqrstuvwxyz';
const SYMBOLS = '{}[]()<>/\\|#$%&*+=_;:~^@?!';
const ARABIC = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';

export const GLYPHS = [...LATIN, ...SYMBOLS, ...ARABIC];
export const ATLAS_COLS = 16;
export const ATLAS_ROWS = Math.ceil(GLYPHS.length / ATLAS_COLS);

const CELL = 48;
const MONO = '500 30px "JetBrains Mono", ui-monospace, monospace';
const KUFI = '600 27px "Kufi Glyphs", sans-serif';

export async function buildAtlas(): Promise<HTMLCanvasElement> {
  try {
    await Promise.all([document.fonts.load(MONO, LATIN + SYMBOLS), document.fonts.load(KUFI, ARABIC)]);
  } catch {
    // Missing fonts only change the look of the glyphs.
  }

  const canvas = document.createElement('canvas');
  canvas.width = ATLAS_COLS * CELL;
  canvas.height = ATLAS_ROWS * CELL;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  GLYPHS.forEach((glyph, index) => {
    const arabic = ARABIC.includes(glyph);
    ctx.font = arabic ? KUFI : MONO;
    const x = (index % ATLAS_COLS) * CELL + CELL / 2;
    const y = Math.floor(index / ATLAS_COLS) * CELL + CELL / 2 + (arabic ? 3 : 1);
    ctx.fillText(glyph, x, y);
  });
  return canvas;
}
