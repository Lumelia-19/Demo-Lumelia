import { profile } from '@/content/profile';
import { container } from '@/lib/site';

import { CopyEmail } from './CopyEmail';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

export function ContactSection() {
  const links = [
    { href: profile.links.linkedin, label: 'LinkedIn', icon: 'linkedin' as const },
    { href: profile.links.github, label: 'GitHub', icon: 'github' as const },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" data-theme="dark" className="relative isolate overflow-hidden bg-bg py-28 text-text sm:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,var(--glow),transparent_60%)]" />
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 opacity-40" />
      <div className={`${container} text-center`}>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Contact</p>
          <h2 id="contact-title" className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Need a first version real users can trust?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            Tell me what you are building, who it is for and what data it will hold.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-[#03201d] transition-colors hover:bg-accent-strong sm:text-lg"
            >
              <Icon name="mail" className="h-5 w-5" />
              {profile.email}
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-strong"
                >
                  <Icon name={link.icon} className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-strong"
              >
                <Icon name="download" className="h-4 w-4" />
                CV (PDF)
              </a>
            </li>
          </ul>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-faint">
            {profile.location} · {profile.timezone} · remote-first
          </p>
        </Reveal>
      </div>
    </section>
  );
}
