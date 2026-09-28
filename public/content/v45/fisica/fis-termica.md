# fis-termica — Física: calor e termodinâmica

**ID do conteúdo:** `fis-termica`  
**Área:** Física  
**Escopo:** temperatura, calor, dilatação, mudanças de fase, gases e termodinâmica

## Objetivo e pré-requisitos

Ao concluir este guia, o estudante deverá distinguir temperatura de calor, converter escalas, prever dilatações, resolver balanços de calor com e sem mudança de fase, relacionar pressão–volume–temperatura de um gás ideal e aplicar a primeira e a segunda leis da termodinâmica em situações elementares. Também deverá interpretar gráficos de aquecimento e diagramas pressão–volume, sempre cuidando de unidades e sinais.

Antes de começar, revise operações com frações e notação científica, conversão de unidades (grama para quilograma, litro para metro cúbico e graus Celsius para kelvin), regra de três, área e volume de prismas/cilindros, leitura de gráficos e o conceito de energia. É útil conhecer trabalho mecânico e potência, embora o essencial seja saber que energia pode ser transferida por calor ou por trabalho.

## Conceitos fundamentais — explicação curta

- **Temperatura** mede o estado térmico de um corpo e se relaciona à energia cinética média de suas partículas; não é a quantidade total de energia do corpo.
- **Calor** é energia em trânsito, transferida espontaneamente de uma região de maior temperatura para outra de menor temperatura, até o equilíbrio térmico.
- **Energia interna** é a energia microscópica associada ao movimento e às interações das partículas. Para um gás ideal, depende apenas da temperatura.
- **Equilíbrio térmico** ocorre quando sistemas em contato deixam de trocar calor líquido. A Lei Zero torna coerente a ideia de temperatura.
- **Calor sensível** altera a temperatura; **calor latente** altera o estado físico sem variar a temperatura durante a mudança de fase (em condições constantes).
- **Gás ideal** é um modelo no qual as partículas ocupam volume desprezível e interagem apenas em colisões; seu estado obedece a uma equação simples.
- **Primeira lei** é conservação de energia aplicada a um sistema. **Segunda lei** estabelece o sentido natural dos processos e limita o rendimento das máquinas térmicas.

## Explicação aprofundada passo a passo

### 1. Temperatura, equilíbrio e escalas

Quando dois corpos de temperaturas diferentes são colocados em contato, há transferência de energia até que ambos atinjam a mesma temperatura. O calor não é “armazenado” como uma substância: ele descreve a transferência causada por diferença de temperatura. Um corpo pode ter muita energia interna e, ainda assim, ceder calor a outro se estiver mais quente.

Na escala Celsius, os pontos de congelamento e ebulição da água (a 1 atm) são convencionalmente 0 °C e 100 °C. A escala Kelvin tem o mesmo tamanho de intervalo que a Celsius, mas começa no zero absoluto: `T(K) = θ(°C) + 273,15`. Para exercícios escolares, às vezes usa-se 273. A relação entre Fahrenheit e Celsius é `θF = (9/5)θC + 32`, ou `θC/5 = (θF − 32)/9`. Diferenças de temperatura podem ser convertidas sem o termo de origem: uma variação de 10 °C corresponde a 10 K e a 18 °F.

A Lei Zero diz: se A está em equilíbrio térmico com C e B também está em equilíbrio com C, A e B estão em equilíbrio entre si. Ela justifica o termômetro: o instrumento precisa atingir equilíbrio com o corpo para indicar sua temperatura.

### 2. Dilatação térmica

Ao aquecer um material, a agitação microscópica aumenta e, em muitos sólidos, as distâncias médias entre partículas crescem. Para variações moderadas de temperatura, use o regime linear:

- `ΔL = L0 α ΔT` e `L = L0(1 + αΔT)` para uma dimensão;
- `ΔA ≈ A0 γ ΔT`, com `γ ≈ 2α`, para superfície;
- `ΔV ≈ V0 β ΔT`, com `β ≈ 3α` para sólido isotrópico.

`α`, `γ` e `β` são coeficientes de dilatação e devem estar em K⁻¹ ou °C⁻¹; `ΔT` pode ser uma diferença em qualquer dessas escalas. A aproximação exige que o coeficiente permaneça praticamente constante e que a variação seja pequena. Em líquidos, normalmente se usa diretamente o coeficiente volumétrico, pois eles não conservam forma. Em um recipiente, o volume aparente do líquido depende também da dilatação do recipiente: `ΔVaparente = ΔVlíquido − ΔVrecipiente`.

