export type ExplorationTrail = {
  id: string;
  title: string;
  description: string;
  duration: number;
  steps: { label: string; href: string; image?: string }[];
};

export const explorationTrails: ExplorationTrail[] = [
  { id:'uma-hora-newton', title:'Uma hora com Newton', description:'Da vida de Newton até uma questão e uma revisão, em uma trilha interna.', duration:60, steps:[
    {label:'Perfil de Isaac Newton',href:'/pensadores/newton',image:'/assets/thinkers/newton.svg'},
    {label:'Cambridge',href:'/atlas?place=cambridge',image:'/assets/atlas/cambridge.svg'},
    {label:'Cálculo',href:'/estudar/matematica?topic=Álgebra avançada',image:'/assets/subjects/matematica.svg'},
    {label:'Leis do movimento',href:'/estudar/fisica?topic=Mecânica',image:'/assets/subjects/fisica.svg'},
    {label:'Principia',href:'/biblioteca/newton-principia',image:'/assets/library/catalog/newton-principia.svg'},
    {label:'Questão relacionada',href:'/questoes?topic=Cinemática',image:'/assets/games/physics.svg'},
    {label:'Revisões',href:'/revisoes',image:'/assets/review/review.svg'},
  ]},
  { id:'palavra-fisica', title:'Da palavra à física', description:'Linguagem → matemática → física → aviação.', duration:45, steps:[
    {label:'Interpretação',href:'/estudar/portugues?topic=Interpretação',image:'/assets/subjects/portugues.svg'},
    {label:'Funções',href:'/estudar/matematica?topic=Álgebra',image:'/assets/subjects/matematica.svg'},
    {label:'Movimento',href:'/estudar/fisica?topic=Mecânica',image:'/assets/subjects/fisica.svg'},
    {label:'Atlas da aviação',href:'/atlas?category=Aviação',image:'/assets/atlas/cambridge.svg'},
  ]},
  { id:'texto-mapa', title:'Do texto bíblico ao mapa', description:'Capítulo → lugar → contexto → cronologia → fontes.', duration:30, steps:[
    {label:'Gênesis 12',href:'/biblia/genesis/12',image:'/assets/bible/books/genesis.svg'},
    {label:'Harã e Canaã no Atlas',href:'/atlas?place=jerusalem',image:'/assets/atlas/jerusalem.svg'},
    {label:'Contexto do capítulo',href:'/biblia/genesis/12/contexto',image:'/assets/bible/books/genesis.svg'},
    {label:'Linha do tempo',href:'/linha-do-tempo',image:'/assets/editorial/knowledge-radar.svg'},
  ]},
  { id:'literatura-filosofia', title:'Da literatura à filosofia', description:'Obra → problema → pensador → conceito.', duration:35, steps:[
    {label:'Dom Casmurro',href:'/biblioteca/machado-dom-casmurro',image:'/assets/library/catalog/machado-dom-casmurro.svg'},
    {label:'Dom Casmurro — autoria e contexto',href:'/biblioteca/machado-dom-casmurro',image:'/assets/library/catalog/machado-dom-casmurro.svg'},
    {label:'Filosofia',href:'/explorar?topic=Filosofia',image:'/assets/knowledge/knowledge-radar.svg'},
    {label:'Salvos e notas',href:'/salvos',image:'/assets/graph/book.svg'},
  ]},
];

export type TimelineEntry = { id:string; year:number; era:string; title:string; body:string; links:{label:string;href:string}[]; source:string };

