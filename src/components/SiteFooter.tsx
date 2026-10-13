import Link from 'next/link';

import { media } from '@/content/media';
import { profile } from '@/content/profile';
import { container } from '@/lib/site';

// Stock clips stay credited for as long as they are on the site.
const credits = Object.values(media).flatMap((item) => (item.kind === 'video' && item.placeholder ? [item.placeholder] : []));

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-bg">
      <div className={`${container} flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between`}>
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/#work" className="hover:text-ink">
            Work
          </Link>
          <a href={profile.cv} download className="hover:text-ink">
            CV
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-ink">
            GitHub
          </a>
        </nav>
      </div>
      {credits.length > 0 && (
        <div className={`${container} pb-8`}>
          <p className="text-xs leading-relaxed text-faint">
            Placeholder footage from Pexels, until real product captures replace it:{' '}
            {credits.map((credit, index) => (
              <span key={credit.url}>
                {index > 0 && ', '}
                <a href={credit.url} target="_blank" rel="noreferrer" className="underline decoration-rule underline-offset-2 hover:text-muted">
                  clip {index + 1}
                </a>
              </span>
            ))}
            .
          </p>
        </div>
      )}
    </footer>
  );
}
