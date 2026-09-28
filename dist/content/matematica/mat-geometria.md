# mat-geometria — Matemática: Geometria plana

**ID do conteúdo:** `mat-geometria`  
**Escopo:** geometria plana para estudo e preparação da prova EEAR

## Objetivo e pré-requisitos

Este guia tem como objetivo desenvolver a leitura de figuras planas, a escolha de estratégias e o cálculo de ângulos, comprimentos, perímetros e áreas. Ao final, o estudante deve conseguir decompor uma figura, reconhecer relações entre retas e triângulos, justificar o uso de uma fórmula e verificar se a resposta é compatível com o desenho.

É desejável dominar operações com frações e decimais, razão e proporção, equações lineares, potenciação, radiciação e conversão de unidades. Também é importante distinguir comprimento (unidade linear), área (unidade quadrada) e medida angular (graus ou radianos, quando indicados). A figura não precisa estar desenhada em escala: os dados do enunciado, e não uma medição visual, determinam a solução.

## Explicação curta

Geometria plana estuda figuras em uma superfície. A maioria dos problemas pode ser organizada em quatro movimentos: **identificar relações** (por exemplo, ângulos suplementares ou lados paralelos), **reduzir a figura a triângulos e formas conhecidas**, **aplicar uma relação válida nas condições dadas** e **conferir unidades e plausibilidade**. Triângulos são a peça central: somam 180° nos ângulos internos, permitem usar semelhança e, quando retângulos, o teorema de Pitágoras.

## Conceitos fundamentais

### 1. Ângulos e retas

Um ângulo mede uma abertura. Ângulos complementares somam 90°; suplementares somam 180°. Ângulos opostos pelo vértice são congruentes. Se duas retas paralelas são cortadas por uma transversal, ângulos correspondentes e alternos internos são congruentes, enquanto ângulos colaterais internos são suplementares. Em qualquer polígono, um ângulo externo é formado ao prolongar um lado; ele é suplementar ao ângulo interno adjacente.

### 2. Triângulos

Quanto aos lados, podem ser equiláteros, isósceles ou escalenos; quanto aos ângulos, acutângulos, retângulos ou obtusângulos. A soma dos ângulos internos é 180°. No isósceles, os ângulos da base são iguais; no equilátero, cada ângulo mede 60°. O maior lado fica oposto ao maior ângulo. A desigualdade triangular exige que cada lado seja menor que a soma dos outros dois.

A **congruência** significa mesma forma e mesmo tamanho; critérios usuais são LLL, LAL e ALA (e, para triângulos retângulos, hipotenusa-cateto). A **semelhança** significa mesma forma, possivelmente em escala diferente; ângulos correspondentes são iguais e lados correspondentes são proporcionais.

### 3. Polígonos e quadriláteros

Um polígono simples tem lados que não se cruzam. A soma dos ângulos internos de um polígono de `n` lados é `(n − 2)·180°`. Se for regular, cada ângulo interno vale `(n − 2)·180°/n`, cada ângulo externo vale `360°/n` e todos os lados e ângulos são iguais. Quadriláteros têm soma interna de 360°. No paralelogramo, lados opostos e ângulos opostos são iguais; no retângulo, há quatro ângulos retos; no losango, quatro lados iguais; no quadrado, as duas propriedades.

### 4. Circunferência e círculo

A circunferência é a linha fechada; o círculo é a região interior. O raio `r` liga o centro à circunferência, e o diâmetro `d` vale `2r`. O comprimento da circunferência é `C = 2πr = πd`, e a área do círculo é `A = πr²`. Um arco pode ser associado a um ângulo central: setor de ângulo `θ` (em graus) tem área `(θ/360°)·πr²` e comprimento de arco `(θ/360°)·2πr`. Essas frações só fazem sentido se `θ` for o ângulo central do setor considerado.

## Explicação aprofundada: método passo a passo

1. **Traduza o enunciado.** Faça um esboço, nomeie vértices, marque paralelismo, perpendicularidade, lados iguais e ângulos conhecidos. Registre a unidade de cada dado.
2. **Procure uma soma ou igualdade imediata.** Use 180° em um triângulo, 360° em um quadrilátero, ângulos opostos pelo vértice, pares em paralelas e propriedades de isósceles.
3. **Escolha a menor figura útil.** Uma diagonal pode dividir um quadrilátero em dois triângulos; uma altura pode produzir dois triângulos retângulos; um raio pode dividir um setor em triângulos.
4. **Teste semelhança antes de calcular comprimentos.** Paralelas cortadas por transversais sugerem Tales; ângulos iguais e um lado proporcional sugerem triângulos semelhantes. Ordene os vértices correspondentes antes de montar a proporção.
5. **Aplique a fórmula com suas condições.** Pitágoras requer triângulo retângulo; área de trapézio requer as duas bases paralelas e a altura perpendicular; a fórmula de Heron requer os três lados de um triângulo válido.
6. **Resolva simbolicamente quando possível.** Manter `π`, frações e raízes durante os passos reduz arredondamentos. Só aproxime ao final se o enunciado pedir.
7. **Faça o controle final.** Área deve estar em cm², m² etc.; perímetro e raio, em cm, m etc. Uma área de um triângulo não pode exceder a de um retângulo que o contenha, e um lado não pode violar a desigualdade triangular.

