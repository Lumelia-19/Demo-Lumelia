// Scenes for the glyph field, one per slot. Positions are CSS pixels relative to
// the centre of the viewport (y down). Shapes are rasterised on a tiny canvas
// where one pixel is one glyph cell, which gives the ASCII-art look.

export const SLOTS = {
  mark: 0, // "0→1" in the hero
  galaxy: 1, // the manifesto
  dust: 2, // quiet background
  lock: 3, // security
  initials: 4, // whoami
  one: 5, // contact
} as const;

const SLOT_COUNT = 6;

export type Slots = {
  pos: Float32Array[];
  bright: Float32Array[];
  galaxy: [number, number];
};

type Cloud = { x: number[]; y: number[]; b: number[] };
type Draw = (ctx: CanvasRenderingContext2D) => void;

function random(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rasterize(width: number, height: number, step: number, draw: Draw): Cloud {
  const cols = Math.max(1, Math.ceil(width / step));
  const rows = Math.max(1, Math.ceil(height / step));
  const canvas = document.createElement('canvas');
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const cloud: Cloud = { x: [], y: [], b: [] };
  if (!ctx) return cloud;

  ctx.setTransform(1 / step, 0, 0, 1 / step, width / (2 * step), height / (2 * step));
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  draw(ctx);

  const data = ctx.getImageData(0, 0, cols, rows).data;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const alpha = data[(row * cols + col) * 4 + 3];
      if (alpha < 70) continue;
      cloud.x.push((col + 0.5) * step - width / 2);
      cloud.y.push((row + 0.5) * step - height / 2);
      cloud.b.push(alpha / 255);
    }
  }
  return cloud;
}

// Keeps a shape within the particle budget by coarsening its grid.
function shape(width: number, height: number, step: number, budget: number, draw: Draw): Cloud {
  let cloud = rasterize(width, height, step, draw);
  for (let tries = 0; cloud.x.length > budget && tries < 4; tries++) {
    step *= Math.sqrt(cloud.x.length / budget) * 1.05;
    cloud = rasterize(width, height, step, draw);
  }
  return cloud;
}

function fitText(ctx: CanvasRenderingContext2D, text: string, cx: number, cy: number, boxW: number, boxH: number) {
  const setFont = (size: number) => {
    ctx.font = `800 ${size}px Bricolage, sans-serif`;
    if ('fontStretch' in ctx) ctx.fontStretch = 'condensed';
  };
  setFont(100);
  let metrics = ctx.measureText(text);
  const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || 72;
  setFont(100 * Math.min(boxW / metrics.width, boxH / height));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  metrics = ctx.measureText(text);
  ctx.fillText(text, cx, cy + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2);
}

function drawLock(ctx: CanvasRenderingContext2D, cx: number, cy: number, h: number) {
  const bodyW = h * 0.74;
  const bodyH = h * 0.54;
  const radius = bodyW * 0.3;
  const line = h * 0.1;
  const top = cy - h / 2;
  const bodyTop = top + h - bodyH;
  const arcY = top + line / 2 + radius;

  ctx.lineWidth = line;
  ctx.beginPath();
  ctx.moveTo(cx - radius, bodyTop + line);
  ctx.lineTo(cx - radius, arcY);
  ctx.arc(cx, arcY, radius, Math.PI, 0);
  ctx.lineTo(cx + radius, bodyTop + line);
  ctx.stroke();

  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') ctx.roundRect(cx - bodyW / 2, bodyTop, bodyW, bodyH, h * 0.07);
  else ctx.rect(cx - bodyW / 2, bodyTop, bodyW, bodyH);
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx, bodyTop + bodyH * 0.4, h * 0.065, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - h * 0.03, bodyTop + bodyH * 0.42);
  ctx.lineTo(cx + h * 0.03, bodyTop + bodyH * 0.42);
  ctx.lineTo(cx + h * 0.05, bodyTop + bodyH * 0.76);
  ctx.lineTo(cx - h * 0.05, bodyTop + bodyH * 0.76);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

