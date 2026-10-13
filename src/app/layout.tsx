import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { Cursor } from '@/components/Cursor';
import { GlyphField } from '@/components/field/GlyphField';
import { Preloader } from '@/components/Preloader';
import { RevealObserver } from '@/components/RevealObserver';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SmoothScroll } from '@/components/SmoothScroll';
import { profile } from '@/content/profile';
import { siteUrl } from '@/lib/site';

import './globals.css';

const title = `${profile.name} — ${profile.role}`;
const description =
  'Zero to one, safely. Senior full-stack engineer who takes products from an empty repository to real users: Next.js, React Native, Node/TypeScript and PostgreSQL, with sensitive data handled by design.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  alternates: { canonical: '/' },
  openGraph: { type: 'profile', url: '/', siteName: profile.name, title, description, locale: 'en_GB' },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: '#08090b',
  colorScheme: 'dark',
};

// Runs before the first paint: marks that JavaScript is on (so reveals can
// start hidden) and skips the intro for returning visitors.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('bh-intro')){d.classList.add('intro-seen','intro-done')}}catch(e){d.classList.add('intro-seen','intro-done')}})();`;

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Rennes', addressCountry: 'FR' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: profile.education.school },
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: ['Next.js', 'React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'GDPR', 'OWASP ASVS'],
};

const preloadFonts = [
  '/fonts/bricolage-grotesque.woff2',
  '/fonts/jetbrains-mono.woff2',
  '/fonts/instrument-serif-italic.woff2',
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {preloadFonts.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="min-h-dvh bg-ink font-sans text-bone">
        <a
          href="#main"
          className="label sr-only z-[120] bg-lumen px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <RevealObserver />
        <GlyphField />
        <SiteHeader />
        <main id="main" className="relative z-10 overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
        <div aria-hidden className="grain" />
        <Cursor />
      </body>
    </html>
  );
}
