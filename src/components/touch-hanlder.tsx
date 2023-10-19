'use client';

import { useEffect } from 'react';

export default function TouchHandler() {
  const handler = (e: any) => {
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    e.target.dispatchEvent(clickEvent);
  };

  useEffect(() => {
    window.addEventListener('touchstart', handler);

    return () => {
      window.removeEventListener('touchstart', handler);
    };
  }, []);

  return null;
}
