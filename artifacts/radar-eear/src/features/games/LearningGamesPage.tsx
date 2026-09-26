import React, { useMemo, useState } from "react";
import data from "../../data/content-v10/educational-games-v10.json";

export default function LearningGamesPage(){
 const [subject,setSubject]=useState('todos'); const items=(data as any).items ?? []; const visible=useMemo(()=>subject==='todos'?items:items.filter((x:any)=>x.subject===subject),[subject,items]);
 return <section className="space-y-5"><header><p className="text-xs uppercase tracking-[.22em] opacity-60">Aprender jogando</p><h1 className="text-3xl font-semibold">Laboratório de jogos</h1><p className="opacity-70">Jogos curtos para transformar erro em explicação e conceito em prática.</p></header><div className="flex flex-wrap gap-2">{['todos','portugues','ingles','matematica','fisica'].map(x=><button key={x} onClick={()=>setSubject(x)} className="rounded-full border px-3 py-2 text-sm">{x}</button>)}</div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visible.map((x:any)=><article key={x.id} className="rounded-3xl border p-5"><div className="text-xs opacity-60">{x.subject} · {x.skill}</div><h2 className="mt-1 text-xl">{x.title_pt}</h2><p className="mt-2 text-sm opacity-80">{x.mechanic_pt}</p><p className="mt-3 text-sm"><b>Você aprende:</b> {x.learning_goal_pt}</p><button className="mt-4 rounded-xl border px-3 py-2 text-sm">Jogar</button></article>)}</div></section>
}
