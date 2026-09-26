import { useMemo, useState } from 'react';
import { ArrowRight, Bookmark, CheckCircle2, FlaskConical, RotateCcw, Sparkles } from 'lucide-react';

type Item={id:string;section:string;concept_pt:string;question_pt:string;intuition_pt:string;rule_or_equation_pt:string;example_pt:string;visual_experience_pt:string;experience_flow_pt:string;common_errors_pt:string[];microchallenge_pt:string;exam_mode_pt:string;extension_pt:string};

export function SubjectDeepDivePageV19({ title, items }: { title:string; items:Item[] }) {
  const [section,setSection]=useState('Todas');
  const [active,setActive]=useState<string>(items[0]?.id ?? '');
  const [done,setDone]=useState<string[]>([]);
  const sections=useMemo(()=>['Todas',...Array.from(new Set(items.map(i=>i.section)))],[items]);
  const filtered=section==='Todas'?items:items.filter(i=>i.section===section);
  const activeItem=filtered.find(i=>i.id===active) ?? filtered[0];
  if(!activeItem) return null;
  const mark=()=>setDone(d=>d.includes(activeItem.id)?d:d.concat(activeItem.id));
  return <main className="mx-auto max-w-[1380px] px-4 py-6 sm:px-7 lg:px-10">
    <header className="grid gap-5 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
      <div><p className="eyebrow">Estudo profundo · CFS 2/2027</p><h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">Cada conceito segue a mesma rota: compreender → experimentar → resolver → revisar.</p></div>
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"><div className="flex items-center justify-between"><span className="eyebrow">Domínio desta rota</span><span className="font-mono text-xs">{done.length}/{items.length}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="h-full rounded-full bg-[hsl(var(--accent))] transition-all" style={{width:`${items.length?Math.round(done.length/items.length*100):0}%`}}/></div></div>
    </header>
    <div className="mt-7 flex gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Seções da matéria">{sections.map(s=><button key={s} onClick={()=>{setSection(s);setActive((s==='Todas'?items:items.filter(i=>i.section===s))[0]?.id??'')}} className={`min-h-11 shrink-0 rounded-full border px-4 text-xs font-bold ${section===s?'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]':'bg-[hsl(var(--card))]'}`}>{s}</button>)}</div>
    <section className="mt-6 grid gap-5 lg:grid-cols-[300px_1fr]">
      <aside className="panel rounded-2xl p-3"><div className="max-h-[62vh] space-y-1 overflow-y-auto pr-1">{filtered.map(i=><button key={i.id} onClick={()=>setActive(i.id)} className={`w-full rounded-xl p-3 text-left ${activeItem.id===i.id?'bg-[hsl(var(--secondary))]':''}`}><p className="text-xs font-bold">{i.concept_pt}</p><p className="mt-1 line-clamp-2 text-[10px] text-[hsl(var(--muted-foreground))]">{i.section}</p></button>)}</div></aside>
      <article className="panel overflow-hidden rounded-2xl"><div className="border-b border-[hsl(var(--border))] p-5 sm:p-7"><p className="eyebrow">{activeItem.section}</p><h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{activeItem.concept_pt}</h2><p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{activeItem.question_pt}</p></div>
        <div className="grid gap-px bg-[hsl(var(--border))] sm:grid-cols-2">
          {[[Sparkles,'Intuição',activeItem.intuition_pt],[FlaskConical,'Experiência',`${activeItem.visual_experience_pt}. ${activeItem.experience_flow_pt}`],[RotateCcw,'Regra',activeItem.rule_or_equation_pt],[CheckCircle2,'Questão',activeItem.exam_mode_pt]].map(([Icon,label,body])=><section key={String(label)} className="bg-[hsl(var(--card))] p-5 sm:p-6"><div className="flex items-center gap-2"><Icon size={16} className="text-[hsl(var(--accent))]"/><span className="eyebrow">{String(label)}</span></div><p className="mt-3 text-sm leading-7">{String(body)}</p></section>)}
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7"><div><p className="eyebrow">Erros comuns</p><ul className="mt-3 space-y-2">{activeItem.common_errors_pt.map(e=><li key={e} className="text-sm leading-6">{e}</li>)}</ul></div><div><p className="eyebrow">Desafio de transferência</p><p className="mt-3 text-sm leading-7">{activeItem.microchallenge_pt}</p><p className="mt-4 text-xs leading-6 text-[hsl(var(--muted-foreground))]">Extensão: {activeItem.extension_pt}</p></div></div>
        <div className="flex flex-wrap items-center gap-2 border-t border-[hsl(var(--border))] p-5 sm:p-6"><button onClick={mark} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-4 text-xs font-bold text-[hsl(var(--accent-foreground))]">{done.includes(activeItem.id)?<CheckCircle2 size={15}/>:<Bookmark size={15}/>} {done.includes(activeItem.id)?'Concluído':'Marcar como estudado'}</button><button onClick={()=>window.history.back()} className="min-h-11 rounded-xl border px-4 text-xs font-bold">Voltar</button><span className="ml-auto hidden text-xs text-[hsl(var(--muted-foreground))] sm:block">Progresso fica associado ao seu Radar quando integrado ao progressStore.</span></div>
      </article>
    </section>
  </main>;
}
