import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BookMarked,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Flag,
  Flame,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  Menu,
  Navigation,
  Pause,
  Plane,
  Play,
  Rewind,
  Radar,
  RotateCcw,
  Save,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  FastForward,
  Target,
  Timer,
  Trophy,
} from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRoute,
  Router as WouterRouter,
} from 'wouter';
import NotFound from '@/pages/not-found';
import RadarDayPage from '@/features/radar-day/RadarDayPage';
import NotesPage from '@/features/notes/NotesPage';
import NotificationsSettingsPage from '@/features/notes/NotificationsSettingsPage';
import LearningProgressPage from '@/features/final/LearningProgressPage';
import GlobalSearchPage from '@/features/final/GlobalSearchPage';
import { KnowledgeAtlasPage } from '@/features/atlas/KnowledgeAtlasPage';
import ReadingLibraryPage from '@/features/library/ReadingLibraryPage';
import BookReaderPage from '@/features/library/BookReaderPage';
import EducationalGamesPage from '@/features/games/EducationalGamesPage';
import InteractiveMathLab from '@/features/labs/InteractiveMathLab';
import PhysicsFormulaLab from '@/features/labs/PhysicsFormulaLab';
import KnowledgeExplorePage from '@/features/explore/KnowledgeExplorePage';
import BibleCuriositiesPage from '@/features/bible/BibleCuriositiesPage';
import ApocryphaPage from '@/features/apocrypha/ApocryphaPage';
import ThinkerTrailsPage from '@/features/thinkers/ThinkerTrailsPage';

const queryClient = new QueryClient();

type IconType = typeof Radar;
type Subject = 'Matemática' | 'Física' | 'Língua Portuguesa' | 'Inglês' | 'Língua Inglesa';
type ReviewItem = { id: number; title: string; subject: Subject; due: string; level: string; questions: number };
type TimerContextValue = {
  seconds: number;
  running: boolean;
  toggle: () => void;
  adjust: (amount: number) => void;
  reset: () => void;
};

const navItems: { href: string; label: string; icon: IconType }[] = [
  { href: '/', label: 'Visão geral', icon: LayoutDashboard },
  { href: '/ciclo', label: 'Meu ciclo', icon: RotateCcw },
  { href: '/questoes', label: 'Questões', icon: ListChecks },
  { href: '/edital', label: 'Edital', icon: BookMarked },
  { href: '/cronometro', label: 'Cronômetro', icon: Timer },
  { href: '/simulados', label: 'Simulados', icon: Timer },
  { href: '/revisoes', label: 'Revisões', icon: CalendarDays },
  { href: '/radar-do-dia', label: 'Radar de hoje', icon: Sparkles },
  { href: '/explorar', label: 'Explorar', icon: Navigation },
  { href: '/atlas', label: 'Atlas', icon: Navigation },
  { href: '/biblioteca', label: 'Biblioteca', icon: BookOpen },
  { href: '/pesquisar', label: 'Pesquisar', icon: SlidersHorizontal },
  { href: '/progresso', label: 'Progresso', icon: BarChart3 },
  { href: '/jogos', label: 'Jogos', icon: Trophy },
];

const editalSubjects: { subject: Subject; code: string; description: string; topics: string[]; progress: number; color: string }[] = [
  {
    subject: 'Língua Portuguesa',
    code: 'LP',
    description: 'Leitura precisa, gramática e construção de sentido.',
    topics: ['Interpretação de textos', 'Ortografia e acentuação', 'Classes e formação de palavras', 'Sintaxe, concordância e regência', 'Crase e pontuação', 'Semântica e figuras de linguagem'],
    progress: 68,
    color: 'bg-[hsl(var(--accent))]',
  },
  {
    subject: 'Língua Inglesa',
    code: 'EN',
    description: 'Compreensão de textos e estruturas essenciais do idioma.',
    topics: ['Compreensão e interpretação', 'Pronomes e determinantes', 'Tempos verbais', 'Verbos modais', 'Voz passiva e discurso indireto', 'Preposições, conectivos e vocabulário'],
    progress: 54,
    color: 'bg-[hsl(var(--sidebar-primary))]',
  },
  {
    subject: 'Matemática',
    code: 'MAT',
    description: 'Raciocínio algébrico, geometria e análise de problemas.',
    topics: ['Conjuntos e operações', 'Funções, equações e inequações', 'Progressões aritméticas e geométricas', 'Geometria plana e espacial', 'Trigonometria', 'Análise combinatória, probabilidade e estatística'],
    progress: 61,
    color: 'bg-[hsl(var(--primary))]',
  },
  {
    subject: 'Física',
    code: 'FIS',
    description: 'Modelos físicos para interpretar movimento, energia e fenômenos.',
    topics: ['Grandezas e unidades', 'Cinemática e dinâmica', 'Trabalho, energia e impulso', 'Gravitação e fluidos', 'Termologia e ondas', 'Óptica e eletrodinâmica'],
    progress: 47,
    color: 'bg-emerald-600',
  },
];

const questionBank = [
  {
    id: 1,
    subject: 'Matemática' as Subject,
    difficulty: 'Intermediária',
    prompt: 'Em uma PA de razão 4, o quinto termo é 23. Qual é o primeiro termo dessa progressão?',
    options: ['3', '5', '7', '9'],
    answer: 1,
    explanation: 'Usando a₅ = a₁ + 4r, temos 23 = a₁ + 16. Portanto, o primeiro termo é 7.',
  },
  {
    id: 2,
    subject: 'Física' as Subject,
    difficulty: 'Intermediária',
    prompt: 'Um móvel parte do repouso e atinge 20 m/s em 5 segundos. Considerando aceleração constante, qual é sua aceleração?',
    options: ['2 m/s²', '4 m/s²', '5 m/s²', '10 m/s²'],
    answer: 1,
    explanation: 'A aceleração média é a variação da velocidade pelo tempo: a = (20 − 0) / 5 = 4 m/s².',
  },
  {
    id: 3,
    subject: 'Língua Portuguesa' as Subject,
    difficulty: 'Avançada',
    prompt: 'Na frase “Embora estivesse cansado, manteve o foco”, a oração destacada expressa ideia de:',
    options: ['Causa', 'Concessão', 'Condição', 'Finalidade'],
    answer: 1,
    explanation: 'A conjunção “embora” introduz uma oração subordinada adverbial concessiva.',
  },
  {
    id: 4,
    subject: 'Inglês' as Subject,
    difficulty: 'Básica',
    prompt: 'Choose the correct alternative: “The controller ____ the aircraft to descend.”',
    options: ['instructed', 'instruct', 'instructing', 'was instruct'],
    answer: 0,
    explanation: 'Como a frase está no passado simples, a forma correta do verbo é “instructed”.',
  },
];

const reviewItems: ReviewItem[] = [
  { id: 1, title: 'Leis de Newton', subject: 'Física', due: 'Hoje', level: 'Essencial', questions: 8 },
  { id: 2, title: 'Concordância verbal', subject: 'Língua Portuguesa', due: 'Hoje', level: 'Fixação', questions: 6 },
  { id: 3, title: 'Razão e proporção', subject: 'Matemática', due: 'Hoje', level: 'Consolidação', questions: 10 },
  { id: 4, title: 'Simple past & modal verbs', subject: 'Inglês', due: 'Amanhã', level: 'Manutenção', questions: 5 },
];

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const StudyTimerContext = createContext<TimerContextValue | null>(null);

