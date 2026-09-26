import { useMemo, useState } from 'react';
import timelines from '../../../data/historical-timelines-v12.json';
import artData from '../../../data/art-history-media-v12.json';

const tabs = [
  ['religiao','Religião'],['arte','Arte'],['literatura','Literatura'],['matematica','Matemática'],['fisica','Física'],['portugues','Português'],['ingles','Inglês']
] as const;

export default function HistoryHubPage(){
  const [tab,setTab]=useState<(typeof tabs)[number][0]>('religiao');
  const timeline = useMemo(()=> (timelines as any)[tab], [tab]);
  return <div className="mx-auto max-w-[1380px] pb-16">
    <header className="mb-7">
      <p className="eyebrow">Histórias que explicam o presente</p>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">A história por trás da matéria.</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">Cada linha do tempo conecta pessoas, lugares, obras, imagens e ideias. O aluno pode começar por uma curiosidade e terminar em uma experiência, uma leitura ou uma questão.</p>
    </header>
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">{tabs.map(([id,label])=><button key={id} onClick={()=>setTab(id)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${tab===id?'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]':'border-[hsl(var(--border))] bg-[hsl(var(--background))]'}`}>{label}</button>)}</div>
    <section className="panel rounded-3xl p-6 sm:p-8">
      <div className="max-w-3xl"><p className="eyebrow">Linha do tempo</p><h2 className="mt-2 font-display text-3xl font-bold">{timeline.title}</h2><p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{timeline.intro}</p></div>
      <div className="mt-9 space-y-5">{timeline.events.map((e:any,i:number)=><article key={`${e.date}-${e.title}`} className="grid gap-4 rounded-2xl border border-[hsl(var(--border))] p-5 md:grid-cols-[140px_1fr]"><div className="font-mono text-[11px] uppercase tracking-wider text-[hsl(var(--primary))]">{e.date}</div><div><h3 className="text-xl font-semibold">{e.title}</h3><p className="mt-2 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{e.text_pt}</p><div className="mt-3 flex flex-wrap gap-2">{e.tags.map((tag:string)=><span key={tag} className="rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1 text-[11px] font-semibold">{tag}</span>)}</div><button className="mt-4 text-xs font-bold text-[hsl(var(--primary))]">Abrir experiência</button></div></article>)}</div>
    </section>
    {tab==='arte' && <section className="mt-6 panel rounded-3xl p-6"><p className="eyebrow">Galeria</p><h2 className="mt-2 font-display text-3xl font-bold">Obras para olhar de perto</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{(artData.artworks as any[]).map((a:any)=><a key={a.id} href={a.source_url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-[hsl(var(--border))] p-4 hover:-translate-y-0.5"><div className="aspect-[4/3] rounded-xl bg-[linear-gradient(135deg,hsl(var(--primary)/.22),hsl(var(--secondary)))]"/><p className="mt-3 text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{a.movement}</p><h3 className="mt-1 font-semibold">{a.title}</h3><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{a.artist} · {a.date}</p></a>)}</div></section>}
  </div>
}
