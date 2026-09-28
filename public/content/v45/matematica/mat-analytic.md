# mat-analytic — Matemática: Geometria analítica

**ID do conteúdo:** `mat-analytic`  
**Área:** Matemática  
**Foco:** Geometria analítica plana para o nível EEAR

## Objetivo e pré-requisitos

Ao concluir este guia, o estudante deverá ser capaz de representar pontos no plano cartesiano, calcular distâncias e pontos médios, obter e interpretar equações de retas e circunferências e decidir posições relativas (paralelas, perpendiculares, concorrentes, coincidentes, secantes ou tangentes). Também deverá escolher um procedimento algébrico adequado, conferir condições de existência e interpretar o resultado geometricamente.

São pré-requisitos: operações com números reais e frações; potenciação, radiciação e produtos notáveis; resolução de equações e sistemas lineares; noções de ângulo e triângulo retângulo; leitura de pares ordenados; e manipulação de expressões algébricas. Vale revisar o teorema de Pitágoras e a forma fatorada de um trinômio quadrado perfeito antes de avançar.

## Conceitos fundamentais — explicação curta

O plano cartesiano é formado por dois eixos perpendiculares: o eixo **x** (abscissas) e o eixo **y** (ordenadas). Um ponto é escrito como `P(x,y)`: primeiro desloca-se horizontalmente e depois verticalmente. A origem é `O(0,0)`; os quadrantes são determinados pelos sinais de `x` e `y`.

A diferença entre dois pontos produz um vetor deslocamento. Se `A(x₁,y₁)` e `B(x₂,y₂)`, então `AB = (x₂ − x₁, y₂ − y₁)`. A distância é o comprimento desse vetor; o ponto médio é seu ponto de equilíbrio. Uma reta pode ser descrita por inclinação (coeficiente angular), por uma equação geral ou por parâmetros. Uma circunferência é o conjunto de pontos à mesma distância de um centro.

## Explicação aprofundada passo a passo

### 1. Coordenadas, quadrantes e vetores

Para localizar `P(x,y)`, o sinal de `x` indica o lado do eixo `y` (direita se positivo, esquerda se negativo) e o sinal de `y` indica o lado do eixo `x` (acima se positivo, abaixo se negativo). Assim:

- I: `x > 0` e `y > 0`;
- II: `x < 0` e `y > 0`;
- III: `x < 0` e `y < 0`;
- IV: `x > 0` e `y < 0`.

Se uma coordenada é zero, o ponto está sobre um eixo, não em quadrante. O vetor `AB` orienta o deslocamento de `A` para `B`; inverter a ordem troca todos os sinais. Essa observação evita o erro frequente de calcular apenas diferenças em valor absoluto quando a direção é solicitada.

### 2. Distância e ponto médio

A distância entre `A(x₁,y₁)` e `B(x₂,y₂)` vem de Pitágoras aplicado aos catetos horizontal e vertical:

`d(A,B) = √[(x₂ − x₁)² + (y₂ − y₁)²]`.

O quadrado da distância, `d² = (Δx)² + (Δy)²`, é útil quando só se comparam comprimentos, pois evita radicais. O ponto médio `M` tem a média das coordenadas:

`M = ((x₁+x₂)/2, (y₁+y₂)/2)`.

Para encontrar um extremo desconhecido, use a fórmula ao contrário: se `M(a,b)` é o ponto médio de `A(x₁,y₁)` e `B(x₂,y₂)`, então `B = (2a − x₁, 2b − y₁)`. Em todos os casos, preserve a mesma ordem das coordenadas: abscissas com abscissas e ordenadas com ordenadas.

**Exemplo 1 — distância e ponto médio (resolvido).** Para `A(−2,3)` e `B(4,−1)`, temos `Δx=6` e `Δy=−4`. Logo, `AB=√(36+16)=√52=2√13`. O ponto médio é `M((−2+4)/2,(3−1)/2)=(1,1)`. A conferência `AM=MB=√13` confirma o cálculo.

