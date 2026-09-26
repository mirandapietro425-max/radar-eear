import React,{useMemo,useState}from"react";
import data from"../../../content/v9/apocrypha-library-v9.json";

export default function ApocryphaPage(){
 const [q,setQ]=useState(""); const [filter,setFilter]=useState("todos");
 const items=useMemo(()=>data.filter((x:any)=>{const s=(x.title_pt+" "+x.category+" "+x.themes.join(" ")).toLowerCase(); const ok=!q||s.includes(q.toLowerCase()); const cat=filter==="todos"||x.category.toLowerCase().includes(filter); return ok&&cat}),[q,filter]);
 return <div className="space-y-6">
  <header><p className="text-xs uppercase tracking-[.2em] opacity-60">Biblioteca extra-canônica</p><h1 className="text-3xl font-semibold">Apócrifos & história do cânon</h1><p className="max-w-3xl opacity-75">Leia estudos em português, compare tradições e veja a diferença entre cânon, literatura extra-canônica, pseudepigrafia e deuterocanônicos.</p></header>
  <div className="flex gap-3 flex-wrap"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar livro, tema ou tradição…" className="rounded-2xl border px-4 py-3 min-w-[280px]"/><button onClick={()=>setFilter("todos")} className="rounded-full px-4 py-2 border">Todos</button><button onClick={()=>setFilter("evangelho")} className="rounded-full px-4 py-2 border">Evangelhos</button><button onClick={()=>setFilter("apocalipse")} className="rounded-full px-4 py-2 border">Apocalipses</button><button onClick={()=>setFilter("padres")} className="rounded-full px-4 py-2 border">Padres</button></div>
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{items.map((x:any)=><article key={x.id} className="rounded-3xl border p-5 hover:shadow-lg transition"><div className="text-xs opacity-55 mb-2">{x.category}</div><h2 className="text-xl font-medium">{x.title_pt}</h2><p className="text-sm opacity-65 mt-1">{x.approx_dating}</p><p className="mt-4 text-sm leading-6 opacity-85">{x.overview_pt}</p><div className="mt-4 flex flex-wrap gap-2">{x.themes.slice(0,4).map((t:string)=><span key={t} className="text-xs px-2 py-1 rounded-full bg-black/5">{t}</span>)}</div></article>)}</div>
 </div>
}
