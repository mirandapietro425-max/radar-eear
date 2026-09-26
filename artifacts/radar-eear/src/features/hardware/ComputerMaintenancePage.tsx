
import React,{useMemo,useState} from 'react';
import data from '../../data/content-v11/computer-assembly-maintenance-v11.json';

export default function ComputerMaintenancePage(){
 const [q,setQ]=useState('');
 const items=useMemo(()=>data.items.filter((x:any)=>`${x.title} ${x.summary}`.toLowerCase().includes(q.toLowerCase())),[q]);
 return <section className="space-y-6"><header><div className="text-xs uppercase tracking-widest opacity-60">Oficina digital</div><h1 className="text-3xl font-semibold">Montagem & manutenção de computadores</h1><p className="mt-2 max-w-2xl opacity-80">Aprenda por partes, com segurança, compatibilidade e diagnóstico guiado.</p></header><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar peça ou assunto…" className="w-full rounded-2xl border px-4 py-3"/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map((x:any)=><article key={x.id} className="rounded-3xl border p-5"><div className="text-xs uppercase tracking-widest opacity-60">{x.experience}</div><h2 className="mt-2 text-xl font-semibold">{x.title}</h2><p className="mt-2 opacity-80">{x.summary}</p><button className="mt-4 rounded-full bg-black px-4 py-2 text-white">Ver experiência</button></article>)}</div></section>
}
