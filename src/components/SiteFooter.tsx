import { media } from '@/content/media';
import { profile } from '@/content/profile';

import { Clock } from './Clock';

// Stock clips stay credited for as long as they are on the site.
const credits = Object.values(media).flatMap((item) => (item.kind === 'video' && item.placeholder ? [item.placeholder] : []));

export function SiteFooter() {
  return (
    <footer className="label relative z-10 border-t border-line bg-ink px-5 py-6 text-dim sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          Rennes, FR · <Clock />
        </span>
        {credits.length > 0 && (
          <span>
            Placeholder clips:{' '}
            {credits.map((credit, index) => (
              <span key={credit.url}>
                {index > 0 && ' · '}
                <a href={credit.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-bone">
                  Pexels {index + 1}
                </a>
              </span>
            ))}
          </span>
        )}
        <a href="#main" className="hover:text-bone" data-cursor="Top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
