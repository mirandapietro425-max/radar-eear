import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Compass, Eye, Network, BookMarked, Save, Search, Sparkles, Target } from 'lucide-react';
import { Link } from 'wouter';
import { EntityMedia } from '../components/EntityMedia';
import { explorationTrails, globalTimeline, v25CultureMap } from '../data/v25-content';
import { broaderBooks } from '../data/catalog';
import { thinkers, books, places } from '../experience-data';
import { bibleBooks } from '../experience-data';
import { editorialSubjects } from '../data/exam-data';
import { mathMicroconcepts, physicsMicroconcepts } from '../data/microconcepts';
import type { AppState } from '../app/App';

type Update = (f:(s:AppState)=>AppState)=>void;

function uid(){return crypto.randomUUID?.()||`${Date.now()}-${Math.random()}`}
function record(state:AppState, update:Update, type:string, entityId:string, meta:Record<string,any>={}){
  update(s=>({...s,events:[...s.events,{id:uid(),createdAt:new Date().toISOString(),type:type as any,entityId,meta}].slice(-5000)}));
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
    if(type==='bible') return {label:id,href:`/biblia/${id}`,image:`/assets/bible/books/${id}.svg`,kind:'Bíblia'};
    if(type==='bible_chapter_bookmark') return {label:`Bíblia · ${id}`,href:`/biblia/${id.split(':')[0]}/${id.split(':')[1]||1}`,image:'/assets/bible/books/genesis.svg',kind:'Bíblia'};
    const thinker=thinkers.find(x=>x.id===id); if(thinker)return {label:thinker.name,href:`/pensadores/${id}`,image:thinker.image,kind:'Pessoa'};
    const book=[...books,...broaderBooks.map(x=>({id:x[0],title:x[1],cover:`/assets/library/catalog/${x[0]}.svg`}))].find(x=>x.id===id) as any; if(book)return {label:book.title,href:`/biblioteca/${id}`,image:book.cover,kind:'Livro'};
    const place=places.find(x=>x.id===id); if(place)return {label:place.name,href:`/atlas?place=${id}`,image:place.image,kind:'Lugar'};
    return null;
  };
  const resolved=saved.map(k=>({key:k,item:resolve(k)}));
  return <div className="stack-lg"><PageHeader kicker="Meu Radar" title="Salvos" description="Itens que você escolheu guardar. Nada aparece aqui sem uma ação sua."/>{saved.length?<><div className="saved-grid">{resolved.filter(x=>x.item).map(({key:k,item:x})=><Link className="saved-card surface" key={k} href={(x as any).href}><EntityMedia src={(x as any).image} alt={(x as any).label}/><div><div className="eyebrow">{(x as any).kind}</div><h2>{(x as any).label}</h2><span className="text-link">Abrir <ArrowRight size={12}/></span></div></Link>)}</div>{resolved.some(x=>!x.item)&&<section className="surface saved-unavailable"><div className="eyebrow">Itens indisponíveis</div><p>Alguns registros salvos não correspondem mais a um conteúdo publicado e não foram redirecionados para uma página genérica.</p></section>}</>:<section className="empty-state surface"><Save size={28}/><b>Nenhum item salvo.</b><span>Use Salvar no Meu Radar em conteúdos que quiser reencontrar.</span><Link className="secondary-btn" href="/explorar">Explorar conhecimento</Link></section>}</div>
}

