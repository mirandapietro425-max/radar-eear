import type { Question, Subject } from './content';

export type UserQuestionStat = {
  questionId: string;
  attempts: number;
  correctRate: number;
  avgResponseMs: number;
  confidence?: number;
  dueAt?: string;
  lastSeenAt?: string;
};

export type UserState = {
  today: string;
  subjects: Record<Subject, number>;
  availableMinutes: number;
  preferredMix?: Subject[];
  stats: Record<string, UserQuestionStat>;
  alreadyServedToday?: string[];
};

function recencyPenalty(lastSeenAt?: string) {
  if (!lastSeenAt) return 0;
  const days = (Date.now() - new Date(lastSeenAt).getTime()) / 86400000;
  return Math.max(0, 1 - days / 14);
}

export function scoreQuestion(question: Question, state: UserState) {
  const stat = state.stats[question.id];
  const weakness = stat ? 1 - stat.correctRate : 0.65;
  const novelty = stat ? 0.05 : 0.35;
  const review = stat?.dueAt && new Date(stat.dueAt).getTime() <= Date.now() ? 1 : 0;
  const recent = recencyPenalty(stat?.lastSeenAt);
  const subjectNeed = Math.max(0, 1 - (state.subjects[question.subject] ?? 0) / 100);
  const difficultyBonus = question.difficulty === 'Avançada' || question.difficulty === 'Desafio EEAR' ? 0.06 : 0;
  return weakness * 0.32 + review * 0.28 + subjectNeed * 0.18 + novelty * 0.12 + difficultyBonus - recent * 0.12;
}

export function selectDailyQuestions(pool: Question[], state: UserState, count = 5) {
  const today = new Set(state.alreadyServedToday ?? []);
  const ranked = pool
    .filter(q => !today.has(q.id))
    .map(q => ({ q, score: scoreQuestion(q, state) }))
    .sort((a,b) => b.score - a.score);

  const selected: Question[] = [];
  const usedSubjects = new Set<Subject>();
  for (const item of ranked) {
    if (selected.length >= count) break;
    const needsCoverage = !usedSubjects.has(item.q.subject) && usedSubjects.size < 4;
    if (needsCoverage || selected.length < count) {
      selected.push(item.q);
      usedSubjects.add(item.q.subject);
    }
  }
  return selected.slice(0, count);
}

export function reviewIntervalDays(correct: boolean, confidence: number, repetitions: number) {
  if (!correct) return 1;
  const base = [1, 3, 7, 14, 30, 60][Math.min(repetitions, 5)];
  const confidenceFactor = confidence >= 4 ? 1.25 : confidence <= 2 ? 0.75 : 1;
  return Math.max(1, Math.round(base * confidenceFactor));
}
