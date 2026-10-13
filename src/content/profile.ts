// Facts about Billel. Everything here is also on the CV; keep the two in step.

export const profile = {
  name: 'Billel Helali',
  initials: 'BH',
  role: 'Senior Full Stack Engineer',
  tagline: '0→1 web & mobile products, secure by design',
  location: 'Rennes, France',
  timezone: 'CET',
  email: 'billel.helali@gmail.com',
  links: {
    github: 'https://github.com/bilLkarkariy',
    linkedin: 'https://www.linkedin.com/in/billel-lumelia',
  },
  cv: '/cv/Billel_Helali_CV_EN.pdf',
  availability: 'Open to founding-engineer roles and 0→1 product builds.',
  languages: [
    { name: 'English', level: 'C1, daily working language' },
    { name: 'French', level: 'native' },
  ],
  education: {
    degree: 'Engineering degree in Computer Science',
    school: 'ESIR, Engineering School of the University of Rennes',
    years: '2014 – 2018',
  },
} as const;

export const metrics = [
  { value: 2000, suffix: '+', label: 'users on Farouk.app, the job-search assistant I built and run' },
  { value: 4, suffix: '', label: 'products taken from an empty repository to real users' },
  { value: 5, suffix: 'M+', label: 'official records ingested every month at a regulated insurer' },
  { value: 8, suffix: ' yrs', label: 'shipping software since graduating, in English, remote-first' },
] as const;

export const about = [
  'I’m Billel, a software engineer from Rennes and the founder of Lumelia, a small product studio. I trained as an engineer at ESIR (University of Rennes) and have spent eight years building software for video, retail, insurance and AI products.',
  'Today I build products end to end for founders who need one person to own the whole thing: architecture, web and mobile apps, backend, deployment and operations. I take a feature from idea to production without hand-holding, and I say so when the plan should change.',
  'I care about the unglamorous parts — tests, migrations, monitoring, consent and deletion — because they decide whether a product survives its first thousand users and keeps their trust.',
] as const;
