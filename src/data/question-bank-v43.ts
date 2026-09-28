import type { RadarQuestion } from './question-bank';

type Row = [string,string,string,string[],number,string,'intermediária'|'avançada'];
const mk=(rows:Row[], prefix:string, subject:RadarQuestion['subject']):RadarQuestion[] => rows.map(([id,topic,prompt,options,answer,explanation,difficulty])=>({id:`v43-${prefix}-${id}`,subject,topic,prompt,options,answer,explanation,origin:'autoral/similar',difficulty}));

const portuguese:Row[]=[
['001','Interpretação','Em um texto argumentativo, a função principal da tese é:', ['apresentar dados sem posição','explicitar a posição central defendida','listar referências','encerrar todos os parágrafos'],1,'A tese formula a posição central que os argumentos desenvolvem.','intermediária'],
['002','Coesão','No trecho “O piloto revisou o painel. Essa medida evitou a falha”, a expressão “essa medida” retoma:', ['o piloto','o painel','a revisão realizada','a falha'],2,'O demonstrativo retoma a ação de revisar o painel.','intermediária'],
['003','Coerência','Uma conclusão contradiz a tese quando:', ['retoma o tema','apresenta consequência compatível','nega a posição defendida sem justificar a mudança','sintetiza os argumentos'],2,'A contradição surge quando a conclusão nega a posição que o próprio texto sustentou.','avançada'],
['004','Sintaxe','Em “Os mecânicos verificaram cuidadosamente o motor”, o termo “cuidadosamente” exerce função de:', ['sujeito','objeto direto','adjunto adverbial','predicativo do sujeito'],2,'O advérbio modifica o verbo indicando modo.','intermediária'],
['005','Sintaxe','Em “A equipe considerou o procedimento seguro”, “seguro” é:', ['objeto direto','predicativo do objeto','adjunto adnominal','vocativo'],1,'“Seguro” atribui uma característica ao objeto “o procedimento”.','avançada'],
['006','Regência','Assinale a construção adequada segundo a regência-padrão:', ['O técnico preferiu testar do que trocar.','O técnico preferiu testar a trocar.','O técnico preferiu mais testar que trocar.','O técnico preferiu de testar a trocar.'],1,'O verbo preferir rege a construção “preferir X a Y”.','intermediária'],
['007','Crase','Em “A equipe retornou à base ao anoitecer”, a crase ocorre porque:', ['há apenas artigo','há apenas preposição','ocorre fusão da preposição a com o artigo a','o verbo exige sempre dois artigos'],2,'“Retornar a” + “a base” produz “à base”.','intermediária'],
['008','Concordância','Qual alternativa está adequada?', ['Fazem três semanas que iniciou.','Faz três semanas que iniciou.','Haviam muitos sinais de falha.','Existia problemas no sistema.'],1,'“Fazer” indicando tempo é impessoal; por isso fica no singular.','intermediária'],
['009','Pontuação','Em “Quando terminou o diagnóstico, o técnico registrou o resultado”, a vírgula:', ['separa sujeito e predicado','marca oração adverbial anteposta','isola objeto direto','separa verbo e complemento'],1,'A oração temporal vem antes da principal e é separada por vírgula.','intermediária'],
['010','Morfologia','Na palavra “desleal”, o elemento “des-” é:', ['sufixo','radical','prefixo','desinência verbal'],2,'“Des-” antecede o radical e participa da formação da palavra.','intermediária'],
['011','Semântica','Em “O sistema está pesado”, o sentido de “pesado” depende principalmente:', ['da classe gramatical','do contexto','do número de sílabas','da pontuação final'],1,'O contexto determina se “pesado” se refere a massa, desempenho ou outro sentido.','avançada'],
['012','Figuras de linguagem','Em “O tempo voou durante a revisão”, predomina:', ['metáfora','hipérbole','eufemismo','antítese'],0,'Atribui-se ao tempo a ação de voar em sentido figurado.','intermediária'],
['013','Colocação pronominal','Em “Não se esqueça do prazo”, a posição do pronome ocorre por:', ['ênclise obrigatória','próclise favorecida por palavra negativa','mesóclise','regência nominal'],1,'A palavra negativa “não” atrai o pronome para antes do verbo.','avançada'],
['014','Período composto','Em “Estudou porque precisava revisar”, a oração iniciada por “porque” expressa:', ['condição','causa','conclusão','concessão'],1,'“Porque precisava revisar” apresenta a causa do estudo.','intermediária'],
['015','Variação linguística','A existência de variedades regionais de uma língua demonstra:', ['erro inevitável','uniformidade absoluta','diversidade de usos condicionada por contexto e comunidade','ausência de regras'],2,'As línguas apresentam variação regional, social, histórica e situacional.','avançada'],
['016','Tipologia textual','Um manual de manutenção é predominantemente:', ['injuntivo','narrativo','lírico','memorialístico'],0,'Manuais orientam procedimentos e ações, característica do tipo injuntivo.','intermediária'],
['017','Literatura brasileira','Uma marca recorrente do Realismo brasileiro é:', ['idealização amorosa obrigatória','observação crítica das relações sociais e da subjetividade','abandono total da prosa','predomínio exclusivo de mitologia'],1,'O Realismo enfatiza observação crítica, conflitos psicológicos e relações sociais.','avançada'],
['018','Literatura brasileira','Em narrativas de primeira pessoa, a informação apresentada pelo narrador deve ser lida:', ['sempre como fato absoluto','sem considerar perspectiva','como informação mediada pelo ponto de vista narrativo','como comentário do autor real'],2,'Narradores em primeira pessoa filtram acontecimentos por sua perspectiva.','avançada']
];

