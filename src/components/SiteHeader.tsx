'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type MouseEvent } from 'react';

import { profile } from '@/content/profile';

import { Clock } from './Clock';
import { Scramble } from './Scramble';
import { getLenis, scrollToHash } from './SmoothScroll';

const chapters = [
  { hash: '#work', label: 'Work' },
  { hash: '#security', label: 'Security' },
  { hash: '#principles', label: 'Principles' },
  { hash: '#path', label: 'Path' },
  { hash: '#whoami', label: 'Whoami' },
  { hash: '#contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [chapter, setChapter] = useState('');
  const [open, setOpen] = useState(false);

  // The middle of the bar names the chapter under the centre of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setChapter(entry.target.getAttribute('data-chapter') ?? '');
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    const observe = () => document.querySelectorAll('[data-chapter]').forEach((el) => io.observe(el));
    observe();
    const timer = window.setTimeout(observe, 400);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const go = (hash: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    if (pathname === '/') {
      getLenis()?.start();
      window.setTimeout(() => scrollToHash(hash), 60);
    } else {
      router.push(`/${hash}`);
    }
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] text-bone mix-blend-difference">
        <div className="flex items-start justify-between gap-6 px-5 py-5 sm:px-10 sm:py-6">
          <Link href="/" className="label pointer-events-auto flex items-center gap-2.5" data-cursor="Home">
            <span aria-hidden className="h-2 w-2 rounded-full bg-bone" />
            {profile.name}
          </Link>
          <span className="label hidden md:block" aria-live="polite">
            {chapter && <Scramble key={chapter} text={chapter} start="mount" />}
          </span>
          <nav aria-label="Site" className="label pointer-events-auto flex items-center gap-6">
            <a href={profile.cv} download data-cursor="PDF">
              CV ↓
            </a>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu" data-cursor="Open">
              Menu
            </button>
          </nav>
        </div>
      </header>

      <div id="menu" role="dialog" aria-modal="true" aria-label="Menu" inert={!open} className={`menu ${open ? 'is-open' : ''}`}>
        <div className="flex items-start justify-between px-5 py-5 sm:px-10 sm:py-6">
          <span className="label text-dim">Index</span>
          <button type="button" onClick={() => setOpen(false)} className="label text-bone" data-cursor="Close">
            Close
          </button>
        </div>
        <nav aria-label="Chapters" className="flex flex-1 flex-col justify-center px-5 sm:px-10">
          <ol>
            {chapters.map((item, index) => (
              <li key={item.hash} className="border-b border-line first:border-t">
                <a
                  href={`/${item.hash}`}
                  onClick={go(item.hash)}
                  data-cursor="Go"
                  className="group flex items-baseline gap-5 py-2 sm:gap-8 sm:py-3"
                >
                  <span className="label w-10 shrink-0 text-dim">{String(index + 1).padStart(2, '0')}</span>
                  <span className="display text-[clamp(2.6rem,7.5vw,7rem)] text-bone transition-[color,transform] duration-500 ease-out group-hover:translate-x-4 group-hover:text-lumen">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="label flex flex-wrap items-end justify-between gap-4 px-5 pb-6 text-mist sm:px-10">
          <a href={`mailto:${profile.email}`} className="text-bone hover:text-lumen">
            {profile.email}
          </a>
          <span>
            Rennes · <Clock />
          </span>
          <span className="flex gap-5">
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
              LinkedIn ↗
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-bone">
              GitHub ↗
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
