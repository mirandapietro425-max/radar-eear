# Auditoria editorial — Bíblia e apócrifos

## Parecer

O pacote contém uma base bíblica navegável e uma boa decisão de direitos para os apócrifos: não há traduções modernas adicionais nem textos integrais apócrifos; há dossiês autorais em português. A base, porém, ainda não está pronta para ser apresentada como catálogo histórico crítico. O principal risco não é a quantidade de conteúdo, mas a **proveniência insuficientemente granular** da tradução bíblica e a **mistura de categorias que não são equivalentes** sob o rótulo “apócrifos”.

Recomendação editorial: manter os capítulos bíblicos somente enquanto a edição `almeida` do getBible for explicitamente identificada pelo catálogo e pela licença correspondente; manter traduções modernas como metadados e links/API, nunca copiar o texto sem autorização; e transformar os dossiês apócrifos em fichas com datação, línguas, testemunhos manuscritos, tradição canônica e nível de certeza.

## 1. O que foi auditado

Foram examinados:

- `/home/ubuntu/work/radar-eear-content/radar-eear-content/manifest.json`, `RIGHTS.md`, `SOURCES.md`, `bible/books.json`, `bible/study-modules-pt.json`, `bible/chapters/*.json`, `apocrypha/catalog.json`, os 25 dossiês Markdown e `questions/question-bank.json`.
- `/home/ubuntu/work/radar-eear-drive/reconstrucao/radar_eear_v25_final/src/app/App.tsx`, `src/lib/content-runtime.ts`, `src/experience-data.ts`, `src/data/apocrypha.ts` e `src/data/v25-content.ts`.
- A implementação correspondente em `/home/ubuntu/work/radar-eear-final/site` foi conferida por busca de referências e rotas.

O `manifest.json` registra versão `content-2026-09-26`, 66 livros, 1.189 capítulos, 25 dossiês de apócrifos, 90 questões e 166 arquivos de mídia. A contagem local confirma 1.189 JSON válidos, 66 livros e 31.101 versículos. Todos os 1.189 arquivos usam os mesmos metadados de edição: `translation: "Almeida Atualizada"`, `abbreviation: "almeida"`, `lang: "pt"`; os JSON não trazem campos `source`, `license`, `version`, `sha` ou data de captura.

## 2. Auditoria da Bíblia no pacote

### Achados positivos

1. `bible/books.json` e `experience-data.ts` apresentam uma lista consistente de 66 livros e os números de capítulos correspondem aos arquivos locais.
2. A leitura é funcional no V25. Há as rotas `/biblia`, `/biblia/:id`, `/biblia/:id/:chapter` e `/biblia/:id/:chapter/contexto`; o leitor permite busca no capítulo, destaque, nota, favorito, marcação, retomada e registro de capítulo estudado.
3. O pacote separa texto de material editorial. `bible/study-modules-pt.json` contém quatro módulos curtos: “Leitura contextual”, “Estudo bíblico em camadas”, “Geografia bíblica” e “Cânon e apócrifos”. O quarto módulo já recomenda que uma classificação confessional não seja tratada como descrição universal.
4. As dez questões de Bíblia no `questions/question-bank.json` são autorais e cobrem gêneros, Pentateuco, Evangelhos, cartas, história, profetas, sabedoria, Apocalipse e contexto. Não há questão sobre apócrifos, manuscritos, transmissão textual ou variantes.
5. `RIGHTS.md` acerta ao exigir confirmação dos termos antes de publicação comercial e ao declarar que obras modernas/traduções modernas protegidas não foram baixadas. Esta política deve ser preservada.

### Proveniência e licença: ponto que precisa ser corrigido

A página oficial de catálogo do getBible identifica a chave `almeida` como **“Almeida Atualizada”**, descrição “De 1911 Biblia Sagrada Traduzida em Portuguez Por João Ferreeira D'Almeida”, edição de distribuição `0.2.1`, data de distribuição `2019-01-07`, fonte de distribuição `https://sites.google.com/site/manuscript4u/download` e licença declarada **GPL**. O catálogo também fornece a URL da tradução e um SHA da distribuição completa [1].

Isso é mais específico que a anotação atual do pacote, mas ainda não está replicado nos arquivos. Os JSON locais contêm texto integral e somente doze campos estruturais; a origem aparece apenas em `bible/study-modules-pt.json` como `https://api.getbible.net/v2/` e em `RIGHTS.md` como “API pública getBible”. Para auditoria e eventual redistribuição, isso é insuficiente. Um consumidor não consegue verificar, a partir de `genesis-1.json`, qual versão, licença, fonte de distribuição, hash e data foram usados.

