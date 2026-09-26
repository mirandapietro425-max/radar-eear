import { useEffect, useState } from 'react';
const KEY='radar-eear-notes-v1';
export default function NotesPage(){
 const [text,setText]=useState(''); const [saved,setSaved]=useState(false);
 useEffect(()=>{try{setText(localStorage.getItem(KEY)||'')}catch{}}
 ,[]);
 function save(){localStorage.setItem(KEY,text);setSaved(true);window.setTimeout(()=>setSaved(false),1600)}
 return <div className="mx-auto max-w-[1100px]"><div className="mb-7"><p className="eyebrow">Caderno pessoal</p><h1 className="mt-2 font-display text-4xl font-bold">Anotações</h1><p className="mt-2 max-w-xl text-sm text-muted-foreground">Um espaço livre para transformar cada sessão em memória pessoal. A primeira versão funciona localmente e pode ser migrada para Supabase por usuário.</p></div><section className="panel overflow-hidden rounded-3xl"><div className="border-b border-border px-5 py-4 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Caderno livre</span>{saved&&<span className="text-xs font-bold text-emerald-700">Salvo</span>}</div><textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Escreva aqui…" className="min-h-[520px] w-full resize-y bg-background p-6 text-base leading-8 outline-none sm:p-8"/><div className="flex items-center justify-end border-t border-border px-5 py-4"><button onClick={save} className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary-foreground))]">Salvar anotação</button></div></section></div>;
}
