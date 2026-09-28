# fis-fluidos — Física: Fluidos

**ID do conteúdo:** `fis-fluidos`  
**Área:** Física  
**Escopo:** propriedades dos fluidos, hidrostática e hidrodinâmica em nível compatível com a preparação para a EEAR.

## Objetivo e pré-requisitos

Ao terminar este guia, você deverá ser capaz de relacionar massa, volume, densidade e pressão; calcular pressões em pontos de um fluido em repouso; aplicar os princípios de Pascal, Stevin e Arquimedes; determinar vazão e velocidade em tubos de diferentes áreas; e usar a equação de Bernoulli com suas hipóteses. Também deverá saber conferir unidades, escolher um nível de referência e interpretar se um corpo afunda, flutua ou fica suspenso.

Pressupõe-se domínio de álgebra elementar, conversão de unidades, áreas e volumes, notação científica, peso (`P = mg`) e energia mecânica. É útil lembrar que a aceleração da gravidade pode ser aproximada por `g = 10 m/s²` em itens escolares, salvo valor indicado. Nas contas, use o SI: massa em quilogramas, volume em metros cúbicos, pressão em pascais, área em metros quadrados e vazão em metros cúbicos por segundo.

## Explicação curta

Fluido é uma substância que se deforma continuamente quando submetida a uma tensão de cisalhamento; líquidos e gases são os exemplos usuais. A **densidade** mede quanta massa existe por volume (`ρ = m/V`). A **pressão** é força normal distribuída por área (`p = F/A`). Em um fluido parado, a pressão aumenta com a profundidade, segundo `Δp = ρgΔh`, e atua em todas as direções. Uma pressão aplicada a um fluido confinado é transmitida, conforme Pascal. Um corpo imerso recebe **empuxo** para cima igual ao peso do fluido deslocado. Em escoamento permanente, a vazão se conserva: `Q = Av`; quando o tubo estreita, a velocidade aumenta. Bernoulli relaciona pressão, velocidade e altura ao longo de uma linha de corrente, desde que o escoamento possa ser tratado como ideal ou com perdas desprezíveis.

## Conceitos fundamentais

- **Densidade (massa específica):** `ρ = m/V`. Dois materiais com a mesma massa podem ter densidades distintas se ocuparem volumes diferentes.
- **Pressão absoluta e manométrica:** a absoluta é medida a partir do vácuo; a manométrica é a diferença em relação à pressão atmosférica. Assim, `p_abs = p_atm + p_man`.
- **Fluido incompressível:** modelo em que a densidade permanece praticamente constante. É uma boa aproximação para líquidos em muitas situações escolares.
- **Pressão hidrostática:** em repouso, depende da profundidade, da densidade e de `g`, não do formato do recipiente.
- **Empuxo:** força resultante das pressões do fluido sobre o corpo, vertical e para cima quando o campo gravitacional aponta para baixo.
- **Vazão volumétrica:** volume que atravessa uma seção por unidade de tempo, `Q = ΔV/Δt`; em escoamento uniforme, `Q = Av`.
- **Linhas de corrente:** curvas cuja tangente indica a direção instantânea da velocidade. Bernoulli é aplicado ao longo de uma mesma linha de corrente na forma elementar.

## Explicação aprofundada passo a passo

### 1. Escolha do modelo e das unidades

Primeiro identifique se o problema trata de fluido em repouso (hidrostática) ou em movimento (hidrodinâmica). Liste os dados, desenhe o recipiente ou tubo e marque alturas e áreas. Converta centímetros para metros antes de usar fórmulas do SI: `1 cm² = 10⁻⁴ m²` e `1 cm³ = 10⁻⁶ m³`. Diferencie massa (`kg`) de peso (`N`) e pressão (`Pa = N/m²`). Em água, quando não houver outro dado, costuma-se usar `ρ ≈ 1,0 × 10³ kg/m³`; isso é uma aproximação, não uma identidade universal.

### 2. Pressão e lei de Stevin

A pressão média exercida por uma força perpendicular a uma superfície é `p = F_n/A`. Se o líquido está em equilíbrio e a superfície livre está submetida a `p₀`, um ponto a uma profundidade `h` possui

`p(h) = p₀ + ρgh`.

