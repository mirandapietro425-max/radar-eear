import { useEffect, useMemo, useRef, useState } from 'react';
import placesData from '../../data/world-knowledge-places-v14.json';
import curiosityData from '../../data/world-curiosity-cards-v14.json';
import { searchCommonsImage, type CommonsImage } from '../../lib/commons';

type Place = (typeof placesData.places)[number];
const places = placesData.places as Place[];
const curiosities = curiosityData.cards;

function project(lat: number, lng: number, rotation: number, zoom: number) {
  const lon = ((lng + rotation + 540) % 360) - 180;
  const rad = Math.PI / 180;
  const phi = lat * rad;
  const lam = lon * rad;
  const cosPhi = Math.cos(phi);
  const x3 = cosPhi * Math.sin(lam);
  const y3 = Math.sin(phi);
  const z3 = cosPhi * Math.cos(lam);
  const scale = 38 * zoom;
  return { x: 50 + x3 * scale, y: 50 - y3 * scale, visible: z3 > -0.16, depth: z3 };
}

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
    searchCommonsImage(place.name_pt).then((next) => {
      if (alive) { setImage(next); setLoading(false); }
    });
    return () => { alive = false; };
  }, [place?.id]);
  return { image, loading };
}

export default function KnowledgeGlobe() {
  const [rotation, setRotation] = useState(-20);
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) setAutoRotate(false);
  }, []);
  const [kind, setKind] = useState<'todos' | 'hubs' | 'paises'>('todos');
  const [tag, setTag] = useState('todos');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(places[0]?.id ?? '');
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ x: 0, rotation: 0 });

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

  const dots = useMemo(() => filtered.map((place) => ({ place, ...project(place.lat, place.lon, rotation, zoom) })), [filtered, rotation, zoom]);
  const selectedCuriosities = useMemo(() => curiosities.filter((c) => c.place_id === selected?.id).slice(0, 4), [selected]);

  useEffect(() => {
    if (!autoRotate || dragging) return undefined;
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const delta = now - last;
      last = now;
      setRotation((value) => value + delta * 0.003);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, dragging]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    setAutoRotate(false);
    dragRef.current = { x: event.clientX, rotation };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setRotation(dragRef.current.rotation + (event.clientX - dragRef.current.x) * 0.35);
  };
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,.8fr)]">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_32%,rgba(96,165,250,.18),transparent_38%),linear-gradient(180deg,#06111e,#02050a)] p-4 text-white shadow-2xl sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[.25em] text-amber-300">Atlas global · v14</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">O mundo inteiro vira uma aula.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Arraste o globo, gire, aproxime e escolha um ponto. O lugar abre história, ciência, religião, matemática, física, filosofia, literatura, ecologia e cultura.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right"><div className="text-2xl font-semibold">{places.length}</div><div className="text-[10px] uppercase tracking-widest text-white/50">pontos</div></div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span className="text-xs text-white/40">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar país, cidade, região…" className="w-full bg-transparent text-sm outline-none placeholder:text-white/30" /></label>
          <select value={kind} onChange={(e) => setKind(e.target.value as typeof kind)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"><option value="todos">Todos</option><option value="hubs">Lugares-hub</option><option value="paises">Países / territórios</option></select>
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none">{allTags.map((item) => <option key={item} value={item}>{item === 'todos' ? 'Todos os temas' : item}</option>)}</select>
        </div>
        <div className="relative mx-auto mt-6 aspect-square max-w-[760px] touch-none select-none">
          <div className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle_at_35%_27%,rgba(255,255,255,.20),transparent_8%),radial-gradient(circle_at_42%_36%,rgba(56,189,248,.20),transparent_34%),radial-gradient(circle_at_50%_52%,#0a2542,#04101d 58%,#01050b 72%)] shadow-[0_0_0_1px_rgba(255,255,255,.06),inset_-35px_-25px_70px_rgba(0,0,0,.8),0_0_120px_rgba(56,189,248,.15)]" />
          <div className="pointer-events-none absolute inset-[8%] rounded-full border border-cyan-200/10 [background-image:linear-gradient(rgba(125,211,252,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,.08)_1px,transparent_1px)] [background-size:10%_10%] opacity-60" />
          <div className="pointer-events-none absolute inset-[4%] rounded-full border border-cyan-100/10 shadow-[0_0_55px_rgba(56,189,248,.08)]" />
          <div className="absolute inset-0 cursor-grab active:cursor-grabbing" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onDoubleClick={() => setRotation(-20)} onWheel={(event) => { event.preventDefault(); setZoom((z) => Math.min(1.28, Math.max(.84, z - event.deltaY * 0.0007))); }}>
            {dots.map(({ place, x, y, visible, depth }) => {
              if (!visible) return null;
              const selectedDot = place.id === selected?.id;
              const size = selectedDot ? 13 : place.kind === 'hub' ? 9 : 6;
              const opacity = Math.max(.35, Math.min(1, .45 + depth * .55));
              return <button key={place.id} type="button" title={place.name_pt} aria-label={`Abrir ${place.name_pt}`} onClick={(e) => { e.stopPropagation(); setSelectedId(place.id); setAutoRotate(false); }} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-transform ${selectedDot ? 'z-20 scale-125 border-amber-200 bg-amber-300 shadow-[0_0_26px_rgba(251,191,36,.8)]' : place.kind === 'hub' ? 'border-cyan-100/70 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.45)] hover:scale-150' : 'border-white/70 bg-white shadow-[0_0_11px_rgba(255,255,255,.25)] hover:scale-150'}`} style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, opacity }} />;
            })}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"><div className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[9px] font-mono uppercase tracking-widest text-white/50 backdrop-blur">arraste · roda · duplo clique centraliza</div></div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <button type="button" onClick={() => setAutoRotate((v) => !v)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10">{autoRotate ? 'Pausar rotação' : 'Rotação automática'}</button>
          <button type="button" onClick={() => setZoom((z) => Math.min(1.28, +(z + .08).toFixed(2)))} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">＋ Aproximar</button>
          <button type="button" onClick={() => setZoom((z) => Math.max(.84, +(z - .08).toFixed(2)))} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">− Afastar</button>
          <span className="ml-auto text-[10px] text-white/40">{filtered.length} visíveis</span>
        </div>
      </section>
      <aside className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-xl">
        {selected && <>
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            {image ? <img src={image.thumbUrl} alt={image.title} className="h-full w-full object-cover" loading="lazy" /> : <div className="h-full w-full bg-[radial-gradient(circle_at_35%_35%,#cbd5e1,transparent_30%),linear-gradient(135deg,#0f172a,#1e3a5f)]" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white"><div className="text-[10px] uppercase tracking-[.22em] text-amber-300">{selected.kind === 'hub' ? 'Lugar de conhecimento' : 'Cobertura mundial'}</div><h3 className="mt-1 text-3xl font-semibold">{selected.name_pt}</h3></div>
            {imageLoading && <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] text-white">buscando imagem…</div>}
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">{selected.tags?.map((t) => <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-600">{t}</span>)}</div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{selected.summary_pt}</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4"><div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Experiência</div><p className="mt-2 text-sm leading-6 text-slate-700">{selected.experience_pt}</p></div>
            {selectedCuriosities.length > 0 && <div className="mt-5 space-y-3"><div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Curiosidades</div>{selectedCuriosities.map((c) => <div key={c.id} className="rounded-2xl border border-slate-200 p-4"><div className="text-sm font-semibold text-slate-900">{c.title_pt}</div><div className="mt-1 text-xs leading-5 text-slate-500">{c.prompt_pt}</div></div>)}</div>}
            <div className="mt-6 grid gap-2 sm:grid-cols-2"><a href={googleEarthUrl(selected)} target="_blank" rel="noreferrer" className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-xs font-semibold text-white hover:bg-slate-800">Abrir no Google Earth</a><a href={mapUrl(selected)} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-xs font-semibold text-slate-900 hover:bg-slate-50">Abrir no Google Maps</a></div>
            {image && <div className="mt-4 text-[10px] leading-4 text-slate-400">Imagem: <a href={image.pageUrl} target="_blank" rel="noreferrer" className="underline">Wikimedia Commons</a>{image.license ? ` · ${image.license}` : ''}{image.artist ? ` · ${image.artist}` : ''}</div>}
            <div className="mt-5 border-t border-slate-200 pt-4"><div className="text-[10px] uppercase tracking-widest text-slate-400">Coordenadas</div><div className="mt-1 font-mono text-xs text-slate-600">{selected.lat.toFixed(4)}, {selected.lon.toFixed(4)}</div></div>
          </div>
        </>}
      </aside>
    </div>
  );
}
