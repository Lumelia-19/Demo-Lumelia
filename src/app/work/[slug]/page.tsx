import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';

import { Magnetic } from '@/components/Magnetic';
import { PlaceholderCredit, ProductMedia } from '@/components/ProductMedia';
import { Split } from '@/components/Split';
import { productBySlug, products } from '@/content/products';
import { profile } from '@/content/profile';
import { tones } from '@/lib/status';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productBySlug((await params).slug);
  if (!product) return {};
  const title = `${product.name}: case file`;
  return {
    title,
    description: product.summary,
    alternates: { canonical: `/work/${product.slug}/` },
    openGraph: { type: 'article', url: `/work/${product.slug}/`, title, description: product.summary },
  };
}

const d = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;

function Chapter({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-paper-line pt-8 lg:grid-cols-12 lg:gap-10">
      <h2 className="label flex gap-4 text-paper-mist lg:col-span-3">
        <span className="text-paper-ink">§{number}</span>
        {title}
      </h2>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

function Items({ items, redact = false }: { items: string[]; redact?: boolean }) {
  return (
    <ul className="divide-y divide-paper-line border-b border-paper-line">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-2 py-4 text-[17px] sm:text-lg">
          <span className="label pt-1.5 text-paper-mist">{String(index + 1).padStart(2, '0')}</span>
          {redact ? (
            <span data-reveal="declassify" style={d(index * 0.12)}>
              <span className="redact">{item}</span>
            </span>
          ) : (
            <span data-reveal="" style={d(index * 0.06)}>
              {item}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseFile({ params }: Props) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();

  const index = products.indexOf(product);
  const next = products[(index + 1) % products.length];
  const number = String(index + 1).padStart(2, '0');
  const { caseStudy } = product;

  return (
    <article data-chapter={`Case file ${number} — ${product.name}`} className="relative bg-paper text-paper-ink">
      <header className="px-5 pb-16 pt-24 sm:px-10 sm:pt-32">
        <div className="label flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-paper-line pb-4 text-paper-mist">
          <Link href="/#work" data-cursor="Back" className="text-paper-ink hover:underline">
            ← All work
          </Link>
          <span>
            Case file {number} / {String(products.length).padStart(2, '0')}
          </span>
          <span className="flex items-center gap-2 text-paper-ink">
            <span className={`h-1.5 w-1.5 rounded-full ${tones[product.tone].dot}`} />
            {product.status}
          </span>
          <span>{product.kind}</span>
        </div>
        <h1 className="display mt-10 text-[clamp(4rem,14vw,15rem)]">
          <Split parts={[{ t: product.name }]} />
        </h1>
        <p data-reveal="" className="ital mt-4 max-w-[22ch] text-[clamp(1.8rem,3.6vw,3.6rem)] leading-[1.05] text-paper-mist">
          {product.pitch}
        </p>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <p data-reveal="" style={d(0.1)} className="text-[clamp(1.25rem,1.8vw,1.75rem)] leading-snug lg:col-span-7">
            {product.summary}
          </p>
          <dl data-reveal="" style={d(0.2)} className="label grid content-start gap-5 lg:col-span-4 lg:col-start-9">
            <div>
              <dt className="text-paper-mist">Role</dt>
              <dd className="mt-1.5 normal-case tracking-[0.02em]">Sole engineer, from scoping to operations</dd>
            </div>
            <div>
              <dt className="text-paper-mist">Stack</dt>
              <dd className="mt-1.5 normal-case tracking-[0.02em]">{product.stack.join(' · ')}</dd>
            </div>
            <div>
              <dt className="text-paper-mist">Where</dt>
              <dd className="mt-1.5">
                {product.url ? (
                  <a href={product.url.href} target="_blank" rel="noreferrer" data-cursor="Visit" className="underline underline-offset-4">
                    {product.url.label} ↗
                  </a>
                ) : (
                  <span className="normal-case tracking-[0.02em]">Private beta, demo on request</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="bg-ink px-5 py-14 text-bone sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <ProductMedia product={product} priority variant="wide" />
          <PlaceholderCredit media={product.media} />
        </div>
      </div>

      <div className="grid gap-20 px-5 py-24 sm:px-10 sm:py-32">
        <Chapter number="01" title="The problem">
          <p data-reveal="" className="display max-w-[24ch] text-[clamp(2rem,3.6vw,3.6rem)] leading-[1]">
            {caseStudy.context}
          </p>
        </Chapter>
        <Chapter number="02" title="What I built">
          <Items items={caseStudy.built} />
        </Chapter>
        <Chapter number="03" title="Data and security">
          <Items items={caseStudy.data} redact />
        </Chapter>
        <Chapter number="04" title="Running it">
          <Items items={caseStudy.operations} />
        </Chapter>
        <Chapter number="05" title="Outcome">
          <p data-reveal="" className="ital text-[clamp(2.2rem,4.4vw,4.6rem)] leading-[1.02]">
            {caseStudy.outcome}
          </p>
        </Chapter>
      </div>

      <Link
        href={`/work/${next.slug}/`}
        data-cursor="Next"
        className="group block bg-ink px-5 py-20 text-bone sm:px-10 sm:py-28"
      >
        <span className="label text-dim">Next case file</span>
        <span className="mt-6 flex items-end justify-between gap-6">
          <span className="display text-[clamp(3.4rem,11vw,12rem)] transition-colors duration-500 group-hover:text-lumen">
            {next.name}
          </span>
          <span className="display text-[clamp(3rem,8vw,8rem)] transition-transform duration-500 group-hover:translate-x-3">→</span>
        </span>
        <span className="ital mt-3 block text-[clamp(1.4rem,2.4vw,2.4rem)] text-mist">{next.pitch}</span>
      </Link>

      <div className="flex flex-col items-start gap-6 bg-ink px-5 pb-20 sm:px-10">
        <p className="label text-dim">Building something like this?</p>
        <Magnetic strength={0.15}>
          <a href={`mailto:${profile.email}`} data-cursor="Write" className="label rounded-full bg-lumen px-7 py-4 text-ink">
            Write to me →
          </a>
        </Magnetic>
      </div>
    </article>
  );
}
