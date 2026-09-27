# fis-energia — Física: trabalho, energia e potência

**ID do conteúdo:** `fis-energia`  
**Área:** Física  
**Escopo:** trabalho de uma força, energia cinética e potencial, conservação de energia, potência, rendimento, impulso e quantidade de movimento.

## Objetivo e pré-requisitos

Ao estudar este guia, você deverá ser capaz de calcular o trabalho realizado por forças, relacionar trabalho e variação da energia cinética, usar a conservação da energia mecânica com ou sem dissipação, determinar potência e rendimento e aplicar impulso e conservação da quantidade de movimento em situações simples. O tema aparece em problemas que descrevem máquinas, veículos, quedas, molas, frenagens e colisões.

Antes de começar, revise: operações algébricas, notação científica, conversão de unidades, decomposição de vetores, trigonometria básica (especialmente seno e cosseno), gráficos cartesianos e as leis de Newton. Adote o Sistema Internacional: metro (m), segundo (s), quilograma (kg), newton (N), joule (J), watt (W) e pascal apenas quando outro tema exigir. Em muitos exercícios escolares, use `g = 10 m/s²` quando o enunciado não fornecer outro valor.

## Explicação curta

**Trabalho** mede a transferência de energia causada por uma força ao longo de um deslocamento. Para uma força constante, `W = F d cos θ`, em que `θ` é o ângulo entre força e deslocamento. **Energia cinética** é a energia do movimento: `Ec = mv²/2`. O trabalho da força resultante é igual à variação da energia cinética: `Wresultante = ΔEc`.

A energia associada à posição pode ser **potencial gravitacional**, `Ug = mgh`, ou **potencial elástica**, `Ue = kx²/2`. Se apenas forças conservativas atuam, `Ec + Ug + Ue` permanece constante. Atrito e outras forças dissipativas transformam parte da energia mecânica em energia térmica; nesse caso, contabiliza-se o trabalho dessas forças. **Potência** informa a rapidez da transferência de energia: `Pm = W/Δt` e, instantaneamente, `P = F · v`. **Rendimento** compara energia útil com energia fornecida. Por fim, **impulso** altera a quantidade de movimento: `I = Δp`.

## Conceitos fundamentais

### 1. Trabalho de uma força

Para uma força constante e um deslocamento retilíneo, o trabalho é o produto da componente da força na direção do movimento pelo deslocamento:

`W = F d cos θ`.

- Se `0° ≤ θ < 90°`, o trabalho é positivo: a força favorece o movimento.
- Se `θ = 90°`, o trabalho é nulo: a força é perpendicular ao deslocamento, como a normal em um trecho horizontal ideal.
- Se `90° < θ ≤ 180°`, o trabalho é negativo: a força se opõe ao movimento, como o atrito cinético.

A unidade é o joule: `1 J = 1 N·m`. Para uma força variável, não se aplica diretamente um único valor de `F`; o trabalho é a área algébrica sob o gráfico força versus posição (`F × x`) ou, em linguagem mais avançada, `W = ∫ F dx`. Áreas acima do eixo são positivas e abaixo, negativas.

### 2. Energia cinética e teorema trabalho–energia

Um corpo de massa `m` e velocidade de módulo `v` tem `Ec = mv²/2`. A velocidade aparece ao quadrado: dobrar `v` quadruplica a energia cinética. O teorema do trabalho–energia diz que o trabalho da **força resultante** é `ΔEc = Ec_final − Ec_inicial`. Assim, não se deve usar o trabalho de uma força isolada para concluir a variação total da velocidade, a menos que ela seja a resultante ou que as demais contribuições tenham sido somadas.

### 3. Energias potenciais

Perto da superfície terrestre, tomando um nível de referência, `Ug = mgh`. Só a diferença de altura importa: escolher outro zero altera os valores individuais, mas não altera a previsão física se a escolha for usada de modo consistente. Uma queda reduz `Ug` e tende a aumentar `Ec`.

