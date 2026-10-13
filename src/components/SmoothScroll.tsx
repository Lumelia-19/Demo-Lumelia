'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const getLenis = () => (typeof window === 'undefined' ? undefined : window.__lenis);

/** Scrolls to an in-page anchor, smoothly when Lenis runs. */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else target.scrollIntoView({ behavior: 'smooth' });
  return true;
}

// Inertial scrolling for wheel and trackpad. Touch keeps the native feel and
// visitors who prefer reduced motion keep native scrolling.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, anchors: { duration: 1.6 } });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

  return null;
}
