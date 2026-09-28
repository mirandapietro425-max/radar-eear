# fis-cinematica — Física: Cinemática

**ID do conteúdo:** `fis-cinematica`  
**Área:** Física  
**Escopo:** descrição dos movimentos sem investigar suas causas, com ênfase em referencial, grandezas cinemáticas, movimentos retilíneos, gráficos e movimento circular.

## Objetivo e pré-requisitos

Ao terminar este guia, o estudante deverá ser capaz de escolher um referencial, representar a posição de um móvel, distinguir distância de deslocamento, calcular velocidade e aceleração, reconhecer MRU e MRUV, interpretar gráficos cinemáticos e resolver situações básicas de movimento circular. Também deverá saber conferir unidades, sinais e plausibilidade do resultado.

Antes de começar, é conveniente dominar operações com números positivos e negativos, frações, conversão de unidades (km/h e m/s), leitura de gráficos cartesianos e resolução de equações do primeiro e do segundo grau. A calculadora pode ajudar, mas a modelagem da situação e a análise das unidades devem ser feitas antes da substituição numérica.

## Explicação curta

Cinemática descreve **onde** um corpo está, **como sua posição muda** e **como essa mudança varia no tempo**. Toda afirmação de movimento depende de um referencial: um passageiro sentado está em repouso em relação ao ônibus, mas se move em relação à rua. Em uma dimensão, escolhe-se um eixo e uma origem; a posição é indicada por `x` e o deslocamento por `Δx = x_f − x_i`. A velocidade mede a mudança de posição por tempo, e a aceleração mede a mudança da velocidade por tempo. No MRU, a velocidade é constante; no MRUV, a aceleração é constante.

## Conceitos fundamentais

### Referencial, trajetória e posição

Um referencial é o conjunto de origem, eixo, orientação e relógio usado para descrever o movimento. A trajetória é o conjunto de posições ocupadas pelo móvel no referencial escolhido. Posição não é sinônimo de distância: `x = 0 m` apenas informa que o corpo está na origem naquele instante, não que ele tenha percorrido zero metros.

Em um eixo orientado, o sinal de `x` indica o lado da origem. O mesmo ocorre com velocidade e aceleração: o sinal é relativo à orientação escolhida. Um valor negativo não significa, por si só, “movimento errado”; significa componente orientada para o sentido negativo do eixo.

### Distância percorrida e deslocamento

A distância percorrida é o comprimento total do caminho e nunca é negativa. O deslocamento escalar é a diferença entre posição final e inicial, podendo ser positivo, negativo ou nulo. Se alguém vai 30 m para leste e retorna 10 m, a distância é 40 m, mas o deslocamento, tomando leste como positivo, é `+20 m`. Em uma ida e volta ao ponto inicial, o deslocamento é zero, embora a distância seja maior que zero.

### Velocidade e aceleração

A velocidade média é `v_m = Δx/Δt`. Ela usa deslocamento, não distância, quando se trata de grandeza vetorial ou de sua componente escalar orientada. A rapidez média, por outro lado, é distância total dividida pelo tempo total. A velocidade instantânea é o valor associado a um instante; em um gráfico posição-tempo, corresponde à inclinação da curva naquele ponto.

A aceleração média é `a_m = Δv/Δt`. Aceleração positiva não significa necessariamente que o corpo está aumentando sua rapidez: se a velocidade é negativa e a aceleração é positiva, os sinais são opostos e a rapidez pode diminuir. Para decidir se o móvel acelera ou desacelera em um movimento retilíneo, compare os sinais de `v` e `a`.

## Explicação aprofundada passo a passo

### 1. Organize a situação

Leia o enunciado e identifique móvel, referencial, instante inicial e instante final. Escolha uma orientação e declare-a. Converta as unidades para um sistema coerente, preferencialmente metros, segundos, m/s e m/s². Esboçar uma reta orientada evita trocar posições ou sinais.

