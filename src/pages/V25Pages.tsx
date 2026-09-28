import { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Compass, Eye, Network, BookMarked, Save, Search, Sparkles, Target } from 'lucide-react';
import { Link } from 'wouter';
import { EntityMedia } from '../components/EntityMedia';
import { explorationTrails, globalTimeline, v25CultureMap } from '../data/v25-content';
import { broaderBooks } from '../data/catalog';
import { expandedBooks, expandedThinkers } from '../data/editorial-expansion';
import { thinkers, books, places } from '../experience-data';
import { bibleBooks } from '../experience-data';
import { editorialSubjects } from '../data/exam-data';
import curiositiesV26 from '../data/curiosities-v26.json';
import { mathMicroconcepts, physicsMicroconcepts } from '../data/microconcepts';
import type { AppState } from '../app/App';

type Update = (f:(s:AppState)=>AppState)=>void;

function uid(){return crypto.randomUUID?.()||`${Date.now()}-${Math.random()}`}
function record(state:AppState, update:Update, type:string, entityId:string, meta:Record<string,any>={}){
  update(s=>({...s,events:[...s.events,{id:uid(),createdAt:new Date().toISOString(),type:type as any,entityId,meta}]}));
}
function PageHeader({kicker,title,description}:{kicker:string;title:string;description:string}){
  return <header className="page-head v25-page-head"><div className="eyebrow accent-text">{kicker}</div><h1 className="page-title">{title}</h1><p className="page-description">{description}</p></header>;
}
function V25Hero({src,alt,kicker,title,description}:{src:string;alt:string;kicker:string;title:string;description:string}){
  return <section className="v25-hero surface"><div className="v25-hero-copy"><div className="eyebrow accent-text">{kicker}</div><h1>{title}</h1><p>{description}</p></div><EntityMedia src={src} alt={alt} className="v25-hero-media" caption="Mídia editorial do Radar EEAR" source="Radar EEAR" license="Autoral do projeto"/></section>
}

export function TrailsPage(){
  return <div className="stack-lg"><PageHeader kicker="Caminhos editoriais" title="Trilhas de exploração" description="Percursos internos que ligam pessoas, obras, conceitos, lugares, questões e revisão. Cada etapa abre uma rota real."/><div className="trail-grid">{explorationTrails.map(t=><article className="trail-card surface" key={t.id}><div className="trail-top"><div><div className="eyebrow">{t.duration} min</div><h2>{t.title}</h2></div><Compass size={22}/></div><p>{t.description}</p><div className="trail-steps">{t.steps.map((s,i)=><Link className="trail-step" href={s.href} key={s.label}><span>{String(i+1).padStart(2,'0')}</span>{s.image&&<EntityMedia src={s.image} alt=""/>}<b>{s.label}</b><ArrowRight size={13}/></Link>)}</div></article>)}</div></div>
}

export function TimelinePage(){
  const [era,setEra]=useState('Todas');
  const eras=['Todas',...Array.from(new Set(globalTimeline.map(x=>x.era)))];
  const data=globalTimeline.filter(x=>era==='Todas'||x.era===era);
  return <div className="stack-lg"><PageHeader kicker="Linha do tempo global" title="Conhecimento em sequência" description="Uma linha temporal que conecta pensadores, obras, ciência, Bíblia, matemática, história e lugares."/><section className="v25-timeline-controls surface"><div className="timeline-filter"><Clock3 size={17}/>{eras.map(x=><button key={x} className={era===x?'active':''} onClick={()=>setEra(x)}>{x}</button>)}</div></section><div className="v25-timeline">{data.map(e=><article className="v25-timeline-entry" key={e.id}><div className="v25-timeline-year">{e.year<0?`${Math.abs(e.year)} a.C.`:e.year}</div><div className="v25-timeline-line"/><div className="surface v25-timeline-body"><div className="eyebrow">{e.era}</div><h2>{e.title}</h2><p>{e.body}</p><div className="button-row">{e.links.map(x=><Link className="secondary-btn small" href={x.href} key={x.href}>{x.label}<ArrowRight size={12}/></Link>)}</div><small>Fonte: {e.source}</small></div></article>)}</div></div>
}

