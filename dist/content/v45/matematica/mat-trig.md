# mat-trig — Matemática: Trigonometria

**ID de integração:** `mat-trig`  
**Área:** Matemática  
**Foco:** razões trigonométricas, triângulos, ciclo, identidades, leis e funções

## Objetivo e pré-requisitos

Este guia tem como objetivo levar o estudante a reconhecer e resolver problemas de trigonometria em triângulos, no círculo trigonométrico e em funções. Ao final, espera-se que você consiga escolher uma razão ou lei adequada, controlar unidades (graus e radianos), justificar sinais e quadrantes, transformar expressões e interpretar período, amplitude e deslocamentos.

Antes de iniciar, revise: frações e radicais; teorema de Pitágoras; semelhança de triângulos; operações algébricas e equações do segundo grau; leitura de plano cartesiano; medidas de ângulos. É importante também saber que \(\pi\) radianos correspondem a \(180^\circ\), embora a calculadora possa trabalhar em qualquer dos dois modos.

## Explicação curta

Em um triângulo retângulo, para um ângulo agudo \(\theta\),
\[
\sin\theta=\frac{\text{cateto oposto}}{\text{hipotenusa}},\qquad
\cos\theta=\frac{\text{cateto adjacente}}{\text{hipotenusa}},\qquad
\tan\theta=\frac{\text{cateto oposto}}{\text{cateto adjacente}}.
\]

A circunferência de raio 1 amplia essas definições para qualquer ângulo: o ponto associado a \(\theta\) tem coordenadas \((\cos\theta,\sin\theta)\). Seno e cosseno são periódicos; a tangente é o quociente \(\sin\theta/\cos\theta\) e não existe quando \(\cos\theta=0\). Identidades, leis dos senos e dos cossenos permitem relacionar medidas que não aparecem juntas em um único triângulo retângulo.

## Conceitos fundamentais

### 1. Razões no triângulo retângulo

A hipotenusa é o lado oposto ao ângulo reto e sempre é o maior lado. Os nomes “oposto” e “adjacente” dependem do ângulo escolhido. A relação de Pitágoras é \(h^2=c_1^2+c_2^2\). As razões seno, cosseno e tangente não dependem do tamanho do triângulo, apenas do ângulo, pois triângulos retângulos semelhantes preservam as proporções.

Alguns valores úteis são:

| Ângulo | seno | cosseno | tangente |
|---|---:|---:|---:|
| \(0^\circ\) | 0 | 1 | 0 |
| \(30^\circ\) | \(1/2\) | \(\sqrt3/2\) | \(\sqrt3/3\) |
| \(45^\circ\) | \(\sqrt2/2\) | \(\sqrt2/2\) | 1 |
| \(60^\circ\) | \(\sqrt3/2\) | \(1/2\) | \(\sqrt3\) |
| \(90^\circ\) | 1 | 0 | não definida |

### 2. Graus, radianos e círculo trigonométrico

Um arco de comprimento igual ao raio subtende 1 radiano. Portanto, \(180^\circ=\pi\) rad, \(360^\circ=2\pi\) rad e
\[
\text{radianos}=\text{graus}\cdot\frac{\pi}{180},\qquad
\text{graus}=\text{radianos}\cdot\frac{180}{\pi}.
\]

No círculo unitário, o eixo horizontal fornece o cosseno e o vertical fornece o seno. Os sinais seguem os quadrantes: I: seno e cosseno positivos; II: seno positivo e cosseno negativo; III: ambos negativos; IV: seno negativo e cosseno positivo. A tangente tem o sinal do quociente e não é definida nos pontos em que o cosseno zera.

### 3. Identidades e simetrias