function useStudyTimer() {
  const context = useContext(StudyTimerContext);
  if (!context) throw new Error('useStudyTimer must be used inside StudyTimerProvider');
  return context;
}

function StudyTimerProvider({ children }: { children: ReactNode }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const value: TimerContextValue = {
    seconds,
    running,
    toggle: () => setRunning((value) => !value),
    adjust: (amount) => setSeconds((value) => Math.max(0, value + amount)),
    reset: () => {
      setSeconds(0);
      setRunning(false);
    },
  };

  return <StudyTimerContext.Provider value={value}>{children}</StudyTimerContext.Provider>;
}

function formatClock(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remaining = seconds % 60;
  return hours > 0
    ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3', compact && 'gap-2')}>
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] shadow-sm">
        <Radar size={19} strokeWidth={2.2} />
        <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
      </div>
      <div className={cn(compact && 'hidden sm:block')}>
        <p className="font-display text-[15px] font-bold leading-none tracking-tight text-[hsl(var(--sidebar-accent-foreground))]">RADAR</p>
        <p className="mt-1 font-mono text-[9px] tracking-[.22em] text-[hsl(var(--sidebar-foreground)/.62)]">EEAR // CFS</p>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [location] = useLocation();
  const timer = useStudyTimer();
  return (
    <>
      {open && <button data-testid="button-close-menu" aria-label="Fechar menu" onClick={onClose} className="fixed inset-0 z-30 bg-[hsl(var(--primary)/.35)] md:hidden" />}
      <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-[250px] -translate-x-full flex-col border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))] px-4 py-5 transition-transform duration-300 md:static md:translate-x-0', open && 'translate-x-0')}>
        <div className="px-3"><Brand /></div>
        <div className="mt-10 px-3">
          <p className="eyebrow text-[hsl(var(--sidebar-foreground)/.52)]">Navegação</p>
        </div>
        <nav className="mt-3 flex-1 space-y-1" aria-label="Navegação principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} onClick={onClose} className={cn('relative flex items-center gap-3 rounded-lg px-3 py-3 text-[13px] font-semibold text-[hsl(var(--sidebar-foreground)/.72)] transition-colors hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]', active && 'nav-active')}>
                <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
                <span>{item.label}</span>
                {item.href === '/revisoes' && <span className="ml-auto rounded-full bg-[hsl(var(--accent)/.16)] px-1.5 py-0.5 font-mono text-[10px] text-[hsl(var(--sidebar-primary))]">3</span>}
              </Link>
            );
          })}
        </nav>
        <div className="mb-3 rounded-xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent)/.6)] p-3.5">
          <div className="flex items-center gap-2 text-[hsl(var(--sidebar-primary))]"><Target size={15} /><span className="font-mono text-[10px] uppercase tracking-wider">Alvo em foco</span></div>
          <p className="mt-2 text-xs font-semibold text-[hsl(var(--sidebar-accent-foreground))]">CFS 2/2027</p>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[hsl(var(--sidebar-foreground)/.62)]"><span>84 dias restantes</span><span>62%</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--sidebar)/.7)]"><div className="h-full w-[62%] rounded-full bg-[hsl(var(--sidebar-primary))]" /></div>
        </div>
        <div className="mb-4 rounded-xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent)/.6)] p-3.5">
          <div className="flex items-center justify-between text-[hsl(var(--sidebar-primary))]">
            <Link href="/cronometro" onClick={onClose} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider hover:underline"><Timer size={15} /> Cronômetro</Link>
            <span className={cn('h-1.5 w-1.5 rounded-full', timer.running ? 'bg-emerald-400' : 'bg-[hsl(var(--sidebar-foreground)/.35)]')} />
          </div>
          <p className="mt-3 font-mono text-xl font-bold tracking-tight text-[hsl(var(--sidebar-accent-foreground))]">{formatClock(timer.seconds)}</p>
          <div className="mt-3 flex items-center gap-2">
            <button aria-label="Voltar um minuto" onClick={() => timer.adjust(-60)} className="flex h-7 flex-1 items-center justify-center rounded-md border border-[hsl(var(--sidebar-border))] text-[hsl(var(--sidebar-foreground)/.75)] hover:bg-[hsl(var(--sidebar-accent))]"><Rewind size={13} /></button>
            <button aria-label={timer.running ? 'Pausar cronômetro' : 'Iniciar cronômetro'} onClick={timer.toggle} className="flex h-7 flex-1 items-center justify-center rounded-md bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] hover:brightness-105">{timer.running ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}</button>
            <button aria-label="Adiantar um minuto" onClick={() => timer.adjust(60)} className="flex h-7 flex-1 items-center justify-center rounded-md border border-[hsl(var(--sidebar-border))] text-[hsl(var(--sidebar-foreground)/.75)] hover:bg-[hsl(var(--sidebar-accent))]"><FastForward size={13} /></button>
          </div>
        </div>
        <Link href="/perfil" data-testid="link-sidebar-profile" onClick={onClose} className="flex items-center gap-3 rounded-lg border-t border-[hsl(var(--sidebar-border))] px-2 py-4 text-left hover:bg-[hsl(var(--sidebar-accent))]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--accent))] font-display text-xs font-bold text-[hsl(var(--accent-foreground))]">MS</div>
          <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-[hsl(var(--sidebar-accent-foreground))]">Marina Santos</p><p className="mt-0.5 font-mono text-[9px] text-[hsl(var(--sidebar-foreground)/.58)]">CANDIDATA • ATIVA</p></div>
          <Settings2 size={14} className="text-[hsl(var(--sidebar-foreground)/.58)]" />
        </Link>
      </aside>
    </>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  const [location] = useLocation();
  const current = navItems.find((item) => item.href === location)?.label ?? (location === '/perfil' ? 'Perfil' : 'Radar');
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/.88)] px-4 backdrop-blur-md sm:px-7 lg:px-10">
      <div className="flex items-center gap-3">
        <button data-testid="button-open-menu" aria-label="Abrir menu" onClick={onMenu} className="rounded-lg p-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] md:hidden"><Menu size={21} /></button>
        <div><p className="eyebrow">{current}</p><p className="mt-1 hidden text-xs text-[hsl(var(--muted-foreground))] sm:block">Atualizado em tempo real</p></div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-500" /><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">SISTEMA ONLINE</span></div>
        <Link href="/perfil" data-testid="link-top-profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] font-display text-xs font-bold text-[hsl(var(--primary-foreground))] transition-transform hover:scale-105">MS</Link>
      </div>
    </header>
  );
}

function MobileNav() {
  const [location] = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex border-t border-[hsl(var(--border))] bg-[hsl(var(--card)/.96)] px-2 py-2 backdrop-blur md:hidden">
      {navItems.slice(0, 4).map((item) => {
        const Icon = item.icon;
        const active = location === item.href;
        return <Link key={item.href} href={item.href} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={cn('flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] font-semibold text-[hsl(var(--muted-foreground))]', active && 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]')}><Icon size={17} /><span>{item.label.split(' ')[0]}</span></Link>;
      })}
    </nav>
  );
}

