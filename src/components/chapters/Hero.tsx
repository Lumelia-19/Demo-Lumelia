import type { CSSProperties } from 'react';

import { SLOTS } from '@/components/field/shapes';
import { products } from '@/content/products';
import { profile } from '@/content/profile';
import { tones } from '@/lib/status';

import { Magnetic } from '../Magnetic';
import { Scramble } from '../Scramble';
import { Split } from '../Split';

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section
      data-field={SLOTS.mark}
      data-field-alpha="1"
      data-chapter="(00) Zero to one"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col px-5 pb-6 pt-24 sm:px-10 sm:pt-28"
    >
      <div className="flex flex-1 flex-col justify-end pb-10 max-lg:pt-[30vh] lg:justify-center lg:pb-0">
        <p className="label text-mist">
          <Scramble text={`${profile.name} — senior full-stack engineer — Rennes, FR`} start="intro" />
        </p>
        <h1 id="hero-title" className="display mt-6 text-[clamp(3.6rem,8.8vw,10.5rem)] text-bone">
          <Split intro delay={0.1} parts={[{ t: 'Zero to one,', br: true }, { t: 'safely.', c: 'ital text-lumen text-[1.08em]' }]} />
        </h1>
        <p data-reveal="intro" style={delay(0.55)} className="mt-8 max-w-[33rem] text-lg leading-relaxed text-mist sm:text-xl">
          I take products from an empty repository to real users (web, mobile, backend and the data underneath) and I
          treat that data as if an auditor were reading over my shoulder.
        </p>
        <div data-reveal="intro" style={delay(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href="#work" data-cursor="Scroll" className="label inline-flex items-center gap-3 rounded-full bg-lumen px-7 py-4 text-ink">
              See the work ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.cv}
              download
              data-cursor="PDF"
              className="label inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 text-bone transition-colors hover:border-bone"
            >
              Download CV
            </a>
          </Magnetic>
        </div>
      </div>

      <div data-reveal="intro" style={delay(0.85)} className="mt-14 flex items-end justify-between gap-8 border-t border-line pt-5">
        <ul aria-label="Products and their status" className="label grid grid-cols-2 gap-x-8 gap-y-3 lg:flex lg:gap-12">
          {products.map((product) => (
            <li key={product.slug}>
              <a href={`#${product.slug}`} className="group block">
                <span className="flex items-center gap-2 text-bone group-hover:text-lumen">
                  <span className={`pulse h-1.5 w-1.5 rounded-full ${tones[product.tone].dot} ${tones[product.tone].text}`} />
                  {product.name}
                </span>
                <span className="mt-1 block pl-3.5 text-dim">{product.status}</span>
              </a>
            </li>
          ))}
        </ul>
        <span className="label hidden shrink-0 text-dim sm:block">Scroll ↓</span>
      </div>
    </section>
  );
}
