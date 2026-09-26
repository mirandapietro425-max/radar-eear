import React from "react";

const sections = [
  ["Estudar", "Português · Inglês · Matemática · Física"],
  ["Praticar", "Questões · Jogos · Laboratórios · Meus Erros"],
  ["Explorar", "Atlas · Bíblia · Filosofia · Ciência · Literatura · Arte"],
  ["Biblioteca", "Livros · Fontes · Notas · Leituras"],
];

export default function KnowledgeUniverseHubPage(){
  return <main className="space-y-6">
    <header><p className="text-sm uppercase tracking-widest opacity-60">Radar EEAR</p><h1 className="text-4xl font-semibold">Universo do Conhecimento</h1><p className="mt-2 opacity-70">Um ponto de entrada; cada cartão leva a uma experiência, não a uma parede de texto.</p></header>
    <div className="grid gap-4 sm:grid-cols-2">{sections.map(([title,desc])=><section key={title} className="rounded-3xl border p-6">
      <h2 className="text-xl font-semibold">{title}</h2><p className="mt-2 opacity-70">{desc}</p><button className="mt-5 rounded-full border px-4 py-2">Explorar</button>
    </section>)}</div>
  </main>;
}