### 3. Retas e coeficiente angular

Quando uma reta não é vertical, seu coeficiente angular é

`m = (y₂ − y₁)/(x₂ − x₁)`, com a condição `x₂ ≠ x₁`.

Na forma reduzida, `y = mx + n`, `m` mede a variação vertical por unidade de variação horizontal e `n` é a ordenada do ponto em que a reta corta o eixo `y`. A forma geral é `ax + by + c = 0`; se `b ≠ 0`, então `m = −a/b`. Reta vertical tem forma `x=k`, coeficiente angular indefinido; reta horizontal tem `y=k` e `m=0`.

Para montar a reta que passa por `P(x₀,y₀)` com inclinação `m`, use a forma ponto-inclinação:

`y − y₀ = m(x − x₀)`.

Se os pontos fornecidos têm a mesma abscissa, não se deve tentar dividir por zero: a resposta é uma reta vertical. Para testar se três pontos são colineares, compare as inclinações quando os denominadores não forem nulos ou use a área orientada/determinante, que deve ser zero.

**Exemplo 2 — equação de reta (comentado).** A reta por `P(2,−1)` e `Q(−1,5)` tem `m=(5+1)/(−1−2)=6/(−3)=−2`. Então `y+1=−2(x−2)`, ou `y=−2x+3`. Em forma geral, `2x+y−3=0`. Testar `P` e `Q` na equação é uma checagem rápida.

### 4. Paralelismo, perpendicularidade e interseção

Duas retas não verticais são paralelas quando têm o mesmo coeficiente angular. Se, além disso, possuem o mesmo ponto (ou a mesma equação após simplificação), são coincidentes; caso contrário, são paralelas distintas. Retas não paralelas se encontram em um único ponto, obtido resolvendo o sistema das duas equações.

Para retas com inclinações definidas, a perpendicularidade é caracterizada por `m₁m₂=−1`. O cuidado é tratar separadamente os casos vertical e horizontal: uma vertical é perpendicular a uma horizontal. O produto `−1` também não deve ser aplicado quando uma das inclinações é indefinida.

**Exemplo 3 — posições relativas (resolvido).** Considere `r: 3x−2y+4=0` e `s: 2x+3y−1=0`. Suas inclinações são `m_r=3/2` e `m_s=−2/3`; o produto é `−1`, portanto são perpendiculares. Resolvendo o sistema: de `r`, `y=(3x+4)/2`; substituindo em `s`, `2x+3(3x+4)/2−1=0`, daí `13x+10=0`, `x=−10/13` e `y=7/13`. Esse é o ponto de interseção.

### 5. Distância de ponto a reta

Para `r: ax+by+c=0` e ponto `P(x₀,y₀)`, a distância perpendicular é

`d(P,r)=|ax₀+by₀+c|/√(a²+b²)`.

A equação precisa estar na forma geral; se ela estiver em outra forma, reorganize antes de substituir. O módulo é indispensável: distância não é negativa. A fórmula mede o menor segmento entre ponto e reta, não a distância até um ponto escolhido da reta.

**Exemplo 4 — distância ponto-reta (resolvido).** Para `P(1,−2)` e `r: 3x+4y−5=0`, o numerador é `|3−8−5|=10` e o denominador é `√(9+16)=5`; portanto `d=2`. Se o resultado viesse negativo, isso indicaria que o módulo foi esquecido, não uma distância orientada.

### 6. Circunferência

A circunferência de centro `C(h,k)` e raio `r>0` é

`(x−h)²+(y−k)²=r²`.

Para passar da forma geral `x²+y²+Dx+Ey+F=0` à forma padrão, agrupe `x` e `y`, complete quadrados e compare. Como os coeficientes de `x²` e `y²` devem ser iguais e não pode haver termo `xy` no recorte básico, a expressão representa uma circunferência se o raio obtido for real e positivo. Na expansão, o centro é `C(−D/2,−E/2)` e `r²=(D²+E²)/4−F`.

