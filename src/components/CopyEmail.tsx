'use client';

import { useState } from 'react';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:bg-ink/5 hover:text-ink"
    >
      <span aria-live="polite">{copied ? 'Copied ✓' : 'Copy address'}</span>
    </button>
  );
}
