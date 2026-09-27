# fis-dinamica — Física: Dinâmica

**ID de integração:** `fis-dinamica`  
**Área:** Física  
**Foco:** forças, movimento e interações mecânicas, com preparação para questões da EEAR.

## Objetivo e pré-requisitos

Ao terminar este guia, você deverá ser capaz de identificar as forças que atuam em um corpo, representar um diagrama de corpo livre, escolher eixos convenientes, aplicar as leis de Newton, interpretar atrito, peso, normal e tração, e resolver situações de equilíbrio, movimento circular e gravitação. O objetivo não é decorar fórmulas isoladas: é transformar uma situação descrita em uma relação vetorial coerente e conferir se o resultado tem sentido físico.

Antes de iniciar, revise: operações com números e unidades do SI; decomposição de vetores em componentes; seno e cosseno de ângulos usuais; equações do movimento uniformemente acelerado; noções de massa, velocidade e aceleração. Convém adotar `g = 10 m/s²` quando o enunciado da prova não fornecer outro valor, mas a indicação da questão sempre prevalece.

## Explicação curta

Dinâmica estuda como as interações alteram o movimento. Força é uma grandeza vetorial, medida em newtons (N), e a aceleração de um corpo é determinada pela **resultante** das forças externas: `ΣF = m a`. Se a resultante é nula, a aceleração é nula; o corpo pode estar parado ou em movimento retilíneo uniforme. Uma força não “pertence” sozinha ao objeto: ela descreve uma interação entre corpos. Em uma curva, mesmo que o módulo da velocidade seja constante, sua direção muda e há aceleração centrípeta. Já a gravitação é uma interação universal que diminui com o quadrado da distância entre os centros dos corpos.

## Conceitos fundamentais

### 1. Leis de Newton

- **Primeira lei (inércia):** em um referencial inercial, se `ΣF = 0`, a velocidade permanece constante. Repouso é apenas um caso particular.
- **Segunda lei:** `ΣF = m a`. A aceleração tem a mesma direção da resultante, módulo proporcional à força e inversamente proporcional à massa. A forma vetorial deve ser projetada nos eixos escolhidos.
- **Terceira lei (ação e reação):** toda interação envolve forças de mesmo módulo e direção, sentidos opostos, aplicadas em corpos diferentes. Por isso, elas não se cancelam no diagrama de um único corpo.

### 2. Forças e diagrama de corpo livre

O diagrama de corpo livre (DCL) isola o corpo ou sistema escolhido e desenha apenas forças externas. As forças mais frequentes são: peso `P`, normal `N`, tração `T`, atrito `f` e uma força aplicada. Peso aponta verticalmente para baixo, normal é perpendicular à superfície, tração acompanha a corda e atrito é paralelo à superfície, opondo-se ao deslizamento ou à tendência de deslizamento. Não desenhe “força de movimento”: movimento é estado cinemático, não uma interação.

A normal não é automaticamente igual ao peso. Em uma mesa horizontal, sem aceleração vertical, costuma ocorrer `N = P`; em um elevador acelerado ou num plano inclinado, essa igualdade pode falhar. Tampouco normal e peso formam um par de ação e reação: ambas atuam no mesmo corpo. A reação ao peso é a atração gravitacional do corpo sobre a Terra.

### 3. Equilíbrio

Para uma partícula em equilíbrio translacional, `ΣF = 0` em cada eixo. Isso significa que as forças podem existir e ser grandes, mas se compensam. Em uma ponte ou corpo extenso, a ausência de rotação também exige resultante de torques nula; no escopo elementar da EEAR, primeiro identifique se o problema trata uma partícula ou pede explicitamente rotação.

### 4. Atrito

O atrito estático impede o início do deslizamento e se ajusta ao valor necessário até um limite:

`0 ≤ fₑ ≤ μₑ N`, com `fₑ,máx = μₑ N`.

Assim, não se deve colocar `fₑ = μₑN` sempre. Se uma força horizontal de 20 N é aplicada a um bloco e 20 N bastam para mantê-lo parado, o atrito é 20 N, desde que não ultrapasse o máximo. Se há deslizamento, usa-se o atrito cinético:

