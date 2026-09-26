import React, { useMemo, useState } from "react";
import data from "../../data/content-v10/bible-curiosities-v10.json";

export default function BibleCuriositiesPage(){
  const [q,setQ]=useState("");
  const items=(data as any).items ?? [];
  const filtered=useMemo(()=>items.filter((x:any)=>`${x.title_pt} ${x.body_pt} ${x.category}`.toLowerCase().includes(q.toLowerCase())),[q]);
  return <section className="space-y-5">
    <header><p className="text-xs uppercase tracking-[.22em] opacity-60">Bíblia · Descobrir</p><h1 className="text-3xl font-semibold">Curiosidades bíblicas</h1><p className="opacity-70">Uma curiosidade por camada: texto, contexto, interpretação e fonte.</p></header>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar uma curiosidade…" className="w-full rounded-2xl border px-4 py-3 bg-transparent"/>
    <div className="grid gap-4 md:grid-cols-2">{filtered.map((x:any)=><article key={x.id} className="rounded-3xl border p-5">
      <div className="text-xs opacity-60">{x.category}</div><h2 className="mt-1 text-xl font-medium">{x.title_pt}</h2><p className="mt-3 opacity-80 leading-7">{x.body_pt}</p>
      <button className="mt-4 rounded-xl border px-3 py-2 text-sm">Explorar contexto</button>
    </article>)}</div>
  </section>
}