Pontes, trilhos e tubulações recebem juntas ou folgas para acomodar `ΔL`. Uma barra presa nas duas extremidades não pode se dilatar livremente; nesse caso surgem tensões, e não se deve aplicar a fórmula como se a extremidade pudesse deslocar-se sem resistência.

### 3. Calorimetria e mudanças de fase

Para aquecer ou resfriar uma massa sem mudar seu estado, use:

`Q = mcΔT`,

em que `m` é a massa, `c` o calor específico e `Q > 0` para calor recebido pelo corpo. A capacidade térmica do corpo é `C = mc`, de modo que `Q = CΔT`. A unidade coerente é joule, quilograma e J/(kg·K), ou caloria, grama e cal/(g·°C), mas não misture sistemas.

Durante fusão, vaporização, solidificação ou condensação, a temperatura fica constante no modelo de pressão fixa e o calor é:

`Q = mL`,

onde `L` é o calor latente da transformação. Em um aquecimento em etapas, some as parcelas: aquecer o sólido, fundir, aquecer o líquido, vaporizar e assim por diante. Em um sistema isolado, o balanço é `ΣQ = 0`: calor perdido pelos corpos quentes é igual ao calor ganho pelos frios. Essa regra vale quando perdas para o ambiente e para o recipiente são desprezadas; se o recipiente tiver capacidade térmica relevante, ele entra no balanço.

Um gráfico de aquecimento apresenta trechos inclinados, em que `Q = mcΔT`, e patamares, em que `Q = mL`. A inclinação depende de `mc`; um patamar mais longo não significa necessariamente temperatura maior, mas maior energia de transformação.

### 4. Gases e teoria cinética

O estado de uma quantidade fixa de gás é descrito por pressão `P`, volume `V` e temperatura absoluta `T`. No modelo ideal:

`PV = nRT`,

com `n` em mol e `R = 8,31 J/(mol·K)` quando `P` estiver em pascal e `V` em metro cúbico. Entre dois estados da mesma quantidade de gás:

`P1V1/T1 = P2V2/T2`.

Nunca use Celsius diretamente nessa relação. Em transformação isotérmica (`T` constante), `PV` é constante; em isobárica (`P` constante), `V/T` é constante; em isovolumétrica ou isocórica (`V` constante), `P/T` é constante. Em uma transformação adiabática, `Q = 0`: isso não significa temperatura constante, e sim ausência de troca de calor. Um ciclo retorna ao estado inicial, portanto `ΔU = 0` ao fim do ciclo.

A teoria cinética explica que maior temperatura absoluta corresponde a maior energia cinética média. Para gás ideal, a energia interna varia com a temperatura. Em particular, para gás monoatômico, `ΔU = (3/2)nRΔT`; use essa forma somente quando o modelo monoatômico for dado ou justificável.

### 5. Trabalho, primeira e segunda leis

Em uma expansão ou compressão, o trabalho realizado pelo gás é a área sob a curva no diagrama `P × V`. Em pressão constante, `W = PΔV`; na expansão, `W > 0` (o sistema faz trabalho), e na compressão, `W < 0` segundo essa convenção. A primeira lei, com trabalho realizado pelo sistema, é:

`ΔU = Q − W`.

Assim, calor recebido é positivo e calor cedido, negativo. Se o enunciado adotar “trabalho sobre o gás” como positivo, adapte a convenção; o importante é declarar o sinal. Em processo isocórico, `W = 0`, logo `ΔU = Q`. Para gás ideal em processo isotérmico, `ΔU = 0`, então `Q = W` (o calor recebido converte-se em trabalho, no balanço).

A segunda lei não é apenas uma fórmula: ela impõe direção aos processos. Calor flui espontaneamente do quente para o frio, e nenhuma máquina cíclica transforma todo calor recebido em trabalho. O rendimento de uma máquina é `η = Wútil/Qquente = 1 − Qfrio/Qquente`. Para a máquina reversível de Carnot entre reservatórios `Th` e `Tc`, em kelvin, o limite é `ηCarnot = 1 − Tc/Th`. Um refrigerador exige trabalho para transferir calor do frio para o quente.

