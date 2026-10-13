// Sensitive data handled in production, and the working principles behind it.

export const sensitiveData: { title: string; where: string; body: string }[] = [
  {
    title: 'Regulated financial data',
    where: 'Seyna, insurer',
    body: 'AML/KYC obligations turned into deterministic, auditable rules with the compliance team; 5M+ registry records a month, traceable end to end.',
  },
  {
    title: 'Financial documents',
    where: 'Doksima',
    body: 'Payslips and bank statements under envelope encryption, one key per customer, stored in the EU; reports timestamped under RFC 3161.',
  },
  {
    title: 'Mailboxes and CVs',
    where: 'Farouk.app',
    body: 'Restricted Gmail scopes under a CASA / OWASP ASVS pre-audit, PII redacted before any LLM call, GDPR erasure down to stored files.',
  },
  {
    title: 'Children’s data and voice',
    where: 'ArabicPro',
    body: 'Parental consent covering voice recordings, signed links that carry no personal data, in-app deletion, deny-by-default access.',
  },
  {
    title: 'Secrets, tokens and auth',
    where: 'Every product',
    body: 'AES-256-GCM and pgsodium at rest, HMAC-signed links, salted hashed API keys, constant-time checks, encryption that fails closed.',
  },
  {
    title: 'Privacy-safe analytics and AI',
    where: 'Farouk.app',
    body: 'Aggregates only for groups of 10+ people; risky actions gated in code, never by the model, to resist prompt injection.',
  },
];

export const standards = ['GDPR', 'OWASP ASVS', 'Encryption at rest', 'Least privilege', 'Data minimisation', 'Audit trails'];

export const principles = [
  {
    title: 'Real users over demos',
    body: 'Success is measured in production: people using it, customers paying for it, health checks every 30 minutes.',
  },
  {
    title: 'Privacy is a default',
    body: 'Collect less, encrypt what’s left, and make deletion reach every copy — database rows, files and derived data.',
  },
  {
    title: 'Guardrails live in code',
    body: 'Models propose, deterministic code decides and may refuse. Anything irreversible is never left to an LLM.',
  },
  {
    title: 'You build it, you run it',
    body: 'Staged releases, automatic rollback and alerting, and a short morning report instead of surprises.',
  },
];