const english:Row[]=[
['001','Reading','In “Although the weather was poor, the aircraft departed”, the connector “although” expresses:', ['cause','contrast/concession','result','purpose'],1,'“Although” introduces a concessive relation: the departure happened despite the poor weather.','intermediária'],
['002','Reading','In “The device failed because its battery was empty”, “because” introduces:', ['cause','contrast','condition','comparison'],0,'“Because” explains the reason for the failure.','intermediária'],
['003','Grammar','Choose the correct sentence:', ['She don’t study physics.','She doesn’t studies physics.','She doesn’t study physics.','She not study physics.'],2,'After “doesn’t”, the main verb remains in the base form: study.','intermediária'],
['004','Grammar','Which sentence is in the present perfect?', ['I finished the test yesterday.','I have finished the test.','I was finishing the test.','I finish the test every day.'],1,'“Have finished” is the present perfect construction.','intermediária'],
['005','Grammar','In “The report was written by the technician”, the sentence is:', ['active voice','passive voice','reported speech','conditional'],1,'The structure “was written” is passive voice.','intermediária'],
['006','Vocabulary','In a technical context, “failure” is closest to:', ['success','malfunction','arrival','schedule'],1,'A failure is a malfunction or unsuccessful operation.','intermediária'],
['007','Vocabulary','“To troubleshoot a system” means to:', ['decorate it','diagnose and solve faults','sell it','translate it'],1,'Troubleshooting means identifying and resolving problems.','avançada'],
['008','Reading','In “The aircraft was grounded due to maintenance”, “grounded” most likely means:', ['painted','kept from flying','moved faster','repaired in the air'],1,'In aviation, an aircraft that is grounded cannot operate flights.','avançada'],
['009','Grammar','Choose the correct comparative:', ['more fast than','faster than','fastest than','more faster than'],1,'The standard comparative of “fast” is “faster than”.','intermediária'],
['010','Grammar','If “I had more time, I would review the chapter”, the sentence expresses:', ['a real past fact','a hypothetical condition','a command','a completed action'],1,'“If + past” with “would” commonly expresses a hypothetical condition.','avançada'],
['011','Reading','In “The results were reliable; therefore, the method was retained”, “therefore” signals:', ['contrast','conclusion/result','time','example'],1,'“Therefore” introduces a conclusion based on the previous statement.','avançada'],
['012','Grammar','In “The students who studied passed the exam”, “who studied” functions as:', ['a relative clause','a main verb','an adverbial phrase','a preposition'],0,'It is a relative clause modifying “students”.','avançada'],
['013','Vocabulary','The word “accurate” in a measurement context means:', ['precise/correct','expensive','slow','temporary'],0,'“Accurate” refers to correctness or closeness to the true value.','intermediária'],
['014','Grammar','Choose the correct question:', ['Where you are going?','Where are you going?','Where going are you?','Where you going are?'],1,'Questions with “where” use auxiliary/verb inversion: Where are you going?','intermediária'],
['015','Reading','In “Unless the temperature drops, the process will continue”, “unless” means approximately:', ['if not','because','while','even if'],0,'“Unless” introduces a negative condition: if the temperature does not drop.','avançada'],
['016','Writing','Which option is the clearest instruction for a manual?', ['Maybe you can turn it off.','Turn off the main switch before opening the panel.','The panel was opened yesterday.','I think the switch is there.'],1,'Manuals benefit from direct, unambiguous instructions.','intermediária'],
['017','Vocabulary','“To monitor a parameter” means to:', ['ignore it','observe it over time','remove it','translate it'],1,'Monitoring means observing a variable or condition continuously or repeatedly.','intermediária']
];

