import Link from 'next/link';

import { container } from '@/lib/site';

export default function NotFound() {
  return (
    <section className={`${container} flex min-h-[70vh] flex-col items-start justify-center pb-24 pt-32`}>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">404</p>
      <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">This page doesn’t exist.</h1>
      <p className="mt-5 text-lg text-muted">The link may be old, or mistyped.</p>
      <Link href="/" className="mt-10 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent">
        Back to the homepage
      </Link>
    </section>
  );
}
