'use client';

import { useEffect } from 'react';

/** Registers the PWA service worker after the page is idle (production only). */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          if (registration.active) {
            registration.active.postMessage({ type: 'CACHE_SUPPORT_PAGES' });
          }
        })
        .catch(() => {});
    };

    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
      }
    ).requestIdleCallback;

    if (typeof ric === 'function') {
      ric(register);
    } else {
      window.addEventListener('load', () => setTimeout(register, 2000));
    }
  }, []);

  return null;
}