A API documenta o padrão de capítulos `https://api.getbible.net/v2/[translation]/[book_number]/[chapter_number].json`, além de catálogos e checksums [2]. O V25 implementa exatamente essa família em `src/lib/content-runtime.ts`, com `https://api.getbible.net/v2/almeida/${bookNumber}/${chapter}.json`, cache offline e atribuição genérica “getBible”. A UI mostra “Almeida · fonte identificada” e oferece `https://api.getbible.net/v2/`, mas não aponta diretamente para o registro `almeida` nem para a licença.

**Ação recomendada:** adicionar no manifesto e nos metadados do conjunto, sem duplicar o texto, algo equivalente a:

```json
{
  "translation_id": "almeida",
  "translation_label": "Almeida Atualizada",
  "language": "pt",
  "distribution_version": "0.2.1",
  "distribution_version_date": "2019-01-07",
  "distribution_license": "GPL (conforme catálogo getBible; validar o texto/licença antes de distribuição)",
  "distribution_source": "https://sites.google.com/site/manuscript4u/download",
  "api": "https://api.getbible.net/v2/almeida/{book_number}/{chapter}.json",
  "catalog": "https://api.getbible.net/v2/translations.json",
  "checksum_catalog": "https://api.getbible.net/v2/checksum.json",
  "captured_at": "2026-09-26"
}
```

O campo de licença deve ser acompanhado do texto/arquivo de licença aplicável. “GPL” no catálogo não deve ser convertido automaticamente em “domínio público”; são regimes distintos. O SHA da tradução deve ser conservado e, se possível, o pacote deve registrar a correspondência entre o snapshot local e o checksum publicado.

### Limite canônico da lista de 66

A lista de 66 não é “a Bíblia” em sentido universal. Ela corresponde à forma protestante/evangélica usual: 39 livros no Antigo Testamento e 27 no Novo, com a contagem protestante e a ordem usadas no pacote. A própria questão `bib-08` diz que Apocalipse é o último livro do “cânon cristão comum de 66 livros”. A frase precisa ser qualificada: há tradições cristãs com outros livros do Antigo Testamento e com ordenações diferentes.

O Compêndio do Catecismo Católico define o cânone católico como 46 escritos do Antigo Testamento e 27 do Novo [3]. A página de formação do cânone da Sociedade Bíblica do Brasil organiza o estudo em Septuaginta, Novo Testamento, ordem dos livros e uma aula específica sobre “Livros Deuterocanônicos ou Apócrifos” [4]. Essas fontes não descrevem uma única lista neutra: são posições institucionais situadas. A ficha do Radar deve dizer qual tradição está sendo usada em cada contagem.

**Correções recomendadas:**

- Renomear a edição de 66 livros para algo como “Cânon protestante/evangélico — base de leitura do Radar”, sem sugerir que seja a única forma cristã.
- Criar uma camada de comparação para “Tanakh judaica”, “Antigo Testamento protestante”, “Antigo Testamento católico” e “tradições ortodoxas, com variações”. Não forçar uma contagem única para a Ortodoxia.
- Explicar que “deuterocanônico” é o termo usado por católicos e ortodoxos para determinados livros; “apócrifo” é usado de modo diferente por protestantes e também de modo amplo na pesquisa. Os termos não são sinônimos perfeitos.
- Revisar `bib-08` para: “Apocalipse integra o Novo Testamento; na ordem protestante de 66 livros, aparece como o último livro.”
- Adicionar nos objetos bíblicos `canon_traditions` e `book_order`, além do gênero editorial.

## 3. Auditoria dos apócrifos

### Cobertura atual

Há 25 entradas no `apocrypha/catalog.json`, 25 dossiês Markdown e 25 itens na matriz `src/data/apocrypha.ts` do V25. A seleção inclui:

- Segundo Templo e pseudepígrafos: 1 Enoque, 2 Enoque, Jubileus, 4 Esdras, 2 Baruc e Salmos de Salomão.
- Livros deuterocanônicos ou adições recebidos por algumas tradições: Tobias, Judite, Sabedoria, Sirácida, Baruc, Macabeus e Adições de Ester e Daniel.
- Evangelhos cristãos não canônicos: Tomé, Pedro, Maria, Judas, Filipe e Protoevangelho de Tiago.
- Literatura cristã antiga relacionada: Didaqué, 1 Clemente, Epístola de Barnabé, Pastor de Hermas e Diatessaron.

