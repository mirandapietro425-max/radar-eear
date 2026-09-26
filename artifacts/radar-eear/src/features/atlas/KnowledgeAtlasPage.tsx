import { useState } from 'react';
import KnowledgeGlobe from '../globe/KnowledgeGlobe';
import GoogleKnowledgeMap3DV18 from '../maps/GoogleKnowledgeMap3DV18';
import timelines from '../../../data/historical-timelines-v12.json';

export function KnowledgeAtlasPage() {
  const [mode, setMode] = useState<'globe'|'google'|'timeline'>('globe');
  const timeline = (timelines as any).religiao;
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-slate-950">
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl"><p className="mb-2 text-xs uppercase tracking-[0.24em] text-amber-700">Atlas do conhecimento</p><h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Do planeta ao detalhe.</h1><p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">Um globo que gira, pontos que contam histórias e uma ponte direta para o contexto 3D do Google. O lugar deixa de ser só localização: passa a ser parte da explicação.</p></div>
          <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200"><button onClick={() => setMode('globe')} className={`rounded-xl px-4 py-2 text-sm ${mode==='globe'?'bg-slate-950 text-white':'text-slate-600'}`}>Globo Radar</button><button onClick={() => setMode('google')} className={`rounded-xl px-4 py-2 text-sm ${mode==='google'?'bg-slate-950 text-white':'text-slate-600'}`}>Google 3D</button><button onClick={() => setMode('timeline')} className={`rounded-xl px-4 py-2 text-sm ${mode==='timeline'?'bg-slate-950 text-white':'text-slate-600'}`}>Linha do tempo</button></div>
        </div>
        {mode === 'globe' && <KnowledgeGlobe />}
        {mode === 'google' && <GoogleKnowledgeMap3DV18 />}
        {mode === 'timeline' && <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-8"><h2 className="text-2xl font-semibold">{timeline.title}</h2><div className="mt-8 space-y-5">{timeline.events.map((e:any) => <article key={e.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="text-xs uppercase tracking-widest text-amber-700">{e.date}</div><h3 className="mt-2 text-xl font-medium">{e.title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{e.text_pt}</p></article>)}</div></div>}
      </section>
    </main>
  );
}