function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell flex"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /><div className="min-w-0 flex-1"><Topbar onMenu={() => setMenuOpen(true)} /><main className="content-grid mobile-safe min-h-[calc(100dvh-72px)] px-4 py-6 sm:px-7 sm:py-8 lg:px-10">{children}</main></div><MobileNav /></div>;
}

function SectionHeader({ kicker, title, description, action }: { kicker: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">{kicker}</p><h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{description}</p>}</div>{action}</div>;
}

function MetricCard({ icon: Icon, label, value, note, accent = false }: { icon: IconType; label: string; value: string; note: string; accent?: boolean }) {
  return <div className={cn('panel rounded-2xl p-4 sm:p-5', accent && 'border-[hsl(var(--accent)/.4)] bg-[hsl(var(--accent)/.06)]')}><div className="flex items-start justify-between"><span className={cn('flex h-9 w-9 items-center justify-center rounded-lg', accent ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]' : 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]')}><Icon size={17} /></span><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">EST. HOJE</span></div><p className="mt-4 font-display text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-xs font-semibold">{label}</p><p className="mt-2 text-[11px] text-[hsl(var(--muted-foreground))]">{note}</p></div>;
}

function Dashboard() {
  const [started, setStarted] = useState(false);
  const todayProgress = started ? 2 : 0;
  return <div className="mx-auto max-w-[1380px]">
    <SectionHeader kicker="Radar de hoje • 17 out" title="Bom dia, Marina." description="Seu próximo movimento está calculado. Faça o primeiro bloco antes de decidir o resto." action={<Link href="/questoes" data-testid="link-dashboard-questions" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary-foreground))] shadow-sm transition-transform hover:-translate-y-0.5">Abrir questões <ArrowRight size={15} /></Link>} />
    {started && <div data-testid="status-session-started" className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><CheckCircle2 size={17} /><span><strong>Bloco iniciado.</strong> A primeira questão já está esperando você.</span><Link href="/questoes" data-testid="link-continue-session" className="ml-auto font-bold underline underline-offset-4">Continuar</Link></div>}
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <MetricCard icon={Flame} label="Dias em sequência" value="12 dias" note="Seu melhor: 18 dias" accent />
      <MetricCard icon={BarChart3} label="Aproveitamento" value="74,2%" note="+4,8% nos últimos 7 dias" />
      <MetricCard icon={Clock3} label="Tempo estudado" value="1h 25min" note="Meta diária: 2h" />
      <MetricCard icon={Trophy} label="Questões resolvidas" value="47" note="8 acima da média semanal" />
    </div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
      <section className="panel overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-5 py-4 sm:px-6"><div><p className="eyebrow">Fila de estudo</p><h2 className="mt-1 font-display text-lg font-bold">O que fazer agora</h2></div><span className="rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1 font-mono text-[10px] text-[hsl(var(--primary))]">{todayProgress}/4 concluídos</span></div>
        <div className="divide-y divide-[hsl(var(--border))]">
          <QueueItem index="01" subject="Matemática" title="Funções do 2º grau" meta="25 min • 12 questões" icon={Target} active={!started} onStart={() => setStarted(true)} />
          <QueueItem index="02" subject="Física" title="Movimento uniforme" meta="20 min • revisão guiada" icon={RotateCcw} done={started} />
          <QueueItem index="03" subject="Língua Portuguesa" title="Concordância e regência" meta="20 min • 10 questões" icon={BookOpen} />
          <QueueItem index="04" subject="Inglês" title="Interpretação de texto" meta="15 min • leitura ativa" icon={Navigation} />
        </div>
        <div className="flex items-center justify-between bg-[hsl(var(--secondary)/.38)] px-5 py-3 sm:px-6"><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">FIM DA ROTA • 1h 20min estimados</span><Link href="/ciclo" data-testid="link-view-cycle" className="text-xs font-bold text-[hsl(var(--primary))]">Ver ciclo completo <ChevronRight size={14} className="inline" /></Link></div>
      </section>
      <div className="space-y-6">
        <section className="radar-sweep panel relative min-h-[220px] overflow-hidden rounded-2xl bg-[hsl(var(--primary))] p-6 text-[hsl(var(--primary-foreground))]"><div className="relative z-10"><div className="flex items-center justify-between"><span className="eyebrow text-[hsl(var(--sidebar-primary))]">Próxima melhor ação</span><Sparkles size={18} className="text-[hsl(var(--sidebar-primary))]" /></div><h2 className="mt-5 max-w-[220px] font-display text-2xl font-bold leading-tight">Resolver 12 questões de Matemática</h2><p className="mt-3 max-w-[230px] text-xs leading-relaxed text-[hsl(var(--primary-foreground)/.68)]">Seu desempenho caiu 6% neste tema esta semana.</p><Link href="/questoes" data-testid="link-next-action" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--sidebar-primary))]">Ir para o treino <ArrowRight size={14} /></Link></div></section>
        <section className="panel rounded-2xl p-5"><div className="flex items-center justify-between"><div><p className="eyebrow">Ritmo semanal</p><h2 className="mt-1 font-display text-lg font-bold">Consistência é pista</h2></div><Flame size={18} className="text-[hsl(var(--accent))]" /></div><div className="mt-6 flex h-[92px] items-end justify-between gap-2">{['S','T','Q','Q','S','S','D'].map((day, i) => <div key={`${day}-${i}`} className="flex flex-1 flex-col items-center gap-2"><div className="flex h-16 w-full items-end justify-center rounded-md bg-[hsl(var(--secondary)/.58)]"><div className={cn('w-full rounded-md bg-[hsl(var(--primary))]', i === 4 && 'bg-[hsl(var(--accent))]')} style={{ height: `${[48, 72, 34, 58, 84, 24, 12][i]}%` }} /></div><span className="font-mono text-[9px] text-[hsl(var(--muted-foreground))]">{day}</span></div>)}</div><p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">Você estudou <strong className="text-[hsl(var(--foreground))]">5 de 7 dias</strong> nesta semana.</p></section>
      </div>
    </div>
  </div>;
}

function QueueItem({ index, subject, title, meta, icon: Icon, done, active, onStart }: { index: string; subject: string; title: string; meta: string; icon: IconType; done?: boolean; active?: boolean; onStart?: () => void }) {
  return <div className={cn('group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[hsl(var(--secondary)/.36)] sm:px-6', done && 'opacity-60')}><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">{index}</span><div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', done ? 'bg-emerald-100 text-emerald-700' : active ? 'bg-[hsl(var(--accent)/.14)] text-[hsl(var(--accent))]' : 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]')}>{done ? <Check size={16} /> : <Icon size={17} />}</div><div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{subject}</p><p className={cn('mt-0.5 truncate text-sm font-bold', done && 'line-through')}>{title}</p><p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">{meta}</p></div>{active ? <button data-testid={`button-start-${index}`} onClick={onStart} className="rounded-lg bg-[hsl(var(--accent))] px-3 py-2 text-[11px] font-bold text-[hsl(var(--accent-foreground))] transition-transform hover:-translate-y-0.5">Começar</button> : <span className="hidden text-[11px] font-semibold text-[hsl(var(--muted-foreground))] sm:block">{done ? 'Concluído' : 'Na fila'}</span>}</div>;
}

