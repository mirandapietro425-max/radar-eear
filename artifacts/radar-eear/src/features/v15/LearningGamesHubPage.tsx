import React from "react";
import gamesData from "../../../content/v15/educational-games-v15.json";

export default function LearningGamesHubPage(){
 const games = (gamesData as any).games;
 return <main className="space-y-6"><header><p className="text-xs uppercase tracking-widest opacity-60">Praticar</p><h1 className="text-4xl font-semibold">Jogos que ensinam</h1><p className="mt-2 opacity-70">Filtros por matéria, habilidade e tempo.</p></header><div className="grid gap-4 md:grid-cols-3">{games.slice(0,12).map((g:any)=><article key={g.id} className="rounded-3xl border p-5"><p className="text-xs opacity-60">{g.subject}</p><h2 className="mt-1 font-semibold">{g.title_pt}</h2><p className="mt-2 text-sm opacity-70">{g.learning_goal}</p><button className="mt-4 rounded-full border px-3 py-2">Jogar</button></article>)}</div></main>;
}
