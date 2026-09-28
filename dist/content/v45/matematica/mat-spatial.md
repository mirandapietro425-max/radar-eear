# mat-spatial — Matemática: Geometria espacial

**ID de integração:** `mat-spatial`  
**Área:** Matemática  
**Escopo:** sólidos, áreas, volumes, seções e relações métricas em três dimensões.

## Objetivo e pré-requisitos

Ao estudar este guia, o estudante deve ser capaz de reconhecer um sólido, escolher um modelo geométrico, identificar as medidas relevantes e calcular áreas, volumes ou comprimentos com unidades coerentes. Também deve conseguir interpretar cortes paralelos ou perpendiculares às bases e justificar relações métricas sem depender apenas de memorização.

Antes de começar, revise: operações com frações e radicais; razão e proporção; conversão de unidades; área e perímetro de figuras planas; Teorema de Pitágoras; semelhança de triângulos; propriedades de circunferência e círculo. É útil saber que `π` pode ser mantido em forma exata, salvo quando o enunciado pedir aproximação.

## Explicação curta

Um sólido espacial ocupa uma região do espaço. **Área** mede uma superfície e é expressa em unidades quadradas; **volume** mede o espaço ocupado e é expresso em unidades cúbicas. Em prismas e cilindros, o volume é a área da base multiplicada pela altura. Em pirâmides e cones, o volume é um terço desse produto. A esfera é tratada por fórmulas próprias. A altura é sempre a distância **perpendicular** entre planos ou entre vértice e base; uma aresta inclinada não pode ser usada como altura sem justificativa.

A estratégia geral é: (1) desenhar ou decompor o sólido; (2) nomear raio, diâmetro, altura, geratriz ou apótema; (3) escolher a fórmula que corresponde ao sólido; (4) conferir unidades, escala e plausibilidade do resultado.

## Conceitos fundamentais

- **Base:** face ou região plana que serve de referência. Um sólido pode ter duas bases congruentes (prisma/cilindro) ou uma base e um vértice oposto (pirâmide/cone).
- **Altura `h`:** distância perpendicular entre as bases de um prisma/cilindro ou do vértice ao plano da base de uma pirâmide/cone.
- **Raio `r` e diâmetro `d`:** numa circunferência, `d = 2r`. Não confunda o diâmetro com o raio.
- **Geratriz `g`:** segmento inclinado na superfície lateral de um cone; no cone reto, `g² = h² + r²`.
- **Apótema lateral `a_l`:** altura de uma face lateral regular de uma pirâmide. Em uma pirâmide reta de base quadrada de lado `s`, `a_l² = h² + (s/2)²`.
- **Área lateral:** soma das faces laterais. **Área total:** área lateral mais as áreas das bases, respeitando as bases efetivamente expostas.
- **Seção:** figura obtida pelo corte de um sólido por um plano. Um corte paralelo à base de um cone ou pirâmide produz uma figura semelhante à base (um círculo ou um polígono semelhante); um corte perpendicular pode produzir retângulos, triângulos ou outras figuras, dependendo da posição.
- **Sólido composto:** união ou diferença de sólidos simples. Divida em partes, calcule cada medida e some ou subtraia apenas regiões que pertencem ao sólido final.

## Explicação aprofundada passo a passo

### 1. Modelar e uniformizar unidades

Leia o enunciado procurando a forma espacial e as medidas dadas. Converta todas as dimensões antes de calcular: `1 m = 100 cm`, portanto `1 m² = 10.000 cm²` e `1 m³ = 1.000.000 cm³`. Escreva a unidade no resultado. Em problemas de capacidade, lembre que `1 dm³ = 1 L` e `1 cm³ = 1 mL`.

Verifique se o desenho usa perspectiva: a aresta que parece vertical nem sempre é a altura real. A altura é indicada por perpendicularidade ou deve ser encontrada por Pitágoras. Se a questão fornecer um raio, não o duplique; se fornecer o diâmetro, divida-o por dois.

### 2. Prismas e paralelepípedos

Um prisma tem duas bases paralelas e congruentes. Para qualquer prisma,

- `V = A_b · h`;
- `A_l = P_b · h` quando o prisma é reto;
- `A_t = A_l + 2A_b` para um prisma com as duas bases expostas.

No paralelepípedo retângulo de dimensões `a`, `b` e `c`, `V = abc` e `A_t = 2(ab + ac + bc)`. O cubo de aresta `a` tem `V = a³` e `A_t = 6a²`. Se uma base é triangular, primeiro calcule `A_b = b_base · h_triângulo / 2`; depois aplique o produto pela altura do prisma.

### 3. Pirâmides e troncos

Uma pirâmide tem uma base e faces laterais triangulares que convergem para um vértice. Seu volume é

`V = (A_b · h)/3`.

Em pirâmide regular reta, a área lateral pode ser calculada por `A_l = (P_b · a_l)/2`. A área total é `A_b + A_l`. A apótema lateral não é a altura da pirâmide: elas formam, com metade de uma dimensão da base, um triângulo retângulo.

