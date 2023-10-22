'use client';

import { useEffect } from 'react';

export default function PageHandler() {
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return null;
}
