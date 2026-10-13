'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>{' '}
    </>
  );
}

// A statement whose words light up as it scrolls through the viewport. The markup never depends on the
// reduced-motion setting, so it hydrates cleanly; globals.css shows every word at full strength instead.
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.42'] });
  const words = text.split(' ');

  return (
    <p ref={ref} data-scroll-words="" className={className}>
      {words.map((word, i) => (
        <Word key={i} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}
