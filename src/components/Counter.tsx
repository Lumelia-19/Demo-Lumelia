'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

// Counts up from zero the first time it is seen. The server renders the final
// figure, so the number reads right without JavaScript.
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduced) return;
    if (!inView) {
      setShown(0);
      return;
    }
    const controls = animate(0, value, {
      duration: value > 100 ? 2 : 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
