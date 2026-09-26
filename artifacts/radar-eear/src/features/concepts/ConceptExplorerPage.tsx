import React from "react";
import math from "../../data/content-v10/math-concept-depth-v10.json";
import physics from "../../data/content-v10/physics-concept-depth-v10.json";

export default function ConceptExplorerPage({subject='matematica'}:{subject?:'matematica'|'fisica'}){
 const items=subject==='matematica'?(math as any).items:(physics as any).items;
 return <section className="space-y-5"><header><p className="text-xs uppercase tracking-[.22em] opacity-60">{subject}</p><h1 className="text-3xl font-semibold">Conceitos em profundidade</h1><p className="opacity-70">Comece pela intuição, experimente, depois formalize.</p></header><div className="grid gap-4 md:grid-cols-2">{items.map((x:any)=><article key={x.id} className="rounded-3xl border p-5"><h2 className="text-xl">{x.title_pt}</h2><p className="mt-2 opacity-80">{x.intuitive_pt}</p><div className="mt-3 text-sm opacity-70">{x.visual_pt ?? x.experiment_pt}</div><button className="mt-4 rounded-xl border px-3 py-2 text-sm">Abrir experiência</button></article>)}</div></section>
}