`f𝚌 = μ𝚌 N`.

Em geral, `μₑ ≥ μ𝚌`, mas o valor fornecido no enunciado deve ser usado. O atrito realiza trabalho contrário ao deslocamento relativo na interface; sua direção é oposta ao movimento (ou à tendência), não necessariamente oposta a todas as forças.

### 5. Peso, gravidade e tração

Próximo à superfície terrestre, `P = m g`, onde massa é medida em quilogramas e peso em newtons. A massa é uma propriedade do corpo; o peso varia com `g`. Em uma corda ideal, de massa desprezível e inextensível, a tração tem o mesmo módulo ao longo da corda quando não há polia com perdas. Se a polia tem massa, eixo com atrito ou a corda não é ideal, a tensão pode não ser igual nos trechos.

### 6. Movimento circular

Mesmo com rapidez constante, a velocidade muda de direção. Para uma trajetória circular de raio `r`:

`a𝚌 = v²/r = ω²r`,  `v = ωr`,  `ω = 2π/T = 2πf`.

A resultante radial, chamada frequentemente de força centrípeta, é `F𝚌 = m v²/r`. “Centrípeta” não é uma força nova: pode ser fornecida por atrito, tração, normal, gravidade ou uma combinação delas. Se a rapidez também varia, há componente tangencial `aₜ = Δv/Δt`; a resultante total combina componentes radial e tangencial perpendiculares.

### 7. Gravitação universal

Dois corpos de massas `M` e `m`, separados por distância entre seus centros `r`, atraem-se com módulo

`F = G M m/r²`.

Perto da superfície de um astro, `g = GM/R²`; a uma distância `r` do centro, `g(r) = GM/r²`. Portanto, dobrar a distância reduz a força e o campo gravitacional a um quarto. Em órbita circular, a gravidade fornece a resultante centrípeta: `GMm/r² = mv²/r`, logo `v = √(GM/r)`. A órbita mais distante tem menor velocidade orbital e maior período: `T = 2π√(r³/GM)`.

## Método passo a passo para resolver problemas

1. **Leia a situação física:** liste corpos, superfícies, cordas, aceleração indicada e dados numéricos. Converta tudo para o SI.
2. **Escolha o sistema:** isole um corpo quando quiser sua aceleração ou uma força; trate vários corpos juntos quando uma força interna for irrelevante.
3. **Faça o DCL:** desenhe peso, normal, tração, atritos e forças aplicadas. Não inclua pares de ação e reação no mesmo DCL só para “cancelar”.
4. **Escolha os eixos:** em uma rampa, use um eixo paralelo e outro perpendicular; em movimento circular, use radial e tangencial. Defina o sentido positivo.
5. **Decomponha vetores:** em uma rampa de ângulo `θ`, o peso tem componentes `mg sen θ` ao longo da rampa e `mg cos θ` perpendicularmente. Confirme qual cateto corresponde ao ângulo.
6. **Escreva uma equação por eixo:** `ΣFₓ = maₓ` e `ΣFᵧ = maᵧ`. Para equilíbrio, o lado direito é zero; para curva, a equação radial é `ΣFᵣ = mv²/r`.
7. **Use a condição adequada:** estático exige limite de atrito; cinético exige `f = μ𝚌N`; corda ideal permite a mesma tração; gravitação usa a distância entre centros.
8. **Resolva e faça a checagem:** a unidade deve ser correta, a aceleração deve apontar no sentido previsto e uma força normal ou um atrito não deve assumir valor impossível. Refaça o raciocínio se a resposta exigir atrito estático maior que `μₑN`.

## Fórmulas e condições de uso — quadro de revisão