function CyclePage() {
  const [selectedDay, setSelectedDay] = useState('Hoje');
  const [adjusting, setAdjusting] = useState(false);
  const [extraBlock, setExtraBlock] = useState(false);
  const [completedBlocks, setCompletedBlocks] = useState<number[]>([]);
  const days = ['Seg', 'Ter', 'Qua', 'Hoje', 'Sex', 'Sáb', 'Dom'];
  const blocks = [
    { time: '07:30', title: 'Matemática', detail: 'Funções • bloco principal', duration: '35 min', tone: 'accent' },
    { time: '18:00', title: 'Física', detail: 'Revisão de movimento', duration: '25 min', tone: 'navy' },
    { time: '19:00', title: 'Português', detail: 'Questões de concordância', duration: '20 min', tone: 'soft' },
  ];
  return <div className="mx-auto max-w-[1380px]"><SectionHeader kicker="Planejamento operacional" title="Meu ciclo" description="Uma rota semanal realista, calibrada para você avançar sem perder o fôlego." action={<button data-testid="button-edit-cycle" onClick={() => setAdjusting((value) => !value)} className={cn('inline-flex items-center justify-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-xs font-bold hover:bg-[hsl(var(--secondary))]', adjusting && 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]')}><SlidersHorizontal size={15} /> {adjusting ? 'Concluir ajustes' : 'Ajustar ciclo'}</button>} />
    {adjusting && <div data-testid="status-cycle-adjusting" className="mb-5 flex items-center gap-2 rounded-xl border border-[hsl(var(--accent)/.25)] bg-[hsl(var(--accent)/.07)] px-4 py-3 text-xs font-semibold"><Settings2 size={15} className="text-[hsl(var(--accent))]" /> Modo de ajuste ativo. Escolha um dia ou adicione um bloco.</div>}
    <div className="panel rounded-2xl p-4 sm:p-6"><div className="flex items-center justify-between"><div><p className="eyebrow">Semana 42 • 14–20 out</p><p className="mt-1 text-sm font-semibold">Distribuição dos blocos</p></div><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">7h 40min planejados</span></div><div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-3">{days.map((day, i) => <button key={day} data-testid={`button-cycle-day-${i}`} onClick={() => setSelectedDay(day)} className={cn('rounded-xl border px-1 py-3 text-center transition-colors', selectedDay === day ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--secondary))]')}><span className="block font-mono text-[9px] uppercase opacity-70">{day}</span><strong className="mt-1 block font-display text-lg">{14 + i}</strong><span className={cn('mx-auto mt-2 block h-1 w-5 rounded-full', i < 4 ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--muted))]')} /></button>)}</div></div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]"><section className="panel rounded-2xl p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="eyebrow">Rota de {selectedDay.toLowerCase()}</p><h2 className="mt-1 font-display text-xl font-bold">Blocos de estudo</h2></div><button data-testid="button-add-block" onClick={() => setExtraBlock(true)} disabled={extraBlock} className="rounded-lg border border-[hsl(var(--border))] px-3 py-2 text-xs font-bold hover:bg-[hsl(var(--secondary))] disabled:opacity-50">+ Adicionar bloco</button></div><div className="mt-6 space-y-3">{blocks.map((block, i) => <div key={block.time} data-testid={`card-cycle-block-${i}`} className={cn('flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--secondary)/.35)]', completedBlocks.includes(i) && 'opacity-55')}><span className="w-12 font-mono text-[11px] text-[hsl(var(--muted-foreground))]">{block.time}</span><div className={cn('h-10 w-1 rounded-full', block.tone === 'accent' ? 'bg-[hsl(var(--accent))]' : block.tone === 'navy' ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--sidebar-primary))]')} /><div className="min-w-0 flex-1"><p className={cn('text-sm font-bold', completedBlocks.includes(i) && 'line-through')}>{block.title}</p><p className="mt-1 truncate text-xs text-[hsl(var(--muted-foreground))]">{block.detail}</p></div><span className="hidden font-mono text-[10px] text-[hsl(var(--muted-foreground))] sm:block">{block.duration}</span><button data-testid={`button-complete-block-${i}`} aria-label={`Concluir ${block.title}`} onClick={() => setCompletedBlocks((current) => current.includes(i) ? current.filter((item) => item !== i) : [...current, i])} className={cn('flex h-8 w-8 items-center justify-center rounded-full border text-[hsl(var(--muted-foreground))] hover:border-emerald-500 hover:text-emerald-600', completedBlocks.includes(i) && 'border-emerald-500 bg-emerald-50 text-emerald-700')}><Check size={15} /></button></div>)}{extraBlock && <div data-testid="card-cycle-extra-block" className="flex items-center gap-4 rounded-xl border border-dashed border-[hsl(var(--accent)/.5)] bg-[hsl(var(--accent)/.05)] p-4"><span className="w-12 font-mono text-[11px] text-[hsl(var(--accent))]">20:00</span><div className="h-10 w-1 rounded-full bg-[hsl(var(--accent))]" /><div className="min-w-0 flex-1"><p className="text-sm font-bold">Bloco livre</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Escolha um assunto para completar o ciclo</p></div><CircleHelp size={17} className="text-[hsl(var(--accent))]" /></div>}</div></section>
      <aside className="panel rounded-2xl bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))]"><p className="eyebrow text-[hsl(var(--sidebar-primary))]">Balanço do ciclo</p><h2 className="mt-2 font-display text-xl font-bold">Você está na rota.</h2><div className="mt-7 flex items-end justify-between"><span className="font-mono text-4xl text-[hsl(var(--sidebar-primary))]">68%</span><span className="mb-1 text-xs text-[hsl(var(--primary-foreground)/.68)]">concluído</span></div><div className="mt-3 h-2 rounded-full bg-[hsl(var(--primary-foreground)/.14)]"><div className="h-full w-[68%] rounded-full bg-[hsl(var(--sidebar-primary))]" /></div><div className="mt-7 space-y-4 border-t border-[hsl(var(--primary-foreground)/.14)] pt-5"><div className="flex justify-between text-xs"><span className="text-[hsl(var(--primary-foreground)/.7)]">Horas realizadas</span><strong>4h 55min</strong></div><div className="flex justify-between text-xs"><span className="text-[hsl(var(--primary-foreground)/.7)]">Blocos restantes</span><strong>6</strong></div><div className="flex justify-between text-xs"><span className="text-[hsl(var(--primary-foreground)/.7)]">Foco principal</span><strong className="text-[hsl(var(--sidebar-primary))]">Matemática</strong></div></div></aside></div>
  </div>;
}

