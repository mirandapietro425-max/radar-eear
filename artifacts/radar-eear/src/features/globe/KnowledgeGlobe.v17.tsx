import { memo, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import placesData from '../../data/world-knowledge-places-v14.json';
import curiosityData from '../../data/world-curiosity-cards-v14.json';
import { searchCommonsImage, type CommonsImage } from '../../lib/commons';
import { recordViewed } from '../final/progressStore';
import { loadWorldBoundaries, type GeoJSONFeature, type GeoJSONFeatureCollection } from '../../lib/worldBoundaries';

type Place = (typeof placesData.places)[number];
const places = placesData.places as Place[];
const curiosities = curiosityData.curiosities;

type Projection = { x: number; y: number; z: number; visible: boolean };

function project(lat: number, lng: number, rotation: number, latShift: number, zoom: number): Projection {
  const lon = ((lng + rotation + 540) % 360) - 180;
  const rad = Math.PI / 180;
  const phi = Math.max(-88, Math.min(88, lat + latShift)) * rad;
  const lam = lon * rad;
  const cosPhi = Math.cos(phi);
  const x3 = cosPhi * Math.sin(lam);
  const y3 = Math.sin(phi);
  const z3 = cosPhi * Math.cos(lam);
  const scale = 43 * zoom;
  return { x: 50 + x3 * scale, y: 50 - y3 * scale, z: z3, visible: z3 > -0.08 };
}

function ringPath(ring: number[][], rotation: number, latShift: number, zoom: number) {
  let d = '';
  let penDown = false;
  for (const pair of ring) {
    const [lng, lat] = pair;
    const p = project(lat, lng, rotation, latShift, zoom);
    if (p.visible) {
      d += `${penDown ? 'L' : 'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)} `;
      penDown = true;
    } else {
      penDown = false;
    }
  }
  return d.trim();
}

function featurePath(feature: GeoJSONFeature, rotation: number, latShift: number, zoom: number) {
  const geometry = feature.geometry;
  if (!geometry) return '';
  if (geometry.type === 'Polygon') return geometry.coordinates.map((ring) => ringPath(ring, rotation, latShift, zoom)).filter(Boolean).join(' ');
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flatMap((polygon) => polygon.map((ring) => ringPath(ring, rotation, latShift, zoom))).filter(Boolean).join(' ');
  if (geometry.type === 'LineString') return ringPath(geometry.coordinates, rotation, latShift, zoom);
  if (geometry.type === 'MultiLineString') return geometry.coordinates.map((line) => ringPath(line, rotation, latShift, zoom)).filter(Boolean).join(' ');
  return '';
}

const BoundaryLayer = memo(function BoundaryLayer({
  features,
  rotation,
  latShift,
  zoom,
}: {
  features: GeoJSONFeature[];
  rotation: number;
  latShift: number;
  zoom: number;
}) {
  return (
    <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id="radar-globe-clip"><circle cx="50" cy="50" r="49" /></clipPath>
      </defs>
      <g clipPath="url(#radar-globe-clip)" fill="none" stroke="rgba(186,230,253,.20)" strokeWidth="0.22" vectorEffect="non-scaling-stroke">
        {features.map((feature, index) => {
          const d = featurePath(feature, rotation, latShift, zoom);
          return d ? <path key={`${index}-${d.slice(0, 10)}`} d={d} /> : null;
        })}
      </g>
    </svg>
  );
});

function googleEarthUrl(place: Place) {
  return `https://earth.google.com/web/@${place.lat},${place.lon},1500000a,833333d,35y,0h,0t,0r`;
}
function mapUrl(place: Place) {
  return `https://www.google.com/maps/@?api=1&map_action=map&center=${place.lat},${place.lon}&zoom=7`;
}

function useCommons(place: Place | null) {
  const [image, setImage] = useState<CommonsImage | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let alive = true;
    if (!place) return undefined;
    setLoading(true);
    setImage(null);
    searchCommonsImage(place.name_pt).then((next) => {
      if (alive) { setImage(next); setLoading(false); }
    }).catch(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [place?.id]);
  return { image, loading };
}

export default function KnowledgeGlobeV17() {
  const [rotation, setRotation] = useState(-20);
  const [latShift, setLatShift] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [boundaries, setBoundaries] = useState<GeoJSONFeatureCollection | null>(null);
  const [boundariesLoading, setBoundariesLoading] = useState(true);
  const [kind, setKind] = useState<'todos' | 'hubs' | 'paises'>('todos');
  const [tag, setTag] = useState('todos');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(places[0]?.id ?? '');
  const [dragging, setDragging] = useState(false);
  const [panel, setPanel] = useState<'visao' | 'curiosidades' | 'fontes'>('visao');
  const dragRef = useRef({ x: 0, y: 0, rotation: 0, latShift: 0 });

  useEffect(() => {
    let alive = true;
    setBoundariesLoading(true);
    loadWorldBoundaries().then((next) => {
      if (!alive) return;
      setBoundaries(next);
      setBoundariesLoading(false);
    });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) setAutoRotate(false);
    const onChange = () => { if (reduce.matches) setAutoRotate(false); };
    reduce.addEventListener?.('change', onChange);
    return () => reduce.removeEventListener?.('change', onChange);
  }, []);

  const selected = useMemo(() => places.find((p) => p.id === selectedId) ?? places[0] ?? null, [selectedId]);
  const { image, loading: imageLoading } = useCommons(selected);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    places.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return ['todos', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'pt-BR'))];
  }, []);

  const filtered = useMemo(() => {
    const text = query.trim().toLocaleLowerCase('pt-BR');
    return places.filter((p) => {
      const matchesKind = kind === 'todos' || (kind === 'hubs' ? p.kind === 'hub' : p.kind === 'country');
      const matchesTag = tag === 'todos' || p.tags?.includes(tag);
      const hay = `${p.name_pt} ${p.region} ${p.capital ?? ''}`.toLocaleLowerCase('pt-BR');
      return matchesKind && matchesTag && (!text || hay.includes(text));
    });
  }, [kind, tag, query]);

  const dots = useMemo(() => filtered.map((place) => ({ place, ...project(place.lat, place.lon, rotation, latShift, zoom) })), [filtered, rotation, latShift, zoom]);
  const selectedCuriosities = useMemo(() => curiosities.filter((c) => c.place_id === selected?.id).slice(0, 6), [selected]);
  const boundaryRotation = useMemo(() => Math.round(rotation * 4) / 4, [rotation]);

  useEffect(() => {
    if (!autoRotate || dragging) return undefined;
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      if (now - last >= 42) {
        const delta = now - last;
        last = now;
        setRotation((value) => value + delta * 0.0022);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, dragging]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    setAutoRotate(false);
    dragRef.current = { x: event.clientX, y: event.clientY, rotation, latShift };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setRotation(dragRef.current.rotation + (event.clientX - dragRef.current.x) * 0.32);
    setLatShift(Math.max(-10, Math.min(10, dragRef.current.latShift + (event.clientY - dragRef.current.y) * 0.12)));
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const jumpToSelected = (place: Place) => {
    setSelectedId(place.id);
    recordViewed(`place:${place.id}`, place.name_pt, 'Lugar');
    setAutoRotate(false);
    setPanel('visao');
  };

  return (
    <section className="radar-atlas-shell grid gap-5 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,.82fr)]" aria-label="Atlas global do Radar EEAR">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_32%,rgba(96,165,250,.18),transparent_38%),linear-gradient(180deg,#06111e,#02050a)] p-4 text-white shadow-2xl sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="radar-atlas-meta text-[10px] font-mono uppercase tracking-[.25em] text-amber-300">Atlas global · v17</p>
            <h2 className="radar-atlas-title mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">O mundo inteiro vira uma aula.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Arraste, incline e aproxime. O lugar abre história, ciência, religião, matemática, física, filosofia, literatura, ecologia, arte e cultura.</p>
          </div>
          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right"><div className="text-2xl font-semibold tabular-nums">{filtered.length}</div><div className="text-[10px] uppercase tracking-widest text-white/50">visíveis</div></div>
        </div>
        <div className="radar-atlas-filters mt-5 flex gap-2 rounded-2xl border border-white/10 bg-white/[.035] p-2">
          <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5"><span className="text-xs text-white/40">⌕</span><input aria-label="Buscar país, cidade ou região" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar país, cidade ou região…" className="w-full bg-transparent text-sm outline-none placeholder:text-white/30" /></label>
          <select aria-label="Filtrar tipo de lugar" value={kind} onChange={(e) => setKind(e.target.value as typeof kind)} className="min-h-11 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none"><option value="todos">Todos</option><option value="hubs">Lugares-hub</option><option value="paises">Países / territórios</option></select>
          <select aria-label="Filtrar tema" value={tag} onChange={(e) => setTag(e.target.value)} className="min-h-11 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none">{allTags.map((item) => <option key={item} value={item}>{item === 'todos' ? 'Todos os temas' : item}</option>)}</select>
        </div>
        <div className="radar-atlas-globe relative mx-auto mt-6 aspect-square max-w-[780px] touch-none select-none" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onDoubleClick={() => { setRotation(-20); setLatShift(0); setZoom(1); }} onWheel={(event) => { event.preventDefault(); setZoom((z) => Math.min(1.28, Math.max(.84, z - event.deltaY * 0.0007))); }}>
          <div className="absolute inset-[3.5%] rounded-full bg-[radial-gradient(circle_at_35%_27%,rgba(255,255,255,.20),transparent_8%),radial-gradient(circle_at_42%_36%,rgba(56,189,248,.20),transparent_34%),radial-gradient(circle_at_50%_52%,#0a2542,#04101d 58%,#01050b 72%)] shadow-[0_0_0_1px_rgba(255,255,255,.06),inset_-35px_-25px_70px_rgba(0,0,0,.8),0_0_120px_rgba(56,189,248,.15)]" />
          <div className="pointer-events-none absolute inset-[8%] rounded-full border border-cyan-200/10 [background-image:linear-gradient(rgba(125,211,252,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,.08)_1px,transparent_1px)] [background-size:10%_10%] opacity-60" />
          <div className="pointer-events-none absolute inset-[4%] rounded-full border border-cyan-100/10 shadow-[0_0_55px_rgba(56,189,248,.08)]" />
          {boundaries && <BoundaryLayer features={boundaries.features} rotation={boundaryRotation} latShift={latShift} zoom={zoom} />}
          <div className="absolute inset-0">
            {dots.map(({ place, x, y, visible, depth }) => {
              if (!visible) return null;
              const selectedDot = place.id === selected?.id;
              const size = selectedDot ? 12 : place.kind === 'hub' ? 8 : 5;
              const opacity = Math.max(.35, Math.min(1, .45 + depth * .55));
              return (
                <button key={place.id} type="button" title={place.name_pt} aria-label={`Abrir ${place.name_pt}`} onClick={(e) => { e.stopPropagation(); jumpToSelected(place); }} className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform ${selectedDot ? 'scale-110 border-amber-200 bg-amber-300 shadow-[0_0_26px_rgba(251,191,36,.8)]' : place.kind === 'hub' ? 'border-cyan-100/70 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.45)] hover:scale-125' : 'border-white/70 bg-white shadow-[0_0_11px_rgba(255,255,255,.25)] hover:scale-125'}`} style={{ left: `${x}%`, top: `${y}%`, width: 44, height: 44, opacity }}>
                  <span className="rounded-full border border-current" style={{ width: size, height: size }} aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"><div className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[9px] font-mono uppercase tracking-widest text-white/50 backdrop-blur">arraste · roda · duplo clique centraliza</div></div>
        </div>
        <div className="radar-atlas-actions mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <button type="button" onClick={() => setAutoRotate((v) => !v)} className="min-h-11 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10">{autoRotate ? 'Pausar rotação' : 'Rotação automática'}</button>
          <button type="button" onClick={() => setZoom((z) => Math.min(1.28, +(z + .08).toFixed(2)))} className="min-h-11 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs">＋ Aproximar</button>
          <button type="button" onClick={() => setZoom((z) => Math.max(.84, +(z - .08).toFixed(2)))} className="min-h-11 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs">− Afastar</button>
          <span className="ml-auto text-[10px] text-white/40">{boundariesLoading ? 'carregando fronteiras…' : boundaries ? 'fronteiras carregadas' : 'modo leve ativo'}</span>
        </div>
      </div>

      <aside className="radar-atlas-detail overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-xl">
        {selected && <>
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            {image ? <img src={image.thumbUrl} alt={image.title} className="h-full w-full object-cover" loading="lazy" /> : <div className="h-full w-full bg-[radial-gradient(circle_at_35%_35%,#cbd5e1,transparent_30%),linear-gradient(135deg,#0f172a,#1e3a5f)]" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 text-white"><div className="text-[10px] uppercase tracking-[.22em] text-amber-300">{selected.kind === 'hub' ? 'Lugar de conhecimento' : 'Cobertura mundial'}</div><h3 className="mt-1 text-3xl font-semibold">{selected.name_pt}</h3></div>
            {imageLoading && <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] text-white">buscando imagem…</div>}
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex min-h-11 gap-1 overflow-x-auto rounded-xl bg-slate-50 p-1" role="tablist" aria-label="Conteúdo do lugar">
              {([['visao','Visão geral'],['curiosidades','Curiosidades'],['fontes','Fontes']] as const).map(([id,label]) => <button key={id} type="button" role="tab" aria-selected={panel===id} onClick={() => setPanel(id)} className={`min-h-9 flex-none rounded-lg px-3 py-2 text-xs font-semibold ${panel===id?'bg-slate-900 text-white':'text-slate-500 hover:bg-white'}`}>{label}</button>)}
            </div>
            {panel === 'visao' && <>
              <div className="mt-4 flex flex-wrap gap-2">{selected.tags?.map((t) => <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-600">{t}</span>)}</div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{selected.summary_pt}</p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4"><div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Próxima descoberta</div><p className="mt-2 text-sm leading-6 text-slate-700">{selected.experience_pt}</p></div>
              {selectedCuriosities[0] && <button type="button" onClick={() => setPanel('curiosidades')} className="mt-5 w-full rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left hover:bg-amber-100"><div className="text-[10px] font-mono uppercase tracking-widest text-amber-700">Curiosidade sugerida</div><div className="mt-2 text-sm font-semibold text-slate-900">{selectedCuriosities[0].title_pt}</div><div className="mt-1 text-xs leading-5 text-slate-600">Abrir as curiosidades deste lugar →</div></button>}
            </>}
            {panel === 'curiosidades' && <div className="mt-4 space-y-3">{selectedCuriosities.length ? selectedCuriosities.map((c) => <article key={c.id} className="rounded-2xl border border-slate-200 p-4"><div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{c.category}</div><div className="mt-1 text-sm font-semibold text-slate-900">{c.title_pt}</div><div className="mt-1 text-xs leading-5 text-slate-500">{c.prompt_pt}</div></article>) : <p className="mt-4 text-sm text-slate-500">Este ponto ainda está em curadoria. Use os temas e as fontes do local para continuar a pesquisa.</p>}</div>}
            {panel === 'fontes' && <div className="mt-4 space-y-3"><p className="text-sm leading-6 text-slate-600">As informações editoriais deste ponto são separadas das fronteiras cartográficas. O local não define a fronteira legal.</p><div className="rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-600">Fontes associadas: {(selected.source_ids ?? []).join(' · ')}</div></div>}
            <div className="mt-6 grid gap-2 sm:grid-cols-2"><a href={googleEarthUrl(selected)} target="_blank" rel="noreferrer" className="min-h-11 rounded-2xl bg-slate-900 px-4 py-3 text-center text-xs font-semibold text-white hover:bg-slate-800">Abrir no Google Earth</a><a href={mapUrl(selected)} target="_blank" rel="noreferrer" className="min-h-11 rounded-2xl border border-slate-200 px-4 py-3 text-center text-xs font-semibold text-slate-900 hover:bg-slate-50">Abrir no Google Maps</a></div>
            {image && <div className="mt-4 text-[10px] leading-4 text-slate-400">Imagem: <a href={image.pageUrl} target="_blank" rel="noreferrer" className="underline">Wikimedia Commons</a>{image.license ? ` · ${image.license}` : ''}{image.artist ? ` · ${image.artist}` : ''}</div>}
            <div className="mt-5 border-t border-slate-200 pt-4"><div className="text-[10px] uppercase tracking-widest text-slate-400">Coordenadas</div><div className="mt-1 font-mono text-xs text-slate-600">{selected.lat.toFixed(4)}, {selected.lon.toFixed(4)}</div></div>
          </div>
        </>}
      </aside>
    </section>
  );
}
