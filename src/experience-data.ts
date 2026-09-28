export type Subject = 'Português' | 'Inglês' | 'Matemática' | 'Física' | 'Bíblia' | 'Exploração';

export type Place = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  image: string;
  period: string;
  fact: string;
  why: string;
  links: string[];
};

export const places: Place[] = [
  { id: 'atenas', name: 'Atenas', region: 'Grécia', lat: 37.9838, lng: 23.7275, image: '/assets/atlas/photos/place-atenas.jpg', period: 'Antiguidade', fact: 'Ponto do atlas para estudar filosofia grega, cidade, política, retórica e ciência antiga.', why: 'Filosofia • lógica • política • ética', links: ['Platão', 'Sócrates', 'Aristóteles'] },
  { id: 'alexandria', name: 'Alexandria', region: 'Egito', lat: 31.2001, lng: 29.9187, image: '/assets/atlas/photos/place-alexandria.jpg', period: 'Helenismo', fact: 'Ponto de encontro para matemática, astronomia, medicina e circulação de textos no Mediterrâneo helenístico.', why: 'Euclides • ciência • matemática', links: ['Euclides', 'Eratóstenes'] },
  { id: 'jerusalem', name: 'Jerusalém', region: 'Levante', lat: 31.7683, lng: 35.2137, image: '/assets/atlas/jerusalem.svg', period: 'Antiguidade', fact: 'Lugar de referência para o estudo histórico e religioso de judaísmo, cristianismo antigo e tradições do Levante.', why: 'Bíblia • história • arqueologia', links: ['Templo', 'Segundo Templo', 'Cristianismo antigo'] },
  { id: 'qumran', name: 'Qumran', region: 'Mar Morto', lat: 31.741, lng: 35.459, image: '/assets/atlas/qumran.svg', period: 'Segundo Templo', fact: 'O ponto contextualiza os manuscritos do Mar Morto, transmissão textual e judaísmo do período do Segundo Templo.', why: 'Manuscritos • Judaísmo • 1 Enoque', links: ['Manuscritos do Mar Morto', '1 Enoque'] },
  { id: 'roma', name: 'Roma', region: 'Itália', lat: 41.9028, lng: 12.4964, image: '/assets/atlas/photos/place-roma.jpg', period: 'Antiguidade / Império', fact: 'Ponto do atlas para conectar Império Romano, administração, cultura mediterrânea e cristianismo antigo.', why: 'Império • Cristianismo • História', links: ['Paulo', 'Atos', 'Cartas'] },
  { id: 'pisa', name: 'Pisa', region: 'Itália', lat: 43.7228, lng: 10.4017, image: '/assets/atlas/photos/place-pisa.jpg', period: 'Renascimento / Ciência moderna', fact: 'Entrada para estudar Galileu, matemática, observação e as mudanças da ciência moderna.', why: 'Galileu • Física • Matemática', links: ['Galileu', 'Movimento'] },
  { id: 'padua', name: 'Pádua', region: 'Itália', lat: 45.4064, lng: 11.8768, image: '/assets/atlas/padua.svg', period: 'Idade Moderna', fact: 'Ponto ligado à fase universitária de Galileu e à observação sistemática da natureza.', why: 'Galileu • observação • ciência', links: ['Galileu', 'Astronomia'] },
  { id: 'cambridge', name: 'Cambridge', region: 'Inglaterra', lat: 52.2053, lng: 0.1218, image: '/assets/atlas/photos/place-cambridge.jpg', period: 'Idade Moderna', fact: 'Ponto de estudo para Newton, cálculo, óptica, gravitação e filosofia natural.', why: 'Newton • cálculo • gravitação', links: ['Newton', 'Principia', 'Óptica'] },
  { id: 'paris', name: 'Paris', region: 'França', lat: 48.8566, lng: 2.3522, image: '/assets/atlas/paris.svg', period: 'Idade Moderna / Contemporânea', fact: 'Grande centro intelectual usado no Radar para conectar filosofia, matemática, literatura, ciência e arte.', why: 'Descartes • Pascal • literatura', links: ['Descartes', 'Pascal', 'Literatura'] },
  { id: 'rio', name: 'Rio de Janeiro', region: 'Brasil', lat: -22.9068, lng: -43.1729, image: '/assets/atlas/photos/place-rio.jpg', period: 'Contemporâneo', fact: 'Ponto nacional para relacionar ciência, cultura, literatura, patrimônio e contexto brasileiro.', why: 'Brasil • cultura • ciência', links: ['Brasil', 'Ciência', 'Literatura'] },
  { id: 'londres', name: 'Londres', region: 'Inglaterra', lat: 51.5074, lng: -0.1278, image: '/assets/atlas/londres.svg', period: 'Idade Moderna / Contemporânea', fact: 'Centro para conectar ciência, literatura, revolução industrial e redes intelectuais britânicas.', why: 'Ciência • literatura • indústria', links: ['Newton', 'Darwin', 'Literatura'] },
  { id: 'oxford', name: 'Oxford', region: 'Inglaterra', lat: 51.7520, lng: -1.2577, image: '/assets/atlas/oxford.svg', period: 'Idade Média / Moderna', fact: 'Centro universitário para estudar instituições de conhecimento e história intelectual europeia.', why: 'Universidade • filosofia • ciência', links: ['Filosofia', 'Ciência', 'Londres'] },
  { id: 'florenca', name: 'Florença', region: 'Itália', lat: 43.7696, lng: 11.2558, image: '/assets/atlas/florenca.svg', period: 'Renascimento', fact: 'Ponto para conectar arte, humanismo, matemática, engenharia e circulação de ideias no Renascimento.', why: 'Renascimento • arte • ciência', links: ['Galileu', 'Arte', 'Matemática'] },
  { id: 'viena', name: 'Viena', region: 'Áustria', lat: 48.2082, lng: 16.3738, image: '/assets/atlas/photos/place-viena.jpg', period: 'Contemporânea', fact: 'Centro intelectual usado para relações entre filosofia, ciência, música e história social.', why: 'Filosofia • ciência • cultura', links: ['Filosofia', 'Ciência', 'Cultura'] },
  { id: 'istanbul', name: 'Istambul', region: 'Turquia', lat: 41.0082, lng: 28.9784, image: '/assets/atlas/photos/place-istanbul.jpg', period: 'Antiguidade / Medieval', fact: 'Ponto de passagem entre Europa e Ásia para estudar impérios, religião, comércio e transmissão cultural.', why: 'Impérios • religião • rotas', links: ['Roma', 'Religião', 'História'] },
  { id: 'cairo', name: 'Cairo', region: 'Egito', lat: 30.0444, lng: 31.2357, image: '/assets/atlas/cairo.svg', period: 'Medieval / Contemporânea', fact: 'Ponto para conectar Egito, patrimônio, ciência, língua e circulação de manuscritos.', why: 'Egito • manuscritos • ciência', links: ['Alexandria', 'Bíblia', 'Ciência'] },
  { id: 'bethlehem', name: 'Belém', region: 'Palestina', lat: 31.7054, lng: 35.2024, image: '/assets/atlas/bethlehem.svg', period: 'Antiguidade', fact: 'Ponto de contexto bíblico para narrativas, geografia histórica e tradições cristãs.', why: 'Bíblia • geografia • tradição', links: ['Bíblia', 'Jerusalém', 'História'] },
  { id: 'antioquia', name: 'Antioquia', region: 'Síria histórica', lat: 36.2021, lng: 36.1606, image: '/assets/atlas/antioquia.svg', period: 'Antiguidade', fact: 'Cidade importante para estudar rotas mediterrâneas, comunidades cristãs antigas e trocas culturais.', why: 'Cristianismo antigo • rotas • cidades', links: ['Atos', 'Paulo', 'Roma'] },
  { id: 'tarsus', name: 'Tarso', region: 'Cilícia histórica', lat: 36.9165, lng: 34.8955, image: '/assets/atlas/tarsus.svg', period: 'Antiguidade', fact: 'Ponto associado ao contexto de Paulo e ao ambiente urbano do Mediterrâneo oriental.', why: 'Paulo • mundo romano • cidades', links: ['Paulo', 'Cartas', 'Roma'] },
  { id: 'brasilia', name: 'Brasília', region: 'Brasil', lat: -15.7939, lng: -47.8828, image: '/assets/atlas/photos/place-brasilia.jpg', period: 'Contemporânea', fact: 'Capital planejada para conectar arquitetura, urbanismo, história republicana e instituições brasileiras.', why: 'Brasil • urbanismo • instituições', links: ['Brasil', 'História', 'Ciência'] },
  { id: 'saopaulo', name: 'São Paulo', region: 'Brasil', lat: -23.5505, lng: -46.6333, image: '/assets/atlas/saopaulo.svg', period: 'Contemporânea', fact: 'Centro urbano para estudar indústria, migração, cultura, ciência, literatura e formação econômica brasileira.', why: 'Brasil • cultura • ciência', links: ['Literatura', 'Ciência', 'Brasil'] },
  { id: 'recife', name: 'Recife', region: 'Brasil', lat: -8.0476, lng: -34.877, image: '/assets/atlas/recife.svg', period: 'Contemporânea', fact: 'Ponto brasileiro para relacionar literatura, história atlântica, ciência e cultura nordestina.', why: 'Brasil • literatura • história', links: ['Brasil', 'Literatura', 'História'] },
  { id: 'coimbra', name: 'Coimbra', region: 'Portugal', lat: 40.2033, lng: -8.4103, image: '/assets/atlas/photos/place-coimbra.jpg', period: 'Idade Média / Moderna', fact: 'Centro universitário ligado à história intelectual portuguesa e à circulação do conhecimento.', why: 'Universidade • literatura • Portugal', links: ['Literatura', 'Portugal', 'Universidade'] },
  { id: 'lisboa', name: 'Lisboa', region: 'Portugal', lat: 38.7223, lng: -9.1393, image: '/assets/atlas/photos/place-lisboa.jpg', period: 'Idade Moderna / Contemporânea', fact: 'Ponto para estudar navegação, cartografia, literatura portuguesa e redes do Atlântico.', why: 'Cartografia • literatura • Portugal', links: ['Camões', 'Literatura', 'Portugal'] },
  { id: 'dublin', name: 'Dublin', region: 'Irlanda', lat: 53.3498, lng: -6.2603, image: '/assets/atlas/photos/place-dublin.jpg', period: 'Contemporânea', fact: 'Centro literário ligado a Joyce, língua inglesa e história cultural irlandesa.', why: 'Literatura • língua • cultura', links: ['Literatura', 'Inglês', 'Cultura'] },
  { id: 'berlim', name: 'Berlim', region: 'Alemanha', lat: 52.52, lng: 13.405, image: '/assets/atlas/photos/place-berlim.jpg', period: 'Contemporânea', fact: 'Ponto para filosofia, ciência, história social e transformações políticas europeias.', why: 'Filosofia • ciência • história', links: ['Filosofia', 'Ciência', 'História'] },
  { id: 'genebra', name: 'Genebra', region: 'Suíça', lat: 46.2044, lng: 6.1432, image: '/assets/atlas/photos/place-genebra.jpg', period: 'Contemporânea', fact: 'Centro associado à história intelectual europeia, ciência e instituições internacionais.', why: 'Ciência • pensamento • instituições', links: ['Ciência', 'Filosofia', 'Instituições'] },
  { id: 'praga', name: 'Praga', region: 'Tchéquia', lat: 50.0755, lng: 14.4378, image: '/assets/atlas/photos/place-praga.jpg', period: 'Idade Média / Moderna', fact: 'Ponto para astronomia, matemática, literatura e história centro-europeia.', why: 'Astronomia • matemática • literatura', links: ['Kepler', 'Astronomia', 'Matemática'] },
  { id: 'floripa', name: 'Florianópolis', region: 'Brasil', lat: -27.5949, lng: -48.5482, image: '/assets/atlas/floripa.svg', period: 'Contemporânea', fact: 'Ponto brasileiro para biodiversidade, ciência, tecnologia e paisagens costeiras.', why: 'Biodiversidade • ciência • tecnologia', links: ['Biologia', 'Ecologia', 'Tecnologia'] },
  { id: 'portoalegre', name: 'Porto Alegre', region: 'Brasil', lat: -30.0346, lng: -51.2177, image: '/assets/atlas/portoalegre.svg', period: 'Contemporânea', fact: 'Centro para cultura, literatura, universidade e história regional brasileira.', why: 'Cultura • literatura • universidade', links: ['Literatura', 'Brasil', 'Cultura'] },
  { id: 'tubingen', name: 'Tübingen', region: 'Alemanha', lat: 48.5216, lng: 9.0576, image: '/assets/atlas/tubingen.svg', period: 'Contemporânea', fact: 'Centro universitário para história da filosofia, teologia e pensamento moderno.', why: 'Filosofia • teologia • universidade', links: ['Teologia', 'Filosofia', 'Universidade'] },
];