function QuestionsPage({ favorites, onToggleFavorite }: { favorites: number[]; onToggleFavorite: (id: number) => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [subjectFilter, setSubjectFilter] = useState('Todas');
  const [difficultyFilter, setDifficultyFilter] = useState('Todas');
  const [finished, setFinished] = useState<number[]>([]);
  const allFiltered = useMemo(() => questionBank.filter((q) => (subjectFilter === 'Todas' || q.subject === subjectFilter) && (difficultyFilter === 'Todas' || q.difficulty === difficultyFilter)), [subjectFilter, difficultyFilter]);
  const question = allFiltered[index % Math.max(allFiltered.length, 1)] ?? questionBank[0];
  const isFinished = finished.includes(question.id);
  const choose = (value: number) => { if (!isFinished) setSelected(value); };
  const next = () => { setFinished((prev) => prev.includes(question.id) ? prev : [...prev, question.id]); setSelected(null); setIndex((prev) => prev + 1); };
  return <div className="mx-auto max-w-[1120px]"><SectionHeader kicker="Treino direcionado" title="Questões" description="Pratique com intenção. O Radar prioriza os assuntos onde sua atenção rende mais." action={<div className="flex items-center gap-2 font-mono text-[10px] text-[hsl(var(--muted-foreground))]"><span className="h-2 w-2 rounded-full bg-emerald-500" /> sessão local ativa</div>} />
    <div className="mb-5 flex flex-wrap gap-2"><label className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2"><SlidersHorizontal size={14} className="text-[hsl(var(--muted-foreground))]" /><select data-testid="select-question-subject" value={subjectFilter} onChange={(e) => { setSubjectFilter(e.target.value); setIndex(0); setSelected(null); }} className="bg-transparent text-xs font-semibold outline-none"><option>Todas</option><option>Matemática</option><option>Física</option><option>Língua Portuguesa</option><option>Inglês</option></select></label><select data-testid="select-question-difficulty" value={difficultyFilter} onChange={(e) => { setDifficultyFilter(e.target.value); setIndex(0); setSelected(null); }} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-xs font-semibold outline-none"><option>Todas</option><option>Básica</option><option>Intermediária</option><option>Avançada</option></select><span className="ml-auto flex items-center rounded-lg bg-[hsl(var(--secondary))] px-3 py-2 font-mono text-[10px] text-[hsl(var(--primary))]">{Math.min(finished.length, 4)}/4 respondidas</span></div>
    <div className="grid gap-6 lg:grid-cols-[1fr_285px]"><section className="panel rounded-2xl p-5 sm:p-8"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><span className="rounded-full bg-[hsl(var(--accent)/.13)] px-2 py-1 font-mono text-[10px] font-bold text-[hsl(var(--accent))]">{question.subject}</span><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">{question.difficulty}</span></div><p className="mt-4 font-mono text-[10px] text-[hsl(var(--muted-foreground))]">QUESTÃO {String(index + 1).padStart(2, '0')} / {allFiltered.length || 0}</p></div><button data-testid={`button-favorite-question-${question.id}`} aria-label="Favoritar questão" onClick={() => onToggleFavorite(question.id)} className="rounded-lg p-2 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--accent))]">{favorites.includes(question.id) ? <BookmarkCheck size={19} className="text-[hsl(var(--accent))]" /> : <Bookmark size={19} />}</button></div><div className="mt-5 h-1.5 rounded-full bg-[hsl(var(--muted))]"><div className="h-full rounded-full bg-[hsl(var(--accent))] transition-all" style={{ width: `${((index % 4) + 1) * 25}%` }} /></div><h2 data-testid="text-question-prompt" className="mt-8 max-w-2xl font-display text-xl font-bold leading-relaxed sm:text-2xl">{question.prompt}</h2><div className="mt-7 grid gap-3">{question.options.map((option, optionIndex) => { const right = selected !== null && optionIndex === question.answer; const wrong = selected === optionIndex && optionIndex !== question.answer; return <button key={option} data-testid={`button-answer-${optionIndex}`} onClick={() => choose(optionIndex)} className={cn('flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-semibold transition-colors', right ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-red-400 bg-red-50 text-red-800' : selected === optionIndex ? 'border-[hsl(var(--primary))] bg-[hsl(var(--secondary))]' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary)/.45)]')}><span className={cn('flex h-7 w-7 items-center justify-center rounded-md border font-mono text-xs', right ? 'border-emerald-500 bg-emerald-500 text-white' : wrong ? 'border-red-400' : 'border-[hsl(var(--border))]')}>{String.fromCharCode(65 + optionIndex)}</span>{option}{right && <CheckCircle2 size={17} className="ml-auto" />}</button>; })}</div>{selected !== null && <div data-testid="panel-question-explanation" className={cn('mt-6 rounded-xl border p-4', selected === question.answer ? 'border-emerald-600/20 bg-emerald-50' : 'border-[hsl(var(--accent)/.2)] bg-[hsl(var(--accent)/.06)]')}><div className="flex gap-3"><Lightbulb size={17} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" /><div><p className="text-xs font-bold">{selected === question.answer ? 'Boa leitura de rota.' : 'Vale revisar este ponto.'}</p><p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{question.explanation}</p></div></div></div>}<div className="mt-7 flex items-center justify-between border-t border-[hsl(var(--border))] pt-5"><button data-testid="button-skip-question" onClick={next} className="text-xs font-bold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Pular por agora</button><button data-testid="button-next-question" onClick={next} disabled={selected === null} className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary-foreground))] disabled:cursor-not-allowed disabled:opacity-40">Próxima questão <ArrowRight size={14} /></button></div></section>
      <aside className="space-y-6"><section className="panel rounded-2xl p-5"><div className="flex items-center justify-between"><p className="eyebrow">Desempenho</p><BarChart3 size={16} className="text-[hsl(var(--accent))]" /></div><p className="mt-3 font-display text-3xl font-bold">74,2%</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">neste conjunto</p><div className="mt-5 space-y-3"><div className="flex justify-between text-xs"><span>Acertos</span><strong>31</strong></div><div className="flex justify-between text-xs"><span>Tempo médio</span><strong>01:42</strong></div><div className="flex justify-between text-xs"><span>Favoritas</span><strong>{favorites.length}</strong></div></div></section><section className="rounded-2xl border border-[hsl(var(--accent)/.25)] bg-[hsl(var(--accent)/.07)] p-5"><div className="flex items-center gap-2 text-[hsl(var(--accent))]"><CircleHelp size={17} /><p className="text-xs font-bold">Dica de concentração</p></div><p className="mt-3 text-xs leading-relaxed text-[hsl(var(--foreground)/.72)]">Leia o comando duas vezes antes de olhar as alternativas. Isso reduz o ruído.</p></section></aside></div>
  </div>;
}

