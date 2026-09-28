import { getStoredSession, supabaseConfigured, tableInsert, tableSelect, tableUpsert, tableDelete, type AuthUser } from './auth/supabase-rest';
import { enqueue } from './offline/indexed-queue';

export async function loadRemoteProfile(user: AuthUser) {
  if(!supabaseConfigured)return null;
  const rows = await tableSelect<any>('profiles', `id=eq.${encodeURIComponent(user.id)}&select=*`);
  return rows[0] || null;
}
export async function saveRemoteProfile(userId:string, profile:any) {
  if(!supabaseConfigured)return;
  const payload={id:userId,name:profile.name,exam_target:profile.target,exam_edition_id:profile.target,daily_goal:profile.goalMinutes,available_time:profile.availableTime,preferred_subjects:profile.preferredSubjects||[],notifications:profile.notifications===true,motion_preference:profile.reducedMotion?'reduced':'full',theme:profile.theme||'dark',language:profile.language||'pt-BR',updated_at:new Date().toISOString()};
  try{await tableUpsert('profiles',[payload],'id');}catch{await enqueue('profiles',payload).catch(()=>undefined);}
}
export async function loadRemoteEvents(userId:string){
  if(!supabaseConfigured)return [];
  const pageSize=1000; let offset=0; const rows:any[]=[];
  while(true){
    const page=await tableSelect<any>('study_events',`user_id=eq.${encodeURIComponent(userId)}&select=*&order=created_at.asc&offset=${offset}&limit=${pageSize}`);
    rows.push(...page);
    if(page.length<pageSize)break;
    offset+=pageSize;
  }
  return rows.map((r:any)=>({id:String(r.client_event_id||r.id),entityId:String(r.entity_id),type:String(r.type),subject:r.subject||undefined,correct:typeof r.correct==='boolean'?r.correct:undefined,seconds:r.seconds||undefined,createdAt:String(r.created_at),meta:r.metadata_json||{}}));
}
export async function loadRemoteResume(userId:string){
  if(!supabaseConfigured)return null;
  const rows=await tableSelect<any>('study_resume_states',`user_id=eq.${encodeURIComponent(userId)}&select=*&order=last_activity_at.desc&limit=1`);
  if(!rows[0])return null;
  const r=rows[0];
  return {user_id:userId,content_type:r.content_type,content_id:r.content_id,subcontent_id:r.subcontent_id||undefined,route:r.route,position:Number(r.position||0),current_question_index:Number(r.current_question_index||0),elapsed_seconds:Number(r.elapsed_seconds||0),scroll_position:Number(r.scroll_position||0),started_at:r.started_at,last_activity_at:r.last_activity_at,status:r.status,metadata_json:r.metadata_json||{}};
}
export async function pushEvent(userId:string,event:any){
  if(!supabaseConfigured||!getStoredSession())return;
  const payload={client_event_id:event.id,user_id:userId,type:event.type,entity_id:event.entityId,subject:event.subject||null,correct:typeof event.correct==='boolean'?event.correct:null,seconds:event.seconds||null,metadata_json:event.meta||{},created_at:event.createdAt||new Date().toISOString()};
  try{await tableUpsert('study_events',[payload],'user_id,client_event_id');}catch{await enqueue('study_events',payload).catch(()=>undefined);}
}
export async function pushResume(userId:string,resume:any){ if(!supabaseConfigured||!getStoredSession())return; const payload={user_id:userId,content_type:resume.content_type,content_id:resume.content_id,subcontent_id:resume.subcontent_id||null,route:resume.route,position:resume.position||0,current_question_index:resume.current_question_index||0,elapsed_seconds:resume.elapsed_seconds||0,scroll_position:resume.scroll_position||0,started_at:resume.started_at,last_activity_at:resume.last_activity_at,status:resume.status,metadata_json:resume.metadata_json||{}}; try{await tableUpsert('study_resume_states',[payload],'user_id,content_type,content_id');}catch{await enqueue('study_resume_states',payload).catch(()=>undefined);} }
export async function pushAttempt(userId:string, attempt:any){ if(!supabaseConfigured||!getStoredSession())return; const clientAttemptId=String(attempt.client_attempt_id||attempt.clientAttemptId||((globalThis.crypto&&'randomUUID' in globalThis.crypto)?globalThis.crypto.randomUUID():`attempt-${Date.now()}-${Math.random().toString(16).slice(2)}`)); const payload={question_id:attempt.question_id,user_id:userId,selected_option:attempt.selected_option,correct:attempt.correct,elapsed_ms:attempt.elapsed_ms,confidence:attempt.confidence,marked_doubt:!!attempt.marked_doubt,error_type:attempt.error_type||null,client_attempt_id:clientAttemptId,attempted_at:attempt.attempted_at||new Date().toISOString(),session_id:attempt.session_id||null,source:attempt.source||'original'}; try{await tableUpsert('attempts',[payload],'user_id,client_attempt_id');}catch{await enqueue('attempts',payload).catch(()=>undefined);} }


