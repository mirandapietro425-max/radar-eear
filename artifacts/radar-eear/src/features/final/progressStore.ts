export type ProgressKind =
  | 'viewed'
  | 'started'
  | 'progress'
  | 'completed'
  | 'saved'
  | 'question_answered'
  | 'question_skipped'
  | 'review_completed'
  | 'session_started'
  | 'session_paused'
  | 'session_resumed'
  | 'session_completed';

export type ProgressEvent = {
  id: string;
  title: string;
  kind: ProgressKind;
  category: string;
  at: string;
  value?: number;
  seconds?: number;
  metadata?: Record<string, unknown>;
};

export type LocalProfile = {
  name: string;
  target: string;
  examDate: string;
  specialty: string;
  dailyGoalMinutes: number;
  priorities: string[];
  visualPreference: 'system' | 'light' | 'dark';
  createdAt: string;
  updatedAt: string;
};

export type ResumeState = {
  route: string;
  entity: string;
  subentity?: string;
  position?: number;
  index?: number;
  question?: number;
  progress?: number;
  seconds?: number;
  state?: string;
  timestamp: string;
};

const EVENTS_KEY = 'radar-eear-events-v25';
const PROFILE_KEY = 'radar-eear-profile-v25';
const RESUME_KEY = 'radar-eear-resume-v25';

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function notify() {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('radar-progress-change'));
}

function writeEvents(items: ProgressEvent[]) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(EVENTS_KEY, JSON.stringify(items.slice(-3000)));
    } catch {
      // The UI remains usable when storage is unavailable.
    }
  }
  notify();
}

export function getEvents() {
  return read<ProgressEvent[]>(EVENTS_KEY, []);
}

export function recordProgress(event: Omit<ProgressEvent, 'at'>) {
  writeEvents([...getEvents(), { ...event, at: new Date().toISOString() }]);
}

export function recordViewed(id: string, title: string, category: string) {
  recordProgress({ id, title, kind: 'viewed', category });
}

export function recordCompleted(id: string, title: string, category: string, value = 1) {
  recordProgress({ id, title, kind: 'completed', category, value });
}

export function recordSaved(id: string, title: string, category: string) {
  recordProgress({ id, title, kind: 'saved', category });
}

export function recordQuestionAnswered(id: string, title: string, correct: boolean, metadata?: Record<string, unknown>) {
  recordProgress({ id, title, kind: 'question_answered', category: 'Questões', value: correct ? 1 : 0, metadata });
}

export function recordReviewCompleted(id: string, title: string, metadata?: Record<string, unknown>) {
  recordProgress({ id, title, kind: 'review_completed', category: 'Revisões', value: 1, metadata });
}

export function recordSession(kind: Extract<ProgressKind, 'session_started' | 'session_paused' | 'session_resumed' | 'session_completed'>, seconds = 0) {
  recordProgress({ id: 'focus-session', title: 'Sessão de foco', kind, category: 'Atividade', seconds });
}

export function getProfile(): LocalProfile | null {
  return read<LocalProfile | null>(PROFILE_KEY, null);
}

export function saveProfile(input: Omit<LocalProfile, 'createdAt' | 'updatedAt'>) {
  const previous = getProfile();
  const now = new Date().toISOString();
  const profile: LocalProfile = { ...input, createdAt: previous?.createdAt ?? now, updatedAt: now };
  if (typeof window !== 'undefined') window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  notify();
  return profile;
}

export function getResumeState(): ResumeState | null {
  return read<ResumeState | null>(RESUME_KEY, null);
}

export function saveResumeState(state: Omit<ResumeState, 'timestamp'>) {
  const value = { ...state, timestamp: new Date().toISOString() };
  if (typeof window !== 'undefined') window.localStorage.setItem(RESUME_KEY, JSON.stringify(value));
  notify();
  return value;
}

export function clearResumeState() {
  if (typeof window !== 'undefined') window.localStorage.removeItem(RESUME_KEY);
  notify();
}

export function getLearningStats() {
  const events = getEvents();
  const answers = events.filter((event) => event.kind === 'question_answered');
  const sessions = events.filter((event) => event.kind === 'session_completed');
  const categories: Record<string, { views: number; completed: number; saved: number; seconds: number }> = {};
  for (const event of events) {
    categories[event.category] ??= { views: 0, completed: 0, saved: 0, seconds: 0 };
    if (event.kind === 'viewed' || event.kind === 'started') categories[event.category].views += 1;
    if (event.kind === 'completed' || event.kind === 'review_completed') categories[event.category].completed += 1;
    if (event.kind === 'saved') categories[event.category].saved += 1;
    categories[event.category].seconds += event.seconds ?? 0;
  }
  const viewed = events.filter((event) => event.kind === 'viewed').length;
  const completed = events.filter((event) => event.kind === 'completed' || event.kind === 'review_completed').length;
  const saved = events.filter((event) => event.kind === 'saved').length;
  const correct = answers.filter((event) => event.value === 1).length;
  const activeDays = new Set(events.map((event) => event.at.slice(0, 10))).size;
  const minutes = Math.round(sessions.reduce((sum, event) => sum + (event.seconds ?? 0), 0) / 60);
  return {
    events,
    categories,
    viewed,
    completed,
    saved,
    answered: answers.length,
    correct,
    accuracy: answers.length ? Math.round((correct / answers.length) * 100) : null,
    activeDays,
    minutes,
    sessions: sessions.length,
    radarIndex: viewed || completed || answers.length ? Math.min(100, Math.round(((completed + answers.length + saved) / Math.max(20, viewed + answers.length * 2 + 10)) * 100)) : 0,
  };
}
