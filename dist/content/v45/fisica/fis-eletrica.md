# fis-eletrica — Física: Eletricidade e magnetismo

**ID do conteúdo:** `fis-eletrica`  
**Área:** Física  
**Escopo:** carga e campo elétrico, potencial, corrente, resistência, circuitos, potência, magnetismo e indução.

## Objetivo e pré-requisitos

 Ao estudar este guia, o aluno deve interpretar grandezas elétricas e magnéticas, escolher modelos, montar equações com unidades coerentes e verificar se o resultado é plausível. O foco é o Ensino Médio compatível com a EEAR: mais importante que decorar fórmulas é reconhecer a situação física representada por cada uma.

 Antes de começar, revise potências de dez, conversão de unidades, proporcionalidade, regra de três, equações de primeiro grau e leitura de esquemas. Revise também trabalho e energia mecânica, pois tensão, potência e energia elétrica se relacionam. Em magnetismo e indução, tenha noções de vetores, movimento circular e sentidos horário/anti-horário.

## Explicação curta

Carga elétrica é uma propriedade da matéria que pode ser positiva ou negativa. Cargas interagem pela força elétrica e produzem campo elétrico no espaço. A diferença de potencial mede a variação de energia elétrica por unidade de carga; quando há um caminho condutor e uma diferença de potencial, cargas podem se mover ordenadamente, formando corrente. Resistores dificultam esse movimento e transformam parte da energia elétrica em calor. Em circuitos, as leis de conservação de carga e energia permitem determinar correntes e tensões. Correntes e ímãs produzem campos magnéticos; uma carga em movimento pode sofrer força magnética. Quando o fluxo magnético através de um circuito varia, surge uma força eletromotriz induzida, com sentido que se opõe à variação do fluxo.

## Conceitos fundamentais

### 1. Carga, força e campo elétrico

A carga elementar tem módulo `e = 1,60 × 10⁻¹⁹ C`. A carga é quantizada (`q = n·e`) e conserva-se em sistemas isolados. Cargas de mesmo sinal se repelem; de sinais opostos se atraem.

Para duas cargas puntiformes separadas por distância `r`, a intensidade da força elétrica é dada pela Lei de Coulomb:

`F = k·|q₁q₂|/r²`, com `k ≈ 9,0 × 10⁹ N·m²/C²` no vácuo ou no ar, aproximadamente.

A fórmula fornece a intensidade. O sentido é ao longo da reta que une as cargas: repulsivo para sinais iguais e atrativo para sinais diferentes. Se houver várias cargas, calcule cada força e faça a soma vetorial, sem somar automaticamente apenas os módulos.

O campo elétrico é a força por unidade de carga de prova positiva: `E = F/q₀`. Para uma carga puntiforme, `E = k·|Q|/r²`; seu sentido é para fora de `Q` se ela for positiva e para dentro se for negativa. Em um ponto com várias fontes, vale o princípio da superposição: `E_resultante = E₁ + E₂ + ...`, vetorialmente.

### 2. Potencial e energia elétrica

Potencial elétrico é energia potencial por unidade de carga: `V = U/q`. Para uma carga puntiforme, tomando o infinito como referência, `V = kQ/r`. Potencial é escalar, portanto as contribuições podem ser somadas algebricamente, com seus sinais. A diferença de potencial entre dois pontos é `ΔV = V_final − V_inicial`; uma carga positiva tende a perder energia elétrica ao deslocar-se espontaneamente para menor potencial.

O trabalho do campo elétrico sobre uma carga entre A e B é `W_campo = q(V_A − V_B)`. A energia potencial varia de acordo com `ΔU = q·ΔV`. Não confunda campo, que é vetorial e tem unidade N/C, com potencial, que é escalar e tem unidade volt (J/C).

### 3. Corrente, resistência e circuitos

A corrente média é a carga que atravessa uma seção por unidade de tempo: `I = ΔQ/Δt`, medida em ampère (C/s). O sentido convencional da corrente é o movimento que cargas positivas teriam; em metais, os elétrons movem-se no sentido oposto.

