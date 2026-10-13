'use client';

import type { PointerEvent, ReactNode } from 'react';

// A card whose border area lights up under the pointer.
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--x', `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty('--y', `${event.clientY - box.top}px`);
  };

  return (
    <div onPointerMove={onMove} className={`group relative isolate overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(380px circle at var(--x, 50%) var(--y, 50%), var(--glow), transparent 65%)' }}
      />
      {children}
    </div>
  );
}