export function buildSlots(width: number, height: number, count: number): Slots {
  const wide = width >= 1024;
  const step = wide ? 9 : 7;
  const budget = Math.floor(count * 0.55);
  const rand = random(20251013);

  const pos = Array.from({ length: SLOT_COUNT }, () => new Float32Array(count * 2));
  const bright = Array.from({ length: SLOT_COUNT }, () => new Float32Array(count));

  // Every particle has a fixed resting place in the dust, so particles that
  // are not part of a shape stay put while the shape changes.
  const dustX = new Float32Array(count);
  const dustY = new Float32Array(count);
  const dustB = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    dustX[i] = (rand() - 0.5) * width * 1.12;
    dustY[i] = (rand() - 0.5) * height * 1.12;
    dustB[i] = 0.08 + rand() * 0.2;
  }

  const fill = (slot: number, cloud: Cloud, gain: number) => {
    const order = Array.from({ length: cloud.x.length }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    for (let i = 0; i < count; i++) {
      if (i < order.length) {
        const k = order[i];
        pos[slot][i * 2] = cloud.x[k];
        pos[slot][i * 2 + 1] = cloud.y[k];
        bright[slot][i] = gain * (0.45 + 0.55 * cloud.b[k]);
      } else {
        pos[slot][i * 2] = dustX[i];
        pos[slot][i * 2 + 1] = dustY[i];
        bright[slot][i] = dustB[i];
      }
    }
  };

  const at = (wideX: number, wideY: number, narrowX: number, narrowY: number) =>
    wide ? [width * wideX, height * wideY] : [width * narrowX, height * narrowY];

  {
    const [x, y] = at(0.24, -0.02, 0, -0.27);
    const cloud = shape(width, height, step, budget, (ctx) =>
      fitText(ctx, '0→1', x, y, wide ? width * 0.42 : width * 0.84, wide ? height * 0.5 : height * 0.22),
    );
    fill(SLOTS.mark, cloud, wide ? 1 : 0.8);
  }

  {
    const [x, y] = at(0.24, 0.02, 0, -0.25);
    const cloud = shape(width, height, step, budget, (ctx) => drawLock(ctx, x, y, wide ? height * 0.56 : height * 0.3));
    fill(SLOTS.lock, cloud, wide ? 0.95 : 0.7);
  }

  {
    const [x, y] = at(-0.24, 0, 0, -0.27);
    const cloud = shape(width, height, step, budget, (ctx) =>
      fitText(ctx, 'BH', x, y, wide ? width * 0.36 : width * 0.78, wide ? height * 0.5 : height * 0.22),
    );
    fill(SLOTS.initials, cloud, wide ? 0.95 : 0.6);
  }

  {
    const [x, y] = at(0.3, 0, 0.22, -0.18);
    const cloud = shape(width, height, step, budget, (ctx) =>
      fitText(ctx, '1', x, y, wide ? width * 0.3 : width * 0.5, wide ? height * 0.72 : height * 0.42),
    );
    fill(SLOTS.one, cloud, wide ? 0.85 : 0.4);
  }

  for (let i = 0; i < count; i++) {
    pos[SLOTS.dust][i * 2] = dustX[i];
    pos[SLOTS.dust][i * 2 + 1] = dustY[i];
    bright[SLOTS.dust][i] = dustB[i] * 1.6;
  }

  const [gx, gy] = at(0.18, 0.02, 0, -0.08);
  const radius = Math.min(width, height) * (wide ? 0.62 : 0.8);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.pow(rand(), 0.62);
    const depth = r / radius;
    const angle = (i % 3) * ((Math.PI * 2) / 3) + depth * 3.6 + (rand() - 0.5) * (0.35 + 0.5 * (1 - depth));
    pos[SLOTS.galaxy][i * 2] = gx + Math.cos(angle) * r;
    pos[SLOTS.galaxy][i * 2 + 1] = gy + Math.sin(angle) * r * 0.58;
    bright[SLOTS.galaxy][i] = 0.1 + 0.72 * Math.pow(1 - depth, 1.4) + rand() * 0.1;
  }

  return { pos, bright, galaxy: [gx, gy] };
}
