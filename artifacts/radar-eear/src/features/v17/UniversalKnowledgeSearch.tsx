import { useMemo, useState } from 'react';

type SearchItem = {
  id: string;
  title: string;
  type: string;
  subtitle?: string;
  href?: string;
  tags?: string[];
};

export default function UniversalKnowledgeSearch({ items = [], onSelect }: { items?: SearchItem[]; onSelect?: (item: SearchItem) => void }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('pt-BR');
    if (!q) return items.slice(0, 8);
    return items.filter((item) => `${item.title} ${item.type} ${item.subtitle ?? ''} ${(item.tags ?? []).join(' ')}`.toLocaleLowerCase('pt-BR').includes(q)).slice(0, 8);
  }, [items, query]);

  return (
    <section className="panel rounded-2xl p-4 sm:p-5" aria-label="Busca universal do conhecimento">
      <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2.5">
        <span aria-hidden="true" className="text-sm text-[hsl(var(--muted-foreground))]">⌕</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar pessoa, livro, lugar ou conceito…" aria-label="Buscar no Radar" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
      </div>
      <div className="mt-3 space-y-1">
        {filtered.map((item) => (
          <button key={item.id} type="button" onClick={() => onSelect?.(item)} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left hover:bg-[hsl(var(--secondary))]">
            <span className="min-w-16 rounded-full bg-[hsl(var(--secondary))] px-2 py-1 text-center font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{item.type}</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{item.title}</span>{item.subtitle && <span className="block truncate text-[11px] text-[hsl(var(--muted-foreground))]">{item.subtitle}</span>}</span>
          </button>
        ))}
        {query && filtered.length === 0 && <p className="px-3 py-4 text-xs text-[hsl(var(--muted-foreground))]">Nenhum resultado nessa busca. Tente outra palavra.</p>}
      </div>
    </section>
  );
}