Entre dois pontos do mesmo líquido em repouso, vale `p₂ - p₁ = ρg(h₂ - h₁)` quando `h` é medido para baixo; de modo mais seguro, escreva que a pressão aumenta de `ρgΔh` ao descer uma distância `Δh`. O resultado não depende do formato do recipiente. Em vasos comunicantes com o mesmo líquido e a mesma pressão externa, os níveis livres se igualam. Em líquidos diferentes, a igualdade de pressão em uma mesma horizontal exige comparar `ρh` de cada coluna.

### 3. Pascal, prensa e manômetros

O princípio de Pascal afirma que uma variação de pressão aplicada a um fluido confinado é transmitida integralmente ao fluido. Em uma prensa ideal, a pressão é igual nos êmbolos:

`F₁/A₁ = F₂/A₂`.

O êmbolo de maior área pode exercer força maior, mas desloca distância menor, de modo que a conservação do trabalho ideal não é violada. Não confunda transmissão de pressão com transmissão de força: a força cresce apenas porque a área muda. Em manômetros, compare pressões por colunas: uma diferença vertical `Δh` em um líquido de densidade `ρ` corresponde a `Δp = ρgΔh`, com o sinal determinado por qual lado está mais profundo.

### 4. Empuxo e condições de flutuação

O teorema de Arquimedes dá

`E = ρ_f g V_deslocado`,

em que `ρ_f` é a densidade do fluido e `V_deslocado` é o volume do fluido que ocuparia a parte submersa do corpo. O empuxo não usa automaticamente o volume total do corpo: usa o volume imerso. Compare `E` com o peso `P = mg`:

- se `P > E` durante a imersão, o corpo acelera para baixo;
- se `P < E`, acelera para cima;
- em equilíbrio totalmente submerso, `P = E`; o corpo pode ficar suspenso;
- flutuando em equilíbrio, `P = E` e `ρ_corpo/ρ_fluido = V_submerso/V_total`.

Logo, um corpo menos denso que o líquido flutua com apenas parte do volume imersa; não é correto dizer que o empuxo é sempre igual ao peso. Ele só se iguala ao peso quando não há aceleração vertical.

### 5. Vazão e equação da continuidade

A vazão volumétrica média é

`Q = ΔV/Δt = Av`,

com `A` a área transversal e `v` a velocidade média. Para escoamento permanente, incompressível e sem entradas ou saídas entre duas seções,

`A₁v₁ = A₂v₂`.

Assim, se a seção final é um quarto da inicial, a velocidade final é quatro vezes maior. A vazão permanece a mesma, mas não o volume acumulado por segundo em cada seção. Em tubos circulares, `A = πr²`; reduzir o raio pela metade reduz a área a um quarto.

### 6. Bernoulli e consequências

Para escoamento estacionário, incompressível, não viscoso e ao longo de uma linha de corrente, sem bombas nem turbinas entre os pontos, a equação é

`p + ½ρv² + ρgy = constante`.

Os termos são, respectivamente, pressão por unidade de volume, energia cinética por unidade de volume e energia potencial gravitacional por unidade de volume. Entre dois pontos:

`p₁ + ½ρv₁² + ρgy₁ = p₂ + ½ρv₂² + ρgy₂`.

Em um tubo horizontal (`y₁ = y₂`), o aumento de velocidade costuma vir acompanhado de queda de pressão estática. Em um reservatório grande com um orifício pequeno, `v_superfície ≈ 0`; aplicando Bernoulli entre a superfície e o orifício, ambos à pressão atmosférica, obtém-se Torricelli: `v_saida = √(2gh)`. Se houver viscosidade relevante, tubulação longa, bomba ou perda de carga, a forma simples precisa ser corrigida; não se deve aplicar Bernoulli ideal sem mencionar a hipótese.

## Fórmulas, regras e condições de uso

| Situação | Relação | Condição principal |
|---|---|---|
| Densidade | `ρ = m/V` | Material homogêneo ou densidade média |
| Pressão média | `p = F_n/A` | Força normal à área |
| Hidrostática | `p = p₀ + ρgh` | Fluido em repouso, densidade constante |
| Pascal | `F₁/A₁ = F₂/A₂` | Fluido confinado e prensa ideal |
| Empuxo | `E = ρ_f g V_submerso` | Fluido e campo gravitacional uniformes |
| Vazão | `Q = Av` | Velocidade média na seção |
| Continuidade | `A₁v₁ = A₂v₂` | Escoamento permanente e incompressível |
| Bernoulli | `p + ½ρv² + ρgy = cte.` | Ideal, estacionário, mesma linha de corrente |

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — densidade e conversão
Uma amostra tem `m = 0,75 kg` e `V = 300 cm³`. Como `300 cm³ = 3,0 × 10⁻⁴ m³`, sua densidade é `ρ = 0,75/(3,0 × 10⁻⁴) = 2,5 × 10³ kg/m³`. O erro mais frequente é dividir por 300 e chamar o resultado de SI; `2,5 × 10⁻³ kg/cm³` pode ser válido em outra unidade, mas não substitui a conversão pedida.