A identidade fundamental é
\[
\sin^2x+\cos^2x=1.
\]
Dela seguem \(1-\sin^2x=\cos^2x\) e \(1-\cos^2x=\sin^2x\). Quando \(\cos x\neq0\), \(\tan x=\sin x/\cos x\). Também são úteis:
\[
\sin(a+b)=\sin a\cos b+\cos a\sin b,
\]
\[
\cos(a+b)=\cos a\cos b-\sin a\sin b,
\]
\[
\sin(2a)=2\sin a\cos a,\qquad \cos(2a)=\cos^2a-\sin^2a.
\]
Sempre verifique denominadores antes de cancelar ou multiplicar uma igualdade. Uma identidade vale para todo domínio em que os dois lados estejam definidos; uma equação, ao contrário, pode restringir os valores de \(x\).

### 4. Leis dos senos e dos cossenos

Em um triângulo, associe cada lado à letra minúscula do ângulo oposto. A lei dos senos é
\[
\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}.
\]
Ela é especialmente conveniente quando se conhece um par lado–ângulo opostos (caso AAS ou ASA) e, em algumas configurações, pode produzir o caso ambíguo SSA: uma mesma altura pode permitir dois triângulos, um, ou nenhum.

A lei dos cossenos é
\[
c^2=a^2+b^2-2ab\cos C,
\]
quando \(C\) é o ângulo entre \(a\) e \(b\). É indicada para dois lados e o ângulo compreendido (SAS) ou para os três lados (SSS). Para \(C=90^\circ\), ela se reduz ao teorema de Pitágoras.

### 5. Funções trigonométricas

A forma \(f(x)=A\sin(Bx+C)+D\) tem amplitude \(|A|\), período \(2\pi/|B|\) se \(B\neq0\), deslocamento horizontal \(-C/B\) e deslocamento vertical \(D\). O intervalo de valores é \([D-|A|,D+|A|]\). Para o cosseno vale a mesma leitura. Na função \(A\tan(Bx+C)+D\), o período é \(\pi/|B|\), mas há assíntotas e não existe amplitude finita.

## Explicação aprofundada: método passo a passo

1. **Leia a configuração.** Desenhe o triângulo, marque o ângulo reto ou identifique se o problema usa um triângulo qualquer, um arco ou um gráfico.
2. **Padronize unidades.** Converta todos os ângulos para graus ou todos para radianos antes de operar. Em funções, observe se a expressão contém \(\pi\), sinal comum de radianos.
3. **Nomeie o que é conhecido.** Em triângulo retângulo, destaque hipotenusa, oposto e adjacente em relação ao ângulo pedido. Em triângulo qualquer, nomeie lados opostos a \(A,B,C\).
4. **Escolha a ferramenta mínima.** Use SOH-CAH-TOA no triângulo retângulo; lei dos senos com um par oposto; lei dos cossenos em SAS/SSS; identidade quando a tarefa é transformar uma expressão; círculo quando a tarefa pede sinais ou soluções em um intervalo.
5. **Resolva simbolicamente primeiro.** Mantenha \(\sqrt3\), \(\pi\) e frações exatas até o fim. Aproximações decimais podem esconder uma alternativa ou acumular erro.
6. **Cheque domínio e sinais.** Seno e cosseno estão entre \(-1\) e \(1\); tangente exige cosseno não nulo; o maior lado fica oposto ao maior ângulo. Esses testes eliminam resultados impossíveis.
7. **Confira o intervalo.** Uma solução de \(\sin x=a\) ou \(\cos x=a\) gera famílias periódicas. Liste apenas as que pertencem ao intervalo solicitado e não conte duas vezes os extremos quando o intervalo é semiaberto.

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — razão e Pitágoras

Um triângulo retângulo tem catetos 9 e 12. Para o ângulo oposto ao cateto de 9, a hipotenusa é \(\sqrt{9^2+12^2}=15\). Assim, \(\sin\theta=9/15=3/5\), \(\cos\theta=12/15=4/5\) e \(\tan\theta=9/12=3/4\). A soma dos quadrados \((3/5)^2+(4/5)^2=1\) confirma a consistência.

### Exemplo 2 — ângulo notável e unidade

