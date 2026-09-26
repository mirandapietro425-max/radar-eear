import { useMemo, useState } from 'react';
import { BookOpen, Bookmark, Check, Clock3, ExternalLink, Search, Sparkles } from 'lucide-react';
import raw from '../../../content/master/reading-library-v5.json';
import mediaRaw from '../../../content/master/people-media-registry-v5.json';
import { recordSaved, recordViewed } from '../final/progressStore';

const media = Object.fromEntries((mediaRaw.media || []).map(m => [m.person_id, m.asset_url]));

type Book = {
  id: string; title: string; author: string; year: number; category: string;
  themes: string[]; hook_pt: string; read_status: string; read_url: string; image_key?: string;
};

const books = raw.books as Book[];

function minutesFor(book: Book) {
  const n = book.title.length + book.author.length;
  return 5 + (n % 3) * 10;
}

export default function ReadingLibraryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('todos');
  const [openId, setOpenId] = useState<string | null>(null);
  const categories = useMemo(() => ['todos', ...Array.from(new Set(books.map(b => b.category)))], []);
  const filtered = useMemo(() => books.filter(b => {
    const hay = `${b.title} ${b.author} ${b.hook_pt} ${b.themes.join(' ')}`.toLocaleLowerCase('pt-BR');
    return hay.includes(query.toLocaleLowerCase('pt-BR')) && (category === 'todos' || b.category === category);
  }), [query, category]);

  return <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6 lg:px-8">
    <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
      <section className="rounded-[28px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-8">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-[hsl(var(--accent))]"><Sparkles size={13}/> Biblioteca viva</div>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Leia o livro. Depois vá além do livro.</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">Clássicos, filosofia, sociologia, teologia e literatura em português. Cada obra entra em camadas: 90 segundos de contexto, mapa de ideias, leitura e uma ponte para outras pessoas, épocas e matérias.</p>
        <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          <span className="rounded-full bg-[hsl(var(--secondary))] px-3 py-2">{books.length} obras catalogadas</span>
          <span className="rounded-full bg-[hsl(var(--secondary))] px-3 py-2">pt-BR</span>
          <span className="rounded-full bg-[hsl(var(--secondary))] px-3 py-2">acesso por fonte</span>
        </div>
      </section>
      <section className="rounded-[28px] bg-[hsl(var(--primary))] p-6 text-[hsl(var(--primary-foreground))]">
        <p className="font-mono text-[10px] uppercase tracking-[.18em] opacity-60">Modo leitura</p>
        <h2 className="mt-3 text-xl font-bold">Uma biblioteca que vira hábito.</h2>
        <p className="mt-3 text-sm leading-6 opacity-75">Salve uma obra, abra a fonte, registre uma nota e deixe o Radar reencontrá-la no dia certo. Quando o texto integral estiver em fonte autorizada, o botão leva direto à leitura.</p>
      </section>
    </div>

    <div className="mt-6 flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar Tolstói, Machado, Kant, Newton, Marx..." className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-3 pl-9 pr-4 text-sm outline-none focus:border-[hsl(var(--accent))]"/></div>
      <div className="flex gap-2 overflow-auto pb-1">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`whitespace-nowrap rounded-2xl border px-3 py-2 text-xs font-semibold ${category===c?'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]':'border-[hsl(var(--border))] bg-[hsl(var(--card))]'}`}>{c.replaceAll('-',' ')}</button>)}</div>
    </div>

    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map(book => {
        const src = media[book.image_key || ''];
        const open = openId === book.id;
        return <article key={book.id} className="group overflow-hidden rounded-[26px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition hover:-translate-y-0.5 hover:shadow-xl">
          <div className="relative h-44 overflow-hidden bg-[hsl(var(--secondary))]">
            {src ? <img src={src} alt={`Imagem histórica de ${book.author}`} loading="lazy" className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]" onError={e=>{e.currentTarget.style.display='none'}}/> : <div className="flex h-full items-end p-5"><BookOpen size={34} className="opacity-25"/></div>}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white"><p className="font-mono text-[9px] uppercase tracking-widest opacity-70">{book.category.replaceAll('-',' ')}</p><h2 className="mt-1 text-xl font-bold">{book.title}</h2><p className="text-xs opacity-80">{book.author} · {book.year}</p></div>
          </div>
          <div className="p-5">
            <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">{book.hook_pt}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{book.themes.slice(0,5).map(x=><span key={x} className="rounded-full border border-[hsl(var(--border))] px-2 py-1 text-[10px]">{x}</span>)}</div>
            <div className="mt-5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))]"><span className="inline-flex items-center gap-1"><Clock3 size={12}/>{minutesFor(book)} min de entrada</span><span>{book.read_status.replaceAll('_',' ')}</span></div>
            <div className="mt-4 flex gap-2"><button onClick={()=>{setOpenId(open ? null : book.id); if(!open) recordViewed(`book:${book.id}`,book.title,'Livro')}} className="flex-1 rounded-xl bg-[hsl(var(--primary))] px-3 py-2.5 text-xs font-bold text-[hsl(var(--primary-foreground))]">{open?'Fechar':'Abrir experiência'}</button><button onClick={()=>recordSaved(`book:${book.id}`,book.title,'Livro')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] px-3 text-xs font-bold hover:bg-[hsl(var(--secondary))]" aria-label={`Salvar ${book.title}`}><Bookmark size={14}/> <span className="hidden xl:inline">Salvar</span></button><a href={book.read_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-[hsl(var(--border))] px-3" aria-label="Abrir fonte"><ExternalLink size={14}/></a></div>
            {open && <div className="mt-4 grid gap-2 border-t border-[hsl(var(--border))] pt-4 text-xs leading-6"><div className="rounded-xl bg-[hsl(var(--secondary)/.55)] p-3"><b>1. Contexto</b><p className="mt-1 text-[hsl(var(--muted-foreground))]">Comece pelo gancho e observe quais personagens, ideias ou conflitos o texto coloca em primeiro plano.</p></div><div className="rounded-xl bg-[hsl(var(--secondary)/.55)] p-3"><b>2. Leia</b><p className="mt-1 text-[hsl(var(--muted-foreground))]">A leitura integral acontece na fonte indicada; o Radar não presume que uma tradução moderna possa ser redistribuída.</p></div><div className="rounded-xl bg-[hsl(var(--secondary)/.55)] p-3"><b>3. Conecte</b><p className="mt-1 text-[hsl(var(--muted-foreground))]">Depois da leitura, compare a obra com filosofia, história, matemática, sociedade ou uma questão do seu ciclo EEAR.</p></div></div>}
          </div>
        </article>
      })}
    </div>
  </div>;
}
