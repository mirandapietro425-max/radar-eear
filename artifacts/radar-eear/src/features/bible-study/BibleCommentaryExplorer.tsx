
import React, {useMemo, useState} from 'react';
import contextData from '../../data/content-v11/bible-context-modules-v11.json';
import verseData from '../../data/content-v11/bible-deep-verse-study-cards-v11.json';

export default function BibleCommentaryExplorer(){
  const [mode,setMode]=useState<'context'|'verse'>('context');
  const items=useMemo(()=>mode==='context' ? contextData.items : verseData.items,[mode]);
  return <section className="space-y-5">
    <div className="flex items-center gap-2"><button onClick={()=>setMode('context')} className="rounded-full border px-4 py-2">Contextos</button><button onClick={()=>setMode('verse')} className="rounded-full border px-4 py-2">Estudo por passagem</button></div>
    <div className="grid gap-4 md:grid-cols-2">{items.map((x:any)=><article key={x.id} className="rounded-3xl border p-5 shadow-sm"><div className="text-xs uppercase tracking-widest opacity-60">{x.reference || 'Bíblia'}</div><h3 className="mt-2 text-xl font-semibold">{x.title || x.theme}</h3><p className="mt-2 opacity-80">{x.hook || x.academic || x.protestant || x.summary}</p><div className="mt-4 flex flex-wrap gap-2">{(x.layers || x.source_ids || []).map((t:any)=><span key={String(t)} className="rounded-full bg-black/5 px-2 py-1 text-xs">{String(t)}</span>)}</div></article>)}</div>
  </section>
}