A seleção é pedagogicamente promissora, mas as 25 fichas repetem praticamente o mesmo molde: tipo, resumo de duas linhas, quatro passos genéricos e a nota de que não há tradução integral licenciada. Isso é uma política de direitos adequada, mas ainda não é catalogação histórica.

### Problemas de classificação

1. **Deuterocanônico não é simplesmente apócrifo.** Tobias, Judite, Sabedoria, Sirácida, Baruc, 1–2 Macabeus e adições a Ester/Daniel têm estatutos diferentes por tradição. “Apócrifos” em uma lista protestante pode equivaler, em parte, aos “deuterocanônicos” de uma lista católica; em outras situações “apócrifo” significa literatura não canônica em sentido amplo.
2. **Pseudepígrafo e apócrifo também não são sinônimos.** Pseudepigrafia descreve atribuição autoral tradicional ou literária, enquanto apócrifo descreve uma relação com um cânone ou com uma coleção recebida; um título pode receber os dois rótulos, mas eles respondem a perguntas diferentes.
3. **Padres apostólicos e harmonias devem ter um agrupamento próprio.** Didaqué, 1 Clemente, Barnabé e Pastor de Hermas são literatura cristã antiga; Diatessaron é uma harmonia dos Evangelhos. Colocá-los na mesma lista pode ser útil para navegação, mas a interface deve dizer “textos relacionados / cristianismo antigo”, não sugerir que todos sejam o mesmo tipo de apócrifo.
4. **“4 Esdras” é um nome de tradição textual e de numeração.** A ficha precisa registrar aliases como “4 Ezra” e “2 Esdras” conforme a edição, indicando quais capítulos e qual tradição de transmissão estão sendo referidos. Sem isso, o leitor pode confundir obras diferentes.
5. **Não existe um cânone cristão único.** A página do Vaticano é fonte primária para a posição católica, não uma regra neutra para judaísmo, protestantismo, ortodoxia ou pesquisa histórica. A UI precisa mostrar sempre “canonicidade segundo...” e “uso na pesquisa”.

### Datação e contexto: o que deve entrar

A pesquisa em português da BBC reúne especialistas que descrevem os apócrifos como uma coleção extensa, transmitida em grego, latim, siríaco, copta, armênio, georgiano, eslavônico e etiópico, e enfatiza que a não inclusão no cânone não torna automaticamente um texto sem valor histórico [5]. A mesma reportagem alerta que o corpus cristão antigo era plural e que a terminologia “apócrifo” pode carregar juízo de valor.

A Universidade de Coimbra apresenta a edição bilingue de Frederico Lourenço, publicada em 2022, como uma tradução e comentário crítico-histórico de evangelhos gregos e latinos. A sinopse relaciona os textos canônicos a Evangelhos de Tiago, Tomé, Filipe, Maria, Pedro, Nicodemos e outros [6]. É um recurso legítimo para indicar ao leitor, mas não autoriza copiar a tradução para o pacote.

Para as fichas, a datação deve ser guardada como faixa e não como ano único. Proposta inicial de faixas de trabalho, sempre com `confidence` e referência de edição crítica:

- 1 Enoque: composição em camadas no período do Segundo Templo; registrar separadamente as seções, evitando atribuir uma única data ao livro inteiro.
- Jubileus: releitura da Torá no período do Segundo Templo; relacionar a Qumran e a calendários, sem transformar a data aproximada em certeza.
- Tobias, Judite, Sabedoria, Sirácida, Baruc e Macabeus: agrupar como literatura judaica helenística/deuterocanônica, com campos próprios para língua original, testemunhos e recepção por tradição.
- 4 Esdras e 2 Baruc: literatura apocalíptica pós-destruição de Jerusalém; registrar a diferença entre data provável de composição e data dos manuscritos preservados.
- Protoevangelho de Tiago: a bibliografia introdutória da Cambridge University Press informa que alguns estudiosos o datam já no século II e que ele combina Mateus, Lucas e tradições sobre a infância de Maria [7]. A ficha deve marcar “data discutida; proposta inicial: século II”, não uma data exata.
- Tomé, Pedro, Maria, Judas e Filipe: registrar separadamente data de composição, idioma e cópia preservada; não usar a data do manuscrito mais famoso como data de composição.
- Didaqué e 1 Clemente: inserir em “literatura cristã antiga” e separar data de composição, cópia e atribuição. A Cambridge University Press observa que 1 e 2 Clemente têm gêneros e propósitos diferentes e que nenhum dos dois se apresenta explicitamente como escrito por Clemente, embora a tradição os associe a ele [8].

