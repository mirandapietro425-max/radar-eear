export type Subject = 'Matemática' | 'Física' | 'Língua Portuguesa' | 'Língua Inglesa';
export type Difficulty = 'Básica' | 'Intermediária' | 'Avançada' | 'Desafio EEAR';

export type Question = {
  id: string; subject: Subject; topic: string; difficulty: Difficulty;
  prompt: string; options: string[]; answer: number; explanation: string;
  sourceType: 'authorial'; sourceLabel: 'QUESTÃO AUTORAL RADAR';
};

export type DailyEditorial = {
  kind: 'math-history' | 'physics-history' | 'language' | 'thinker' | 'curiosity' | 'study-tip';
  title: string; subtitle: string; text: string; sourceIds: string[]; asset?: string;
};

export const sourceRegistry = {
  eear2027: { id: 'eear-2027', title: 'IE EA CFS 2/2027', url: 'https://ingresso.eear.fab.mil.br/SOO/editais/CFS%202%202027/ie.pdf', type: 'official' },
  eearArchive: { id: 'eear-archive', title: 'Provas anteriores EEAR', url: 'https://ingresso.eear.fab.mil.br/SOO/home/provas_anteriores.php?sigla_conc=%25', type: 'official' },
  augustine: { id: 'gutenberg-augustine', title: 'Confessions of St. Augustine', url: 'https://www.gutenberg.org/ebooks/3296', type: 'public-domain-us' },
  epictetus: { id: 'gutenberg-epictetus', title: 'A Selection from the Discourses of Epictetus with the Encheiridion', url: 'https://www.gutenberg.org/ebooks/10661', type: 'public-domain-us' },
  aquinas: { id: 'gutenberg-aquinas', title: 'Summa Theologica, Part I', url: 'https://www.gutenberg.org/ebooks/17611', type: 'public-domain-us' },
  newton: { id: 'gutenberg-newton', title: "Newton's Principia", url: 'https://www.gutenberg.org/ebooks/76404', type: 'public-domain-us' },
  commonsBabylon: { id: 'commons-babylon', title: 'Babylonian tablet — Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Babylonian_tablet_(time_of_Hammurabi,_circa_1800_BCE).jpg', type: 'wikimedia' },
  commonsRhind: { id: 'commons-rhind', title: 'Rhind Papyrus — Wikimedia Commons', url: "https://commons.wikimedia.org/wiki/File:Egyptian_A%27h-mos%C3%A8_or_Rhind_Papyrus_(1065x1330).png", type: 'wikimedia' },
  commonsNewton: { id: 'commons-newton', title: 'Portrait of Isaac Newton, 1689 — Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Sir_Isaac_Newton,_1689.jpg', type: 'wikimedia' },
  commonsEuclid: { id: 'commons-euclid', title: "Euclid's Elements Book I — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Euclid%27s_Elements_Book_I,_Proposition_I.svg", type: 'wikimedia' },
  commonsGalileo: { id: 'commons-galileo', title: 'Portrait of Galileo Galilei — Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Galileo_Galilei.jpg', type: 'wikimedia' },
  commonsAquinas: { id: 'commons-aquinas', title: 'Thomas Aquinas portrait — Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:St-thomas-aquinas.jpg', type: 'wikimedia' },
} as const;

const q = (id: string, subject: Subject, topic: string, difficulty: Difficulty, prompt: string, options: string[], answer: number, explanation: string): Question => ({ id, subject, topic, difficulty, prompt, options, answer, explanation, sourceType: 'authorial', sourceLabel: 'QUESTÃO AUTORAL RADAR' });

