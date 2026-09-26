import { BookOpen, CalendarDays, Sparkles } from 'lucide-react';
import dailyRaw from '../../../content/master/daily-reading-thinker-365-v5.json';
import booksRaw from '../../../content/master/reading-library-v5.json';
import peopleRaw from '../../../content/master/thinker-catalog-v5.json';

const books=Object.fromEntries(booksRaw.books.map(b=>[b.id,b]));
const people=Object.fromEntries(peopleRaw.people.map(p=>[p.id,p]));

export default function DailyReadingCard({day=new Date().getDay()||7}:{day?:number}){
 const d=dailyRaw.slots[(Math.max(1,day)-1)%365]; const book=books[d.book_id]; const thinker=people[d.thinker_id];
 return <section className="overflow-hidden rounded-[26px] border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
  <div className="bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))]"><div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.18em] opacity-70"><CalendarDays size={13}/> Dia {d.day}</span><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold"><Sparkles size={12}/> {d.mode.replace('_',' ')}</span></div><h2 className="mt-3 text-xl font-bold">Uma página. Uma ideia. Uma pergunta.</h2><p className="mt-2 text-sm leading-6 opacity-75">{d.prompt_pt}</p></div>
  <div className="grid gap-3 p-4 sm:grid-cols-2"><article className="rounded-2xl bg-[hsl(var(--secondary)/.55)] p-4"><BookOpen size={16}/><p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Livro</p><h3 className="mt-1 font-bold">{book?.title}</h3><p className="text-xs text-[hsl(var(--muted-foreground))]">{book?.author}</p></article><article className="rounded-2xl bg-[hsl(var(--secondary)/.55)] p-4"><Sparkles size={16}/><p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Pensador</p><h3 className="mt-1 font-bold">{thinker?.name_pt}</h3><p className="text-xs text-[hsl(var(--muted-foreground))]">{thinker?.tradition}</p></article></div>
  <div className="flex flex-wrap gap-2 p-4 pt-0">{d.actions.map(a=><span key={a} className="rounded-full border border-[hsl(var(--border))] px-3 py-2 text-[10px] font-semibold">{a}</span>)}</div>
 </section>;
}
