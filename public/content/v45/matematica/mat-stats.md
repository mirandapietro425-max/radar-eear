# mat-stats — Matemática: Estatística e probabilidade

**ID do conteúdo:** `mat-stats`  
**Escopo:** leitura e organização de dados, medidas descritivas, contagem e probabilidade, com foco em resolução de problemas no nível da EEAR.

## Objetivo e pré-requisitos

Ao terminar este guia, você deverá conseguir transformar dados brutos em tabelas e gráficos, calcular e interpretar média, mediana, moda e medidas de dispersão, contar possibilidades sem enumerá-las uma a uma e resolver probabilidades simples, condicionais e de eventos independentes. O objetivo não é decorar fórmulas isoladas: é escolher o modelo adequado, explicitar o espaço de resultados e conferir se a resposta faz sentido.

Antes de estudar, revise operações com frações e decimais, porcentagens, regra de três, potenciação e radiciação, equações de primeiro grau e leitura de plano cartesiano. Também é importante saber ordenar números e interpretar expressões como “ao menos”, “exatamente”, “sem reposição” e “dado que”. Esses termos mudam o conjunto de casos possíveis.

## Explicação curta

Estatística descritiva resume uma coleção de observações. Uma tabela de frequência mostra quantas vezes cada valor ou classe ocorre; gráficos tornam padrões visíveis. A média usa todos os valores, a mediana localiza o centro da lista ordenada e a moda indica o valor mais frequente. A amplitude, a variância e o desvio-padrão descrevem o espalhamento.

Probabilidade mede a chance de um evento. Em um espaço amostral finito e equiprovável, use `P(A) = casos favoráveis / casos possíveis`. Para eventos que acontecem juntos, use interseção; para “A ou B”, use união, evitando contar duas vezes a interseção. Se uma informação já ocorreu, o universo muda e entra a probabilidade condicional. A contagem (princípio multiplicativo, permutações e combinações) fornece os casos possíveis ou favoráveis.

## Conceitos fundamentais

### Dados, população, amostra e frequência

Uma **população** é o conjunto que se deseja estudar; uma **amostra** é a parcela observada. O dado pode ser qualitativo (categoria, como turno) ou quantitativo (número, como tempo). Uma variável quantitativa é discreta quando resulta de contagem e contínua quando pode assumir valores em um intervalo.

A **frequência absoluta** `fᵢ` conta ocorrências. O total é `n = Σfᵢ`. A **frequência relativa** é `fᵢ/n`, frequentemente apresentada em porcentagem; a soma das frequências relativas deve ser 1 (ou 100%). A frequência acumulada soma as frequências até determinado valor e só faz sentido quando há uma ordem.

Ao construir classes, não sobreponha intervalos. Por exemplo, `10 ≤ x < 20` e `20 ≤ x < 30` são classes contíguas e cada observação pertence a uma só classe. O gráfico de barras separa categorias; o histograma usa intervalos numéricos contíguos; o gráfico de setores compara partes de um total; o gráfico de linhas é útil para evolução ordenada no tempo.

### Medidas de posição

Para dados `x₁, x₂, ..., xₙ`, a média aritmética é

`x̄ = (x₁ + x₂ + ... + xₙ)/n`.

Se os valores `xᵢ` têm frequências `fᵢ`, a média ponderada pela frequência é `x̄ = Σ(xᵢfᵢ)/Σfᵢ`. Uma média ponderada também pode aparecer quando pesos diferentes são informados; o denominador é a soma dos pesos, não necessariamente a quantidade de itens.

A **mediana** exige ordenar os dados. Se `n` é ímpar, é o termo central; se `n` é par, é a média dos dois termos centrais. A **moda** é o valor ou categoria de maior frequência. Pode haver mais de uma moda ou nenhuma moda clara. A média é sensível a valores extremos; mediana e moda podem ser mais representativas em dados assimétricos ou categóricos.

### Medidas de dispersão

A **amplitude total** é `máximo − mínimo`. Para uma população, a variância é

