import { useMemo, useState } from 'react';
import { BookOpenText, Calculator, Compass, Lightbulb, MapPin, Search, Sparkles, Waves } from 'lucide-react';
import formulaDerivations from '../../../data/formula-derivations.json';
import locations from '../../../data/historical-locations.json';
import ReadingLibraryPage from '../library/ReadingLibraryPage';
import ThinkerTrailsPage from '../thinkers/ThinkerTrailsPage';

const tabs = [
  {id:'curiosidades',label:'Curiosidades',icon:Lightbulb},
  {id:'demonstrações',label:'Demonstrações',icon:Calculator},
  {id:'lugares',label:'Mapa histórico',icon:MapPin},
  {id:'laboratorio',label:'Laboratórios',icon:Waves},
  {id:'biblioteca',label:'Biblioteca',icon:BookOpenText},
  {id:'pensadores',label:'Pensadores',icon:Compass},
] as const;

export default function KnowledgeExplorePage(){
  const [tab,setTab]=useState<(typeof tabs)[number]['id']>('curiosidades');
  const [query,setQuery]=useState('');
  const curiosities = useMemo(()=>[
    'Os babilônios desenvolveram tradições matemáticas em base 60; o legado aparece até hoje em medidas de tempo e ângulo.',
    'A matemática egípcia registrada em papiros inclui frações, áreas e problemas práticos.',
    'Alexandria tornou-se um importante centro histórico de matemática e ciência associado a Euclides e outros estudiosos.',
    'Galileu nasceu em Pisa e lecionou em Pádua por dezoito anos, conectando matemática, observação e estudo do movimento.',
    'Al-Khwarizmi ajudou a consolidar métodos sistemáticos para a resolução de equações; a palavra “algoritmo” tem relação histórica com seu nome latinizado.',
    'Um gráfico não é apenas um desenho: ele é uma representação que pode tornar relações entre grandezas mais fáceis de perceber.'
  ],[]);
  const filtered = curiosities.filter(c=>c.toLowerCase().includes(query.toLowerCase()));
  return <div className="mx-auto max-w-[1280px]">
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Sala de conhecimento</p><h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Descobrir</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Uma camada de leitura, demonstração, mapa, biblioteca e pensamento que se conecta ao edital sem virar uma coleção solta de curiosidades.</p></div><div className="relative w-full sm:w-72"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Pesquisar no arquivo" className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[hsl(var(--accent))]"/></div></div>
    <div className="mb-6 flex gap-2 overflow-auto pb-1">{tabs.map(t=>{const Icon=t.icon; return <button key={t.id} onClick={()=>setTab(t.id)} className={'inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold '+(tab===t.id?'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]':'border-[hsl(var(--border))] bg-[hsl(var(--card))]') }><Icon size={14}/>{t.label}</button>})}</div>
    {tab==='curiosidades'&&<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((c,i)=><article key={i} className="panel rounded-2xl p-5"><p className="font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Arquivo • {String(i+1).padStart(2,'0')}</p><p className="mt-4 text-sm font-semibold leading-7">{c}</p></article>)}</div>}
    {tab==='demonstrações'&&<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{formulaDerivations.formulas.map(item=><article key={item.id} className="panel rounded-2xl p-5"><p className="eyebrow">{item.subject}</p><h2 className="mt-2 font-display text-xl font-bold">{item.title}</h2><div className="mt-4 rounded-xl bg-[hsl(var(--secondary)/.5)] p-4 font-mono text-sm">{item.formula}</div><ol className="mt-4 space-y-2 text-xs leading-relaxed">{item.steps_pt.map((s,i)=><li key={i}><span className="mr-2 font-mono text-[hsl(var(--accent))]">{i+1}.</span>{s}</li>)}</ol></article>)}</div>}
    {tab==='lugares'&&<div className="grid gap-5 lg:grid-cols-[1fr_360px]"><section className="panel overflow-hidden rounded-2xl p-5 sm:p-7"><div className="flex items-center gap-2"><MapPin size={16} className="text-[hsl(var(--accent))]"/><span className="font-mono text-[10px] uppercase tracking-wider">Mapa histórico</span></div><h2 className="mt-2 font-display text-2xl font-bold">Conhecimento no lugar em que aconteceu</h2><p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">O componente de produção pode renderizar mapa, marcadores e camadas próprias. O catálogo histórico já está preparado.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{locations.locations.map(l=><div key={l.id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.28)] p-4"><p className="font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{l.categories.join(" · ")}</p><h3 className="mt-2 text-sm font-bold">{l.name}</h3><p className="mt-2 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{l.summary_pt}</p></div>)}</div></section><aside className="rounded-2xl bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))]"><p className="eyebrow">Experiência</p><h2 className="mt-2 font-display text-xl font-bold">Linha do tempo + mapa</h2><p className="mt-3 text-xs leading-relaxed opacity-75">Selecionar uma pessoa ou obra pode abrir o lugar em que aquele conhecimento foi produzido, com fonte e contexto.</p><div className="mt-5 flex items-center gap-2 text-xs font-semibold"><BookOpenText size={14}/> Fonte acompanha cada ponto.</div></aside></div>}
    {tab==='laboratorio'&&<div className="panel rounded-2xl p-6"><p className="eyebrow">Laboratórios disponíveis</p><h2 className="mt-2 font-display text-2xl font-bold">Matemática e Física em movimento</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Os componentes InteractiveMathLab e PhysicsFormulaLab podem receber links diretos das trilhas de leitura e das questões do EEAR.</p></div>}
    {tab==='biblioteca'&&<ReadingLibraryPage/>}
    {tab==='pensadores'&&<ThinkerTrailsPage/>}
  </div>;
}