### 2. Modele a posição

Para qualquer movimento em uma dimensão, a posição é uma função do tempo, `x(t)`. O deslocamento em um intervalo é `x(t_f) − x(t_i)`. Se a função não for fornecida, use os dados e a hipótese adequada: velocidade constante para MRU ou aceleração constante para MRUV. Nunca aplique uma fórmula de MRUV a uma aceleração variável sem justificativa.

### 3. Resolva MRU

No movimento retilíneo uniforme, `a = 0` e `v` permanece constante. A lei horária é:

`x = x_0 + v t`.

O gráfico `x × t` é uma reta; sua inclinação é `v`. O gráfico `v × t` é uma linha horizontal, e a área algébrica sob ele é o deslocamento. Dois móveis em MRU se encontram quando suas posições são iguais no mesmo instante: escreva uma lei horária para cada um e resolva `x_A(t) = x_B(t)`. O encontro físico só vale se o tempo encontrado estiver no intervalo analisado.

### 4. Resolva MRUV

No MRUV, a aceleração é constante. As relações mais usadas são:

- `v = v_0 + a t`;
- `x = x_0 + v_0 t + (a t²)/2`;
- `v² = v_0² + 2a(x − x_0)` (equação sem tempo);
- `Δx = ((v_0 + v)/2)t`.

A primeira informa como a velocidade evolui; a segunda dá a posição; a terceira é útil quando o tempo não aparece; e a quarta usa a velocidade média do MRUV, que é a média aritmética entre velocidades inicial e final. A equação de Torricelli exige aceleração constante e deslocamento medido na mesma orientação de `a`.

Queda livre é um caso de MRUV em que a aceleração é a gravidade. Perto da superfície terrestre, em exercícios escolares, costuma-se usar `g ≈ 10 m/s²` quando o enunciado não informa outro valor. É necessário definir se o eixo positivo aponta para cima ou para baixo; a gravidade terá sinal coerente com essa escolha.

### 5. Leia os gráficos

No gráfico posição-tempo (`x × t`), a inclinação fornece a velocidade: reta horizontal indica repouso; inclinação positiva, velocidade positiva; inclinação negativa, velocidade negativa. Uma curva cuja inclinação aumenta representa velocidade crescente; a concavidade ajuda a identificar o sinal da aceleração quando o eixo temporal é usual.

No gráfico velocidade-tempo (`v × t`), a inclinação fornece a aceleração e a área algébrica fornece o deslocamento. Áreas acima do eixo são positivas e abaixo são negativas. Para obter distância percorrida a partir de `v × t`, some os módulos das áreas, não apenas a área algébrica. No gráfico aceleração-tempo, a área algébrica fornece `Δv`.

### 6. Movimento circular

No movimento circular uniforme (MCU), o módulo da velocidade é constante, mas sua direção muda; por isso há aceleração centrípeta apontando para o centro. Se `R` é o raio, `T` o período e `f` a frequência:

- `f = 1/T`;
- `ω = 2πf = 2π/T`;
- `v = ωR = 2πR/T`;
- `a_c = v²/R = ω²R`.

A aceleração centrípeta não é uma “velocidade para dentro”: é a variação do vetor velocidade. No MCU, a aceleração tangencial é nula. Se o módulo da velocidade também varia, há aceleração tangencial e o movimento deixa de ser uniforme (MCUV ou outro movimento circular não uniforme).

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — Referencial e sinais

Um elevador sobe em relação ao prédio a `2 m/s`. Uma pessoa permanece parada dentro dele. Para o elevador, a velocidade da pessoa é `0 m/s`; para um observador no prédio, é `+2 m/s`, se o sentido para cima foi escolhido como positivo. A resposta depende do referencial, não de uma contradição física.

### Exemplo 2 — Distância versus deslocamento

