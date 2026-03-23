export const companyProfile = {
  name: 'TechniPro Maintenance',
  sector: 'Services Techniques & Maintenance',
};

export const quoteConfig = {
  tva: 20,
  validity: 30,
  currency: 'EUR (€) - Euro',
  pdfTemplate: 'Moderne',
};

export const notificationChannels = [
  {
    id: 'slack',
    icon: 'chat',
    name: 'Slack',
    detail: 'Connecté : #ventes-devis',
    enabled: true,
  },
  {
    id: 'whatsapp',
    icon: 'phone_iphone',
    name: 'WhatsApp',
    detail: "Validations d'urgence",
    enabled: true,
  },
  {
    id: 'email',
    icon: 'mail',
    name: 'Email',
    detail: 'Rapports hebdomadaires',
    enabled: false,
  },
];

export const teamMembers = [
  {
    id: 1,
    initials: 'JP',
    name: 'Jean-Pierre Durand',
    email: 'j.durand@technipro.fr',
    role: 'Founder',
    roleStyle: 'bg-primary/5 text-primary border-primary/10',
    lastActivity: "Aujourd'hui, 09:12",
    active: true,
    avatarBg: 'bg-primary-container text-white',
  },
  {
    id: 2,
    initials: 'ML',
    name: 'Marc Lefebvre',
    email: 'm.lefebvre@technipro.fr',
    role: 'Technician',
    roleStyle: 'bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant border-tertiary-fixed-dim/30',
    lastActivity: 'Il y a 2 jours',
    active: true,
    avatarBg: 'bg-secondary-container text-on-secondary-container',
  },
  {
    id: 3,
    initials: 'SD',
    name: 'Sophie Dubois',
    email: 's.dubois@technipro.fr',
    role: 'Agent',
    roleStyle: 'bg-outline-variant/10 text-on-surface-variant border-outline-variant/20',
    lastActivity: '14 Mars 2024',
    active: false,
    avatarBg: 'bg-surface-container text-on-surface-variant',
  },
];

export const sectors = [
  'Services Techniques & Maintenance',
  'Génie Climatique (HVAC)',
  'Plomberie & Sanitaire',
  'Électricité Industrielle',
];

export const currencies = [
  'EUR (€) - Euro',
  'USD ($) - Dollar',
  'CHF (Fr) - Franc Suisse',
];

export const pdfTemplates = ['Moderne', 'Classique', 'Minimal'];
