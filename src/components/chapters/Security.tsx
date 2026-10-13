import type { CSSProperties } from 'react';

import { SLOTS } from '@/components/field/shapes';
import { sensitiveData, standards } from '@/content/expertise';

import { Scramble } from '../Scramble';
import { Split } from '../Split';
import { EnvelopeDemo } from './EnvelopeDemo';
import { RedactionDemo } from './RedactionDemo';

const d = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;
const tilt = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1'];

export function Security() {
  return (
    <>
      <section
        id="security"
        data-field={SLOTS.lock}
        data-field-alpha="1"
        data-chapter="(02) Security"
        aria-labelledby="security-title"
        className="relative flex min-h-svh items-center px-5 py-[16vh] sm:px-10"
      >
        <div className="max-w-[46rem]">
          <p className="label text-lumen">
            <Scramble text="(02) Security & privacy" />
          </p>
          <h2 id="security-title" className="display mt-6 text-[clamp(3.4rem,9vw,10rem)]">
            <Split parts={[{ t: 'Sensitive', br: true }, { t: 'by default.', c: 'ital text-lumen' }]} />
          </h2>
          <p data-reveal="" className="mt-8 max-w-[31rem] text-lg leading-relaxed text-mist sm:text-xl">
            Mailboxes, CVs, payslips, children’s voices, insurance records. Here is how each one was protected: in
            shipped code, not in a slide deck.
          </p>
        </div>
      </section>

      <section
        data-field={SLOTS.lock}
        data-field-alpha="0"
        data-chapter="(02) Security"
        aria-label="How the data was protected"
        className="relative bg-paper px-5 pb-28 pt-24 text-paper-ink sm:px-10 sm:pb-36"
      >
        <div className="label flex flex-wrap justify-between gap-x-8 gap-y-2 border-b border-paper-line pb-4 text-paper-mist">
          <span>Dossier 02 · Data handling</span>
          <span>Declassified for the reader</span>
          <span>2 demos · 6 files</span>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-10">
          <figure className="min-w-0">
            <p className="label text-paper-mist">Demo A · Farouk.app</p>
            <h3 className="display mt-3 text-[clamp(2rem,3.4vw,3.4rem)]">Before any model reads a message</h3>
            <div className="mt-6">
              <RedactionDemo />
            </div>
            <figcaption className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-paper-mist">
              Email addresses and phone numbers are stripped before any LLM call, and inbound mail is treated as
              untrusted input. Illustration of the rule, with made-up details.
            </figcaption>
          </figure>
          <figure className="min-w-0">
            <p className="label text-paper-mist">Demo B · Doksima</p>
            <h3 className="display mt-3 text-[clamp(2rem,3.4vw,3.4rem)]">One key per customer</h3>
            <div className="mt-6">
              <EnvelopeDemo />
            </div>
            <figcaption className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-paper-mist">
              Each organisation’s documents are encrypted with its own key, itself wrapped by a master key kept out of
              the database. Keys are versioned, so they rotate without re-encrypting everything at once.
            </figcaption>
          </figure>
        </div>

        <ol className="mt-24 grid border-l border-t border-paper-line sm:grid-cols-2 lg:grid-cols-3">
          {sensitiveData.map((file, index) => (
            <li key={file.title} className="border-b border-r border-paper-line p-6 sm:p-7">
              <p className="label flex justify-between text-paper-mist">
                <span>File {String(index + 1).padStart(2, '0')}</span>
                <span>{file.where}</span>
              </p>
              <h3 className="display mt-8 text-[clamp(1.6rem,2.2vw,2.2rem)] leading-[0.95]">{file.title}</h3>
              <p data-reveal="declassify" style={d((index % 3) * 0.15)} className="mt-4 text-[15px] leading-relaxed text-paper-mist">
                <span className="redact">{file.body}</span>
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-20 flex flex-col gap-6 lg:flex-row lg:items-center">
          <p className="label shrink-0 text-paper-mist">Practised daily</p>
          <ul className="flex flex-wrap gap-4">
            {standards.map((standard, index) => (
              <li
                key={standard}
                data-reveal=""
                style={d(index * 0.06)}
                className={`label border-2 px-3 py-2 ${tilt[index % tilt.length]} ${
                  index === 1 ? 'border-[#c2410c] text-[#c2410c]' : 'border-paper-ink text-paper-ink'
                }`}
              >
                {standard}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