Um ciclista sai de `x = 5 m`, vai até `x = 25 m` e termina em `x = 15 m`. O deslocamento é `15 − 5 = +10 m`. A distância é `20 + 10 = 30 m`, pois os dois trechos devem ser somados em módulo. Confundir os dois resultados é um dos erros mais frequentes.

### Exemplo 3 — Encontro em MRU

Dois móveis partem no mesmo instante: A está em `x_A = 10 + 4t` e B em `x_B = 70 − 2t`, com posições em metros e tempo em segundos. No encontro, `10 + 4t = 70 − 2t`; logo `6t = 60`, `t = 10 s`. Substituindo, `x = 50 m`. O resultado deve ser conferido nas duas leis horárias.

### Exemplo 4 — Frenagem em MRUV

Um carro a `18 m/s` freia com aceleração constante `−3 m/s²`. O tempo até parar vem de `0 = 18 − 3t`, portanto `t = 6 s`. O deslocamento é `Δx = 18·6 + (−3·6²)/2 = 54 m`. O sinal da aceleração é negativo porque a orientação positiva coincide com o movimento inicial.

### Exemplo 5 — Gráfico velocidade-tempo

Suponha que `v` cresça linearmente de `0` a `6 m/s` em `3 s` e permaneça em `6 m/s` por mais `2 s`. O deslocamento é a área do triângulo, `3·6/2 = 9 m`, somada à área do retângulo, `2·6 = 12 m`: total `21 m`. A aceleração no primeiro trecho é a inclinação, `6/3 = 2 m/s²`, e no segundo trecho é zero.

### Exemplo 6 — MCU

Uma roda de raio `0,50 m` completa duas voltas por segundo. Então `f = 2 Hz`, `ω = 2π·2 = 4π rad/s` e a rapidez tangencial é `v = ωR = 2π m/s`, aproximadamente `6,28 m/s`. A aceleração centrípeta vale `v²/R = 8π² m/s²`; ela aponta para o centro mesmo quando a rapidez é constante.

## Erros comuns e como corrigi-los

1. **Usar distância no lugar de deslocamento:** marque posições inicial e final e calcule `Δx` antes de somar caminhos.
2. **Ignorar o referencial:** escreva “em relação a quê?” antes de interpretar repouso ou movimento.
3. **Misturar km/h e m/s:** use `1 m/s = 3,6 km/h`; para converter km/h em m/s, divida por 3,6.
4. **Perder sinais:** escolha o sentido positivo e mantenha a convenção em todas as equações.
5. **Aplicar fórmula sem condição:** MRU requer velocidade constante; MRUV requer aceleração constante.
6. **Ler área de `x × t` como deslocamento:** área sob `v × t` dá deslocamento; a inclinação de `x × t` dá velocidade.
7. **Confundir aceleração positiva com aumento de rapidez:** examine simultaneamente os sinais de `v` e `a`.
8. **Dizer que MCU não tem aceleração:** a direção da velocidade muda; há aceleração centrípeta.
9. **Aceitar tempo ou posição impossível:** verifique domínio, unidade e se o móvel realmente está no trecho descrito.

## Vocabulário essencial

- **Móvel:** corpo idealizado cujo movimento é estudado.
- **Referencial:** sistema de coordenadas e relógio usado na descrição.
- **Posição (`x`):** coordenada do móvel no referencial.
- **Trajetória:** conjunto de posições ocupadas.
- **Distância:** comprimento total do caminho.
- **Deslocamento (`Δx`):** diferença entre posição final e inicial.
- **Rapidez:** módulo da velocidade.
- **Velocidade:** taxa de variação da posição, com direção/sentido ou sinal orientado.
- **Aceleração:** taxa de variação da velocidade.
- **MRU:** movimento retilíneo uniforme, com velocidade constante.
- **MRUV:** movimento retilíneo uniformemente variado, com aceleração constante.
- **Período (`T`):** tempo de uma volta ou ciclo.
- **Frequência (`f`):** ciclos por unidade de tempo.
- **Velocidade angular (`ω`):** taxa de variação angular, em rad/s.
- **Aceleração centrípeta:** componente dirigida ao centro da trajetória circular.