function SimuladosPage() {
  const [activeExam, setActiveExam] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(90 * 60);
  const [examAnswer, setExamAnswer] = useState<number | null>(null);
  useEffect(() => { if (!activeExam) return; const id = window.setInterval(() => setSeconds((value) => Math.max(value - 1, 0)), 1000); return () => window.clearInterval(id); }, [activeExam]);
  const formatTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  if (activeExam) return <div className="mx-auto max-w-[1080px]"><div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow text-[hsl(var(--accent))]">Modo simulado • em andamento</p><h1 className="mt-2 font-display text-3xl font-bold">CFS/EEAR • Bloco 01</h1></div><div className="flex items-center gap-3 rounded-xl border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.08)] px-4 py-3"><Clock3 size={17} className="text-[hsl(var(--accent))]" /><span data-testid="status-exam-timer" className="font-mono text-lg font-bold text-[hsl(var(--accent))]">{formatTime}</span></div></div><div className="panel rounded-2xl p-6 sm:p-10"><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">QUESTÃO 01 / 60</span><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">MATEMÁTICA</span></div><h2 className="mt-8 max-w-2xl font-display text-2xl font-bold leading-relaxed">Se x + 2y = 14 e x − y = 2, qual é o valor de y?</h2><div className="mt-8 grid gap-3 sm:grid-cols-2">{['2', '4', '6', '8'].map((option, i) => <button key={option} data-testid={`button-exam-option-${i}`} onClick={() => setExamAnswer(i)} className={cn('rounded-xl border p-4 text-left text-sm font-semibold hover:bg-[hsl(var(--secondary))]', examAnswer === i ? 'border-[hsl(var(--primary))] bg-[hsl(var(--secondary))]' : 'border-[hsl(var(--border))]')}><span className="mr-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{String.fromCharCode(65 + i)}</span>{option}</button>)}</div><div className="mt-10 flex justify-between border-t border-[hsl(var(--border))] pt-5"><button data-testid="button-exit-exam" onClick={() => { setActiveExam(null); setExamAnswer(null); }} className="text-xs font-bold text-[hsl(var(--muted-foreground))]">Sair do simulado</button><button data-testid="button-next-exam" onClick={() => setExamAnswer(null)} className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary-foreground))]">Próxima <ArrowRight size={14} /></button></div></div></div>;
  return <div className="mx-auto max-w-[1200px]"><SectionHeader kicker="Avaliação de prontidão" title="Simulados" description="Treine o ambiente da prova para que o dia do exame pareça familiar." action={<div className="flex items-center gap-2 rounded-lg bg-[hsl(var(--secondary))] px-3 py-2 font-mono text-[10px] text-[hsl(var(--primary))]"><Trophy size={14} /> 2 concluídos</div>} /><div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><section className="panel rounded-2xl p-5 sm:p-7"><div className="flex items-start justify-between"><div><span className="rounded-full bg-[hsl(var(--accent)/.13)] px-2 py-1 font-mono text-[10px] font-bold text-[hsl(var(--accent))]">RECOMENDADO</span><h2 className="mt-4 font-display text-2xl font-bold">Simulado CFS/EEAR #03</h2><p className="mt-2 max-w-md text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Uma rodada equilibrada com o peso dos assuntos que mais aparecem no seu radar.</p></div><div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--sidebar-primary))] sm:flex"><Plane size={24} /></div></div><div className="mt-7 grid grid-cols-3 gap-3 border-y border-[hsl(var(--border))] py-4"><div><p className="font-mono text-lg font-bold">60</p><p className="mt-1 text-[10px] text-[hsl(var(--muted-foreground))]">questões</p></div><div><p className="font-mono text-lg font-bold">90 min</p><p className="mt-1 text-[10px] text-[hsl(var(--muted-foreground))]">duração</p></div><div><p className="font-mono text-lg font-bold">4 áreas</p><p className="mt-1 text-[10px] text-[hsl(var(--muted-foreground))]">cobertura</p></div></div><button data-testid="button-start-mock" onClick={() => setActiveExam('mock-03')} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-4 py-3 text-xs font-bold text-[hsl(var(--accent-foreground))] transition-transform hover:-translate-y-0.5"><Play size={15} fill="currentColor" /> Iniciar simulado</button></section><section className="panel rounded-2xl p-5 sm:p-7"><div className="flex items-center justify-between"><div><p className="eyebrow">Seu histórico</p><h2 className="mt-1 font-display text-xl font-bold">Últimos voos</h2></div><BarChart3 size={17} className="text-[hsl(var(--muted-foreground))]" /></div><div className="mt-6 space-y-4">{[['#02', '68,3%', '12 out'], ['#01', '64,7%', '05 out']].map(([id, score, date]) => <div key={id} className="flex items-center gap-3 border-b border-[hsl(var(--border))] pb-4 last:border-0"><span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">{id}</span><div className="flex-1"><p className="text-sm font-bold">Simulado CFS/EEAR</p><p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">{date} • 60 questões</p></div><strong className="font-mono text-sm text-[hsl(var(--primary))]">{score}</strong></div>)}</div><Link href="/revisoes" data-testid="link-simulado-review" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[hsl(var(--primary))]">Ver pontos a revisar <ArrowRight size={13} /></Link></section></div><div className="mt-6 panel rounded-2xl p-5 sm:p-7"><div className="flex items-center gap-3"><LockKeyhole size={18} className="text-[hsl(var(--muted-foreground))]" /><div><p className="text-sm font-bold">Simulados oficiais em preparação</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Mais 4 provas completas serão liberadas após você fechar o ciclo de fundamentos.</p></div></div></div></div>;
}

