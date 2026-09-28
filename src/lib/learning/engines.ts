export type LearningEvent = {
  type: string; entityId: string; createdAt: string; seconds?: number; correct?: boolean; subject?: string;
  meta?: Record<string, string|number|boolean|undefined>;
};
export type ReviewItem = { memoryState:string; stability:number; repetitionCount:number; lapseCount:number; lastSeenAt?:string; lastCorrectAt?:string; lastWrongAt?:string; lastConfidence?:number; averageElapsedMs:number; nextReviewAt:string; intervalDays:number; easiness:number };
export type ResumeState = { user_id:string; content_type:string; content_id:string; subcontent_id?:string; route:string; position?:number; current_question_index?:number; elapsed_seconds:number; scroll_position?:number; started_at:string; last_activity_at:string; status:'started'|'active'|'paused'|'abandoned'|'completed'|'expired'; metadata_json?:Record<string,unknown> };

export function qualityFrom(correct:boolean, confidence:number){
  if(!correct)return 0;
  return confidence===3?5:confidence===2?4:3;
}

export function updateMemory(prev:ReviewItem|undefined, correct:boolean, confidence:number, elapsedMs:number, now=new Date()):ReviewItem {
  const old=prev ?? {memoryState:'new',stability:0,repetitionCount:0,lapseCount:0,averageElapsedMs:0,nextReviewAt:now.toISOString(),intervalDays:0,easiness:2.5};
  const quality=qualityFrom(correct,confidence);
  let repetitionCount=old.repetitionCount,lapseCount=old.lapseCount,stability=Math.max(.1,old.stability),interval=Math.max(1,old.intervalDays),easiness=old.easiness;
  if(quality<3){ repetitionCount=0;lapseCount+=1;stability*=.5;interval=1;easiness=Math.max(1.3,easiness-.2); }
  else { repetitionCount+=1; const confidenceFactor=confidence===3?1.25:confidence===2?1:0.85; const speedFactor=elapsedMs>0&&elapsedMs<10000?1.1:1; interval=repetitionCount===1?1:repetitionCount===2?3:Math.min(90,Math.max(1,Math.round(interval*easiness*confidenceFactor*speedFactor))); stability=Math.min(100,stability+quality*confidenceFactor*8); easiness=Math.min(3.0,easiness+.05); }
  const state=quality<3?(repetitionCount?'relearning':'learning'):(repetitionCount<2?'young':repetitionCount<4?'review':repetitionCount<8?'stable':'mastered');
  const next=new Date(now); next.setDate(next.getDate()+interval);
  return {memoryState:state,stability,repetitionCount,lapseCount,lastSeenAt:now.toISOString(),lastCorrectAt:correct?now.toISOString():old.lastCorrectAt,lastWrongAt:correct?old.lastWrongAt:now.toISOString(),lastConfidence:confidence,averageElapsedMs:old.averageElapsedMs?Math.round((old.averageElapsedMs+elapsedMs)/2):elapsedMs,nextReviewAt:next.toISOString(),intervalDays:interval,easiness};
}