const mathQuestions: Question[] = [
  q('mat-pa-001','Matemática','Progressões aritméticas','Básica','Em uma PA de primeiro termo 7 e razão 4, qual é o quinto termo?',['19','21','23','25'],2,'a₅ = 7 + (5 − 1)·4 = 23.'),
  q('mat-func-001','Matemática','Função quadrática','Intermediária','Qual é o valor de f(2) para f(x) = x² − 3x + 4?',['2','4','6','8'],0,'f(2) = 4 − 6 + 4 = 2.'),
  q('mat-eq-001','Matemática','Equações','Básica','Resolva 3x + 7 = 22.',['3','5','7','9'],1,'3x = 15, então x = 5.'),
  q('mat-area-001','Matemática','Geometria plana','Básica','Um triângulo tem base 12 cm e altura 5 cm. Qual é sua área?',['17 cm²','25 cm²','30 cm²','60 cm²'],2,'A = (b·h)/2 = 12·5/2 = 30 cm².'),
  q('mat-pct-001','Matemática','Porcentagem','Básica','Quanto corresponde a 15% de 240?',['24','30','36','40'],2,'0,15·240 = 36.'),
  q('mat-prob-001','Matemática','Probabilidade','Intermediária','Uma caixa tem 3 bolas vermelhas e 2 azuis. Retira-se uma bola ao acaso. Qual a probabilidade de ser azul?',['1/5','2/5','1/2','3/5'],1,'Há 2 resultados favoráveis em 5 possíveis: 2/5.'),
  q('mat-trig-001','Matemática','Trigonometria','Básica','Em um triângulo retângulo, se o cateto oposto mede 3 e a hipotenusa 5, qual é o seno do ângulo correspondente?',['3/5','4/5','5/3','2/5'],0,'sen(θ) = cateto oposto/hipotenusa = 3/5.'),
  q('mat-analitica-001','Matemática','Geometria analítica','Intermediária','Qual é a distância entre os pontos (0,0) e (3,4)?',['4','5','6','7'],1,'d = √((3−0)² + (4−0)²) = 5.'),
  q('mat-stat-001','Matemática','Estatística','Básica','Qual é a média aritmética de 4, 6, 8 e 10?',['6','7','8','9'],1,'(4 + 6 + 8 + 10)/4 = 7.'),
  q('mat-system-001','Matemática','Sistemas lineares','Intermediária','Se x + y = 10 e x − y = 2, qual é x?',['4','5','6','8'],2,'Somando as equações: 2x = 12, portanto x = 6.'),
];

const physicsQuestions: Question[] = [
  q('fis-mru-001','Física','Cinemática','Básica','Um móvel percorre movimento uniforme a 4 m/s durante 6 s. Qual a distância percorrida?',['10 m','20 m','24 m','30 m'],2,'Δs = vt = 4·6 = 24 m.'),
  q('fis-mruv-001','Física','MRUV','Intermediária','Um móvel parte do repouso com aceleração 3 m/s² durante 4 s. Qual a velocidade final?',['7 m/s','10 m/s','12 m/s','15 m/s'],2,'v = v₀ + at = 0 + 3·4 = 12 m/s.'),
  q('fis-newton-001','Física','Leis de Newton','Básica','Qual é a força resultante em um corpo de 5 kg que acelera a 2 m/s²?',['2 N','5 N','10 N','20 N'],2,'F = ma = 5·2 = 10 N.'),
  q('fis-energy-001','Física','Energia','Intermediária','Considerando g = 10 m/s², qual é a energia potencial de um corpo de 2 kg a 5 m de altura?',['10 J','50 J','100 J','200 J'],2,'Eₚ = mgh = 2·10·5 = 100 J.'),
  q('fis-pressure-001','Física','Hidrostática','Intermediária','Em água, ρ = 1000 kg/m³ e g = 10 m/s². Qual a pressão hidrostática a 3 m de profundidade?',['3 000 Pa','10 000 Pa','30 000 Pa','300 000 Pa'],2,'p = ρgh = 1000·10·3 = 30 000 Pa.'),
  q('fis-momentum-001','Física','Quantidade de movimento','Intermediária','Um corpo de 4 kg move-se a 3 m/s. Qual é sua quantidade de movimento?',['7 kg·m/s','12 kg·m/s','16 kg·m/s','24 kg·m/s'],1,'p = mv = 4·3 = 12 kg·m/s.'),
  q('fis-ohm-001','Física','Eletricidade','Básica','Um resistor de 6 Ω é ligado a uma tensão de 12 V. Qual é a corrente?',['0,5 A','2 A','6 A','72 A'],1,'Pela lei de Ohm, I = V/R = 12/6 = 2 A.'),
  q('fis-power-001','Física','Potência','Básica','Uma máquina realiza 600 J de trabalho em 30 s. Qual é sua potência média?',['10 W','20 W','30 W','60 W'],1,'P = W/t = 600/30 = 20 W.'),
  q('fis-wave-001','Física','Ondas','Intermediária','Uma onda tem frequência 5 Hz e comprimento de onda 2 m. Qual é sua velocidade?',['2,5 m/s','7 m/s','10 m/s','15 m/s'],2,'v = λf = 2·5 = 10 m/s.'),
  q('fis-heat-001','Física','Calor','Intermediária','Para aquecer 2 kg de água em 5 °C, considerando c = 4 200 J/(kg·°C), qual é o calor necessário?',['4 200 J','8 400 J','21 000 J','42 000 J'],3,'Q = mcΔT = 2·4200·5 = 42 000 J.'),
];