function ReviewsPage() {
  const [completed, setCompleted] = useState<number[]>([]);
  const visible = reviewItems.filter((item) => !completed.includes(item.id));
  return <div className="mx-auto max-w-[1120px]"><SectionHeader kicker="Memória em manutenção" title="Revisões" description="O que volta no momento certo fica. Complete os itens de hoje e mantenha sua base pronta para a prova." action={<div className="flex items-center gap-2 font-mono text-[10px] text-[hsl(var(--muted-foreground))]"><CalendarDays size={14} /> 3 itens vencem hoje</div>} />{completed.length > 0 && <div data-testid="status-review-feedback" className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><CheckCircle2 size={17} /><span><strong>Boa manutenção.</strong> {completed.length} {completed.length === 1 ? 'item concluído' : 'itens concluídos'} nesta sessão.</span></div>}<div className="grid gap-6 lg:grid-cols-[1fr_300px]"><section className="panel rounded-2xl p-5 sm:p-7"><div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-4"><div><p className="eyebrow">Fila de hoje</p><h2 className="mt-1 font-display text-xl font-bold">{visible.length ? `${visible.length} itens no radar` : 'Fila limpa'}</h2></div><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">{completed.length}/3 feitos</span></div>{visible.length === 0 ? <div data-testid="empty-reviews" className="flex flex-col items-center py-14 text-center"><CheckCircle2 size={32} className="text-emerald-600" /><p className="mt-4 font-display text-lg font-bold">Tudo em dia.</p><p className="mt-2 max-w-xs text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">A próxima rodada aparece aqui quando sua memória pedir.</p></div> : <div className="mt-2 divide-y divide-[hsl(var(--border))]">{visible.map((item) => <div key={item.id} data-testid={`card-review-${item.id}`} className="flex items-center gap-3 py-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><RotateCcw size={17} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold">{item.title}</p><span className="font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{item.subject}</span></div><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{item.questions} questões • {item.level} • vence {item.due.toLowerCase()}</p></div><button data-testid={`button-complete-review-${item.id}`} onClick={() => setCompleted((prev) => [...prev, item.id])} className="inline-flex items-center gap-1.5 rounded-lg border border-[hsl(var(--border))] px-3 py-2 text-[11px] font-bold hover:border-emerald-500 hover:text-emerald-700"><Check size={14} /> Feito</button></div>)}</div>}</section><aside className="space-y-6"><section className="panel rounded-2xl p-5"><p className="eyebrow">Por que revisar agora?</p><p className="mt-3 text-sm font-bold leading-relaxed">A repetição espaçada transforma esforço em lembrança disponível.</p><div className="mt-5 flex items-center gap-3 border-t border-[hsl(var(--border))] pt-4"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent)/.13)] text-[hsl(var(--accent))]"><Lightbulb size={17} /></div><p className="text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">Sessões curtas e frequentes vencem maratonas.</p></div></section><section className="rounded-2xl bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))]"><div className="flex items-center gap-2 text-[hsl(var(--sidebar-primary))]"><Flame size={17} /><span className="font-mono text-[10px] uppercase tracking-wider">Sequência de revisão</span></div><p className="mt-3 font-display text-3xl font-bold">8 dias</p><p className="mt-1 text-xs text-[hsl(var(--primary-foreground)/.65)]">Não deixe o radar apagar hoje.</p></section></aside></div></div>;
}

function TimerPage() {
  const timer = useStudyTimer();
  return <div className="mx-auto max-w-[1120px]">
    <SectionHeader kicker="Sessão de foco" title="Cronômetro" description="Estude no seu ritmo. O tempo continua contando enquanto você navega pelo Radar." action={<span className={cn('flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[10px]', timer.running ? 'bg-emerald-100 text-emerald-800' : 'bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]')}><span className={cn('h-2 w-2 rounded-full', timer.running ? 'bg-emerald-500' : 'bg-[hsl(var(--muted-foreground)/.45)]')} /> {timer.running ? 'sessão em andamento' : 'pronto para começar'}</span>} />
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="panel relative overflow-hidden rounded-2xl p-6 sm:p-10">
        <div className="timer-glow pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative z-10 flex min-h-[430px] flex-col items-center justify-center text-center">
          <div className="mb-8 flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/.7)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]"><Timer size={14} className="text-[hsl(var(--accent))]" /> Sessão livre</div>
          <p data-testid="text-study-timer" className="font-mono text-6xl font-bold tracking-[-.08em] text-[hsl(var(--primary))] sm:text-8xl">{formatClock(timer.seconds)}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{timer.running ? 'Mantenha o foco. Cada segundo entra no seu histórico de estudo.' : 'Quando estiver pronto, inicie o cronômetro e escolha uma matéria para estudar.'}</p>
          <div className="mt-9 flex items-center gap-2 sm:gap-3">
            <button data-testid="button-timer-back" aria-label="Voltar um minuto" onClick={() => timer.adjust(-60)} className="timer-control"><Rewind size={18} /><span className="hidden sm:inline">− 1 min</span></button>
            <button data-testid="button-timer-toggle" onClick={timer.toggle} className="inline-flex h-14 min-w-32 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-5 text-sm font-bold text-[hsl(var(--accent-foreground))] shadow-lg shadow-[hsl(var(--accent)/.22)] transition-transform hover:-translate-y-0.5">{timer.running ? <><Pause size={18} /> Pausar</> : <><Play size={18} fill="currentColor" /> Iniciar</>}</button>
            <button data-testid="button-timer-forward" aria-label="Adiantar um minuto" onClick={() => timer.adjust(60)} className="timer-control"><span className="hidden sm:inline">+ 1 min</span><FastForward size={18} /></button>
          </div>
          <button data-testid="button-timer-reset" onClick={timer.reset} className="mt-6 text-xs font-bold text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--foreground))] hover:underline">Zerar sessão</button>
        </div>
      </section>
      <aside className="space-y-6">
        <section className="panel rounded-2xl p-5">
          <p className="eyebrow">Atalhos de estudo</p>
          <h2 className="mt-2 font-display text-xl font-bold">Escolha o próximo bloco</h2>
          <p className="mt-2 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">O cronômetro é livre. Use uma sugestão para registrar mentalmente o que está no foco.</p>
          <div className="mt-5 space-y-2">
            {['Matemática • funções', 'Física • cinemática', 'Português • sintaxe', 'Inglês • reading'].map((label) => <button key={label} onClick={() => { if (!timer.running) timer.toggle(); }} className="flex w-full items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-3 text-left text-xs font-bold transition-colors hover:border-[hsl(var(--accent)/.5)] hover:bg-[hsl(var(--secondary)/.45)]"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Target size={14} /></span>{label}<ArrowRight size={14} className="ml-auto text-[hsl(var(--muted-foreground))]" /></button>)}
          </div>
        </section>
        <section className="rounded-2xl bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))]">
          <div className="flex items-center gap-2 text-[hsl(var(--sidebar-primary))]"><Clock3 size={16} /><span className="font-mono text-[10px] uppercase tracking-wider">Como funciona</span></div>
          <p className="mt-3 text-sm font-bold leading-relaxed">Volte ou adiante o tempo em blocos de 1 minuto para corrigir pausas sem perder o registro da sessão.</p>
        </section>
      </aside>
    </div>
  </div>;
}

function EditalPage() {
  const [expanded, setExpanded] = useState<Subject | null>('Matemática');
  const completedTopics = editalSubjects.reduce((total, item) => total + Math.round(item.topics.length * item.progress / 100), 0);
  const totalTopics = editalSubjects.reduce((total, item) => total + item.topics.length, 0);
  return <div className="mx-auto max-w-[1200px]">
    <SectionHeader kicker="Conteúdo programático" title="Edital CFS/EEAR" description="As quatro disciplinas da prova escrita, organizadas para você saber exatamente o que estudar em cada voo." action={<div className="rounded-xl bg-[hsl(var(--secondary))] px-3 py-2 text-right"><p className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">COBERTURA ATUAL</p><p className="mt-1 font-display text-lg font-bold text-[hsl(var(--primary))]">{completedTopics}/{totalTopics} tópicos</p></div>} />
    <div className="mb-6 grid gap-3 sm:grid-cols-3">
      <div className="panel rounded-2xl p-4"><p className="eyebrow">Prova escrita</p><p className="mt-2 font-display text-2xl font-bold">4 áreas</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Português, Inglês, Matemática e Física</p></div>
      <div className="panel rounded-2xl p-4"><p className="eyebrow">Trilha monitorada</p><p className="mt-2 font-display text-2xl font-bold">GBCT</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Controle de Tráfego Aéreo</p></div>
      <div className="panel rounded-2xl p-4"><p className="eyebrow">Próximo passo</p><Link href="/questoes" className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))]">Treinar por matéria <ArrowRight size={15} /></Link><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Questões para fixar cada tópico</p></div>
    </div>
    <div className="space-y-3">
      {editalSubjects.map((item) => {
        const isOpen = expanded === item.subject;
        return <section key={item.subject} className="panel overflow-hidden rounded-2xl">
          <button data-testid={`button-edital-${item.code}`} onClick={() => setExpanded(isOpen ? null : item.subject)} className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[hsl(var(--secondary)/.35)] sm:p-6">
            <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold text-white', item.color)}>{item.code}</span>
            <span className="min-w-0 flex-1"><span className="block font-display text-lg font-bold">{item.subject}</span><span className="mt-1 block text-xs text-[hsl(var(--muted-foreground))]">{item.description}</span></span>
            <span className="hidden w-32 sm:block"><span className="flex justify-between font-mono text-[9px] text-[hsl(var(--muted-foreground))]"><span>DOMÍNIO</span><span>{item.progress}%</span></span><span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><span className={cn('block h-full rounded-full', item.color)} style={{ width: `${item.progress}%` }} /></span></span>
            <ChevronRight size={18} className={cn('shrink-0 text-[hsl(var(--muted-foreground))] transition-transform', isOpen && 'rotate-90')} />
          </button>
          {isOpen && <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.2)] px-5 pb-5 pt-4 sm:px-6 sm:pb-6"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{item.topics.map((topic, index) => <Link href="/questoes" key={topic} className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 transition-colors hover:border-[hsl(var(--accent)/.5)]"><span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white', index < Math.round(item.topics.length * item.progress / 100) ? item.color : 'bg-[hsl(var(--muted-foreground)/.35)]')}>{index < Math.round(item.topics.length * item.progress / 100) ? <Check size={12} /> : index + 1}</span><span className="text-xs font-semibold leading-relaxed group-hover:text-[hsl(var(--primary))]">{topic}</span></Link>)}</div></div>}
        </section>;
      })}
    </div>
    <p className="mt-5 text-[11px] leading-relaxed text-[hsl(var(--muted-foreground))]">A organização acima é uma trilha de estudos baseada no conteúdo programático do CFS/EEAR. Confira sempre a versão mais recente das Instruções Específicas do exame no portal oficial da EEAR.</p>
  </div>;
}