export const globalTimeline: TimelineEntry[] = [
  {id:'antiguidade-grega',year:-399,era:'Antiguidade',title:'Sócrates',body:'O método dialógico associado a Sócrates tornou-se referência para investigação filosófica e crítica.',links:[{label:'Sócrates',href:'/pensadores/socrates'},{label:'Atenas',href:'/atlas?place=atenas'}],source:'Síntese editorial do Radar; ver fontes do perfil e do Atlas.'},
  {id:'euclides',year:-300,era:'Antiguidade',title:'Elementos e geometria',body:'A tradição euclidiana tornou-se uma referência central para a organização dedutiva da geometria.',links:[{label:'Alexandria',href:'/atlas?place=alexandria'},{label:'Matemática',href:'/estudar/matematica'}],source:'Síntese editorial do Radar; referência institucional e bibliográfica no módulo.'},
  {id:'augustine',year:398,era:'Antiguidade tardia',title:'Agostinho e Confissões',body:'A escrita autobiográfica e reflexão sobre memória e tempo influenciam a história intelectual ocidental.',links:[{label:'Agostinho',href:'/pensadores/augustine'},{label:'Biblioteca',href:'/biblioteca'}],source:'Síntese editorial do Radar.'},
  {id:'renascimento',year:1500,era:'Renascimento',title:'Renascimento e cartografia',body:'Arte, observação, cartografia e novas redes de circulação de conhecimento reconfiguram o ambiente intelectual europeu.',links:[{label:'Florença',href:'/atlas?place=florenca'},{label:'Atlas',href:'/atlas'}],source:'Síntese editorial do Radar.'},
  {id:'galileo',year:1610,era:'Revolução Científica',title:'Galileu e observação',body:'Observação telescópica e estudos do movimento participam das transformações metodológicas da ciência moderna.',links:[{label:'Galileu',href:'/pensadores/galileo'},{label:'Pisa',href:'/atlas?place=pisa'}],source:'Síntese editorial do Radar.'},
  {id:'newton-principia',year:1687,era:'Revolução Científica',title:'Principia de Newton',body:'As leis do movimento e a gravitação são apresentadas em uma obra decisiva para a história da física matemática.',links:[{label:'Newton',href:'/pensadores/newton'},{label:'Principia',href:'/biblioteca/newton-principia'},{label:'Cambridge',href:'/atlas?place=cambridge'}],source:'Project Gutenberg/edições públicas e referências bibliográficas do Radar.'},
  {id:'darwin',year:1859,era:'Século XIX',title:'A Origem das Espécies',body:'A seleção natural entra no debate científico moderno com uma formulação ampla da transformação das espécies.',links:[{label:'Biologia',href:'/ciencia'},{label:'Linha geral',href:'/explorar?topic=Evolução'}],source:'Síntese editorial; referências científicas a registrar no módulo de Biologia.'},
  {id:'mendel',year:1866,era:'Século XIX',title:'Mendel e hereditariedade',body:'Experimentos com ervilhas fornecem padrões quantitativos para estudar herança biológica.',links:[{label:'Mendel',href:'/pensadores/mendel'},{label:'Ciência',href:'/ciencia'}],source:'Síntese editorial do Radar.'},
  {id:'aviao',year:1903,era:'Século XX',title:'Primeiros voos controlados',body:'O desenvolvimento da aviação torna possível conectar mecânica, aerodinâmica, instrumentos e história tecnológica.',links:[{label:'Atlas',href:'/atlas'},{label:'Física',href:'/estudar/fisica'}],source:'Síntese editorial; verificar fontes aeronáuticas no módulo EEAR.'},
  {id:'lemeitre',year:1931,era:'Século XX',title:'Cosmologia de Lemaître',body:'A cosmologia relativística de Lemaître ocupa lugar importante na história das teorias de expansão do universo.',links:[{label:'Lemaître',href:'/pensadores/lemaitre'},{label:'Ciência',href:'/ciencia'}],source:'Síntese editorial do Radar.'},
];

export const v25CultureMap: Record<string,{title:string;summary:string;reason:string;links:{label:string;href:string}[];image:string}> = {
  'Matrix': {title:'Matrix → epistemologia',summary:'A obra popular oferece uma ponte para perguntas sobre realidade, conhecimento e dúvida.',reason:'Relação editorial entre cultura pop e filosofia da linguagem/epistemologia.',links:[{label:'Platão',href:'/pensadores/plato'},{label:'Descartes',href:'/pensadores/descartes'},{label:'Filosofia',href:'/explorar?topic=epistemologia'}],image:'/assets/knowledge/culture-1.svg'},
  'Jurassic Park': {title:'Jurassic Park → caos e ciência',summary:'A obra pode servir de porta de entrada para sistemas complexos, risco e limites de previsão.',reason:'Relação editorial entre narrativa, ciência e matemática.',links:[{label:'Matemática',href:'/estudar/matematica'},{label:'Ciência',href:'/ciencia'}],image:'/assets/knowledge/culture-2.svg'},
  'Hidden Figures': {title:'Hidden Figures → matemática e NASA',summary:'A narrativa ajuda a conectar cálculo, computação e história da exploração espacial.',reason:'Relação editorial entre cultura, matemática e ciência.',links:[{label:'Matemática',href:'/estudar/matematica'},{label:'Atlas',href:'/atlas'}],image:'/assets/knowledge/culture-3.svg'},
  'Arrival': {title:'Arrival → linguagem',summary:'A ficção científica permite explorar semântica, estrutura linguística e percepção do tempo.',reason:'Relação editorial entre linguagem, ficção e ciência cognitiva.',links:[{label:'Inglês',href:'/estudar/ingles'},{label:'Português',href:'/estudar/portugues'}],image:'/assets/knowledge/culture-4.svg'},
};
