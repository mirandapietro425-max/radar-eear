import { useEffect, useState } from 'react';
import { ExternalLink, Image as ImageIcon, Search } from 'lucide-react';

type NasaItem = { data?: Array<{ title?: string; description?: string; date_created?: string; nasa_id?: string }> ; links?: Array<{ href: string; rel?: string; render?: string }> };

export default function NasaDiscoveryPage() {
  const [query, setQuery] = useState('galaxy');
  const [items, setItems] = useState<NasaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<NasaItem | null>(null);

  async function searchNasa(term = query) {
    setLoading(true);
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?media_type=image&q=${encodeURIComponent(term)}&page_size=12`);
      const json = await response.json();
      setItems(json.collection?.items ?? []);
    } finally { setLoading(false); }
  }

  useEffect(() => { searchNasa('galaxy'); }, []);

  return <div className="mx-auto max-w-[1380px]"><div className="mb-7"><p className="eyebrow">Arquivo científico</p><h1 className="mt-2 font-display text-4xl font-bold">NASA — Descobrir, não só olhar.</h1><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Pesquise o acervo da NASA e transforme uma imagem em uma pequena aula: o que foi observado, qual missão aparece, qual instrumento produziu os dados e o que a imagem permite compreender.</p></div><div className="mb-6 flex gap-2"><div className="flex flex-1 items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2"><Search size={16} className="text-[hsl(var(--muted-foreground))]"/><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchNasa()} className="w-full bg-transparent text-sm outline-none" placeholder="galáxia, Lua, Marte, Hubble..."/></div><button onClick={() => searchNasa()} className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-xs font-bold text-[hsl(var(--primary-foreground))]">Pesquisar</button></div>{loading ? <div className="panel rounded-2xl p-8 text-sm">Buscando no arquivo NASA…</div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => { const d = item.data?.[0]; const image = item.links?.find((l) => l.render === 'image')?.href; return <button key={d?.nasa_id ?? Math.random()} onClick={() => setSelected(item)} className="panel overflow-hidden rounded-2xl text-left transition-transform hover:-translate-y-1"><div className="aspect-[16/10] bg-[hsl(var(--secondary))]">{image ? <img src={image} alt={d?.title ?? 'NASA'} className="h-full w-full object-cover" loading="lazy"/> : <div className="flex h-full items-center justify-center"><ImageIcon size={28}/></div>}</div><div className="p-4"><p className="eyebrow">{d?.date_created?.slice(0,10) ?? 'NASA'}</p><h2 className="mt-2 line-clamp-2 text-sm font-bold">{d?.title ?? 'Sem título'}</h2></div></button> })}</div>}{selected?.data?.[0] && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 sm:items-center"><section className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-[hsl(var(--card))] p-5 sm:p-7"><div className="flex justify-between gap-4"><div><p className="eyebrow">NASA learning capsule</p><h2 className="mt-2 font-display text-2xl font-bold">{selected.data[0].title}</h2></div><button onClick={() => setSelected(null)} className="text-xs font-bold">Fechar</button></div><p className="mt-5 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{selected.data[0].description ?? 'Sem descrição no item retornado.'}</p><div className="mt-6 rounded-2xl bg-[hsl(var(--secondary)/.55)] p-4"><p className="eyebrow">Como usar no Radar</p><p className="mt-2 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">Transforme esta imagem em uma experiência: observar → formular pergunta → explicar o fenômeno → relacionar com Física/Matemática → responder uma questão → registrar a fonte.</p></div><a className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--primary))]" href={`https://images.nasa.gov/details/${selected.data[0].nasa_id ?? ''}`} target="_blank" rel="noreferrer">Abrir item na NASA <ExternalLink size={13}/></a></section></div>}</div>;
}