export async function saveRemoteBibleHighlight(userId:string,chapterId:string,verse:number,active:boolean){
  if(!supabaseConfigured)return;
  const verseId=`${chapterId}:${verse}`;
  try{
    if(active) await tableUpsert('bible_highlights',[{user_id:userId,verse_id:verseId,color:'amber',created_at:new Date().toISOString()}],'user_id,verse_id');
    else await tableDelete('bible_highlights',`user_id=eq.${encodeURIComponent(userId)}&verse_id=eq.${encodeURIComponent(verseId)}`);
  }catch{
    if(active) await enqueue('bible_highlights',{user_id:userId,verse_id:verseId,color:'amber',created_at:new Date().toISOString()}).catch(()=>undefined);
  }
}
export async function saveRemoteBibleBookmark(userId:string,chapterId:string,active:boolean){
  if(!supabaseConfigured)return;
  await saveRemoteFavorite(userId,'bible_chapter_bookmark',chapterId,active);
}

export async function loadRemoteReviewState(userId:string){
  if(!supabaseConfigured)return {} as Record<string,any>;
  const rows=await tableSelect<any>('memory_states',`user_id=eq.${encodeURIComponent(userId)}&select=*`);
  return Object.fromEntries(rows.map((r:any)=>[`question:${r.entity_id}`,{memoryState:r.memory_state,stability:Number(r.stability||0),repetitionCount:Number(r.repetition_count||0),lapseCount:Number(r.lapse_count||0),lastSeenAt:r.last_seen_at,lastCorrectAt:r.last_correct_at,lastWrongAt:r.last_wrong_at,lastConfidence:r.last_confidence,averageElapsedMs:Number(r.average_elapsed_ms||0),nextReviewAt:r.next_review_at||new Date().toISOString(),intervalDays:Number(r.interval_days||0),easiness:Number(r.easiness||2.5)}]));
}
export async function pushMemoryState(userId:string,key:string,item:any){
  if(!supabaseConfigured||!getStoredSession())return;
  const entityId=key.replace(/^question:/,'');
  const memoryPayload={user_id:userId,entity_type:'question',entity_id:entityId,memory_state:item.memoryState,stability:item.stability,repetition_count:item.repetitionCount,lapse_count:item.lapseCount,last_seen_at:item.lastSeenAt||null,last_correct_at:item.lastCorrectAt||null,last_wrong_at:item.lastWrongAt||null,last_confidence:item.lastConfidence||null,average_elapsed_ms:item.averageElapsedMs||0,next_review_at:item.nextReviewAt,interval_days:item.intervalDays,easiness:item.easiness};
  const reviewPayload={user_id:userId,entity_type:'question',entity_id:entityId,next_review_at:item.nextReviewAt,state:item.memoryState};
  try{
    await tableUpsert('memory_states',[memoryPayload],'user_id,entity_type,entity_id');
    await tableUpsert('review_items',[reviewPayload],'user_id,entity_type,entity_id');
  }catch{
    await enqueue('memory_states',memoryPayload).catch(()=>undefined);
    await enqueue('review_items',reviewPayload).catch(()=>undefined);
  }
}
export async function pushReviewEvent(userId:string,review:any){
  if(!supabaseConfigured||!getStoredSession())return;
  let item:any=null;
  try{
    const rows=await tableSelect<any>('review_items',`user_id=eq.${encodeURIComponent(userId)}&entity_type=eq.${encodeURIComponent(review.entityType)}&entity_id=eq.${encodeURIComponent(review.entityId)}&select=*`);
    item=rows[0]; if(!item)return;
    await tableInsert('review_events',[{user_id:userId,review_item_id:item.id,quality:review.quality,confidence:review.confidence,metadata_json:review.meta||{}}]);
  }catch{
    await enqueue('review_events_pending',{user_id:userId,entity_type:review.entityType,entity_id:review.entityId,quality:review.quality,confidence:review.confidence,metadata_json:review.meta||{}}).catch(()=>undefined);
  }
}

