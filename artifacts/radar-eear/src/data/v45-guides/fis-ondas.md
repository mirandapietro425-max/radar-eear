# fis-ondas — Física: Ondas e óptica

**ID de integração:** `fis-ondas`  
**Área:** Física  
**Escopo:** ondas mecânicas e eletromagnéticas, som, óptica geométrica e instrumentos ópticos.

## Objetivo e pré-requisitos

Este guia prepara o estudante para interpretar fenômenos ondulatórios e resolver problemas quantitativos de ondas, som, reflexão, refração, espelhos, lentes e instrumentos ópticos. Ao final, você deverá reconhecer grandezas e unidades, escolher a relação física adequada, representar raios e imagens e justificar a resposta sem depender apenas de memorização.

É conveniente dominar álgebra básica, notação científica, conversão de unidades, trigonometria elementar (especialmente seno), interpretação de gráficos e operações com frações. Também ajuda conhecer velocidade, aceleração e conservação de energia, pois várias situações de ondas e óptica são aplicações desses temas.

## Explicação curta

Uma onda é uma perturbação que se propaga transportando energia e informação, sem transportar matéria de modo permanente. Em uma onda periódica, a frequência `f` indica quantas oscilações ocorrem por segundo, o período `T` é o tempo de uma oscilação, o comprimento de onda `λ` é a distância entre pontos em mesma fase e a velocidade de propagação satisfaz `v = λf`.

O som é uma onda mecânica: precisa de meio material. A luz é uma onda eletromagnética e pode propagar-se no vácuo. Na óptica geométrica, a luz é modelada por raios: na reflexão, o ângulo de incidência é igual ao de reflexão; na refração, a velocidade e o comprimento de onda mudam quando a luz passa de um meio para outro, enquanto a frequência permanece constante. Espelhos refletem e lentes refratam para formar imagens.

## Conceitos fundamentais

### 1. Classificação e grandezas de onda

Ondas **mecânicas** exigem um meio elástico (corda, água, ar); ondas **eletromagnéticas**, como luz, rádio e micro-ondas, não exigem meio material. Quanto à direção da vibração, uma onda é **transversal** quando a vibração é perpendicular à propagação (uma onda em uma corda) e **longitudinal** quando é paralela (som no ar). Ondas na superfície da água podem combinar componentes e são chamadas mistas.

- **Amplitude (`A`):** afastamento máximo em relação ao equilíbrio; em muitos contextos relaciona-se à energia transportada.
- **Período (`T`):** duração de um ciclo, em segundos.
- **Frequência (`f`):** ciclos por segundo, em hertz; `f = 1/T`.
- **Comprimento de onda (`λ`):** distância entre cristas sucessivas ou compressões sucessivas, por exemplo.
- **Velocidade (`v`):** rapidez de propagação; `v = λ/T = λf`.
- **Fase:** estado de oscilação. Pontos separados por um número inteiro de comprimentos de onda estão em fase.

A fonte determina a frequência de uma onda periódica; o meio determina sua velocidade. Portanto, ao mudar de meio, a frequência permanece igual à da fonte, mas `v` e `λ` podem mudar. Não confunda velocidade de propagação com velocidade instantânea de um ponto do meio, que oscila em torno do equilíbrio.

### 2. Som e fenômenos ondulatórios

O som no ar é longitudinal e mecânico. O intervalo audível humano é aproximadamente de 20 Hz a 20 kHz; abaixo dele estão os infrassons e acima, os ultrassons. **Altura** relaciona-se à frequência (grave: menor frequência; agudo: maior), enquanto **intensidade** depende da energia por área e se associa à sensação de volume. Timbre distingue fontes com a mesma frequência fundamental.

A velocidade do som depende do meio e, no ar, aumenta em geral com a temperatura. Em duas fontes próximas, a superposição de frequências produz **batimentos**, cuja frequência é `f_b = |f_1 - f_2|`. No **efeito Doppler**, a frequência percebida muda por movimento relativo entre fonte e observador: aproximação tende a elevar a frequência percebida; afastamento tende a reduzi-la. A direção do movimento e a velocidade do som devem ser identificadas antes de usar qualquer expressão quantitativa.