`σ² = Σ(xᵢ − μ)²/N`,

em que `μ` é a média e `N` é o número de observações; o desvio-padrão é `σ = √σ²`. Em uma amostra usada para estimar uma população, é comum usar `s² = Σ(xᵢ − x̄)²/(n−1)`. Não misture os denominadores: a fórmula com `n−1` tem outra finalidade.

O **coeficiente de variação** é `CV = (desvio-padrão/média) × 100%`, desde que a média seja não nula e faça sentido comparar a razão. Em conjuntos com escalas diferentes, o menor CV indica menor dispersão relativa; compare sempre conjuntos que medem grandezas compatíveis.

### Contagem

No princípio multiplicativo, se uma escolha pode ser feita de `a` maneiras e outra, depois dela, de `b` maneiras, o total é `a·b`. Se a ordem de `r` elementos escolhidos entre `n` importa, a quantidade de arranjos é `A(n,r) = n!/(n−r)!`. Se se ordenam todos os `n`, há `n!` permutações. Se a ordem não importa, use combinações `C(n,r) = n!/[r!(n−r)!]`.

A condição “sem repetição” reduz as opções a cada etapa. Com repetição permitida, o número de escolhas pode permanecer constante. Antes de aplicar fórmula, pergunte: a ordem distingue resultados? Pode repetir? Todos os objetos são distintos?

### Probabilidade e eventos

O **espaço amostral** `Ω` reúne todos os resultados possíveis. Um **evento** `A` é um subconjunto de `Ω`. Em casos finitos equiprováveis, `P(A)=|A|/|Ω|`, com `0 ≤ P(A) ≤ 1`. O complementar é `Aᶜ`, e `P(Aᶜ)=1−P(A)`.

A união “A ou B” obedece a `P(A∪B)=P(A)+P(B)−P(A∩B)`. Se os eventos são mutuamente exclusivos, `A∩B=∅` e o último termo é zero. A interseção “A e B” pode ser escrita como `P(A∩B)=P(A)P(B|A)`. Eventos independentes satisfazem `P(B|A)=P(B)` (quando `P(A)>0`) ou, equivalentemente, `P(A∩B)=P(A)P(B)`.

A probabilidade condicional é `P(B|A)=P(A∩B)/P(A)`, com `P(A)>0`. A barra significa “sabendo que A ocorreu”: o denominador é o novo universo, não o total original. Para categorias que particionam o espaço, a probabilidade total é `P(B)=ΣP(B|Aᵢ)P(Aᵢ)`. Bayes inverte a condição: `P(Aⱼ|B)=P(B|Aⱼ)P(Aⱼ)/P(B)`.

## Resolução passo a passo

1. **Traduza o enunciado.** Circule números, unidades e palavras como “ou”, “e”, “dado que”, “pelo menos” e “sem reposição”.
2. **Organize os dados.** Ordene uma lista, faça uma tabela de frequência ou desenhe uma árvore quando houver etapas.
3. **Defina o universo.** Em probabilidade condicional, restrinja o universo ao que já foi informado. Em contagem, decida se a ordem e a repetição importam.
4. **Escolha a ferramenta.** Média/mediana/moda resumem posição; amplitude/variância/CV resumem dispersão; complemento simplifica “pelo menos um”; união e interseção tratam eventos combinados.
5. **Calcule mantendo frações quando possível.** Só arredonde no final e registre a unidade ou a porcentagem.
6. **Faça uma verificação.** Frequências devem somar `n`; probabilidades ficam entre 0 e 1; mediana pertence à escala dos dados; uma média ponderada fica entre o menor e o maior valor quando os pesos são positivos.

## Exemplos autorais resolvidos

### Exemplo 1 — frequência e média

Os tempos (em minutos) de seis atendimentos foram `8, 10, 10, 12, 15, 15`. A tabela tem frequências 8:1, 10:2, 12:1 e 15:2. O total é 6, portanto a frequência relativa de 10 é `2/6 = 1/3 ≈ 33,3%`. A média é `(8+10+10+12+15+15)/6 = 70/6 ≈ 11,67` minutos. A tabela evita contar duas vezes o 10 ou o 15.

