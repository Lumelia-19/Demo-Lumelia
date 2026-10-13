import type { Product } from '@/content/products';

const tones: Record<Product['tone'], { dot: string; text: string; ring: string; pulse: boolean }> = {
  live: { dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300', ring: 'border-emerald-500/30 bg-emerald-500/10', pulse: true },
  testflight: { dot: 'bg-sky-500', text: 'text-sky-700 dark:text-sky-300', ring: 'border-sky-500/30 bg-sky-500/10', pulse: false },
  beta: { dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300', ring: 'border-amber-500/30 bg-amber-500/10', pulse: false },
};

export function StatusDot({ tone }: { tone: Product['tone'] }) {
  const style = tones[tone];
  return <span aria-hidden className={`inline-block h-2 w-2 shrink-0 rounded-full ${style.dot} ${style.pulse ? 'live-dot' : ''}`} />;
}

export function StatusBadge({ tone, children }: { tone: Product['tone']; children: string }) {
  const style = tones[tone];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] ${style.ring} ${style.text}`}>
      <StatusDot tone={tone} />
      {children}
    </span>
  );
}
