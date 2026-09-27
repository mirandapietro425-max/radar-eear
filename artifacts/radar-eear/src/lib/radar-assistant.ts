import { bibleBooks, books, places, questions, thinkers } from '../experience-data';
import { apocrypha } from '../data/apocrypha';
import { dailyContent } from '../data/daily';
import { broaderBooks } from '../data/catalog';
import { hardwareModules } from '../data/hardware';
import { extendedQuestions } from '../data/question-bank-extended';
import { generatedQuestions } from '../data/question-bank';
import { deepQuestions } from '../data/question-bank-v26-deep';
import { expandedBooks, expandedThinkers, coverageModules } from '../data/editorial-expansion';
import { mathMicroconcepts, physicsMicroconcepts } from '../data/microconcepts';
import { editorialSubjects } from '../data/exam-data';
import researchV26 from '../data/research-packs-v26.json';
import curiositiesV26 from '../data/curiosities-v26.json';
import { v43Questions } from '../data/question-bank-v43';

export type RouteAction = { type:'navigate'; path:string; label?:string } | { type:'search'; query:string; label?:string };

export type AssistantContext = {
  path: string;
  label: string;
  entity?: {type:string; id?:string; title:string; subject?:string; placeId?:string};
};

export type AssistantHint = { kind:string; title:string; path:string; id?:string };
export type AssistantResult = { reply:string; action?:RouteAction; source:'local'|'ai'|'error' };

const normalize=(value:string)=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const allQuestions=[...questions,...generatedQuestions,...extendedQuestions,...deepQuestions,...v43Questions];
const allBooks=[
  ...books.map((b:any)=>({id:b.id,title:b.title,author:b.author,path:`/biblioteca/${b.id}`})),
  ...broaderBooks.map((b:any)=>({id:b[0],title:b[1],author:b[2],path:`/biblioteca/${b[0]}`})),
  ...expandedBooks.map((b:any)=>({id:b.id,title:b.title,author:b.author,path:`/biblioteca/${b.id}`})),
];
const allPeople=[
  ...thinkers.map((t:any)=>({id:t.id,title:t.name,path:`/pensadores/${t.id}`})),
  ...expandedThinkers.map((t:any)=>({id:t.id,title:t.name,path:`/pensadores/${t.id}`})),
];
const allCuriosities=Array.isArray(curiositiesV26)?curiositiesV26:((researchV26 as any)?.curiosities||[]);
const allModules=[...mathMicroconcepts,...physicsMicroconcepts].map((m:any)=>({id:m.id,title:m.title,topic:m.topic,subject:m.subject==='math'?'Matemática':'Física',path:`/estudar/${m.subject==='math'?'matematica':'fisica'}?topic=${encodeURIComponent(m.title)}`}));

