import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ExternalLink, FileText, Play, Save } from 'lucide-react';
import raw from '../../../content/master/reading-library-v5.json';

type Book={id:string;title:string;author:string;year:number;hook_pt:string;read_url:string;read_status:string;themes:string[]};
const books=raw.books as Book[];

export default function BookReaderPage({bookId}:{bookId:string}){
 const book=books.find(b=>b.id===bookId);
 const key=useMemo(()=>`radar-book-progress-${bookId}`,[bookId]);
 const [progress,setProgress]=useState(0); const [notes,setNotes]=useState(''); const [saved,setSaved]=useState(false);
 useEffect(()=>{try{const x=JSON.parse(localStorage.getItem(key)||'{}');setProgress(Number(x.progress)||0);setNotes(x.notes||'')}catch{}} , [key]);
 const save=()=>{localStorage.setItem(key,JSON.stringify({progress,notes,updatedAt:new Date().toISOString()}));setSaved(true);setTimeout(()=>setSaved(false),1200)};
 if(!book) return <div className="p-8 text-sm">Livro não encontrado.</div>;
 return <div className="mx-auto max-w-4xl px-4 py-8">
  <a href="/explorar" className="inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--muted-foreground))]"><ArrowLeft size={14}/> Voltar à biblioteca</a>
  <article className="mt-5 overflow-hidden rounded-[30px] border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
   <header className="bg-[hsl(var(--primary))] p-7 text-[hsl(var(--primary-foreground))] sm:p-10"><p className="font-mono text-[9px] uppercase tracking-[.18em] opacity-60">Leitura guiada</p><h1 className="mt-2 font-display text-4xl font-bold">{book.title}</h1><p className="mt-2 text-sm opacity-70">{book.author} · {book.year}</p><p className="mt-5 max-w-2xl text-sm leading-7 opacity-80">{book.hook_pt}</p></header>
   <div className="space-y-5 p-6 sm:p-8">
    <section className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[hsl(var(--secondary)/.55)] p-4"><FileText size={16}/><b className="mt-2 block text-sm">Contexto</b><p className="mt-1 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Comece pelo gancho, personagens e conceitos. A biblioteca não substitui uma edição crítica.</p></div><div className="rounded-2xl bg-[hsl(var(--secondary)/.55)] p-4"><Play size={16}/><b className="mt-2 block text-sm">Leia a obra</b><p className="mt-1 text-xs leading-5 text-[hsl(var(--muted-foreground))]">{book.read_status.replaceAll('_',' ')}</p></div><div className="rounded-2xl bg-[hsl(var(--secondary)/.55)] p-4"><Save size={16}/><b className="mt-2 block text-sm">Registre</b><p className="mt-1 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Seu progresso fica salvo neste dispositivo.</p></div></section>
    <section><div className="flex items-center justify-between text-xs font-bold"><span>Progresso</span><span>{progress}%</span></div><input aria-label="Progresso de leitura" type="range" min="0" max="100" value={progress} onChange={e=>setProgress(Number(e.target.value))} className="mt-3 w-full"/></section>
    <section><label className="text-xs font-bold">Anotação da leitura</label><textarea value={notes} onChange={e=>setNotes(e.target.value)} className="mt-2 min-h-32 w-full rounded-2xl border border-[hsl(var(--border))] bg-transparent p-4 text-sm outline-none" placeholder="O que esta obra te fez pensar?"/></section>
    <div className="flex flex-wrap gap-2"><button onClick={save} className="rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-xs font-bold text-[hsl(var(--primary-foreground))]">{saved?'Salvo':'Salvar progresso'}</button><a href={book.read_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-3 text-xs font-bold">Abrir fonte da obra <ExternalLink size={13}/></a></div>
   </div>
  </article>
 </div>
}
