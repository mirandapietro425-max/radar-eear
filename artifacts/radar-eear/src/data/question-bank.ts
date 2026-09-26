export type RadarQuestion = { id:string; subject:'Português'|'Inglês'|'Matemática'|'Física'|'Bíblia'; topic:string; prompt:string; options:string[]; answer:number; explanation:string; origin:'original'|'curated'|'official'|'ai_draft'|'ai_reviewed'|'autoral/similar'; source?:string };

const q:RadarQuestion[] = [];
const push=(x:Omit<RadarQuestion,'origin'>)=>q.push({...x,origin:'original'});

// Matemática — banco autoral didático
[
 [1,6,2,'7','Se a₁ = 7 e a razão é 3, qual é o quarto termo de uma PA?',['13','16','18','19'],1,'a₄ = 7 + 3·3 = 16.'],
 [2,3,4,'12','Qual é o MMC de 12 e 18?',['24','30','36','42'],2,'As fatorações dão MMC = 2²·3² = 36.'],
 [3,5,7,'35','Quanto é 5/8 de 56?',['30','32','35','40'],2,'56 ÷ 8 = 7; 7·5 = 35.'],
 [4,12,15,'0.8','Qual é a razão entre 12 e 15?',['0,6','0,8','1,2','1,25'],1,'12/15 = 0,8.'],
 [5,20,25,'20','Um produto de R$ 25 recebeu 20% de desconto. Preço final?',['18','20','21','22'],1,'25·0,80 = 20.'],
 [6,4,9,'36','Qual é o valor de x em 4x = 36?',['7','8','9','10'],2,'Dividindo os dois lados por 4, x = 9.'],
 [7,2,3,'13','Resolva 2x + 3 = 13.',['4','5','6','7'],1,'2x = 10; x = 5.'],
 [8,3,4,'10','Qual é o próximo termo da sequência 1, 3, 6, 10, ...?',['12','13','14','15'],3,'As diferenças são 2, 3, 4; a próxima é 5, então 15.'],
 [9,2,5,'32','Qual é o 6º termo da PG 2, 4, 8, ...?',['16','24','32','64'],3,'O sexto termo é 2·2⁵ = 64.'],
 [10,5,2,'18','A expressão 3² + 3·5 vale:',['15','18','20','24'],3,'9 + 15 = 24.'],
 [11,10,6,'60','Área de um retângulo de lados 10 e 6:',['16','32','60','120'],2,'A = 10·6 = 60.'],
 [12,8,5,'20','A diagonal de um quadrado tem relação com o lado pelo fator √2. Se o lado é 5, a diagonal é:',['5√2','10','10√2','25'],0,'d = a√2 = 5√2.'],
 [13,3,4,'5','Um triângulo retângulo tem catetos 3 e 4. Hipotenusa?',['4','5','6','7'],1,'Pelo teorema de Pitágoras, 3²+4²=5².'],
 [14,10,3.14,'31.4','Circunferência de raio 5 usando π≈3,14:',['15,7','31,4','62,8','78,5'],1,'C = 2πr ≈ 31,4.'],
 [15,10,3.14,'78.5','Área do círculo de raio 5 usando π≈3,14:',['31,4','50','78,5','157'],2,'A = πr² ≈ 78,5.'],
 [16,30,20,'0.667','sen θ = 20/30 é aproximadamente:',['0,33','0,50','0,67','1,50'],2,'20/30 = 2/3 ≈ 0,67.'],
 [17,4,5,'0.8','Em um triângulo retângulo, cateto oposto 4 e hipotenusa 5. sen θ = ?',['0,6','0,8','1,0','1,25'],1,'sen θ = oposto/hipotenusa = 4/5.'],
 [18,6,4,'3','A média aritmética de 2, 4, 3 e 3 é:',['2,5','3','3,5','4'],1,'(2+4+3+3)/4 = 3.'],
 [19,10,2,'0.2','A probabilidade de retirar uma bola vermelha em 2 vermelhas e 8 azuis é:',['0,1','0,2','0,8','0,9'],1,'Há 2 casos favoráveis em 10: 0,2.'],
 [20,4,6,'24','Sistema x+y=10 e x-y=2. O valor de x é:',['4','5','6','8'],2,'Somando as equações: 2x=12; x=6.'],
 [21,2,3,'6','log₂ 64 vale:',['4','5','6','8'],2,'2⁶ = 64.'],
 [22,2,8,'3','A função f(x)=2x+2 vale 8 quando x é:',['2','3','4','5'],1,'2x+2=8, então x=3.'],
 [23,4,2,'4','Qual é o coeficiente angular da reta y=4x-2?',['-2','2','4','-4'],2,'O coeficiente de x é 4.'],
 [24,3,2,'6','Um número aumenta 50% e passa a valer 9. Valor inicial?',['4,5','6','7,5','8'],1,'1,5x=9; x=6.'],
 [25,12,4,'3','Se 12 alunos representam 4 grupos iguais, quantos alunos por grupo?',['2','3','4','8'],1,'12÷4=3.'],
 [26,4,3,'12','Perímetro de um quadrado de lado 3:',['9','12','16','18'],1,'P=4·3=12.'],
 [27,5,2,'10','O dobro de um número menos 5 é 15. Qual é o número?',['5','8','10','12'],2,'2x-5=15; x=10.'],
 [28,4,9,'36','Se a base de um paralelogramo é 9 e a altura 4, a área é:',['13','18','32','36'],3,'A=b·h=36.'],
 [29,15,4,'2','A distância entre os pontos 4 e 15 na reta real é:',['9','11','19','60'],1,'|15-4|=11.'],
 [30,7,2,'14','Uma razão 7:2 aplicada a 2 unidades produz:',['7','9','14','28'],0,'7/2·2=7; para duas unidades a primeira parte vale 7.'],
].forEach(([id,a,b,ans,prompt,options,answer,explanation])=>push({id:`mat-${id}`,subject:'Matemática',topic:'Matemática',prompt:String(prompt),options:options as string[],answer:Number(answer),explanation:String(explanation)}));