export function getAssistantContext(path:string):AssistantContext{
  const [pathname,queryString='']=path.split('?');
  const params=new URLSearchParams(queryString);
  if(pathname==='/dia'){
    const id=params.get('item'); const item=dailyContent.find((d:any)=>d.id===id);
    const placeId=item ? (item.related_items||[]).map((r:string)=>places.find((p:any)=>p.id===r)?.id).find(Boolean) : undefined;
    return {path,label:'Descoberta do dia',entity:item?{type:'descoberta',id:item.id,title:item.title,placeId}:undefined};
  }
  if(pathname==='/curiosidades'){
    const itemId=params.get('item');
    const item=itemId?allCuriosities.find((x:any)=>x.id===itemId):undefined;
    const placeId=item?.entity_id||params.get('place')||undefined;
    const place=placeId?places.find((p:any)=>p.id===placeId):undefined;
    return {path,label:'Curiosidades',entity:item?{type:'curiosidade',id:item.id,title:item.title,placeId:place?.id}:place?{type:'curiosidades',title:'Curiosidades de '+place.name,placeId:place.id}:undefined};
  }
  const bibleMatch=pathname.match(/^\/biblia\/([^/]+)(?:\/(\d+))?/);
  if(bibleMatch){const b=bibleBooks.find((x:any)=>x[1]===bibleMatch[1]);return {path,label:'Bíblia',entity:b?{type:'biblia',id:b[1],title:b[0],subject:'Bíblia'}:undefined};}
  const bookMatch=pathname.match(/^\/(?:livros|biblioteca)\/([^/]+)/);
  if(bookMatch){const b=allBooks.find(x=>x.id===bookMatch[1]);return {path,label:'Biblioteca',entity:b?{type:'livro',id:b.id,title:b.title}:undefined};}
  const personMatch=pathname.match(/^\/(?:pensadores|pessoas)\/([^/]+)/);
  if(personMatch){const p=allPeople.find(x=>x.id===personMatch[1]);return {path,label:'Pensadores',entity:p?{type:'pessoa',id:p.id,title:p.title}:undefined};}
  const atlasPlace=params.get('place'); const atlas=atlasPlace?places.find((p:any)=>p.id===atlasPlace):undefined;
  if(pathname==='/atlas'||pathname.startsWith('/atlas/')) return {path,label:'Atlas',entity:atlas?{type:'lugar',id:atlas.id,title:atlas.name,placeId:atlas.id}:undefined};
  const qId=params.get('focus'); const q=qId?allQuestions.find((x:any)=>x.id===qId):undefined;
  if(pathname.startsWith('/questoes')) return {path,label:'Praticar',entity:q?{type:'questao',id:q.id,title:q.topic,subject:q.subject}:undefined};
  const apId=params.get('work'); const ap=apId?apocrypha.find((x:any)=>x[0]===apId):undefined;
  if(pathname==='/apocrifos') return {path,label:'Apócrifos',entity:ap?{type:'apocrifo',id:ap[0],title:ap[1]}:undefined};
  const hwId=params.get('module'); const hw=hwId?hardwareModules.find((x:any)=>x[0]===hwId):undefined;
  if(pathname==='/hardware') return {path,label:'Computação',entity:hw?{type:'hardware',id:hw[0],title:hw[2]}:undefined};
  const subjectMatch=pathname.match(/^\/estudar\/([^/]+)/); if(subjectMatch){const subject=editorialSubjects.find((s:any)=>s.id===subjectMatch[1]);return {path,label:'Estudar',entity:{type:'materia',id:subjectMatch[1],title:subject?.name||subjectMatch[1]}};}
  if(pathname==='/ciencia') return {path,label:'Ciência'};
  if(pathname==='/prehistoria') return {path,label:'Pré-história'};
  if(pathname==='/explorar') return {path,label:'Explorar'};
  if(pathname==='/jogos') return {path,label:'Jogos'};
  if(pathname==='/revisoes') return {path,label:'Revisões'};
  if(pathname==='/simulados') return {path,label:'Simulados'};
  if(pathname==='/biblioteca') return {path,label:'Biblioteca'};
  if(pathname==='/pensadores') return {path,label:'Pensadores'};
  if(pathname==='/biblia') return {path,label:'Bíblia'};
  if(pathname==='/tutor'){
    const qId=params.get('question'); const q=qId?allQuestions.find((x:any)=>x.id===qId):undefined;
    const cId=params.get('curiosity'); const c=cId?allCuriosities.find((x:any)=>x.id===cId):undefined;
    const placeId=params.get('place'); const place=placeId?places.find((x:any)=>x.id===placeId):undefined;
    if(q) return {path,label:'Assistente · questão',entity:{type:'questao',id:q.id,title:q.topic,subject:q.subject}};
    if(c) return {path,label:'Assistente · curiosidade',entity:{type:'curiosidade',id:c.id,title:c.title,placeId:places.find((x:any)=>x.id===c.entity_id)?.id}};
    if(place) return {path,label:'Assistente · Atlas',entity:{type:'lugar',id:place.id,title:place.name,placeId:place.id}};
    return {path,label:'Assistente RADAR'};
  }
  return {path,label:'RADAR EEAR'};
}