export function DiaryPage({state}:{state:AppState}){
  const noteEntries=Object.entries(state.notes).filter(([,v])=>v.trim());
  const events=[...state.events].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,60);
  return <div className="stack-lg"><PageHeader kicker="Diário do Radar" title="Seu caderno de estudo" description="Uma linha pessoal formada por atividades, erros, descobertas, notas e leituras realmente registradas."/><section className="diary-hero surface"><div><div className="eyebrow accent-text">Hoje</div><h2>{state.profile.name?`O que ${state.profile.name} fez no Radar`:'Seu histórico começa na primeira ação'}</h2><p>{events.length?`${events.length} eventos locais registrados no estado atual.`:'Ainda não há eventos registrados.'}</p></div><EntityMedia src="/assets/daily/newton.svg" alt="Caderno visual do Radar" className="diary-art" /></section><section className="content-grid-2"><article className="surface"><div className="eyebrow"><BookMarked size={14}/> Notas salvas</div>{noteEntries.length?<div className="v25-list">{noteEntries.map(([k,v])=><div className="v25-list-row" key={k}><b>{k}</b><p>{v}</p></div>)}</div>:<div className="empty-state"><BookMarked size={24}/><b>Nenhuma nota ainda.</b><span>Salve uma nota em uma questão, livro, Bíblia ou sessão.</span></div>}</article><article className="surface"><div className="eyebrow"><Clock3 size={14}/> Atividade recente</div>{events.length?<div className="event-list">{events.map(e=><div key={e.id}><span>{new Date(e.createdAt).toLocaleString('pt-BR')}</span><b>{e.type.replaceAll('_',' ')}</b><small>{e.entityId}</small></div>)}</div>:<div className="empty-state"><Clock3 size={24}/><b>Sem atividade.</b><span>O Diário não inventa histórico.</span></div>}</article></section></div>
}

export function SavedPage({state}:{state:AppState}){
  const saved=state.favorites;
  const resolve=(key:string)=>{const [type,...rest]=key.split(':'); const id=rest.join(':');
    if(type==='bible'){const parts=rest; if(parts.length>=2 && /^\d+$/.test(parts.at(-1)||'')){const bookId=parts.slice(0,-1).join(':');const chapter=Number(parts.at(-1));return {label:`Bíblia · ${bookId} · capítulo ${chapter}`,href:`/biblia/${bookId}/${chapter}`,image:`/assets/bible/books/${bookId}.svg`,kind:'Bíblia'}} return {label:id,href:`/biblia/${id}`,image:`/assets/bible/books/${id}.svg`,kind:'Bíblia'};}
    if(type==='bible_chapter'||type==='bible_chapter_bookmark'){const raw=type==='bible_chapter'&&id.startsWith('bible:')?id.slice(6):id;const parts=raw.split(':');const bookId=parts[0];const chapter=Number(parts[1]||1);return {label:`Bíblia · ${bookId} · capítulo ${chapter}`,href:`/biblia/${bookId}/${chapter}`,image:`/assets/bible/books/${bookId}.svg`,kind:'Bíblia'};}
    const thinker=thinkers.find(x=>x.id===id)||expandedThinkers.find((x:any)=>x.id===id); if(thinker)return {label:thinker.name,href:`/pensadores/${id}`,image:thinker.image||'',kind:'Pessoa'};
    const book=[...books,...broaderBooks.map(x=>({id:x[0],title:x[1],cover:`/assets/library/catalog/${x[0]}.svg`})),...expandedBooks.map((x:any)=>({id:x.id,title:x.title,cover:x.cover||'/assets/library/reader.svg'}))].find(x=>x.id===id) as any; if(book)return {label:book.title,href:`/biblioteca/${id}`,image:book.cover,kind:'Livro'};
    const place=places.find(x=>x.id===id); if(place)return {label:place.name,href:`/atlas?place=${id}`,image:place.image,kind:'Lugar'};
    const curiosity=(Array.isArray(curiositiesV26)?curiositiesV26:[]).find((x:any)=>String(x.id)===String(id)); if(curiosity)return {label:curiosity.title,href:`/curiosidades/${encodeURIComponent(String(id))}`,image:curiosity.image||'/assets/editorial/knowledge-radar.svg',kind:'Curiosidade'};
    return null;
  };
  const resolved=saved.map(k=>({key:k,item:resolve(k)}));
  return <div className="stack-lg"><PageHeader kicker="Meu Radar" title="Salvos" description="Itens que você escolheu guardar. Nada aparece aqui sem uma ação sua."/>{saved.length?<><div className="saved-grid">{resolved.filter(x=>x.item).map(({key:k,item:x})=><Link className="saved-card surface" key={k} href={(x as any).href}><EntityMedia src={(x as any).image} alt={(x as any).label}/><div><div className="eyebrow">{(x as any).kind}</div><h2>{(x as any).label}</h2><span className="text-link">Abrir <ArrowRight size={12}/></span></div></Link>)}</div>{resolved.some(x=>!x.item)&&<section className="surface saved-unavailable"><div className="eyebrow">Itens indisponíveis</div><p>Alguns registros salvos não correspondem mais a um conteúdo publicado e não foram redirecionados para uma página genérica.</p></section>}</>:<section className="empty-state surface"><Save size={28}/><b>Nenhum item salvo.</b><span>Use Salvar no Meu Radar em conteúdos que quiser reencontrar.</span><Link className="secondary-btn" href="/explorar">Explorar conhecimento</Link></section>}</div>
}