A entropia quantifica, entre outras interpretações, a dispersão de energia e a irreversibilidade. Para uma transferência reversível de calor, `ΔS = Qrev/T`. Em um processo espontâneo envolvendo sistema e vizinhança, `ΔStotal ≥ 0`; a igualdade caracteriza o limite reversível, e o valor positivo indica irreversibilidade.

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — escala termométrica
Um termômetro marca 77 °F. Pela relação `θC = 5(θF − 32)/9`, obtém-se `θC = 25 °C`. A temperatura absoluta é `298,15 K` (ou aproximadamente 298 K se o exercício adotar 273). O erro típico é somar 273 diretamente a 77, pois Fahrenheit não tem o mesmo zero da Celsius.

### Exemplo 2 — dilatação de uma barra
Uma barra de 2,0 m, com `α = 1,0×10⁻⁵ K⁻¹`, sofre aquecimento de 50 K. Então `ΔL = 2,0 × 1,0×10⁻⁵ × 50 = 1,0×10⁻³ m`, isto é, 1,0 mm. A nova extensão é 2,001 m. A variação parece pequena porque o coeficiente é pequeno; não se deve multiplicar por 50 °C como se fosse uma porcentagem de 50%.

### Exemplo 3 — mistura sem perdas
Misturam-se 200 g de água a 80 °C com 300 g de água a 20 °C, no mesmo recipiente isolado. Como o calor específico é igual, `200(80 − Tf) = 300(Tf − 20)`. Daí `Tf = 44 °C`. A temperatura final fica entre as iniciais, uma verificação física rápida que elimina qualquer resultado fora do intervalo.

### Exemplo 4 — aquecer gelo até água
Para 100 g de gelo a −10 °C que chega a água líquida a 20 °C, com `cgel = 2,1 J/(g·°C)`, `Lf = 334 J/g` e `cágua = 4,2 J/(g·°C)`, some três etapas: `Q1 = 100·2,1·10 = 2.100 J`; `Q2 = 100·334 = 33.400 J`; `Q3 = 100·4,2·20 = 8.400 J`. Logo `Qtotal = 43.900 J = 43,9 kJ`. O patamar de fusão não deve receber uma parcela `mcΔT`, pois a temperatura permanece em 0 °C.

### Exemplo 5 — gás e primeira lei
Um gás recebe 500 J de calor e realiza 200 J de trabalho. Pela convenção `ΔU = Q − W`, `ΔU = 500 − 200 = 300 J`. Se fosse comprimido e o trabalho realizado sobre ele fosse 200 J, então o trabalho do gás seria −200 J e, mantendo `Q = 500 J`, `ΔU = 700 J`. Declarar a convenção impede a troca de sinais.

## Erros comuns e como corrigi-los

1. **Confundir calor com temperatura:** pergunte se o item descreve estado (temperatura) ou transferência de energia (calor).
2. **Usar °C na equação do gás:** converta para kelvin sempre que aparecer `PV=nRT` ou uma relação de gases.
3. **Misturar unidades:** transforme litros em `10⁻³ m³`, gramas em quilogramas quando o calor específico estiver em J/kg·K e kPa em Pa quando calcular trabalho em joules.
4. **Aplicar `mcΔT` no patamar:** durante a mudança de fase use `mL`; só use `mcΔT` antes ou depois.
5. **Esquecer o recipiente ou perdas:** verifique a hipótese de sistema isolado e inclua a capacidade térmica fornecida.
6. **Trocar o sinal de `W`:** escreva no início “trabalho feito pelo gás é positivo” e use `ΔU=Q−W` de forma consistente.
7. **Afirmar que adiabático significa isotérmico:** adiabático é `Q=0`; a temperatura pode variar.
8. **Aceitar resultado sem teste:** em mistura, `Tf` deve ficar entre as temperaturas iniciais; rendimento deve estar entre 0 e 1; Kelvin não pode ser negativo no modelo usual.

## Vocabulário essencial

**equilíbrio térmico:** ausência de troca líquida de calor; **temperatura:** medida do estado térmico; **calor específico:** energia por massa e por variação de temperatura; **capacidade térmica:** energia necessária por variação de temperatura do corpo; **calor latente:** energia por unidade de massa na mudança de fase; **dilatação:** aumento dimensional por aquecimento; **estado termodinâmico:** conjunto de variáveis que descreve o sistema; **isotérmico:** temperatura constante; **isobárico:** pressão constante; **isocórico:** volume constante; **adiabático:** sem troca de calor; **sistema:** parte escolhida para análise; **vizinhança:** o que fica fora do sistema; **entropia:** grandeza ligada à reversibilidade e à dispersão de energia; **máquina térmica:** dispositivo que opera em ciclo e converte parte do calor em trabalho.