export type BookSection = [string, string];

export const books = [
  { id: 'guerra-e-paz', title: 'Guerra e Paz', author: 'Liev Tolstói', year: 1869, cover: '/assets/library/guerra-e-paz.svg', theme: 'história • família • guerra • sociedade', source: 'https://openlibrary.org/isbn/0140444173', readingUrl: 'https://archive.org/search?query=title%3Awar%20and%20peace%20tolstoy', publicDomain: true, sections: [
    ['A obra', 'Um romance panorâmico que articula vida familiar, experiência da guerra, decisões individuais e transformações históricas.'],
    ['Contexto', 'A leitura guiada posiciona personagens e acontecimentos antes de pedir qualquer interpretação.'],
    ['Personagens e relações', 'Observe como família, amizade, status social e expectativas influenciam as escolhas.'],
    ['História em escala humana', 'Use cada acontecimento para comparar experiência individual e movimento histórico mais amplo.'],
    ['Pergunta-guia', 'Como a história coletiva aparece através de decisões, relações e acontecimentos vividos por indivíduos?'],
    ['Conexões', 'Relacione o romance a História, ética, liderança, guerra, sociedade e leitura de fontes.'],
  ] as BookSection[] },
  { id: 'crime-e-castigo', title: 'Crime e Castigo', author: 'Fiódor Dostoiévski', year: 1866, cover: '/assets/library/crime-e-castigo.svg', theme: 'culpa • moral • consciência • justiça', source: 'https://openlibrary.org/isbn/0140449132', readingUrl: 'https://archive.org/search?query=title%3Acrime%20and%20punishment%20dostoevsky', publicDomain: true, sections: [
    ['A obra', 'A narrativa acompanha Raskólnikov e transforma uma transgressão em investigação moral sobre culpa, racionalização, sofrimento e responsabilidade.'],
    ['Contexto', 'O Radar separa a situação social, os conflitos do protagonista e as perguntas filosóficas que surgem do enredo.'],
    ['Consciência e racionalização', 'Observe como uma teoria pode ser usada para justificar uma decisão antes de enfrentar suas consequências.'],
    ['Justiça e responsabilidade', 'Compare responsabilidade jurídica, moral e pessoal sem tratá-las como conceitos idênticos.'],
    ['Pergunta-guia', 'O que muda quando uma pessoa tenta transformar uma regra moral em argumento racional?'],
    ['Conexões', 'Relacione a leitura com ética, psicologia literária, sociedade urbana e filosofia moral.'],
  ] as BookSection[] },
  { id: 'orgulho-preconceito', title: 'Orgulho e Preconceito', author: 'Jane Austen', year: 1813, cover: '/assets/library/orgulho-preconceito.svg', theme: 'classe • casamento • reputação • julgamento', source: 'https://openlibrary.org/isbn/0141439513', readingUrl: 'https://archive.org/search?query=title%3Apride%20and%20prejudice%20austen', publicDomain: true, sections: [
    ['A obra', 'Uma narrativa social sobre classe, reputação, casamento, expectativas e julgamento.'],
    ['Contexto social', 'Observe como família, renda, convenções e reputação alteram o espaço de escolha de cada personagem.'],
    ['Percepção e erro', 'Acompanhe diferenças entre aquilo que alguém sabe, aquilo que imagina saber e aquilo que descobre depois.'],
    ['Linguagem e ironia', 'Preste atenção em como diálogo e ironia revelam tensões que não são ditas diretamente.'],
    ['Pergunta-guia', 'Como o contexto social altera a forma como um comportamento é interpretado?'],
    ['Conexões', 'Relacione o romance a história social, comunicação, ética e análise de personagens.'],
  ] as BookSection[] },
  { id: 'metamorfose', title: 'A Metamorfose', author: 'Franz Kafka', year: 1915, cover: '/assets/library/metamorfose.svg', theme: 'trabalho • família • identidade • alienação', source: 'https://openlibrary.org/isbn/0553213695', readingUrl: 'https://archive.org/search?query=title%3Athe%20metamorphosis%20kafka', publicDomain: true, sections: [
    ['A obra', 'Uma narrativa curta que permite estudar trabalho, pertencimento, utilidade e identidade através de uma situação radicalmente estranha.'],
    ['O espaço familiar', 'Observe como o ambiente doméstico muda quando a rotina e as funções esperadas deixam de funcionar.'],
    ['Trabalho e valor', 'Relacione a transformação do protagonista à ideia de utilidade e às expectativas de produtividade.'],
    ['Identidade', 'Pergunte o que permanece quando aparência, capacidade e papel social mudam.'],
    ['Pergunta-guia', 'O que define o valor de uma pessoa dentro de uma família ou organização?'],
    ['Conexões', 'Relacione a leitura com sociedade, trabalho, identidade, linguagem e filosofia da existência.'],
  ] as BookSection[] },
  { id: 'fausto', title: 'Fausto', author: 'Goethe', year: 1808, cover: '/assets/library/fausto.svg', theme: 'conhecimento • desejo • ciência • moral', source: 'https://openlibrary.org/isbn/0140449010', readingUrl: 'https://archive.org/search?query=title%3Afaust%20goethe', publicDomain: true, sections: [
    ['A obra', 'Conhecimento, ambição, desejo e limite humano aparecem como problemas que atravessam a leitura.'],
    ['Contexto intelectual', 'O Radar conecta o texto a discussões sobre conhecimento, ciência, religião, arte e modernidade.'],
    ['Desejo e limite', 'Observe a tensão entre querer saber mais e aceitar que nem todo limite é apenas técnico.'],
    ['Ação e consequência', 'Acompanhe como cada escolha reconfigura a trajetória do protagonista e dos outros personagens.'],
    ['Pergunta-guia', 'Que preço uma pessoa imagina estar disposta a pagar pelo conhecimento?'],
    ['Conexões', 'Relacione o texto a ética, história da ciência, literatura e filosofia.'],
  ] as BookSection[] },
  { id: 'dom-quixote', title: 'Dom Quixote', author: 'Miguel de Cervantes', year: 1605, cover: '/assets/library/dom-quixote.svg', theme: 'realidade • imaginação • narrativa • sociedade', source: 'https://openlibrary.org/isbn/0060934344', readingUrl: 'https://archive.org/search?query=title%3Adon%20quixote%20cervantes', publicDomain: true, sections: [
    ['A obra', 'Uma das grandes narrativas sobre a relação entre leitura, imaginação, realidade e sociedade.'],
    ['Contexto literário', 'Observe como o livro conversa com tradições anteriores enquanto também brinca com elas.'],
    ['Realidade e percepção', 'Acompanhe o contraste entre o que o protagonista percebe e o que os demais personagens reconhecem.'],
    ['Narrador e forma', 'Preste atenção em como a narrativa comenta a própria construção e transforma leitura em tema.'],
    ['Pergunta-guia', 'Quando uma narrativa molda a maneira como alguém enxerga o mundo?'],
    ['Conexões', 'Relacione a obra a literatura, retórica, cultura, história social e teoria da narrativa.'],
  ] as BookSection[] },
];

