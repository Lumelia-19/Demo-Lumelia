// Each particle stores its position in every scene ("slot"). The vertex shader
// blends between two slots, adds drift, the intro burst and the pointer.

export const vertexShader = (glyphCount: number, columns: number) => `#version 300 es
precision highp float;

layout(location = 0) in vec4 aSeed;
layout(location = 1) in float aGlyph;
layout(location = 2) in vec4 aS01;
layout(location = 3) in vec4 aS23;
layout(location = 4) in vec4 aS45;
layout(location = 5) in vec4 aB0123;
layout(location = 6) in vec2 aB45;

uniform vec2 uView;
uniform float uDpr;
uniform float uTime;
uniform float uSlotA;
uniform float uSlotB;
uniform float uT;
uniform vec2 uMouse;
uniform float uMouseOn;
uniform float uSize;
uniform float uIntro;
uniform float uMotion;
uniform vec2 uGalaxy;
uniform float uSpin;

out vec2 vCell;
out float vAlpha;
out float vAccent;

const float COLS = ${columns.toFixed(1)};
const float GLYPHS = ${glyphCount.toFixed(1)};

vec2 slotPos(float i) {
  if (i < 0.5) return aS01.xy;
  if (i < 1.5) return aS01.zw;
  if (i < 2.5) return aS23.xy;
  if (i < 3.5) return aS23.zw;
  if (i < 4.5) return aS45.xy;
  return aS45.zw;
}

float slotBright(float i) {
  if (i < 0.5) return aB0123.x;
  if (i < 1.5) return aB0123.y;
  if (i < 2.5) return aB0123.z;
  if (i < 3.5) return aB0123.w;
  if (i < 4.5) return aB45.x;
  return aB45.y;
}

// Slot 1 is a spiral galaxy that turns slowly.
vec2 spin(vec2 p, float slot) {
  if (abs(slot - 1.0) > 0.5) return p;
  vec2 d = p - uGalaxy;
  d.y /= 0.58;
  float c = cos(uSpin);
  float s = sin(uSpin);
  d = vec2(c * d.x - s * d.y, s * d.x + c * d.y);
  d.y *= 0.58;
  return uGalaxy + d;
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  float start = aSeed.x * 0.4;
  float e = smoothstep(start, start + 0.6, uT);
  vec2 a = spin(slotPos(uSlotA), uSlotA);
  vec2 b = spin(slotPos(uSlotB), uSlotB);
  vec2 p = mix(a, b, e);

  // Travel on an arc rather than a straight line.
  vec2 travel = b - a;
  float len = length(travel);
  if (len > 1.0) {
    p += vec2(-travel.y, travel.x) / len * sin(3.14159265 * e) * (aSeed.y - 0.5) * min(len, 520.0) * 0.55;
  }
  float bright = mix(slotBright(uSlotA), slotBright(uSlotB), e);

  float t = uTime * 0.12;
  vec2 drift = vec2(noise(aSeed.zw * 6.0 + t), noise(aSeed.wz * 6.0 - t)) - 0.5;
  p += drift * (2.0 + 14.0 * aSeed.z * (1.1 - bright)) * uMotion;

  // Intro: particles arrive from a wide burst.
  float k = smoothstep(0.0, 1.0, clamp(uIntro * 1.35 - aSeed.w * 0.35, 0.0, 1.0));
  p = mix((aSeed.yz - 0.5) * uView * 2.2, p, k);

  // The pointer pushes glyphs away and lights them up.
  vec2 m = p - uMouse;
  float dist = length(m);
  float f = (1.0 - smoothstep(0.0, 180.0, dist)) * uMouseOn;
  p += m / max(dist, 1.0) * f * 60.0;

  vAccent = clamp(f * 1.6 + step(0.965, aSeed.y) * 0.9, 0.0, 1.0);
  vAlpha = bright * k;

  vec2 clip = p / (uView * 0.5);
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = uSize * (0.8 + aSeed.z * 0.45) * (1.0 + f * 0.45) * uDpr;

  // A few glyphs keep changing, like text being decoded.
  float flicker = step(0.84, aSeed.w) * uMotion;
  float g = mod(aGlyph + floor(uTime * (0.6 + aSeed.y * 2.4)) * flicker * 17.0, GLYPHS);
  vCell = vec2(mod(g, COLS), floor(g / COLS));
}
`;

export const FRAGMENT_SHADER = `#version 300 es
precision mediump float;

uniform sampler2D uAtlas;
uniform vec2 uGrid;
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uAlpha;

in vec2 vCell;
in float vAlpha;
in float vAccent;
out vec4 outColor;

void main() {
  float a = texture(uAtlas, (vCell + gl_PointCoord) / uGrid).a * vAlpha * uAlpha;
  if (a < 0.004) discard;
  outColor = vec4(mix(uColor, uAccent, vAccent) * a, a);
}
`;