Para classificar a posição de uma reta em relação à circunferência, compare a distância `δ` do centro à reta com `r`: `δ<r` indica dois pontos secantes; `δ=r`, tangência; `δ>r`, nenhum ponto real comum. Também é possível substituir a reta na circunferência: discriminante positivo, nulo ou negativo produz os mesmos três casos.

**Exemplo 5 — completar quadrados (comentado).** `x²+y²−6x+4y−3=0` torna-se `(x−3)²−9+(y+2)²−4−3=0`, isto é, `(x−3)²+(y+2)²=16`. O centro é `(3,−2)` e o raio é `4`. O sinal do termo linear é invertido ao ler o centro: `−6x` dá `h=3`, e `+4y` dá `k=−2`.

### 7. Estratégias de resolução e conferência

1. Faça um esboço simples e identifique o que é dado e o que é pedido.
2. Escolha a representação que reduz trabalho: distância ao quadrado para comparar, forma ponto-inclinação para construir reta, forma geral para distância ponto-reta, forma padrão para circunferência.
3. Declare condições: denominador não nulo, raio positivo, parâmetro real ou discriminante compatível.
4. Execute a álgebra sem arredondar prematuramente; mantenha frações e radicais exatos.
5. Substitua o resultado de volta na condição original e interprete geometricamente.

## Fórmulas e regras de uso

- **Distância:** `d=√[(Δx)²+(Δy)²]`; válida para quaisquer dois pontos no plano.
- **Ponto médio:** `M=((x₁+x₂)/2,(y₁+y₂)/2)`; vale para segmentos com extremos finitos.
- **Inclinação:** `m=Δy/Δx`; exige `Δx≠0`.
- **Reta:** `y−y₀=m(x−x₀)`; para vertical, use `x=x₀`.
- **Forma geral:** `ax+by+c=0`, com `(a,b)≠(0,0)`.
- **Paralelismo:** mesmo `m` (ou vetores diretores proporcionais); inclua o caso de retas verticais.
- **Perpendicularidade:** `m₁m₂=−1` quando ambas as inclinações existem; vertical–horizontal é o caso separado.
- **Distância ponto-reta:** `|ax₀+by₀+c|/√(a²+b²)`.
- **Circunferência:** `(x−h)²+(y−k)²=r²`, com `r>0`.
- **Colinearidade:** determinante da matriz de coordenadas (ou área do triângulo) igual a zero.

## Erros comuns e como corrigi-los

- **Trocar `x` por `y`:** leia sempre `P(abscissa, ordenada)` e faça uma tabela de coordenadas.
- **Esquecer sinais em `Δx` ou `Δy`:** subtraia “final menos inicial” antes de elevar ao quadrado.
- **Aplicar inclinação a reta vertical:** reconheça `x₁=x₂` e escreva `x=k`.
- **Confundir paralelo com perpendicular:** paralelo conserva direção; perpendicular satisfaz produto `−1` apenas no caso aplicável.
- **Usar distância ponto-reta sem forma geral:** passe todos os termos para um lado antes da fórmula.
- **Ler centro com o sinal errado:** em `(x−h)²+(y−k)²`, o sinal dentro do parêntese é o oposto da coordenada.
- **Aceitar raio negativo ou zero:** raio é comprimento; para circunferência, exige-se `r>0`.
- **Arredondar cedo:** mantenha `√13`, por exemplo, até a última etapa para não perder igualdade.
- **Achar que uma solução algébrica basta:** verifique na equação original e na condição geométrica do problema.

## Vocabulário essencial