export function ComparePage(){
  const [kind,setKind]=useState<'Pessoa'|'Conceito'|'Livro'|'Lugar'>('Pessoa');
  const catalog=useMemo(()=>{
    if(kind==='Pessoa'){const people=[...thinkers,...expandedThinkers.map((x:any)=>({...x,blurb:x.summary,field:x.areas.join(' · ')}))];return people.map((x:any)=>({id:x.id,title:x.name,image:x.image||'',kind,meta:thinkerDetails[x.id]?.period||x.period||'período não cadastrado',detail:thinkerDetails[x.id]?.context||x.blurb||x.summary||'Dossiê editorial disponível.',href:`/pensadores/${x.id}`}));}
    if(kind==='Conceito') return [...mathMicroconcepts,...physicsMicroconcepts].map((x:any)=>({id:x.id,title:x.title,image:x.subject==='physics'?'/assets/subjects/fisica.jpg':'/assets/subjects/matematica.jpg',kind,meta:x.topic,detail:x.summary||x.sourceNote||'Conceito registrado no laboratório do Radar.',href:`/conceitos/${x.id}`}));
    if(kind==='Livro'){const all=[...books,...broaderBooks.map(x=>({id:x[0],title:x[1],author:x[2],cover:`/assets/library/catalog/${x[0]}.svg`,theme:x[4]})),...expandedBooks.map((x:any)=>({id:x.id,title:x.title,author:x.author,year:x.year,cover:x.cover,theme:x.kind}))] as any[];return all.map(x=>({id:x.id,title:x.title,image:x.cover,kind,meta:`${x.author||''} · ${x.year||'s/d'}`,detail:x.theme||'Obra catalogada no Radar.',href:`/biblioteca/${x.id}`}));}
    return places.map((x:any)=>({id:x.id,title:x.name,image:x.image,kind,meta:`${x.region} · ${x.period}`,detail:x.fact||x.why||'Lugar cadastrado no Atlas.',href:`/atlas?place=${x.id}`}));
  },[kind]);
  const [left,setLeft]=useState(''); const [right,setRight]=useState('');
  useEffect(()=>{setLeft(catalog[0]?.id||'');setRight(catalog[1]?.id||catalog[0]?.id||'')},[kind]);
  const a=catalog.find(x=>x.id===left)||catalog[0]; const b=catalog.find(x=>x.id===right)||catalog[1]||catalog[0];
  if(!a||!b)return <div className="empty-state surface"><Network size={28}/><b>Não há entidades suficientes para comparar.</b><span>Escolha outro tipo com conteúdo cadastrado.</span><Link className="secondary-btn" href="/explorar">Explorar conhecimento</Link></div>;
  return <div className="stack-lg"><PageHeader kicker="Compare" title="Duas entidades, sem ranking" description="Compare contexto, período, área e relações usando somente dados já cadastrados no Radar."/><section className="compare-controls surface"><label>Tipo<select className="field" value={kind} onChange={e=>setKind(e.target.value as any)}><option>Pessoa</option><option>Conceito</option><option>Livro</option><option>Lugar</option></select></label><label>Primeiro<select className="field" value={a.id} onChange={e=>setLeft(e.target.value)}>{catalog.map(x=><option key={x.id} value={x.id}>{x.title}</option>)}</select></label><Network/><label>Segundo<select className="field" value={b.id} onChange={e=>setRight(e.target.value)}>{catalog.map(x=><option key={x.id} value={x.id}>{x.title}</option>)}</select></label></section><div className="compare-grid">{[a,b].map(x=><article className="surface compare-card" key={x.id}><EntityMedia src={x.image} alt={x.title} aspect="4 / 3"/><div className="eyebrow">{x.kind}</div><h2>{x.title}</h2><p>{x.detail}</p><dl><div><dt>Referência</dt><dd>{x.meta}</dd></div><div><dt>Relação</dt><dd>Explore a entidade sem deixar a comparação.</dd></div></dl><div className="button-row"><Link className="secondary-btn small" href={x.href}>Abrir entidade <ArrowRight size={12}/></Link></div></article>)}</div></div>
}

