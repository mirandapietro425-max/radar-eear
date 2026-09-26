import { useMemo, useState } from "react";
import raw from "../../../content/master/interdisciplinary-thinkers.json";

type Thinker = { id:string; name_pt:string; type?:string; dates?:string; themes?:string[]; overview_pt:string; math_science_pt?:string; theology_curiosity_pt?:string; works?: {title_pt:string;year?:string;focus_pt?:string;kind?:string}[]; daily_card_pt?:string };
const thinkers = [...(raw.thinkers||[]), ...(raw.sociologists||[])] as Thinker[];

export function InterdisciplinaryKnowledgePage(){
 const [q,setQ]=useState(""); const [kind,setKind]=useState("todos"); const [open,setOpen]=useState<string|null>(null);
 const kinds=useMemo(()=>Array.from(new Set(thinkers.map(t=>t.type||"outros"))),[]);
 const filtered=thinkers.filter(t=>{const a=(t.name_pt+" "+(t.overview_pt||"")+" "+(t.themes||[]).join(" ")).toLowerCase(); return a.includes(q.toLowerCase()) && (kind==='todos'||t.type===kind)});
 return <div className="mx-auto max-w-6xl px-5 py-8">
   <div className="mb-8 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
    <div><p className="text-xs uppercase tracking-[.2em] opacity-60">Biblioteca de ideias</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Pensamento que atravessa matérias.</h1><p className="mt-3 max-w-2xl opacity-70">Filosofia, sociologia, matemática, ciência e teologia em camadas: uma descoberta rápida, depois o aprofundamento com obras e fontes.</p></div>
    <div className="rounded-3xl border border-black/10 p-4"><label className="text-xs uppercase tracking-wider opacity-50">Buscar</label><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Newton, Weber, Marx, Pascal..." className="mt-2 w-full rounded-2xl border px-4 py-3 bg-transparent outline-none"/></div>
   </div>
   <div className="mb-6 flex gap-2 overflow-auto pb-1"><button onClick={()=>setKind('todos')} className={`rounded-full px-4 py-2 text-sm ${kind==='todos'?'bg-black text-white':'border'}`}>Todos</button>{kinds.map(k=><button key={k} onClick={()=>setKind(k)} className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${kind===k?'bg-black text-white':'border'}`}>{k.replaceAll('_',' ')}</button>)}</div>
   <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map(t=> <article key={t.id} className="group rounded-3xl border border-black/10 p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">{t.name_pt}</h2><p className="text-sm opacity-50">{t.dates}</p></div><span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] uppercase tracking-wider">{(t.type||'pensador').replaceAll('_',' ')}</span></div>
      <div className="mt-4 text-sm leading-6 opacity-80">{t.overview_pt}</div>
      <div className="mt-4 flex flex-wrap gap-1.5">{(t.themes||[]).slice(0,5).map(x=><span key={x} className="rounded-full border px-2 py-1 text-[11px]">{x}</span>)}</div>
      <button onClick={()=>setOpen(open===t.id?null:t.id)} className="mt-5 text-sm font-medium underline underline-offset-4">{open===t.id?'Fechar aprofundamento':'Abrir aprofundamento'}</button>
      {open===t.id && <div className="mt-4 space-y-4 border-t pt-4 text-sm leading-6">
         {t.math_science_pt&&<section><p className="text-[10px] uppercase tracking-wider opacity-50">Ciência / matemática</p><p>{t.math_science_pt}</p></section>}
         {t.theology_curiosity_pt&&<section><p className="text-[10px] uppercase tracking-wider opacity-50">Teologia / contexto</p><p>{t.theology_curiosity_pt}</p></section>}
         {t.works?.length&&<section><p className="text-[10px] uppercase tracking-wider opacity-50">Obras para continuar</p><div className="space-y-2">{t.works.map((w,i)=><div key={i} className="rounded-2xl bg-black/5 p-3"><b>{w.title_pt}</b>{w.year&&<span className="opacity-50"> · {w.year}</span>}{w.focus_pt&&<p className="mt-1 opacity-70">{w.focus_pt}</p>}</div>)}</div></section>}
      </div>}
   </article>)}</div>
 </div>
}