const portugueseQuestions: Question[] = [
  q('pt-crase-001','Língua Portuguesa','Crase','Intermediária','Assinale a alternativa em que a crase está corretamente empregada.',['Começou à estudar cedo.','Referiu-se à candidata.','Chegou à pé.','Voltou à revisar o tema.'],1,'“Referir-se a” + “a candidata” forma “à candidata”.'),
  q('pt-sint-001','Língua Portuguesa','Sintaxe','Básica','Em “Embora estivesse cansado, manteve o foco”, a oração iniciada por “Embora” expressa ideia de:',['causa','concessão','condição','finalidade'],1,'“Embora” introduz oração subordinada adverbial concessiva.'),
  q('pt-conc-001','Língua Portuguesa','Concordância','Intermediária','Assinale a alternativa de acordo com a norma-padrão.',['Houveram dúvidas na revisão.','Fazem dois meses que estudo.','Devem existir bons motivos para revisar.','Existe muitas estratégias de estudo.'],2,'“Existir” concorda com o sujeito plural: “Devem existir bons motivos”.'),
  q('pt-pont-001','Língua Portuguesa','Pontuação','Básica','Assinale a frase corretamente pontuada.',['Depois da revisão, o candidato resolveu cinco questões.','O candidato, resolveu cinco questões.','O candidato resolveu, cinco questões.','O candidato estudou, matemática todos os dias.'],0,'A vírgula separa adequadamente o termo deslocado “Depois da revisão”.'),
  q('pt-acent-001','Língua Portuguesa','Acentuação','Básica','Qual palavra é proparoxítona?',['cafe','lâmpada','estudar','papel'],1,'“Lâmpada” é proparoxítona.'),
  q('pt-classe-001','Língua Portuguesa','Classes de palavras','Básica','Em “estudo disciplinado”, “disciplinado” é:',['substantivo','verbo','adjetivo','advérbio'],2,'A palavra caracteriza o substantivo “estudo”, funcionando como adjetivo.'),
  q('pt-reg-001','Língua Portuguesa','Regência','Avançada','Assinale a alternativa de acordo com a regência padrão.',['O aluno assistiu o vídeo.','O aluno assistiu ao vídeo.','O aluno preferiu mais Física do que Matemática.','O aluno obedeceu o professor.'],1,'No sentido de ver, “assistir” rege a preposição a: assistir ao vídeo.'),
  q('pt-figura-001','Língua Portuguesa','Figuras de linguagem','Intermediária','Em “O tempo voa”, ocorre principalmente:',['metáfora','eufemismo','onomatopeia','pleonasmo'],0,'O verbo “voar” é usado em sentido figurado para representar a passagem rápida do tempo.'),
  q('pt-texto-001','Língua Portuguesa','Interpretação','Intermediária','Se um texto afirma que “o erro bem analisado se transforma em dado de aprendizagem”, a ideia central é que:',['erros devem ser ignorados','erros podem diagnosticar falhas','acertar rápido é sempre mais importante','revisar é inútil'],1,'O erro é apresentado como informação para diagnosticar o que precisa ser corrigido.'),
  q('pt-formacao-001','Língua Portuguesa','Formação de palavras','Intermediária','A palavra “infelizmente” apresenta principalmente o processo de:',['derivação prefixal e sufixal','composição por justaposição','abreviação','hibridismo'],0,'“Infelizmente” resulta de base + prefixo in- + sufixo -mente.'),
];