### 3. Reflexão e refração

Na reflexão, o raio incidente, a normal e o raio refletido estão no mesmo plano e `i = r`, sempre medindo os ângulos em relação à normal, não à superfície. Na reflexão regular, uma superfície lisa mantém feixes organizados; na difusa, irregularidades espalham os raios, embora a lei local continue válida.

Na refração, a lei de Snell é

`n_1 sen i = n_2 sen r`,

em que `n` é o índice de refração, `i` o ângulo no primeiro meio e `r` no segundo. O índice também pode ser escrito como `n = c/v`, com `c` como velocidade da luz no vácuo. Ao entrar em meio de maior índice, a luz diminui a velocidade e se aproxima da normal; ao entrar em menor índice, afasta-se da normal. A frequência não muda, e `λ = v/f` muda na mesma proporção da velocidade.

Quando a luz vai de um meio mais refringente para outro menos refringente, pode haver **reflexão interna total**. Ela exige incidência acima do ângulo crítico, definido por `sen θ_c = n_2/n_1` (`n_1 > n_2`), além da direção correta da passagem.

### 4. Espelhos

No espelho plano, a imagem é virtual, direita, do mesmo tamanho e simétrica: fica à mesma distância atrás do espelho que o objeto está à frente. A distância objeto-imagem é o dobro da distância do objeto ao plano refletor.

Para espelhos esféricos paraxiais, o foco satisfaz `f = R/2`, e a equação de Gauss é

`1/f = 1/p + 1/p'`.

A ampliação linear é `m = h'/h = -p'/p`. Com uma convenção cartesiana coerente, objeto real diante do espelho tem `p > 0`; espelho côncavo tem `f > 0`, convexo tem `f < 0`. `p' > 0` representa imagem real diante do espelho e `p' < 0`, imagem virtual atrás; `m < 0` indica imagem invertida. O mais importante é não misturar convenções no mesmo cálculo.

### 5. Lentes delgadas e instrumentos

Uma lente **convergente** é mais espessa no centro e, no modelo usual, tem `f > 0`; uma **divergente** é mais espessa nas bordas e tem `f < 0`. Para uma lente delgada no ar, usa-se a mesma forma algébrica:

`1/f = 1/p + 1/p'` e `m = h'/h = -p'/p`.

Em uma lente convergente, objeto além de `2f` gera imagem real, invertida e menor; entre `f` e `2f`, real, invertida e maior; entre a lente e `f`, virtual, direita e maior. A lente divergente, para objeto real, forma imagem virtual, direita e menor. Novamente, a conclusão deve ser compatível com os sinais calculados.

A **lupa** é uma lente convergente usada com o objeto dentro do foco; a imagem é virtual e ampliada. Para olho relaxado, uma aproximação comum é `M ≈ D/f`, com `D ≈ 25 cm` e `f` em centímetros. Em uma luneta astronômica ajustada para imagem final no infinito, a ampliação angular em módulo é `|M| = f_obj/f_oc`, e a imagem normalmente é invertida. Microscópios combinam objetiva de pequena distância focal com ocular de aumento angular. O olho forma imagem real e invertida na retina; a acomodação altera a distância focal do cristalino.

## Como resolver passo a passo

1. **Classifique a situação:** onda ou raio de luz? som, espelho, lente, aparelho óptico? Identifique o meio e a direção do movimento.
2. **Liste dados e unidades:** converta centímetros para metros quando a velocidade estiver em m/s; escreva ângulos a partir da normal.
3. **Desenhe o modelo:** marque normal, foco, centro de curvatura e raios principais; para ondas, indique crista, período ou uma distância de fase.
4. **Escolha a lei antes de substituir números:** `v = λf`, Snell, Gauss, ampliação ou relação do instrumento. Não use `c` automaticamente para qualquer onda.
5. **Mantenha a convenção de sinais:** a interpretação de `p'`, `m` e `f` depende da convenção adotada.
6. **Confira o resultado:** unidades, ordem de grandeza e natureza da imagem. Em refração, a frequência deve permanecer; em uma lente divergente com objeto real, uma imagem real seria um sinal de erro no modelo básico.