const contextEntries: Record<string, string> = {
  genesis: 'Narrativas de origens, criação, humanidade, patriarcas e promessas. O Radar organiza a leitura por narrativa, genealogia e temas teológicos.',
  exodus: 'Libertação do Egito, travessia, aliança e formação de uma comunidade. Observe a relação entre narrativa, lei e identidade coletiva.',
  leviticus: 'Leis, culto, pureza e santidade. A proposta de estudo diferencia categorias rituais de outras formas de organização social.',
  numbers: 'Caminhada pelo deserto, organização do povo e episódios de conflito e confiança. Use o contexto para acompanhar mudanças de liderança e território.',
  deuteronomy: 'Discursos e leis apresentados às portas da terra. Observe memória, aliança, responsabilidade e vida coletiva.',
  joshua: 'Entrada na terra e organização territorial. O Radar destaca narrativa, memória e formação de identidades locais.',
  judges: 'Ciclos de conflito, liderança e crise. A leitura permite observar repetição narrativa e escolhas coletivas.',
  ruth: 'Narrativa curta centrada em lealdade, família, trabalho e pertencimento. É útil para estudar vínculos sociais e genealogia.',
  '1-samuel': 'Transição entre diferentes formas de liderança. O estudo acompanha Samuel, Saul e Davi como personagens em mudança.',
  '2-samuel': 'Reinado de Davi, relações de poder e consequências pessoais e políticas das decisões do rei.',
  '1-kings': 'Reinos, templo, profetas e divisões políticas. A leitura conecta narrativa nacional e tradição profética.',
  '2-kings': 'Continuação das histórias dos reinos e processos que levam à queda de Samaria e Jerusalém.',
  '1-chronicles': 'Releitura de genealogias e da história de Davi com foco em culto, memória e organização comunitária.',
  '2-chronicles': 'História dos reis de Judá e do templo, enfatizando memória, culto e reformas.',
  ezra: 'Retorno, reconstrução e organização da comunidade em torno de Jerusalém e do templo.',
  nehemiah: 'Reconstrução das muralhas e reorganização social. Observe liderança, trabalho coletivo e identidade.',
  esther: 'Narrativa de corte sobre sobrevivência, identidade e decisão em contexto imperial.',
  job: 'Diálogo sobre sofrimento, justiça, limite humano e conhecimento. O estudo acompanha diferentes vozes antes de qualquer conclusão.',
  psalms: 'Coleção de poemas e orações com lamento, louvor, sabedoria e memória. Leia por gêneros e situações.',
  proverbs: 'Coleção de máximas de sabedoria sobre comportamento, linguagem, trabalho e relações.',
  ecclesiastes: 'Reflexões sobre tempo, trabalho, prazer, limite e sentido. O Radar trata o livro como voz sapiencial própria.',
  'song-of-solomon': 'Poesia de amor e desejo. A leitura observa imagens, diálogo, corpo e tradição interpretativa.',
  isaiah: 'Coleção profética ampla com crítica social, julgamento, esperança e restauração.',
  jeremiah: 'Profecia em contexto de crise política, queda de Jerusalém e debates sobre aliança e futuro.',
  lamentations: 'Poemas de lamento ligados à destruição de Jerusalém e à memória do desastre.',
  ezekiel: 'Visões, símbolos, crítica e esperança em contexto de exílio. Observe a linguagem imagética.',
  daniel: 'Narrativas de corte e visões apocalípticas. O contexto diferencia narrativa e literatura visionária.',
  hosea: 'Metáforas de casamento, lealdade e ruptura para discutir relações entre povo e Deus.',
  joel: 'Crise, chamado ao retorno e imagens de restauração. A leitura destaca linguagem profética.',
  amos: 'Crítica de injustiça, abuso e desigualdade. Observe a dimensão social da linguagem profética.',
  obadiah: 'Oráculo breve ligado a conflito entre comunidades e memória da violência.',
  jonah: 'Narrativa profética sobre missão, fuga, arrependimento e misericórdia.',
  micah: 'Crítica social, liderança e esperança. O estudo cruza justiça, culto e promessa.',
  nahum: 'Poesia profética sobre a queda de Nínive e a linguagem de julgamento.',
  habakkuk: 'Diálogo sobre violência, justiça e espera diante de uma crise política.',
  zephaniah: 'Anúncios de julgamento e esperança, com atenção ao papel social da cidade e da comunidade.',
  haggai: 'Chamados ligados à reconstrução do templo e à reorganização das prioridades da comunidade.',
  zechariah: 'Visões, símbolos e esperança de restauração em contexto pós-exílico.',
  malachi: 'Críticas a práticas religiosas e relações comunitárias, com foco em responsabilidade e fidelidade.',
  matthew: 'Evangelho com forte uso de tradições judaicas e discursos. O Radar separa narrativa, ensino e contexto.',
  mark: 'Narrativa compacta, dinâmica e centrada em ações e conflitos em torno de Jesus.',
  luke: 'Narrativa ampla, com atenção a viagem, personagens, encontros e temas sociais.',
  john: 'Evangelho marcado por sinais, discursos e uma linguagem teológica própria. O estudo observa símbolos e narrativa.',
  acts: 'Narrativa da expansão das comunidades cristãs e de suas viagens, conflitos e decisões.',
  romans: 'Carta paulina argumentativa sobre pecado, graça, fé e vida comunitária. Leia a sequência do argumento antes dos detalhes.',
  '1-corinthians': 'Carta sobre conflitos, práticas da comunidade, ética e vida coletiva.',
  '2-corinthians': 'Carta marcada por defesa do ministério, reconciliação e discussões sobre fraqueza e serviço.',
  galatians: 'Debate sobre identidade, liberdade e relação entre diferentes grupos dentro das primeiras comunidades cristãs.',
  ephesians: 'Texto sobre unidade, comunidade, identidade e vida prática em linguagem epistolar.',
  philippians: 'Carta marcada por encorajamento, cooperação e questões sobre vida comunitária.',
  colossians: 'Carta centrada na identidade de Cristo e nas implicações práticas para a comunidade.',
  '1-thessalonians': 'Carta pastoral sobre perseverança, comunidade e expectativa escatológica.',
  '2-thessalonians': 'Carta sobre perseverança, trabalho, comunidade e expectativas sobre o futuro.',
  '1-timothy': 'Orientações sobre liderança, ensino, comunidade e cuidado com práticas locais.',
  '2-timothy': 'Carta sobre continuidade do ensino, perseverança e transmissão de uma tradição.',
  titus: 'Orientações de organização comunitária, liderança e prática cotidiana.',
  philemon: 'Carta curta sobre relações, reconciliação e responsabilidade em uma situação concreta.',
  hebrews: 'Texto argumentativo que relaciona tradição sacerdotal, sacrifício, perseverança e identidade comunitária.',
  james: 'Ensinamentos práticos sobre fala, justiça, perseverança e coerência entre fé e prática.',
  '1-peter': 'Carta sobre perseverança, identidade e comportamento comunitário em contexto de pressão.',
  '2-peter': 'Texto de exortação sobre memória, ensinamento e expectativa do futuro.',
  '1-john': 'Texto sobre amor, verdade, comunidade e discernimento, com linguagem de contraste.',
  '2-john': 'Carta breve sobre verdade, amor e critérios para convivência e ensino.',
  '3-john': 'Carta breve sobre hospitalidade, liderança e conflitos internos.',
  jude: 'Carta breve de advertência e exortação sobre ensino e perseverança.',
  revelation: 'Literatura apocalíptica com visões, símbolos, conflito e esperança. O Radar separa linguagem simbólica de afirmações históricas.',
};