Uma rampa sobe 4 m enquanto avança horizontalmente \(4\sqrt3\) m. O ângulo \(\theta\) com o solo satisfaz \(\tan\theta=4/(4\sqrt3)=1/\sqrt3=\sqrt3/3\). Logo, \(\theta=30^\circ\) (ou \(\pi/6\) rad). Não se deve responder “30 rad”: graus e radianos são medidas diferentes.

### Exemplo 3 — quadrante no ciclo

Para \(x=7\pi/6\), o ângulo de referência é \(\pi/6\) e o ponto está no III quadrante. Portanto \(\sin x=-1/2\) e \(\cos x=-\sqrt3/2\). A tangente é positiva, pois é o quociente de dois valores negativos: \(\tan x=\sqrt3/3\).

### Exemplo 4 — lei dos cossenos

Dois lados medem 7 e 8 e o ângulo entre eles mede \(60^\circ\). O terceiro lado \(c\) obedece a
\[
c^2=7^2+8^2-2\cdot7\cdot8\cos60^\circ=49+64-56=57.
\]
Assim, \(c=\sqrt{57}\), aproximadamente 7,55. Usar \(c=7+8\) ignoraria a abertura angular e não aplicaria a lei correta.

### Exemplo 5 — identidade com condição

Simplifique \((1-\cos^2x)/\sin x\). Pela identidade fundamental, o numerador é \(\sin^2x\); então a fração vira \(\sin^2x/\sin x=\sin x\), **desde que \(\sin x\neq0\)**. A igualdade simplificada descreve os pontos do domínio original; não é correto declarar que a expressão inicial existe em \(x=0\).

### Exemplo 6 — leitura de função

Considere \(g(x)=2\cos(3x)+1\). A amplitude é 2, o período é \(2\pi/3\), a linha média é \(y=1\) e o intervalo de valores é \([-1,3]\). O coeficiente 3 comprime o gráfico horizontalmente; o termo +1 o desloca para cima, mas não aumenta a amplitude.

## Erros comuns e como corrigi-los

- **Trocar oposto e adjacente:** redesenhe o ângulo e trace mentalmente o lado que fica diretamente em frente a ele.
- **Usar a hipotenusa como cateto:** marque o ângulo reto; o lado oposto a ele é sempre a hipotenusa.
- **Misturar graus e radianos:** faça a conversão no início e confira o modo da calculadora.
- **Ignorar o quadrante:** determine primeiro os sinais; o ângulo de referência fornece apenas os módulos.
- **Aplicar a lei dos senos sem par oposto:** confira se o lado e o seno pertencem a ângulos opostos.
- **Aplicar a lei dos cossenos ao lado errado:** o ângulo usado deve estar entre os dois lados que aparecem multiplicados.
- **Esquecer condições de domínio:** não divida por seno ou cosseno possivelmente nulo.
- **Confundir amplitude com valor máximo:** em \(A\sin x+D\), o máximo é \(D+|A|\), não apenas \(|A|\).
- **Parar na primeira solução de uma equação:** use simetria, período e o intervalo pedido para listar todas.
- **Arredondar cedo:** conserve a forma exata e aproxime apenas na resposta final, se necessário.

## Vocabulário essencial

- **Ângulo de referência:** menor ângulo positivo entre o lado terminal e o eixo horizontal.
- **Arco:** parte da circunferência delimitada por dois pontos.
- **Radiano:** medida de ângulo definida pela razão entre comprimento do arco e raio.
- **Ciclo trigonométrico:** circunferência unitária orientada, usada para definir funções em qualquer ângulo.
- **Quadrante:** cada uma das quatro regiões determinadas pelos eixos coordenados.
- **Periodicidade:** repetição de valores após um período.
- **Amplitude:** distância da linha média ao máximo ou ao mínimo de uma função seno/cosseno.
- **Assíntota:** reta da qual o gráfico se aproxima sem atingir, como ocorre com a tangente nos pontos de cosseno nulo.
- **Identidade:** igualdade verdadeira para todo valor permitido no domínio.
- **Caso ambíguo SSA:** configuração da lei dos senos em que os dados podem determinar dois triângulos.

## Exercícios de estudo (sem gabarito)