### Fórmulas e regras essenciais

- **Perímetro:** soma dos comprimentos dos lados. Em um polígono regular de lado `l`, `P = n·l`.
- **Retângulo:** `A = b·h`; **paralelogramo:** `A = b·h`, com `h` perpendicular à base; **triângulo:** `A = b·h/2`; **trapézio:** `A = (B+b)·h/2`, com `B` e `b` paralelas.
- **Losango:** `A = D·d/2`, usando as diagonais; **quadrado:** `A = l²` e diagonal `l√2`.
- **Pitágoras:** em triângulo retângulo, `hipotenusa² = cateto₁² + cateto₂²`. A hipotenusa é sempre o lado oposto ao ângulo de 90°.
- **Relações métricas no triângulo retângulo:** se a altura à hipotenusa divide-a em segmentos `p` e `q`, então `h² = p·q`, `cateto₁² = (p+q)·p` e `cateto₂² = (p+q)·q`.
- **Semelhança:** se a razão linear entre figuras é `k`, comprimentos correspondentes multiplicam por `k` e áreas correspondentes por `k²`. Não confunda razão de áreas com razão de lados.
- **Heron:** para lados `a,b,c` e semiperímetro `s=(a+b+c)/2`, `A=√[s(s−a)(s−b)(s−c)]`. Use apenas se os três lados formarem triângulo.
- **Polígono regular:** `A = P·ap/2`, em que `ap` é o apótema perpendicular a um lado. Para calcular uma área, confirme se o apótema foi dado ou pode ser obtido por um triângulo retângulo.

## Exemplos autorais resolvidos

### Exemplo 1 — ângulos em um triângulo
Um triângulo isósceles tem lados iguais que se encontram no vértice `A`, e o ângulo externo em `A`, formado pelo prolongamento de um lado, mede 124°. O ângulo interno `A` mede `180°−124°=56°`. Como os ângulos da base são iguais, cada um vale `(180°−56°)/2=62°`. A verificação é `56°+62°+62°=180°`.

### Exemplo 2 — semelhança e área
Uma maquete é semelhante ao objeto real na razão maquete:real `= 2:5`. Se a área da maquete é 48 cm², a razão de áreas é `(2/5)²=4/25`. Portanto, a área real é `48·25/4=300 cm²`. O erro típico seria multiplicar por `5/2`, aplicável a comprimentos, não diretamente a áreas.

### Exemplo 3 — diagonal e área de um retângulo
Um retângulo tem diagonal 13 cm e um lado 5 cm. A diagonal divide-o em triângulo retângulo, então o outro lado `x` satisfaz `5²+x²=13²`; logo `x²=144` e `x=12 cm`. O perímetro é `2(5+12)=34 cm`, e a área é `5·12=60 cm²`. A raiz negativa não representa comprimento.

### Exemplo 4 — polígono regular
Um octógono regular tem lado 3 cm e apótema 3,62 cm. O perímetro é `8·3=24 cm`; pela fórmula `A=P·ap/2`, a área é `24·3,62/2=43,44 cm²`. Se o apótema não fosse fornecido, seria preciso obtê-lo dividindo o octógono em oito triângulos congruentes e usando trigonometria ou Pitágoras, conforme os dados disponíveis.

### Exemplo 5 — setor circular
Um setor tem raio 6 cm e ângulo central de 60°. Sua área é `(60/360)·π·6²=6π cm²`. O comprimento do arco é `(60/360)·2π·6=2π cm`. Não se deve usar `60/360` para uma medida que seja ângulo inscrito sem antes convertê-la no ângulo central correspondente.

### Exemplo 6 — figura composta
Uma placa é formada por um retângulo de 10 cm por 6 cm e um semicírculo de diâmetro 10 cm apoiado em um de seus lados. A área é `60 + (1/2)π·5² = 60 + 12,5π cm²`. Para o contorno externo, somam-se os três lados expostos do retângulo (`10+6+6`) e o arco semicircular (`π·5`), sem contar o diâmetro interno compartilhado. Assim, `P=22+5π cm`.

## Erros comuns e como corrigi-los

- **Medir a figura com a régua:** desenhos podem ser esquemáticos. Use somente medidas e relações declaradas.
- **Trocar raio por diâmetro:** escreva `d=2r` antes de aplicar `πd` ou `πr²`.
- **Usar Pitágoras em qualquer triângulo:** identifique explicitamente o ângulo reto.
- **Usar a altura inclinada:** em áreas, altura é a distância perpendicular à base, não um lado oblíquo.
- **Misturar perímetro e área:** perímetro soma comprimentos; área mede região e tem unidade ao quadrado.
- **Montar proporções fora de correspondência:** liste primeiro os pares de vértices e lados equivalentes.
- **Esquecer escala ao quadrado:** se o lado dobra, a área quadruplica.
- **Arredondar cedo demais:** mantenha frações, raízes e `π` até a última etapa.
- **Aceitar raiz ou comprimento impossível:** descarte valores negativos e confira desigualdade triangular e intervalo geométrico.