export const bibleContext = contextEntries;

export const bibleBooks = [
  ['Gênesis','genesis',50],['Êxodo','exodus',40],['Levítico','leviticus',27],['Números','numbers',36],['Deuteronômio','deuteronomy',34],
  ['Josué','joshua',24],['Juízes','judges',21],['Rute','ruth',4],['1 Samuel','1-samuel',31],['2 Samuel','2-samuel',24],
  ['1 Reis','1-kings',22],['2 Reis','2-kings',25],['1 Crônicas','1-chronicles',29],['2 Crônicas','2-chronicles',36],['Esdras','ezra',10],
  ['Neemias','nehemiah',13],['Ester','esther',10],['Jó','job',42],['Salmos','psalms',150],['Provérbios','proverbs',31],
  ['Eclesiastes','ecclesiastes',12],['Cântico dos Cânticos','song-of-solomon',8],['Isaías','isaiah',66],['Jeremias','jeremiah',52],['Lamentações','lamentations',5],
  ['Ezequiel','ezekiel',48],['Daniel','daniel',12],['Oseias','hosea',14],['Joel','joel',3],['Amós','amos',9],['Obadias','obadiah',1],['Jonas','jonah',4],['Miqueias','micah',7],['Naum','nahum',3],['Habacuque','habakkuk',3],['Sofonias','zephaniah',3],['Ageu','haggai',2],['Zacarias','zechariah',14],['Malaquias','malachi',4],
  ['Mateus','matthew',28],['Marcos','mark',16],['Lucas','luke',24],['João','john',21],['Atos','acts',28],['Romanos','romans',16],['1 Coríntios','1-corinthians',16],['2 Coríntios','2-corinthians',13],['Gálatas','galatians',6],['Efésios','ephesians',6],['Filipenses','philippians',4],['Colossenses','colossians',4],['1 Tessalonicenses','1-thessalonians',5],['2 Tessalonicenses','2-thessalonians',3],['1 Timóteo','1-timothy',6],['2 Timóteo','2-timothy',4],['Tito','titus',3],['Filemom','philemon',1],['Hebreus','hebrews',13],['Tiago','james',5],['1 Pedro','1-peter',5],['2 Pedro','2-peter',3],['1 João','1-john',5],['2 João','2-john',1],['3 João','3-john',1],['Judas','jude',1],['Apocalipse','revelation',22],
] as const;

