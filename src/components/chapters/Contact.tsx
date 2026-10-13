import { SLOTS } from '@/components/field/shapes';
import { profile } from '@/content/profile';

import { CopyEmail } from '../CopyEmail';
import { Magnetic } from '../Magnetic';
import { Scramble } from '../Scramble';
import { Split } from '../Split';

export function Contact() {
  const links = [
    { href: profile.links.linkedin, label: 'LinkedIn ↗' },
    { href: profile.links.github, label: 'GitHub ↗' },
  ];

  return (
    <section
      id="contact"
      data-field={SLOTS.one}
      data-field-alpha="0.95"
      data-chapter="(06) Contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh flex-col justify-center px-5 py-[16vh] sm:px-10"
    >
      <p className="label text-lumen">
        <Scramble text="(06) Contact" />
      </p>
      <h2 id="contact-title" className="display mt-6 max-w-[11ch] text-[clamp(3.4rem,8.6vw,10rem)]">
        <Split parts={[{ t: 'Let’s take yours from zero to' }, { t: 'one.', c: 'ital text-lumen' }]} />
      </h2>
      <p data-reveal="" className="mt-8 max-w-[30rem] text-lg leading-relaxed text-mist">
        Tell me what you are building, who it is for and what data it will hold.
      </p>
      <div data-reveal="" className="mt-12">
        <Magnetic strength={0.12}>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="Write"
            className="display block text-[clamp(1.6rem,4.2vw,4.4rem)] tracking-[-0.01em] [font-stretch:92%] text-bone underline decoration-lumen decoration-[0.06em] underline-offset-[0.18em] transition-colors hover:text-lumen"
          >
            {profile.email}
          </a>
        </Magnetic>
      </div>
      <div data-reveal="" className="label mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-mist">
        <CopyEmail email={profile.email} className="text-bone hover:text-lumen" />
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-bone" data-cursor="Visit">
            {link.label}
          </a>
        ))}
        <a href={profile.cv} download className="hover:text-bone" data-cursor="PDF">
          CV (PDF) ↓
        </a>
      </div>
    </section>
  );
}
