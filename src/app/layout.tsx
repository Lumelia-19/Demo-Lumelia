import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { profile } from '@/content/profile';
import { siteUrl } from '@/lib/site';

import './globals.css';

const display = localFont({
  src: '../fonts/space-grotesk-var.woff2',
  weight: '300 700',
  variable: '--ff-display',
  display: 'swap',
});

const sans = localFont({
  src: [
    { path: '../fonts/ibm-plex-sans-var.woff2', weight: '100 700', style: 'normal' },
    { path: '../fonts/ibm-plex-sans-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--ff-sans',
  display: 'swap',
});

const mono = localFont({
  src: [
    { path: '../fonts/ibm-plex-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/ibm-plex-mono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--ff-mono',
  display: 'swap',
});

const title = `${profile.name} — ${profile.role}`;
const description =
  'Senior full-stack engineer who takes products from an empty repository to real users: Next.js, React Native, Node/TypeScript and PostgreSQL, with sensitive data handled by design.';

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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f9f8' },
    { media: '(prefers-color-scheme: dark)', color: '#061316' },
  ],
  colorScheme: 'light dark',
};

// Runs before the first paint so the page never flashes the wrong theme.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){d.dataset.theme='light'}})();`;

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-text antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-accent px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
