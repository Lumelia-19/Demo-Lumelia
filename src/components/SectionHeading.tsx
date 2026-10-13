import type { ReactNode } from 'react';

import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = '',
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        <span aria-hidden className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  );
}
