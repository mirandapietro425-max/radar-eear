import React from "react";
export function CulturalReferenceDetail({ item }: { item: any }) {
  return <article className="mx-auto max-w-4xl space-y-7">
    <header className="space-y-3"><div className="text-xs uppercase tracking-[.22em] opacity-60">Referência cultural</div><h1 className="text-4xl font-semibold">{item.title}</h1><p className="max-w-3xl text-base opacity-75">{item.summary_pt}</p></header>
    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl border p-5"><div className="text-xs uppercase opacity-60">Onde aparece</div><p className="mt-2 leading-7">{item.where_it_appears}</p></div>
      <div className="rounded-3xl border p-5"><div className="text-xs uppercase opacity-60">De onde vem</div><p className="mt-2 leading-7">{item.origin_of_reference}</p></div>
    </section>
    <section className="rounded-[32px] border p-6"><div className="text-xs uppercase opacity-60">Descobrir</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><button className="rounded-2xl border p-4 text-left">Ver mídia</button><button className="rounded-2xl border p-4 text-left">Experimentar</button><button className="rounded-2xl border p-4 text-left">Salvar no Diário</button></div></section>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Fontes</h2>{(item.sources||[]).map((s:string)=><a className="block rounded-2xl border p-4 underline underline-offset-4" href={s} target="_blank" rel="noreferrer" key={s}>{s}</a>)}</section>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Vídeos e análises</h2>{(item.video_links||[]).map((v:any)=><a className="block rounded-2xl border p-4" href={v.url} target="_blank" rel="noreferrer" key={v.url}>{v.title || "Abrir vídeo / busca"}</a>)}</section>
  </article>;
}
