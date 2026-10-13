import type { CSSProperties } from 'react';

import { SLOTS } from '@/components/field/shapes';
import { experience, stack } from '@/content/experience';
import { profile } from '@/content/profile';

import { Scramble } from '../Scramble';
import { Split } from '../Split';

// Decorative short hashes so the timeline reads like `git log`.
function hash(text: string) {
  let h = 2166136261;
  for (const char of text) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

const commits = [
  ...experience.map((job, index) => ({
    head: index === 0,
    title: job.role,
    where: job.company,
    dates: job.dates,
    place: job.place,
    body: job.body,
  })),
  {
    head: false,
    title: profile.education.degree,
    where: 'ESIR',
    dates: profile.education.years,
    place: 'Rennes',
    body: `${profile.education.school}. Where it started.`,
  },
];

export function Path() {
  return (
    <section
      id="path"
      data-field={SLOTS.dust}
      data-field-alpha="0.45"
      data-chapter="(04) Path"
      aria-labelledby="path-title"
      className="relative px-5 py-[16vh] sm:px-10"
    >
      <p className="label text-lumen">
        <Scramble text="(04) git log --since=2014" />
      </p>
      <h2 id="path-title" className="display mt-6 text-[clamp(3.2rem,8vw,8.8rem)]">
        <Split parts={[{ t: 'The path' }, { t: 'so far.', c: 'ital text-lumen' }]} />
      </h2>

      <ol className="mt-20 border-t border-line">
        {commits.map((commit, index) => (
          <li
            key={commit.where + commit.dates}
            data-reveal=""
            style={{ '--d': `${index * 0.06}s` } as CSSProperties}
            className="grid gap-4 border-b border-line py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
          >
            <div className="label flex items-center gap-3 lg:col-span-3 lg:items-start">
              <span aria-hidden className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full border ${commit.head ? 'border-lumen bg-lumen' : 'border-mist'}`} />
              <span className="text-lumen">{hash(commit.where + commit.title)}</span>
              {commit.head && <span className="text-dim">(HEAD)</span>}
            </div>
            <div className="lg:col-span-6">
              <h3 className="display text-[clamp(1.8rem,3vw,3rem)] leading-[0.95] text-bone">{commit.title}</h3>
              <p className="ital mt-2 text-[clamp(1.3rem,1.8vw,1.8rem)] text-lumen-2">{commit.where}</p>
              <p className="mt-4 max-w-[40rem] text-[16px] leading-relaxed text-mist">{commit.body}</p>
            </div>
            <div className="label flex gap-6 text-dim lg:col-span-3 lg:flex-col lg:items-end lg:gap-2">
              <span className="text-bone">{commit.dates}</span>
              <span>{commit.place}</span>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-24 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, index) => (
          <div key={group.group} data-reveal="" style={{ '--d': `${(index % 3) * 0.08}s` } as CSSProperties}>
            <p className="label text-lumen">{group.group}</p>
            <p className="mt-3 text-[16px] leading-relaxed text-mist">
              {group.items.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span className="text-dim"> / </span>}
                  <span className="text-bone">{item}</span>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