### Exemplo 2 — pressão em uma coluna de água
Um ponto está `2,4 m` abaixo da superfície aberta. Com `ρ = 1000 kg/m³` e `g = 10 m/s²`, o acréscimo hidrostático é `ρgh = 24 000 Pa`. Se a pergunta pede pressão absoluta e `p_atm = 100 000 Pa`, a resposta é `124 000 Pa`; se pede pressão manométrica, é `24 000 Pa`. A palavra “aberta” informa que a pressão atmosférica atua na superfície.

### Exemplo 3 — prensa hidráulica
Um êmbolo de `20 cm²` recebe `120 N`, e o outro tem `300 cm²`. Pela igualdade de pressão, `F₂ = 120(300/20) = 1800 N`. A prensa multiplica a força por 15, mas o êmbolo maior desloca-se apenas uma fração do deslocamento do menor no modelo ideal. Não se deve multiplicar forças diretamente sem a razão entre áreas.

### Exemplo 4 — corpo flutuante
Um bloco de volume total `0,020 m³` e densidade `600 kg/m³` flutua em água. Sua massa é `12 kg`, logo seu peso é `120 N`. Em equilíbrio, o empuxo também é `120 N`; portanto, `1000 · 10 · V_sub = 120`, dando `V_sub = 0,012 m³`. A fração submersa é `0,012/0,020 = 0,60`, ou 60%, coerente com `ρ_corpo/ρ_água = 0,60`.

### Exemplo 5 — estreitamento de tubo
Água passa por uma seção de área `6,0 cm²` com velocidade `0,50 m/s` e entra em outra de `2,0 cm²`. Como a área final é um terço da inicial, `v₂ = 1,5 m/s`. A vazão é `Q = A₁v₁ = 6,0 × 10⁻⁴ · 0,50 = 3,0 × 10⁻⁴ m³/s`. A velocidade mudou, mas a vazão não.

### Exemplo 6 — Bernoulli horizontal
Em uma tubulação horizontal, a velocidade cresce de `2` para `6 m/s`, com água ideal. A diferença de pressão é `p₁ - p₂ = ½ρ(v₂² - v₁²) = ½·1000·(36 - 4) = 16 000 Pa`. Assim, a pressão no ponto rápido é menor. O resultado pressupõe mesma altura, ausência de perda de carga e pontos na mesma linha de corrente.

## Erros comuns e como corrigi-los

1. **Misturar cm², cm³ e m², m³.** Faça a conversão antes da fórmula e escreva a unidade em cada linha.
2. **Usar massa no lugar de peso.** Empuxo é força em newtons; compare-o a `mg`, não a `m`.
3. **Somar `p_atm` sempre.** Some-a apenas quando a questão pede pressão absoluta ou fornece uma superfície aberta; pressão manométrica é apenas `ρgh` no caso simples.
4. **Usar o volume total no empuxo de corpo parcialmente imerso.** Conte apenas a parte submersa.
5. **Afirmar que a pressão depende do formato do recipiente.** Em equilíbrio, à mesma profundidade e no mesmo fluido, a pressão é igual.
6. **Aplicar continuidade a fluido compressível sem ressalva.** Para gases, densidade pode variar; a forma simples exige aproximação de incompressibilidade.
7. **Aplicar Bernoulli entre pontos com bomba ou perdas sem termos adicionais.** Verifique viscosidade, máquinas, desnível e se o escoamento é permanente.
8. **Confundir velocidade com vazão.** Um bico estreito pode aumentar a velocidade, mas a vazão continua igual no modelo de continuidade.

## Vocabulário essencial