const englishQuestions: Question[] = [
  q('en-past-001','Língua Inglesa','Simple past','Básica','Choose the correct option: “Yesterday, the candidate ____ ten questions.”',['solve','solved','solving','has solve'],1,'“Yesterday” calls for the simple past: solved.'),
  q('en-modal-001','Língua Inglesa','Modal verbs','Intermediária','Choose the best option: “You ____ review your mistakes before the next study block.”',['should','was','has','did'],0,'“Should” expresses recommendation.'),
  q('en-prep-001','Língua Inglesa','Prepositions','Básica','Choose the correct preposition: “The exam begins ____ 13:00.”',['in','on','at','to'],2,'Use “at” with a specific clock time.'),
  q('en-reading-001','Língua Inglesa','Reading comprehension','Intermediária','Read: “The student reviewed the formula before answering the question.” Why did the student review the formula?',['To leave the test.','To answer the question.','To change subjects.','To start the timer.'],1,'The sentence says the formula was reviewed before answering the question.'),
  q('en-pronoun-001','Língua Inglesa','Pronouns','Básica','Choose the correct pronoun: “Marina studied the topic and then reviewed ____.”',['it','they','we','them'],0,'“Topic” is singular, so the object pronoun is “it”.'),
  q('en-connector-001','Língua Inglesa','Discourse markers','Intermediária','Choose the connector: “He was tired; ____, he completed the mission.”',['however','because','unless','so that'],0,'“However” expresses contrast.'),
  q('en-passive-001','Língua Inglesa','Passive voice','Avançada','Choose the passive form: “The teacher explained the question.”',['The question was explained by the teacher.','The question is explain by the teacher.','The teacher was explained the question.','The question explained the teacher.'],0,'The object becomes the subject in the passive construction.'),
  q('en-vocab-001','Língua Inglesa','Vocabulary in context','Intermediária','In “The candidate improved her performance”, “improved” is closest to:',['worsened','enhanced','forgot','stopped'],1,'“Enhanced” means made better.'),
  q('en-present-001','Língua Inglesa','Verb tenses','Intermediária','Choose the correct form: “She ____ studying every morning.”',['is','are','am','be'],0,'With “she”, present progressive uses “is” + -ing.'),
  q('en-conditional-001','Língua Inglesa','Conditionals','Avançada','Choose the correct option: “If you study, you ____ more confident.”',['will feel','felt','would felt','feel yesterday'],0,'A first conditional commonly uses if + present and will + base verb.'),
];

export const questionBank: Question[] = [...mathQuestions, ...physicsQuestions, ...portugueseQuestions, ...englishQuestions];

