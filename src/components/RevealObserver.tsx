'use client';

import { useEffect } from 'react';

// Adds .in to [data-reveal] and [data-split] elements the first time they
// scroll into view; globals.css does the animation. Server components only
// need the attribute, and the content stays visible without JavaScript.
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    );
    const scan = () =>
      document.querySelectorAll('[data-reveal]:not(.in), [data-split]:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
