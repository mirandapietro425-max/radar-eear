# mat-progressions — Matemática: Progressões e funções

**ID do conteúdo:** `mat-progressions`  
**Área:** Matemática  
**Escopo:** sequências, PA, PG, funções afim, quadrática, exponencial e logarítmica, gráficos e composição.

## Objetivo e pré-requisitos

Ao terminar este guia, o estudante deverá reconhecer padrões, modelá-los por sequências e funções, escolher fórmulas, interpretar gráficos e justificar resultados. Também deverá distinguir crescimento aditivo de multiplicativo e relacionar PA a função afim e PG a função exponencial.

É conveniente dominar operações com inteiros, frações, potências e raízes, equações do primeiro e do segundo grau, coordenadas e leitura de gráficos. Logaritmos exigem compreender expoentes e condições de existência.

## Explicação curta

Uma **sequência** associa a cada posição natural um número. Em uma progressão aritmética (PA), cada termo resulta do anterior pela soma de uma diferença constante `r`; em uma progressão geométrica (PG), pela multiplicação por uma razão constante `q`. A PA produz variação linear, enquanto a PG produz variação exponencial. Funções descrevem entradas e saídas: a função afim tem taxa de variação constante, a quadrática tem variação da taxa e gráfico parabólico, a exponencial multiplica a saída quando a entrada aumenta uma unidade e a logarítmica desfaz a exponencial. Composição significa aplicar uma função depois de outra.

## Conceitos fundamentais

### 1. Sequências e PA

Uma sequência é escrita como `(a_n)`, em que `n` indica a posição e `a_n` o termo correspondente. Uma regra pode ser **recursiva**, como `a_1 = 5` e `a_{n+1}=a_n+3`, ou **explícita**, como `a_n=3n+2`. Antes de calcular, confira se a posição começa em `n=0` ou `n=1`.

Na PA, a diferença entre termos consecutivos é constante:

`a_{n+1}-a_n=r`.

Para uma PA iniciada em `a_1`, o termo geral é

`a_n=a_1+(n-1)r`.

A soma dos `n` primeiros termos pode ser obtida pareando primeiro e último:

`S_n = n(a_1+a_n)/2`.

Essas fórmulas pressupõem uma PA e uma contagem coerente de termos. Se a sequência for crescente, `r>0`; se for decrescente, `r<0`; se `r=0`, é constante. Em uma PA, o termo central de três termos equidistantes é a média aritmética dos extremos.

Uma PA também é uma função afim restrita a posições inteiras positivas: `a_n=a_1+(n-1)r`. Assim, o coeficiente de `n` é a taxa de variação por posição. Essa ligação é útil para interpretar tabelas, mas não autoriza substituir automaticamente `n-1` por `n` sem ajustar o primeiro termo.

### 2. PG

Na PG, a razão entre termos consecutivos é constante, desde que o divisor seja não nulo:

`a_{n+1}/a_n=q`.

Com `a_1` dado, o termo geral é

`a_n=a_1 q^{n-1}`.

Para `q>1` e `a_1>0`, há crescimento; para `0<q<1`, decrescimento positivo. Razões negativas alternam o sinal. Se `q=1`, a sequência é constante; se `q=0`, depois do primeiro termo todos os termos são zero, e a expressão de razão não deve ser usada nos termos zerados.

Para `q≠1`, a soma finita é

`S_n=a_1(q^n-1)/(q-1)`,

forma equivalente a `a_1(1-q^n)/(1-q)`. A soma infinita só converge quando `|q|<1` e, nesse caso,

`S_∞=a_1/(1-q)`.

Nunca use a fórmula infinita em uma PG com `|q|≥1`: os termos não tendem a zero, portanto a soma não converge.

### 3. Função afim e função quadrática

A função afim é `f(x)=ax+b`, com `a` e `b` reais. O número `a` é a inclinação: se `a>0`, a função cresce; se `a<0`, decresce; se `a=0`, é constante. `b=f(0)` é a ordenada na origem. O zero da função, quando `a≠0`, é `x=-b/a`. Dados dois pontos distintos, a inclinação é `a=(y_2-y_1)/(x_2-x_1)`.

