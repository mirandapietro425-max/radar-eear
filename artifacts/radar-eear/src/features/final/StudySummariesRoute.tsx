import { Link } from 'wouter';
import summaries from '../../../content/v7/subject-summaries-v7.json';
import { SubjectSummaryPage } from '../subjects/SubjectSummaryPage';
import { recordViewed } from './progressStore';
export default function StudySummariesRoute(){
  return <div><div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-4 md:px-8"><Link href="/" className="text-xs font-bold text-[hsl(var(--primary))]">← Início</Link><button className="min-h-11 rounded-xl border border-[hsl(var(--border))] px-4 text-xs font-bold" onClick={()=>recordViewed('subjects:summary','Resumos das quatro matérias','Estudo')}>Salvar visita</button></div><SubjectSummaryPage subjects={summaries.items}/></div>;
}
