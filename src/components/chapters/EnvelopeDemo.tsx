import type { CSSProperties } from 'react';

// Doksima's envelope encryption, peeled layer by layer: EU storage, the master
// key, the organisation key, and finally the document.
const layer = (delay: number) => ({ '--d': `${delay}s` }) as CSSProperties;

export function EnvelopeDemo() {
  return (
    <div className="overflow-hidden rounded-[14px] bg-paper-ink p-5 text-bone">
      <div data-reveal="" className="rounded-[10px] border border-dashed border-white/25 p-3 sm:p-4">
        <p className="label text-[10px] text-dim">EU object storage · Scaleway S3 · apart from the database</p>
        <div data-reveal="" style={layer(0.35)} className="mt-4 rounded-[8px] border border-lumen/70 p-3 sm:p-4">
          <p className="label text-[10px] text-lumen">Master key (KEK) · never on disk, never in the database</p>
          <div data-reveal="" style={layer(0.7)} className="mt-4 rounded-[6px] border border-white/30 p-3 sm:p-4">
            <p className="label text-[10px] text-mist">Organisation key (DEK) · one per customer · versioned</p>
            <div data-reveal="" style={layer(1.05)} className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[4px] bg-white/[0.06] px-3 py-3">
              <span aria-hidden className="grid h-9 w-7 place-items-center rounded-[3px] bg-bone font-mono text-[9px] font-bold text-ink">
                PDF
              </span>
              <span className="min-w-0 break-all font-mono text-[12px] text-bone">payslip_2026-05.pdf</span>
              <span className="label ml-auto text-[10px] text-dim">ciphertext</span>
            </div>
          </div>
        </div>
      </div>
      <p className="label mt-4 text-[10px] text-dim">Rotating a key re-wraps keys, not every file.</p>
    </div>
  );
}