Para um resistor ôhmico em condições constantes, a Lei de Ohm é `U = R·I`. A resistência de um fio uniforme é `R = ρ·L/A`, em que `ρ` é a resistividade do material, `L` o comprimento e `A` a área da seção. Assim, dobrar o comprimento dobra `R`; dobrar a área reduz `R` à metade, desde que o material e a temperatura permaneçam iguais.

Em série, a corrente é a mesma em todos os componentes e `R_eq = R₁ + R₂ + ...`. A tensão total é distribuída entre os resistores. Em paralelo, a tensão é a mesma nos ramos e `1/R_eq = 1/R₁ + 1/R₂ + ...`; para dois resistores, `R_eq = R₁R₂/(R₁+R₂)`. A resistência equivalente de uma associação em paralelo é menor que a menor resistência do conjunto.

As leis de Kirchhoff organizam circuitos mais complexos. A lei dos nós expressa conservação de carga: soma das correntes que entram em um nó é igual à soma das que saem. A lei das malhas expressa conservação de energia: a soma algébrica das variações de potencial ao percorrer uma malha fechada é zero. Escolha arbitrariamente sentidos para as correntes; resultado negativo indica que o sentido real é o oposto.

### 4. Potência e consumo

 A potência elétrica é a taxa de transformação de energia: `P = U·I`. Para um resistor, também `P = R·I² = U²/R`; essas formas exigem `U = R·I` aplicável ao componente. A energia é `E = P·Δt`. Em contas residenciais, usa-se kWh: um aparelho de 1 kW por 1 h consome 1 kWh. Converta horas para segundos se a energia for solicitada em joules (`1 kWh = 3,6 × 10⁶ J`).

### 5. Campo magnético, força e indução

Uma corrente elétrica produz campo magnético. Ao redor de um fio longo e retilíneo, no vácuo, `B = μ₀I/(2πr)`, com `μ₀ = 4π × 10⁻⁷ T·m/A`. O sentido é encontrado pela regra da mão direita: polegar no sentido da corrente e dedos indicando as linhas de campo.

Uma carga `q` que se move com velocidade `v` em um campo magnético `B` sofre força de módulo `F = |q|vB sen θ`, em que `θ` é o ângulo entre `v` e `B`. A força é nula se o movimento for paralelo ao campo e máxima se for perpendicular. Para carga positiva, use a mão direita; para carga negativa, inverta o sentido obtido. A força magnética é perpendicular à velocidade, por isso, isoladamente, altera a direção do movimento, não o módulo da velocidade.

O fluxo magnético através de uma área plana é `Φ = B·A·cos θ`, quando `θ` é o ângulo entre o campo e a normal à área. Pela Lei de Faraday, uma bobina com `N` espiras apresenta força eletromotriz induzida `ε = −N·ΔΦ/Δt`. O sinal de menos é a Lei de Lenz: a corrente induzida cria campo que se opõe à variação do fluxo, não necessariamente ao campo original. O fluxo pode variar por mudança de `B`, da área, do ângulo ou de qualquer combinação desses fatores.

## Explicação aprofundada: método passo a passo

1. **Identifique o sistema.** Liste cargas, fontes, resistores, fios, ímãs, bobinas e o que o problema pede. Desenhe um esquema simples se o circuito ou a geometria não forem evidentes.
2. **Escolha a lei física.** Use Coulomb para força entre cargas puntiformes; campo para força por unidade de carga; potencial para energia e trabalho; Ohm para resistor ôhmico; Kirchhoff para malhas e nós; força magnética para carga/corrente em `B`; Faraday-Lenz para fluxo variável.
3. **Converta tudo para SI.** Distância em metro, carga em coulomb, corrente em ampère, resistência em ohm, tempo em segundo, área em metro quadrado e campo magnético em tesla. Uma conversão errada costuma produzir fatores de 10, 100 ou 1.000.
4. **Determine direção e sinal antes de calcular o módulo.** Em eletrostática, o sinal das cargas define atração/repulsão. Em magnetismo, indique os sentidos de `v`, `B`, corrente e força. Na indução, diga primeiro se o fluxo está aumentando ou diminuindo.
5. **Monte a equação simbólica.** Só substitua números depois de reduzir a expressão. Isso facilita conferir dependências como `1/r²`, `R ∝ L` ou `P ∝ I²`.
6. **Confira a unidade e a ordem de grandeza.** Uma potência em watts, uma energia em joules e uma corrente em ampères não podem ser trocadas. Verifique também se um resistor equivalente ficou entre os limites esperados.

