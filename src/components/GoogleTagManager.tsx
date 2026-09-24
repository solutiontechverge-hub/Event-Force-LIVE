'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { isGtmEnabled, pushGTMPageView } from '@/lib/gtm';

function GtmPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGtmEnabled) return;
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    pushGTMPageView(path);
  }, [pathname, searchParams]);

  return null;
}

/**
 * SPA pageview tracking only.
 * GTM bootstrap script + noscript live in `src/app/layout.tsx` (SSR) so they
 * appear at the start of <head> and as the first child of <body>.
 */
export default function GoogleTagManager() {
  if (!isGtmEnabled) return null;

  return (
    <Suspense fallback={null}>
      <GtmPageViewTracker />
    </Suspense>
  );
}
