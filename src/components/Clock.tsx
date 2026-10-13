'use client';

import { useEffect, useState } from 'react';

// Local time in Rennes, so visitors know whether it is a sensible hour.
export function Clock() {
  const [now, setNow] = useState('');

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{now || '--:--:--'}</span>;
}