const math:Row[]=[
['001','Álgebra','Se 3x−5=16, então x=', ['5','6','7','8'],2,'3x=21, então x=7.','intermediária'],
['002','Álgebra','Para x≠4, (x²−16)/(x−4) é:', ['x−4','x+4','x²+4','4x'],1,'Fatorando x²−16=(x−4)(x+4), resulta x+4.','avançada'],
['003','Funções','Se f(x)=x²−2x+1, então f(4)=', ['7','9','11','13'],1,'f(4)=16−8+1=9.','intermediária'],
['004','Funções','A função y=−2x+8 intercepta o eixo y em:', ['−2','2','6','8'],3,'No eixo y, x=0; então y=8.','intermediária'],
['005','Equações','As raízes de x²−7x+12=0 são:', ['2 e 5','3 e 4','−3 e −4','1 e 12'],1,'(x−3)(x−4)=0.','intermediária'],
['006','Inequações','A solução de 2x+3≤11 é:', ['x≤3','x≤4','x≥4','x≥7'],1,'2x≤8, logo x≤4.','intermediária'],
['007','Razão e proporção','Se 8 unidades custam R$ 56, 5 unidades, na mesma proporção, custam:', ['R$ 30','R$ 35','R$ 40','R$ 45'],1,'Cada unidade custa 7; 5 unidades custam 35.','intermediária'],
['008','Porcentagem','Um valor de 240 aumenta 25%. O novo valor é:', ['270','285','300','315'],2,'25% de 240 é 60; total 300.','intermediária'],
['009','Sequências','Na PA 11, 15, 19, ... o 15º termo é:', ['63','67','71','75'],1,'a15=11+14·4=67.','avançada'],
['010','Progressões','Na PG 3, 9, 27, ... o 5º termo é:', ['81','162','243','324'],2,'a5=3·3^4=243.','intermediária'],
['011','Geometria','A área de um triângulo de base 12 e altura 7 é:', ['42','56','84','96'],2,'A=b·h/2=12·7/2=42.','intermediária'],
['012','Geometria','Um cilindro de raio 2 e altura 5 tem volume:', ['10π','15π','20π','40π'],2,'V=πr²h=π·4·5=20π.','intermediária'],
['013','Trigonometria','Se cos θ=12/13 em um triângulo retângulo, com θ agudo, sen θ=', ['5/13','12/13','13/12','1/13'],0,'Pelo triângulo 5-12-13, o seno é 5/13.','avançada'],
['014','Combinatória','Quantos anagramas distintos existem para a palavra “RADAR”?', ['20','30','60','120'],1,'Há 5 letras, com R repetido 2 vezes e A repetido 2 vezes: 5!/(2!2!)=30.','avançada'],
['015','Probabilidade','Ao retirar uma carta de um baralho comum de 52 cartas, a probabilidade de sair um ás é:', ['1/52','1/26','1/13','4/13'],2,'Há 4 ases em 52 cartas: 4/52=1/13.','intermediária'],
['016','Estatística','A média dos números 6, 8, 10, 12 é:', ['8','9','10','11'],1,'A soma é 36; 36/4=9.','intermediária'],
['017','Geometria analítica','O ponto médio entre (2,6) e (8,10) é:', ['(4,7)','(5,8)','(6,8)','(5,7)'],1,'M=((2+8)/2,(6+10)/2)=(5,8).','intermediária'],
['018','Logaritmos','log₂(32) + log₂(4) é:', ['5','6','7','8'],2,'5+2=7.','intermediária']
];

