'use client';

import { useEffect, useRef, useState } from 'react';

// Illustrates Farouk.app's rule: contact details are stripped from a message
// before any model reads it. The text is an example, not a log.
type Piece = { text: string; kind?: 'email' | 'phone' };

const message: Piece[] = [
  { text: 'Hi! Thanks for the offer, I would love to talk about the role. You can reach me at ' },
  { text: 'jane.martin@example.com', kind: 'email' },
  { text: ' or on ' },
  { text: '+33 6 12 34 56 78', kind: 'phone' },
  { text: ' any afternoon this week. Jane' },
];

export function RedactionDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(3);
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStep(0);
        timers.push(window.setTimeout(() => setStep(1), 500));
        timers.push(window.setTimeout(() => setStep(2), 1900));
        timers.push(window.setTimeout(() => setStep(3), 2900));
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [run]);

  return (
    <div ref={ref} className="overflow-hidden rounded-[14px] bg-paper-ink text-bone">
      <div className="label flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-white/10 px-5 py-3 text-[10px] text-dim">
        <span>inbound/message.txt</span>
        <span className={step >= 3 ? 'text-lumen' : ''}>{step >= 3 ? 'Safe for the model' : step >= 1 ? 'Scanning…' : 'Untrusted input'}</span>
      </div>
      <div className="relative px-5 py-6">
        {step === 1 && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-lumen/25 to-transparent [animation:scan_1.3s_linear_1]"
          />
        )}
        <p className="font-mono text-[13px] leading-[1.9] text-mist">
          {message.map((piece, index) =>
            piece.kind ? (
              <span
                key={index}
                className={`rounded-[3px] px-1 transition-all duration-500 ${
                  step >= 3
                    ? 'bg-lumen font-semibold text-ink'
                    : step >= 2
                      ? 'bg-lumen/15 text-lumen-2 outline outline-1 outline-lumen'
                      : 'text-bone'
                }`}
              >
                {step >= 3 ? `[${piece.kind}]` : piece.text}
              </span>
            ) : (
              <span key={index}>{piece.text}</span>
            ),
          )}
        </p>
      </div>
      <div className="label flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-white/10 px-5 py-3 text-[10px] text-dim">
        <span>Email and phone removed before any LLM call</span>
        <button type="button" onClick={() => setRun((value) => value + 1)} className="text-bone hover:text-lumen" data-cursor="Replay">
          Replay
        </button>
      </div>
    </div>
  );
}