export const thinkers = [
  { id:'newton', name:'Isaac Newton', field:'Matemática • Física • Filosofia natural', image:'/assets/thinkers/newton.svg', blurb:'Cálculo, leis do movimento, gravitação e óptica; o perfil também abre conexões com história, livros e lugares.' },
  { id:'plato', name:'Platão', field:'Filosofia', image:'/assets/editorial/13_platao.png', blurb:'Diálogos sobre conhecimento, ética, política, alma e realidade.' },
  { id:'socrates', name:'Sócrates', field:'Filosofia', image:'/assets/editorial/13_socrates.png', blurb:'Questionamento, diálogo e exame da vida como método filosófico.' },
  { id:'aristotle', name:'Aristóteles', field:'Filosofia • Ciência antiga', image:'/assets/thinkers/aristotle.svg', blurb:'Lógica, ética, política e investigação da natureza em um dos sistemas intelectuais mais influentes da Antiguidade.' },
  { id:'augustine', name:'Santo Agostinho', field:'Teologia • Filosofia', image:'/assets/editorial/13_santo_agostinho.png', blurb:'Reflexões sobre graça, tempo, memória, conhecimento e vida cristã.' },
  { id:'aquinas', name:'Tomás de Aquino', field:'Teologia • Filosofia', image:'/assets/editorial/13_tomas_de_aquino.png', blurb:'Integração entre filosofia aristotélica, metafísica, ética e teologia cristã.' },
  { id:'descartes', name:'René Descartes', field:'Filosofia • Matemática', image:'/assets/thinkers/descartes.svg', blurb:'Método, dúvida, geometria analítica e a investigação das bases do conhecimento.' },
  { id:'pascal', name:'Blaise Pascal', field:'Matemática • Filosofia', image:'/assets/thinkers/pascal.svg', blurb:'Probabilidade, geometria, pressão e reflexão filosófica sobre conhecimento e condição humana.' },
  { id:'galileo', name:'Galileu Galilei', field:'Física • Astronomia', image:'/assets/thinkers/galileo.svg', blurb:'Movimento, observação telescópica e mudanças metodológicas na ciência moderna.' },
  { id:'kepler', name:'Johannes Kepler', field:'Astronomia • Matemática', image:'/assets/thinkers/kepler.svg', blurb:'Leis do movimento planetário e matemática aplicada à astronomia observacional.' },
  { id:'faraday', name:'Michael Faraday', field:'Física • Eletromagnetismo', image:'/assets/thinkers/faraday.svg', blurb:'Indução eletromagnética, campos e experimentação em eletricidade e magnetismo.' },
  { id:'maxwell', name:'James Clerk Maxwell', field:'Física • Matemática', image:'/assets/thinkers/maxwell.svg', blurb:'Equações do eletromagnetismo e a unificação de fenômenos elétricos, magnéticos e ópticos.' },
  { id:'mendel', name:'Gregor Mendel', field:'Biologia • Genética', image:'/assets/thinkers/mendel.svg', blurb:'Experimentos com ervilhas e padrões de hereditariedade que se tornaram centrais à genética.' },
  { id:'godel', name:'Kurt Gödel', field:'Lógica • Matemática', image:'/assets/thinkers/godel.svg', blurb:'Teoremas da incompletude e problemas fundamentais sobre formalização e consistência.' },
  { id:'marx', name:'Karl Marx', field:'Sociologia • Economia', image:'/assets/thinkers/marx.svg', blurb:'Crítica da economia política, trabalho, classes e transformação social.' },
  { id:'weber', name:'Max Weber', field:'Sociologia', image:'/assets/thinkers/weber.svg', blurb:'Ação social, dominação, burocracia e relações entre religião e economia.' },
  { id:'durkheim', name:'Émile Durkheim', field:'Sociologia', image:'/assets/thinkers/durkheim.svg', blurb:'Fatos sociais, coesão, solidariedade e análise sistemática da sociedade.' },
  { id:'tocqueville', name:'Alexis de Tocqueville', field:'Política • Sociologia', image:'/assets/thinkers/tocqueville.svg', blurb:'Democracia, igualdade, instituições e observação comparada de sociedades.' },
  { id:'bourdieu', name:'Pierre Bourdieu', field:'Sociologia', image:'/assets/thinkers/bourdieu.svg', blurb:'Campo, habitus, capital cultural e mecanismos de reprodução social.' },
  { id:'goffman', name:'Erving Goffman', field:'Sociologia', image:'/assets/thinkers/goffman.svg', blurb:'Interação cotidiana, apresentação do eu, estigma e instituições.' },
  { id:'dubois', name:'W. E. B. Du Bois', field:'Sociologia • História', image:'/assets/thinkers/dubois.svg', blurb:'Dupla consciência, pesquisa social e análise histórica das relações raciais nos Estados Unidos.' },
  { id:'merton', name:'Robert K. Merton', field:'Sociologia • Ciência', image:'/assets/thinkers/merton.svg', blurb:'Funções manifestas e latentes, anomia e sociologia da ciência.' },
  { id:'mannheim', name:'Karl Mannheim', field:'Sociologia do conhecimento', image:'/assets/thinkers/mannheim.svg', blurb:'Relações entre conhecimento, posição social, ideologia e geração.' },
  { id:'lemaitre', name:'Georges Lemaître', field:'Física • Cosmologia', image:'/assets/thinkers/lemaitre.svg', blurb:'Cosmologia relativística e a hipótese do átomo primordial na história da expansão do universo.' },
];