export async function loadRemotePersonal(userId:string){
  if(!supabaseConfigured)return {bookProgress:[],bookNotes:[],bibleNotes:[],bibleHighlights:{},bibleBookmarks:{},favorites:[]};
  const [bp,bn,bbn,bh,fav]=await Promise.all([
    tableSelect<any>('book_progress',`user_id=eq.${encodeURIComponent(userId)}&select=*`),
    tableSelect<any>('book_notes',`user_id=eq.${encodeURIComponent(userId)}&select=*`),
    tableSelect<any>('bible_notes',`user_id=eq.${encodeURIComponent(userId)}&select=*`),
    tableSelect<any>('bible_highlights',`user_id=eq.${encodeURIComponent(userId)}&select=*`),
    tableSelect<any>('favorites',`user_id=eq.${encodeURIComponent(userId)}&select=*`)
  ]);
  const highlights:Record<string,number[]>={}; for(const row of bh){const raw=String(row.verse_id||''); const parts=raw.split(':'); const key=parts.slice(0,2).join(':'); const n=Number(parts.at(-1)||0); if(!key||!n)continue; highlights[key]=[...(highlights[key]||[]),n];}
  const bookmarks:Record<string,boolean>={}; for(const row of fav){if(row.entity_type==='bible_chapter_bookmark'&&row.entity_id)bookmarks[String(row.entity_id)]=true;}
  return {bookProgress:bp,bookNotes:bn,bibleNotes:bbn,bibleHighlights:highlights,bibleBookmarks:bookmarks,favorites:fav};
}
export async function saveRemoteBookProgress(userId:string,bookId:string,position:number,progress:number){
  if(!supabaseConfigured)return;
  const payload={user_id:userId,book_id:bookId,position,progress,updated_at:new Date().toISOString()};
  try{await tableUpsert('book_progress',[payload],'user_id,book_id');}catch{await enqueue('book_progress',payload).catch(()=>undefined);}
}
export async function saveRemoteBookNote(userId:string,bookId:string,note:string){
  if(!supabaseConfigured)return;
  const payload={user_id:userId,book_id:bookId,note,updated_at:new Date().toISOString()};
  try{await tableUpsert('book_notes',[payload],'user_id,book_id');}catch{await enqueue('book_notes',payload).catch(()=>undefined);}
}
export async function saveRemoteBibleNote(userId:string,chapterId:string,note:string){
  if(!supabaseConfigured)return;
  const payload={user_id:userId,chapter_id:chapterId,note,updated_at:new Date().toISOString()};
  try{await tableUpsert('bible_notes',[payload],'user_id,chapter_id');}catch{await enqueue('bible_notes',payload).catch(()=>undefined);}
}
export async function saveRemoteFavorite(userId:string,entityType:string,entityId:string,active:boolean){
  if(!supabaseConfigured)return;
  const payload={user_id:userId,entity_type:entityType,entity_id:entityId,created_at:new Date().toISOString()};
  try{if(active) await tableUpsert('favorites',[payload],'user_id,entity_type,entity_id'); else await tableDelete('favorites',`user_id=eq.${encodeURIComponent(userId)}&entity_type=eq.${encodeURIComponent(entityType)}&entity_id=eq.${encodeURIComponent(entityId)}`);}catch{if(active)await enqueue('favorites',payload).catch(()=>undefined);}
}
export async function pushStudySession(userId:string,session:any){
  if(!supabaseConfigured||!getStoredSession())return;
  try{await tableUpsert('study_sessions',[session],'id');}catch{await enqueue('study_sessions',session).catch(()=>undefined);}
}
export async function pushGameRun(userId:string,run:any){
  if(!supabaseConfigured||!getStoredSession())return;
  const payload={...run,client_run_id:String(run.client_run_id||run.id||((globalThis.crypto&&'randomUUID' in globalThis.crypto)?globalThis.crypto.randomUUID():`run-${Date.now()}-${Math.random().toString(16).slice(2)}`))};
  try{await tableUpsert('game_runs',[payload],'user_id,client_run_id');}catch{await enqueue('game_runs',payload).catch(()=>undefined);}
}
export async function pushSimulationAttempt(userId:string,attempt:any){
  if(!supabaseConfigured||!getStoredSession())return;
  try{await tableUpsert('simulation_attempts',[attempt],'id');}catch{await enqueue('simulation_attempts',attempt).catch(()=>undefined);}
}
export async function pushSimulationAnswer(userId:string,answer:any){
  if(!supabaseConfigured||!getStoredSession())return;
  const payload={...answer,client_answer_id:String(answer.client_answer_id||answer.clientAnswerId||((globalThis.crypto&&'randomUUID' in globalThis.crypto)?globalThis.crypto.randomUUID():`answer-${Date.now()}-${Math.random().toString(16).slice(2)}`))};
  try{await tableUpsert('simulation_answers',[payload],'attempt_id,client_answer_id');}catch{await enqueue('simulation_answers',payload).catch(()=>undefined);}
}
export async function pushSimulationMark(userId:string,mark:any,active:boolean){
  if(!supabaseConfigured||!getStoredSession())return;
  try{
    if(active) await tableUpsert('simulation_marks',[mark],'attempt_id,question_id');
    else await tableDelete('simulation_marks',`attempt_id=eq.${encodeURIComponent(mark.attempt_id)}&question_id=eq.${encodeURIComponent(mark.question_id)}`);
  }catch{if(active)await enqueue('simulation_marks',mark).catch(()=>undefined);}
}
export async function flushOfflineQueue(){
  if(!supabaseConfigured||!getStoredSession())return {synced:0};
  const {listQueue,removeQueue}=await import('./offline/indexed-queue');
  let synced=0;
  for(const item of await listQueue()){
    try{
      if(item.table==='attempts') await tableUpsert('attempts',[item.payload],'user_id,client_attempt_id');
      else if(item.table==='study_events') await tableUpsert('study_events',[item.payload],'user_id,client_event_id');
      else if(item.table==='book_progress') await tableUpsert('book_progress',[item.payload],'user_id,book_id');
      else if(item.table==='bible_notes') await tableUpsert('bible_notes',[item.payload],'user_id,chapter_id');
      else if(item.table==='bible_highlights') await tableUpsert('bible_highlights',[item.payload],'user_id,verse_id');
      else if(item.table==='bible_bookmarks'){ await tableUpsert('favorites',[Object.assign({}, item.payload as Record<string, unknown>, {entity_type:'bible_chapter_bookmark'})],'user_id,entity_type,entity_id'); }
      else if(item.table==='game_runs') await tableUpsert('game_runs',[item.payload],'user_id,client_run_id');
      else if(item.table==='study_resume_states') await tableUpsert('study_resume_states',[item.payload],'user_id,content_type,content_id');
      else if(item.table==='book_notes') await tableUpsert('book_notes',[item.payload],'user_id,book_id');
      else if(item.table==='favorites') await tableUpsert('favorites',[item.payload],'user_id,entity_type,entity_id');
      else if(item.table==='study_sessions') await tableUpsert('study_sessions',[item.payload],'id');
      else if(item.table==='simulation_attempts') await tableUpsert('simulation_attempts',[item.payload],'id');
      else if(item.table==='simulation_answers') await tableUpsert('simulation_answers',[item.payload],'attempt_id,client_answer_id');
      else if(item.table==='simulation_marks') await tableUpsert('simulation_marks',[item.payload],'attempt_id,question_id');
      else if(item.table==='memory_states') await tableUpsert('memory_states',[item.payload],'user_id,entity_type,entity_id');
      else if(item.table==='review_items') await tableUpsert('review_items',[item.payload],'user_id,entity_type,entity_id');
      else if(item.table==='review_events') await tableInsert('review_events',[item.payload]);
      else if(item.table==='review_events_pending'){
        const r=item.payload as Record<string,unknown>;
        const rows=await tableSelect<any>('review_items',`user_id=eq.${encodeURIComponent(String(r.user_id))}&entity_type=eq.${encodeURIComponent(String(r.entity_type))}&entity_id=eq.${encodeURIComponent(String(r.entity_id))}&select=*`);
        const reviewItem=rows[0]; if(!reviewItem) throw new Error('REVIEW_ITEM_NOT_READY');
        await tableInsert('review_events',[{user_id:r.user_id,review_item_id:reviewItem.id,quality:r.quality,confidence:r.confidence,metadata_json:r.metadata_json||{}}]);
      }
      else if(item.table==='profiles') await tableUpsert('profiles',[item.payload],'id');
      else continue;
      await removeQueue(item.id); synced++;
    }catch{}
  }
  return {synced};
}
