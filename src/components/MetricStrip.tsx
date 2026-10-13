'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { metrics } from '@/content/profile';
import { container } from '@/lib/site';

import { Reveal } from './Reveal';

const format = (value: number) => value.toLocaleString('en-US');

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduced = useReducedMotion();
  // Server HTML carries the final figure, so it reads right without JavaScript.
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduced) return;
    if (!inView) {
      setShown(0);
      return;
    }
    const controls = animate(0, value, {
      duration: value > 100 ? 1.6 : 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(shown)}
      {suffix}
    </span>
  );
}

export function MetricStrip() {
  return (
    <section aria-label="Key figures" className="border-b border-rule bg-elev">
      <dl className={`${container} grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4 lg:py-16`}>
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.08} className="lg:border-l lg:border-rule lg:pl-6 first:lg:border-l-0 first:lg:pl-0">
            <dt className="sr-only">{metric.label}</dt>
            <dd className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              <Counter value={metric.value} suffix={metric.suffix} />
            </dd>
            <dd className="mt-2 max-w-[16rem] text-sm leading-snug text-muted">{metric.label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