Essas faixas são uma pauta editorial, não uma substituição de edição crítica. O registro deve ter `date_note`, `date_from`, `date_to`, `date_basis` e `confidence`.

### Manuscritos e recursos legítimos

A reportagem da RTP registra a descoberta dos primeiros Manuscritos do Mar Morto em 1947, cerca de 900 manuscritos identificados nas décadas seguintes e o programa de digitalização iniciado por Israel e Google [9]. A Biblioteca Digital Leon Levy, da Israel Antiquities Authority, disponibiliza imagens espectrais de alta resolução e scans de negativos, com uma seção de história e conservação [10]. São recursos ideais para o módulo de transmissão textual, sem necessidade de hospedar imagens no pacote.

O Radar deve distinguir: manuscrito, testemunho textual, tradução antiga, fragmento, reconstrução e edição moderna. O fato de um título aparecer em Qumran não prova sozinho que ele tenha sido canônico em todas as comunidades; indica circulação e valor documental em uma comunidade e período específicos.

## 4. V25: fluxo real e lacunas

### Bíblia

O V25 tem fluxo funcional: `BiblePage` mostra “66 livros, 1.189 capítulos”, busca livros, plano de leitura anual e progresso; `BibleBookPage` busca capítulos remotamente, registra a edição `almeida`, permite notas, destaques, favoritos, marcação e conclusão; `BibleContextPage` oferece camadas autorais para poucos capítulos e sinaliza quando o contexto específico ainda não está cadastrado.

Pontos a corrigir:

- A atribuição visível é genérica. Exibir o título da edição, o identificador `almeida`, a versão de distribuição, a licença, a fonte de distribuição e um link para o catálogo do getBible.
- O leitor remoto e o snapshot local não têm um vínculo verificável por hash. Registrar `translation_sha`, data de captura e checksum.
- O texto local é uma edição de ortografia histórica (“creou”, “fórma”, “Abrahão” em amostras); indicar isso ao leitor para não confundi-lo com ARA, NAA, ARC, NVI ou outra edição moderna.
- Os contextos são autorais e úteis, mas cobrem poucos capítulos. O componente já faz a ressalva de que não inventa arqueologia; conservar essa regra e adicionar fontes por capítulo.
- O V25 tem uma trilha “Do texto bíblico ao mapa”, mas ela aponta “Gênesis 12” para Jerusalém, enquanto o próprio contexto cita Harã e Canaã. A rota de atlas precisa apontar para os lugares realmente mencionados ou explicar a relação editorial; do jeito atual, há risco de associação geográfica indevida.

### Apócrifos

`ApocryphaPage` funciona como catálogo e abre `?work=id`. Cada card exibe tipo e resumo. O detalhe usa o mesmo link externo `https://www.earlychristianwritings.com/` para todos os 25 itens. Esse recurso pode ser legítimo para consulta, mas é predominantemente em inglês e não é uma fonte bibliográfica específica por obra. Não atende sozinho ao objetivo de fontes em português nem informa datação, testemunho, edição, licença ou status canônico.

Pontos a corrigir:

- Adicionar `sources[]` por obra, com pelo menos uma fonte em português quando existir e uma fonte acadêmica/institucional complementar.
- Substituir o link genérico por links específicos: catálogo da Universidade de Coimbra para os Evangelhos apócrifos; SBB para o módulo de cânon; BBC para a introdução jornalística em português; recursos digitais de manuscritos para testemunhos; e catálogos bibliográficos legítimos.
- Mostrar badges separados: `deuterocanônico em...`, `pseudepígrafo`, `literatura cristã antiga`, `evangelho não canônico`, `harmonia`, `apocalíptico`.
- Incluir “texto integral não distribuído” no detalhe e oferecer somente link para edição legítima ou biblioteca. Não hospedar tradução moderna sem licença.
- Substituir o resumo genérico por nota autoral específica, com incertezas expressas.

## 5. Esquema de catalogação recomendado