1. Em um triângulo retângulo, os catetos medem 5 e 12. Calcule seno, cosseno e tangente do ângulo oposto ao cateto menor.
2. Converta \(225^\circ\) para radianos e \(11\pi/6\) para graus.
3. Determine os sinais de seno, cosseno e tangente em \(13\pi/8\), justificando pelo quadrante.
4. Resolva \(\cos x=-1/2\) no intervalo \([0,2\pi)\).
5. Verifique algebricamente a identidade \((1-\sin^2x)/\cos x=\cos x\) e registre sua condição de domínio.
6. Um triângulo tem lados 9 e 11 com ângulo compreendido de \(120^\circ\). Encontre o terceiro lado pela lei dos cossenos.
7. Em um triângulo, \(A=40^\circ\), \(B=65^\circ\) e \(a=8\). Calcule uma expressão para \(b\) pela lei dos senos e estime seu valor.
8. Analise \(h(x)=-3\sin(2x-\pi)+4\): amplitude, período, linha média e intervalo de valores.
9. Resolva \(2\sin^2x-\sin x-1=0\) em \([0,2\pi)\), verificando as raízes admissíveis.
10. Crie um esboço do ciclo e marque \(\pi/3\), \(5\pi/6\) e \(7\pi/4\), anotando as coordenadas correspondentes.

## Relação com a prova EEAR

Trigonometria é um conteúdo de Matemática diretamente alinhado ao tipo de raciocínio cobrado em seleções da EEAR: leitura rápida de dados, manipulação algébrica, ângulos notáveis, aplicações geométricas e interpretação de funções. A preparação deve priorizar exatidão e tempo: reconhecer a ferramenta antes de calcular, dominar valores de \(30^\circ\), \(45^\circ\) e \(60^\circ\), converter radianos sem hesitação e verificar sinais e intervalos. Problemas autorais deste pacote são **similares para treino e calibração, não questões oficiais**; o edital e as provas válidas devem ser consultados diretamente para confirmar escopo e estilo de cada edição. Em uma prova objetiva, uma estimativa de ordem de grandeza, a desigualdade triangular e os sinais por quadrante funcionam como filtros rápidos, mas não substituem a justificativa exata quando as alternativas são próximas.

## Referências

As referências abaixo foram usadas para organizar conceitos e calibrar o nível; não foram reproduzidos textos, exercícios, respostas ou figuras.

1. [López Linares e Bruno-Alfonso — *Trigonometria: dos conceitos básicos até problemas olímpicos*](https://doi.org/10.11606/9786587023359), Portal de Livros Abertos da USP (CC BY-NC-SA 4.0 no catálogo). Download oficial indicado no índice: [PDF USP](https://www.livrosabertos.abcd.usp.br/portaldelivrosUSP/catalog/download/1158/1060/3974?inline=1).
2. [Fundação CECIERJ — Fascículo 6, Unidades 18–20](https://canal.cecierj.edu.br/052020/ed2337dad6fe0d39afe2091c27241978.pdf), material gratuito consultado apenas como referência e calibração.
3. [André Luiz dos Santos Ferreira — *Trigonometria e funções trigonométricas, uma abordagem didático-metodológica*](https://www2.unifap.br/matematica/files/2017/07/TRIGONOMETRIA-E-FUN%C3%87%C3%95ES-TRIGONOM%C3%89TRICAS-UMA-ABORDAGEM-DID%C3%81TICO-METODOL%C3%93GICA.pdf), UNIFAP/PROFMAT, 2016; consulta para estudo e calibração.
4. [Sequência didática de Trigonometria — IFSul/PIBID UNIPAMPA](https://sites.unipampa.edu.br/pibid2014/files/2015/11/sequencia-didatica-trigonometria_ifsulii.pdf), consulta para nivelamento e calibração.

**Nota de direitos:** acesso gratuito ou online não implica autorização para redistribuir os PDFs. Este guia é uma redação autoral de conceitos matemáticos gerais e mantém as referências para atribuição e consulta.
