import { useEffect, useMemo, useRef, useState } from 'react';
import placesData from '../../data/world-knowledge-places-v14.json';

type Place = (typeof placesData.places)[number];
const hubs = (placesData.places as Place[]).filter((p) => p.kind === 'hub').slice(0, 36);

export default function GoogleKnowledgeMap3D() {
  const mapRef = useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState(hubs[0]?.id ?? '');
  const selected = useMemo(() => hubs.find((p) => p.id === selectedId) ?? hubs[0] ?? null, [selectedId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return undefined;

    const createMarkers = () => {
      hubs.forEach((place) => {
        const marker = document.createElement('gmp-marker-3d-interactive');
        marker.setAttribute('position', `${place.lat},${place.lon},60`);
        marker.setAttribute('title', place.name_pt);
        marker.setAttribute('label', '●');
        marker.setAttribute('draws-when-occluded', 'true');
        marker.setAttribute('collision-behavior', 'OPTIONAL_AND_HIDES_LOWER_PRIORITY');
        marker.addEventListener('gmp-click', () => {
          setSelectedId(place.id);
          const target = map as any;
          if (target && 'center' in target) {
            target.center = { lat: place.lat, lng: place.lon, altitude: 5000 };
            target.range = 250000;
            target.tilt = 60;
          }
        });
        (map as HTMLElement).appendChild(marker);
      });
    };

    if (customElements.get('gmp-map-3d')) createMarkers();
    else customElements.whenDefined('gmp-map-3d').then(createMarkers);

    return () => {
      Array.from(map.querySelectorAll('gmp-marker-3d-interactive')).forEach((node) => node.remove());
    };
  }, []);

  return (
    <section className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <div className="min-h-[680px] overflow-hidden rounded-[2rem] border border-slate-200 bg-black shadow-2xl">
        <gmp-map-3d ref={(node: HTMLElement | null) => { mapRef.current = node; }} center="31.7683,35.2137,120000" tilt="55" heading="15" range="1000000" mode="hybrid" gesture-handling="greedy"></gmp-map-3d>
      </div>
      <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
        <p className="text-[10px] font-mono uppercase tracking-[.2em] text-amber-700">Google 3D · pontos clicáveis</p>
        <h2 className="mt-2 text-3xl font-semibold">Aproxime e descubra.</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">Os marcadores 3D abrem o contexto do lugar e movimentam a câmera para uma leitura em escala real. O catálogo editorial completo continua no Globo Radar.</p>
        {selected && <div className="mt-6 rounded-2xl bg-slate-50 p-5"><div className="text-[10px] uppercase tracking-widest text-amber-700">Lugar selecionado</div><h3 className="mt-2 text-2xl font-semibold">{selected.name_pt}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{selected.summary_pt}</p><div className="mt-4 flex flex-wrap gap-2">{selected.tags?.map((t) => <span key={t} className="rounded-full bg-white px-2.5 py-1 text-[10px] text-slate-600 ring-1 ring-slate-200">{t}</span>)}</div></div>}
        <div className="mt-6 grid gap-2">{hubs.slice(0, 12).map((p) => <button key={p.id} onClick={() => { setSelectedId(p.id); const target = mapRef.current as any; if (target) { target.center={lat:p.lat,lng:p.lon,altitude:5000}; target.range=250000; target.tilt=60; } }} className={`rounded-xl px-3 py-2 text-left text-sm ${p.id===selected?.id?'bg-slate-950 text-white':'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>{p.name_pt}</button>)}</div>
      </aside>
    </section>
  );
}