A função quadrática tem a forma `f(x)=ax²+bx+c`, `a≠0`, e gráfico em parábola. O discriminante `Δ=b²-4ac` informa quantas raízes reais existem: `Δ>0` dá duas, `Δ=0` uma raiz dupla e `Δ<0` nenhuma. O eixo de simetria é `x_v=-b/(2a)`, e o vértice é `(x_v,f(x_v))`. Se `a>0`, o vértice é mínimo; se `a<0`, máximo. A forma fatorada, quando possível, é `a(x-x_1)(x-x_2)`; a forma canônica é `a(x-x_v)²+y_v`.

### 4. Exponencial e logarítmica

A função exponencial básica é `f(x)=a^x`, com `a>0` e `a≠1`. Para `a>1`, cresce; para `0<a<1`, decresce. Seu domínio é `R`, sua imagem é `R_+` e ela nunca assume zero. Em modelos, `P(t)=P_0(1+k)^t` representa crescimento percentual de taxa `k`, desde que o intervalo e a taxa estejam na mesma unidade.

A função logarítmica `g(x)=log_a x` exige `a>0`, `a≠1` e `x>0`. É a inversa de `a^x`: `log_a x=y` equivale a `a^y=x`. Propriedades úteis, sempre com argumentos positivos, são `log_a(uv)=log_a u+log_a v`, `log_a(u/v)=log_a u-log_a v` e `log_a(u^p)=p log_a u`. Não existe, nos reais, `log_a 0` nem logaritmo de número negativo. A mudança de base é `log_a x=ln(x)/ln(a)`.

### 5. Gráficos, composição e inversa

Para esboçar um gráfico, determine domínio, interceptos, sinais, monotonicidade e pontos de referência. Em `f(x)+k`, o gráfico sobe `k`; em `f(x-h)`, desloca-se `h` unidades para a direita; em `-f(x)`, reflete no eixo horizontal; em `f(-x)`, reflete no eixo vertical. O deslocamento deve ser lido dentro do argumento com atenção ao sinal.

A composição `(f∘g)(x)=f(g(x))` significa calcular `g` primeiro e usar o resultado como entrada de `f`. Seu domínio contém apenas os `x` do domínio de `g` para os quais `g(x)` pertence ao domínio de `f`. Uma função possui inversa como função quando é injetiva no domínio considerado; para encontrá-la, escreva `y=f(x)`, troque `x` e `y` e isole `y`. Em geral, a quadrática precisa ter seu domínio restringido a um lado do vértice para ser invertível.

## Explicação aprofundada passo a passo

1. **Traduza a situação.** Identifique o que é posição ou entrada, o que é saída e qual unidade está sendo usada. “Aumenta 6 unidades por mês” sugere soma constante; “aumenta 6% por mês” sugere multiplicação por `1,06`.
2. **Teste o padrão.** Calcule diferenças para suspeitar de PA e quocientes para suspeitar de PG. Com zeros ou sinais alternados, use a regra de recorrência em vez de dividir cegamente.
3. **Escolha a representação.** Use termo geral para uma posição distante, soma para total acumulado, gráfico para comportamento e equação para encontrar uma entrada desconhecida.
4. **Verifique condições.** Confira índice, base da potência, domínio do logaritmo, denominadores não nulos e se a soma é finita ou infinita.
5. **Resolva e interprete.** Faça a álgebra, mantenha unidades e descarte soluções que não pertençam ao domínio ou não tenham sentido no contexto.
6. **Valide.** Substitua a resposta na fórmula ou confira-a no gráfico, na tabela e em um caso simples.

## Fórmulas e regras de referência

| Objeto | Fórmula/regra | Condição ou leitura |
|---|---|---|
| PA, termo geral | `a_n=a_1+(n-1)r` | índice começa em 1 |
| PA, soma | `S_n=n(a_1+a_n)/2` | exatamente `n` termos |
| PG, termo geral | `a_n=a_1q^{n-1}` | índice começa em 1 |
| PG, soma finita | `S_n=a_1(q^n-1)/(q-1)` | `q≠1` |
| PG, soma infinita | `S_∞=a_1/(1-q)` | somente `|q|<1` |
| Afim | `f(x)=ax+b` | `a` é a inclinação |
| Quadrática | `Δ=b²-4ac`, `x_v=-b/(2a)` | `a≠0` |
| Exponencial | `f(x)=a^x` | `a>0`, `a≠1` |
| Logaritmo | `log_a x=y ⇔ a^y=x` | `a>0`, `a≠1`, `x>0` |
| Composição | `(f∘g)(x)=f(g(x))` | respeitar o domínio em duas etapas |

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — PA em uma tabela

