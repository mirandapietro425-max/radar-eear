import { useMemo, useState } from 'react';
import curiosities from '../../../data/world-curiosity-seed.json';

export default function CuriositiesPage() {
  const [category, setCategory] = useState('Todas');
  const categories = useMemo(() => ['Todas', ...Array.from(new Set(curiosities.map((c) => c.category)))], []);
  const visible = curiosities.filter((c) => category === 'Todas' || c.category === category);
  return <div className="mx-auto max-w-[1380px]"><div className="mb-7"><p className="eyebrow">Arquivo de descobertas</p><h1 className="mt-2 font-display text-4xl font-bold">Curiosidades</h1><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Um acervo separado das questões para o aluno poder explorar conhecimento por prazer, sempre com fonte e contexto.</p></div><div className="mb-6 flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={'rounded-full border px-3 py-1.5 text-xs font-semibold ' + (category === item ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]')}>{item}</button>)}</div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visible.map((c) => <article key={c.id} className="panel rounded-2xl p-5"><p className="eyebrow">{c.category}</p><h2 className="mt-3 font-display text-xl font-bold">{c.title}</h2><p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{c.body}</p><p className="mt-5 border-t border-[hsl(var(--border))] pt-4 font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Fonte • {c.source}</p></article>)}</div></div>;
}
