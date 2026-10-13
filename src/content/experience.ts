export const experience = [
  {
    dates: 'Sep 2025 – now',
    role: 'Founder & Lead Engineer',
    company: 'Lumelia',
    place: 'Rennes · remote',
    body: 'Product studio. Sole engineer on Farouk.app, ArabicPro, EchoTrust and Doksima, from scoping with the client to operations. Also mapped and automated the sales process of Maison Autret; a 21-day sprint became an ongoing engagement.',
  },
  {
    dates: 'Oct 2022 – Apr 2025',
    role: 'Senior Software Engineer — Backend & Cloud',
    company: 'Seyna',
    place: 'Paris · remote',
    body: 'Insurtech. Turned AML/KYC obligations into auditable system rules, ran an ingestion pipeline for 5M+ registry records a month, built production APIs in Node.js and Python, and led the AI workstream from 2024.',
  },
  {
    dates: 'Mar 2021 – Sep 2022',
    role: 'Senior Software Engineer & Tech Lead',
    company: 'Arcane',
    place: 'Paris',
    body: 'Led a React/TypeScript team for 18 months on SmartFeeds, a product-feed platform used by Leroy Merlin, Carrefour, Decathlon, Sézane and L’Occitane; introduced the testing standards.',
  },
  {
    dates: '2017 – 2021',
    role: 'Software Engineer',
    company: 'Freelance · Harmonic Inc.',
    place: 'Rennes',
    body: 'Mission-critical video SaaS (Aviwest), a 3D research-data viewer (IFSTTAR), product delivery (PettyWell); machine-learning video-quality models at Harmonic, in a team spread across France, Israel and the US.',
  },
] as const;

export const stack = [
  { group: 'Frontend & mobile', items: ['TypeScript', 'React 19', 'Next.js (App Router)', 'React Native', 'Expo · EAS', 'Tailwind CSS', 'i18n'] },
  { group: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'REST & webhooks', 'Queues & workers'] },
  { group: 'Data', items: ['PostgreSQL', 'Supabase', 'Drizzle', 'Row-level security', 'Redis', 'MongoDB'] },
  { group: 'Security & privacy', items: ['OAuth 2.0', 'Clerk', 'Firebase Auth', 'AES-256-GCM', 'pgsodium', 'OWASP ASVS', 'GDPR'] },
  { group: 'Cloud & delivery', items: ['Vercel', 'AWS', 'GCP · Firebase', 'Docker', 'Kubernetes', 'GitHub Actions', 'Staged releases'] },
  { group: 'Quality & AI', items: ['Playwright', 'Vitest', 'Pytest', 'Sentry', 'OpenTelemetry', 'LLM guardrails', 'MCP'] },
] as const;