// Física — banco autoral didático
[
 ['01','Cinemática','Um móvel percorre 120 m em 20 s com velocidade média constante. Qual é a velocidade?',['4 m/s','6 m/s','8 m/s','12 m/s'],1,'v=Δs/Δt=120/20=6 m/s.'],
 ['02','Cinemática','Um corpo parte do repouso com aceleração de 2 m/s² por 5 s. Velocidade final?',['5 m/s','10 m/s','12 m/s','20 m/s'],1,'v=v₀+at=0+2·5=10 m/s.'],
 ['03','Cinemática','Se a velocidade passa de 5 para 17 m/s em 4 s, a aceleração média é:',['2 m/s²','3 m/s²','4 m/s²','5 m/s²'],1,'(17-5)/4=3 m/s².'],
 ['04','Leis de Newton','Força resultante 20 N atua sobre massa de 5 kg. A aceleração é:',['2 m/s²','4 m/s²','5 m/s²','10 m/s²'],1,'a=F/m=4 m/s².'],
 ['05','Leis de Newton','Um corpo em equilíbrio translacional possui força resultante:',['0 N','1 N','9,8 N','máxima'],0,'Equilíbrio implica resultante nula.'],
 ['06','Trabalho','Uma força de 10 N atua na direção do deslocamento de 3 m. Trabalho?',['3 J','10 J','30 J','300 J'],2,'W=F·d=30 J.'],
 ['07','Energia','Um corpo de 2 kg move-se a 3 m/s. Ec =',['3 J','6 J','9 J','18 J'],2,'Ec=mv²/2=2·9/2=9 J.'],
 ['08','Energia','Um corpo de 2 kg a 5 m de altura, com g=10 m/s², tem energia potencial de:',['20 J','50 J','100 J','200 J'],2,'Ep=mgh=2·10·5=100 J.'],
 ['09','Quantidade de movimento','Um corpo de 3 kg a 4 m/s possui quantidade de movimento:',['0,75','7','12','16'],2,'p=mv=12 kg·m/s.'],
 ['10','Impulso','Força média de 10 N atua por 0,5 s. Impulso:',['2 N·s','5 N·s','10 N·s','20 N·s'],1,'I=FΔt=5 N·s.'],
 ['11','Fluidos','A pressão de 100 N distribuída em 2 m² é:',['20 Pa','50 Pa','100 Pa','200 Pa'],1,'p=F/A=50 Pa.'],
 ['12','Fluidos','A densidade de 2 kg em 0,5 m³ é:',['1','2','4','8'],2,'ρ=m/V=4 kg/m³.'],
 ['13','Fluidos','Um corpo flutua quando sua densidade média é:',['maior que a do fluido','igual ou menor que a do fluido','zero sempre','independente do fluido'],1,'Para flutuar em equilíbrio, a densidade média não excede a do fluido.'],
 ['14','Calor','Quanto calor aquece 2 kg de água em 1°C, usando c=4200 J/kg°C?',['840 J','4200 J','8400 J','12600 J'],2,'Q=mcΔT=8400 J.'],
 ['15','Termodinâmica','A temperatura de 0°C corresponde aproximadamente a:',['-273 K','0 K','273 K','373 K'],2,'T(K)=T(°C)+273≈273 K.'],
 ['16','Gases','Em uma transformação isotérmica ideal, ao aumentar o volume, a pressão tende a:',['aumentar','diminuir','ficar sempre igual','zerar'],1,'Para temperatura constante, PV=constante.'],
 ['17','Ondas','Uma onda de frequência 5 Hz tem período:',['0,1 s','0,2 s','2 s','5 s'],1,'T=1/f=0,2 s.'],
 ['18','Ondas','Se v=10 m/s e f=2 Hz, o comprimento de onda é:',['2 m','5 m','10 m','20 m'],1,'λ=v/f=5 m.'],
 ['19','Óptica','A reflexão especular ocorre em uma superfície:',['muito irregular','polida','opaca apenas','líquida apenas'],1,'Superfícies polidas favorecem reflexão regular.'],
 ['20','Óptica','Ao passar do ar para o vidro, a luz geralmente:',['aumenta a velocidade','diminui a velocidade','para completamente','vira som'],1,'O índice do vidro é maior; a velocidade diminui.'],
 ['21','Lentes','Uma lente convergente é mais espessa:',['no centro','nas bordas','igualmente sempre','somente no suporte'],0,'Lentes convergentes convencionais são mais espessas no centro.'],
 ['22','Eletricidade','Uma corrente de 2 A percorre um resistor de 5 Ω. Tensão?',['2,5 V','5 V','10 V','20 V'],2,'V=RI=10 V.'],
 ['23','Eletricidade','Potência de um aparelho a 20 V e 3 A:',['6 W','23 W','60 W','120 W'],2,'P=VI=60 W.'],
 ['24','Circuitos','Em série, a corrente elétrica é:',['diferente em cada resistor','a mesma em todos os elementos','sempre zero','inversamente igual'],1,'No circuito simples em série, a corrente é a mesma.'],
 ['25','Circuitos','Em paralelo, a tensão nos ramos ideais conectados aos mesmos nós é:',['a mesma','sempre zero','diferente por definição','infinita'],0,'Os ramos compartilham a mesma diferença de potencial.'],
 ['26','Eletromagnetismo','A corrente em um condutor cria ao redor dele:',['campo magnético','campo apenas gravitacional','vácuo','som'],0,'Corrente elétrica produz campo magnético.'],
 ['27','Indução','Variação de fluxo magnético pode induzir:',['corrente elétrica','massa','temperatura absoluta','gravidade'],0,'A indução eletromagnética gera força eletromotriz.'],
 ['28','Radiação','Entre as radiações eletromagnéticas, qual possui maior frequência?',['rádio','micro-ondas','visível','raios gama'],3,'Raios gama ocupam a faixa de maior frequência do espectro eletromagnético.'],
 ['29','Unidades','A unidade SI de força é:',['joule','watt','newton','pascal'],2,'Força é medida em newtons.'],
 ['30','Unidades','A unidade SI de potência é:',['watt','joule','newton','tesla'],0,'Potência é medida em watts.'],
].forEach(([id,topic,prompt,options,answer,explanation])=>push({id:`fis-${id}`,subject:'Física',topic:String(topic),prompt:String(prompt),options:options as string[],answer:Number(answer),explanation:String(explanation)}));