## Exercícios de estudo autorais

1. Converta 20 °C para Fahrenheit e Kelvin. Explique por que uma diferença de 20 °C equivale a 20 K, mas não a 20 °F.
2. Uma haste de 1,5 m tem `α = 2,0×10⁻⁵ K⁻¹`. Calcule sua variação quando aquecida em 80 K e indique quais hipóteses tornam o cálculo aproximado.
3. Misture massas diferentes de um mesmo líquido em temperaturas distintas. Monte o balanço `ΣQ=0`, determine uma temperatura final simbólica e identifique como mudaria o resultado se o recipiente absorvesse calor.
4. Desenhe a curva de aquecimento de uma substância que começa sólida e termina gasosa. Marque trechos de calor sensível e patamares de calor latente.
5. Um gás passa de `(P,V,T)` para um estado com volume dobrado. Compare os casos de temperatura constante e pressão constante e diga como varia a outra grandeza.
6. Em um diagrama `P–V`, descreva como calcular o trabalho de uma expansão em dois trechos de pressão constante. Explique o significado geométrico da área.
7. Um sistema recebe calor, mas sua energia interna diminui. Que sinal e magnitude mínima o trabalho realizado pelo sistema devem ter? Resolva usando a primeira lei.
8. Compare os rendimentos máximos de Carnot para pares de temperaturas em Celsius e em kelvin. Justifique por que a escala absoluta é obrigatória.
9. Explique, sem usar a expressão “o calor se perde”, por que um processo irreversível pode conservar energia e ainda assim não permitir recuperar todo o trabalho.

## Relação com a prova EEAR

Calor e termodinâmica costuma aparecer em situações objetivas, com dados numéricos curtos, unidades variadas e interpretação de fenômenos cotidianos. Para a EEAR, priorize: conversão entre Celsius, Fahrenheit e Kelvin; Lei Zero e equilíbrio; dilatação linear/volumétrica; calor sensível, capacidade térmica e calor latente; gráficos de aquecimento; equação dos gases ideais e transformações simples; leitura de trabalho em `P–V`; e aplicação direta da primeira lei. Questões avançadas podem combinar duas etapas (por exemplo, aquecer e fundir) ou exigir raciocínio sobre sinais, mas não dispensam uma checagem dimensional.

Uma estratégia eficiente é sublinhar o que permanece constante, converter todos os dados antes de calcular, desenhar um esquema ou gráfico quando houver processo e testar a resposta por limites físicos. Diferencie o que é fornecido no enunciado do que precisa ser inferido: “recipiente isolado” autoriza o balanço de calor; “gás ideal” autoriza `PV=nRT`; “máquina reversível” permite comparar com Carnot. As questões abaixo são autorais/similares e servem para estudo e calibração, não são itens oficiais da EEAR.

## Referências para estudo e calibração

- [Fundação CECIERJ — Introdução às Ciências Físicas 2, módulo de fenômenos térmicos](https://canal.cecierj.edu.br/012016/d4b99c5451211f0f5f7a50379bc79a0f.pdf) — leitura conceitual e experimental; consultar direitos antes de reutilizar.
- [IFCE — programa de disciplina Termodinâmica](https://portal.ifce.edu.br/documents/21166/s4-lf-termodinamica_86CFtJH.pdf) — checklist curricular de leis, entropia e ciclos; referência de calibração.
- [LibreTexts/GSU — 12: Temperature and Heat](https://phys.libretexts.org/Courses/Georgia_State_University/GSU-TM-Physics_I_(2211)/12%3A_Temperature_and_Heat) — OER com teoria e exercícios; verificar a licença de cada página e figura.
- [LibreTexts/UCD — 5: Fundamentals of Thermodynamics](https://phys.libretexts.org/Courses/University_of_California_Davis/UCD%3A_Physics_9B__Waves_Sound_Optics_Thermodynamics_and_Fluids/05%3A_Fundamentals_of_Thermodynamics) — estados, gases, processos e primeira lei; verificar a licença específica.

Este guia foi redigido de forma autoral, sem copiar enunciados, respostas, figuras ou trechos protegidos das referências.