Uma equipe registra 18 chamados na primeira semana e 5 a mais a cada semana. Na décima semana, `a_10=18+9·5=63`. O total nas dez semanas é `S_10=10(18+63)/2=405` chamados. A diferença constante, e não o fato de a tabela crescer, é o que caracteriza a PA.

### Exemplo 2 — interpolação em PA

Sabendo que o quarto termo é 14 e o décimo é 38, temos `a_10-a_4=6r`, logo `24=6r` e `r=4`. Então `a_1=14-3·4=2`, e o décimo quinto termo é `2+14·4=58`.

### Exemplo 3 — PG com redução percentual

Uma bateria começa com 800 unidades de carga e perde 12% por ciclo. A razão é `q=0,88`, não `q=-0,12`. Após cinco ciclos, `a_6=800·0,88^5`, pois o estado inicial é o primeiro termo e cinco ciclos correspondem ao expoente 5. A modelagem preserva a parte restante a cada ciclo.

### Exemplo 4 — soma de PG finita

Para `3+6+12+24+48`, temos `a_1=3`, `q=2` e `n=5`. Assim, `S_5=3(2^5-1)/(2-1)=93`.

### Exemplo 5 — afim a partir de dois pontos

Uma tarifa passa por `(2,17)` e `(7,32)`. A inclinação é `(32-17)/(7-2)=3`, portanto `f(x)=3x+b`. Usando o primeiro ponto, `17=6+b`, então `b=11`. A tarifa para `x=10` é 41. A unidade de `x` deve ser mantida ao interpretar o valor.

### Exemplo 6 — vértice da quadrática

Para `f(x)=-2x²+12x-7`, `x_v=-12/(2·-2)=3` e `f(3)=11`. Como `a<0`, o ponto `(3,11)` é máximo. O vértice informa o melhor valor, mas não substitui a análise das raízes quando a pergunta é sobre intervalos de sinal.

### Exemplo 7 — exponencial e logaritmo

Resolver `2^{x+1}=16` equivale a reconhecer `16=2^4`; logo `x+1=4` e `x=3`. Se a base não fosse facilmente comparável, aplicar `log` aos dois lados permitiria usar `log(a^u)=u log a`. Nunca se deve tomar logaritmo de uma expressão que possa ser não positiva sem antes impor essa condição.

### Exemplo 8 — composição com domínio

Se `f(u)=u²+1` e `g(x)=x-3`, então `(f∘g)(x)=(x-3)²+1`, enquanto `(g∘f)(x)=x²-2`. Com `f(u)=√u`, a composição `f∘g` exigiria `g(x)≥0`.

## Erros comuns e como corrigi-los

- **Confundir `r` com o termo seguinte:** subtraia dois termos consecutivos para achar a diferença; não use automaticamente `a_1`.
- **Errar o expoente da PG:** do primeiro para o termo `n` há `n-1` multiplicações. Escreva os primeiros termos para conferir.
- **Usar crescimento percentual como soma fixa:** 8% significa multiplicar por `1,08` a cada período, não adicionar 8 unidades.
- **Aplicar soma infinita fora da condição:** verifique `|q|<1` antes de usar `S_∞`.
- **Trocar `x_v` por `y_v`:** `-b/(2a)` é a coordenada horizontal; calcule `f(x_v)` para obter a vertical.
- **Ignorar o sinal dentro de deslocamentos:** `f(x-4)` vai para a direita, enquanto `f(x+4)` vai para a esquerda.
- **Compor na ordem errada:** em `f∘g`, faça `g` primeiro. Escreva setas `x → g(x) → f(g(x))`.
- **Aceitar logaritmo de zero ou negativo:** imponha argumento estritamente positivo antes de resolver.
- **Confundir raiz com vértice:** raízes cruzam o eixo `x`; o vértice é o extremo ou ponto de simetria.
- **Misturar índice e tempo:** se `t=0` é o instante inicial, a fórmula pode ser `P(t)=P_0q^t`, diferente da convenção `a_1q^{n-1}`.

## Vocabulário essencial

