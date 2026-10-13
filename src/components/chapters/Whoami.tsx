import type { CSSProperties } from 'react';

import { SLOTS } from '@/components/field/shapes';
import { about, profile } from '@/content/profile';

import { Scramble } from '../Scramble';
import { Split } from '../Split';

export function Whoami() {
  const facts = [
    { label: 'Based in', value: `${profile.location} · ${profile.timezone}` },
    { label: 'Speaks', value: profile.languages.map((language) => `${language.name}, ${language.level}`).join(' · ') },
    { label: 'Trained at', value: `${profile.education.school}, ${profile.education.years}` },
    { label: 'Looking for', value: profile.availability },
  ];

  return (
    <section
      id="whoami"
      data-field={SLOTS.initials}
      data-field-alpha="1"
      data-chapter="(05) Whoami"
      aria-labelledby="whoami-title"
      className="relative grid min-h-svh items-center px-5 py-[16vh] max-lg:pt-[42vh] sm:px-10 lg:grid-cols-2"
    >
      <p className="label pointer-events-none absolute bottom-[12vh] left-10 hidden text-dim lg:block">
        Fig. 01 — The author, in glyphs
      </p>
      <div className="lg:col-start-2">
        <p className="label text-lumen">
          <Scramble text="(05) whoami" />
        </p>
        <h2 id="whoami-title" className="display mt-6 text-[clamp(3rem,6.6vw,7.4rem)]">
          <Split parts={[{ t: 'One engineer,', br: true }, { t: 'the whole product.', c: 'ital text-lumen' }]} />
        </h2>
        <div className="mt-10 space-y-5">
          {about.map((paragraph, index) => (
            <p key={index} data-reveal="" style={{ '--d': `${index * 0.08}s` } as CSSProperties} className="max-w-[36rem] text-lg leading-relaxed text-mist">
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label} data-reveal="">
              <dt className="label text-dim">{fact.label}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-bone">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