**Abscissa:** coordenada `x`. **Ordenada:** coordenada `y`. **Origem:** `(0,0)`. **Quadrante:** cada uma das quatro regiões determinadas pelos eixos. **Vetor diretor:** vetor não nulo que indica a direção de uma reta. **Coeficiente angular:** inclinação `m`. **Coeficiente linear:** intercepto `n` em `y=mx+n`. **Reta secante:** cruza outra figura em dois pontos. **Tangente:** toca a circunferência em um ponto. **Concorrentes:** retas com um ponto comum. **Coincidentes:** retas com todos os pontos comuns. **Lugar geométrico:** conjunto de pontos que satisfaz uma condição. **Discriminante:** `Δ=b²−4ac`, usado para contar raízes reais de uma quadrática.

## Exercícios de estudo autorais

1. Determine o quadrante de `A(−7,4)`, de `B(5,−6)` e a posição de `C(0,3)`. Explique por que C não pertence a quadrante.
2. Calcule a distância e o ponto médio de `P(−3,−2)` e `Q(5,4)`. Verifique a distância de cada extremo ao ponto médio.
3. Encontre o ponto `B` sabendo que `A(6,−1)` e `M(2,3)` são, respectivamente, um extremo e o ponto médio de `AB`.
4. Obtenha a equação da reta que passa por `(-2,5)` e `(4,−1)`. Apresente-a nas formas reduzida e geral.
5. Classifique as retas `2x−y+1=0` e `x+2y−7=0`; depois encontre o ponto comum, se existir.
6. Calcule a distância de `R(−1,4)` à reta `5x−12y+9=0` e justifique o sinal usado.
7. Identifique centro e raio de `x²+y²+8x−2y−8=0` completando quadrados.
8. Encontre os valores de `t` para os quais o ponto `P(t,2t−1)` está a distância `5` da origem. Interprete o número de soluções.
9. Determine a equação da reta tangente à circunferência de centro `(2,−1)` e raio `3` no ponto `(2,2)`.
10. Para a reta `y=2x+1` e a circunferência de centro `(0,0)` e raio `√5`, classifique a interseção usando distância ou substituição.

## Relação com a prova EEAR

Geometria analítica costuma exigir leitura rápida de coordenadas, manipulação algébrica sem calculadora simbólica e escolha da fórmula apropriada. Para a EEAR, treine especialmente distância entre pontos, ponto médio, equação de reta, paralelismo/perpendicularidade, distância ponto-reta e circunferência cartesiana. As questões podem combinar dois tópicos, como obter uma reta a partir de dois pontos e depois calcular sua distância a outro ponto. Em prova, registre sinais e condições antes de operar, descarte alternativas que violam uma condição geométrica e confira a ordem de grandeza do resultado. O repertório abaixo deve ser usado para calibrar linguagem e cobertura, não como banco de questões oficiais: nenhuma das fontes listadas é fonte oficial de questões EEAR.

## Referências para estudo e calibração

- [Geometria Analítica — Alessandro Alves Santana/UFU](https://repositorio.ufu.br/handle/123456789/25321) — fonte institucional aberta para plano, distância, retas e circunferência.
- [Geometria analítica e álgebra linear: uma visão geométrica — tomo I, Dan Avritzer/UFMG](https://repositorio.ufmg.br/items/f36f0932-0c49-4316-b938-7bad156ad0b4) — revisão plana, vetores, norma e circunferência.
- [Apostila de Geometria Analítica — Diego Sebastián Ledesma/Unicamp](https://www.ime.unicamp.br/~dledesma/disciplinasministradas/apostilas/Apostila-GA.pdf) — material amplo para retas, posições relativas e distâncias; usar seletivamente.
- [Geometria analítica e álgebra linear: uma visão geométrica — tomo II, Dan Avritzer/UFMG](https://repositorio.ufmg.br/items/d5222a27-479f-4099-ab4d-0d40c3069c5a) — complemento para linguagem paramétrica, ortogonalidade e posições relativas no espaço.

As referências são indicadas para estudo e calibração. Acesso gratuito não implica autorização para redistribuir PDFs, exercícios, respostas, figuras ou trechos protegidos; consulte a licença de cada obra antes de reutilizar qualquer material.