const portuguese = [
 ['01','Concordância','Qual alternativa apresenta concordância adequada?',['Houveram problemas.','Houve problemas.','Haviam problemas ontem.','Existiu problemas.'],1,'O verbo haver, no sentido de existir, é impessoal: “houve problemas”.'],
 ['02','Regência','No sentido de ver, o verbo assistir pede qual preposição?',['a','de','com','por'],0,'Na norma-padrão, assistir a algo.'],
 ['03','Crase','Qual forma está adequada?',['Vou à escola.','Vou a à escola.','Vou à uma escola.','Vou a escola de Maria sem contexto.'],0,'A construção “ir à escola” combina preposição a e artigo a.'],
 ['04','Pontuação','A vírgula pode separar elementos de uma enumeração?',['sim','nunca','somente em títulos','somente antes do verbo'],0,'A enumeração é um uso regular da vírgula.'],
 ['05','Sintaxe','Em “Os alunos estudaram”, o sujeito é:',['Os alunos','estudaram','alunos estudaram','oculto'],0,'“Os alunos” realiza a ação verbal.'],
 ['06','Semântica','“Ratificar” significa:',['confirmar','corrigir','duvidar','retirar'],0,'Ratificar é confirmar ou validar.'],
 ['07','Figuras','“O vento sussurrava” é exemplo de:',['personificação','hipérbole','antítese','metonímia'],0,'Atribui ação humana ao vento.'],
 ['08','Ortografia','Qual forma está correta?',['exceção','excessão','escessão','exseção'],0,'A grafia padrão é exceção.'],
 ['09','Formação','“Infelizmente” contém o sufixo:',['-mente','-ção','-ismo','-eiro'],0,'-mente forma advérbios a partir de adjetivos.'],
 ['10','Interpretação','Em uma questão de leitura, a informação explícita está:',['diretamente presente no texto','somente no contexto histórico','apenas na intenção do autor','sempre implícita'],0,'Informação explícita é aquela textual, não apenas inferida.'],
]
portuguese.forEach(([id,topic,prompt,opts,a,ex])=>push({id:`por-${id}`,subject:'Português',topic:String(topic),prompt:String(prompt),options:opts as string[],answer:Number(a),explanation:String(ex)}))

