import React, { useState } from "react";
import data from "../../data/content-v10/bible-skills-v10.json";

export default function BibleSkillsPage(){
 const [level,setLevel]=useState("todos"); const items=(data as any).items ?? []; const visible=level==='todos'?items:items.filter((x:any)=>x.level===level);
 return <section className="space-y-5"><header><p className="text-xs uppercase tracking-[.22em] opacity-60">Bíblia · Habilidades</p><h1 className="text-3xl font-semibold">Aprenda a estudar a Bíblia</h1><p className="opacity-70">Habilidades práticas para ler com contexto, discernimento e profundidade.</p></header><div className="flex gap-2 flex-wrap">{['todos','iniciante','intermediário','avançado'].map(x=><button key={x} onClick={()=>setLevel(x)} className="rounded-full border px-3 py-2 text-sm">{x}</button>)}</div><div className="grid gap-4 md:grid-cols-2">{visible.map((x:any)=><article key={x.id} className="rounded-3xl border p-5"><div className="text-xs opacity-60">{x.level}</div><h2 className="mt-1 text-xl">{x.title_pt}</h2><p className="mt-2 opacity-80">{x.description_pt}</p><div className="mt-4 text-sm opacity-70">Microdesafio adaptativo</div></article>)}</div></section>
}
