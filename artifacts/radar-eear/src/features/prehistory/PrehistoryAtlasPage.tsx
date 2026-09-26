import { useMemo, useState } from "react";
import fauna from "../../../content/v13/prehistoric-fauna-catalog-v13.json";

export function PrehistoryAtlasPage(){
  const [query,setQuery]=useState("");
  const filtered=useMemo(()=>fauna.filter((x:any)=>`${x.name} ${x.period} ${x.region}`.toLowerCase().includes(query.toLowerCase())),[query]);
  return <main className="space-y-6">
    <header><p className="text-xs uppercase tracking-[0.2em] opacity-60">ATLAS • PRÉ-HISTÓRIA</p><h1 className="text-4xl font-semibold">Fauna, humanos e mundos desaparecidos</h1><p className="max-w-3xl opacity-70">Explore animais extintos, habitats, relações ecológicas e evidências arqueológicas com distinção clara entre o que sabemos e o que inferimos.</p></header>
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar animal, período ou região…" className="w-full rounded-2xl border px-4 py-3"/>
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((x:any)=><article key={x.id} className="rounded-3xl border p-5 hover:-translate-y-0.5 transition">
      <div className="text-xs opacity-60">{x.period} • {x.region}</div><h2 className="mt-2 text-xl font-semibold">{x.name}</h2><p className="mt-2 text-sm opacity-70">{x.habitat}</p><div className="mt-4 text-sm"><strong>Função:</strong> {x.trophic_role}</div><div className="mt-2 text-sm"><strong>Adaptação:</strong> {x.adaptations}</div><div className="mt-4 text-xs opacity-60">Evidência: {x.evidence_level}</div>
    </article>)}</section>
  </main>
}