export const questions = [
  { id:'q1', subject:'Matemática' as Subject, topic:'PA', prompt:'Em uma PA de razão 4, o quinto termo é 23. Qual é o primeiro?', options:['3','5','7','9'], answer:2, explanation:'a₅ = a₁ + 4r. Logo, 23 = a₁ + 16 e a₁ = 7.' },
  { id:'q2', subject:'Física' as Subject, topic:'Cinemática', prompt:'Um móvel parte do repouso e chega a 20 m/s em 5 s. Qual é a aceleração constante?', options:['2 m/s²','4 m/s²','5 m/s²','10 m/s²'], answer:1, explanation:'a = Δv/Δt = 20/5 = 4 m/s².' },
  { id:'q3', subject:'Português' as Subject, topic:'Concessão', prompt:'“Embora estivesse cansado, manteve o foco.” A oração iniciada por “embora” expressa:', options:['causa','concessão','condição','finalidade'], answer:1, explanation:'“Embora” introduz uma oração subordinada adverbial concessiva.' },
  { id:'q4', subject:'Inglês' as Subject, topic:'Simple past', prompt:'Choose the correct alternative: “The controller ____ the aircraft to descend.”', options:['instructed','instruct','instructing','was instruct'], answer:0, explanation:'No passado simples, a forma correta é “instructed”.' },
  { id:'q5', subject:'Matemática' as Subject, topic:'Equações', prompt:'Se 2x + 6 = 18, qual é x?', options:['4','5','6','7'], answer:2, explanation:'2x = 12, então x = 6.' },
  { id:'q6', subject:'Física' as Subject, topic:'Energia', prompt:'A energia cinética de um corpo depende da massa e do:', options:['tempo','quadrado da velocidade','volume','peso'], answer:1, explanation:'Ec = mv²/2.' },
  { id:'q7', subject:'Português' as Subject, topic:'Regência', prompt:'Em “assistir ao filme”, a preposição “a” é exigida pelo verbo no sentido de:', options:['morar','ver','obedecer','chegar'], answer:1, explanation:'No sentido de ver/presenciar, assistir é transitivo indireto e rege “a”.' },
  { id:'q8', subject:'Inglês' as Subject, topic:'Reading', prompt:'“The crew had already landed when the storm began.” The landing happened:', options:['after the storm','before the storm','during the storm','never'], answer:1, explanation:'“had landed” indicates an earlier past action.' },
];

export const games = [
  { id:'calc', title:'Radar Mental', subject:'Matemática', description:'Rodadas rápidas de cálculo mental com combo, pontuação e feedback imediato.', kind:'math' as const, image:'/assets/games/math.svg' },
  { id:'motion', title:'Controle de Velocidade', subject:'Física', description:'Escolha a resposta correta antes do marcador de reação fechar.', kind:'physics' as const, image:'/assets/games/physics.svg' },
  { id:'comma', title:'Caça à Vírgula', subject:'Português', description:'Escolha a construção correta e aumente seu combo de precisão.', kind:'portuguese' as const, image:'/assets/games/portuguese.svg' },
  { id:'bible', title:'Mapa Bíblico', subject:'Bíblia', description:'Associe livro, gênero e contexto em uma sequência de rodadas.', kind:'bible' as const, image:'/assets/games/bible.svg' },
];