### Exemplo 2 — mediana, moda e efeito de um extremo

Para `4, 6, 6, 7, 9, 40`, a lista já está ordenada. A mediana é `(6+7)/2 = 6,5`, a moda é 6 e a média é `72/6 = 12`. O 40 desloca bastante a média, mas não altera a mediana nem a moda. Se a pergunta é sobre o valor “típico” em uma lista com outlier, compare as medidas em vez de assumir que a média é sempre a melhor escolha.

### Exemplo 3 — contagem e probabilidade sem repetição

Uma senha tem dois algarismos distintos escolhidos de 0 a 9. Existem 10 escolhas para o primeiro e 9 para o segundo: `10·9=90` senhas. A chance de ambos serem pares é `5/10 · 4/9 = 2/9`, pois, depois de escolher um par, restam quatro pares entre nove algarismos. Usar `(5/10)²` seria erro: as escolhas não são independentes quando não há reposição.

### Exemplo 4 — união de eventos

Em um grupo, 18 pessoas estudam inglês, 12 estudam espanhol e 5 estudam as duas línguas, de um total de 30. Quem estuda ao menos uma delas pertence a `I∪E`, então `18+12−5=25` pessoas; a probabilidade é `25/30=5/6`. Subtrai-se a interseção porque essas cinco pessoas foram contadas nas duas parcelas. A probabilidade de não estudar nenhuma é o complemento, `1/6`.

### Exemplo 5 — condicional e Bayes

Uma peça vem da linha A com probabilidade 0,6 e da linha B com 0,4. As taxas de falha são 0,02 e 0,05. A falha total é `0,6·0,02 + 0,4·0,05 = 0,032`, ou 3,2%. Se uma peça falhou, a chance de vir de B é `0,4·0,05/0,032 = 0,625`, isto é, 62,5%. A taxa de falha sozinha não é `P(B|falha)`; é `P(falha|B)`, e Bayes faz a inversão.

## Erros comuns e como corrigi-los

- **Usar a média sem ordenar para achar a mediana:** ordene e conte posições; a média não localiza o termo central.
- **Dividir pela quantidade errada:** em média ponderada, use a soma dos pesos; em frequência relativa, use o total de observações.
- **Confundir amplitude com desvio-padrão:** amplitude usa apenas extremos; desvio-padrão usa todos os desvios em relação à média.
- **Somar probabilidades de eventos sobrepostos:** subtraia `P(A∩B)` na união.
- **Tratar “ou” como “e”, ou vice-versa:** “ou” é união; “e” é interseção, salvo convenção explicitada.
- **Ignorar o novo universo da condicional:** em `P(B|A)`, divida por `P(A)`, não por `P(Ω)`.
- **Aplicar combinação quando a ordem importa:** senhas, filas e posições normalmente distinguem ordem; grupos e comissões normalmente não.
- **Arredondar cedo demais:** mantenha frações ou mais casas e arredonde apenas a resposta final.

## Vocabulário essencial

**População:** conjunto de interesse. **Amostra:** parte observada. **Variável:** característica medida. **Frequência:** número de ocorrências. **Média:** soma dividida pelo total (ou pelos pesos). **Mediana:** centro da lista ordenada. **Moda:** maior frequência. **Amplitude:** diferença entre extremos. **Variância:** média dos quadrados dos desvios (com convenção populacional ou amostral). **Desvio-padrão:** raiz da variância. **Evento:** subconjunto de resultados. **Complementar:** evento que não ocorre com o evento dado. **União:** ocorrência de pelo menos um evento. **Interseção:** ocorrência simultânea. **Condicional:** probabilidade sob uma informação já conhecida. **Independência:** ocorrência de um evento não altera a probabilidade do outro. **Equiprovável:** resultados com a mesma chance. **Partição:** eventos disjuntos que cobrem o espaço amostral.

