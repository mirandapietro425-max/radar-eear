import React from "react";

export type ExperienceShellProps = { title:string; eyebrow?:string; question?:string; children:React.ReactNode; sources?:React.ReactNode; onRecall?:()=>void };

export default function ExperienceShell({title,eyebrow,question,children,sources,onRecall}:ExperienceShellProps){
 return <article className="overflow-hidden rounded-[2rem] border bg-white/5">
   <header className="p-6 md:p-8"><p className="text-xs uppercase tracking-[0.2em] opacity-60">{eyebrow}</p><h1 className="mt-2 text-3xl md:text-5xl font-semibold">{title}</h1>{question&&<p className="mt-4 max-w-2xl text-lg opacity-75">{question}</p>}</header>
   <div className="p-6 md:p-8">{children}</div>
   {sources&&<aside className="border-t p-6"><h2 className="font-semibold">Fontes</h2><div className="mt-3">{sources}</div></aside>}
   <footer className="border-t p-6"><button onClick={onRecall} className="rounded-full border px-4 py-2">Quero me testar depois</button></footer>
 </article>
}