Uma mola ideal deformada de `x` em relação ao comprimento natural armazena `Ue = kx²/2`, com `k` em N/m. A energia depende de `x²`, portanto compressão e alongamento de mesmo módulo armazenam a mesma quantidade. A fórmula vale no regime elástico idealizado, em que a mola obedece à lei de Hooke `F = kx`.

### 4. Energia mecânica e conservação

A energia mecânica é `Em = Ec + Ug + Ue` (inclua apenas as formas presentes). Se o sistema só troca energia por forças conservativas, `Em_inicial = Em_final`. Com atrito, resistência do ar ou outra força não conservativa, uma forma prática é:

`ΔEm = Wnão conservativas`.

Como o atrito costuma realizar trabalho negativo, a energia mecânica final fica menor. Isso não significa que a energia total desapareceu: ela foi transferida, por exemplo, para energia térmica, sonora ou deformação. Em sistemas adequadamente escolhidos, a conservação da energia total continua válida.

### 5. Potência e rendimento

A potência média é a taxa média de realização de trabalho: `Pm = W/Δt`. Também pode ser escrita como energia transferida por tempo. Para força constante e velocidade instantânea, `P = F v cos θ`; em forma vetorial, `P = F · v`. Uma máquina que realiza o mesmo trabalho em menor tempo tem maior potência, mesmo que o trabalho total seja igual.

O rendimento é

`η = (energia útil / energia fornecida) × 100%`

ou, para potências, `η = (Pútil/Pfornecida) × 100%`. Em um dispositivo real, `η` é no máximo 100%; a diferença representa perdas. Não confunda potência (unidade W) com energia (unidade J).

### 6. Quantidade de movimento, impulso e colisões

A quantidade de movimento linear é `p = mv`, uma grandeza vetorial. O impulso de uma força é `I = FΔt` quando a força é constante e tem a mesma direção considerada; no caso geral, `I = ∫F dt`. Sempre vale `I = Δp = pfinal − pinicial`. O impulso pode ser obtido pela área sob o gráfico `F × t`.

Em um sistema isolado, a soma vetorial das quantidades de movimento se conserva: `Σpinicial = Σpfinal`. Em uma colisão perfeitamente inelástica, os corpos permanecem juntos após o choque; conserva-se o momento, mas parte da energia cinética é convertida em calor e deformações. Na colisão elástica ideal, conservam-se tanto o momento quanto a energia cinética. Não presuma conservação de energia cinética em todo choque.

## Método de resolução passo a passo

1. **Leia o sistema e o que é pedido.** Decida se o sistema é um corpo, dois corpos, uma máquina ou uma combinação deles.
2. **Liste dados e unidades.** Converta km/h para m/s (`÷ 3,6`) e minutos para segundos antes de calcular.
3. **Escolha o princípio adequado.** Use `W = Fd cosθ` para força constante, área do gráfico para força variável, `ΔEc = Wresultante` para velocidades, conservação de energia para trocas entre altura, velocidade e mola, e conservação de `p` para interações rápidas sem impulso externo relevante.
4. **Defina sinais e referências.** Declare o sentido positivo e o nível de altura zero. Trabalho de atrito e impulso contrário ao movimento devem entrar com sinal negativo.
5. **Escreva a equação antes de substituir números.** Isso evita misturar potência com energia e força resultante com força aplicada.
6. **Confira dimensionalmente e interprete.** Trabalho e energia terminam em J, potência em W, momento em kg·m/s e impulso em N·s. Verifique se o resultado é compatível com a situação.

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — força inclinada

Uma caixa é deslocada `4 m` horizontalmente por uma força constante de `20 N` que faz `60°` com a horizontal. O trabalho dessa força é

`W = 20 · 4 · cos 60° = 80 · 0,5 = 40 J`.