## Exemplos autorais comentados

### Exemplo 1 — parâmetros de uma onda

Uma onda tem `f = 8 Hz` e `λ = 0,75 m`. Então `T = 1/f = 0,125 s` e `v = λf = 6,0 m/s`. Se a onda entrar em outro meio e sua velocidade passar a 4,0 m/s, a frequência da fonte continua 8 Hz e o novo comprimento é `λ' = v'/f = 0,50 m`.

### Exemplo 2 — batimentos

Duas fontes sonoras emitem 252 Hz e 260 Hz. O ouvinte percebe `|260 - 252| = 8` batimentos por segundo. Isso não significa que o som tenha 8 Hz: cada fonte mantém sua frequência, e 8 Hz é a taxa de variação periódica da intensidade resultante.

### Exemplo 3 — reflexão em espelho plano

Uma pessoa está a 1,8 m de um espelho. A imagem fica 1,8 m atrás dele e a separação pessoa-imagem é `3,6 m`. Se o raio chega fazendo 40° com a normal, volta fazendo 40° com a normal, embora faça 50° com a superfície.

### Exemplo 4 — refração

Um raio passa do ar (`n_1 = 1,0`) para vidro (`n_2 = 1,5`) com incidência de 30°. Pela lei de Snell, `sen r = sen 30°/1,5 = 1/3`, logo `r ≈ 19,5°`. O raio aproxima-se da normal. Sua frequência fica igual, mas sua velocidade e seu comprimento de onda diminuem para cerca de dois terços dos valores no ar.

### Exemplo 5 — espelho côncavo

Para `f = 20 cm` e objeto a `p = 60 cm`, `1/p' = 1/20 - 1/60 = 1/30`; portanto `p' = 30 cm`. A ampliação é `m = -30/60 = -0,5`: imagem real, invertida e com metade da altura do objeto.

### Exemplo 6 — lente e lupa

Uma lente convergente tem `f = 10 cm` e objeto a `p = 15 cm`. Resulta `1/p' = 1/10 - 1/15 = 1/30`, então `p' = 30 cm` e `m = -2`; a imagem é real, invertida e duas vezes maior. Se a mesma lente for usada como lupa com objeto entre a lente e o foco, a imagem passa a ser virtual, direita e ampliada; não se deve reutilizar automaticamente o primeiro tipo de imagem.

## Erros comuns e como corrigi-los

- **Medir ângulo a partir da superfície:** desenhe a normal antes de ler o ângulo; a lei usa a normal.
- **Achar que a frequência muda ao mudar de meio:** a fonte continua oscilando no mesmo ritmo; recalcule apenas velocidade e comprimento de onda.
- **Confundir altura do som com intensidade:** altura é frequência; intensidade está ligada à energia por área.
- **Usar `v = c` para som:** `c` é a velocidade da luz no vácuo; som depende do meio.
- **Misturar sinais de espelhos e lentes:** escreva no topo da solução qual convenção adotará e verifique se a imagem faz sentido.
- **Afirmar que toda lente convergente produz imagem real:** objeto dentro do foco produz imagem virtual no modelo ideal.
- **Esquecer que espelho plano duplica a distância:** a imagem está atrás do espelho, não sobre sua superfície.
- **Aplicar reflexão interna total no sentido errado:** primeiro confirme que a luz vai do maior para o menor índice.
- **Confundir aumento linear com angular:** tamanho da imagem usa `m`; instrumentos ópticos comparam ângulos.

## Vocabulário essencial