## Exercícios de estudo (sem gabarito)

1. Organize `7, 5, 7, 9, 5, 6, 7, 10` em uma tabela de frequência absoluta e relativa; indique moda e mediana.
2. Uma equipe obtém notas 6, 8 e 9, com pesos 2, 3 e 5. Calcule a média ponderada e explique por que não se divide por três.
3. Compare os conjuntos `2, 4, 4, 6, 9` e `4, 4, 4, 4, 13`: calcule as médias e amplitudes e descreva o efeito do extremo.
4. De quantas maneiras podem ser escolhidos três representantes entre oito candidatos? A resposta mudaria se houvesse cargos de presidente, secretário e tesoureiro?
5. Um dado honesto é lançado duas vezes. Calcule a probabilidade de sair pelo menos um 6 usando o complementar e confira por enumeração.
6. Em uma caixa há 4 peças azuis e 3 verdes. Retiram-se duas sem reposição. Calcule a probabilidade de as duas terem a mesma cor e justifique o universo usado.
7. Uma pesquisa informa preferências por A, B e ambas. Monte um diagrama de Venn, calcule a união e derive a probabilidade de nenhuma preferência.
8. Duas máquinas produzem lotes em proporções diferentes e têm taxas de defeito distintas. Elabore uma árvore, encontre a taxa total de defeitos e determine a origem mais provável dado um defeito.

## Relação com a prova EEAR

Estatística e probabilidade aparecem como problemas de leitura, cálculo e modelagem, geralmente combinando porcentagens, frações, análise de tabelas ou situações de contagem. Para a preparação EEAR, treine identificar rapidamente o que o enunciado considera população, amostra ou universo; leia títulos, escalas e unidades dos gráficos; e confira se uma porcentagem é absoluta, relativa ou condicional. Questões de nível mais alto podem esconder uma combinação em uma probabilidade ou exigir complemento e inclusão-exclusão.

Em prova objetiva, escreva uma linha de modelo antes de calcular: `P(A)=...`, `x̄=...` ou `C(n,r)=...`. Isso reduz a troca entre “com reposição” e “sem reposição”. Faça estimativas: uma probabilidade não pode exceder 100%, e uma média não pode sair do intervalo dos valores positivos usados. A seleção de questões deste pacote é **autoral/similar e não oficial**; as referências abaixo servem para conteúdo e calibração, não para reproduzir itens da EEAR.

## Referências e limites de uso

As quatro referências foram usadas como apoio conceitual e calibração. O guia acima é redação autoral e não reproduz trechos, exercícios, respostas ou figuras das fontes.

- [Probabilidade e Estatística — Fundação CECIERJ/CEDERJ](https://canal.cecierj.edu.br/recurso/4684). Consulta para tabelas, medidas, contagem, probabilidade condicional e Bayes; a página informa acesso gratuito, mas o índice registra copyright e não localiza licença aberta.
- [Estatística — Volume I, FURG](https://repositorio.furg.br/bitstreams/89cdf6f7-a8a6-47b5-bbd5-9190fc3327ce/download). Apoio para organização de dados, medidas e probabilidade; o índice registra acesso gratuito sem licença aberta identificada.
- [Estatística básica para os cursos de ciências exatas e tecnológicas, UFT](https://umbu.uft.edu.br/bitstream/11612/1434/1/Estat%C3%ADstica%20B%C3%A1sica.pdf). Apoio para frequência, dispersão e probabilidade; o índice registra direitos reservados.
- [Estatística Aplicada à Administração, PNAP/UAB/UNILAB](https://sibiuni.unilab.edu.br/wp-content/uploads/2023/05/PNAP-Bacharelado-Estatistica-Aplicada-a-Administracao.pdf). Apoio para frequências, medidas, contagem e condicionais; o índice identifica licença CC BY-NC-SA e recomenda conferir créditos de terceiros.

Consulte a fonte original antes de copiar ou redistribuir qualquer material. Acesso gratuito não equivale, por si só, a autorização de reprodução.