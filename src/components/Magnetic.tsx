'use client';

import { motion, useReducedMotion, useSpring } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

// Pulls its content a little towards the pointer.
export function Magnetic({ children, strength = 0.3, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 16, mass: 0.4 });

  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span style={{ x, y }} onPointerMove={move} onPointerLeave={leave} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  );
}
