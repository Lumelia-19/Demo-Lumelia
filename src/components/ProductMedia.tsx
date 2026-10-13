import type { CSSProperties, ReactNode } from 'react';

import type { Media, ScreensMedia } from '@/content/media';
import type { Product } from '@/content/products';

import { LoopVideo } from './LoopVideo';
import { ScreenCycle } from './ScreenCycle';

function BrowserFrame({ address, children }: { address: string; children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-ink-2 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-2.5">
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <div className="label mx-auto min-w-0 max-w-[60%] flex-1 truncate rounded-full bg-white/[0.05] px-3 py-1 text-center text-[10px] normal-case tracking-[0.04em] text-mist">
          {address}
        </div>
        <span aria-hidden className="w-[38px]" />
      </div>
      <div className="relative aspect-[16/10] bg-ink-3">{children}</div>
    </div>
  );
}

// The screenshots already carry their own status bar and camera cut-out.
function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.3rem] border border-white/12 bg-[#0b0c0e] p-[5px] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.95rem] bg-black">{children}</div>
    </div>
  );
}

function PhoneStage({ media }: { media: ScreensMedia }) {
  const back = media.images[2] ?? media.images[1];
  return (
    <div className="relative flex aspect-[4/5] items-center justify-center sm:aspect-[5/4]">
      <div className="relative flex w-full items-center justify-center">
        <Phone className="relative z-10 w-[46%] sm:w-[34%]">
          <ScreenCycle images={media.images} interval={2800} indicators={false} />
        </Phone>
        {back && (
          <Phone className="relative -ml-[9%] mt-[16%] hidden w-[27%] rotate-[7deg] opacity-80 sm:block">
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
    <ul
      aria-label="App screens"
      data-lenis-prevent-wheel
      className="flex snap-x snap-mandatory justify-start gap-5 overflow-x-auto pb-10 pt-2 [scrollbar-width:none] sm:justify-center sm:gap-7"
    >
      {media.images.map((image, index) => (
        <li
          key={image.src}
          data-reveal=""
          style={{ '--d': `${index * 0.08}s` } as CSSProperties}
          className={`w-[56%] shrink-0 snap-center sm:w-[17%] ${index % 2 ? 'sm:translate-y-10' : ''}`}
        >
          <Phone>
            <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover object-top" />
          </Phone>
        </li>
      ))}
    </ul>
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
  const glow = { '--hue': product.hue } as CSSProperties;

  let body: ReactNode;
  if (product.frame === 'phone' && media.kind === 'screens') {
    body = variant === 'wide' ? <PhoneGallery media={media} /> : <PhoneStage media={media} />;
  } else {
    body = (
      <BrowserFrame address={product.url?.label ?? `${product.name.toLowerCase()} · private beta`}>
        {media.kind === 'video' ? (
          <LoopVideo media={media} eager={priority} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <ScreenCycle images={media.images} interval={4200} />
        )}
      </BrowserFrame>
    );
  }

  return (
    <div style={glow} className="relative isolate">
      <div
        aria-hidden
        className="absolute inset-[-12%] -z-10 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--hue)_32%,transparent),transparent)] opacity-70 blur-2xl"
      />
      {body}
    </div>
  );
}

export function PlaceholderCredit({ media, tone = 'ink' }: { media: Media; tone?: 'ink' | 'paper' }) {
  if (media.kind !== 'video' || !media.placeholder) return null;
  return (
    <a
      href={media.placeholder.url}
      target="_blank"
      rel="noreferrer"
      className={`label mt-4 inline-block text-[10px] ${tone === 'paper' ? 'text-paper-mist' : 'text-dim'} hover:underline`}
    >
      {media.placeholder.label} · real capture coming
    </a>
  );
}