export const mathHistory: DailyEditorial[] = [
  { kind:'math-history', title:'Os babilônios e a base 60', subtitle:'Mesopotâmia · matemática antiga', text:'Tabletas matemáticas babilônicas registram cálculos e problemas práticos em uma tradição de base 60. É uma boa porta de entrada para perceber que sistemas numéricos nasceram de necessidades concretas de medir, repartir e calcular.', sourceIds:['commonsBabylon'] },
  { kind:'math-history', title:'O Papiro de Rhind', subtitle:'Egito Antigo · aritmética e geometria', text:'O Papiro de Rhind preserva problemas de frações, áreas e outras operações. A matemática aparece aqui como tecnologia de administração, medida e resolução de problemas.', sourceIds:['commonsRhind'] },
  { kind:'math-history', title:'Euclides e a demonstração', subtitle:'Grécia · geometria', text:'Os Elementos organizaram definições, postulados e proposições em uma estrutura dedutiva. A ideia central para o estudante é simples: antes de calcular, descubra quais relações precisam necessariamente ser verdadeiras.', sourceIds:['commonsEuclid'] },
  { kind:'math-history', title:'Arquimedes e a ponte para a Física', subtitle:'Grécia · geometria e equilíbrio', text:'Arquimedes investigou equilíbrio, áreas, volumes e hidrostática. É uma ótima ponte entre Matemática e Física: uma representação geométrica pode virar um modelo para um fenômeno físico.', sourceIds:[] },
  { kind:'math-history', title:'O zero e a tradição matemática indiana', subtitle:'Índia · representação numérica', text:'A tradição matemática indiana foi decisiva para a consolidação do sistema decimal e para o tratamento do zero como elemento matemático. Uma mudança de representação pode transformar a escala do que é possível calcular.', sourceIds:[] },
  { kind:'math-history', title:'Al-Khwarizmi e a álgebra', subtitle:'Mundo islâmico medieval · equações', text:'Al-Khwarizmi sistematizou métodos para resolver problemas algébricos. A ideia de transformar uma situação verbal em operações e relações simbólicas é uma das pontes mais úteis para a Matemática de prova.', sourceIds:[] },
  { kind:'math-history', title:'Fibonacci e o cálculo comercial', subtitle:'Europa medieval · sequências', text:'Leonardo de Pisa ajudou a difundir métodos de cálculo indo-arábicos na Europa por meio do Liber Abaci. Problemas de comércio e sequências mostram como a matemática acompanha necessidades reais.', sourceIds:[] },
  { kind:'math-history', title:'Descartes e o plano cartesiano', subtitle:'Século XVII · álgebra + geometria', text:'A geometria analítica permitiu representar relações geométricas por coordenadas e equações. É exatamente a lógica do laboratório cartesiano do Radar: mover pontos e observar como a equação muda a figura.', sourceIds:[] },
  { kind:'math-history', title:'Newton e a matemática do movimento', subtitle:'Revolução científica · cálculo', text:'Newton desenvolveu uma matemática para descrever movimento e gravitação. O estudante pode enxergar a Física como linguagem quantitativa: uma grandeza muda, a relação matemática registra essa mudança.', sourceIds:['commonsNewton','newton'] },
  { kind:'math-history', title:'Emmy Noether e estruturas', subtitle:'Século XX · padrões e simetria', text:'Noether transformou a forma como a matemática moderna pensa estruturas algébricas e simetrias. É uma lembrança de que reconhecer um padrão pode ser tão importante quanto fazer contas.', sourceIds:[] },
];

export const physicsHistory: DailyEditorial[] = [
  { kind:'physics-history', title:'Arquimedes e o empuxo', subtitle:'Antiguidade · hidrostática', text:'Arquimedes é associado a resultados fundamentais sobre equilíbrio e fluidos. A experiência histórica ajuda a lembrar que pressão e empuxo são conceitos físicos construídos para explicar observações concretas.', sourceIds:[] },
  { kind:'physics-history', title:'Galileu e o movimento', subtitle:'Revolução científica · cinemática', text:'Galileu ajudou a consolidar uma investigação quantitativa do movimento baseada em observação e experimentação. Isso prepara a ideia de descrever movimento por grandezas como posição, velocidade e aceleração.', sourceIds:['commonsGalileo'] },
  { kind:'physics-history', title:'Newton e as leis do movimento', subtitle:'Século XVII · mecânica', text:'Newton unificou força e movimento em leis matemáticas que se tornaram centrais para a mecânica clássica. O formalismo transforma uma situação física em relações calculáveis.', sourceIds:['commonsNewton','newton'] },
  { kind:'physics-history', title:'Carnot, Joule, Clausius e a termodinâmica', subtitle:'Século XIX · calor e trabalho', text:'A termodinâmica se desenvolveu por meio de problemas sobre máquinas térmicas, calor e trabalho. História e cálculo se encontram no conceito de rendimento e conservação de energia.', sourceIds:[] },
  { kind:'physics-history', title:'Faraday e o campo magnético', subtitle:'Século XIX · eletromagnetismo', text:'Experimentos de Faraday foram decisivos para a compreensão da indução eletromagnética. A representação por linhas de campo virou uma ferramenta visual poderosa.', sourceIds:[] },
  { kind:'physics-history', title:'Maxwell e a síntese do eletromagnetismo', subtitle:'Século XIX · campos e ondas', text:'Maxwell reuniu fenômenos elétricos e magnéticos em uma teoria matemática unificada. Um bom exemplo de como diferentes observações podem compartilhar uma mesma estrutura.', sourceIds:[] },
  { kind:'physics-history', title:'Einstein e os limites dos modelos clássicos', subtitle:'Século XX · relatividade', text:'A relatividade mudou a descrição de espaço, tempo e gravitação. Para o estudante, a lição metodológica é valiosa: modelos funcionam dentro de domínios de validade e podem ser ampliados.', sourceIds:[] },
];