Apenas a componente horizontal (`10 N`) realiza trabalho no deslocamento. Se fosse perguntado o trabalho do peso em um trecho horizontal, ele seria nulo.

### Exemplo 2 — velocidade e trabalho resultante

Um carrinho de `2 kg` passa de `3 m/s` para `7 m/s`. O trabalho da resultante é

`ΔEc = (2/2)(7² − 3²) = 49 − 9 = 40 J`.

O sinal positivo indica aumento da energia cinética. Não é necessário conhecer separadamente cada força se a pergunta pede apenas o trabalho resultante.

### Exemplo 3 — queda sem perdas

Um objeto parte do repouso a `5 m` de altura e cai sem resistência do ar. Tomando o solo como referência, a conservação da energia dá

`m g 5 = m v²/2`.

A massa cancela: `v = √(2 · 10 · 5) = 10 m/s`. A massa influencia as energias, mas não a velocidade prevista nesse modelo ideal.

### Exemplo 4 — mola lançando um bloco

Uma mola de constante `k = 200 N/m` é comprimida `0,10 m`. A energia elástica é `Ue = 200 · (0,10)²/2 = 1 J`. Se ela lança horizontalmente um bloco de `0,50 kg`, sem perdas, então `mv²/2 = 1`; logo `v = 2 m/s`. A unidade de `k` não é N, e sim N/m.

### Exemplo 5 — potência e rendimento

Um motor transfere `1.200 J` de energia útil em `20 s`. Sua potência útil média é `1.200/20 = 60 W`. Se recebe `100 W` da fonte, o rendimento é `60/100 = 0,60`, ou `60%`. Os `40%` restantes representam perdas no modelo do problema.

### Exemplo 6 — impulso e colisão com união

Um carrinho de `2 kg`, a `6 m/s`, colide com outro de `4 kg` em repouso e ambos ficam unidos. Conservação do momento:

`2·6 + 4·0 = (2 + 4)v`;
`v = 12/6 = 2 m/s`.

A energia cinética final não é igual à inicial, pois a colisão é perfeitamente inelástica. O momento, porém, conserva-se se o impulso externo durante o choque for desprezível.

## Erros comuns e como corrigi-los

- **Usar `W = Fd` sem ângulo:** considere `cos θ` e use a componente paralela ao deslocamento.
- **Somar trabalhos sem sinais:** atrito e forças contrárias normalmente têm trabalho negativo; desenhe o sentido positivo.
- **Usar a força aplicada no teorema trabalho–energia:** o teorema pede o trabalho da resultante.
- **Confundir altura absoluta com diferença de altura:** escreva `ΔUg = mg(hf − hi)` ou escolha explicitamente o nível de referência.
- **Conservar energia mecânica apesar do atrito:** inclua `Wnão conservativas` ou reconheça a conversão para calor.
- **Confundir `J` e `W`:** joule mede energia/trabalho; watt mede joule por segundo.
- **Esquecer o quadrado da velocidade ou da deformação:** tanto `Ec` quanto `Ue` têm grandezas ao quadrado.
- **Conservar energia cinética em qualquer colisão:** a conservação geral é da energia total; a cinética só é conservada no choque elástico ideal.
- **Tratar momento como escalar:** use sinais ou vetores, principalmente em colisões em sentidos opostos.
- **Aplicar `I = FΔt` a força variável sem usar média ou área:** encontre a área no gráfico `F × t` ou o impulso integral.

## Vocabulário essencial