function ProfilePage() {
  const [name, setName] = useState('Marina Santos');
  const [target, setTarget] = useState('CFS 2/2027');
  const [dailyGoal, setDailyGoal] = useState('2 horas');
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 2200); };
  return <div className="mx-auto max-w-[960px]"><SectionHeader kicker="Configuração pessoal" title="Perfil" description="Deixe o cockpit com a sua medida. Essas escolhas calibram sua rota diária." /><div className="grid gap-6 lg:grid-cols-[260px_1fr]"><aside className="panel rounded-2xl p-5"><div className="flex items-center gap-3 lg:block"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] font-display text-xl font-bold text-[hsl(var(--primary-foreground))]">MS</div><div className="mt-0 lg:mt-5"><p className="font-display text-lg font-bold">Marina Santos</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Candidata ativa</p></div></div><div className="mt-6 hidden border-t border-[hsl(var(--border))] pt-5 lg:block"><p className="eyebrow">Progresso geral</p><p className="mt-2 font-display text-2xl font-bold">62%</p><div className="progress-track mt-3"><div className="progress-fill w-[62%]" /></div></div></aside><section className="panel rounded-2xl p-5 sm:p-7"><div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-5"><div><p className="eyebrow">Preferências do radar</p><h2 className="mt-1 font-display text-xl font-bold">Seu comando</h2></div><Settings2 size={18} className="text-[hsl(var(--muted-foreground))]" /></div><div className="mt-6 space-y-5"><label className="block"><span className="mb-2 block text-xs font-bold">Nome de chamada</span><input data-testid="input-profile-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2.5 text-sm outline-none focus:border-[hsl(var(--accent))]" /></label><label className="block"><span className="mb-2 block text-xs font-bold">Prova-alvo</span><select data-testid="select-profile-target" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2.5 text-sm outline-none focus:border-[hsl(var(--accent))]"><option>CFS 2/2027</option><option>CFS 1/2026</option><option>Próximo edital</option></select></label><label className="block"><span className="mb-2 block text-xs font-bold">Meta diária</span><select data-testid="select-profile-goal" value={dailyGoal} onChange={(e) => setDailyGoal(e.target.value)} className="w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2.5 text-sm outline-none focus:border-[hsl(var(--accent))]"><option>1 hora</option><option>2 horas</option><option>3 horas</option><option>4 horas ou mais</option></select></label><div className="rounded-xl bg-[hsl(var(--secondary)/.46)] p-4"><div className="flex items-center gap-2"><Flag size={16} className="text-[hsl(var(--accent))]" /><p className="text-xs font-bold">Especialidade monitorada</p></div><p className="mt-2 text-sm font-semibold">Controle de Tráfego Aéreo</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">A trilha de conteúdo está ajustada para CFS/EEAR.</p></div></div><div className="mt-7 flex items-center justify-end gap-3 border-t border-[hsl(var(--border))] pt-5">{saved && <span data-testid="status-profile-saved" className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><Check size={14} /> Preferências salvas</span>}<button data-testid="button-save-profile" onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary-foreground))]"><Save size={14} /> Salvar preferências</button></div></section></div></div>;
}

function BookRoute() {
  const [, params] = useRoute('/livros/:bookId');
  return <BookReaderPage bookId={params?.bookId ?? 'guerra-e-paz'} />;
}
function Router({ favorites, onToggleFavorite }: { favorites: number[]; onToggleFavorite: (id: number) => void }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><AppShell><Switch>
    <Route path="/" component={Dashboard} />
    <Route path="/ciclo" component={CyclePage} />
    <Route path="/questoes"><QuestionsPage favorites={favorites} onToggleFavorite={onToggleFavorite} /></Route>
    <Route path="/edital" component={EditalPage} />
    <Route path="/cronometro" component={TimerPage} />
    <Route path="/simulados" component={SimuladosPage} />
    <Route path="/revisoes" component={ReviewsPage} />
    <Route path="/perfil" component={ProfilePage} />
    <Route path="/radar-do-dia" component={RadarDayPage} />
    <Route path="/anotacoes" component={NotesPage} />
    <Route path="/notificacoes" component={NotificationsSettingsPage} />
    <Route path="/progresso" component={LearningProgressPage} />
    <Route path="/pesquisar" component={GlobalSearchPage} />
    <Route path="/atlas" component={KnowledgeAtlasPage} />
    <Route path="/explorar" component={KnowledgeExplorePage} />
    <Route path="/biblioteca" component={ReadingLibraryPage} />
    <Route path="/livros/:bookId" component={BookRoute} />
    <Route path="/jogos" component={EducationalGamesPage} />
    <Route path="/biblia" component={BibleCuriositiesPage} />
    <Route path="/apocrifos" component={ApocryphaPage} />
    <Route path="/pensadores" component={ThinkerTrailsPage} />
    <Route path="/laboratorios/matematica" component={InteractiveMathLab} />
    <Route path="/laboratorios/fisica" component={PhysicsFormulaLab} />
    <Route component={NotFound} />
  </Switch></AppShell></ErrorBoundary>;
}
function App() {
  const [favorites, setFavorites] = useState<number[]>([2]);
  const toggleFavorite = (id: number) => setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]);
  return <QueryClientProvider client={queryClient}><StudyTimerProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router favorites={favorites} onToggleFavorite={toggleFavorite} /></WouterRouter></StudyTimerProvider></QueryClientProvider>;
}

export default App;
