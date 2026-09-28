# mat-algebra — Matemática: Álgebra

## Objetivo e pré-requisitos

Este guia reúne as ferramentas de Álgebra mais úteis para a prova da EEAR: interpretar expressões, transformar fórmulas sem alterar seu valor, fatorar, resolver equações e sistemas, analisar inequações e trabalhar com polinômios. O objetivo não é decorar procedimentos isolados, mas reconhecer a estrutura de cada problema, registrar as condições de validade e conferir se a resposta satisfaz o enunciado.

Pressupõe-se domínio de operações com números reais, frações, potências e raízes, prioridade das operações e leitura de intervalos na reta real. Também é importante saber distribuir a multiplicação, reduzir termos semelhantes e resolver uma equação linear simples. Se uma dessas bases estiver insegura, revise-a antes de avançar: erros de sinal e de denominador costumam se propagar por todo o cálculo.

## Conceitos fundamentais — explicação curta

- **Expressão algébrica:** combinação de números, letras e operações, como `2x² - 3x + 1`. A letra representa um número variável ou desconhecido.
- **Termos semelhantes:** têm as mesmas variáveis com os mesmos expoentes. Assim, `4x` e `-7x` podem ser reunidos, mas `x` e `x²` não.
- **Produto notável:** identidade que acelera uma multiplicação, como `(a+b)²=a²+2ab+b²`.
- **Fatoração:** escrita de uma soma ou diferença como produto de fatores; é a operação inversa da distributiva.
- **Equação:** igualdade que só é verdadeira para certos valores. Resolver é encontrar seu conjunto-solução.
- **Inequação:** comparação com `<`, `>`, `≤` ou `≥`. Sua solução costuma ser um intervalo.
- **Sistema:** várias equações ou inequações que devem ser satisfeitas ao mesmo tempo.
- **Polinômio:** soma de monômios com expoentes inteiros não negativos, como `P(x)=x³-2x+5`; seu grau é o maior expoente com coeficiente não nulo.

## Explicação aprofundada, passo a passo

### 1. Expressões, propriedades e produtos notáveis

Comece identificando parênteses, potências e denominadores. A ordem usual é: parênteses (do mais interno para o mais externo), potências, multiplicações/divisões e, por fim, adições/subtrações. A distributiva diz que `k(a+b)=ka+kb`; ao retirar um fator comum, fazemos o caminho inverso: `ka+kb=k(a+b)`.

Para reduzir uma expressão, distribua, calcule potências conhecidas e agrupe somente termos semelhantes. Em uma fração algébrica, não se pode cancelar parcelas: o cancelamento ocorre entre **fatores**, e o denominador original não pode ser zero.

As identidades mais usadas são:

- `(a+b)²=a²+2ab+b²` e `(a-b)²=a²-2ab+b²`;
- `(a+b)(a-b)=a²-b²`;
- `(a+b)³=a³+3a²b+3ab²+b³` e `(a-b)³=a³-3a²b+3ab²-b³`.

Elas valem para quaisquer números reais `a` e `b`; em expressões fracionárias, continuam sujeitas às restrições dos denominadores.

**Exemplo 1 — simplificação:**

`(3x-2)(x+4)-3x²`

1. Pela distributiva, `(3x-2)(x+4)=3x²+12x-2x-8=3x²+10x-8`.
2. Subtraia `3x²`: `3x²+10x-8-3x²=10x-8`.
3. A resposta é `10x-8`; os termos quadráticos se anulam.

**Exemplo 2 — produto notável:**

`(y+5)²-(y-5)²` é uma diferença de quadrados com `a=y` e `b=5`: `[(y+5)-(y-5)] [(y+5)+(y-5)] = 10·2y=20y`. Expandir os dois quadrados também funciona, mas a identidade reduz o risco de erro.

### 2. Fatoração e equações

Fatorar é procurar uma multiplicação escondida. A sequência recomendada é: (a) verificar fator comum; (b) testar diferença de quadrados; (c) reconhecer trinômio quadrado perfeito; (d) em trinômios de segundo grau, buscar dois fatores ou usar a fórmula quadrática; (e) conferir multiplicando de volta.

Fórmulas essenciais para `ax²+bx+c=0`, com `a≠0`, são `Δ=b²-4ac` e `x=(-b±√Δ)/(2a)`. Se `Δ>0`, há duas raízes reais distintas; se `Δ=0`, uma raiz real dupla; se `Δ<0`, não há raízes reais. A fórmula só resolve a equação quando todos os termos estão no mesmo lado e o coeficiente de `x²` foi corretamente identificado.

**Exemplo 3 — equação quadrática:**

`2x²-7x+3=0` tem `a=2`, `b=-7`, `c=3`. Então `Δ=(-7)²-4·2·3=25` e `x=(7±5)/4`. As soluções são `x=3` e `x=1/2`. A substituição rápida confirma: para `3`, `18-21+3=0`; para `1/2`, `1/2-7/2+3=0`.