export function ComparePage(){
  const [left,setLeft]=useState('newton');const [right,setRight]=useState('kepler');
  const persons=thinkers.filter(x=>['newton','kepler','galileo','descartes','plato','aristotle','mendel','maxwell'].includes(x.id));
  const a=persons.find(x=>x.id===left)||persons[0],b=persons.find(x=>x.id===right)||persons[1];
  const details=(id:string)=>({newton:{period:'1643–1727',area:'Matemática · Física · Filosofia natural',works:'Principia; Opticks',place:'Cambridge'},kepler:{period:'1571–1630',area:'Astronomia · Matemática',works:'Astronomia Nova; Harmonices Mundi',place:'Praga / Graz'},galileo:{period:'1564–1642',area:'Física · Astronomia',works:'Sidereus Nuncius; Dialogo',place:'Pisa / Pádua'},descartes:{period:'1596–1650',area:'Filosofia · Matemática',works:'Discurso do Método; Meditações',place:'França / Países Baixos'},plato:{period:'c. 428–348 a.C.',area:'Filosofia',works:'República; diálogos',place:'Atenas'},aristotle:{period:'384–322 a.C.',area:'Filosofia · Ciência antiga',works:'Metafísica; Política',place:'Estagira / Atenas'},mendel:{period:'1822–1884',area:'Biologia · Genética',works:'Experimentos com ervilhas',place:'Brno'},maxwell:{period:'1831–1879',area:'Física · Matemática',works:'Equações do eletromagnetismo',place:'Edimburgo / Cambridge'}}[id]||{period:'',area:'',works:'',place:''});
  const da=details(a.id),db=details(b.id);
  return <div className="stack-lg"><PageHeader kicker="Compare" title="Duas entidades, sem ranking" description="Compare apenas dimensões compatíveis. O Radar não transforma comparação editorial em ranking."/><section className="compare-controls surface"><label>Primeiro<select className="field" value={a.id} onChange={e=>setLeft(e.target.value)}>{persons.map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</select></label><Network/><label>Segundo<select className="field" value={b.id} onChange={e=>setRight(e.target.value)}>{persons.map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</select></label></section><div className="compare-grid">{[[a,da],[b,db]].map(([p,d]:any)=><article className="surface compare-card" key={p.id}><EntityMedia src={p.image} alt={p.name} aspect="4 / 3"/><div className="eyebrow">Pessoa</div><h2>{p.name}</h2><p>{p.blurb}</p><dl><div><dt>Período</dt><dd>{d.period}</dd></div><div><dt>Áreas</dt><dd>{d.area}</dd></div><div><dt>Obras</dt><dd>{d.works}</dd></div><div><dt>Lugares</dt><dd>{d.place}</dd></div></dl><div className="button-row"><Link className="secondary-btn small" href={`/pensadores/${p.id}`}>Abrir perfil <ArrowRight size={12}/></Link></div></article>)}</div></div>
}

export function DomainMapPage({state}:{state:AppState}){
  const all=[...mathMicroconcepts,...physicsMicroconcepts];
  const subjectProgress=(subjectId:string)=>{const subject=subjectId==='matematica'?'math':'physics';const list=all.filter(x=>x.subject===subject);const complete=list.filter(m=>state.events.some(e=>(e.type==='content_completed'||e.type==='experience_completed'||e.type==='topic_completed')&&(e.entityId===m.id||e.entityId===`micro:${m.id}`))).length;return list.length?Math.round(complete/list.length*100):0};
  return <div className="stack-lg"><PageHeader kicker="Edital + conhecimento" title="Mapa de domínio" description="Uma visão navegável da cobertura didática. O número mostra apenas tópicos efetivamente concluídos no seu histórico."/><div className="domain-grid">{editorialSubjects.map(s=>{const pct=['matematica','fisica'].includes(s.id)?subjectProgress(s.id):0;return <article className="domain-card surface" key={s.id}><EntityMedia src={s.image} alt={s.name}/><div className="eyebrow">{s.topics.length} tópicos-base</div><h2>{s.name}</h2><p>Selecione um eixo e entre no conteúdo exato.</p><div className="progress-track"><i style={{width:`${pct}%`}}/></div><strong>{pct}% de microconceitos concluídos</strong><div className="domain-topic-list">{s.topics.map(topic=><Link key={topic} href={`/estudar/${s.id}?topic=${encodeURIComponent(topic)}`} className="domain-topic"><span>{topic}</span><ArrowRight size={12}/></Link>)}</div></article>})}</div></div>
}

const knowledgeDetails:{kind:string;slug:string;title:string;body:string;image:string;source:string;links:{label:string;href:string}[]}[]=[
 {kind:'science',slug:'movimento-e-energia',title:'Movimento e energia',body:'Use gráficos, relações de grandezas e questões para estudar movimento e conservação de energia com uma experiência curta e verificável.',image:'/assets/knowledge/science-1.svg',source:'OpenStax Physics — referência educacional.',links:[{label:'Física',href:'/estudar/fisica?topic=Mecânica'},{label:'Questões',href:'/questoes?topic=Cinemática'}]},
 {kind:'science',slug:'optica',title:'Óptica',body:'Explore reflexão, refração, lentes e fenômenos ópticos por meio de diagramas e questões associadas.',image:'/assets/knowledge/science-2.svg',source:'OpenStax Physics — referência educacional.',links:[{label:'Experiência',href:'/experiencia/fisica/fisica-001'},{label:'Questões',href:'/questoes?topic=Óptica'}]},
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
  return <div className="stack-lg"><Link href={`/${kind}`} className="back-link"><ArrowLeft size={15}/> Voltar</Link><V25Hero src={d.image} alt={d.title} kicker={kind==='science'?'Ciência':'Pré-história'} title={d.title} description={d.body}/><section className="content-grid-2"><article className="surface"><div className="eyebrow">Camadas do conhecimento</div><div className="v25-layers"><div><b>Descobrir</b><span>Leia o contexto e identifique a pergunta.</span></div><div><b>Entender</b><span>Use a explicação e o visual como modelo.</span></div><div><b>Praticar</b><span>Abra a questão ou microexperiência relacionada.</span></div><div><b>Conectar</b><span>Siga para Atlas, Diário ou outro conteúdo.</span></div></div></article><article className="surface"><div className="eyebrow">Fontes</div><p>{d.source}</p><div className="button-row">{d.links.map(x=><Link className="secondary-btn" href={x.href} key={x.href}>{x.label}<ArrowRight size={13}/></Link>)}</div></article></section></div>
}

export function CultureDetailPage({slug}:{slug:string}){
  const candidates=Object.entries(v25CultureMap).map(([key,v])=>({slug:key.toLowerCase().replaceAll(' ','-'),...v}));
  const d=candidates.find(x=>x.slug===slug);
  if(!d)return <section className="empty-state surface"><Eye size={28}/><b>Referência não encontrada.</b><span>O Radar não cria uma relação cultural que não esteja cadastrada.</span><Link className="secondary-btn" href="/cultura">Voltar à cultura</Link></section>;
  return <div className="stack-lg"><Link href="/cultura" className="back-link"><ArrowLeft size={15}/> Cultura</Link><V25Hero src={d.image} alt={d.title} kicker="Cultura como ponte" title={d.title} description={d.summary}/><section className="surface"><div className="eyebrow">Por que essa relação existe?</div><p>{d.reason}</p><div className="button-row">{d.links.map(x=><Link className="secondary-btn" href={x.href} key={x.href}>{x.label}<ArrowRight size={13}/></Link>)}</div></section></div>
}

export function V25CommandPage(){
  const commands=[['Newton','/pensadores/newton'],['Começar Matemática','/estudar/matematica'],['Continuar leitura','/biblioteca'],['Revisar erros','/revisoes'],['Abrir Bíblia','/biblia'],['Ir para Física','/estudar/fisica'],['Abrir Atlas','/atlas'],['Iniciar cronômetro','/estudar/foco'],['Simulados','/simulados']];
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
