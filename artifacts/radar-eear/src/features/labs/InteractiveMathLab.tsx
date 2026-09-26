import { useMemo, useState } from 'react';

function f(x:number, mode:string){
  if(mode==='linear') return 0.55*x+1;
  if(mode==='quadratic') return 0.16*x*x-1.2*x-1.5;
  return Math.sin(x/1.4)*2;
}

export default function InteractiveMathLab(){
  const [mode,setMode] = useState('quadratic');
  const [a,setA] = useState(1);
  const points = useMemo(()=>Array.from({length:81},(_,i)=>-10+i*.25),[]);
  const scale=18;
  const poly=points.map(x=>`${150+x*scale},${150-f(x* a,mode)*scale}`).join(' ');
  return <section className="panel rounded-3xl overflow-hidden">
    <div className="border-b border-border p-5 sm:p-7"><p className="eyebrow">Laboratório matemático</p><h2 className="mt-1 font-display text-2xl font-bold">Plano cartesiano interativo</h2><p className="mt-2 text-sm text-muted-foreground">Mude a função e observe a representação. A leitura da fórmula e do gráfico acontece no mesmo lugar.</p></div>
    <div className="grid gap-6 lg:grid-cols-[1fr_280px] p-5 sm:p-7">
      <div className="rounded-2xl border border-border bg-card p-2 overflow-hidden">
        <svg viewBox="0 0 300 300" role="img" aria-label="Plano cartesiano interativo" className="w-full h-auto">
          <rect x="0" y="0" width="300" height="300" fill="hsl(var(--background))"/>
          {Array.from({length:21},(_,i)=><line key={'v'+i} x1={0+i*15} y1="0" x2={0+i*15} y2="300" stroke="hsl(var(--border))" strokeWidth=".5"/>) }
          {Array.from({length:21},(_,i)=><line key={'h'+i} x1="0" y1={0+i*15} x2="300" y2={0+i*15} stroke="hsl(var(--border))" strokeWidth=".5"/>) }
          <line x1="0" y1="150" x2="300" y2="150" stroke="hsl(var(--primary))" strokeWidth="1.5"/><line x1="150" y1="0" x2="150" y2="300" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
          <polyline points={poly} fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="space-y-4">
        <label className="block text-xs font-bold">Representação<select value={mode} onChange={e=>setMode(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"><option value="quadratic">Quadrática</option><option value="linear">Linear</option><option value="sine">Senoidal</option></select></label>
        <label className="block text-xs font-bold">Escala do parâmetro<div className="mt-2 flex items-center gap-3"><input type="range" min="0.5" max="2" step="0.1" value={a} onChange={e=>setA(Number(e.target.value))} className="w-full"/><span className="font-mono text-xs">{a.toFixed(1)}</span></div></label>
        <div className="rounded-2xl bg-secondary/60 p-4"><p className="eyebrow">Como usar</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Arraste o parâmetro e compare a forma do gráfico. Esse mesmo laboratório pode ganhar pontos móveis, reta, circunferência, trigonometria e plano de Argand–Gauss.</p></div>
      </div>
    </div>
  </section>;
}
