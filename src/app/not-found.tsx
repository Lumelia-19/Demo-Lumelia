import Link from 'next/link';

import { SLOTS } from '@/components/field/shapes';

export default function NotFound() {
  return (
    <section
      data-field={SLOTS.dust}
      data-field-alpha="1"
      data-chapter="(404) Nothing here"
      className="flex min-h-svh flex-col justify-center px-5 py-32 sm:px-10"
    >
      <p className="label text-lumen">Error 404</p>
      <h1 className="display mt-6 text-[clamp(3.4rem,9vw,9.6rem)]">
        Nothing here.
        <br />
        <span className="ital text-lumen">Not even ciphertext.</span>
      </h1>
      <Link href="/" data-cursor="Home" className="label mt-12 inline-flex w-fit rounded-full bg-bone px-6 py-4 text-ink hover:bg-lumen">
        ← Back to the start
      </Link>
    </section>
  );
}
