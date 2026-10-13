'use client';

import { useState } from 'react';

export function CopyEmail({ email, className = '' }: { email: string; className?: string }) {
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
    <button type="button" onClick={copy} data-cursor="Copy" className={className}>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy address'}</span>
    </button>
  );
}
