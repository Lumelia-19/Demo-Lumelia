'use client';

import { useEffect, useRef, useState } from 'react';

// Cross-fades through a set of screenshots while visible. Used for phone
// screens and for desktop captures that are stills rather than video.
export function ScreenCycle({
  images,
  interval = 3200,
  kenBurns = false,
  indicators = true,
  className = '',
}: {
  images: { src: string; alt: string }[];
  interval?: number;
  kenBurns?: boolean;
  indicators?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running || images.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => window.clearInterval(timer);
  }, [running, images.length, interval]);

  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${className}`}>
      {images.map((image, i) => (
        <img
          key={image.src}
          src={image.src}
          alt={i === index ? image.alt : ''}
          aria-hidden={i === index ? undefined : true}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-1000 ease-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          } ${kenBurns && i === index ? 'ken-burns' : ''}`}
        />
      ))}
      {indicators && images.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((image, i) => (
            <span
              key={image.src}
              className={`h-1 rounded-full bg-white/80 shadow transition-all duration-500 ${i === index ? 'w-5' : 'w-1.5 opacity-50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
