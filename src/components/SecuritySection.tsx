import { principles, sensitiveData, standards } from '@/content/expertise';
import { container } from '@/lib/site';

import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Spotlight } from './Spotlight';

export function SecuritySection() {
  return (
    <section id="security" aria-labelledby="security-title" className="relative overflow-hidden border-y border-rule bg-elev py-24 sm:py-32">
      <div aria-hidden className="grid-backdrop absolute inset-0 opacity-50" />
      <div className={`${container} relative`}>
        <SectionHeading
          eyebrow="Security & privacy"
          title={<span id="security-title">Sensitive data, handled in production.</span>}
          lead="Financial records, mailboxes and CVs, documents, children’s voices. The controls below run in shipped products today, not in a slide deck."
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sensitiveData.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 3) * 0.07} className="h-full">
                <Spotlight className="h-full rounded-2xl border border-rule bg-bg/70 p-6 backdrop-blur transition-colors hover:border-accent/40">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon name={item.icon} className="h-[22px] w-[22px]" />
                    </span>
                    <span className="mt-1 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{item.where}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </Spotlight>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10">
          <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-rule p-5 sm:flex-row sm:items-center">
            <p className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              <Icon name="shield" className="h-4 w-4" />
              Practised daily
            </p>
            <ul className="flex flex-wrap gap-2">
              {standards.map((standard) => (
                <li key={standard} className="rounded-full border border-rule bg-bg px-3 py-1 text-sm text-text">
                  {standard}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-24">
          <SectionHeading eyebrow="How I work" title="Four habits that keep a young product trustworthy." />
          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <Reveal delay={index * 0.07}>
                  <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <div className="mt-3 h-px w-full bg-rule" />
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{principle.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
