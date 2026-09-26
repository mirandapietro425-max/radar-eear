import { ArrowRight, BookOpen, FlaskConical, Globe2, GraduationCap, Library, Sparkles } from 'lucide-react';

const groups = [
  { id: 'estudar', title: 'Estudar', icon: GraduationCap, description: 'Resumo, explicação, laboratório e revisão para Português, Inglês, Matemática e Física.' },
  { id: 'praticar', title: 'Praticar', icon: FlaskConical, description: 'Questões, simulados, jogos e exercícios guiados pelo que você precisa recuperar.' },
  { id: 'explorar', title: 'Explorar', icon: Globe2, description: 'Atlas, Bíblia, filosofia, ciência, arte, literatura, pré-história e cultura pop.' },
  { id: 'biblioteca', title: 'Biblioteca', icon: Library, description: 'Livros, fontes, leituras salvas, notas e trilhas de leitura.' },
  { id: 'historias', title: 'Histórias do conhecimento', icon: BookOpen, description: 'Como cada campo nasceu, mudou e se conectou com outros campos.' },
  { id: 'descobertas', title: 'Descobertas', icon: Sparkles, description: 'Curiosidades, pessoas, lugares, experimentos e referências culturais.' },
];

export default function KnowledgeUniverseHubPageV17() {
  return (
    <main className="mx-auto max-w-[1380px] space-y-7">
      <header className="rounded-[2rem] border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] p-6 shadow-sm sm:p-9">
        <p className="eyebrow">Radar EEAR · Universo do conhecimento</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-6xl">Estude. Explore. Conecte.</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">Uma mesma interface para preparar a prova e, quando bater a curiosidade, abrir o mundo inteiro — sem transformar o estudo em uma parede de conteúdo.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map(({ id, title, icon: Icon, description }) => (
          <section key={id} className="group rounded-[1.5rem] border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Icon size={18} /></div>
            <h2 className="mt-5 font-display text-xl font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{description}</p>
            <button type="button" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-3.5 text-xs font-bold group-hover:border-[hsl(var(--accent)/.45)]">Abrir experiência <ArrowRight size={14} /></button>
          </section>
        ))}
      </div>
    </main>
  );
}
