import React, { useEffect, useMemo, useRef, useState } from 'react';
import placesData from '../../data/world-knowledge-places-v14.json';
import KnowledgeGlobe from '../globe/KnowledgeGlobe';

type Place = (typeof placesData.places)[number];
const hubs = (placesData.places as Place[]).filter((p) => p.kind === 'hub').slice(0, 36);

function loadMaps(key: string) {
  const existing = document.querySelector('script[data-radar-google-maps]');
  if (existing && customElements.get('gmp-map-3d')) return Promise.resolve(true);
  return new Promise<boolean>((resolve) => {
    const script = (existing as HTMLScriptElement | null) ?? document.createElement('script');
    script.setAttribute('data-radar-google-maps', 'true');
    if (!existing) {
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?loading=async&key=${encodeURIComponent(key)}&libraries=maps3d`;
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => resolve(Boolean(customElements.get('gmp-map-3d'))), { once: true });
    script.addEventListener('error', () => resolve(false), { once: true });
    if (customElements.get('gmp-map-3d')) resolve(true);
  });
}

export default function GoogleKnowledgeMap3DV18() {
  const mapRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState(hubs[0]?.id ?? '');
  const selected = useMemo(() => hubs.find((p) => p.id === selectedId) ?? hubs[0] ?? null, [selectedId]);
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  useEffect(() => {
    if (!key) return undefined;
    let alive = true;
    loadMaps(key).then((ok) => { if (alive) { setReady(ok); setError(!ok); } });
    return () => { alive = false; };
  }, [key]);

  useEffect(() => {
    if (!ready || !mapRef.current) return undefined;
    const map = mapRef.current;
    const markers: HTMLElement[] = [];
    for (const place of hubs) {
      const marker = document.createElement('gmp-marker-3d-interactive');
      marker.setAttribute('position', `${place.lat},${place.lon},60`);
      marker.setAttribute('title', place.name_pt);
      marker.setAttribute('label', '●');
      marker.setAttribute('draws-when-occluded', 'true');
      marker.addEventListener('gmp-click', () => {
        setSelectedId(place.id);
        const target = map as any;
        target.center = { lat: place.lat, lng: place.lon, altitude: 5000 };
        target.range = 250000;
        target.tilt = 60;
      });
      map.appendChild(marker);
      markers.push(marker);
    }
    return () => markers.forEach((marker) => marker.remove());
  }, [ready]);

  if (!key || error) {
    return <section className="space-y-4"><div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.35)] p-4 text-sm"><strong>Globo 3D opcional.</strong> A experiência editorial continua disponível. Configure <code>VITE_GOOGLE_MAPS_API_KEY</code> para habilitar o Google 3D.</div><KnowledgeGlobe /></section>;
  }
  if (!ready) return <section className="rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8"><p className="eyebrow">Google 3D</p><h2 className="mt-2 font-display text-2xl font-bold">Preparando o mundo…</h2><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">O mapa está sendo carregado sem bloquear o restante do Radar.</p></section>;
  const mapProps = { ref: (node: HTMLElement | null) => { mapRef.current = node; }, center: '31.7683,35.2137,120000', tilt: '55', heading: '15', range: '1000000', mode: 'HYBRID', 'gesture-handling': 'greedy', 'aria-label': 'Mapa 3D de lugares do Radar' } as Record<string, unknown>;
  return <section className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]"><div className="min-h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-black shadow-2xl lg:min-h-[680px]">{React.createElement('gmp-map-3d', mapProps)}</div><aside className="rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-6"><p className="text-[10px] font-mono uppercase tracking-[.2em] text-amber-700">Contexto selecionado</p>{selected && <><h2 className="mt-2 text-2xl font-semibold">{selected.name_pt}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{selected.summary_pt}</p></>}<div className="mt-6 grid gap-2">{hubs.slice(0,12).map((p) => <button key={p.id} type="button" onClick={() => { setSelectedId(p.id); const target=mapRef.current as any; if(target){target.center={lat:p.lat,lng:p.lon,altitude:5000};target.range=250000;target.tilt=60;} }} className="min-h-11 rounded-xl bg-slate-50 px-3 text-left text-sm font-medium hover:bg-slate-100">{p.name_pt}</button>)}</div></aside></section>;
}