const physics:Row[]=[
['001','Cinemática','Um corpo passa de 4 m/s para 16 m/s em 6 s. A aceleração média é:', ['1 m/s²','2 m/s²','3 m/s²','4 m/s²'],1,'a=(16−4)/6=2 m/s².','intermediária'],
['002','Cinemática','Um móvel com v0=2 m/s e a=3 m/s² percorre, em 4 s:', ['20 m','28 m','32 m','40 m'],2,'Δs=v0t+at²/2=8+24=32 m.','avançada'],
['003','Dinâmica','Um bloco de 8 kg recebe força resultante de 24 N. Sua aceleração é:', ['2 m/s²','3 m/s²','4 m/s²','6 m/s²'],1,'a=F/m=24/8=3 m/s².','intermediária'],
['004','Atrito','Se a força de atrito aumenta enquanto a força aplicada permanece constante, a força resultante tende a:', ['aumentar','diminuir','ficar sempre igual','tornar-se necessariamente zero'],1,'Com a força aplicada fixa, maior atrito reduz a resultante.','avançada'],
['005','Trabalho','Uma força de 20 N atua paralelamente ao deslocamento de 5 m. O trabalho é:', ['25 J','50 J','100 J','200 J'],2,'W=Fd=20·5=100 J.','intermediária'],
['006','Energia','Se a velocidade de um corpo dobra, sua energia cinética, mantendo a massa, fica:', ['duas vezes maior','três vezes maior','quatro vezes maior','inalterada'],2,'Ec é proporcional a v²; dobrar v quadruplica Ec.','avançada'],
['007','Potência','Uma máquina fornece 1500 J de trabalho em 30 s. Sua potência média é:', ['30 W','50 W','75 W','100 W'],1,'P=1500/30=50 W.','intermediária'],
['008','Quantidade de movimento','Se a velocidade de um corpo de massa fixa triplica, seu momento linear:', ['triplica','dobra','quadruplica','permanece igual'],0,'p=mv, portanto cresce na mesma proporção da velocidade.','intermediária'],
['009','Pressão','Uma força de 600 N distribuída em área de 3 m² produz pressão de:', ['100 Pa','200 Pa','300 Pa','1800 Pa'],1,'p=F/A=600/3=200 Pa.','intermediária'],
['010','Hidrostática','Em um mesmo líquido em repouso, a pressão hidrostática aumenta com:', ['a profundidade','a cor do recipiente','a área superficial apenas','a forma do líquido apenas'],0,'A pressão p=ρgh aumenta com a profundidade h.','intermediária'],
['011','Calorimetria','Para aquecer 0,5 kg de uma substância em 20°C, com c=400 J/kg°C, o calor necessário é:', ['200 J','4000 J','8000 J','16000 J'],1,'Q=mcΔT=0,5·400·20=4000 J.','intermediária'],
['012','Termodinâmica','Em uma expansão isotérmica de gás ideal, a pressão tende a:', ['aumentar','diminuir','ficar sempre nula','independer do volume'],1,'Com T constante, PV permanece aproximadamente constante.','avançada'],
['013','Ondas','Uma onda de velocidade 24 m/s e frequência 6 Hz possui comprimento de onda:', ['2 m','4 m','6 m','12 m'],1,'λ=v/f=24/6=4 m.','intermediária'],
['014','Óptica','Ao passar do vidro para o ar, a velocidade da luz geralmente:', ['diminui','aumenta','fica zero','vira uma onda mecânica'],1,'O índice de refração do ar é menor; a velocidade aumenta.','avançada'],
['015','Eletricidade','Um resistor de 10 Ω ligado a 5 V é percorrido por corrente de:', ['0,2 A','0,5 A','2 A','5 A'],0,'I=V/R=5/10=0,5 A.','intermediária'],
['016','Circuitos','Dois resistores de 4 Ω ligados em série possuem resistência equivalente de:', ['2 Ω','4 Ω','8 Ω','16 Ω'],2,'Em série, somam-se as resistências: 4+4=8 Ω.','intermediária'],
['017','Eletromagnetismo','A força magnética sobre uma carga em movimento depende, entre outros fatores, da:', ['velocidade da carga','cor do condutor','massa do observador','temperatura ambiente apenas'],0,'A força magnética envolve q, v, B e o ângulo entre velocidade e campo.','avançada']
];

export const v43Questions:RadarQuestion[]=[
 ...mk(portuguese,'pt','Português'),
 ...mk(english,'en','Inglês'),
 ...mk(math,'mat','Matemática'),
 ...mk(physics,'fis','Física'),
];