Ao cortar uma pirâmide paralelamente à base, surge um tronco. Se as áreas das bases são `A_1` e `A_2` e a altura é `h`, use a fórmula:

`V = h(A_1 + √(A_1A_2) + A_2)/3`.

Para bases quadradas ou circulares, pode ser mais seguro obter a diferença entre a pirâmide/cone grande e a parte retirada, desde que as alturas sejam determinadas pela semelhança.

### 4. Cilindros e cones

O cilindro circular reto possui duas bases circulares. Assim, `A_b = πr²`, `V = πr²h`, `A_l = 2πrh` e `A_t = 2πr(h + r)`. Se o recipiente está aberto em uma extremidade, não inclua a área dessa tampa.

O cone circular reto tem uma base e um vértice. O volume é `V = πr²h/3`. A geratriz satisfaz `g² = h² + r²`; a área lateral é `A_l = πrg` e a total é `A_t = πr(g + r)`. A fórmula do volume usa a altura perpendicular, não a geratriz. Um cone e um cilindro com a mesma base e a mesma altura têm volumes na razão `1:3`.

### 5. Esferas e sólidos esféricos

Para uma esfera de raio `r`,

- área da superfície: `A = 4πr²`;
- volume: `V = 4πr³/3`.

A área usa unidade quadrada e o volume, cúbica. Se o problema informa o diâmetro, substitua `r = d/2`. Em uma esfera inscrita em um cubo, o diâmetro da esfera é igual à aresta do cubo. Em uma esfera circunscrita a um cubo, o diâmetro é a diagonal espacial do cubo, `a√3`.

### 6. Seções, semelhança e relações métricas

Uma seção paralela à base de uma pirâmide ou cone mantém a forma da base, mas muda de escala. Se o fator linear é `k`, comprimentos correspondentes multiplicam-se por `k`, áreas por `k²` e volumes por `k³`. Essa regra evita comparar diretamente áreas e alturas sem levar em conta a escala.

No cone reto, a secção meridiana é um triângulo isósceles; metade dela fornece o triângulo retângulo de `r`, `h` e `g`. Em prismas retos, um corte perpendicular às bases pode mostrar um retângulo cuja dimensão longitudinal é a altura do prisma. Nos sólidos compostos, uma seção ou vista superior frequentemente revela a base necessária para começar o cálculo.

O princípio de Cavalieri justifica comparações: se dois sólidos têm a mesma altura e áreas de seções correspondentes iguais em todos os níveis, então têm o mesmo volume. Em particular, a relação de um terço entre pirâmide e prisma de mesma base e altura pode ser usada para conferir resultados, não para trocar uma altura inclinada pela perpendicular.

## Fórmulas e condições de uso

| Sólido ou situação | Fórmula principal | Condição/observação |
|---|---|---|
| Prisma | `V = A_bh` | `h` perpendicular às bases |
| Prisma reto | `A_l = P_bh` | perímetro da base vezes altura |
| Pirâmide | `V = A_bh/3` | `h` do vértice ao plano da base |
| Cilindro reto | `V = πr²h` | duas bases circulares congruentes |
| Cone reto | `V = πr²h/3` | `g` serve para área lateral, não volume |
| Esfera | `A = 4πr²`, `V = 4πr³/3` | `r` é o raio |
| Cone reto | `g² = h² + r²` | triângulo retângulo meridiano |
| Escala | comprimento `k`, área `k²`, volume `k³` | figuras semelhantes |

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — paralelepípedo e unidades

Uma caixa retangular mede `3 cm × 4 cm × 5 cm`. O volume é `V = 3·4·5 = 60 cm³`. A área total é `2(3·4 + 3·5 + 4·5) = 2(12 + 15 + 20) = 94 cm²`. O resultado distingue corretamente capacidade espacial de revestimento da superfície.

### Exemplo 2 — pirâmide quadrada regular

Considere lado da base `6 cm` e altura perpendicular `4 cm`. A base tem área `36 cm²`, logo `V = 36·4/3 = 48 cm³`. Para a área lateral, a apótema é `a_l = √(4² + 3²) = 5 cm`. Cada face lateral tem área `6·5/2 = 15 cm²`; quatro faces totalizam `60 cm²`. Assim, a área total é `36 + 60 = 96 cm²`.

### Exemplo 3 — cilindro e cone com a mesma base

Com `r = 3 m` e `h = 8 m`, o cilindro tem `V = π·3²·8 = 72π m³`. Um cone com as mesmas medidas tem `V = 72π/3 = 24π m³`. Não é necessário calcular a geratriz para o volume. A comparação mostra por que o fator `1/3` aparece no cone.

### Exemplo 4 — esfera inscrita em cubo

Uma esfera ocupa exatamente o interior de um cubo de aresta `10 cm`. Seu diâmetro vale `10 cm`, portanto `r = 5 cm`. A área é `4π·25 = 100π cm²` e o volume é `4π·125/3 = 500π/3 cm³`. Usar `r = 10` dobraria o raio e produziria erros por fatores diferentes em área e volume.