Em equações fracionárias, registre primeiro os valores proibidos. Por exemplo, em `(x²-9)/(x-3)=4`, exige-se `x≠3`; depois de fatorar o numerador, `(x-3)(x+3)/(x-3)=4`, resulta `x+3=4`, logo `x=1`, que é permitido. Cancelar o fator não torna `x=3` solução.

### 3. Sistemas lineares e não lineares

Num sistema linear, eliminação e substituição são equivalentes. Na eliminação, multiplique uma ou ambas as equações para que uma variável tenha coeficientes opostos; some as equações e depois recupere a outra variável. Uma solução deve satisfazer **todas** as equações.

**Exemplo 4 — sistema linear:**

`x+y=11` e `2x-y=4`. Somando as equações, `3x=15`, portanto `x=5`. Substituindo na primeira, `y=6`. O par `(5,6)` verifica ambas: `5+6=11` e `10-6=4`.

Sistemas podem conter relações não lineares. Se aparecerem `x+y=s` e `xy=p`, observe que `x` e `y` são raízes de `t²-st+p=0`. Em seguida, descarte qualquer par que não respeite as condições originais. Em problemas de texto, defina as incógnitas e traduza unidades antes de montar o sistema.

### 4. Inequações e análise de sinais

Resolva uma inequação como uma equação, mas aplique a regra crítica: ao multiplicar ou dividir por número negativo, inverta o sentido do sinal. Em uma cadeia, faça a operação nos três membros. Para uma inequação quadrática fatorada, marque as raízes na reta, determine o sinal em cada intervalo e escolha os intervalos coerentes com `<`, `>`, `≤` ou `≥`. Raízes de desigualdade não estrita (`≤`, `≥`) entram na solução; raízes estritas (`<`, `>`) ficam de fora.

**Exemplo 5 — sinal de um produto:**

`x²-5x+6<0` fatoriza como `(x-2)(x-3)<0`. O produto é negativo entre as raízes, portanto `2<x<3`. Nos intervalos externos, os dois fatores têm o mesmo sinal e o produto é positivo.

Se houver denominador, inclua também seus zeros na tabela de sinais e nunca os inclua no conjunto-solução. Ao escrever a resposta, use notação de intervalo ou uma desigualdade equivalente.

### 5. Polinômios

Para somar ou subtrair polinômios, agrupe graus iguais. Na multiplicação, cada termo de um fator deve multiplicar cada termo do outro. O **Teorema do Resto** afirma que o resto da divisão de `P(x)` por `x-r` é `P(r)`. Consequentemente, pelo Teorema de D’Alembert, `r` é raiz de `P` se, e somente se, `P(r)=0`; nesse caso, `x-r` é fator.

A divisão sintética (Briot–Ruffini) é prática quando o divisor é `x-r`: organize todos os coeficientes, inclusive zeros de graus ausentes, baixe o primeiro coeficiente e multiplique/some sucessivamente. Para polinômios de grau maior, procure fator comum, agrupamento e raízes inteiras/racionais plausíveis antes de aplicar uma técnica mais longa.

**Exemplo 6 — resto e fator:**

Para `P(x)=x³-2x+5`, o resto da divisão por `x-2` é `P(2)=8-4+5=9`. Como o resto não é zero, `x-2` não é fator. Esse teste evita executar uma divisão completa desnecessária.

## Fórmulas e regras de consulta rápida

1. Distributiva: `a(b+c)=ab+ac`.
2. Diferença de quadrados: `a²-b²=(a-b)(a+b)`.
3. Quadrado da soma/diferença: `(a±b)²=a²±2ab+b²`.
4. Equação linear `ax+b=0`, `a≠0`: `x=-b/a`.
5. Quadrática: `Δ=b²-4ac`; `x=(-b±√Δ)/(2a)`, com `a≠0`.
6. Sistema: operações em uma equação devem preservar a equivalência; ao multiplicar uma inequação por negativo, inverta o sinal.
7. Resto: `P(x)` dividido por `x-r` tem resto `P(r)`.
8. Domínio: todo denominador deve ser diferente de zero; uma raiz quadrada real exige radicando maior ou igual a zero.

## Erros comuns e como corrigi-los