Adicionar um arquivo autoral, por exemplo `apocrypha/catalog-pt.json`, com este núcleo mínimo:

```json
{
  "id": "protoevangelho-tiago",
  "title_pt": "Protoevangelho de Tiago",
  "aliases": ["Evangelho da Infância de Tiago", "Protevangelium of James"],
  "corpus": "literatura-crista-antiga",
  "labels_by_tradition": {
    "catolica": "não canônico; recepção devocional e histórica",
    "protestante": "apócrifo",
    "pesquisa": "evangelho da infância / texto cristão antigo"
  },
  "estimated_date": {
    "from": "século II",
    "to": "século II/III",
    "basis": "datação discutida na bibliografia",
    "confidence": "baixa-média"
  },
  "languages": ["grego"],
  "witnesses": ["manuscritos gregos e traduções posteriores; detalhar por edição"],
  "historical_context": "Cristianismos antigos e narrativas sobre a infância de Maria e Jesus.",
  "canonical_status": "não canônico; classificação varia por tradição e uso do termo",
  "authorial_summary": "Resumo próprio, sem reproduzir tradução.",
  "integral_text_policy": "link-only",
  "sources": [
    {
      "title": "Evangelhos Apócrifos Gregos e Latinos",
      "url": "https://www.uc.pt/cech/novidades-editoriais/evangelhos-apocrifos-gregos-e-latinos-edicao-bilingue-traducao-e-comentario/",
      "kind": "institutional-bibliography",
      "rights": "link only; no reproduction"
    }
  ]
}
```

Para a Bíblia, aplicar o mesmo princípio: cada tradução precisa de `translation_id`, `edition_label`, `language`, `distribution_version`, `distribution_license`, `distribution_source`, `api_url_template`, `catalog_url`, `checksum_url`, `captured_at` e `rights_note`. Para traduções modernas, manter apenas esses campos e links/API até que haja autorização escrita.

## 6. Módulos de estudo autorais propostos

### Módulo A — “O que conta como cânon?”

**Objetivo:** separar texto, coleção, cânon, tradição e ordem dos livros.

**Percurso:** comparar a contagem judaica, protestante, católica e variações ortodoxas; identificar o motivo pelo qual uma mesma obra pode ser “deuterocanônica” em uma comunidade e “apócrifa” em outra; distinguir classificação religiosa de descrição histórica.

**Atividade autoral:** o estudante recebe quatro cartões de tradição e deve preencher “lista”, “ordem”, “termo usado”, “fonte institucional” e “o que não se pode concluir”.

**Resultado:** ficha `canon_traditions` reutilizável no catálogo.

### Módulo B — “Manuscrito, tradução e variante”

**Objetivo:** mostrar como um texto antigo chega ao leitor moderno.

**Percurso:** manuscrito → cópia → família textual → edição crítica → tradução → interface. Usar as imagens do projeto Leon Levy e os capítulos sobre a API getBible como objetos de observação, não como provas teológicas.

**Atividade autoral:** marcar em uma passagem curta quais dados são observados, quais são reconstruídos e quais pertencem à tradução; nenhum texto protegido é reproduzido.

**Resultado:** um cartão de proveniência e um campo de confiança por afirmação.

### Módulo C — “Judaísmo do Segundo Templo”

**Objetivo:** contextualizar Enoque, Jubileus, Tobias, Sirácida, Sabedoria, Baruc e Macabeus.

**Percurso:** helenização, calendários, sabedoria, apocalíptica, identidade e conflito; comparar circulação textual com estatuto canônico.

**Atividade autoral:** linha do tempo em faixas, com separação visual entre composição, cópia preservada e primeira tradução conhecida.

**Resultado:** não confundir “texto encontrado em Qumran” com “texto aceito em todos os cânones”.

### Módulo D — “Evangelhos não canônicos e lacunas narrativas”

**Objetivo:** estudar Protoevangelho de Tiago, Tomé, Pedro, Maria, Judas e Filipe sem chamá-los de “falsos” por padrão.

**Percurso:** gênero, autoridade atribuída, infância, revelação, paixão, conflito entre comunidades e transmissão fragmentária. Usar a edição crítica da Universidade de Coimbra como indicação bibliográfica, não como fonte para copiar tradução.

**Atividade autoral:** classificar uma afirmação como “presente no resumo”, “atestada por um testemunho”, “interpretação de pesquisador” ou “doutrina de uma tradição”.

