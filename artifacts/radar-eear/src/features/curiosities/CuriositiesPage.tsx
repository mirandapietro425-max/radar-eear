import { useMemo, useState } from 'react';
import seed from '../../../data/world-curiosity-seed.json';
import v26 from '../../data/curiosities-v26.json';

type Card = { id: string; category: string; title: string; body: string; source: string; place?: string };
const v26Cards: Card[] = (v26 as any[]).map((item) => ({
  id: item.id,
  category: item.area || 'Atlas',
  title: item.title || item.body,
  body: item.body,
  source: Array.isArray(item.sources) && item.sources[0] ? (item.sources[0].title || item.sources[0].url || 'Fonte registrada') : 'Fonte registrada',
  place: item.entity_id,
}));
const allCards: Card[] = [...(seed as any[]).map((item) => ({ ...item, place: item.place_id })), ...v26Cards];

export default function CuriositiesPage() {
  const [category, setCategory] = useState('Todas');
  const [query, setQuery] = useState('');
  const categories = useMemo(() => ['Todas', ...Array.from(new Set(allCards.map((c) => c.category)))], []);
  const visible = allCards.filter((c) => (category === 'Todas' || c.category === category) && `${c.title} ${c.body} ${c.place || ''}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="mx-auto max-w-[1380px]"><div className="mb-7"><p className="eyebrow">Arquivo de descobertas</p><h1 className="mt-2 font-display text-4xl font-bold">Curiosidades</h1><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Um acervo navegável para explorar conhecimento por prazer, conectado a lugares, estudos e fontes.</p></div><div className="mb-6 flex flex-wrap gap-2"><input aria-label="Buscar curiosidades" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar país, tema ou lugar…" className="min-w-64 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-xs outline-none focus:border-[hsl(var(--accent))]" />{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={'rounded-full border px-3 py-1.5 text-xs font-semibold ' + (category === item ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]')}>{item}</button>)}</div><p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{visible.length} curiosidades encontradas</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visible.map((c) => <article key={c.id} className="panel rounded-2xl p-5"><p className="eyebrow">{c.category}</p><h2 className="mt-3 font-display text-xl font-bold">{c.title}</h2><p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{c.body}</p>{c.place && <p className="mt-4 text-[11px] font-semibold text-[hsl(var(--primary))]">Ponto relacionado: {c.place}</p>}<p className="mt-5 border-t border-[hsl(var(--border))] pt-4 font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Fonte • {c.source}</p></article>)}</div></div>;
}
