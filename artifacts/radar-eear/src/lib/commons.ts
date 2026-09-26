export type CommonsImage = {
  title: string;
  thumbUrl: string;
  pageUrl: string;
  license?: string;
  artist?: string;
};

const cache = new Map<string, CommonsImage | null>();

export async function searchCommonsImage(query: string): Promise<CommonsImage | null> {
  const clean = query.trim();
  if (!clean) return null;
  if (cache.has(clean)) return cache.get(clean) ?? null;

  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');
  url.searchParams.set('generator', 'search');
  url.searchParams.set('gsrsearch', clean);
  url.searchParams.set('gsrnamespace', '6');
  url.searchParams.set('gsrlimit', '4');
  url.searchParams.set('prop', 'imageinfo');
  url.searchParams.set('iiprop', 'url|extmetadata');
  url.searchParams.set('iiurlwidth', '960');

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Commons ${response.status}`);
    const data = await response.json() as any;
    const pages = Object.values(data?.query?.pages ?? {}) as any[];
    const page = pages.find((item) => item?.imageinfo?.[0]?.thumburl || item?.imageinfo?.[0]?.url);
    if (!page) {
      cache.set(clean, null);
      return null;
    }
    const info = page.imageinfo?.[0];
    const meta = info?.extmetadata ?? {};
    const image: CommonsImage = {
      title: String(page.title ?? clean),
      thumbUrl: String(info.thumburl ?? info.url),
      pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(String(page.title ?? '')).replace(/%2F/g, '/')}`,
      license: meta.LicenseShortName?.value ? String(meta.LicenseShortName.value) : undefined,
      artist: meta.Artist?.value ? String(meta.Artist.value).replace(/<[^>]*>/g, '') : undefined,
    };
    cache.set(clean, image);
    return image;
  } catch {
    cache.set(clean, null);
    return null;
  }
}
