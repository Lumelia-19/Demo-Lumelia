import type { CSSProperties } from 'react';

import { SLOTS } from '@/components/field/shapes';
import { metrics } from '@/content/profile';

import { Counter } from '../Counter';
import { ScrollWords } from '../ScrollWords';

export function Manifesto() {
  return (
    <section
      data-field={SLOTS.galaxy}
      data-field-alpha="0.85"
      data-chapter="(00) Zero to one"
      aria-label="In short"
      className="relative px-5 py-[24vh] sm:px-10"
    >
      <ScrollWords
        className="display max-w-[15ch] text-[clamp(2.6rem,6.4vw,7.4rem)] leading-[0.92]"
        text="Four products. One engineer. Real people on the other side."
      />
      <dl className="mt-[18vh] grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div key={metric.label} data-reveal="" style={{ '--d': `${index * 0.08}s` } as CSSProperties} className="border-t border-line pt-5">
            <dt className="sr-only">{metric.label}</dt>
            <dd className="display text-[clamp(3rem,6vw,6.4rem)] text-bone">
              <Counter value={metric.value} suffix={metric.suffix} />
            </dd>
            <dd className="label mt-4 max-w-[17rem] normal-case tracking-[0.02em] text-mist">{metric.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
