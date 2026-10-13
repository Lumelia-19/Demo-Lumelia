import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Icon, type IconKey } from '@/components/Icon';
import { PlaceholderCredit, ProductMedia } from '@/components/ProductMedia';
import { Reveal } from '@/components/Reveal';
import { StatusBadge } from '@/components/StatusBadge';
import { StackChips } from '@/components/WorkSection';
import { productBySlug, products } from '@/content/products';
import { profile } from '@/content/profile';
import { container } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productBySlug((await params).slug);
  if (!product) return {};
  const title = `${product.name}: case study`;
  return {
    title,
    description: product.summary,
    alternates: { canonical: `/work/${product.slug}/` },
    openGraph: { type: 'article', url: `/work/${product.slug}/`, title, description: product.summary },
  };
}

function Block({ icon, title, items }: { icon: IconKey; title: string; items: string[] }) {
  return (
    <Reveal>
      <section className="border-t border-rule pt-10">
        <h2 className="flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
            <Icon name={icon} className="h-[18px] w-[18px]" />
          </span>
          {title}
        </h2>
        <ul className="mt-6 space-y-3.5">
          {items.map((item) => (
            <li key={item} className="relative pl-6 leading-relaxed text-text">
              <span aria-hidden className="absolute left-1 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();

  const index = products.indexOf(product);
  const next = products[(index + 1) % products.length];
  const { caseStudy } = product;

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className={container}>
        <Reveal>
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <Icon name="arrowLeft" className="h-4 w-4" />
            All work
          </Link>
        </Reveal>

        <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.05} className="lg:col-span-8">
            <StatusBadge tone={product.tone}>{product.status}</StatusBadge>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.03em] text-ink sm:text-7xl">{product.name}</h1>
            <p className="mt-3 text-lg font-medium text-accent">{product.kind}</p>
            <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-text">{product.summary}</p>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4 lg:justify-self-end">
            {product.url ? (
              <a
                href={product.url.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent"
              >
                Visit {product.url.label}
                <Icon name="arrowUpRight" className="h-4 w-4" />
              </a>
            ) : (
              <p className="rounded-full border border-rule px-5 py-3 text-sm text-muted">Private beta · demo on request</p>
            )}
          </Reveal>
        </header>

        <Reveal delay={0.1} y={30} className="mt-14">
          <ProductMedia product={product} priority variant="wide" />
          <PlaceholderCredit media={product.media} />
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <dl className="space-y-7 rounded-3xl border border-rule bg-elev p-6 sm:p-7">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Role</dt>
                  <dd className="mt-1.5 text-ink">Sole engineer, from scoping to operations</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Outcome</dt>
                  <dd className="mt-1.5 text-ink">{caseStudy.outcome}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Stack</dt>
                  <dd className="mt-3">
                    <StackChips items={product.stack} />
                  </dd>
                </div>
              </dl>
            </Reveal>
          </aside>

          <div className="space-y-14 lg:col-span-8">
            <Reveal>
              <section>
                <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-accent">The problem</h2>
                <p className="mt-4 text-pretty font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
                  {caseStudy.context}
                </p>
              </section>
            </Reveal>
            <Block icon="file" title="What I built" items={caseStudy.built} />
            <Block icon="shield" title="Data and security" items={caseStudy.data} />
            <Block icon="chart" title="Running it" items={caseStudy.operations} />
          </div>
        </div>

        <Reveal className="mt-24">
          <Link
            href={`/work/${next.slug}/`}
            className="group flex flex-col gap-4 rounded-3xl border border-rule bg-elev p-7 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between sm:p-9"
          >
            <span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">Next case study</span>
              <span className="mt-2 block font-display text-3xl font-semibold tracking-tight text-ink">{next.name}</span>
              <span className="mt-1 block text-sm text-muted">{next.kind}</span>
            </span>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform group-hover:translate-x-1">
              <Icon name="arrowRight" />
            </span>
          </Link>
        </Reveal>

        <p className="mt-10 text-center text-sm text-muted">
          Building something similar?{' '}
          <a href={`mailto:${profile.email}`} className="font-medium text-accent underline underline-offset-4">
            Write to me
          </a>
          .
        </p>
      </div>
    </article>
  );
}
