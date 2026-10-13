'use client';

import { useEffect, useRef, useState } from 'react';

// First visit of a session: counts from 0.00 to 1.00, then lifts. The layout's
// inline script hides it for returning visitors and reduced motion.
export function Preloader() {
  const [state, setState] = useState<'run' | 'out' | 'gone'>('run');
  const value = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains('intro-seen')) {
      html.classList.add('intro-done');
      setState('gone');
      return;
    }
    let raf = 0;
    let timer = 0;
    const start = performance.now();
    const duration = 1700;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      if (value.current) value.current.textContent = eased.toFixed(2);
      if (bar.current) bar.current.style.transform = `scaleX(${eased})`;
      if (p < 1) {
        raf = requestAnimationFrame(step);
        return;
      }
      document.fonts.ready.then(() => {
        try {
          sessionStorage.setItem('bh-intro', '1');
        } catch {
          // Private mode: the intro plays again next time.
        }
        html.classList.add('intro-done');
        setState('out');
        timer = window.setTimeout(() => setState('gone'), 1200);
      });
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  if (state === 'gone') return null;
  return (
    <div aria-hidden className={`preloader ${state === 'out' ? 'is-out' : ''}`}>
      <div className="flex items-baseline gap-[0.18em] text-bone">
        <span ref={value} className="display text-[clamp(5rem,17vw,15rem)] tabular-nums">
          0.00
        </span>
        <span className="ital text-[clamp(2.4rem,7vw,6rem)] text-lumen">→ 1</span>
      </div>
      <div className="mt-8 w-[min(22rem,70vw)]">
        <span className="block h-px w-full bg-line">
          <span ref={bar} className="block h-px w-full origin-left scale-x-0 bg-lumen" />
        </span>
        <p className="label mt-4 flex justify-between text-dim">
          <span>Billel Helali</span>
          <span>Zero to one</span>
        </p>
      </div>
    </div>
  );
}