## Exemplos autorais resolvidos ou comentados

### Exemplo 1 — força entre cargas
Duas cargas `+2 μC` e `−3 μC` estão separadas por `0,30 m` no ar. A intensidade é `F = 9×10⁹·(2×10⁻⁶·3×10⁻⁶)/(0,30)² = 0,60 N`, aproximadamente. Como os sinais são opostos, a força é atrativa: cada carga aponta para a outra. O módulo não informa sozinho o sentido.

### Exemplo 2 — potencial de duas fontes
Em um ponto, uma carga `+4 μC` está a `0,20 m` e uma carga `−2 μC` a `0,10 m`. O potencial resultante é escalar: `V = 9×10⁹[(4×10⁻⁶/0,20) + (−2×10⁻⁶/0,10)] = 0 V`. Isso não significa campo nulo: os campos são vetores e podem não se cancelar no mesmo ponto.

### Exemplo 3 — associação mista e potência
Um resistor de `6 Ω` está em série com dois resistores de `12 Ω` e `12 Ω` em paralelo. O paralelo vale `6 Ω`; portanto, `R_eq = 12 Ω`. Ligado a `24 V`, o circuito conduz `I_total = 24/12 = 2 A`. A potência total é `P = U·I = 48 W`. No paralelo, cada ramo recebe `12 V` e conduz `1 A`.

### Exemplo 4 — direção da força magnética
Uma carga positiva entra para a direita em uma região cujo campo magnético aponta para cima. Pela regra da mão direita, a força aponta para fora do plano da página. Se a carga fosse negativa, apontaria para dentro. Se a velocidade fosse paralela ao campo, `sen 0° = 0` e não haveria força magnética.

### Exemplo 5 — indução e Lenz
O fluxo para dentro da página aumenta porque um ímã se aproxima de uma espira. A espira deve criar um campo para fora da página para se opor ao aumento do fluxo para dentro. A face voltada para o ímã comporta-se como polo que repele a aproximação. O sentido horário ou anti-horário depende do lado observado; declare sempre a perspectiva antes de nomeá-lo.

## Erros comuns e como corrigi-los

- **Somar módulos de forças ou campos sem olhar direções:** desenhe os vetores e use componentes ou simetria.
- **Confundir potencial com campo:** potencial soma-se como número; campo exige soma vetorial.
- **Usar distância em centímetros na fórmula:** converta para metros antes de elevar ao quadrado.
- **Trocar corrente convencional por movimento eletrônico:** em metais, elétrons movem-se contra a corrente convencional.
- **Aplicar série/paralelo pelo desenho, não pelos nós:** série significa mesmo caminho sem derivação; paralelo significa mesmos dois nós.
- **Usar `P = U²/R` em qualquer aparelho:** essa relação pressupõe comportamento resistivo e valores instantâneos/efetivos compatíveis.
- **Esquecer o quadrado em `r²` ou em `I²`:** escreva a fórmula inteira antes de substituir.
- **Dizer que Lenz se opõe ao campo original:** a oposição é à variação do fluxo; se o fluxo diminui, a indução tenta mantê-lo.
- **Não inverter a força magnética para carga negativa:** aplique a regra da mão direita para carga positiva e depois inverta.

## Vocabulário essencial

- **Carga (`q`):** propriedade elétrica, medida em coulomb.
- **Campo elétrico (`E`):** força por unidade de carga de prova, em N/C.
- **Potencial (`V`):** energia potencial por carga, em volt.
- **Diferença de potencial/tensão (`U`):** diferença entre potenciais de dois pontos.
- **Corrente (`I`):** taxa de passagem de carga, em ampère.
- **Resistência (`R`):** oposição elétrica à corrente, em ohm.
- **Resistividade (`ρ`):** propriedade do material que compõe o resistor.
- **Força eletromotriz (`ε`):** energia fornecida por unidade de carga por uma fonte ou indução.
- **Campo magnético (`B`):** grandeza vetorial associada a ímãs e correntes, em tesla.
- **Fluxo magnético (`Φ`):** medida de campo atravessando uma área.
- **Indução eletromagnética:** produção de força eletromotriz por variação do fluxo.

