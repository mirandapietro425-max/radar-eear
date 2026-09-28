export type ThinkerDetail = {
  birthplace: string;
  period: string;
  areas: string[];
  context: string;
  ideas: string[];
  works: string[];
  influencedBy: string[];
  influenced: string[];
  source: string;
  relatedBook?: string;
  relatedTopic?: string;
  relations: { label: string; href: string }[];
};

const common = (name:string, href:string) => [{label:`Abrir ${name}`, href}];

export const thinkerDetails: Record<string, ThinkerDetail> = {
  newton:{birthplace:'Woolsthorpe, Inglaterra',period:'1643–1727',areas:['Matemática','Física','Óptica','Filosofia natural'],context:'Newton trabalhou em um período de transformação da ciência europeia e articulou matemática, observação e filosofia natural em obras que marcaram a história da física.',ideas:['Leis do movimento','Gravitação universal','Óptica e experimentação','Cálculo e métodos matemáticos'],works:['Principia Mathematica','Opticks','Arithmetica Universalis'],influencedBy:['Galileu Galilei','Johannes Kepler','René Descartes'],influenced:['Física clássica','Mecânica celeste','Ciência matemática'],source:'Curadoria editorial baseada em referências históricas e científicas identificadas no Radar; consultar as fontes primárias para aprofundamento.',relatedBook:'newton-principia',relatedTopic:'gravitação',relations:[...common('Newton no Atlas','/atlas/cambridge'),{label:'Principia',href:'/biblioteca/newton-principia'}]},
  plato:{birthplace:'Atenas ou região da Ática',period:'c. 428/427–348/347 a.C.',areas:['Filosofia','Política','Epistemologia'],context:'Platão escreveu diálogos que discutem conhecimento, justiça, educação, política, ética e natureza da realidade.',ideas:['Teoria das Formas','Conhecimento e opinião','Justiça e política','Educação filosófica'],works:['A República','Apologia de Sócrates','Timeu'],influencedBy:['Sócrates','Pitagorismo'],influenced:['Filosofia antiga e medieval','Filosofia política','Epistemologia'],source:'Curadoria editorial; interpretações devem ser consultadas nas obras e estudos especializados.',relatedBook:'plato-republica',relatedTopic:'filosofia',relations:[{label:'A República',href:'/biblioteca/plato-republica'},{label:'Atenas',href:'/atlas/atenas'}]},
  socrates:{birthplace:'Atenas',period:'c. 470–399 a.C.',areas:['Filosofia','Ética','Diálogo'],context:'Sócrates é conhecido por seu método dialógico e por perguntas que investigam conceitos morais e epistemológicos; as fontes sobre sua vida são posteriores.',ideas:['Exame da vida','Ironia socrática','Pergunta e diálogo','Virtude e conhecimento'],works:['Não deixou obras escritas; conhecido por fontes como Platão e Xenofonte'],influencedBy:['Tradição filosófica ateniense'],influenced:['Platão','Aristóteles e tradições socráticas'],source:'Curadoria editorial com indicação explícita de que os testemunhos são indiretos.',relatedTopic:'ética',relations:[{label:'Atenas',href:'/atlas/atenas'},{label:'Platão',href:'/pensadores/plato'}]},
  aristotle:{birthplace:'Estagira, Grécia',period:'384–322 a.C.',areas:['Filosofia','Lógica','Ciência antiga','Ética'],context:'Aristóteles investigou lógica, natureza, ética, política e metafísica, articulando classificação conceitual e observação.',ideas:['Lógica','Quatro causas','Ética das virtudes','Investigação da natureza'],works:['Metafísica','Ética a Nicômaco','Política','Poética'],influencedBy:['Platão','Tradição científica grega'],influenced:['Filosofia medieval','Ciência e lógica'],source:'Curadoria editorial; ver obras e estudos especializados para atribuição e controvérsias.',relatedTopic:'lógica',relations:[{label:'Atenas',href:'/atlas/atenas'},{label:'Platão',href:'/pensadores/plato'}]},
  augustine:{birthplace:'Tagaste, Norte da África romana',period:'354–430',areas:['Teologia','Filosofia','História cristã'],context:'Agostinho escreveu sobre tempo, memória, vontade, graça e vida cristã em diálogo com tradições filosóficas e teológicas de seu período.',ideas:['Tempo e memória','Vontade','Graça','Interioridade'],works:['Confissões','A Cidade de Deus'],influencedBy:['Platonismo','Tradições cristãs anteriores'],influenced:['Teologia latina','Filosofia medieval'],source:'Curadoria editorial; distinção entre texto, tradição e interpretação preservada.',relatedBook:'agostinho-confissoes',relatedTopic:'teologia',relations:[{label:'Roma',href:'/atlas/roma'}]},
};

