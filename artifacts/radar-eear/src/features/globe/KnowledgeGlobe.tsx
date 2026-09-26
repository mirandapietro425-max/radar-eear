
import { useEffect, useMemo, useRef, useState } from 'react';
import placesData from '../../data/world-knowledge-places-v14.json';
import curiosityData from '../../data/world-curiosity-cards-v14.json';
import localCuriosityData from '../../data/world-location-curiosity-pack-v16.json';
import regionData from '../../data/world-regions-v14.json';
import journeyData from '../../data/world-journeys-v16.json';
import { searchCommonsImage, type CommonsImage } from '../../lib/commons';
import { loadWorldBoundaries, type GeoJSONFeature } from '../../lib/worldBoundaries';
import '../../styles/world-globe-responsive-v16.css';

type Place = (typeof placesData.places)[number];
const places = placesData.places as Place[];
const curiosities = [...curiosityData.curiosities, ...localCuriosityData.cards];
const regionLabels = Object.fromEntries(regionData.regions.map((r:any)=>[r.id,r.name_pt]));
const journeys = journeyData.journeys;

function project(lat:number,lng:number,rotation:number,zoom:number){
  const lon=((lng+rotation+540)%360)-180; const rad=Math.PI/180;
  const phi=lat*rad, lam=lon*rad, cosPhi=Math.cos(phi);
  const x3=cosPhi*Math.sin(lam), y3=Math.sin(phi), z3=cosPhi*Math.cos(lam), scale=38*zoom;
  return {x:50+x3*scale,y:50-y3*scale,visible:z3>-0.12,depth:z3};
}
function featureRings(feature:GeoJSONFeature){
  const g=feature.geometry; if(!g) return [] as number[][][];
  if(g.type==='Polygon') return g.coordinates;
  if(g.type==='MultiPolygon') return g.coordinates.flat();
  if(g.type==='LineString') return [g.coordinates];
  if(g.type==='MultiLineString') return g.coordinates;
  return [];
}
function ringPath(ring:number[][],rotation:number,zoom:number){
  let out='',started=false;
  for(const [lng,lat] of ring){
    const p=project(lat,lng,rotation,zoom);
    if(!p.visible){started=false;continue}
    out+=(started?'L':'M')+p.x.toFixed(2)+' '+p.y.toFixed(2)+' '; started=true;
  }
  return out.trim();
}
function featureVisible(feature:GeoJSONFeature,rotation:number,zoom:number){
  const rings=featureRings(feature); if(!rings.length) return false;
  const pts=rings[0]; let lat=0,lng=0,n=0;
  for(const p of pts){lng+=p[0];lat+=p[1];n++} if(!n) return false;
  return project(lat/n,lng/n,rotation,zoom).visible;
}
function normalizeIso(v:string|undefined){return (v||'').trim().toUpperCase()}
function useCommons(place:Place|null){
  const [image,setImage]=useState<CommonsImage|null>(null); const [loading,setLoading]=useState(false);
  useEffect(()=>{let alive=true; if(!place){setImage(null);return}
    setLoading(true); searchCommonsImage(place.name_pt).then(n=>{if(alive){setImage(n);setLoading(false)}}).catch(()=>{if(alive){setImage(null);setLoading(false)}});
    return ()=>{alive=false};
  },[place?.id]); return {image,loading};
}

