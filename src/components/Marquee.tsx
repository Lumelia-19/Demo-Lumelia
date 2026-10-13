'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { useRef, type ReactNode } from 'react';

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

// An endless band that drifts on its own and speeds up with the scroll.
export function Marquee({ children, speed = 2.4 }: { children: ReactNode; speed?: number }) {
  const reduced = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const factor = boost.get();
    if (factor < 0) direction.current = 1;
    else if (factor > 0) direction.current = -1;
    let move = direction.current * speed * (delta / 1000);
    move += move * Math.abs(factor);
    base.set(base.get() + move);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div aria-hidden className="flex shrink-0">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