export function DomainMapPage({state}:{state:AppState}){
  const all=[...mathMicroconcepts,...physicsMicroconcepts];
  const normalized=(x:string)=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const microProgress=(subjectId:string)=>{const subject=subjectId==='matematica'?'math':'physics';const list=all.filter(x=>x.subject===subject);const complete=list.filter(m=>state.events.some(e=>(e.type==='content_completed'||e.type==='experience_completed'||e.type==='topic_completed')&&(e.entityId===m.id||e.entityId===`micro:${m.id}`))).length;return list.length?Math.round(complete/list.length*100):0};
  const languageProgress=(subjectId:string)=>{const subject=editorialSubjects.find((s:any)=>s.id===subjectId);const topics=(subject?.topics||[]) as string[];if(!topics.length)return 0;const done=new Set<string>();state.events.filter((e:any)=>['topic_completed','content_completed','question_answered'].includes(e.type)&&normalized(String(e.subject||''))===normalized(String(subject?.name||''))).forEach((e:any)=>{const raw=String(e.meta?.topic||e.entityId||'');const match=topics.find(t=>normalized(raw)===normalized(t)||normalized(raw).includes(normalized(t))||normalized(t).includes(normalized(raw)));if(match&&(e.type!=='question_answered'||e.correct))done.add(match);});return Math.round(done.size/topics.length*100)};
  const pctFor=(id:string)=>id==='matematica'||id==='fisica'?microProgress(id):languageProgress(id);
  return <div className="stack-lg"><PageHeader kicker="Edital + conhecimento" title="Mapa de domínio" description="Uma visão navegável da cobertura didática. O número aparece somente a partir de eventos reais de estudo, conclusão ou questões respondidas."/><div className="domain-grid">{editorialSubjects.map((s:any)=>{const pct=pctFor(s.id);return <article className="domain-card surface" key={s.id}><EntityMedia src={s.image} alt={s.name}/><div className="eyebrow">{s.topics.length} tópicos-base</div><h2>{s.name}</h2><p>Selecione um eixo e entre no conteúdo exato.</p><div className="progress-track"><i style={{width:`${pct}%`}}/></div><strong>{pct}% de cobertura evidenciada</strong><div className="domain-topic-list">{s.topics.map((topic:string)=><Link key={topic} href={`/estudar/${s.id}?topic=${encodeURIComponent(topic)}`} className="domain-topic"><span>{topic}</span><ArrowRight size={12}/></Link>)}</div></article>})}</div></div>
}

