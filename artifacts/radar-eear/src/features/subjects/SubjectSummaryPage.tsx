import { useMemo, useState } from "react";

type Subject = {
  id: string;
  title_pt: string;
  overview_pt: string;
  pillars_pt: string[];
  study_strategy_pt: string[];
  experiences: string[];
};

export function SubjectSummaryPage({ subjects }: { subjects: Subject[] }) {
  const [active, setActive] = useState(subjects[0]?.id ?? "");
  const subject = useMemo(() => subjects.find((s) => s.id === active) ?? subjects[0], [subjects, active]);
  if (!subject) return null;

  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <header className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.22em] opacity-60">Radar EEAR · Resumos</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Uma visão completa antes de começar</h1>
        <p className="mt-3 max-w-3xl text-base opacity-75">Escolha uma matéria. Primeiro você vê o mapa; depois entra em laboratórios, questões, erros e revisões.</p>
      </header>

      <nav className="mx-auto mt-8 flex max-w-6xl gap-2 overflow-x-auto pb-2" aria-label="Matérias">
        {subjects.map((s) => (
          <button key={s.id} onClick={() => setActive(s.id)} className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${active === s.id ? "font-semibold" : "opacity-70 hover:opacity-100"}`}>
            {s.title_pt}
          </button>
        ))}
      </nav>

      <section className="mx-auto mt-8 grid max-w-6xl gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <article className="rounded-3xl border p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.18em] opacity-55">Mapa da prova</span>
            <span className="rounded-full border px-3 py-1 text-xs">Anexo IV · CFS 2/2027</span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold">{subject.title_pt}</h2>
          <p className="mt-4 leading-7 opacity-80">{subject.overview_pt}</p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {subject.pillars_pt.map((pillar) => (
              <button key={pillar} className="rounded-2xl border p-4 text-left transition hover:-translate-y-0.5">
                <span className="text-sm leading-6">{pillar}</span>
              </button>
            ))}
          </div>
        </article>

        <aside className="rounded-3xl border p-6">
          <span className="text-xs uppercase tracking-[0.18em] opacity-55">Como estudar</span>
          <div className="mt-4 space-y-3">
            {subject.study_strategy_pt.map((item, i) => (
              <div key={item} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs">{i + 1}</span>
                <p className="text-sm leading-6 opacity-80">{item}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-2xl border px-4 py-3 text-sm font-semibold">Começar revisão guiada</button>
        </aside>
      </section>

      <section className="mx-auto mt-5 max-w-6xl rounded-3xl border p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.18em] opacity-55">Experiências</span>
            <h3 className="mt-2 text-xl font-semibold">Não fique só lendo — experimente</h3>
          </div>
          <span className="hidden text-xs opacity-55 md:block">pergunta → interação → desafio</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {subject.experiences.map((e) => <span key={e} className="rounded-full border px-3 py-2 text-sm opacity-80">{e}</span>)}
        </div>
      </section>
    </main>
  );
}
