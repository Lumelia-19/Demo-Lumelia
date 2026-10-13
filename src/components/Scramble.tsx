'use client';

import { useEffect, useRef } from 'react';

const POOL = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&*+=<>/{}[]';

// Text that decodes itself from random glyphs. Use it on monospaced labels:
// glyphs of equal width keep the line from jumping while it decodes.
export function Scramble({
  text,
  className,
  delay = 0,
  start = 'view',
}: {
  text: string;
  className?: string;
  delay?: number;
  start?: 'view' | 'intro' | 'mount';
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.setAttribute('data-scrambled', '');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      show();
      return;
    }

    let raf = 0;
    let timer = 0;
    const chars = [...text];
    const run = () => {
      show();
      const duration = Math.min(1500, 380 + chars.length * 26);
      const reveal = chars.map((_, i) => (i / chars.length) * duration * 0.7 + Math.random() * duration * 0.3);
      const t0 = performance.now();
      const tick = (now: number) => {
        const elapsed = now - t0;
        let out = '';
        let done = true;
        for (let i = 0; i < chars.length; i++) {
          if (chars[i] === ' ' || elapsed >= reveal[i]) out += chars[i];
          else {
            done = false;
            out += POOL[Math.floor(Math.random() * POOL.length)];
          }
        }
        el.textContent = out;
        if (!done) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const go = () => {
      timer = window.setTimeout(run, delay * 1000);
    };

    let io: IntersectionObserver | undefined;
    let poll = 0;
    if (start === 'mount') go();
    else if (start === 'intro') {
      const wait = () => {
        if (document.documentElement.classList.contains('intro-done')) go();
        else poll = window.setTimeout(wait, 80);
      };
      wait();
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          go();
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      io.observe(el);
    }
    return () => {
      io?.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(poll);
      el.textContent = text;
    };
  }, [text, delay, start]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden data-scramble="">
        {text}
      </span>
    </span>
  );
}
