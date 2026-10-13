'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { SLOTS } from '@/components/field/shapes';
import type { Product } from '@/content/products';
import { tones } from '@/lib/status';

import { Magnetic } from '../Magnetic';
import { PlaceholderCredit, ProductMedia } from '../ProductMedia';
import { Scramble } from '../Scramble';
import { Split } from '../Split';


function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (min-height: 620px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setWide(query.matches && !reduced.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return wide;
}

function Intro({ total }: { total: number }) {
  return (
    <div className="flex h-full w-full flex-col justify-center lg:w-[62vw]">
      <p className="label text-lumen">
        <Scramble text={`(01) Selected work — ${total} products`} />
      </p>
      <h2 className="display mt-6 text-[clamp(3.4rem,9vw,10rem)]">
        <Split parts={[{ t: 'Shipped,', br: true }, { t: 'not pitched.', c: 'ital text-lumen' }]} />
      </h2>
      <p data-reveal="" className="mt-8 max-w-[30rem] text-lg text-mist">
        Four products taken from an empty repository to real people, each one designed, built and run end to end.
      </p>
      <p data-reveal="" className="label mt-12 hidden text-dim lg:block">
        Keep scrolling →
      </p>
    </div>
  );
}

function Panel({ product, index, total }: { product: Product; index: number; total: number }) {
  const number = String(index + 1).padStart(2, '0');
  return (
    <article
      id={product.slug}
      aria-labelledby={`${product.slug}-name`}
      className="grid w-full items-center gap-10 py-16 lg:h-full lg:w-[100vw] lg:shrink-0 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-0"
    >
      <div className="order-2 lg:order-1 lg:col-span-5">
        <div className="label flex items-center gap-4 text-dim">
          <span className="text-bone">{number}</span>
          <span className="h-px w-10 bg-line" />
          <span>{String(total).padStart(2, '0')}</span>
          <span className={`ml-2 flex items-center gap-2 ${tones[product.tone].text}`}>
            <span className={`pulse h-1.5 w-1.5 rounded-full ${tones[product.tone].dot}`} />
            {product.status}
          </span>
        </div>
        <h3 id={`${product.slug}-name`} className="display mt-6 text-[clamp(3rem,6.4vw,7.2rem)]">
          <Split parts={[{ t: product.name }]} />
        </h3>
        <p data-reveal="" className="ital mt-3 text-[clamp(1.5rem,2.2vw,2.3rem)] leading-tight text-lumen-2">
          {product.pitch}
        </p>
        <p data-reveal="" style={{ '--d': '0.1s' } as CSSProperties} className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-mist">
          {product.summary}
        </p>
        <ul data-reveal="" style={{ '--d': '0.18s' } as CSSProperties} className="label mt-8 space-y-2.5 text-bone">
          {product.facts.map((fact) => (
            <li key={fact} className="flex gap-3">
              <span className="text-lumen">+</span>
              {fact}
            </li>
          ))}
        </ul>
        <div data-reveal="" style={{ '--d': '0.26s' } as CSSProperties} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Magnetic>
            <Link
              href={`/work/${product.slug}/`}
              data-cursor="Open"
              className="label inline-flex items-center gap-3 rounded-full bg-bone px-6 py-4 text-ink transition-colors hover:bg-lumen"
            >
              Open the case file →
            </Link>
          </Magnetic>
          {product.url && (
            <a
              href={product.url.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="label text-mist underline decoration-line underline-offset-8 hover:text-bone hover:decoration-lumen"
            >
              {product.url.label} ↗
            </a>
          )}
        </div>
      </div>
      <div className="order-1 lg:order-2 lg:col-span-7">
        <Link href={`/work/${product.slug}/`} data-cursor="Case file" aria-label={`${product.name} case study`} className="block">
          <ProductMedia product={product} priority={index === 0} />
        </Link>
        <PlaceholderCredit media={product.media} />
      </div>
    </article>
  );
}

function Progress({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const scaleX = useTransform(progress, [0.08, 1], [0, 1]);
  return (
    <div className="label pointer-events-none absolute inset-x-10 bottom-8 flex items-center gap-5 text-dim">
      <span>Work</span>
      <span className="relative h-px flex-1 bg-line">
        <motion.span style={{ scaleX }} className="absolute inset-0 origin-left bg-lumen" />
      </span>
      <span>{String(total).padStart(2, '0')} products</span>
    </div>
  );
}

// Desktop: a pinned track that slides sideways as the page scrolls down.
// Narrow screens and reduced motion: the same panels, stacked.
export function WorkGallery({ products }: { products: Product[] }) {
  const ref = useRef<HTMLElement>(null);
  const wide = useWide();
  const panels = products.length + 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => `${-v * (panels - 1) * 100}vw`);

  return (
    <section
      ref={ref}
      id="work"
      data-field={SLOTS.dust}
      data-field-alpha="0.4"
      data-chapter="(01) Work"
      aria-label="Selected work"
      className="relative"
      style={wide ? { height: `${panels * 100}vh` } : undefined}
    >
      {wide ? (
        <div className="sticky top-0 h-svh overflow-hidden">
          <motion.div style={{ x }} className="flex h-full w-max">
            <div className="flex h-full w-[100vw] shrink-0 items-center px-10">
              <Intro total={products.length} />
            </div>
            {products.map((product, index) => (
              <Panel key={product.slug} product={product} index={index} total={products.length} />
            ))}
          </motion.div>
          <Progress progress={scrollYProgress} total={products.length} />
        </div>
      ) : (
        <div className="px-5 py-[16vh] sm:px-10">
          <Intro total={products.length} />
          <div className="mt-10 divide-y divide-line">
            {products.map((product, index) => (
              <Panel key={product.slug} product={product} index={index} total={products.length} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