- **Trabalho:** energia transferida por uma força ao longo de um deslocamento.
- **Força conservativa:** força cujo trabalho entre dois pontos independe do caminho; associa-se a uma energia potencial.
- **Energia cinética:** energia ligada ao movimento.
- **Energia potencial:** energia ligada à configuração ou posição no sistema.
- **Energia mecânica:** soma das energias cinética e potenciais consideradas.
- **Dissipação:** conversão de energia mecânica em formas menos recuperáveis, como calor e som.
- **Potência:** rapidez de transferência de energia ou realização de trabalho.
- **Rendimento:** fração da energia ou potência fornecida que aparece como útil.
- **Quantidade de movimento (momento linear):** produto vetorial `m v`.
- **Impulso:** variação da quantidade de movimento causada por uma força ao longo do tempo.
- **Colisão elástica:** choque ideal em que momento e energia cinética se conservam.

## Exercícios de estudo autorais

1. Uma força de `35 N` atua a `30°` do deslocamento de `8 m`. Calcule seu trabalho e explique qual componente da força foi utilizada.
2. Um bloco de `4 kg` acelera de `2 m/s` a `5 m/s`. Determine o trabalho resultante e descreva o significado do sinal.
3. Compare a velocidade final de dois objetos que caem da mesma altura, um com e outro sem resistência do ar. Indique qual hipótese permite usar conservação de energia mecânica.
4. Uma mola de `k = 500 N/m` é deformada `0,08 m`. Calcule a energia armazenada e proponha um sistema em que ela se transforme em energia cinética.
5. Uma bomba fornece `18 kJ` em `45 s`, com `80%` de rendimento. Determine a potência fornecida e a potência útil.
6. Interprete um gráfico `F × x` formado por um retângulo positivo e um triângulo negativo: explique como obter o trabalho total pelas áreas algébricas.
7. Um carrinho de `1,5 kg` recebe um impulso contrário de `9 N·s` enquanto se move a `8 m/s`. Calcule sua velocidade final e discuta o que ocorre se o impulso superar o momento inicial.
8. Elabore uma tabela comparando colisão elástica e perfeitamente inelástica quanto à conservação do momento, da energia cinética e à deformação observada.

## Relação com a prova EEAR

O tema é especialmente útil para a prova da EEAR porque reúne leitura de situação física, álgebra, unidades e interpretação de gráficos em enunciados curtos. Treine a identificação da grandeza pedida antes de escolher a fórmula: problemas de motor e elevador costumam pedir potência ou rendimento; quedas e rampas, energia; frenagens e choques, trabalho, impulso ou momento. Faça um diagrama simples das forças, destaque alturas inicial e final e confira se a alternativa tem unidade compatível. Questões autorais deste pacote são calibração de conteúdo e nível, **não são questões oficiais da EEAR**; a prova real deve ser consultada em edital e fonte institucional vigente.

## Referências e cautelas de uso

As referências abaixo foram usadas para verificar escopo, terminologia e nível, sem copiar trechos, exercícios, respostas ou figuras. O acesso gratuito não implica licença de redistribuição.

1. [Física Básica — Mecânica, EPAMIG/ITAP](https://epamig.br/itap/wp-content/uploads/2020/07/Fisica-Aplicada.pdf) — capítulos de trabalho, potência, energia, conservação, impulso e colisões.
2. [Apostila Mecânica — Trabalho e Energia, PET-Física/UNIFAP](https://www2.unifap.br/pet-fisica/files/2022/11/Apostila-Oficial-Mecanica_-Trabalho-e-Energia-Grupo-PET.pdf) — trabalho, energia, potência e conservação, com exercícios para calibração.
3. [Apostila Impulso e quantidade de movimento, PIBID/UFRB](https://ufrb.edu.br/pibid/documentos/category/60-quantidade-de-movimento?download=223:apostila-impulso-e-quantidade-de-movimento-2) — impulso, momento, conservação e colisões.
4. [Física (1º ano), IFPB](https://estudante.ifpb.edu.br/media/cursos/82/disciplina/F%C3%ADsica_1%C2%BA_ano.pdf) — ementa curricular de trabalho, energia, potência, rendimento, impulso e colisões.

O material é autoral e didático. Consulte os documentos originais para aprofundamento e respeite as condições de direitos indicadas em cada fonte.