**Fluido:** meio que escoa e não sustenta cisalhamento estático. **Massa específica/densidade (`ρ`):** massa por volume. **Pressão (`p`):** força normal por área. **Hidrostática:** estudo do fluido em repouso. **Hidrodinâmica:** estudo do fluido em movimento. **Pressão manométrica:** diferença em relação à atmosférica. **Pressão absoluta:** medida em relação ao vácuo. **Empuxo:** força resultante para cima exercida pelo fluido. **Deslocamento:** volume de fluido correspondente à parte submersa. **Vazão (`Q`):** volume por tempo. **Seção transversal:** corte perpendicular ao escoamento. **Escoamento permanente:** grandezas em cada ponto não variam com o tempo. **Incompressível:** densidade aproximadamente constante. **Linha de corrente:** linha tangente à velocidade. **Perda de carga:** redução de energia mecânica por efeitos viscosos.

## Exercícios de estudo (autoria própria)

1. Um recipiente contém `1,8 kg` de óleo em `2,0 L`. Determine a densidade em `kg/m³` e compare-a com a da água.
2. Uma superfície recebe força normal de `450 N` distribuída em `0,015 m²`. Calcule a pressão média e explique como ela mudaria se a área dobrasse.
3. Em água, compare as pressões manométricas a `0,8 m` e `3,3 m` de profundidade. Qual é a diferença entre elas?
4. Planeje uma prensa que transforme `200 N` em `1400 N`. Qual deve ser a razão entre as áreas dos êmbolos?
5. Um objeto de `4,0 kg` e volume `0,003 m³` é colocado totalmente em água. Determine o sentido inicial da aceleração e justifique pelo empuxo e pelo peso.
6. Um tubo passa de raio `4 cm` para raio `2 cm`. Se a velocidade inicial é `0,75 m/s`, determine a velocidade final supondo líquido incompressível.
7. Uma saída de reservatório está `1,25 m` abaixo da superfície. Estime a velocidade ideal pelo modelo de Torricelli e liste duas hipóteses que podem falhar em uma instalação real.
8. Dois pontos de uma tubulação têm velocidades e alturas diferentes. Escreva a equação de Bernoulli, indique qual termo representa cada forma de energia e explique como você decidiria qual pressão é maior.

## Relação com a prova EEAR

Fluidos costuma aparecer como aplicação direta de grandezas, equilíbrio e conservação. Para a EEAR, treine leitura rápida de unidades, conversão de áreas e volumes, identificação de pressão absoluta/manométrica e comparação de densidades. Questões numéricas podem combinar `p = p₀ + ρgh` com vasos comunicantes, empuxo com flutuação ou continuidade com Bernoulli. Ao resolver, desenhe os pontos, escreva a hipótese do modelo e elimine alternativas incompatíveis dimensionalmente. Em itens conceituais, procure palavras como “mesma profundidade”, “fluido ideal”, “seção menor”, “corpo em equilíbrio” e “reservatório aberto”: elas determinam a lei aplicável. A prova pode cobrar raciocínio mais do que contas longas; portanto, saiba explicar por que a pressão cresce para baixo, por que o empuxo usa volume deslocado e por que a velocidade aumenta no estreitamento. Pratique também estimativas com `g = 10 m/s²`, sem perder de vista o valor fornecido no enunciado.

## Referências para estudo e calibração

As fontes abaixo foram usadas para organizar conceitos e calibrar nível; não são transcritas nem redistribuídas. O acesso público não implica licença de adaptação dos PDFs.

1. [Mecânica dos Fluidos/Fenômenos de Transporte — UFPel](https://wp.ufpel.edu.br/ciceroescobar/mecanica-dos-fluidos/) — página institucional com apostila, exercícios e materiais complementares.
2. [Fluidos — IFSC-USP](https://www.ifsc.usp.br/~hoyos/courses/2024/SLC0628/Fluidos.pdf) — notas de aula sobre hidrostática e hidrodinâmica.
3. [Lista de exercícios de hidrostática — IFSC-USP](https://www.ifsc.usp.br/~hoyos/courses/2024/SLC0628/lista-hidrostatica.pdf) — prática de densidade, pressão, empuxo e flutuação.
4. [Noções de Hidrodinâmica para o Ensino médio — UFRB](https://www.ufrb.edu.br/pibid/documentos/category/59-hidrostatica-e-hidrodinamica?download=218:hidrodi) — material para continuidade, vazão, Bernoulli e aplicações.

As questões deste pacote são autorais/similares e não oficiais; as referências servem apenas para calibração de conteúdo, linguagem e dificuldade.
