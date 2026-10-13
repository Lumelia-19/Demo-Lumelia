'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { profile } from '@/content/profile';
import { container } from '@/lib/site';

import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#security', label: 'Security' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [overHero, setOverHero] = useState(isHome);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const update = () => setOverHero(window.scrollY < window.innerHeight * 0.82);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  // Over the (always dark) hero the header borrows the dark palette; once the
  // page scrolls it follows the visitor's theme.
  const transparent = overHero && !open;

  return (
    <header
      data-theme={transparent ? 'dark' : undefined}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        transparent ? 'border-b border-transparent bg-transparent' : 'border-b border-rule bg-bg/92 backdrop-blur-xl'
      }`}
    >
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link href="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent font-display text-sm font-semibold tracking-tight text-white shadow-[0_0_0_4px_var(--glow)] transition-transform group-hover:-rotate-6">
            {profile.initials}
          </span>
          <span className="hidden font-display text-[15px] font-medium tracking-tight text-ink sm:block">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={profile.cv}
            download
            className="hidden items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            <Icon name="download" className="h-4 w-4" />
            CV
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-rule md:hidden">
          <ul className={`${container} flex flex-col py-3`}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-display text-lg text-ink hover:bg-ink/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.cv}
                download
                className="mt-2 flex items-center gap-2 rounded-xl px-3 py-3 font-display text-lg text-accent hover:bg-ink/5"
              >
                <Icon name="download" className="h-5 w-5" />
                Download CV (PDF)
              </a>
            </li>
          </ul>
        </nav>
      )}

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-accent"
      />
    </header>
  );
}