**Amplitude:** afastamento máximo da oscilação. **Fase:** estado de vibração. **Frequência:** ciclos por segundo. **Período:** tempo de um ciclo. **Comprimento de onda:** distância entre pontos equivalentes consecutivos. **Normal:** reta perpendicular à superfície no ponto de incidência. **Índice de refração:** razão `c/v`. **Foco:** ponto para o qual raios paralelos convergem ou do qual parecem divergir. **Imagem real:** formada pela convergência efetiva dos raios e projetável. **Imagem virtual:** formada pelo prolongamento aparente dos raios e não projetável diretamente. **Vergência:** medida do poder óptico, usualmente `V = 1/f` quando `f` está em metros. **Acomodação:** ajuste do cristalino para focalizar objetos a diferentes distâncias. **Batimento:** variação periódica de intensidade causada por frequências próximas. **Doppler:** alteração da frequência percebida por movimento relativo.

## Exercícios de estudo autorais

1. Uma onda de 12 Hz tem comprimento de 0,40 m. Calcule seu período e velocidade.
2. Explique por que uma onda eletromagnética pode viajar no vácuo, enquanto o som não pode.
3. Duas notas de 440 Hz e 446 Hz são emitidas simultaneamente. Qual é a frequência dos batimentos? Diferencie esse valor das frequências das notas.
4. Um raio incide em um espelho plano a 27° da normal. Determine o ângulo entre os raios incidente e refletido.
5. Descreva as mudanças de velocidade, frequência e comprimento de onda quando a luz passa do vidro para o ar.
6. Um espelho côncavo tem foco de 15 cm e recebe objeto a 45 cm. Determine posição, orientação e tamanho relativo da imagem.
7. Uma lente divergente de foco `-12 cm` recebe objeto real a 24 cm. Use a equação das lentes e interprete os sinais.
8. Compare lupa, microscópio e luneta quanto às lentes principais e ao tipo de grandeza ampliada.
9. Um observador se aproxima de uma fonte sonora parada. Sem calcular, indique o que ocorre com a frequência percebida e justifique pelo efeito Doppler.
10. Explique duas condições necessárias para reflexão interna total e dê um exemplo tecnológico de sua utilização.

## Relação com a prova EEAR

Ondas e óptica costuma exigir leitura cuidadosa de situações, conversão de unidades e aplicação direta de relações fundamentais. Para uma preparação compatível com a EEAR, treine primeiro `f`, `T`, `λ` e `v`; em seguida, resolva problemas de som e Doppler, reflexão/refração e, por fim, espelhos, lentes e instrumentos. Em cada item, desenhe a normal ou um esquema de raios antes da conta. A prova pode combinar interpretação conceitual com cálculo curto: saber dizer se a imagem é real/virtual, direita/invertida e maior/menor é tão importante quanto chegar ao número. Use listas e provas somente para calibração de estilo e dificuldade, sem reproduzir enunciados protegidos.

## Referências para estudo e calibração

As referências abaixo foram registradas no índice de pesquisa. Elas orientam conceitos e nível, mas não autorizam copiar textos, figuras, exercícios ou respostas protegidas.

- [Fluídos, oscilações e ondas — UFSM](https://repositorio.ufsm.br/handle/1/18388) — classificação, parâmetros de onda e som; acesso aberto com licença CC BY-NC 4.0 conforme o registro.
- [Fundamentos de Óptica — UFPR](http://fisica.ufpr.br/celso/FundOptica.pdf) — luz, reflexão, refração, espelhos, lentes e instrumentos; consultar condições de uso indicadas no índice.
- [Uma proposta de ensino para o estudo da Óptica Geométrica — UTFPR](https://repositorio.utfpr.edu.br/jspui/handle/1/33920) — atividades e aplicações de óptica geométrica; licença CC BY-NC-SA 4.0 conforme o registro.
- [Introdução às Ciências Físicas, Aula 5: Lentes e instrumentos ópticos — UFRJ/CEDERJ](https://www.if.ufrj.br/~marta/int-fis/icf-mod1-cap5.pdf) — lentes delgadas, formação de imagens e instrumentos; usar como referência de estudo/calibração.

Este material é uma síntese autoral para estudo; não reproduz trechos, figuras ou questões das fontes.