export function getAssistantHints(message:string,context:AssistantContext):AssistantHint[]{
  const m=normalize(message); const out:AssistantHint[]=[]; const add=(hint:AssistantHint)=>{if(out.some(x=>x.path===hint.path))return;out.push(hint)};
  const collections=[
    ...allBooks.map(x=>({kind:'Livro',title:x.title,path:x.path,id:x.id})),
    ...allPeople.map(x=>({kind:'Pessoa',title:x.title,path:x.path,id:x.id})),
    ...places.map((x:any)=>({kind:'Lugar',title:x.name,path:`/atlas?place=${x.id}`,id:x.id})),
    ...allQuestions.map((x:any)=>({kind:'Questão',title:x.topic,path:`/questoes?focus=${x.id}`,id:x.id})),
    ...allCuriosities.map((x:any)=>({kind:'Curiosidade',title:x.title,path:`/curiosidades?item=${x.id}`,id:x.id})),
    ...allModules.map(x=>({kind:x.subject,title:x.title,path:x.path,id:x.id})),
    ...coverageModules.map((x:any)=>({kind:'Módulo',title:x.title,path:`/ciencia?module=${x.id}`,id:x.id})),
  ];
  const scored=collections.map(x=>{const n=normalize(x.title);let score=0;if(n===m)score=20;else if(m.includes(n)&&n.length>4)score=12;else{const words=n.split(/\s+/).filter(w=>w.length>3);score=words.filter(w=>m.includes(w)).length*3;}return {...x,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8);
  scored.forEach(x=>add({kind:x.kind,title:x.title,path:x.path,id:x.id}));
  if(context.entity?.placeId && /(atlas|mapa|map|lugar|onde fica|localiza)/.test(m)) add({kind:'Atlas',title:context.entity.title,path:`/atlas?place=${encodeURIComponent(context.entity.placeId)}`,id:context.entity.placeId});
  return out.slice(0,8);
}

function actionFor(message:string, context:AssistantContext):AssistantResult|undefined{
  const m=normalize(message);
  const go=(path:string,reply:string):AssistantResult=>({source:'local',reply,action:{type:'navigate',path}});
  if(/^(oi|ola|olá|bom dia|boa tarde|boa noite)$/.test(m)) return {source:'local',reply:'Oi! Eu sou o Assistente RADAR. Posso te levar ao conteúdo certo e ajudar a usar o site.'};
  if(/(curiosidade|descoberta).*(mapa|atlas)|(mapa|atlas).*(curiosidade|descoberta)/.test(m)) return context.entity?.placeId?go(`/atlas?place=${encodeURIComponent(context.entity.placeId)}`,'Encontrei o lugar ligado a este conteúdo. Vou abrir o Atlas nesse ponto.'):go('/atlas','Vou abrir o Atlas para você explorar os lugares do RADAR.');
  if(/(abrir|ir|vai|me leva|mostra).*(atlas|mapa)/.test(m)) return context.entity?.placeId?go(`/atlas?place=${encodeURIComponent(context.entity.placeId)}`,'Abrindo o Atlas no lugar relacionado.'):go('/atlas','Abrindo o Atlas.');
  if(/(abrir|ir|vai|me leva|mostra).*(biblioteca|livros)/.test(m)) return go('/biblioteca','Abrindo a Biblioteca.');
  if(/(abrir|ir|vai|me leva|mostra).*(biblia)/.test(m)) return go('/biblia','Abrindo a Bíblia.');
  if(/(abrir|ir|vai|me leva|mostra).*(apoc|apocrifo)/.test(m)) return go('/apocrifos','Abrindo os apócrifos.');
  if(/(abrir|ir|vai|me leva|mostra).*(curiosidade|descoberta)/.test(m)) return context.path==='/dia'?go(context.path,'Abrindo a descoberta atual.'):go('/curiosidades','Abrindo as descobertas.');
  if(/(abrir|ir|vai|me leva|mostra).*(questao|questoes|praticar)/.test(m)) return go('/questoes','Abrindo Praticar.');
  if(/(abrir|ir|vai|me leva|mostra).*(pensador|filosofo|filosofos)/.test(m)) return go('/pensadores','Abrindo Pensadores.');
  if(/(abrir|ir|vai|me leva|mostra).*(explorar)/.test(m)) return go('/explorar','Abrindo Explorar.');
  if(/(abrir|ir|vai|me leva|mostra).*(jogo|jogos)/.test(m)) return go('/jogos','Abrindo Jogos.');
  if(/(abrir|ir|vai|me leva|mostra).*(fisica)/.test(m)) return go('/estudar/fisica','Abrindo Física.');
  if(/(abrir|ir|vai|me leva|mostra).*(matematica)/.test(m)) return go('/estudar/matematica','Abrindo Matemática.');
  if(/(abrir|ir|vai|me leva|mostra).*(portugues)/.test(m)) return go('/estudar/portugues','Abrindo Português.');
  if(/(abrir|ir|vai|me leva|mostra).*(ingles)/.test(m)) return go('/estudar/ingles','Abrindo Inglês.');
  if(/(continuar|retomar).*(livro|leitura)/.test(m)) return go('/biblioteca','Vou para a Biblioteca para você continuar a leitura.');
  if(/(onde|cadê|cade|abrir).*(revis|revisoes)/.test(m)) return go('/revisoes','As revisões ficam aqui.');
  if(/(onde|cadê|cade|abrir).*(simulado)/.test(m)) return go('/simulados','Os simulados ficam aqui.');
  if(/(onde|cadê|cade|abrir).*(cronom|timer|tempo)/.test(m)) return go('/cronometro','Abrindo o cronômetro.');
  if(/(onde|cadê|cade|abrir).*(perfil|meu radar)/.test(m)) return go('/perfil','Abrindo seu perfil.');

  for(const mod of allModules){if(m.includes(normalize(mod.title))&&normalize(mod.title).length>4)return go(mod.path,`Achei “${mod.title}”. Vou abrir esse conteúdo de ${mod.subject}.`);}
  for(const b of allBooks){if(m.includes(normalize(b.title))&&normalize(b.title).length>4)return go(b.path,`Achei “${b.title}”. Vou abrir a ficha da obra.`);}
  for(const p of allPeople){if(m.includes(normalize(p.title))&&normalize(p.title).length>4)return go(p.path,`Achei o perfil de ${p.title}.`);}
  for(const p of places){if(m.includes(normalize(p.name))&&normalize(p.name).length>3&&/(mapa|atlas|lugar|cidade|local)/.test(m))return go(`/atlas?place=${p.id}`,`Achei ${p.name}. Vou abrir esse ponto no Atlas.`);}
  for(const q of allQuestions){if(m.includes(normalize(q.topic))&&normalize(q.topic).length>4)return go(`/questoes?focus=${q.id}`,`Achei uma questão sobre ${q.topic}. Vou abrir a questão.`);}
  for(const d of dailyContent){if(m.includes(normalize(d.title))&&normalize(d.title).length>4)return go(`/dia?item=${d.id}`,`Achei a descoberta “${d.title}”.`);}
  for(const c of allCuriosities){if(m.includes(normalize(c.title))&&normalize(c.title).length>8)return go(`/curiosidades?item=${c.id}`,`Achei a curiosidade certa.`);}
  for(const mref of coverageModules){if(m.includes(normalize(mref.title))&&normalize(mref.title).length>5)return go(`/ciencia?module=${mref.id}`,`Achei o módulo “${mref.title}”.`);}
  if(/(o que tem aqui|que pagina e essa|que pagina é essa|onde estou|o que e isso|o que é isso)/.test(m)) return {source:'local',reply:`Você está em “${context.label}”.${context.entity?.title?` O conteúdo atual é “${context.entity.title}”.`:''}`};
  if(/(ajuda|o que posso fazer|como funciona)/.test(m)) return {source:'local',reply:'Posso navegar pelo RADAR, encontrar livros, questões, pessoas, lugares, curiosidades e matérias e levar o conteúdo atual ao Atlas quando houver relação geográfica.'};
  return undefined;
}

export async function askAssistant(message:string, context:AssistantContext, history:Array<{role:'user'|'assistant';content:string}>):Promise<AssistantResult>{
  const local=actionFor(message,context); if(local)return local;
  const hints=getAssistantHints(message,context);
  try{
    const response=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,context,hints,history})});
    const data=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(data?.message||'Assistente IA indisponível.');
    const action=data.action?.type==='navigate'&&typeof data.action.path==='string'?data.action:undefined;
    return {source:'ai',reply:String(data.reply||data.message||'Não consegui responder agora.'),action};
  }catch{
    if(hints[0]) return {source:'local',reply:`Encontrei “${hints[0].title}”. Posso abrir isso para você.`,action:{type:'navigate',path:hints[0].path}};
    return {source:'error',reply:'Posso continuar ajudando pela navegação do RADAR. Tente, por exemplo, “abrir Física”, “me leva para o Atlas”, “encontrar um livro” ou “quero questões difíceis”.'};
  }
}

export async function getAssistantStatus(){
  try{const r=await fetch('/api/assistant',{method:'GET'});if(!r.ok)return {configured:false};return await r.json();}catch{return {configured:false};}
}
