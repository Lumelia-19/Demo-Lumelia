'use client';

import { useEffect, useRef, useState } from 'react';

import type { VideoMedia } from '@/content/media';

// Muted loop that only plays while on screen, and never plays for visitors who
// asked for reduced motion (they get the poster frame).
export function LoopVideo({
  media,
  className,
  eager = false,
}: {
  media: VideoMedia;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) {
      video?.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={className}
      poster={`${media.base}.webp`}
      muted
      loop
      playsInline
      preload={eager ? 'auto' : 'metadata'}
      aria-label={media.alt || undefined}
      aria-hidden={media.alt ? undefined : true}
    >
      <source src={`${media.base}.webm`} type="video/webm" />
      <source src={`${media.base}.mp4`} type="video/mp4" />
    </video>
  );
}
