'use client';

import { useEffect, useRef } from 'react';

import { ATLAS_COLS, ATLAS_ROWS, GLYPHS, buildAtlas } from './atlas';
import { FRAGMENT_SHADER, vertexShader } from './shaders';
import { SLOTS, buildSlots } from './shapes';

// A fixed canvas behind the page. Sections opt in with data-field="<slot>" and
// data-field-alpha="<0..1>"; scrolling from one section to the next morphs the
// glyphs from one scene to the next.

type Section = { el: HTMLElement; slot: number; alpha: number };

const BONE: [number, number, number] = [0.925, 0.906, 0.871];
const LUMEN: [number, number, number] = [1, 0.608, 0.271];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function particleCount(width: number) {
  if (width < 768) return 2400;
  if (width < 1280) return 4200;
  return 5600;
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('createShader failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'compile failed');
  return shader;
}

export function GlyphField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: 'high-performance',
    });
    if (!canvas || !gl) return;

    const program = gl.createProgram();
    try {
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader(GLYPHS.length, ATLAS_COLS)));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link failed');
    } catch (error) {
      console.warn('Glyph field disabled:', error);
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const html = document.documentElement;
    const u = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      view: u('uView'),
      dpr: u('uDpr'),
      time: u('uTime'),
      slotA: u('uSlotA'),
      slotB: u('uSlotB'),
      t: u('uT'),
      mouse: u('uMouse'),
      mouseOn: u('uMouseOn'),
      size: u('uSize'),
      intro: u('uIntro'),
      motion: u('uMotion'),
      galaxy: u('uGalaxy'),
      spin: u('uSpin'),
      atlas: u('uAtlas'),
      grid: u('uGrid'),
      color: u('uColor'),
      accent: u('uAccent'),
      alpha: u('uAlpha'),
    };

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const attribute = (location: number, size: number) => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
      return (data: Float32Array) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      };
    };
    const setSeed = attribute(0, 4);
    const setGlyph = attribute(1, 1);
    const setS01 = attribute(2, 4);
    const setS23 = attribute(3, 4);
    const setS45 = attribute(4, 4);
    const setB0123 = attribute(5, 4);
    const setB45 = attribute(6, 2);

    const texture = gl.createTexture();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let count = 0;
    let galaxy: [number, number] = [0, 0];
    let ready = false;
    let disposed = false;

    const rebuild = () => {
      const n = particleCount(width);
      if (n !== count) {
        count = n;
        const seed = new Float32Array(n * 4);
        for (let i = 0; i < seed.length; i++) seed[i] = Math.random();
        const glyph = new Float32Array(n);
        for (let i = 0; i < n; i++) glyph[i] = Math.floor(Math.random() * GLYPHS.length);
        setSeed(seed);
        setGlyph(glyph);
      }
      const slots = buildSlots(width, height, count);
      galaxy = slots.galaxy;
      const pair = (a: Float32Array, b: Float32Array) => {
        const out = new Float32Array(count * 4);
        for (let i = 0; i < count; i++) {
          out[i * 4] = a[i * 2];
          out[i * 4 + 1] = a[i * 2 + 1];
          out[i * 4 + 2] = b[i * 2];
          out[i * 4 + 3] = b[i * 2 + 1];
        }
        return out;
      };
      setS01(pair(slots.pos[0], slots.pos[1]));
      setS23(pair(slots.pos[2], slots.pos[3]));
      setS45(pair(slots.pos[4], slots.pos[5]));
      const b0123 = new Float32Array(count * 4);
      const b45 = new Float32Array(count * 2);
      for (let i = 0; i < count; i++) {
        for (let s = 0; s < 4; s++) b0123[i * 4 + s] = slots.bright[s][i];
        b45[i * 2] = slots.bright[4][i];
        b45[i * 2 + 1] = slots.bright[5][i];
      }
      setB0123(b0123);
      setB45(b45);
    };

    const resize = (force = false) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      // Mobile browsers resize the viewport while the address bar slides;
      // only a real change of layout is worth rebuilding the scenes.
      if (force || w !== width || Math.abs(h - height) > 140) {
        width = w;
        height = h;
        rebuild();
      }
    };

    let sections: Section[] = [];
    const readSections = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>('[data-field]')).map((el) => ({
        el,
        slot: Number(el.dataset.field ?? SLOTS.dust),
        alpha: Number(el.dataset.fieldAlpha ?? 1),
      }));
    };

    // Position along the page in "section units": 2.4 means 40% of the way
    // from section 2's scene to section 3's.
    const target = () => {
      if (!sections.length) return { s: 0, alpha: 0 };
      const vh = window.innerHeight;
      let index = 0;
      for (let k = 0; k < sections.length; k++) {
        if (sections[k].el.getBoundingClientRect().top <= vh * 0.5) index = k;
      }
      let t = 0;
      if (index < sections.length - 1) {
        t = clamp((vh - sections[index + 1].el.getBoundingClientRect().top) / (vh * 0.5), 0, 1);
      }
      const from = sections[index].alpha;
      const to = sections[Math.min(index + 1, sections.length - 1)].alpha;
      return { s: index + t, alpha: from + (to - from) * t };
    };

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, on: 0, target: 0 };
    const onMove = (event: PointerEvent) => {
      mouse.tx = event.clientX - window.innerWidth / 2;
      mouse.ty = event.clientY - window.innerHeight / 2;
      if (mouse.target === 0) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.target = 1;
    };
    const onLeave = () => {
      mouse.target = 0;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') mouse.target = 0;
    };
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) mouse.target = 0;
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => resize(), 160);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('blur', onLeave);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('resize', onResize);

    let position = 0;
    let alpha = 0;
    let introStart = -1;
    let last = performance.now();
    let frame = 0;
    let sectionCount = 0;
    let cleared = false;
    let raf = 0;

    (async () => {
      const atlas = await buildAtlas();
      try {
        await document.fonts.load('800 100px Bricolage', '0→1BH');
      } catch {
        // The shapes fall back to a system font.
      }
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      resize(true);
      readSections();
      const first = target();
      position = first.s;
      alpha = 0;
      ready = true;
    })();

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!ready || document.hidden) return;

      if (frame++ % 20 === 0) {
        readSections();
        if (sections.length !== sectionCount) {
          sectionCount = sections.length;
          position = target().s;
        }
      }

      const goal = target();
      position += (goal.s - position) * (reduced ? 1 : 1 - Math.pow(0.02, dt));
      alpha += (goal.alpha - alpha) * (1 - Math.pow(0.005, dt));
      mouse.x += (mouse.tx - mouse.x) * (1 - Math.pow(0.0005, dt));
      mouse.y += (mouse.ty - mouse.y) * (1 - Math.pow(0.0005, dt));
      mouse.on += (mouse.target - mouse.on) * (1 - Math.pow(0.02, dt));

      if (introStart < 0 && html.classList.contains('intro-done')) introStart = now;
      const intro = reduced ? 1 : introStart < 0 ? 0 : clamp((now - introStart) / 2400, 0, 1);

      if (alpha < 0.004 || !sections.length) {
        if (!cleared) {
          gl.clear(gl.COLOR_BUFFER_BIT);
          cleared = true;
        }
        return;
      }
      cleared = false;

      const index = clamp(Math.floor(position), 0, sections.length - 1);
      const t = clamp(position - index, 0, 1);
      const slotA = sections[index].slot;
      const slotB = sections[Math.min(index + 1, sections.length - 1)].slot;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.atlas, 0);
      gl.uniform2f(uniforms.grid, ATLAS_COLS, ATLAS_ROWS);
      gl.uniform3f(uniforms.color, ...BONE);
      gl.uniform3f(uniforms.accent, ...LUMEN);
      gl.uniform1f(uniforms.alpha, alpha);
      gl.uniform2f(uniforms.view, window.innerWidth, window.innerHeight);
      gl.uniform1f(uniforms.dpr, dpr);
      gl.uniform1f(uniforms.time, reduced ? 0 : now / 1000);
      gl.uniform1f(uniforms.slotA, slotA);
      gl.uniform1f(uniforms.slotB, slotB);
      gl.uniform1f(uniforms.t, t);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
      gl.uniform1f(uniforms.mouseOn, reduced ? 0 : mouse.on);
      gl.uniform1f(uniforms.size, width >= 1024 ? 11 : 8.5);
      gl.uniform1f(uniforms.intro, intro);
      gl.uniform1f(uniforms.motion, reduced ? 0 : 1);
      gl.uniform2f(uniforms.galaxy, galaxy[0], galaxy[1]);
      gl.uniform1f(uniforms.spin, reduced ? 0 : now / 1000 * 0.035);
      gl.drawArrays(gl.POINTS, 0, count);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
