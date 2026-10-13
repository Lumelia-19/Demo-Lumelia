// Every visual on the site goes through this registry, so swapping a placeholder
// for a real capture is a one-line change here (after `npm run media`).

export type Credit = { label: string; url: string };

/** A looping, muted clip. `base` points to /media/<id>.{webm,mp4,webp}. */
export type VideoMedia = {
  kind: 'video';
  base: string;
  alt: string;
  /** Set while the clip is stock footage rather than the product itself. */
  placeholder?: Credit;
};

/** Phone screens shown one after another inside a phone frame. */
export type ScreensMedia = {
  kind: 'screens';
  images: { src: string; alt: string }[];
};

/** Desktop screens shown one after another inside a browser frame. */
export type SlidesMedia = {
  kind: 'slides';
  images: { src: string; alt: string }[];
};

export type Media = VideoMedia | ScreensMedia | SlidesMedia;

const pexels = (id: string, author?: string): Credit => ({
  label: author ? `Placeholder footage: ${author} on Pexels` : 'Placeholder footage: Pexels',
  url: `https://www.pexels.com/video/${id}/`,
});

export const media = {
  farouk: {
    kind: 'video',
    base: '/media/farouk-placeholder',
    alt: 'Illustrative footage of someone applying online from a laptop.',
    placeholder: pexels('2516162'),
  },
  echotrust: {
    kind: 'video',
    base: '/media/echotrust-placeholder',
    alt: 'Illustrative footage of guests in a restaurant.',
    placeholder: pexels('852179'),
  },
  arabicpro: {
    kind: 'screens',
    images: [
      { src: '/media/arabicpro-home.webp', alt: 'ArabicPro home: the weekly dial, today’s goal and the next lesson.' },
      { src: '/media/arabicpro-lesson.webp', alt: 'A lesson card introducing the letter Dhal with its sound.' },
      { src: '/media/arabicpro-quiz.webp', alt: 'A timed question: which letter did you hear? The right one lit in gold.' },
      { src: '/media/arabicpro-onboarding-book.webp', alt: 'Welcome screen for the Madinah Book reader.' },
      { src: '/media/arabicpro-onboarding-lantern.webp', alt: 'Welcome screen: master the alphabet.' },
    ],
  },
  doksima: {
    kind: 'slides',
    images: [
      { src: '/media/doksima-graph.webp', alt: 'Doksima document graph: five documents linked by the checks run on the file.' },
      { src: '/media/doksima-review-queue.webp', alt: 'Doksima review queue with a demonstration file, its human review state and technical result.' },
    ],
  },
} satisfies Record<string, Media>;
