import { experience, stack } from '@/content/experience';
import { container } from '@/lib/site';

import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-32">
      <div className={`${container} grid gap-16 lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Experience" title={<span id="experience-title">Eight years of shipping.</span>} />
          <ol className="relative mt-12 border-l border-rule">
            {experience.map((job, index) => (
              <li key={job.company} className="relative pb-12 pl-8 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full ring-4 ring-bg ${index === 0 ? 'bg-accent' : 'bg-rule'}`}
                />
                <Reveal delay={0.05}>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">{job.dates}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                    {job.role} <span className="text-accent">· {job.company}</span>
                  </h3>
                  <p className="mt-0.5 text-sm text-faint">{job.place}</p>
                  <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted">{job.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-rule bg-elev p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Toolbox</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">What I reach for</h3>
              <dl className="mt-8 space-y-6">
                {stack.map((group) => (
                  <div key={group.group}>
                    <dt className="text-sm font-medium text-ink">{group.group}</dt>
                    <dd className="mt-2.5 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-md border border-rule bg-bg px-2 py-1 font-mono text-[11px] text-muted">
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