### Exemplo 5 — geratriz do cone

Se `r = 5 cm` e `h = 12 cm`, a geratriz é `g = √(5² + 12²) = 13 cm`. A área lateral vale `π·5·13 = 65π cm²`; a base vale `25π cm²`, então a área total é `90π cm²`. O volume é `π·25·12/3 = 100π cm³`, calculado com `h`, não com `g`.

## Erros comuns e como corrigi-los

1. **Usar diâmetro como raio:** escreva primeiro `r = d/2`.
2. **Usar aresta inclinada como altura:** procure o segmento perpendicular; se necessário, aplique Pitágoras.
3. **Esquecer o terço:** associe pirâmide e cone ao modelo “base vezes altura dividido por 3”.
4. **Misturar área e volume:** conte dimensões; `cm²` não pode ser somado a `cm³`.
5. **Somar tampas que não existem:** em recipientes abertos, conte apenas superfícies expostas.
6. **Confundir geratriz com altura:** geratriz aparece em áreas laterais de cones; altura aparece no volume.
7. **Aplicar escala linear a volume:** em figuras semelhantes, volume varia com `k³`, não com `k`.
8. **Arredondar cedo demais:** conserve `π` e radicais até a última etapa para não alterar a alternativa correta.

## Vocabulário essencial

**Base**, **altura perpendicular**, **prisma**, **paralelepípedo**, **pirâmide**, **tronco**, **cilindro**, **cone**, **esfera**, **raio**, **diâmetro**, **geratriz**, **apótema**, **área lateral**, **área total**, **volume**, **seção**, **sólidos semelhantes**, **sólido composto**, **inscrito** (contido tocando a superfície) e **circunscrito** (envolvendo o outro sólido).

## Exercícios de estudo (sem gabarito)

1. Uma piscina em forma de prisma retangular mede `2,5 m`, `4 m` e `1,2 m`. Calcule sua capacidade em litros.
2. Determine a área total de um cubo de aresta `7 cm` e compare-a com o volume numericamente, explicando por que as unidades são diferentes.
3. Uma pirâmide regular de base triangular equilátera tem lado conhecido e altura dada. Monte uma expressão para volume e outra para área lateral, indicando a informação adicional necessária.
4. Um cilindro de raio `4 cm` e altura `10 cm` é comparado a um cone de mesmo raio e altura. Encontre a diferença entre os volumes.
5. Uma embalagem cilíndrica é aberta no topo. Escreva a área de material necessária em função de `r` e `h` e explique quais superfícies entram na conta.
6. Em um cone reto, `r = 9 cm` e `g = 15 cm`. Encontre a altura e depois o volume exato.
7. Uma seção paralela à base de uma pirâmide tem fator linear `2/5` em relação à base. Que fração da área da base e do volume da pirâmide correspondente ela representa?
8. Um cubo de aresta `a` contém uma esfera inscrita. Compare, em forma exata, os volumes do cubo e da esfera e interprete a diferença.

## Relação com a prova EEAR

Para a preparação da EEAR, este conteúdo é útil porque treina leitura de diagramas, escolha rápida de fórmulas, proporcionalidade, Pitágoras e controle de unidades. Questões de nível intermediário costumam ser resolvidas ao identificar base, altura e sólido; itens avançados podem combinar decomposição, semelhança, seções ou uma medida escondida em um triângulo retângulo. Em prova, desenhe uma figura auxiliar, marque o que é perpendicular, mantenha `π` simbólico quando possível e confira se a alternativa tem dimensão correta. O conjunto de questões associado a este ID é **autoral/similar**, usado para estudo e calibração, e não reproduz item oficial.

## Referências para estudo e calibração

As explicações acima são autorais e não reproduzem trechos, exercícios, respostas ou figuras das fontes. Consulte as referências respeitando as licenças indicadas no índice de pesquisa:

- [Um Curso de Geometria Euclidiana Espacial — UFU](https://repositorio.ufu.br/bitstream/123456789/25348/1/Geometria%20Espacial.pdf) e [registro no Repositório UFU](https://repositorio.ufu.br/handle/123456789/25348).
- [OpenStax Prealgebra 2e — §9.6 Volume and Surface Area](https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area).
- [Mathematics LibreTexts/NROC — 7.3.1 Solids](https://math.libretexts.org/Bookshelves/Applied_Mathematics/Developmental_Math_(NROC)/07%3A_Geometry/7.03%3A_Volume_of_Geometric_Solids/7.3.01%3A_Solids).
- [Solid Geometry with Problems and Applications — Project Gutenberg](https://www.gutenberg.org/ebooks/29807), com [PDF](https://www.gutenberg.org/files/29807/29807-pdf.pdf) e [fonte TeX](https://www.gutenberg.org/files/29807/29807-t/29807-t.tex).

**Nota de direitos:** acesso gratuito ou público não elimina condições de licença, atribuição ou restrições territoriais. As fontes servem para estudo e calibração; este guia e suas questões são redação autoral.
