// The four products. Only facts verified in the code or on the live sites.

import { media, type Media } from './media';

export type Product = {
  slug: 'farouk' | 'arabicpro' | 'echotrust' | 'doksima';
  name: string;
  kind: string;
  status: string;
  tone: 'live' | 'testflight' | 'beta';
  url?: { href: string; label: string };
  frame: 'browser' | 'phone';
  media: Media;
  summary: string;
  highlights: { title: string; body: string }[];
  stack: string[];
  caseStudy: {
    context: string;
    built: string[];
    data: string[];
    operations: string[];
    outcome: string;
  };
};

export const products: Product[] = [
  {
    slug: 'farouk',
    name: 'Farouk.app',
    kind: 'AI job-search assistant · B2C',
    status: 'Live · 2,000+ users',
    tone: 'live',
    url: { href: 'https://www.farouk.app', label: 'farouk.app' },
    frame: 'browser',
    media: media.farouk,
    summary:
      'A candidate uploads a CV and connects Gmail or Outlook. Farouk finds matching offers, writes the cover letters and sends the applications from the candidate’s own mailbox — by email or by filling in the company’s online form.',
    highlights: [
      {
        title: 'Built and run for a client',
        body: 'From the first commit to production: Next.js app in six languages, FastAPI API, campaign workers, Stripe subscriptions. 2,000+ users, 100+ paying Pro.',
      },
      {
        title: 'Mailboxes and CVs, protected',
        body: 'CASA AL1 (OWASP ASVS) pre-audit for Google’s restricted Gmail scopes, row-level security per workspace, encrypted credentials, contact details redacted before any LLM call, GDPR erasure down to stored files.',
      },
      {
        title: 'Operated, not demoed',
        body: '450+ test files with critical suites gating every pull request, health checks every 30 minutes, staging-to-production promotion and a post-merge guard that reverts on regression.',
      },
    ],
    stack: ['Next.js 14', 'TypeScript', 'FastAPI', 'Python workers', 'Supabase · PostgreSQL', 'Stripe', 'Vercel', 'Railway'],
    caseStudy: {
      context:
        'Job hunting is repetitive: dozens of near-identical applications, each with its own form. Farouk does the repetitive part while the candidate keeps control of their mailbox and their data.',
      built: [
        'A web app in six languages; CV parsing into a verified profile the candidate can edit.',
        'Job search across several sources, filtered by role, level and target country; an AI relevance check runs before anything is sent.',
        'Cover letters and applications sent from the candidate’s own Gmail or Outlook, paced to protect the mailbox.',
        'Online application forms filled by a deterministic engine; captchas always go back to the human.',
        'Free and Pro plans on Stripe, an ambassador programme and a support assistant.',
      ],
      data: [
        'Google CASA AL1 pre-audit (OWASP ASVS level 1) for restricted Gmail scopes, with every finding fixed and covered by tests.',
        'PostgreSQL row-level security per workspace; secret columns are not readable from the browser at all.',
        'Integration credentials encrypted with pgsodium, failing closed when encryption is unavailable.',
        'Emails and phone numbers redacted before any LLM call; inbound email is treated as untrusted input.',
        'Mailbox data kept 30 days; disconnecting revokes the token at Google and erases what was derived from it.',
        'Deleting an account erases database rows and every stored file — CVs, invoices, documents.',
        'Privacy policy tested against the code, so the page cannot promise more than the product does.',
      ],
      operations: [
        'Critical suites (1,900+ API and 580+ web tests) gate every pull request.',
        'Health checks every 30 minutes; staging must be healthy before production moves.',
        'Additive-only migrations applied automatically; anything else waits for a human.',
        'A post-merge guard watches errors and sends for 40 minutes and reverts on regression.',
        'A morning report tells the owner what happened and only what needs a decision.',
      ],
      outcome: 'Live at farouk.app with 2,000+ users and 100+ paying Pro subscribers.',
    },
  },
  {
    slug: 'arabicpro',
    name: 'ArabicPro',
    kind: 'Learn to read Arabic · iOS & Android',
    status: 'In TestFlight',
    tone: 'testflight',
    url: { href: 'https://arabicpro.app', label: 'arabicpro.app' },
    frame: 'phone',
    media: media.arabicpro,
    summary:
      'From the alphabet to the words of the Quran, five minutes a day. You hear every letter before you are asked to recognise it, and reviews come back at the right moment.',
    highlights: [
      {
        title: 'A native app, built for a client',
        body: 'Expo SDK 54, React Native 0.81 and TypeScript: audio lessons, Sign in with Apple, RevenueCat subscriptions, push notifications, EAS builds and over-the-air updates per channel.',
      },
      {
        title: 'Children’s data by design',
        body: 'Parental consent split between general use and voice recordings, signed expiring links that carry no personal data, in-app account deletion, deny-by-default data access.',
      },
      {
        title: 'A back-office that publishes safely',
        body: 'Next.js 16 admin behind signed session cookies and an admin claim; 570+ test files; CI with lint, type-check, unit and end-to-end tests.',
      },
    ],
    stack: ['Expo', 'React Native', 'TypeScript', 'Firebase Auth', 'Data Connect · PostgreSQL', 'RevenueCat', 'Next.js 16', 'Sentry'],
    caseStudy: {
      context:
        'Learning to read Arabic usually means a book and a lot of patience. ArabicPro turns it into short daily sessions: audio first, then recognition, then spaced reviews.',
      built: [
        'A lesson engine with audio-first exercises: presentation, audio recognition, matching and timed questions.',
        'A learning path with a daily goal and spaced-repetition reviews.',
        'A Madinah Book reader with tap-to-translate, adjustable audio and favourites.',
        'Sign in with Apple, Google or email; subscriptions through RevenueCat.',
        'A Next.js back-office to edit modules, lessons and audio, then publish them to the app.',
      ],
      data: [
        'Every user-scoped query is bound to the signed-in account; admin and seed operations are unreachable from the app.',
        'Parental consent with separate consents for general use and for voice recordings.',
        'Parent links are HMAC-signed and expire; they carry no name or address, and a changed address voids them.',
        'In-app account deletion, as the App Store requires.',
        'Admin sessions use a signed cookie, a revocation check and an admin claim.',
      ],
      operations: [
        'EAS build profiles for development, preview and the stores, with over-the-air update channels.',
        '570+ test files; CI runs lint, formatting, type-check, unit and end-to-end tests.',
        'End-to-end runs against local Firebase emulators and a throwaway PostgreSQL.',
        'Sentry and Crashlytics in production builds.',
      ],
      outcome: 'In TestFlight, with the public site live at arabicpro.app.',
    },
  },
  {
    slug: 'echotrust',
    name: 'EchoTrust',
    kind: 'Review management for multi-location businesses · B2B SaaS',
    status: 'Live · first customers',
    tone: 'live',
    url: { href: 'https://echotrust-ai.com', label: 'echotrust-ai.com' },
    frame: 'browser',
    media: media.echotrust,
    summary:
      'EchoTrust imports a business’s Google reviews across all its locations, drafts a reply to each one with AI and publishes it back to Google — only after a human has approved it.',
    highlights: [
      {
        title: 'A SaaS on Next.js 16',
        body: 'Clerk auth, PostgreSQL with Drizzle, Stripe billing with signed webhooks, rate limiting and Google Business Profile OAuth, deployed on Vercel.',
      },
      {
        title: 'Secrets handled properly',
        body: 'OAuth tokens encrypted with AES-256-GCM, API keys stored as salted hashes with constant-time checks, secret scanning and CI actions pinned to commit SHAs.',
      },
      {
        title: 'AI with a human in the loop',
        body: 'Drafts are never published without approval. An MCP server exposes workspace-scoped keys, with a dry-run mode on destructive writes.',
      },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Clerk', 'Stripe', 'Vercel'],
    caseStudy: {
      context:
        'Owners of restaurants and shops with several locations don’t have time to answer every review, and unanswered reviews cost them trust.',
      built: [
        'A workspace-based SaaS: locations, team members and per-location settings.',
        'A review inbox synced from Google Business Profile.',
        'AI-drafted replies that stay editable and versioned, published to Google after approval.',
        'A free public preview that works without an account.',
        'Stripe checkout and billing portal, plus an affiliate programme.',
      ],
      data: [
        'Google OAuth tokens encrypted at rest with AES-256-GCM and HKDF-derived keys, in server-only modules.',
        'MCP API keys stored as salted SHA-256 hashes and compared in constant time.',
        'Every query scoped to the workspace; cross-workspace access is denied and tested.',
        'Signed Stripe and Clerk webhooks; rate limiting on public endpoints.',
      ],
      operations: [
        '160+ test files: Node test runner for server code, Playwright end to end.',
        'CI with secret scanning and third-party actions pinned to commit SHAs.',
        'Health and readiness endpoints; Sentry with an alert webhook.',
      ],
      outcome: 'Live at echotrust-ai.com with its first paying customers.',
    },
  },
  {
    slug: 'doksima',
    name: 'Doksima',
    kind: 'Document-fraud detection for lenders, landlords and insurers',
    status: 'Private beta',
    tone: 'beta',
    frame: 'browser',
    media: media.doksima,
    summary:
      'Doksima checks the supporting documents in a credit, rental or insurance file — payslips, bank statements — and shows what doesn’t add up, citing the evidence for every claim.',
    highlights: [
      {
        title: 'Models find, code decides',
        body: 'Models locate the evidence; a deterministic engine decides: to-the-cent arithmetic, IBAN, SIRET and VAT checks, offline 2D-Doc signature verification, consistency across documents.',
      },
      {
        title: 'Encryption per customer',
        body: 'Every organisation gets its own encryption key, itself wrapped by a master key kept out of the database. Keys are versioned, so they rotate without re-encrypting everything at once.',
      },
      {
        title: 'Abstains instead of guessing',
        body: 'Five explicit outcomes, from “proven false” to “original required”. Below the evidence threshold it refuses to conclude. ~2,900 automated tests.',
      },
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy · Alembic', 'ONNX Runtime', 'React 19', 'Vite', 'S3 (Scaleway)'],
    caseStudy: {
      context:
        'Lenders, landlords and insurers receive edited PDFs every day. Checking them by hand is slow; trusting an opaque AI score is worse.',
      built: [
        'Document reading with local OCR models and native PDF text.',
        'Controls per document and across the file: arithmetic, identifiers, signatures, consistency between payslips and bank statements.',
        'A guided review console: the reviewer sees each discrepancy and its sources, then records a decision.',
        'An evaluation protocol frozen before modelling: stratified test sets and thresholds declared in advance.',
      ],
      data: [
        'Envelope encryption: a key per organisation, wrapped by a master key that never touches the disk or the database.',
        'Versioned keys, so a rotation needs no big-bang re-encryption.',
        'Documents stored encrypted on S3-compatible storage in the EU (Scaleway), separate from the database.',
        'Reports timestamped under RFC 3161 with SHA-256 fingerprints, so a third party can verify them.',
        'OCR runs locally inside the container by default; retention-based purge of documents and files.',
        'Human review recorded separately from the technical result; every statement cites the check that produced it.',
      ],
      operations: [
        '~2,900 automated tests across product and R&D code.',
        'R&D benchmark frozen before modelling: AUC 0.951 on 1,500 paired items.',
        'Every claim in a report cites its control; a sentence without a citation never leaves the system.',
      ],
      outcome: 'In private beta with a waiting list.',
    },
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
