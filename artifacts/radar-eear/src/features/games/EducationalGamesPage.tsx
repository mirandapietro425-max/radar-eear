import { useMemo, useState } from 'react';
import { ExternalLink, Gamepad2, ShieldCheck, Sparkles } from 'lucide-react';
import games from '../../../data/educational-games.json';

const cn = (...c:(string|false|undefined)[]) => c.filter(Boolean).join(' ');

export default function EducationalGamesPage(){
  const [subject,setSubject]=useState('Todas');
  const items = useMemo(()=>games.games.filter(g=>subject==='Todas'||g.levels.includes(subject)),[subject]);
  return <div className="mx-auto max-w-[1280px]">
    <div className="mb-7 overflow-hidden rounded-3xl bg-[hsl(var(--primary))] p-6 text-[hsl(var(--primary-foreground))] sm:p-8 lg:p-10">
      <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[hsl(var(--sidebar-primary))]">Laboratório lúdico</p>
      <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-5xl">Jogos que fazem parte do estudo.</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[hsl(var(--primary-foreground)/.72)]">O Radar não precisa reinventar toda ferramenta. Ele pode abrir, incorporar ou auto-hospedar recursos que já têm valor educacional e adicionar uma camada de missão, contexto, nível e revisão.</p>
      <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-[hsl(var(--sidebar-primary)/.12)] px-3 py-1.5 font-mono text-[10px]">PhET</span><span className="rounded-full bg-[hsl(var(--sidebar-primary)/.12)] px-3 py-1.5 font-mono text-[10px]">GeoGebra</span><span className="rounded-full bg-[hsl(var(--sidebar-primary)/.12)] px-3 py-1.5 font-mono text-[10px]">Sudoku auto-hospedável</span></div>
    </div>
    <div className="mb-5 flex flex-wrap gap-2"><select value={subject} onChange={e=>setSubject(e.target.value)} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-xs font-semibold"><option>Todas</option><option>Matemática</option><option>Física</option></select></div>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map(game=><article key={game.id} className="panel overflow-hidden rounded-2xl">
        <div className="border-b border-[hsl(var(--border))] p-5"><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Gamepad2 size={18}/></span><span className="font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{game.integration}</span></div><h2 className="mt-5 font-display text-xl font-bold">{game.name}</h2><p className="mt-2 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{game.description_pt}</p></div>
        <div className="p-5"><p className="eyebrow">Níveis no Radar</p><div className="mt-2 flex flex-wrap gap-1.5">{game.levels.map(level=><span key={level} className="rounded-full bg-[hsl(var(--secondary)/.7)] px-2 py-1 text-[10px] font-semibold">{level}</span>)}</div><div className="mt-5 space-y-2 text-[11px] text-[hsl(var(--muted-foreground))]"><p className="flex items-center gap-2"><ShieldCheck size={13}/> Origem: {game.integration}</p>{game.integration&&<p className="flex items-center gap-2"><Sparkles size={13}/> Incorporável conforme as regras do provedor.</p>}</div><a href={game.url} target="_blank" rel="noreferrer" className={cn('mt-5 inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-3 py-2 text-xs font-bold text-[hsl(var(--primary-foreground))]')}>Abrir recurso <ExternalLink size={13}/></a></div>
      </article>)}
    </div>
  </div>;
}
