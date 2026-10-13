import type { ReactNode } from 'react';

import type { Media, ScreensMedia } from '@/content/media';
import type { Product } from '@/content/products';

import { LoopVideo } from './LoopVideo';
import { Reveal } from './Reveal';
import { ScreenCycle } from './ScreenCycle';

const stage =
  'relative overflow-hidden rounded-3xl border border-rule bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_60%),linear-gradient(160deg,var(--bg-elev),var(--bg))]';

function BrowserFrame({ address, children }: { address: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-rule bg-elev shadow-[0_30px_80px_-30px_rgb(6_40_44/0.45)] dark:shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[60%] flex-1 items-center justify-center gap-1.5 rounded-full bg-bg px-3 py-1 font-mono text-[11px] text-muted">
          <svg aria-hidden viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 1 1 8 0v3" />
          </svg>
          <span className="truncate">{address}</span>
        </div>
        <span aria-hidden className="w-[42px]" />
      </div>
      <div className="relative aspect-[16/10] bg-bg">{children}</div>
    </div>
  );
}

// The screenshots already carry their own status bar and camera cut-out.
function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.4rem] border border-white/10 bg-[#0b1214] p-[6px] shadow-[0_40px_80px_-30px_rgb(6_40_44/0.6)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">{children}</div>
    </div>
  );
}

function PhoneStage({ media }: { media: ScreensMedia }) {
  const back = media.images[2] ?? media.images[1];
  return (
    <div className={`${stage} flex aspect-[4/5] items-center justify-center sm:aspect-[5/4]`}>
      <div aria-hidden className="grid-backdrop absolute inset-0 opacity-60" />
      <div className="relative flex w-full items-center justify-center">
        <Phone className="relative z-10 w-[46%] sm:w-[31%]">
          <ScreenCycle images={media.images} interval={2800} indicators={false} />
        </Phone>
        {back && (
          <Phone className="relative -ml-[9%] mt-[14%] hidden w-[25%] rotate-[7deg] opacity-90 sm:block">
            <img src={back.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
          </Phone>
        )}
      </div>
    </div>
  );
}

// Every screen side by side; scrolls sideways on narrow screens.
function PhoneGallery({ media }: { media: ScreensMedia }) {
  return (
    <div className={stage}>
      <div aria-hidden className="grid-backdrop absolute inset-0 opacity-60" />
      <ul
        aria-label="App screens"
        className="relative flex snap-x snap-mandatory justify-start gap-5 overflow-x-auto px-8 pb-14 pt-10 [scrollbar-width:none] sm:justify-center sm:gap-6 sm:px-10 sm:pb-16 sm:pt-12"
      >
        {media.images.map((image, index) => (
          <li key={image.src} className={`w-[56%] shrink-0 snap-center sm:w-[17%] ${index % 2 ? 'sm:translate-y-8' : ''}`}>
            <Reveal delay={index * 0.07}>
              <Phone>
                <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover object-top" />
              </Phone>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductMedia({
  product,
  priority = false,
  variant = 'compact',
}: {
  product: Product;
  priority?: boolean;
  variant?: 'compact' | 'wide';
}) {
  const { media } = product;

  if (product.frame === 'phone' && media.kind === 'screens') {
    return variant === 'wide' ? <PhoneGallery media={media} /> : <PhoneStage media={media} />;
  }

  return (
    <BrowserFrame address={product.url?.label ?? `${product.name.toLowerCase()} · private beta`}>
      {media.kind === 'video' ? (
        <LoopVideo media={media} eager={priority} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <ScreenCycle images={media.images} interval={4200} />
      )}
    </BrowserFrame>
  );
}

export function PlaceholderCredit({ media }: { media: Media }) {
  if (media.kind !== 'video' || !media.placeholder) return null;
  return (
    <a
      href={media.placeholder.url}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-faint hover:text-muted"
    >
      {media.placeholder.label} · real capture coming
    </a>
  );
}