| Situação | Relação | Condição ou cuidado |
|---|---|---|
| Dinâmica translacional | `ΣF = ma` | Referencial inercial; vetor ou componentes. |
| Equilíbrio translacional | `ΣFₓ = 0` e `ΣFᵧ = 0` | Aceleração nula, não necessariamente repouso. |
| Peso próximo à superfície | `P = mg` | `g` local e aproximadamente constante. |
| Atrito estático | `fₑ ≤ μₑN` | Valor real é o necessário, até o máximo. |
| Atrito cinético | `f𝚌 = μ𝚌N` | Há deslizamento; use o `N` calculado. |
| Circular uniforme | `a𝚌 = v²/r` | Rapidez constante, direção variável. |
| Gravitação | `F = GMm/r²` | `r` é a separação entre centros. |
| Órbita circular | `v = √(GM/r)` | Gravidade é a resultante radial. |

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — força resultante e aceleração
Um carrinho de 4 kg recebe forças horizontais de 18 N para a direita e 6 N para a esquerda. A resultante é `18 − 6 = 12 N` para a direita. Pela segunda lei, `a = 12/4 = 3 m/s²` para a direita. A aceleração não é causada por uma das forças isoladamente, mas pela soma vetorial.

### Exemplo 2 — atrito cinético em superfície horizontal
Um bloco de 5 kg desliza para a direita sobre uma mesa, puxado por 20 N. Se `μ𝚌 = 0,20` e `g = 10 m/s²`, o DCL dá `N = mg = 50 N` e `f𝚌 = 0,20 · 50 = 10 N` para a esquerda. A resultante é 10 N para a direita e `a = 10/5 = 2 m/s²`. Se o bloco estivesse parado, não seria legítimo usar automaticamente 10 N: primeiro seria necessário verificar o atrito estático e a tendência de movimento.

### Exemplo 3 — dois corpos e tração
Dois corpos de 2 kg e 3 kg estão ligados por corda ideal e passam por polia ideal; o corpo de 3 kg desce. Para o conjunto, `a = (3−2)g/(3+2) = 2 m/s²`. No corpo de 2 kg, que sobe, `T − 20 = 2·2`; logo `T = 24 N`. A mesma tração aparece no outro trecho porque a corda e a polia foram idealizadas. Usar `T = mg` nos dois corpos ignoraria a aceleração.

### Exemplo 4 — curva horizontal e limite de atrito
Um carro de 600 kg faz uma curva de raio 50 m com rapidez 10 m/s. A aceleração radial é `10²/50 = 2 m/s²`; a resultante radial necessária é `600·2 = 1.200 N`. Em uma via horizontal, essa resultante pode ser o atrito estático entre pneu e pista. Não se deve somar uma “força centrípeta” extra ao atrito: centrípeta é o nome do papel radial da resultante.

### Exemplo 5 — gravitação e escala de distância
Se um satélite passa de uma distância `r` para `2r` do centro do planeta, mantendo as massas, a força gravitacional passa de `GMm/r²` para `GMm/(2r)² = F/4`. A queda não é pela metade porque a lei é de inverso do quadrado. Na mesma mudança, a velocidade orbital circular cai por um fator `√2`, pois depende de `1/√r`.

## Erros comuns e como corrigi-los

- **Confundir massa e peso:** massa permanece em kg; peso é força em N. Escreva primeiro `P = mg` e confira a unidade.
- **Achar que resultante zero significa ausência de forças:** desenhe todas as forças e some componentes; equilíbrio é compensação.
- **Cancelar ação e reação no mesmo corpo:** identifique os dois corpos da interação. Se as forças estão no mesmo DCL, provavelmente não são um par de terceira lei.
- **Fazer `fₑ = μₑN` sem testar:** calcule o atrito exigido pelo equilíbrio e só depois compare com o máximo.
- **Tomar normal como sempre igual ao peso:** escreva a equação perpendicular à superfície; aceleração, inclinação ou outras forças podem mudar `N`.
- **Inventar força centrípeta separada:** procure qual força real aponta radialmente e some-a na equação `ΣFᵣ = mv²/r`.
- **Usar distância ao solo na gravitação:** em `GMm/r²`, a distância é entre os centros de massa, salvo aproximação explicitamente válida.
- **Misturar graus, metros e quilômetros:** converta raio para metros e velocidade para m/s antes de aplicar as fórmulas.

## Vocabulário essencial

