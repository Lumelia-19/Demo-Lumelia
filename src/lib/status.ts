import type { Product } from '@/content/products';

// Status colours, shared by the work panels, the hero ticker and case files.
export const tones: Record<Product['tone'], { dot: string; text: string }> = {
  live: { dot: 'bg-emerald-400', text: 'text-emerald-400' },
  testflight: { dot: 'bg-sky-400', text: 'text-sky-400' },
  beta: { dot: 'bg-amber-400', text: 'text-amber-400' },
};
