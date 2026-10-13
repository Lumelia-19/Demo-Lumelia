import { Fragment, type CSSProperties } from 'react';

import { SLOTS } from '@/components/field/shapes';
import { principles } from '@/content/expertise';

import { Marquee } from '../Marquee';
import { Scramble } from '../Scramble';

export function Principles() {
  return (
    <section
      id="principles"
      data-field={SLOTS.dust}
      data-field-alpha="0.7"
      data-chapter="(03) Principles"
      aria-labelledby="principles-title"
      className="relative py-[18vh]"
    >
      <p className="label px-5 text-lumen sm:px-10">
        <Scramble text="(03) How I work" />
      </p>
      <h2 id="principles-title" className="sr-only">
        How I work
      </h2>
      <div aria-hidden className="mt-12">
        <Marquee>
          {principles.map((principle, index) => (
            <Fragment key={principle.title}>
              <span
                className={`px-[0.25em] text-[clamp(3.4rem,9vw,9.5rem)] leading-none ${
                  index % 2 ? 'ital text-lumen' : 'display'
                }`}
              >
                {principle.title}
              </span>
              <span className="display px-[0.2em] text-[clamp(3.4rem,9vw,9.5rem)] leading-none text-dim">/</span>
            </Fragment>
          ))}
        </Marquee>
      </div>
      <ol className="mt-20 grid gap-x-10 gap-y-12 px-5 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
        {principles.map((principle, index) => (
          <li key={principle.title} data-reveal="" style={{ '--d': `${index * 0.08}s` } as CSSProperties}>
            <p className="label flex items-center gap-3 text-dim">
              <span className="text-lumen">{String(index + 1).padStart(2, '0')}</span>
              <span className="h-px flex-1 bg-line" />
            </p>
            <h3 className="display mt-6 text-[clamp(1.7rem,2.4vw,2.4rem)] leading-[0.95] text-bone">{principle.title}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-mist">{principle.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