const english = [
 ['01','Simple past','Choose the correct form: “They ____ the aircraft yesterday.”',['check','checked','checking','have check'],1,'Yesterday marks a completed past action: checked.'],
 ['02','Modal','“You ____ wear a seat belt.”',['must','would','might not','used'],0,'Must expresses obligation.'],
 ['03','Passive voice','“The report was ____ by the team.”',['write','wrote','written','writing'],2,'Passive voice requires the past participle: written.'],
 ['04','Pronouns','“Maria called John and spoke to ____.”',['he','him','his','himself'],1,'Object pronoun after the preposition/to context is him.'],
 ['05','Reading','“The crew had left before sunrise.” They left:',['after sunrise','before sunrise','at noon','unknown'],1,'Had left establishes an earlier past event.'],
 ['06','Connectors','“Although it rained, the event continued.” Although indicates:',['contrast','cause','time only','place'],0,'Although introduces a concessive contrast.'],
 ['07','Preposition','“Interested ____ science.”',['on','at','in','for'],2,'The standard collocation is interested in.'],
 ['08','Present perfect','“She has finished the task.” The task is:',['still unfinished','completed with present relevance','future only','impossible'],1,'Present perfect links a past action to the present.'],
 ['09','Determiner','“I saw ____ aircraft.”',['a','an','the an','many'],1,'Aircraft begins with a vowel sound, so an is used.'],
 ['10','Vocabulary','“Reliable” is closest to:',['dependable','dangerous','temporary','unclear'],0,'Reliable means dependable or trustworthy.'],
]
english.forEach(([id,topic,prompt,opts,a,ex])=>push({id:`eng-${id}`,subject:'Inglês',topic:String(topic),prompt:String(prompt),options:opts as string[],answer:Number(a),explanation:String(ex)}))

const bible = [
 ['01','Gênero','Salmos é principalmente associado a:',['poesia/hinos','carta paulina','genealogia romana','lei militar'],0,'Salmos é uma coleção poética e litúrgica.'],
 ['02','Pentateuco','Qual é o primeiro livro do Pentateuco?',['Gênesis','Josué','Isaías','Mateus'],0,'Gênesis abre o Pentateuco.'],
 ['03','Evangelhos','Qual livro é um Evangelho?',['Mateus','Romanos','Atos','Hebreus'],0,'Mateus integra os quatro Evangelhos canônicos.'],
 ['04','Cartas','Romanos é classificado como:',['carta','Evangelho','livro sapiencial','apocalipse'],0,'Romanos é uma epístola paulina.'],
 ['05','História','Atos narra principalmente:',['a expansão inicial do movimento cristão','a monarquia de Judá','a filosofia de Platão','o Egito helenístico inteiro'],0,'Atos acompanha a expansão e comunidades cristãs iniciais.'],
 ['06','Profetas','Isaías pertence ao conjunto tradicional de:',['profetas','Evangelhos','cartas gerais','sapienciais gregos'],0,'Isaías é um dos profetas maiores na classificação cristã tradicional.'],
 ['07','Sabedoria','Provérbios é associado a:',['sabedoria','apocalipse','história romana','cartas de Paulo'],0,'Provérbios reúne literatura sapiencial.'],
 ['08','Apocalipse','Apocalipse está no:',['Novo Testamento','Pentateuco','livros históricos do AT','livros sapienciais'],0,'É o último livro do cânon cristão comum de 66 livros.'],
 ['09','Contexto','Gênesis contém narrativas sobre:',['criação e ancestrais','apenas o exílio babilônico','a vida de Paulo','a reforma protestante'],0,'O livro inclui narrativas de origens e ancestrais.'],
 ['10','Cartas','1 Coríntios é uma carta atribuída tradicionalmente a:',['Paulo','Pedro','João Batista','Moisés'],0,'A tradição canônica atribui 1 Coríntios a Paulo.'],
]
bible.forEach(([id,topic,prompt,opts,a,ex])=>push({id:`bib-${id}`,subject:'Bíblia',topic:String(topic),prompt:String(prompt),options:opts as string[],answer:Number(a),explanation:String(ex)}))

export const generatedQuestions = q;
