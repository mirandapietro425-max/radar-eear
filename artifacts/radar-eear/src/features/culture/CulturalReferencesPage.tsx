import React, { useMemo, useState } from "react";

export type CulturalReference = {
  id: string;
  title: string;
  media_type: string;
  year?: number;
  domains: string[];
  concepts: string[];
  summary_pt: string;
  sources: string[];
  video_links: { url: string; title?: string; type?: string }[];
  image_search_url?: string;
};

export function CulturalReferencesPage({ items }: { items: CulturalReference[] }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("Todos");
  const domains = useMemo(() => ["Todos", ...Array.from(new Set(items.flatMap(i => i.domains))).sort()], [items]);
  const filtered = useMemo(() => items.filter(i => {
    const q = query.trim().toLowerCase();
    const hit = !q || [i.title, i.summary_pt, ...i.concepts, ...i.domains].join(" ").toLowerCase().includes(q);
    const d = domain === "Todos" || i.domains.includes(domain);
    return hit && d;
  }), [items, query, domain]);

  return <main className="space-y-6">
    <header className="space-y-2">
      <p className="text-xs uppercase tracking-[0.24em] opacity-60">Descobrir · Referências culturais</p>
      <h1 className="text-3xl font-semibold">Onde a ciência, a filosofia e a matemática aparecem na cultura pop</h1>
      <p className="max-w-3xl opacity-75">Filmes, séries, jogos e livros viram portas de entrada para conceitos reais. A página separa claramente referência documentada, interpretação e ficção.</p>
    </header>

    <section className="grid gap-3 md:grid-cols-[1fr_auto]">
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Procure Matrix, Newton, binário, ecologia..." className="rounded-2xl border bg-transparent px-4 py-3" />
      <select value={domain} onChange={e=>setDomain(e.target.value)} className="rounded-2xl border bg-transparent px-4 py-3">{domains.map(d=><option key={d}>{d}</option>)}</select>
    </section>

    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map(item => <article key={item.id} className="group rounded-[28px] border p-5 transition hover:-translate-y-1 hover:shadow-xl">
        <div className="mb-4 flex items-center justify-between text-xs opacity-60"><span>{item.media_type}</span><span>{item.year ?? "—"}</span></div>
        <h2 className="text-xl font-semibold">{item.title}</h2>
        <p className="mt-3 text-sm leading-6 opacity-75">{item.summary_pt}</p>
        <div className="mt-4 flex flex-wrap gap-2">{item.concepts.slice(0,5).map(c=><span key={c} className="rounded-full border px-2.5 py-1 text-xs">{c}</span>)}</div>
        <div className="mt-5 flex gap-2 text-sm">
          <button className="rounded-full border px-3 py-2">Ver referência</button>
          <button className="rounded-full border px-3 py-2">Experimente</button>
          <button className="rounded-full border px-3 py-2">Salvar no Diário</button>
        </div>
      </article>)}
    </section>
  </main>;
}
