import { useMemo, useState } from 'react';
import { BookOpen, ChevronRight, CircleHelp, Globe2, Lightbulb, Quote, Search, Sparkles } from 'lucide-react';
import data from '../../data/faith-bible-study.json';
import philosophers from '../../data/philosophers.json';
import theologians from '../../data/theologians.json';

export default function FaithStudyPage(){
 const [filter,setFilter]=useState<'all'|'bible'|'philosophy'|'theology'>('all');
 const [selected,setSelected]=useState<any>(null);
 const items=useMemo(()=>{
   const bible=data.stories.map((x:any)=>({...x,type:'bible'}));
   const phil=philosophers.philosophers.map((x:any)=>({...x,type:'philosophy'}));
   const theo=theologians.theologians.map((x:any)=>({...x,type:'theology'}));
   return [...bible,...phil,...theo].filter((x:any)=>filter==='all'||x.type===filter);
 },[filter]);
 return <div className='mx-auto max-w-[1280px]'>
   <section className='mb-7 overflow-hidden rounded-3xl bg-[hsl(var(--primary))] p-6 text-[hsl(var(--primary-foreground))] sm:p-9'>
    <p className='font-mono text-[10px] uppercase tracking-[.2em] text-[hsl(var(--sidebar-primary))]'>Sala de estudos • Bíblia • Filosofia • Teologia</p>
    <h1 className='mt-3 max-w-4xl font-display text-3xl font-bold sm:text-5xl'>Conhecimento profundo, uma leitura por vez.</h1>
    <p className='mt-4 max-w-3xl text-sm leading-relaxed text-[hsl(var(--primary-foreground)/.72)]'>Histórias bíblicas estudadas em camadas, pensadores contextualizados e perspectivas religiosas identificadas por tradição. A lente protestante aparece com destaque quando selecionada, sem apagar as demais tradições.</p>
   </section>
   <div className='mb-6 flex flex-wrap gap-2'>
    {[['all','Tudo'],['bible','Bíblia'],['philosophy','Filósofos'],['theology','Teólogos']].map(([id,label])=><button key={id} onClick={()=>setFilter(id as any)} className={'rounded-full border px-3 py-2 text-xs font-bold '+(filter===id?'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white':'border-[hsl(var(--border))] bg-[hsl(var(--card))]')}>{label}</button>)}
    <span className='ml-auto flex items-center gap-2 rounded-full bg-[hsl(var(--secondary))] px-3 py-2 font-mono text-[9px] uppercase tracking-wider'><Sparkles size={12}/> rotação diária ativa</span>
   </div>
   <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
    {items.slice(0,24).map((item:any)=><button key={item.id} onClick={()=>setSelected(item)} className='panel rounded-2xl p-5 text-left transition-transform hover:-translate-y-1'>
      <div className='flex items-center gap-2 text-[hsl(var(--accent))]'><span className='font-mono text-[9px] uppercase tracking-wider'>{item.type}</span><ChevronRight size={13} className='ml-auto'/></div>
      <h2 className='mt-3 font-display text-xl font-bold'>{item.title||item.name}</h2>
      <p className='mt-2 line-clamp-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]'>{item.overview}</p>
    </button>)}
   </div>
   {selected && <div className='fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-3 sm:items-center' onClick={()=>setSelected(null)}>
      <article className='max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[hsl(var(--card))] p-6 shadow-2xl sm:p-8' onClick={e=>e.stopPropagation()}>
       <div className='flex items-center gap-2 text-[hsl(var(--accent))]'><BookOpen size={16}/><span className='eyebrow'>{selected.type}</span></div>
       <h2 className='mt-3 font-display text-3xl font-bold'>{selected.title||selected.name}</h2>
       {selected.references && <p className='mt-2 font-mono text-[10px] text-[hsl(var(--muted-foreground))]'>{selected.references}</p>}
       <p className='mt-6 text-sm leading-7'>{selected.overview}</p>
       {selected.protestant_lens && <section className='mt-6 rounded-2xl border border-[hsl(var(--accent)/.28)] bg-[hsl(var(--accent)/.06)] p-5'><div className='flex items-center gap-2 text-[hsl(var(--accent))]'><Quote size={15}/><span className='font-mono text-[9px] uppercase tracking-wider'>Lente protestante selecionada</span></div><p className='mt-3 text-sm leading-7'>{selected.protestant_lens}</p></section>}
       {selected.jewish_view && <section className='mt-4 rounded-2xl bg-[hsl(var(--secondary)/.55)] p-5'><div className='flex items-center gap-2'><Globe2 size={15}/><span className='font-mono text-[9px] uppercase tracking-wider'>Judaísmo</span></div><p className='mt-3 text-sm leading-7'>{selected.jewish_view}</p></section>}
       {selected.islamic_view && <section className='mt-4 rounded-2xl bg-[hsl(var(--secondary)/.55)] p-5'><div className='flex items-center gap-2'><Globe2 size={15}/><span className='font-mono text-[9px] uppercase tracking-wider'>Islã</span></div><p className='mt-3 text-sm leading-7'>{selected.islamic_view}</p></section>}
       <button onClick={()=>setSelected(null)} className='mt-6 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-bold text-white'>Fechar estudo</button>
      </article>
   </div>}
 </div>
}