## Exercícios de estudo autorais

1. Duas cargas de mesmo módulo estão em lados opostos de um ponto médio. Compare o campo e o potencial no ponto e justifique por que os resultados podem ser diferentes.
2. Uma carga de prova positiva é levada entre dois pontos de potenciais conhecidos. Determine o sinal do trabalho do campo em cada sentido de deslocamento.
3. Um fio é substituído por outro do mesmo material, com o triplo do comprimento e metade da área. Determine a razão entre as resistências.
4. Proponha uma associação de três resistores cuja resistência equivalente seja menor que qualquer resistor individual e explique o critério usado.
5. Um aquecedor de potência conhecida funciona por determinado tempo. Calcule a energia em joules e em kWh, mantendo as unidades explícitas.
6. Desenhe um nó com três correntes, escolha sentidos arbitrários e escreva a equação de Kirchhoff para a conservação de carga.
7. Uma partícula carregada entra perpendicularmente em campo uniforme. Explique a trajetória e o que muda se a velocidade tiver componente paralela ao campo.
8. Uma espira é aproximada de um polo magnético. Descreva separadamente o que ocorre quando o fluxo aumenta e quando diminui, usando a Lei de Lenz.
9. Crie um exemplo em que o fluxo varie sem que o campo magnético mude de intensidade. Indique qual fator geométrico mudou.
10. Explique, em palavras e por uma equação, por que um disjuntor precisa interromper o circuito quando a corrente excede o valor seguro.

## Relação com a prova EEAR

 Eletricidade e magnetismo exigem interpretação quantitativa. Para a EEAR, treine leitura de diagramas, conversões rápidas e identificação da lei antes da conta. Dê atenção a Lei de Coulomb, campo e potencial, Lei de Ohm, associações de resistores, potência/consumo, leis de Kirchhoff, força magnética, regra da mão direita e indução de Faraday-Lenz. Em alternativas, compare primeiro sinais, ordens de grandeza e proporcionalidade; muitos erros nascem de esquecer um quadrado, uma conversão ou uma direção.

Uma rotina eficiente é: revisar a teoria; resolver um exemplo sem consultar a fórmula; fazer exercícios mistos cronometrados; e revisar cada erro classificando-o como conceito, unidade, álgebra ou orientação vetorial. Questões autorais deste pacote são apenas similares e servem para treinamento, não representam itens oficiais da EEAR.

## Referências e limites de uso

As referências abaixo foram usadas para pesquisa e calibração conceitual. O guia e as questões são autorais; não reproduzem trechos, exercícios, respostas, figuras ou diagramação das fontes.

1. [Moura — Física para o Ensino Médio: Gravitação, Eletromagnetismo e Física Moderna](https://hdl.handle.net/10923/12475). Livro em português, com capítulos de eletrostática, corrente, circuitos e magnetismo; consultar a situação de direitos indicada no registro/PDF.
2. [Villate — Exercícios resolvidos de electricidade, magnetismo e circuitos](https://hdl.handle.net/10216/129323). Livro de exercícios em CC BY-SA 4.0, útil para calibração e prática; adaptações devem respeitar a licença.
3. [Versão online de exercícios da FEUP](https://def.fe.up.pt/eletricidade/problemas.html). Recurso citado no registro de Villate, usado apenas como referência de estudo/calibração.
4. [LibreTexts — Calculus-Based Physics, Volume B](https://phys.libretexts.org/Bookshelves/University_Physics/Calculus-Based_Physics_(Schnick)/Volume_B%3A_Electricity_Magnetism_and_Optics). Livro aberto em inglês, CC BY-SA 2.5, adequado para aprofundamento; a abordagem usa mais matemática do que a necessária para uma introdução EEAR.

Acesso gratuito ou leitura online não implica autorização irrestrita de redistribuição. Para qualquer reutilização, verifique a licença da obra e de mídias incorporadas individualmente.
