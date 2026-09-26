export function PrehistoricAnimalDetail({animal}:{animal:any}){
 return <section className="rounded-[2rem] border p-6 space-y-5">
   <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
     <div className="aspect-[16/10] rounded-3xl bg-neutral-100" aria-label={`Reconstrução visual de ${animal.name}`}></div>
     <div><p className="text-xs uppercase tracking-[0.2em] opacity-60">{animal.period}</p><h1 className="text-3xl font-semibold">{animal.name}</h1><p className="mt-3 opacity-70">{animal.habitat}</p></div>
   </div>
   <div className="grid gap-3 md:grid-cols-3"><div><b>Alimentação</b><p>{animal.likely_prey}</p></div><div><b>Predadores/competidores</b><p>{animal.predators_or_competitors}</p></div><div><b>Adaptações</b><p>{animal.adaptations}</p></div></div>
   <div className="rounded-2xl bg-neutral-50 p-4"><b>Como sabemos?</b><p className="mt-1">Nível de evidência: {animal.evidence_level}. O Radar separa registro fóssil de inferência ecológica.</p></div>
 </section>
}
