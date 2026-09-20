'use client';

import { Suspense, useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { GTM_ID, isGtmEnabled, pushGTMPageView } from '@/lib/gtm';

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

/** GTM bootstrap script + SPA pageview tracking (one place for the whole app). */
export default function GoogleTagManager() {
  if (!isGtmEnabled) return null;

  return (
    <>
      <Script
        id="gtm-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <Suspense fallback={null}>
        <GtmPageViewTracker />
      </Suspense>
    </>
  );
}

/** Noscript iframe — place immediately after opening <body>. */
export function GoogleTagManagerNoscript() {
  if (!isGtmEnabled) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
