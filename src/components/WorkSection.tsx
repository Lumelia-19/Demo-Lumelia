import Link from 'next/link';

import { products, type Product } from '@/content/products';
import { container } from '@/lib/site';

import { Icon } from './Icon';
import { Parallax } from './Parallax';
import { PlaceholderCredit, ProductMedia } from './ProductMedia';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { StatusBadge } from './StatusBadge';

export function StackChips({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="rounded-md border border-rule bg-bg px-2 py-1 font-mono text-[11px] text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <article id={product.slug} aria-labelledby={`${product.slug}-title`} className="scroll-mt-24">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-7 ${flipped ? 'lg:order-2' : ''}`}>
          <Reveal y={28}>
            <Parallax offset={24}>
              <ProductMedia product={product} priority={index === 0} />
            </Parallax>
            <PlaceholderCredit media={product.media} />
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, '0')}</span>
              <StatusBadge tone={product.tone}>{product.status}</StatusBadge>
            </div>
            <h3 id={`${product.slug}-title`} className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-accent">{product.kind}</p>
            <p className="mt-5 text-pretty leading-relaxed text-text">{product.summary}</p>

            <ul className="mt-7 space-y-4">
              {product.highlights.map((highlight) => (
                <li key={highlight.title} className="relative pl-5">
                  <span aria-hidden className="absolute left-0 top-[0.55rem] h-1.5 w-1.5 rounded-full bg-accent" />
                  <p className="font-medium text-ink">{highlight.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{highlight.body}</p>
                </li>
              ))}
            </ul>

            <StackChips items={product.stack} className="mt-7" />

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={`/work/${product.slug}/`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent"
              >
                Read the case study
                <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              {product.url && (
                <a
                  href={product.url.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {product.url.label}
                  <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className={container}>
        <SectionHeading
          eyebrow="Selected work"
          title={<span id="work-title">Four products, from an empty repository to real users.</span>}
          lead="Each one designed, built and run end to end: web and mobile apps, APIs, data, infrastructure and the boring parts that keep users’ data safe."
        />
        <div className="mt-20 space-y-28 sm:mt-24 lg:space-y-40">
          {products.map((product, index) => (
            <ProductRow key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