const knowledgeDetails:{kind:string;slug:string;title:string;body:string;image:string;source:string;links:{label:string;href:string}[]}[]=[
 {kind:'prehistory',slug:'evidencia',title:'Evidência pré-histórica',body:'Distingua vestígio, interpretação e reconstrução. Fósseis, ferramentas, sedimentos e DNA antigo são linhas de evidência com graus e limites diferentes.',image:'/assets/knowledge/prehistory-1.svg',source:'Smithsonian Human Origins — referência institucional.',links:[{label:'Módulo de evidências',href:'/prehistoria?module=pre-historia-evidencias'},{label:'Atlas',href:'/atlas'}]},
 {kind:'science',slug:'experimento-e-hipotese',title:'Experimento e hipótese',body:'Uma experiência começa com uma pergunta e uma hipótese testável. Defina variável, observação, resultado e comparação antes de tirar uma conclusão.',image:'/assets/knowledge/science-4.svg',source:'Museu de Astronomia e Ciências Afins — referência institucional.',links:[{label:'Módulo de experimentos',href:'/ciencia?module=experimentos-metodo'},{label:'Questões de Física',href:'/questoes?subject=Física'}]},
 {kind:'science',slug:'hipotese-e-experimento',title:'Hipótese e experimento',body:'Hipótese e resultado não são a mesma coisa: a primeira orienta o teste; o segundo é o que foi observado sob determinadas condições.',image:'/assets/knowledge/science-4.svg',source:'Museu de Astronomia e Ciências Afins — referência institucional.',links:[{label:'Módulo de experimentos',href:'/ciencia?module=experimentos-metodo'},{label:'Explorar ciência',href:'/ciencia'}]},
 {kind:'science',slug:'movimento-e-energia',title:'Movimento e energia',body:'Use gráficos, relações de grandezas e questões para estudar movimento e conservação de energia com uma experiência curta e verificável.',image:'/assets/knowledge/science-1.svg',source:'OpenStax Physics — referência educacional.',links:[{label:'Física',href:'/estudar/fisica?topic=Mecânica'},{label:'Questões',href:'/questoes?subject=Física&contentId=fis-cinematica'}]},
 {kind:'science',slug:'optica',title:'Óptica',body:'Explore reflexão, refração, lentes e fenômenos ópticos por meio de diagramas e questões associadas.',image:'/assets/knowledge/science-2.svg',source:'OpenStax Physics — referência educacional.',links:[{label:'Experiência',href:'/experiencia/fisica/fisica-001'},{label:'Questões',href:'/questoes?subject=Física&contentId=fis-ondas'}]},
 {kind:'science',slug:'astronomia',title:'Astronomia',body:'Conecte movimentos celestes, observação, matemática e lugares de produção do conhecimento.',image:'/assets/knowledge/science-3.svg',source:'NASA Science — referência pública.',links:[{label:'Atlas',href:'/atlas'},{label:'Linha do tempo',href:'/linha-do-tempo'}]},
 {kind:'science',slug:'metodo-cientifico',title:'Método científico',body:'Separe observação, inferência, hipótese e evidência em uma pequena atividade de classificação.',image:'/assets/knowledge/science-4.svg',source:'NASA Science — referência pública.',links:[{label:'Descobertas',href:'/dia?item=d9'},{label:'Explorar',href:'/explorar?topic=Método científico'}]},
 {kind:'prehistory',slug:'fossies',title:'Fósseis',body:'Fósseis são evidências preservadas que precisam ser interpretadas junto com contexto geológico e tafonômico.',image:'/assets/knowledge/prehistory-1.svg',source:'Smithsonian National Museum of Natural History — referência institucional.',links:[{label:'Biologia',href:'/ciencia'},{label:'Atlas',href:'/atlas'}]},
 {kind:'prehistory',slug:'homininios',title:'Hominínios',body:'Compare evidências de Neandertais, Denisovanos e Homo sapiens sem misturar dado fóssil, inferência e hipótese.',image:'/assets/knowledge/prehistory-2.svg',source:'Smithsonian / instituições acadêmicas — referência editorial.',links:[{label:'Ciência',href:'/ciencia'},{label:'Linha do tempo',href:'/linha-do-tempo'}]},
 {kind:'prehistory',slug:'fogo-e-ferramentas',title:'Fogo e ferramentas',body:'Tecnologia pré-histórica pode ser estudada como evidência de comportamento, ambiente e adaptação.',image:'/assets/knowledge/prehistory-3.svg',source:'Instituições acadêmicas — referência editorial.',links:[{label:'Atlas',href:'/atlas'},{label:'Diário',href:'/diario'}]},
 {kind:'prehistory',slug:'brasil-antigo',title:'Brasil antigo',body:'O Radar reúne materiais introdutórios sobre megafauna, sítios arqueológicos e patrimônio pré-histórico brasileiro.',image:'/assets/knowledge/prehistory-4.svg',source:'IPHAN e referências museológicas a consultar em cada item.',links:[{label:'Atlas',href:'/atlas'},{label:'Explorar',href:'/explorar?topic=Brasil antigo'}]},
];