const simple = (id:string,name:string,period:string,areas:string[],context:string,ideas:string[],works:string[],influencedBy:string[],influenced:string[]):ThinkerDetail=>({birthplace:'Biografia resumida; consulte a fonte primária para o local exato.',period,areas,context,ideas,works,influencedBy,influenced,source:'Curadoria editorial do Radar; detalhes biográficos devem ser conferidos nas referências especializadas.',relations:[{label:'Explorar conexões',href:'/explorar'}]});

const thinkerExtras: Array<[string,string,string,string[],string,string[],string[],string[],string[]]> = [
 ['aquinas','Tomás de Aquino','1225–1274',['Teologia','Filosofia'], 'Síntese escolástica entre filosofia aristotélica e teologia cristã.',['Ato e potência','Lei natural','Relação entre fé e razão'],['Suma Teológica','Suma contra os Gentios'],['Aristóteles'],['Escolástica cristã']],
 ['descartes','René Descartes','1596–1650',['Filosofia','Matemática'],'Investigação do conhecimento e desenvolvimento da geometria analítica.',['Dúvida metódica','Cogito','Método'],['Discurso do Método','Meditações Metafísicas'],['Escolástica e matemática moderna'],['Filosofia moderna','Matemática']],
 ['pascal','Blaise Pascal','1623–1662',['Matemática','Física','Filosofia'],'Pesquisador em probabilidade, geometria e fenômenos físicos; também escreveu sobre condição humana.',['Probabilidade','Pressão','Limites da razão'],['Pensamentos','Provinciais'],['Geometria clássica','Tradição cristã'],['Probabilidade','Filosofia da religião']],
 ['galileo','Galileu Galilei','1564–1642',['Física','Astronomia'],'Uso de observação, experimento e matemática na investigação da natureza.',['Movimento','Observação telescópica','Modelagem matemática'],['Sidereus Nuncius','Diálogo sobre os dois máximos sistemas'],['Arquimedes','Copérnico'],['Física moderna','Astronomia']],
 ['kepler','Johannes Kepler','1571–1630',['Astronomia','Matemática'],'Leis matemáticas do movimento planetário baseadas em dados observacionais.',['Órbitas elípticas','Leis planetárias'],['Astronomia Nova','Harmonices Mundi'],['Tycho Brahe','Copérnico'],['Astronomia matemática']],
 ['faraday','Michael Faraday','1791–1867',['Física','Eletromagnetismo'],'Experimentação em eletricidade e magnetismo, incluindo indução eletromagnética.',['Indução','Campo magnético','Experimentação'],['Experimental Researches in Electricity'],['H. Davy e tradição experimental'],['Eletromagnetismo']],
 ['maxwell','James Clerk Maxwell','1831–1879',['Física','Matemática'],'Formulação matemática do eletromagnetismo clássico.',['Equações de Maxwell','Ondas eletromagnéticas'],['A Treatise on Electricity and Magnetism'],['Faraday'],['Física teórica']],
 ['mendel','Gregor Mendel','1822–1884',['Biologia','Genética'],'Experimentos com ervilhas e padrões de hereditariedade.',['Segregação','Distribuição independente'],['Experiências sobre híbridos de plantas'],['Botânica do século XIX'],['Genética']],
 ['godel','Kurt Gödel','1906–1978',['Lógica','Matemática'],'Resultados fundamentais sobre limites de sistemas formais.',['Incompletude','Completude'],['Teoremas da incompletude'],['Hilbert','Russell'],['Lógica matemática']],
 ['marx','Karl Marx','1818–1883',['Economia','Filosofia','Sociologia'],'Crítica da economia política e análise histórica das relações de produção.',['Trabalho','Classes','Capital'],['O Capital','Manifesto Comunista'],['Hegel','Economia política clássica'],['Sociologia','Economia política']],
 ['weber','Max Weber','1864–1920',['Sociologia'],'Estudo da ação social, dominação, burocracia e relações entre religião e economia.',['Ação social','Dominação','Burocracia'],['Economia e Sociedade','A Ética Protestante e o Espírito do Capitalismo'],['Sociologia clássica'],['Sociologia interpretativa']],
 ['durkheim','Émile Durkheim','1858–1917',['Sociologia'],'Consolidação da sociologia como disciplina e estudo dos fatos sociais.',['Fato social','Solidariedade','Anomia'],['As Regras do Método Sociológico','O Suicídio'],['Sociologia francesa'],['Sociologia moderna']],
 ['tocqueville','Alexis de Tocqueville','1805–1859',['Política','Sociologia'],'Análise histórica e comparada da democracia e das instituições.',['Democracia','Igualdade','Associações'],['A Democracia na América'],['Liberalismo político'],['Teoria política']],
 ['bourdieu','Pierre Bourdieu','1930–2002',['Sociologia'],'Análise das estruturas sociais por meio de campo, habitus e capitais.',['Habitus','Campo','Capital cultural'],['A Distinção','O Poder Simbólico'],['Sociologia clássica'],['Sociologia contemporânea']],
 ['goffman','Erving Goffman','1922–1982',['Sociologia'],'Estudo da interação cotidiana e da apresentação do eu.',['Apresentação do eu','Estigma','Instituições totais'],['A Representação do Eu na Vida Cotidiana','Estigma'],['Sociologia interacionista'],['Microssociologia']],
 ['dubois','W. E. B. Du Bois','1868–1963',['Sociologia','História'],'Pesquisa social, história e análise da experiência afro-americana.',['Dupla consciência','Pesquisa empírica'],['The Souls of Black Folk','The Philadelphia Negro'],['Tradição sociológica e pensamento negro'],['Sociologia','História social']],
 ['merton','Robert K. Merton','1910–2003',['Sociologia','Ciência'],'Teoria social e sociologia da ciência.',['Funções manifestas e latentes','Anomia','Normas da ciência'],['Social Theory and Social Structure'],['Durkheim','Weber'],['Sociologia da ciência']],
 ['mannheim','Karl Mannheim','1893–1947',['Sociologia do conhecimento'],'Estudo das relações entre posição social, conhecimento e ideologia.',['Sociologia do conhecimento','Ideologia e utopia'],['Ideology and Utopia'],['Marx','Simmel'],['Sociologia do conhecimento']],
 ['lemaitre','Georges Lemaître','1894–1966',['Física','Cosmologia'],'Cosmologia relativística e proposta do átomo primordial na história do universo em expansão.',['Expansão do universo','Átomo primordial'],['The Beginning of the World from the Point of View of Quantum Theory'],['Einstein','Relatividade'],['Cosmologia moderna']],
];

for (const [id,name,period,areas,context,ideas,works,by,to] of thinkerExtras) {
  thinkerDetails[id]=simple(id,name,period,areas,context,ideas,works,by,to);
}

// Enrich a few relations and book links
thinkerDetails['descartes'].relations=[{label:'Meditações',href:'/biblioteca/descartes-meditacoes'},{label:'Paris no Atlas',href:'/atlas/paris'}]
thinkerDetails['galileo'].relations=[{label:'Pisa',href:'/atlas/pisa'},{label:'Pádua',href:'/atlas/padua'}]
thinkerDetails['newton'].relations=[{label:'Cambridge',href:'/atlas/cambridge'},{label:'Principia',href:'/biblioteca/newton-principia'},{label:'Gravitação',href:'/conceitos/gravidade'}]