function localDayKey(iso:string){const d=new Date(iso);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
const validActivityTypes = new Set(['session_completed','session_finished','question_answered','review_completed','reviewed','game_completed','finished_game','book_progress','bible_chapter_completed','experiment_completed','topic_completed','bible_daily_completed']);
export function getValidActivityDays(events:LearningEvent[], minStudyMinutes=5){
  const byDay=new Map<string,LearningEvent[]>();
  for(const e of events){if(!validActivityTypes.has(e.type))continue;const day=localDayKey(e.createdAt);(byDay.get(day)??byDay.set(day,[]).get(day)!).push(e);}
  let count=0;
  for(const dayEvents of byDay.values()){
    const studySeconds=dayEvents.filter(e=>e.type==='session_completed'||e.type==='session_finished').reduce((n,e)=>n+(e.seconds||0),0);
    const validNonSession=dayEvents.some(e=>!['session_completed','session_finished'].includes(e.type));
    if(studySeconds >= minStudyMinutes*60 || validNonSession) count++;
  }
  return count;
}

export function computeProgress(events:LearningEvent[]){
  const attempts=events.filter(e=>e.type==='question_answered');
  const correct=attempts.filter(e=>e.correct).length;
  const completed=new Set(events.filter(e=>e.type==='content_completed'||e.type==='topic_completed'||e.type==='game_completed'||e.type==='finished_game').map(e=>e.entityId));
  const seconds=events.filter(e=>e.type==='session_completed'||e.type==='session_finished').reduce((n,e)=>n+(e.seconds||0),0);
  const days=getValidActivityDays(events);
  const reviewCompleted=events.filter(e=>e.type==='review_completed'||e.type==='reviewed').length;
  const bookStarts=new Set(events.filter(e=>e.type==='book_opened'||e.type==='book_progress').map(e=>e.entityId));
  const bibleChapters=new Set(events.filter(e=>e.type==='bible_chapter_completed').map(e=>e.entityId));
  return {attempts:attempts.length,correct,accuracy:attempts.length?correct/attempts.length:null,seconds,completed:completed.size,activeDays:days,reviewCompleted,booksStarted:bookStarts.size,bibleChaptersCompleted:bibleChapters.size};
}

export function recommendNext(args:{events:LearningEvent[]; reviews:Record<string,ReviewItem>; lastResume?:ResumeState; now?:Date; goalMinutes:number; availableMinutes:number; currentSubject?:string; examRelevance?:Record<string,number>; preferredSubjects?:string[]}){
  const now=args.now??new Date();
  const attempts=args.events.filter(e=>e.type==='question_answered');
  const sessions=args.events.filter(e=>e.type==='session_completed'||e.type==='session_finished');
  const recentCut=new Date(now.getTime()-7*86400000);
  const todayKey=localDayKey(now.toISOString());
  const studiedToday=sessions.filter(e=>localDayKey(e.createdAt)===todayKey).reduce((n,e)=>n+(e.seconds||0),0)/60;
  const recentSessions=sessions.filter(e=>Date.parse(e.createdAt)>=now.getTime()-14*86400000);
  const fatigue=recentSessions.reduce((n,e)=>n+(e.seconds||0),0)/60>=120 || studiedToday>=90;
  const candidateMap=new Map<string,{subject:string;topic:string;contentId:string;wrong:number;total:number;last:number;recentWrong:number;recentTotal:number;avgMs:number}>();
  for(const e of attempts){
    const topic=String(e.meta?.topic||e.entityId); const subject=String(e.subject||e.meta?.subject||''); const contentId=String(e.meta?.contentId||'');
    const key=`${subject}::${contentId||topic}`;
    const x=candidateMap.get(key)||{subject,topic,contentId,wrong:0,total:0,last:0,recentWrong:0,recentTotal:0,avgMs:0};
    x.total++; if(!e.correct)x.wrong++; x.last=Math.max(x.last,Date.parse(e.createdAt)||0);
    const ms=Number(e.meta?.elapsed_ms||0); if(ms>0)x.avgMs=x.avgMs?((x.avgMs+ms)/2):ms;
    if(new Date(e.createdAt)>=recentCut){x.recentTotal++;if(!e.correct)x.recentWrong++;}
    candidateMap.set(key,x);
  }
  const resume=args.lastResume && ['started','active','paused'].includes(args.lastResume.status)?args.lastResume:undefined;
  if(resume){
    return {type:'continue',reason:'continuity',title:'Continuar exatamente de onde parou',detail:`Retome ${resume.content_type} no ponto salvo.`,href:resume.route,score:1};
  }
  const due=Object.entries(args.reviews).filter(([,r])=>new Date(r.nextReviewAt)<=now);
  if(due.length){
    return {type:'review',reason:'overdue_review',title:'Revisar agora',detail:`${due.length} revisão${due.length>1?'ões':''} vencida${due.length>1?'s':''}.`,href:'/revisoes',score:0.95};
  }
  if(fatigue && args.availableMinutes<=20){
    return {type:'rest',reason:'fatigue',title:'Fazer uma pausa curta',detail:'Sua atividade recente já está alta; use o tempo disponível para uma pausa ou retomada leve.',href:'/ciclo',score:.75};
  }
  const weakness=[...candidateMap.values()].filter(x=>x.total>=3 && (x.wrong/x.total)>=0.35).map(x=>{
    const weakness=x.wrong/Math.max(1,x.total);
    const recency=x.recentTotal?1:Math.max(0,1-((now.getTime()-x.last)/86400000)/14);
    const preference=(args.preferredSubjects||[]).includes(x.subject)?1:0;
    const exam=args.examRelevance?.[x.topic]??0.5;
    const timeFit=Math.min(1,args.availableMinutes/Math.max(5,20));
    const repetitionPenalty=args.currentSubject && args.currentSubject===x.subject?0.1:0;
    const recentDecline=x.recentTotal>=2?x.recentWrong/Math.max(1,x.recentTotal):0;
    const score=(recentDecline*1.1)+(weakness*1.25)+(recency*0.25)+(exam*0.3)+(preference*0.2)+(timeFit*0.2)-repetitionPenalty;
    return {...x,score};
  }).sort((a,b)=>b.score-a.score)[0];
  if(weakness){
    const href=weakness.contentId?`/questoes?subject=${encodeURIComponent(weakness.subject)}&contentId=${encodeURIComponent(weakness.contentId)}`:`/questoes?subject=${encodeURIComponent(weakness.subject)}&topic=${encodeURIComponent(weakness.topic)}`;
    return {type:'questions',reason:'weakness',title:`Reforçar ${weakness.topic}`,detail:`${weakness.wrong} erro${weakness.wrong>1?'s':''} em ${weakness.total} tentativas; prioridade por fragilidade recente.`,href,score:Math.min(1,weakness.score/3)};
  }
  const preferred=(args.preferredSubjects||[])[0];
  if(preferred && studiedToday < Math.min(args.goalMinutes,20)){
    return {type:'lesson',reason:'daily_goal_fit',title:`Começar ${preferred}`,detail:`Ainda há espaço na meta diária e essa matéria está entre suas preferidas.`,href:`/estudar/${preferred}`,score:.6};
  }
  if(sessions.length===0){
    const minutes=Math.max(5,Math.min(args.availableMinutes,args.goalMinutes));
    const starter=args.preferredSubjects?.[0]||'Matemática';
    return {type:'lesson',reason:'first_session',title:`Começar ${starter}`,detail:`Primeiro bloco de ${minutes} min para gerar seus primeiros dados reais.`,href:`/estudar/${starter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}`,score:.55};
  }
  return {type:'lesson',reason:'coverage',title:'Abrir uma nova frente',detail:'Escolha um tópico ainda não estudado para ampliar a cobertura do ciclo.',href:'/ciclo',score:.45};
}
