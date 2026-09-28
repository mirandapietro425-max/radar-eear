const ALLOWED = new Set([
  'www.gutenberg.org',
  'gutenberg.org',
  'pt.wikisource.org',
  'en.wikisource.org',
  'es.wikisource.org',
  'fr.wikisource.org',
]);

function fail(res, status, message) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ error: message }));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return fail(res, 405, 'Método não permitido');
  const raw = typeof req.query?.url === 'string' ? req.query.url : '';
  if (!raw) return fail(res, 400, 'URL ausente');
  let url;
  try { url = new URL(raw); } catch { return fail(res, 400, 'URL inválida'); }
  if (url.protocol !== 'https:' || !ALLOWED.has(url.hostname)) return fail(res, 403, 'Origem não autorizada');

  try {
    const upstream = await fetch(url, { headers: { 'User-Agent': 'RADAR-EEAR/1.0 (+public-domain-reader)' } });
    if (!upstream.ok) return fail(res, upstream.status, `Fonte retornou ${upstream.status}`);
    const body = await upstream.text();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Radar-Source', url.hostname);
    res.end(body);
  } catch (error) {
    return fail(res, 502, error instanceof Error ? error.message : 'Falha ao carregar a obra');
  }
}
