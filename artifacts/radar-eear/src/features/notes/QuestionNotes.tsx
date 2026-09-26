import { useEffect, useState } from 'react';

export default function QuestionNotes({questionId,topic}:{questionId:string;topic:string}){
 const key=`radar-note-${questionId}`; const [value,setValue]=useState(''); const [saved,setSaved]=useState(false);
 useEffect(()=>{setValue(localStorage.getItem(key)||'')},[key]);
 const save=()=>{localStorage.setItem(key,value);setSaved(true);window.setTimeout(()=>setSaved(false),1200)};
 return <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4"><div className="flex items-center justify-between"><div><p className="eyebrow">Anotação da questão</p><p className="mt-1 text-xs text-muted-foreground">{topic}</p></div>{saved&&<span className="text-[10px] font-bold text-emerald-700">salvo</span>}</div><textarea value={value} onChange={e=>setValue(e.target.value)} placeholder="Onde seu raciocínio mudou? Que regra você quer lembrar?" className="mt-3 min-h-24 w-full resize-y rounded-xl border border-border bg-card p-3 text-xs leading-6 outline-none focus:border-[hsl(var(--accent))]"/><button onClick={save} className="mt-2 rounded-lg border border-border px-3 py-2 text-[11px] font-bold hover:bg-secondary">Salvar</button></div>
}
