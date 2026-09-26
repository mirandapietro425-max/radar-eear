import { useEffect, useMemo, useState } from 'react';
import atlas from '../../../data/historical-atlas-places-v12.json';

declare global { namespace JSX { interface IntrinsicElements { 'gmp-map-3d': any; 'gmp-marker-3d-interactive': any; } } }

function loadMaps3D(key: string) {
  return new Promise<void>((resolve, reject) => {
    if (customElements.get('gmp-map-3d')) { resolve(); return; }
    const existing = document.getElementById('google-maps-3d-script');
    if (existing) { existing.addEventListener('load', () => resolve(), { once: true }); existing.addEventListener('error', () => reject(new Error('Falha ao carregar Google Maps 3D')), { once: true }); return; }
    const script = document.createElement('script');
    script.id = 'google-maps-3d-script';
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?loading=async&key=${encodeURIComponent(key)}&libraries=maps3d`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar Google Maps 3D'));
    document.head.appendChild(script);
  });
}

export default function HistoricalMapPage() {
  const [selectedId, setSelectedId] = useState(atlas.places[0]?.id ?? 'jerusalem');
  const [status, setStatus] = useState('');
  const [use3D, setUse3D] = useState(true);
  const selected = useMemo(() => atlas.places.find(p => p.id === selectedId) ?? atlas.places[0], [selectedId]);
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  useEffect(() => {
    if (!use3D || !key) return;
    loadMaps3D(key).then(() => setStatus('')).catch(() => { setStatus('Não foi possível carregar o mapa 3D; exibindo fallback.'); setUse3D(false); });
  }, [key, use3D]);

  return <div className="mx-auto max-w-[1380px]">
    <div className="mb-6"><p className="eyebrow">Cartografia do conhecimento</p><h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">Viaje pelo lugar antes de estudar o acontecimento.</h1><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Modo 3D com Google Maps e exportação para Google Earth. O objetivo é descer do planeta ao contexto: época, pessoas, textos, artefatos e rotas.</p></div>
    <div className="mb-4 flex flex-wrap gap-2">{atlas.places.slice(0,12).map(p => <button key={p.id} onClick={() => setSelectedId(p.id)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${p.id===selectedId?'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]':'border-[hsl(var(--border))] bg-[hsl(var(--background))]'}`}>{p.name_pt}</button>)}</div>
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <section className="panel overflow-hidden rounded-3xl">
        {use3D && key ? <gmp-map-3d className="block min-h-[620px] w-full" center={`${selected.lat},${selected.lon},120000`} heading="20" tilt="62" range="900000" mode="HYBRID">
          <gmp-marker-3d-interactive position={`${selected.lat},${selected.lon}`} title={selected.name_pt}></gmp-marker-3d-interactive>
        </gmp-map-3d> : <div className="flex min-h-[620px] items-center justify-center bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/.18),transparent_58%),hsl(var(--secondary)/.35)] p-8 text-center"><div><p className="eyebrow">Fallback do Atlas</p><h2 className="mt-2 font-display text-3xl font-bold">{selected.name_pt}</h2><p className="mt-3 max-w-xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">Configure <code>VITE_GOOGLE_MAPS_API_KEY</code> para ativar o 3D. O Atlas e o arquivo KML continuam disponíveis sem a API.</p></div></div>}
        {status && <p className="px-5 py-3 text-xs text-[hsl(var(--muted-foreground))]">{status}</p>}
      </section>
      <aside className="panel rounded-3xl p-6">
        <p className="eyebrow">Local selecionado</p><h2 className="mt-2 font-display text-3xl font-bold">{selected.name_pt}</h2><p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{selected.context_pt}</p>
        <div className="mt-6 space-y-3">{selected.tags.map((tag:string)=><span key={tag} className="mr-2 inline-flex rounded-full bg-[hsl(var(--secondary))] px-3 py-1.5 text-xs font-semibold">{tag}</span>)}</div>
        <div className="mt-7 grid gap-2"><button className="rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-[hsl(var(--primary-foreground))]" onClick={() => window.open('/radar-historical-atlas-v12.kml','_blank')}>Abrir o Atlas KML no Google Earth</button><p className="text-xs leading-5 text-[hsl(var(--muted-foreground))]">No Google Earth, o projeto pode ser apresentado como uma sequência narrativa de lugares; dentro do Radar, o mapa abre a mesma história em modo 3D.</p></div>
      </aside>
    </div>
  </div>;
}
