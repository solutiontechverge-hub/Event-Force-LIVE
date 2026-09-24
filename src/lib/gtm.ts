const DEFAULT_GTM_ID = 'GTM-M9M6XDBG';

/** Treat empty / example placeholders as unset so the real default can apply. */
function resolveGtmId(raw: string | undefined): string {
  const id = (raw || '').trim();
  if (!id) return DEFAULT_GTM_ID;
  // .env.example style: GTM-XXXXXXX (all X after the prefix)
  if (/^GTM-X+$/i.test(id)) return DEFAULT_GTM_ID;
  return id;
}

export const GTM_ID = resolveGtmId(process.env.NEXT_PUBLIC_GTM_ID);

export const isGtmEnabled =
  Boolean(GTM_ID) && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push a custom event/data into the GTM dataLayer (client-only). */
export function pushGTMEvent(
  event: string,
  payload: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined' || !isGtmEnabled) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

/** Push a virtual page view for Next.js client navigations. */
export function pushGTMPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !isGtmEnabled) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_location: window.location.href,
    page_title: title || document.title,
  });
}