export default function KnowledgeGlobe(){
  const [rotation,setRotation]=useState(-20), [zoom,setZoom]=useState(1), [autoRotate,setAutoRotate]=useState(true);
  const [query,setQuery]=useState(''), [tag,setTag]=useState('todos'), [selectedRegion,setSelectedRegion]=useState('todos');
  const [selectedId,setSelectedId]=useState(places[0]?.id??''), [dragging,setDragging]=useState(false);
  const [boundaries,setBoundaries]=useState<GeoJSONFeature[]|null>(null);
  const dragRef=useRef({x:0,rotation:0});
  const dragFrameRef=useRef<number|null>(null);
  const dragPendingRef=useRef<number|null>(null);
  useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)'); if(m.matches) setAutoRotate(false);},[]);
  useEffect(()=>{let cancelled=false; const run=()=>loadWorldBoundaries().then(d=>{if(!cancelled)setBoundaries(d?.features??null)}); const idle=(window as any).requestIdleCallback; if(idle){const id=idle(run,{timeout:900}); return()=>{cancelled=true;(window as any).cancelIdleCallback?.(id)}} const id=window.setTimeout(run,180); return()=>{cancelled=true;window.clearTimeout(id)};},[]);
  const selected=useMemo(()=>places.find(p=>p.id===selectedId)??places[0]??null,[selectedId]);
  const { image, loading: imageLoading } = useCommons(selected);
  const allTags=useMemo(()=>['todos',...Array.from(new Set(places.flatMap(p=>p.tags??[]))).sort((a,b)=>a.localeCompare(b,'pt-BR'))],[]);
  const filtered=useMemo(()=>{
    const q=query.trim().toLocaleLowerCase('pt-BR');
    return places.filter(p=>{
      const matchesRegion=selectedRegion==='todos'||(() => {const r=(p.region||'').toLowerCase(); if(selectedRegion==='africa')return r.includes('africa'); if(selectedRegion==='asia')return r.includes('asia'); if(selectedRegion==='europe')return r.includes('europe'); if(selectedRegion==='oceania')return r.includes('oceania'); if(selectedRegion==='antarctica')return r.includes('antarctica'); if(selectedRegion==='south-america')return p.lat<12&&p.lon<-30; if(selectedRegion==='central-america-caribbean')return p.lat>=12&&p.lat<30&&p.lon<-30; if(selectedRegion==='north-america')return p.lat>=30&&p.lon<-30; return r.includes('americas')})();
      const matchesTag=tag==='todos'||p.tags?.includes(tag); const hay=`${p.name_pt} ${p.region} ${p.capital??''}`.toLocaleLowerCase('pt-BR');
      return matchesRegion&&matchesTag&&(!q||hay.includes(q));
    });
  },[query,tag,selectedRegion]);
  const dots=useMemo(()=>filtered.map(p=>({place:p,...project(p.lat,p.lon,rotation,zoom)})),[filtered,rotation,zoom]);
  const selectedCuriosities=useMemo(()=>curiosities.filter(c=>c.place_id===selected?.id).slice(-8),[selected]);
  useEffect(()=>{if(!autoRotate||dragging)return;let f=0,last=performance.now();const loop=(now:number)=>{const d=now-last;if(d>=30){last=now;setRotation(v=>v+d*.0022)}f=requestAnimationFrame(loop)};f=requestAnimationFrame(loop);return()=>cancelAnimationFrame(f)},[autoRotate,dragging]);
  const onPointerDown=(e:React.PointerEvent<HTMLDivElement>)=>{setDragging(true);setAutoRotate(false);dragRef.current={x:e.clientX,rotation};e.currentTarget.setPointerCapture(e.pointerId)};
  const onPointerMove=(e:React.PointerEvent<HTMLDivElement>)=>{if(!dragging)return;dragPendingRef.current=dragRef.current.rotation+(e.clientX-dragRef.current.x)*.33;if(dragFrameRef.current==null){dragFrameRef.current=requestAnimationFrame(()=>{if(dragPendingRef.current!=null)setRotation(dragPendingRef.current);dragFrameRef.current=null})}};
  const onPointerUp=(e:React.PointerEvent<HTMLDivElement>)=>{setDragging(false);if(dragFrameRef.current!=null){cancelAnimationFrame(dragFrameRef.current);dragFrameRef.current=null}if(dragPendingRef.current!=null)setRotation(dragPendingRef.current);e.currentTarget.releasePointerCapture?.(e.pointerId)};
  return <div className="radar-atlas-shell grid gap-4 xl:gap-6">
    <div className="radar-atlas-grid">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_32%,rgba(96,165,250,.18),transparent_38%),linear-gradient(180deg,#06111e,#02050a)] p-[var(--atlas-pad)] text-white shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[10px] font-mono uppercase tracking-[.25em] text-amber-300">Atlas global · v16</p><h2 className="radar-atlas-title mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">O planeta inteiro vira uma aula.</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Fronteiras, regiões, pontos de conhecimento e curiosidades locais convivem no mesmo globo — com carregamento progressivo para não sacrificar a experiência em telas menores.</p></div><div className="radar-atlas-meta rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right"><div className="text-2xl font-semibold">{places.length}</div><div className="text-[10px] uppercase tracking-widest text-white/50">pontos editoriais</div></div></div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="flex min-w-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span className="text-xs text-white/40">⌕</span><input aria-label="Buscar no atlas" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar país, cidade, região…" className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-white/30" /></label>
          <div className="radar-atlas-filters">{[['todos','Mundo'],['africa','África'],['asia','Ásia'],['europe','Europa'],['north-america','Am. Norte'],['central-america-caribbean','Am. Central'],['south-america','Am. Sul'],['oceania','Oceania'],['antarctica','Antártida']].map(([id,label])=><button key={id} type="button" onClick={()=>setSelectedRegion(id)} aria-pressed={selectedRegion===id} className={`rounded-full border px-3 py-2 text-xs whitespace-nowrap ${selectedRegion===id?'border-amber-300 bg-amber-300/15 text-amber-200':'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'}`}>{label}</button>)}</div>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1"><select value={tag} onChange={e=>setTag(e.target.value)} className="min-w-[160px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none">{allTags.map(t=><option key={t} value={t}>{t==='todos'?'Todos os temas':t}</option>)}</select><div className="ml-auto whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/40">{boundaries?'fronteiras carregadas':'carregando fronteiras…'}</div></div>
        <div className="radar-atlas-globe mt-5 touch-none select-none">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_27%,rgba(255,255,255,.20),transparent_8%),radial-gradient(circle_at_42%_36%,rgba(56,189,248,.20),transparent_34%),radial-gradient(circle_at_50%_52%,#0a2542,#04101d 58%,#01050b 72%)] shadow-[0_0_0_1px_rgba(255,255,255,.06),inset_-35px_-25px_70px_rgba(0,0,0,.8),0_0_120px_rgba(56,189,248,.15)]"/>
          <div className="pointer-events-none absolute inset-[7%] rounded-full border border-cyan-200/10 [background-image:linear-gradient(rgba(125,211,252,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,.08)_1px,transparent_1px)] [background-size:10%_10%] opacity-60" />
          <div className="pointer-events-none absolute inset-[4%] rounded-full border border-cyan-100/10" />
          <div className="radar-atlas-hit absolute inset-0 cursor-grab active:cursor-grabbing" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onDoubleClick={()=>setRotation(-20)} onWheel={e=>{e.preventDefault();setZoom(z=>Math.min(1.3,Math.max(.82,z-e.deltaY*.0007)))}}>
            <svg className="radar-atlas-boundary absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
              {(boundaries??[]).map((f,i)=>{if(!featureVisible(f,rotation,zoom))return null; const iso=normalizeIso(f.properties?.ISO_A2_EH||f.properties?.ISO_A2); const selectedIso=normalizeIso(selected?.iso2); const active=iso&&selectedIso===iso; return <g key={i} className={active?'opacity-90':'opacity-55'}>{featureRings(f).map((r,j)=><path key={j} d={ringPath(r,rotation,zoom)} fill="none" stroke={active?'rgba(251,191,36,.9)':'rgba(148,163,184,.38)'} strokeWidth={active?.25:.12} vectorEffect="non-scaling-stroke" />)}</g>})}
            </svg>
            {dots.map(({place,x,y,visible,depth})=>{if(!visible)return null;const sel=place.id===selected?.id;const size=sel?13:place.kind==='hub'?9:6;return <button key={place.id} type="button" title={place.name_pt} aria-label={`Abrir ${place.name_pt}`} onClick={e=>{e.stopPropagation();setSelectedId(place.id);setAutoRotate(false)}} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-transform ${sel?'z-20 scale-125 border-amber-200 bg-amber-300 shadow-[0_0_26px_rgba(251,191,36,.8)]':place.kind==='hub'?'border-cyan-100/70 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.45)] hover:scale-150':'border-white/70 bg-white shadow-[0_0_11px_rgba(255,255,255,.25)] hover:scale-150'}`} style={{left:`${x}%`,top:`${y}%`,width:size,height:size,opacity:Math.max(.35,.45+depth*.55)}} />})}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"><div className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[9px] font-mono uppercase tracking-widest text-white/50 backdrop-blur">arraste · roda · clique · fronteiras</div></div>
        </div>
        <div className="radar-atlas-actions mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4"><button type="button" onClick={()=>setAutoRotate(v=>!v)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10">{autoRotate?'Pausar rotação':'Rotação automática'}</button><button type="button" onClick={()=>setZoom(z=>Math.min(1.3,+(z+.08).toFixed(2)))} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">＋ Aproximar</button><button type="button" onClick={()=>setZoom(z=>Math.max(.82,+(z-.08).toFixed(2)))} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">− Afastar</button><span className="ml-auto text-[10px] text-white/40">{filtered.length} visíveis</span></div>
        <div className="mt-4 overflow-x-auto pb-1"><div className="flex min-w-max gap-3">{journeys.slice(0,6).map(j=><button key={j.id} type="button" onClick={()=>{const first=j.stops?.[0];if(first){setSelectedId(first);setAutoRotate(false)}}} className="w-60 snap-start rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"><div className="text-[10px] font-mono uppercase tracking-widest text-amber-300">Trilha mundial</div><div className="mt-1 text-sm font-semibold">{j.title_pt}</div><div className="mt-1 text-xs leading-5 text-white/55">{j.description_pt}</div></button>)}</div></div>
      </section>
      <aside className="radar-atlas-detail overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-xl">{selected&&<><div className="relative aspect-[16/9] overflow-hidden bg-slate-100">{image?<img src={image.thumbUrl} alt={image.title} className="h-full w-full object-cover" loading="lazy"/>:<div className="h-full w-full bg-[radial-gradient(circle_at_35%_35%,#cbd5e1,transparent_30%),linear-gradient(135deg,#0f172a,#1e3a5f)]"/>}<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white"><div className="text-[10px] uppercase tracking-[.22em] text-amber-300">{selected.kind==='hub'?'Lugar de conhecimento':'Cobertura mundial'}</div><h3 className="mt-1 text-3xl font-semibold">{selected.name_pt}</h3></div>{imageLoading&&<div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] text-white">buscando imagem…</div>}</div><div className="p-5 sm:p-6"><div className="mb-3 text-[10px] uppercase tracking-widest text-slate-400">{selected.region} {selected.capital?`· ${selected.capital}`:''}</div><div className="flex flex-wrap gap-2">{selected.tags?.map(t=><span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-600">{t}</span>)}</div><p className="mt-4 text-sm leading-7 text-slate-600">{selected.summary_pt}</p><div className="mt-5 rounded-2xl bg-slate-50 p-4"><div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Experiência</div><p className="mt-2 text-sm leading-6 text-slate-700">{selected.experience_pt}</p></div>{selectedCuriosities.length>0&&<div className="mt-5 space-y-3"><div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Curiosidades & trilhas locais</div>{selectedCuriosities.map(c=><div key={c.id} className="rounded-2xl border border-slate-200 p-4"><div className="text-sm font-semibold text-slate-900">{c.title_pt}</div><div className="mt-1 text-xs leading-5 text-slate-500">{c.prompt_pt}</div></div>)}</div>}<div className="mt-6 grid gap-2 sm:grid-cols-2"><a href={`https://earth.google.com/web/@${selected.lat},${selected.lon},1500000a,833333d,35y,0h,0t,0r`} target="_blank" rel="noreferrer" className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-xs font-semibold text-white hover:bg-slate-800">Abrir no Google Earth</a><a href={`https://www.google.com/maps/@?api=1&map_action=map&center=${selected.lat},${selected.lon}&zoom=7`} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-xs font-semibold text-slate-900 hover:bg-slate-50">Abrir no Google Maps</a></div>{image&&<div className="mt-4 text-[10px] leading-4 text-slate-400">Imagem: <a href={image.pageUrl} target="_blank" rel="noreferrer" className="underline">Wikimedia Commons</a>{image.license?` · ${image.license}`:''}{image.artist?` · ${image.artist}`:''}</div>}<div className="mt-5 border-t border-slate-200 pt-4"><div className="text-[10px] uppercase tracking-widest text-slate-400">Coordenadas</div><div className="mt-1 font-mono text-xs text-slate-600">{selected.lat.toFixed(4)}, {selected.lon.toFixed(4)}</div></div></div></>}</aside>
    </div>
  </div>
}
