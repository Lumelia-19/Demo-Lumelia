'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

// A dot that replaces the pointer, and a ring that trails it. Over anything
// carrying data-cursor="Label" the ring grows and shows the label.
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    if (!fine.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = (event.target as Element | null)?.closest?.('[data-cursor], a, button, [role="button"]');
      setActive(Boolean(target));
      setLabel(target?.getAttribute('data-cursor') ?? '');
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    const hide = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        x.set(-100);
        y.set(-100);
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    document.addEventListener('mouseout', hide);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      document.removeEventListener('mouseout', hide);
    };
  }, [x, y]);

  if (!enabled) return null;
  const big = active && label;

  return (
    <>
      <motion.div aria-hidden style={{ x: ringX, y: ringY }} className="pointer-events-none fixed left-0 top-0 z-[95]">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out ${
            big
              ? 'h-[84px] w-[84px] border border-lumen bg-lumen text-ink'
              : active
                ? 'h-12 w-12 border border-lumen/80'
                : 'h-8 w-8 border border-bone/35'
          } ${down ? 'scale-90' : ''}`}
        >
          {big && <span className="label text-[10px] font-semibold text-ink">{label}</span>}
        </div>
      </motion.div>
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[96] mix-blend-difference">
        <div className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone ${big ? 'opacity-0' : ''}`} />
      </motion.div>
    </>
  );
}
