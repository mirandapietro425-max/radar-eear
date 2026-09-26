import { useMemo, useState } from 'react';

type Formula = { id:string; title:string; expression:string; unit:string; description:string; range:number };
const formulas:Formula[]=[
{id:'mru',title:'MRU',expression:'s = s₀ + vt',unit:'m, m/s, s',description:'Movimento em velocidade constante.',range:20},
{id:'mruv',title:'MRUV',expression:'v = v₀ + at',unit:'m/s, m/s², s',description:'Velocidade em aceleração constante.',range:10},
{id:'force',title:'2ª Lei de Newton',expression:'F = ma',unit:'N, kg, m/s²',description:'Relação entre força resultante, massa e aceleração.',range:20},
{id:'ohm',title:'Lei de Ohm',expression:'V = RI',unit:'V, Ω, A',description:'Relação entre tensão, resistência e corrente.',range:30},
{id:'waves',title:'Ondas',expression:'v = λf',unit:'m/s, m, Hz',description:'Relação entre velocidade de propagação, comprimento e frequência.',range:20},
];
export default function PhysicsFormulaLab(){
 const [id,setId]=useState('mru'); const [value,setValue]=useState(5); const formula=formulas.find(f=>f.id===id)!;
 const bars=useMemo(()=>Array.from({length:12},(_,i)=>Math.max(8,Math.min(92,20+i*value/formula.range*45))),[value,formula]);
 return <section className="panel rounded-3xl overflow-hidden"><div className="border-b border-border p-5 sm:p-7"><p className="eyebrow">Laboratório de Física</p><h2 className="mt-1 font-display text-2xl font-bold">Fórmula em movimento</h2><p className="mt-2 text-sm text-muted-foreground">Escolha uma relação física e altere um parâmetro para ver uma representação visual.</p></div><div className="grid gap-6 lg:grid-cols-[280px_1fr] p-5 sm:p-7"><div className="space-y-3">{formulas.map(f=><button key={f.id} onClick={()=>setId(f.id)} className={'w-full rounded-2xl border p-4 text-left '+(id===f.id?'border-[hsl(var(--accent))] bg-[hsl(var(--accent)/.08)]':'border-border hover:bg-secondary/40')}><p className="text-xs font-bold">{f.title}</p><p className="mt-1 font-mono text-xs">{f.expression}</p></button>)}</div><div className="rounded-2xl border border-border bg-background p-5"><p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{formula.unit}</p><p className="mt-3 font-display text-4xl font-bold">{formula.expression}</p><p className="mt-2 text-sm text-muted-foreground">{formula.description}</p><div className="mt-7 flex h-36 items-end gap-2">{bars.map((h,i)=><div key={i} className="flex-1 rounded-t-lg bg-[hsl(var(--primary)/.82)]" style={{height:h+'%'}}/> )}</div><label className="mt-6 block text-xs font-bold">Parâmetro<div className="mt-2 flex items-center gap-3"><input className="w-full" type="range" min="1" max={formula.range} value={value} onChange={e=>setValue(Number(e.target.value))}/><span className="font-mono text-xs">{value}</span></div></label></div></div></section>;
}
