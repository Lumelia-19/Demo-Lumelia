import Link from 'next/link';

import { media } from '@/content/media';
import { products } from '@/content/products';
import { profile } from '@/content/profile';
import { container } from '@/lib/site';

import { Icon } from './Icon';
import { LoopVideo } from './LoopVideo';
import { Reveal } from './Reveal';
import { StatusDot } from './StatusBadge';

// The opening screen is always dark: it sits on a moving network backdrop.
export function Hero() {
  return (
    <section data-theme="dark" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-bg text-text">
      <LoopVideo media={media.hero} eager className="absolute inset-0 -z-30 h-full w-full object-cover opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_20%_35%,rgb(6_19_22/0.35),rgb(6_19_22/0.9)_60%),linear-gradient(to_bottom,rgb(6_19_22/0.55),rgb(6_19_22/0.2)_40%,var(--bg))]"
      />
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 opacity-30" />

      <div className={`${container} flex flex-1 flex-col justify-center pb-10 pt-28 sm:pt-32`}>
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-text backdrop-blur">
            <StatusDot tone="live" />
            {profile.availability}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            id="hero-title"
            className="mt-7 max-w-4xl text-balance font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[5.2rem]"
          >
            I build <span className="text-accent-strong">0→1</span> products people trust with their data.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-text sm:text-xl">
            {profile.name}, senior full-stack engineer based in {profile.location}. Next.js, React Native, Node/TypeScript
            and PostgreSQL. Four products taken from an empty repository to real users, including an AI job-search
            assistant used by <strong className="font-semibold text-ink">2,000+ people</strong>.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-[#03201d] transition-colors hover:bg-accent-strong"
            >
              See the work
              <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-[15px] font-medium text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent-strong"
            >
              <Icon name="download" className="h-4 w-4" />
              Download CV
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-3 py-3.5 text-[15px] font-medium text-muted transition-colors hover:text-ink"
            >
              Get in touch
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      <div className={`${container} pb-8`}>
        <Reveal delay={0.32}>
          <div className="flex flex-col gap-5 border-t border-white/10 pt-6 lg:flex-row lg:items-end lg:justify-between">
            <ul aria-label="Products and their status" className="grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-4 lg:gap-x-12">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`#${product.slug}`} className="group block">
                    <span className="flex items-center gap-2.5 text-sm font-medium text-ink transition-colors group-hover:text-accent-strong">
                      <StatusDot tone={product.tone} />
                      {product.name}
                    </span>
                    <span className="mt-1 block pl-[18px] text-[13px] text-muted">{product.status}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {media.hero.placeholder && (
              <a
                href={media.hero.placeholder.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-faint hover:text-muted"
              >
                {media.hero.placeholder.label}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