export function KnowledgeDetailPage({kind,slug}:{kind:string;slug:string}){
  const d=knowledgeDetails.find(x=>x.kind===kind&&x.slug===slug);
  if(!d)return <section className="empty-state surface"><Eye size={28}/><b>Conteúdo indisponível.</b><span>Esta experiência ainda não está cadastrada.</span><Link className="secondary-btn" href={`/${kind==='culture'?'cultura':kind}`}>Voltar</Link></section>;
  return <div className="stack-lg"><Link href={`/${kind}`} className="back-link"><ArrowLeft size={15}/> Voltar</Link><V25Hero src={d.image} alt={d.title} kicker={kind==='science'?'Ciência':'Pré-história'} title={d.title} description={d.body}/><section className="knowledge-editorial-layout"><article className="surface knowledge-article"><div className="eyebrow accent-text">Leitura guiada</div><h2>{kind==='science'?'Da observação à explicação':'Da evidência à reconstrução'}</h2><p>{d.body}</p><h3>O que observar</h3><p>Separe aquilo que está diretamente registrado da interpretação construída a partir desse registro. Em ciência e história natural, uma boa explicação precisa deixar claro onde termina a observação e onde começa a inferência.</p><h3>Como isso vira estudo</h3><p>Leia o texto, examine a imagem, identifique a variável ou evidência principal e só depois siga para a atividade. O objetivo é fazer a pessoa compreender o mecanismo, não apenas memorizar uma definição.</p><h3>Pergunta para levar adiante</h3><blockquote>Que evidência sustentaria ou enfraqueceria a explicação apresentada?</blockquote></article><aside className="stack-md"><article className="surface"><div className="eyebrow">Camadas do conhecimento</div><div className="v25-layers"><div><b>Descobrir</b><span>Contexto e pergunta inicial.</span></div><div><b>Entender</b><span>Explicação + visual.</span></div><div><b>Praticar</b><span>Atividade e questão.</span></div><div><b>Conectar</b><span>Atlas, pessoas, obras e conceitos.</span></div></div></article><article className="surface"><div className="eyebrow">Fontes</div><p>{d.source}</p><div className="button-row">{d.links.map(x=><Link className="secondary-btn" href={x.href} key={x.href}>{x.label}<ArrowRight size={13}/></Link>)}</div></article></aside></section></div>
}

export function CultureDetailPage({slug}:{slug:string}){
  const candidates=Object.entries(v25CultureMap).map(([key,v])=>({slug:key.toLowerCase().replaceAll(' ','-'),...v}));
  const d=candidates.find(x=>x.slug===slug);
  if(!d)return <section className="empty-state surface"><Eye size={28}/><b>Referência não encontrada.</b><span>O Radar não cria uma relação cultural que não esteja cadastrada.</span><Link className="secondary-btn" href="/cultura">Voltar à cultura</Link></section>;
  return <div className="stack-lg"><Link href="/cultura" className="back-link"><ArrowLeft size={15}/> Cultura</Link><V25Hero src={d.image} alt={d.title} kicker="Cultura como ponte" title={d.title} description={d.summary}/><section className="surface"><div className="eyebrow">Por que essa relação existe?</div><p>{d.reason}</p><div className="button-row">{d.links.map(x=><Link className="secondary-btn" href={x.href} key={x.href}>{x.label}<ArrowRight size={13}/></Link>)}</div></section></div>
}

export function V25CommandPage(){
  const commands=[['Newton','/pensadores/newton'],['Começar Matemática','/estudar/matematica'],['Continuar leitura','/biblioteca?continue=1'],['Revisar erros','/revisoes'],['Abrir Bíblia','/biblia'],['Ir para Física','/estudar/fisica'],['Abrir Atlas','/atlas'],['Iniciar cronômetro','/estudar/foco'],['Simulados','/simulados']];
  return <div className="stack-lg"><PageHeader kicker="Central de comando" title="Ações diretas" description="Uma superfície simples para chegar ao que realmente existe no Radar."/><div className="command-grid">{commands.map(([label,href])=><Link key={href} href={href} className="command-card surface"><Sparkles size={17}/><div><b>{label}</b><span>{href}</span></div><ArrowRight size={14}/></Link>)}</div></div>
}

export function V25Routes({state,update}:{state:AppState;update:Update}){
  const path=window.location.pathname;
  if(path==='/trilhas')return <TrailsPage/>;
  if(path==='/linha-do-tempo')return <TimelinePage/>;
  if(path==='/diario')return <DiaryPage state={state}/>;
  if(path==='/salvos')return <SavedPage state={state}/>;
  if(path==='/comparar')return <ComparePage/>;
  if(path==='/mapa-do-edital')return <DomainMapPage state={state}/>;
  const m=path.match(/^\/(ciencia|prehistoria)\/([^/]+)$/); if(m)return <KnowledgeDetailPage kind={m[1]} slug={m[2]}/>;
  const c=path.match(/^\/cultura\/([^/]+)$/); if(c)return <CultureDetailPage slug={c[1]}/>;
  return <V25CommandPage/>;
}
