import { Fragment, type CSSProperties } from 'react';

export type SplitPart = { t: string; c?: string; br?: boolean };

// Words that rise from behind a mask, one after the other. Pure markup: the
// RevealObserver adds .in and globals.css runs the transition.
export function Split({
  parts,
  intro = false,
  delay = 0,
  stagger = 0.075,
}: {
  parts: SplitPart[];
  intro?: boolean;
  delay?: number;
  stagger?: number;
}) {
  let index = 0;
  return (
    <span data-split={intro ? 'intro' : ''}>
      {parts.map((part, p) => (
        <Fragment key={p}>
          {part.t
            .split(' ')
            .filter(Boolean)
            .map((word, w) => {
              const style = { '--d': `${(delay + index++ * stagger).toFixed(3)}s` } as CSSProperties;
              return (
                <Fragment key={w}>
                  <span className="split-w">
                    <span className={part.c} style={style}>
                      {word}
                    </span>
                  </span>{' '}
                </Fragment>
              );
            })}
          {part.br && <br />}
        </Fragment>
      ))}
    </span>
  );
}