## Vocabulário essencial

**Vértice:** ponto onde lados se encontram. **Lado:** segmento que delimita um polígono. **Diagonal:** segmento entre vértices não consecutivos. **Altura:** segmento perpendicular à base (ou sua extensão). **Mediatriz:** reta perpendicular a um segmento em seu ponto médio. **Bissetriz:** semirreta que divide um ângulo em duas partes iguais. **Apótema:** raio do centro de um polígono regular até o lado, perpendicular a ele. **Corda:** segmento com extremidades na circunferência. **Arco:** parte da circunferência. **Tangente:** reta que toca a circunferência em um ponto e é perpendicular ao raio nesse ponto. **Congruente:** mesma forma e tamanho. **Semelhante:** mesma forma com razão de escala constante. **Semiperímetro:** metade do perímetro. **Região composta:** união de figuras cuja área pode ser somada ou subtraída.

## Exercícios de estudo autorais

1. Duas retas paralelas são cortadas por uma transversal. Um ângulo agudo mede 37°. Determine os quatro valores distintos que aparecem na figura e justifique cada relação.
2. Em um triângulo, os ângulos são `x`, `2x+10°` e `3x−10°`. Encontre `x` e classifique o triângulo quanto aos ângulos.
3. Um triângulo retângulo tem catetos 9 cm e 12 cm. Calcule hipotenusa, perímetro e área; depois verifique a desigualdade triangular.
4. Um segmento paralelo à base de um triângulo cria uma figura menor cuja razão linear com o triângulo original é 3/5. Se a área do triângulo menor é 27 cm², determine a área do original.
5. Um trapézio tem bases 14 m e 8 m e área 99 m². Descubra sua altura e explique por que a fórmula usada exige bases paralelas.
6. Um hexágono regular de lado 4 cm é decomposto em seis triângulos pelo centro. Descreva como obter sua área sem decorar uma fórmula específica.
7. Uma circunferência de raio 10 cm contém um setor de 144°. Calcule a área do setor e o comprimento do arco em termos de `π`.
8. Uma figura é um quadrado de lado 8 cm com um círculo de raio 2 cm retirado de seu interior. Expresse área restante e discuta quais dados seriam necessários para calcular o perímetro do contorno restante.
9. Um quadrilátero tem diagonais perpendiculares de 10 cm e 16 cm. Sob quais condições a expressão `D·d/2` fornece sua área? Justifique antes de calcular.
10. Crie um esboço em que dois triângulos sejam semelhantes por AA, nomeie os lados correspondentes e escreva duas proporções equivalentes.

## Relação com a prova EEAR

A geometria plana é adequada a itens de prova que combinam leitura rápida de figura, álgebra elementar e aplicação de propriedades. Para a EEAR, treine especialmente ângulos, triângulos, semelhança/Tales, Pitágoras, quadriláteros, polígonos, circunferência, perímetros e áreas. O diferencial não é decorar uma lista longa, mas reconhecer qual relação reduz o problema: uma diagonal, uma altura, um par de paralelas ou uma composição de áreas costuma ser a chave.

Em simulados, marque a unidade e faça uma estimativa antes de olhar as alternativas. Se todas as opções têm `π`, não o substitua por 3,14 sem necessidade; se a questão pede comprimento, descarte respostas em cm². Reserve tempo para revisar correspondência em semelhança e para checar se a hipotenusa foi identificada. As fontes listadas abaixo fundamentam conceitos e teoremas, mas não constituem uma tabela de incidência da EEAR; o índice consultado registra explicitamente essa lacuna. As questões produzidas para este conteúdo são autorais/similares, não oficiais.

## Referências

As referências são usadas para estudo e calibração. Não foram copiados enunciados, soluções, figuras ou trechos protegidos.

- [Fundamentos da Geometria — ICMC/USP](https://sites.icmc.usp.br/manfio/GeoAxiomatica.pdf) — notas em português sobre ângulos, triângulos, semelhança, polígonos, circunferência, áreas e teoremas; licença não localizada, portanto referência de consulta/calibração.
- [Um Curso de Geometria Euclidiana Plana — UFU](https://repositorio.ufu.br/handle/123456789/25320) — curso didático de 2013, com acesso aberto e licença CC BY-NC-ND 3.0 US; usado para fundamentação, sem adaptação de exercícios ou figuras.
- [Técnicas de problemas olímpicos de geometria plana — UFPA](https://livroaberto.ufpa.br/items/be3babdc-ae14-4ea5-9d30-4fa32030e61f) — e-book de 2019 sob CC BY 4.0 salvo ressalvas; usado para aprofundar relações e calibrar itens avançados, sem copiar problemas.
- [Fundamentos de Geometria Plana — CAED-UFMG](https://www.ime.usp.br/~afisher/ps/MAT0230/Fundamentos_de_geometria_planaMachado.pdf) — material didático com ângulos, circunferências, quadriláteros, áreas, semelhança e Pitágoras; licença aberta não localizada, usado apenas para estudo/calibração.