### Módulo E — “Textos relacionados ao Novo Testamento”

**Objetivo:** diferenciar Didaqué, 1 Clemente, Barnabé, Pastor de Hermas e Diatessaron dos evangelhos não canônicos.

**Percurso:** instrução comunitária, liderança, ética, visões, martírio, harmonia dos Evangelhos e uso litúrgico.

**Atividade autoral:** comparar gênero e função sem criar um ranking de “proximidade” ao cânon.

### Módulo F — “Laboratório de direitos e fontes”

**Objetivo:** ensinar a usar Bíblia digital sem copiar traduções protegidas.

**Percurso:** ler o catálogo getBible; identificar licença e hash; contrastar uma API de acesso aberto com serviços de traduções licenciadas; registrar quando um link é apenas bibliográfico.

A API.Bible informa que oferece versões abertas e versões licenciadas, com limites e licenças comerciais diferentes por tradução [11]. A SBB, em seu EULA, restringe o uso a finalidades pessoais e não comerciais e proíbe cópia, distribuição ou modificação sem permissão; uso comercial exige autorização prévia por escrito [12]. Portanto, o Radar deve conservar a política “fonte/API/licença identificada” e não baixar NAA, ARA, ARC, NVI ou outras versões modernas para dentro do pacote sem contrato explícito.

## 7. Questões autorais sugeridas

As perguntas abaixo podem entrar como itens `origin: "original"`, sem citar traduções protegidas:

1. **Uma mesma obra pode ser deuterocanônica em uma tradição e apócrifa em outra?** Sim. O rótulo depende da tradição canônica que está sendo descrita.
2. **O que o termo “pseudepígrafo” informa primeiro?** Uma atribuição autoral tradicional/literária, não uma decisão universal sobre valor ou falsidade.
3. **Encontrar um texto em Qumran prova que ele pertence a todos os cânones?** Não. Prova circulação ou preservação naquele contexto; canonicidade é uma questão de recepção por comunidades e tradições.
4. **Por que a data do manuscrito não é automaticamente a data da composição?** Porque uma obra pode ter sido composta antes da cópia preservada e transmitida em línguas diferentes.
5. **Qual cuidado é necessário ao falar de 1 Clemente?** Separar a antiga associação com Clemente de Roma da autoria explícita e do gênero do texto.
6. **Qual é o foco característico do Protoevangelho de Tiago?** Narrativas da infância de Maria e Jesus que ampliam lacunas pouco tratadas nos Evangelhos canônicos.
7. **Didaqué e Diatessaron são o mesmo gênero?** Não. A Didaqué é um manual comunitário; o Diatessaron é uma harmonia dos quatro Evangelhos.
8. **Qual metadado é indispensável para uma tradução bíblica digital?** A combinação de identificador da edição, fonte/API, licença, versão e checksum; o texto sem proveniência não basta.
9. **Como escrever “66 livros” com precisão editorial?** “Cânon protestante/evangélico de 66 livros usado nesta leitura”, não “a única Bíblia cristã”.
10. **O que fazer com uma tradução moderna sem licença confirmada?** Manter apenas ficha, fonte/API/licença e link legítimo; não copiar o texto integral.

## 8. Gaps concretos e prioridade de correção

### Alta prioridade

- Registrar nos JSON bíblicos ou em manifesto vinculado a origem, licença, versão, fonte de distribuição, API, checksum e data de captura da edição `almeida`.
- Rotular a lista de 66 como cânon protestante/evangélico e revisar a questão `bib-08`.
- Dividir os 25 apócrifos em deuterocanônicos, Segundo Templo/pseudepígrafos, evangelhos não canônicos e literatura cristã antiga.
- Trocar o link único `earlychristianwritings.com` por fontes específicas, incluindo pelo menos um recurso em português quando disponível.
- Adicionar no detalhe de cada dossiê datação/faixa, línguas, testemunhos, recepção canônica, resumo autoral, confiança e bibliografia.

### Média prioridade

- Criar 10–20 questões autorais de cânon, manuscritos, apócrifos e direitos; o banco atual tem 10 questões de Bíblia e nenhuma de apócrifos.
- Adicionar contexto e fonte por capítulo ou declarar claramente que o contexto ainda não está coberto.
- Corrigir a trilha Gênesis 12 → Atlas para não apontar automaticamente a Jerusalém quando o próprio contexto cita Harã e Canaã.
- Exibir no V25 uma etiqueta de ortografia/edição histórica para “Almeida Atualizada” e não apresentá-la como NAA, ARA ou NVI.

