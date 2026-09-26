
import React from 'react';
import math from '../../data/content-v11/math-explainers-v11.json';
import physics from '../../data/content-v11/physics-explainers-v11.json';
import portuguese from '../../data/content-v11/portuguese-explainers-v11.json';

const packs:any={matematica:math,fisica:physics,portugues:portuguese};
export default function SubjectExplainerDeck({domain}:{domain:keyof typeof packs}){
 const pack=packs[domain];
 return <section className="space-y-5"><h1 className="text-3xl font-semibold">Explorador de {domain}</h1><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{pack.items.map((x:any)=><article key={x.id} className="rounded-3xl border p-5"><h2 className="text-xl font-semibold">{x.title}</h2><p className="mt-2 opacity-80">{x.summary}</p><div className="mt-4 text-sm opacity-60">{x.experience}</div></article>)}</div></section>
}
