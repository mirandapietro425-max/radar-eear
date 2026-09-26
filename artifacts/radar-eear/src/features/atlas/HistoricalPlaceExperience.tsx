import { useState } from "react";

export function HistoricalPlaceExperience({ place }: { place:any }) {
  const [tab, setTab] = useState<"context"|"people"|"texts"|"media">("context");
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs uppercase tracking-widest text-amber-300">Experiência do lugar</p><h2 className="mt-1 text-3xl font-semibold">{place.name_pt}</h2></div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">3D + contexto</span>
      </div>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">{["context","people","texts","media"].map((t:any)=><button key={t} onClick={()=>setTab(t)} className={`rounded-xl px-3 py-2 text-sm ${tab===t?'bg-white text-slate-900':'bg-white/5 text-white/70'}`}>{t}</button>)}</div>
      <div className="mt-5 text-slate-300">
        {tab === "context" && <p>{place.context_pt}</p>}
        {tab === "people" && <p>Pessoas ligadas a este lugar são carregadas do catálogo de autores/personagens para abrir biografias, ideias e obras.</p>}
        {tab === "texts" && <p>Textos e capítulos relacionados são carregados por referência, sem misturar resumo autoral com reprodução integral protegida.</p>}
        {tab === "media" && <p>Imagens e vídeos exibidos aqui sempre carregam a proveniência e o estado de licença.</p>}
      </div>
    </section>
  );
}