**Resultante:** soma vetorial das forças externas. **Inércia:** tendência de manter o estado de movimento. **DCL:** representação isolada das forças sobre um sistema. **Normal:** força de contato perpendicular à superfície. **Tração/tensão:** força transmitida por corda, cabo ou fio. **Atrito estático:** contato que impede o deslizamento relativo. **Atrito cinético:** contato durante o deslizamento. **Centrípeta:** componente radial da resultante que curva a trajetória. **Tangencial:** componente associada à mudança de rapidez. **Campo gravitacional `g`:** força gravitacional por unidade de massa. **Referencial inercial:** sistema em que a primeira lei de Newton é válida sem força fictícia.

## Exercícios de estudo autorais

1. Um bloco de 8 kg é puxado por 40 N em uma mesa sem atrito. Determine a aceleração e descreva o DCL.
2. Uma caixa permanece parada quando sofre uma força horizontal de 25 N. Explique por que isso não permite concluir imediatamente que o atrito máximo vale 25 N; indique quais dados faltariam.
3. Em um elevador, uma pessoa de 60 kg tem aceleração vertical para baixo de 1,5 m/s². Encontre a normal usando `g = 10 m/s²` e interprete o resultado.
4. Dois corpos de massas diferentes ligados por fio ideal estão sobre uma polia. Monte as duas equações de Newton e explique como descobrir a tração após a aceleração.
5. Um objeto percorre uma curva de raio 20 m a 8 m/s. Calcule a aceleração radial e diga que interação poderia fornecê-la em uma pista horizontal.
6. Um bloco desce uma rampa de 37° com atrito cinético. Liste as componentes do peso e as forças no eixo perpendicular antes de calcular a aceleração; use `sen 37° ≈ 0,60` e `cos 37° ≈ 0,80`.
7. Compare a força gravitacional entre dois corpos a uma distância `r` e a uma distância `3r`. Justifique a razão sem substituir números.
8. Explique, com um exemplo próprio, por que um corpo em movimento circular uniforme tem aceleração embora sua rapidez permaneça constante.

## Relação com a prova EEAR

Dinâmica costuma aparecer em enunciados curtos, com desenho mental ou esquema simples, exigindo leitura precisa de sinais e unidades. Para a EEAR, priorize: leis de Newton e pares de ação-reação; DCL de bloco, plano inclinado e elevador; diferença entre normal, peso, atrito e tração; equilíbrio e resultante nula; força centrípeta como resultante; e lei do inverso do quadrado na gravitação. Treine tanto perguntas conceituais quanto cálculos com `g = 10 m/s²`, verificando a ordem de grandeza. Uma estratégia eficiente é resolver primeiro por componentes e só então olhar as alternativas: muitos distratores trocam massa por peso, usam o atrito máximo no caso errado ou tratam centrípeta como força adicional.

## Referências e limites de uso

As explicações acima são autorais e não reproduzem trechos, exercícios, respostas ou figuras das obras consultadas. As referências servem para estudo e calibração; respeite as licenças indicadas nas próprias fontes e atribua adequadamente qualquer reutilização permitida.

- [Física 1 — Dinâmica, Jaime E. Villate / Universidade do Porto](https://hdl.handle.net/10216/126235) — acesso aberto; a ficha e o PDF indicam licença CC BY-SA, a conferir na versão consultada.
- [Notas de Física I, Natalia Vale Asari / UFSC](http://minerva.ufsc.br/~natalia/teaching/FSC5101-FSC5107-2022-1/FSC5101-20221.pdf) — material expositivo aberto para leitura; licença geral não localizada.
- [Apostila de Revisão nº 2 — Mecânica: Forças e Leis de Newton, UFRB/PIBID](https://www.ufrb.edu.br/pibid/documentos/category/54-dinamica?download=184:dinmica) — acesso público para estudo e calibração; licença não localizada.
- [College Physics 1e, OpenStax, espelho LibreTexts — capítulos 4 a 6](https://phys.libretexts.org/Bookshelves/College_Physics/College_Physics_1e_(OpenStax)) — conteúdo indicado como CC BY 4.0 na coleção; verificar créditos de figuras e elementos de terceiros.

**Identificação final:** `contentId = fis-dinamica`. O guia não constitui transcrição nem material oficial da EEAR; é material didático autoral para revisão.