- **Sequência:** lista ordenada de termos indexados.
- **Termo geral:** expressão que calcula o termo de posição arbitrária.
- **Recorrência:** regra que determina um termo a partir de anteriores.
- **Razão/diferença:** multiplicador constante da PG/diferença constante da PA.
- **Inclinação:** variação vertical por unidade horizontal numa função afim.
- **Zero ou raiz:** entrada cujo valor da função é zero.
- **Discriminante:** `Δ`, indicador das raízes reais de uma quadrática.
- **Vértice/eixo de simetria:** extremo da parábola/eixo que a divide em duas partes simétricas.
- **Domínio e imagem:** entradas permitidas e saídas obtidas.
- **Injetiva:** entradas diferentes produzem saídas diferentes.
- **Composição:** aplicação sucessiva de funções.
- **Inversa:** função que desfaz outra, quando a restrição de domínio garante unicidade.
- **Crescimento exponencial:** variação por fator constante, não por diferença constante.

## Exercícios de estudo autorais

1. Uma sequência começa em 11 e aumenta 7 a cada posição. Escreva sua forma recursiva e calcule o 18º termo.
2. Em uma PA, `a_5=23` e `a_12=58`. Determine a diferença, o primeiro termo e a soma dos 12 primeiros.
3. Uma fila de cadeiras tem 14 lugares na primeira fileira e 3 lugares adicionais em cada fileira seguinte. Modele o número de lugares na fileira `n` e o total em 20 fileiras.
4. Calcule o oitavo termo e a soma dos oito primeiros de uma PG com primeiro termo 5 e razão `-2`.
5. Uma população inicial de 2.400 indivíduos cresce 4% por período. Escreva o modelo para `t` períodos e explique o que representa o expoente.
6. Para `f(x)=x²-8x+5`, encontre eixo, vértice, raízes (se reais) e intervalos de crescimento e decrescimento.
7. Determine a função afim que passa por `(-3,10)` e `(5,-6)` e encontre seu zero.
8. Esboce, sem calculadora, o gráfico de `y=2^{x-1}-3`, indicando assíntota, monotonicidade e um ponto conhecido.
9. Resolva `log_3(x-1)=2` e justifique a condição de existência antes de concluir.
10. Dadas `f(x)=3x+2` e `g(x)=x²`, calcule as duas composições e determine se são iguais.
11. Restrinja o domínio de `h(x)=(x-4)²+1` para que ela tenha inversa e encontre a inversa nessa restrição.
12. Uma empresa cobra taxa fixa mais valor por item. Use dois pares de dados fornecidos pelo professor ou inventados por você para montar a função e interpretar os coeficientes.

## Relação com a prova EEAR

Na EEAR, progressões e funções mobilizam raciocínio algébrico e leitura de situações. Treine distinguir diferença constante, fator percentual, reta e parábola; calcule com frações, potências e unidades; e leia interceptos, vértices e intervalos. As questões deste pacote são **similares e de calibração**, não oficiais. Verifique domínio, índice e plausibilidade, sobretudo contra erros de sinal e contagem.

## Referências e limites de uso

As referências abaixo organizam conceitos e calibram o nível. Texto, exemplos e exercícios são autorais e não reproduzem material das fontes.

1. [Pré-Vestibular CECIERJ — Matemática — Volume 1](https://canal.cecierj.edu.br/042022/395d0defbcdfdb88709310531589757c.pdf) — PA, função afim, função quadrática e gráficos; acesso gratuito, com licença CC BY-NC-ND 4.0 declarada no PDF.
2. [Pré-Vestibular CECIERJ — Matemática — Volume 2](https://canal.cecierj.edu.br/082022/219b27a21d08c9b390fcb2d42d74fc0c.pdf) — PG, exponencial, logaritmos, gráficos e crescimento; acesso gratuito, com licença CC BY-NC-ND 4.0 declarada no PDF.
3. [Atividades de Revisão em Matemática — Projeto GAMA](https://wp.ufpel.edu.br/projetogama/files/2022/07/Livro-1-GAMA.pdf) — funções, transformações, composição e inversa; acesso gratuito para estudo/calibração, sem licença aberta localizada.

Acesso gratuito não equivale a autorização de redistribuição das obras. Consulte as fontes originais para uso legal de qualquer material protegido.