- **Trocar `-(a-b)` por `-a-b`:** distribua o menos a todos os termos: `-a+b`.
- **Esquecer o termo do meio:** `(a+b)²` contém `2ab`; escreva a identidade antes de substituir.
- **Cancelar parcelas:** em `(x+2)/x`, não se cancela `x`; apenas fatores comuns podem ser cancelados, e `x≠0` continua valendo.
- **Não inverter a inequação:** circule toda multiplicação/divisão por número negativo e inverta o sinal imediatamente.
- **Aceitar valor proibido:** anote restrições antes de simplificar e teste a resposta na expressão original.
- **Misturar coeficientes na fórmula de Bhaskara:** coloque parênteses em `b`, sobretudo quando ele é negativo, e calcule o discriminante em uma linha separada.
- **Usar somente uma equação do sistema:** substitua o par final em todas as equações.
- **Confundir grau com quantidade de termos:** `7x⁴-2` tem dois termos, mas grau quatro.

## Vocabulário essencial

**Coeficiente:** número que multiplica a parte literal. **Termo independente:** termo sem variável. **Monômio:** produto de coeficiente e variáveis com expoentes inteiros não negativos. **Polinômio:** soma de monômios. **Grau:** maior expoente relevante. **Raiz/zero:** valor que torna a expressão ou polinômio igual a zero. **Fator:** elemento de uma multiplicação. **Discriminante:** `Δ`, expressão que indica a natureza das raízes quadráticas. **Conjunto-solução:** valores que satisfazem a condição. **Inequação estrita:** usa `<` ou `>`; **não estrita:** usa `≤` ou `≥`. **Sistema possível determinado:** uma solução; **possível indeterminado:** infinitas; **impossível:** nenhuma.

## Exercícios de estudo (autorais)

1. Simplifique `2(3x-1)-[x-(4-2x)]` e indique o coeficiente de `x`.
2. Desenvolva `(2a-3)²` e confira o resultado por multiplicação direta.
3. Fatore completamente `9y²-25`.
4. Resolva `4(2x+1)-3=5x+12`.
5. Resolva `x²-2x-8=0` por fatoração e verifique as raízes.
6. Encontre o par `(x,y)` do sistema `3x+y=14`, `x-y=2`.
7. Resolva `-2≤3x+1<10` e represente o intervalo.
8. Determine o conjunto-solução de `(x-1)(x+4)≥0`.
9. Para `P(x)=2x³-x²+4`, calcule o resto da divisão por `x+1`.
10. Ache o valor de `k` para que `x-3` seja fator de `x³+kx²-9x+27`.

Ao estudar, justifique cada transformação, registre as restrições e faça uma verificação final. Um cálculo correto sem interpretação do conjunto-solução ainda pode produzir uma resposta incompleta.

## Relação com a prova EEAR

Álgebra sustenta muitos itens de Matemática da EEAR, tanto os diretamente algébricos quanto os que pedem modelagem em geometria, funções, progressões ou física. A prova costuma premiar leitura cuidadosa, manipulação sem erro de sinais e escolha de um método eficiente sob limite de tempo. Treine especialmente: produtos notáveis e fatoração para reduzir expressões; equações e sistemas para traduzir situações; inequações para interpretar limites; e polinômios para reconhecer raízes e restos. Em cada item, confira domínio, unidades quando houver grandezas, e se a alternativa responde ao que foi perguntado (raiz, intervalo, parâmetro ou valor numérico).

Uma rotina eficiente é: sublinhar dados e restrições; definir incógnitas; escolher identidade, eliminação, fatoração ou fórmula; calcular em linhas curtas; testar a resposta. Os exercícios deste guia são autorais e servem para estudo e calibração, não são questões oficiais da EEAR.

## Referências e limites de uso

As referências abaixo foram consultadas para selecionar a abrangência e calibrar o nível; o texto, os exemplos e os exercícios deste guia são autorais e não reproduzem trechos, questões ou soluções das fontes.

1. **Matemática Básica — UFSC/UFAB**, unidades sobre produtos notáveis, equações e inequações: [PDF institucional](https://canal.cecierj.edu.br/012016/d1eab99681feeb983a44471df9e2d1d3.pdf).
2. **Polinômios e Equações Polinomiais — CECIERJ**, operações, resto, D’Alembert, raízes e fatoração: [roteiro didático](https://canal.cecierj.edu.br/012016/208b6a9289c8e8f001ef1de6f5c6875f.pdf).
3. **Álgebra — Material Didático, Nível 2 — UFPR/POTI**, expressões, produtos, equações, sistemas e inequações: [material didático](https://poti.ufpr.br/wp-content/uploads/2022/11/algebra_n2.pdf).
4. **Álgebra Elementar — UFC/FUNCAP/SEDUC**, simplificação, fatoração, produtos notáveis e inequações quadráticas: [caderno didático](https://www.ced.seduc.ce.gov.br/wp-content/uploads/sites/82/2022/03/caderno06_deAluno.pdf).

Os registros do índice informam acesso gratuito, mas não licença aberta uniforme. Portanto, as fontes são citadas para estudo/calibração, sem autorização presumida para redistribuir ou adaptar os PDFs. A relação com a EEAR é uma calibração pedagógica; este material não é oficial da Força Aérea Brasileira.
