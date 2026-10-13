import { media } from '@/content/media';
import { about, profile } from '@/content/profile';
import { container } from '@/lib/site';

import { Icon } from './Icon';
import { LoopVideo } from './LoopVideo';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function AboutSection() {
  const facts = [
    { label: 'Based in', value: `${profile.location} · ${profile.timezone}` },
    { label: 'Languages', value: profile.languages.map((language) => `${language.name} (${language.level})`).join(' · ') },
    { label: 'Education', value: `${profile.education.degree}, ${profile.education.school}, ${profile.education.years}` },
    { label: 'Looking for', value: profile.availability },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-rule bg-elev py-24 sm:py-32">
      <div className={`${container} grid items-start gap-14 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <Reveal y={28}>
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-rule bg-bg">
                <LoopVideo media={media.about} className="absolute inset-0 h-full w-full object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#061316]/85 via-transparent to-transparent" />
                {/* Swap this card for media-src/billel/portrait.jpg once it lands. */}
                <figcaption className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#061316]/60 p-4 text-white backdrop-blur-md">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-semibold">
                    {profile.initials}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight">{profile.name}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-sm text-white/70">
                      <Icon name="pin" className="h-3.5 w-3.5" />
                      {profile.location}
                    </span>
                  </span>
                </figcaption>
              </div>
              {media.about.placeholder && (
                <a
                  href={media.about.placeholder.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-faint hover:text-muted"
                >
                  {media.about.placeholder.label}
                </a>
              )}
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Who I am" title={<span id="about-title">One engineer who owns the whole product.</span>} />
          <div className="mt-8 space-y-5">
            {about.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.06}>
                <p className="text-pretty text-lg leading-relaxed text-text">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{fact.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