export const languageEditorial: DailyEditorial[] = [
  { kind:'language', title:'Do latim ao português', subtitle:'História da língua portuguesa', text:'O português pertence às línguas românicas e sua história passou pelo latim vulgar, pelo galego-português e por transformações posteriores. A língua muda porque seus falantes, lugares e usos também mudam.', sourceIds:[] },
  { kind:'language', title:'Uma palavra pode carregar séculos', subtitle:'Etimologia', text:'Ao estudar a origem de uma palavra, você ganha uma segunda pista para o significado: além do uso atual, existe uma história de sons, empréstimos e mudanças de sentido.', sourceIds:[] },
  { kind:'language', title:'Old English → Modern English', subtitle:'História da língua inglesa', text:'O inglês se formou por camadas, com forte base germânica e influências nórdicas, francesas e latinas. Esse passado ajuda a explicar por que tantas palavras e construções atuais parecem ter famílias diferentes.', sourceIds:[] },
  { kind:'language', title:'Reading pelo contexto', subtitle:'Língua Inglesa · estratégia', text:'Quando uma palavra é desconhecida, procure sua função na frase, conectores e pistas de sentido antes de consultar o dicionário. Isso transforma leitura em inferência.', sourceIds:[] },
];

export const thinkers: DailyEditorial[] = [
  { kind:'thinker', title:'Agostinho de Hipona — memória e verdade', subtitle:'354–430 · teologia cristã latina', text:'Agostinho refletiu sobre memória, vontade, tempo e verdade em obras como as Confissões. A proposta do Radar é apresentar o contexto primeiro e deixar a reflexão nascer depois, sem reduzir um autor a frases soltas.', sourceIds:['augustine'] },
  { kind:'thinker', title:'Sócrates — perguntar antes de concluir', subtitle:'séc. V a.C. · filosofia grega', text:'O método socrático ficou associado ao diálogo e ao exame crítico das próprias crenças. Para o estudo, a pergunta útil é: “como eu sei que entendi de verdade?”', sourceIds:[] },
  { kind:'thinker', title:'Tomás de Aquino — estruturar argumentos', subtitle:'séc. XIII · escolástica', text:'Na tradição escolástica, Aquino organiza questões distinguindo objeções, resposta e consequências. A estrutura é uma ótima metáfora para resolver um problema difícil em etapas.', sourceIds:['aquinas','commonsAquinas'] },
  { kind:'thinker', title:'Epicteto — separar o que está sob seu controle', subtitle:'séc. I–II · estoicismo', text:'Epicteto desenvolveu uma ética centrada no discernimento entre aquilo que depende de nós e aquilo que não depende. No estudo, isso ajuda a voltar a atenção para a ação concreta de hoje.', sourceIds:['epictetus'] },
  { kind:'thinker', title:'C. S. Lewis — tornar ideias legíveis', subtitle:'séc. XX · literatura cristã', text:'Lewis combinou literatura, filosofia e apologética para comunicar ideias a leitores amplos. Uma boa lição de estudo: quando a explicação ficou complicada demais, tente reconstruí-la com uma imagem simples.', sourceIds:[] },
];