### Baixa prioridade

- Incluir aliases multilíngues e referências bibliográficas em formato CSL-JSON ou equivalente.
- Criar filtros por período, gênero, tradição, idioma e estado de preservação.
- Adicionar uma página “Como ler esta ficha” explicando que resumo, datação e recepção são camadas distintas.

## 9. Fontes consultadas e recursos legítimos

As afirmações históricas e de direitos acima foram verificadas em páginas abertas ou em resumos institucionais. Cambridge e alguns catálogos oferecem apenas resumo e podem exigir acesso institucional para o texto integral; o relatório não reproduz esse conteúdo e não recomenda contornar paywall.

[1] Catálogo getBible com metadados da tradução `almeida`: https://api.getbible.net/v2/translations.json

[2] Documentação oficial da API getBible, famílias de API, capítulos, catálogos e checksums: https://getbible.net/api/ ; repositório V2: https://github.com/getbible/v2

[3] Compêndio do Catecismo da Igreja Católica, definição católica de cânone (46 escritos do AT e 27 do NT): https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_po.html

[4] Sociedade Bíblica do Brasil, “A formação do cânone II”, incluindo Septuaginta, cânone do NT e aula sobre deuterocanônicos/apócrifos: https://www.sbb.org.br/artigos/a-formacao-do-canone-ii

[5] BBC News Brasil, “O que são evangelhos apócrifos...”, reportagem com especialistas brasileiros sobre terminologia, pluralidade, línguas e recepção: https://www.bbc.com/portuguese/articles/crg4erlzrq5o

[6] Centro de Estudos Clássicos e Humanísticos da Universidade de Coimbra, edição bilingue de Frederico Lourenço: https://www.uc.pt/cech/novidades-editoriais/evangelhos-apocrifos-gregos-e-latinos-edicao-bilingue-traducao-e-comentario/

[7] Cambridge University Press, capítulo “The apocryphal Jesus”, com resumo sobre Evangelhos da Infância e Protoevangelho de Tiago: https://www.cambridge.org/highereducation/books/an-introduction-to-the-new-testament-and-the-origins-of-christianity/32A6751C4FE08D443DC4BDD934A3C343/the-apocryphal-jesus/12865178681F1BA3A1EA0C22DD747A01

[8] Cambridge University Press, “1 and 2 Clement”, resumo sobre gêneros, propósitos e atribuição: https://www.cambridge.org/core/books/cambridge-companion-to-the-apostolic-fathers/1-and-2-clement/B7BF41A1B41D80762C13BF2A6ED63949

[9] RTP Ensina, “Os Manuscritos do Mar Morto ao alcance de um clique”: https://ensina.rtp.pt/artigo/os-manuscritos-do-mar-morto-ao-alcance-de-um-clique/

[10] Leon Levy Dead Sea Scrolls Digital Library, Israel Antiquities Authority: https://www.deadseascrolls.org.il/?locale=en_US

[11] API.Bible, página oficial de planos e licenciamento por versões: https://api.bible/

[12] Sociedade Bíblica do Brasil, Acordo de Licença de Usuário Final: https://www.sbb.org.br/acordo-de-licenca-de-usuario-final-eula

[13] Pontifícia Comissão Bíblica, “A interpretação da Bíblia na Igreja”, sobre método histórico-crítico, hermenêutica e leitura canônica: https://www.vatican.va/roman_curia/congregations/cfaith/pcb_documents/rc_con_cfaith_doc_19930415_interpretazione_po.html

[14] Oxford Academic, “The Making of the Bible”, introdução ao processo de formação da Bíblia, Septuaginta, cânon e Novo Testamento: https://academic.oup.com/book/428/chapter/135222514

### Conclusão operacional

O pacote pode incorporar imediatamente os módulos autorais e os rótulos de cautela sem distribuir qualquer tradução moderna protegida. Antes de qualquer publicação, a correção indispensável é transformar a origem da edição `almeida` em metadado verificável e explicitar a tradição canônica da lista de 66. Para os apócrifos, o próximo incremento deve ser bibliográfico e taxonômico, não a inclusão de textos integrais: 25 dossiês com fontes específicas, datação em faixa, testemunhos e estatuto por tradição produzirão mais valor editorial e menos risco jurídico/histórico do que uma coleção de traduções sem licença.