## Exercícios de estudo autorais

1. Escolha uma origem e uma orientação para descrever uma aeronave que percorre 800 m para norte e depois retorna 250 m. Determine distância e deslocamento com essa convenção.
2. Um móvel tem `x(t) = −12 + 3t`, em unidades SI. Identifique posição inicial, velocidade e posição no instante `t = 7 s`.
3. Dois ciclistas têm leis `x_1 = 4 + 5t` e `x_2 = 64 − 3t`. Determine quando e onde se encontram e explique por que o encontro não depende de calcular uma distância total.
4. Um objeto parte com `v_0 = 2 m/s` e aceleração `1,5 m/s²` durante 6 s. Calcule velocidade final e deslocamento, conferindo as unidades.
5. Desenhe um gráfico `v × t` de um móvel que anda para leste, para, e depois retorna. Indique o sinal do deslocamento e da distância em cada trecho.
6. Uma bola é lançada verticalmente para cima com `20 m/s`, adotando `g = 10 m/s²`. Determine tempo até o ponto mais alto e altura alcançada, explicitando o eixo escolhido.
7. Uma pista circular tem raio `3 m` e um móvel dá uma volta a cada `2 s`. Calcule frequência, velocidade angular, rapidez tangencial e aceleração centrípeta.
8. Explique, com um exemplo próprio, como um corpo pode ter aceleração positiva e rapidez diminuindo.

## Relação com a prova EEAR

Cinemática é base recorrente para itens de Física de nível médio: antes de estudar dinâmica, energia ou lançamentos, o candidato precisa dominar unidades, sinais, equações horárias e gráficos. Em uma prova no estilo EEAR, o enunciado pode combinar interpretação conceitual com cálculo curto, exigir leitura de `x × t` ou `v × t`, ou inserir uma situação de veículo, queda ou movimento circular. Uma rotina eficiente é: (1) listar dados e unidades; (2) fixar referencial e sentido positivo; (3) reconhecer o modelo (MRU, MRUV ou circular); (4) escolher a equação que usa os dados disponíveis; (5) estimar e conferir a alternativa. Este guia serve para estudo e calibração; não reproduz questões oficiais e nenhuma das referências abaixo é apresentada como prova específica da EEAR.

## Referências e limites de uso

As fontes abaixo foram consultadas para organizar conceitos e calibrar cobertura. O texto deste guia e os exercícios são autorais; não reproduzem trechos, enunciados, soluções ou diagramação das fontes.

1. **Fundação Cecierj, Pré-Vestibular Social, Física, volume 1.** Cobre referencial, deslocamento, MRU, MRUV, gráficos, MCU e MCUV. PDF gratuito; a ficha informa CC BY-NC-ND 4.0, portanto não se deve criar adaptações ou redistribuir exercícios protegidos. URL: <https://canal.cecierj.edu.br/042022/cad642065613839097b51486f3ec3eec.pdf>
2. **Grupo PET-Física UNIFAP, Problemas resolvidos de Física: Volume 1 — Mecânica Parte 1 Cinemática.** Usado apenas para consulta e calibração; o PDF declara copyright e não apresenta licença aberta localizada. URL: <https://www2.unifap.br/editora/files/2023/07/Problemas-resolvidos-de-fisica-parte-1-cinematica-grupo-pet-fisica-unifap.pdf>
3. **Luciano Mentz, Instituto de Física da UFRGS, Cinemática.** Página didática usada para revisão conceitual e interpretação de gráficos; licença de reutilização não localizada. URL: <https://www.if.ufrgs.br/tex/fis01043/20042/Luciano/cinematica.html>

Acesso gratuito não significa domínio público. Para qualquer reprodução ou redistribuição de material das fontes, consulte as condições indicadas pelos respectivos responsáveis.