export const curiosities: DailyEditorial[] = [
  { kind:'curiosity', title:'Base 60 está escondida no cotidiano', subtitle:'Matemática + história', text:'A tradição sexagesimal mesopotâmica deixou uma herança visível em divisões tradicionais de tempo e ângulos.', sourceIds:['commonsBabylon'] },
  { kind:'curiosity', title:'A mesma ideia pode mudar de representação', subtitle:'Álgebra + geometria', text:'Uma relação pode aparecer como expressão algébrica, tabela ou gráfico. O aluno que troca de representação ganha mais maneiras de verificar uma solução.', sourceIds:['commonsEuclid'] },
  { kind:'curiosity', title:'Física vira modelo quando medimos', subtitle:'Física', text:'A passagem de uma observação para uma grandeza mensurável é uma das marcas da Física moderna — e está no próprio conteúdo programático da EEAR.', sourceIds:[] },
  { kind:'curiosity', title:'Uma palavra é também uma história', subtitle:'Linguagem', text:'Mudanças de significado, empréstimos e transformações fonéticas fazem com que o vocabulário atual seja uma espécie de arquivo histórico vivo.', sourceIds:[] },
];

export const studyTips: DailyEditorial[] = [
  { kind:'study-tip', title:'Recupere antes de reler', subtitle:'Active recall', text:'Feche o material e escreva o que consegue lembrar. Só depois confira. A diferença entre sua resposta e a fonte vira um mapa de revisão.', sourceIds:[] },
  { kind:'study-tip', title:'Anote o ponto do erro', subtitle:'Metacognição', text:'Troque “errei” por “errei porque”. Descobrir o ponto de decisão torna a correção mais útil que simplesmente ver o gabarito.', sourceIds:[] },
  { kind:'study-tip', title:'Intercale tipos de problema', subtitle:'Interleaving', text:'Misturar tipos de exercícios obriga você a reconhecer qual método usar antes de começar a calcular.', sourceIds:[] },
  { kind:'study-tip', title:'Use o tempo como diagnóstico', subtitle:'Cronômetro', text:'Primeiro busque precisão. Depois, com prática, reduza o tempo. Velocidade sem compreensão não deve virar meta principal.', sourceIds:[] },
];

export function dayIndex(length: number, salt = 0, date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0).getTime();
  const day = Math.floor((date.getTime() - start) / 86400000);
  return Math.abs((day * 31 + salt * 17 + date.getFullYear()) % length);
}

export function getDailySet(date = new Date()) {
  const subjectOrder: Subject[] = ['Matemática','Física','Língua Portuguesa','Língua Inglesa'];
  const qCount = 5;
  const seen = new Set<string>();
  const picked: Question[] = [];
  for (let i=0; picked.length < qCount; i++) {
    const preferred = subjectOrder[(dayIndex(subjectOrder.length, i, date)) % subjectOrder.length];
    const pool = questionBank.filter(x => x.subject === preferred && !seen.has(x.id));
    const fallback = questionBank.filter(x => !seen.has(x.id));
    const item = (pool[dayIndex(pool.length || 1, i + 4, date)] ?? fallback[dayIndex(fallback.length || 1, i + 8, date)]);
    if (!item) break;
    seen.add(item.id); picked.push(item);
  }
  return {
    questions: picked,
    math: mathHistory[dayIndex(mathHistory.length, 1, date)],
    physics: physicsHistory[dayIndex(physicsHistory.length, 2, date)],
    language: languageEditorial[dayIndex(languageEditorial.length, 3, date)],
    thinker: thinkers[dayIndex(thinkers.length, 4, date)],
    curiosity: curiosities[dayIndex(curiosities.length, 5, date)],
    studyTip: studyTips[dayIndex(studyTips.length, 6, date)],
  };
}
