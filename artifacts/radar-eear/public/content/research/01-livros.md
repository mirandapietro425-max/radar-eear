# Auditoria editorial — Livros e literatura em português

**Escopo:** catálogo de 30 livros em `/home/ubuntu/work/radar-eear-content/radar-eear-content/catalog.json`, arquivos editoriais do pacote e reconstrução V25 em `/home/ubuntu/work/radar-eear-drive/reconstrucao/radar_eear_v25_final`. A auditoria foi limitada a livros e literatura em português. Não foram baixados textos protegidos, não foram indicados PDFs pirateados e não houve login, compra, upload ou publicação.

## Achados principais

O catálogo tem **30 registros**: seis em `integratedBooks` e 24 em `broaderBooks`. Existem **11 textos integrais** em `books/fulltext/`: **cinco em português** (`Memórias Póstumas`, `Triste Fim`, `Dom Casmurro`, `O Primo Basílio` e `Os Lusíadas`) e seis em línguas estrangeiras. Os seis estrangeiros são `War and Peace` em inglês, `Crime and Punishment` em inglês, `Pride and Prejudice` em inglês, `Die Verwandlung` em alemão, `Faust` em alemão e `Don Quijote` em espanhol. O inventário verificável dos arquivos está em `catalog.json` e os cabeçalhos dos TXT confirmam idioma e identificação Gutenberg.

A consequência editorial é importante: o pacote se apresenta como uma frente de livros em português, mas **a maior parte do texto integral existente não está em português**. A marca `publicDomain: true` descreve a obra original, não garante que uma tradução, transcrição ou edição digital específica possa ser redistribuída no Brasil. O próprio Project Gutenberg exige verificar a lei do país fora dos Estados Unidos e informa que uma obra autorizada por titular não pode ser redistribuída automaticamente por terceiros. [5]

Para o Brasil, a regra de trabalho é a Lei nº 9.610/1998: direitos patrimoniais duram 70 anos a partir de 1º de janeiro do ano seguinte ao falecimento do autor; também pertencem ao domínio público obras sem sucessores e de autor desconhecido, com preservação de autoria e direitos morais. [1] [2] Uma obra original em domínio público **não libera necessariamente uma tradução moderna**. Em textos antigos traduzidos, é preciso verificar o tradutor, a edição e os direitos da edição. A BNDigital é uma alternativa particularmente adequada: informa que a reutilização de conteúdos em domínio público é livre e gratuita, com menção à Fundação Biblioteca Nacional, enquanto conteúdos protegidos exigem autorização do titular. [3]

O V25 reproduz o catálogo por seeds SQL e assets de capa, mas não contém uma biblioteca pública de textos em `public/books`; a auditoria encontrou seeds, SVGs e rotas de catálogo, não uma coleção de guias ou textos integrais em português dentro do V25. O arquivo de direitos do pacote é prudente ao dizer que guias são autorais e que traduções modernas protegidas não foram incluídas, mas o catálogo atual ainda precisa de uma classificação mais rigorosa entre **obra**, **edição**, **tradução** e **arquivo redistribuível**.

## Auditoria dos 30 registros existentes

| # | Registro e situação no pacote | Verificação de idioma e fonte | Direitos e recomendação editorial |
|---:|---|---|---|
| 1 | **Guerra e Paz**, Liev Tolstói, 1869; `integrated`, texto `guerra-e-paz.en.txt` | O TXT é *War and Peace*, em inglês, Gutenberg #2600; a página do e-book confirma idioma inglês, tradutores Aylmer e Louise Maude e domínio público nos EUA. [6] | A obra original é domínio público no Brasil, mas o arquivo não atende à frente em português. Não redistribuir como edição portuguesa. Manter apenas como item histórico/catálogo ou substituir por tradução portuguesa com direitos verificados. Open Library/ISBN é catálogo, não licença. |
| 2 | **Crime e Castigo**, Fiódor Dostoiévski, 1866; `integrated`, `crime-e-castigo.en.txt` | O TXT é *Crime and Punishment*, em inglês, tradução de Constance Garnett, Gutenberg #2554; a página confirma idioma inglês e status público nos EUA. [7] | A obra original é domínio público, mas a tradução inglesa é uma camada editorial separada e não é conteúdo em português. Para uma versão portuguesa, usar apenas edição antiga comprovadamente livre ou licença de editora/MEC Livros; não importar tradução moderna sem autorização. |
| 3 | **Orgulho e Preconceito**, Jane Austen, 1813; `integrated`, `orgulho-preconceito.en.txt` | O arquivo é *Pride and Prejudice*, em inglês, Gutenberg #1342; a página confirma idioma inglês e domínio público nos EUA. [8] | Original em domínio público; falta uma edição portuguesa redistribuível verificada. Texto atual não deve ser rotulado como livro em português. |
| 4 | **A Metamorfose**, Franz Kafka, 1915; `integrated`, `metamorfose.de.txt` | O cabeçalho do TXT identifica *Die Verwandlung*, em alemão, Gutenberg #22367. | O original está em domínio público no Brasil, pois Kafka morreu em 1924 e o prazo patrimonial já terminou. O arquivo alemão, porém, não resolve a necessidade de português. Traduções brasileiras modernas devem ser tratadas como protegidas até prova documental em contrário. |
| 5 | **Fausto**, Goethe, 1808; `integrated`, `fausto.de.txt` | O TXT é *Faust: Der Tragödie erster Teil*, em alemão, Gutenberg #2229. | Original em domínio público; a tradução portuguesa a escolher deve ter tradutor/edição avaliados separadamente. Não usar o TXT alemão como edição portuguesa. |
| 6 | **Dom Quixote**, Miguel de Cervantes, 1605; `integrated`, `dom-quixote.es.txt` | O TXT é *Don Quijote*, em espanhol, Gutenberg #2000. | Original em domínio público; traduções portuguesas modernas não são automaticamente livres. Priorizar uma tradução antiga com direitos verificados ou conteúdo licenciado. |
| 7 | **Dom Casmurro**, Machado de Assis, 1899; `broader`, `metadata` no catálogo e TXT português Gutenberg #55752 | Wikisource oferece a edição de referência com folha de rosto e índice; Gutenberg confirma idioma português e autoria. [12] [18] | Machado morreu em 1908; a obra está em domínio público no Brasil. A edição digital Gutenberg ainda deve conservar atribuição e passar por revisão de territorialidade/edição. Para redistribuição, preferir Wikisource/BNDigital e registrar a edição-base. |
| 8 | **Memórias Póstumas de Brás Cubas**, Machado de Assis, 1881; `broader`, `integrated`, TXT português Gutenberg #54829 | Wikisource disponibiliza a edição de 1881; Gutenberg confirma idioma português. [11] [17] | Domínio público no Brasil. É o registro mais pronto para virar estudo guiado em português, mas o pacote deve documentar edição, fonte e normalização; não misturar capítulos de transcrições sem controle. |
| 9 | **O Primo Basílio**, Eça de Queirós, 1878; `broader`, ID com cedilha combinada `eça-primo-basilio`, TXT `eca-primo-basilio.pt.txt` | Gutenberg #42942 confirma idioma português e que a transcrição foi produzida a partir de imagens da Biblioteca Nacional de Portugal; a página usa a grafia catalográfica “Bazilio”. [10] | Eça morreu em 1900; original em domínio público no Brasil. Há uma lacuna concreta de normalização: o ID do `broaderBooks` não coincide byte a byte com o ID do `fullTextSources` (`eça...` versus `eca...`). Corrigir antes de integrar. |
| 10 | **Triste Fim de Policarpo Quaresma**, Lima Barreto, 1915; `broader`, `integrated`, TXT português Gutenberg #67535 | Gutenberg confirma idioma português, publicação original e imagens disponibilizadas pela Biblioteca Nacional do Brasil. [9] | Lima Barreto morreu em 1922; domínio público no Brasil. A obra é adequada à frente, com resumo e guia autorais. Ainda assim, conferir cabeçalho/licença e atribuição antes de redistribuir o TXT Gutenberg. |
| 11 | **Os Sertões**, Euclides da Cunha, 1902; `broader`, `metadata` | A lista de clássicos brasileiros do Wikisource inclui a obra e a BNDigital/Portal Domínio Público são fontes institucionais para procurar edição digital. [13] [3] | Euclides morreu em 1909; original em domínio público. Falta no pacote uma fonte textual portuguesa específica e uma ficha de edição. Prioridade alta para preencher com exemplar BNDigital/Domínio Público, não com cópia anônima. |
| 12 | **A Divina Comédia**, Dante Alighieri, 1320; `broader`, `integrated` | Wikisource documenta traduções integrais antigas em português, inclusive a de 1887 e a edição de 1907, além de alertar que traduções podem estar protegidas. [16] | Original em domínio público. Uma tradução antiga pode ser utilizável, mas a ficha deve registrar tradutor e edição; não substituir por tradução moderna encontrada na web. |
| 13 | **Os Lusíadas**, Luís de Camões, 1572; `broader`, `integrated`, TXT português Gutenberg #3333 | Gutenberg confirma idioma português; Wikisource lista edições de 1572, inclusive grafia original e modernizada. [14] [15] | Camões morreu em 1580; original em domínio público. O pacote tem um bom ponto de partida, mas deve escolher uma edição única e identificar se a modernização ortográfica é editorialmente livre. |
| 14 | **O Estrangeiro**, Albert Camus, 1942; `broader`, `metadata` | Não há texto integral no pacote. Open Library serve somente para catalogar. A Companhia das Letras oferece página legítima de produto relacionado, mas o resultado localizado é adaptação em quadrinhos e não deve ser confundido com o romance original. [20] | Camus morreu em 1960; a obra permanece protegida no Brasil em 2026. Manter somente metadados, resumo autoral e link para edição licenciada/MEC Livros ou biblioteca. Não baixar, colar ou recomendar PDF. |
| 15 | **Temor e Tremor**, Søren Kierkegaard, 1843; `metadata` | Sem texto integral no pacote; Open Library só pode ser referência bibliográfica. | Original em domínio público, mas a tradução portuguesa é outra obra protegida até a comprovação do tradutor/edição. Publicar metadados e resumo autoral; apontar para MEC Livros se o título estiver licenciado ou para empréstimo bibliotecário. |
| 16 | **Genealogia da Moral**, Friedrich Nietzsche, 1887; `metadata` | Sem texto integral no pacote; nenhuma edição portuguesa livre foi confirmada nesta auditoria. | Original em domínio público; traduções portuguesas modernas devem ser tratadas como protegidas. Recomenda-se ficha de conceitos e leitura licenciada, não texto integral. |
| 17 | **Ensaios**, Michel de Montaigne, 1580; `integrated` | O status `integrated` não aponta arquivo correspondente em `fulltext`; a tradução portuguesa não foi identificada. | Original em domínio público; edição/tradução em português precisa de fonte e direitos próprios. Corrigir o status para `metadata` até que a edição esteja documentada. |
| 18 | **Utopia**, Thomas More, 1516; `integrated` | Não há TXT correspondente no inventário; não foi confirmada tradução portuguesa livre. | Original em domínio público; tratar tradução portuguesa como camada protegida até prova. Corrigir `integrated` para `metadata` ou anexar fonte legítima identificada. |
| 19 | **Discurso do Método**, René Descartes, 1637; `integrated` | Não há TXT correspondente no inventário; tradução portuguesa não confirmada. | Original em domínio público; o arquivo atual é metadado/guia, não texto redistribuível. |
| 20 | **Ensaio sobre o Entendimento Humano**, John Locke, 1689; `metadata` | Sem texto integral; não há edição portuguesa livre confirmada. | Original em domínio público; traduções modernas protegidas. Manter resumo autoral e referência a edição legítima. |
| 21 | **As Origens do Totalitarismo**, Hannah Arendt, 1951; `metadata` | Sem texto integral. MEC Livros reúne obras licenciadas e públicas, mas exige verificar se o título está efetivamente no acervo. [4] | Arendt morreu em 1975; direitos patrimoniais, no Brasil, ainda vigentes em 2026. Metadados, resumo autoral e fonte legítima de leitura; nenhum PDF integral. |
| 22 | **Vigiar e Punir**, Michel Foucault, 1975; `metadata` | Sem texto integral e sem licença confirmada. | Foucault morreu em 1984; obra protegida. Usar edição de editora, biblioteca ou eventual licença MEC Livros; não redistribuir tradução nem escaneamento. |
| 23 | **Pedagogia do Oprimido**, Paulo Freire, 1968; `metadata` | Sem texto integral. A Fundação Biblioteca Nacional explica que obras protegidas dependem de autorização do titular. [3] | Freire morreu em 1997; obra protegida até o prazo legal. Manter metadados e síntese autoral. Uma página institucional de editora ou biblioteca pode ser fonte de leitura, mas não autoriza cópia. |
| 24 | **O Povo Brasileiro**, Darcy Ribeiro, 1995; `metadata` | Sem texto integral. | Darcy Ribeiro morreu em 1997; obra protegida. Recomenda-se edição licenciada, sinopse autoral e questões de estudo, sem reprodução de capítulos. |
| 25 | **Raízes do Brasil**, Sérgio Buarque de Holanda, 1936; `metadata` | A Companhia das Letras oferece página oficial da edição comemorativa, descrevendo notas, variantes e posfácios; é fonte legítima de catálogo/leitura, não autorização de cópia. [21] | Sérgio Buarque morreu em 1982; obra protegida em 2026. Não incorporar a edição da editora. Pode-se incorporar a síntese autoral e indicar a edição oficial. |
| 26 | **A Natureza do Espaço**, Milton Santos, 1996; `metadata` | A Edusp disponibiliza página/arquivo oficial de apresentação da obra e indica compra em canais regulares; o material não deve ser tratado como licença de redistribuição. [22] | Milton Santos morreu em 2001; obra protegida. Manter apenas metadados, resumo autoral e referência Edusp/biblioteca. |
| 27 | **Philosophiæ Naturalis Principia Mathematica**, Isaac Newton, 1687; `metadata` | Sem texto integral no pacote; original latino é domínio público, mas não há edição portuguesa livre confirmada. | Priorizar edição histórica digitalizada por biblioteca que declare reutilização. Uma tradução portuguesa moderna deve ser considerada protegida. |
| 28 | **Opticks**, Isaac Newton, 1704; `metadata` | Sem texto integral; não está em português. | Original em domínio público; tratar tradução portuguesa como protegida até verificar edição. Corrigir tema/metadados para distinguir obra original e tradução. |
| 29 | **A República**, Platão, ca. 380 a.C.; `metadata` | Sem texto integral; fonte Open Library é somente catálogo. | Obra original em domínio público; traduções portuguesas modernas podem ter direitos. Indicar edição licenciada ou texto antigo comprovado, sem assumir que qualquer PDF é livre. |
| 30 | **Meditações Metafísicas**, René Descartes, 1641; `metadata` | Sem texto integral; não há tradução portuguesa livre confirmada. | Original em domínio público; tradução/edição precisa de verificação. Manter ficha autoral e leitura legítima. |

## Lacunas concretas encontradas

1. **Idioma fora do escopo:** seis dos 11 TXT são inglês, alemão ou espanhol. O campo `language` existe, mas o catálogo de guias ainda chama os registros de `fulltext-source` sem impedir que a interface os apresente como literatura em português.
2. **Status editorial inflado:** `integrated` aparece em `Montaigne`, `Utopia` e os dois títulos de Descartes sem TXT correspondente em `fulltextSources`. O status deve significar conteúdo efetivamente integrado e testado, não apenas intenção.
3. **Fonte de leitura confundida com catálogo:** `openlibrary.org/isbn/...` e buscas Archive.org no catálogo servem para metadados/descoberta. Não são, por si, licença de redistribuição nem garantia de leitura aberta. Open Library inclusive apresentou barreira de verificação na consulta desta auditoria.
4. **Inconsistência de ID:** `eça-primo-basilio` em `broaderBooks` usa cedilha combinada, enquanto o TXT e `fullTextSources` usam `eca-primo-basilio`. Normalizar IDs para ASCII estável e preservar o título acentuado apenas no campo de apresentação.
5. **Seed V25 com `source_id` potencialmente nulo:** a migração `008_v23_runtime_catalog_seed.sql` insere apenas o registro-base `https://openlibrary.org/` e depois procura fontes específicas como `https://openlibrary.org/isbn/0140444173`. Como essas URLs específicas não são semeadas em `public.sources`, a subconsulta pode não encontrar fonte. Criar registros de fonte explícitos ou referenciar o registro-base de modo coerente.
6. **Ausência de cadeia de edição:** vários itens têm autor e ano, mas não têm tradutor, edição, digitalizador, política de reutilização, data de consulta ou hash do arquivo. Esses campos são essenciais para uma redistribuição realmente auditável.
7. **Direitos de tradução:** a propriedade `publicDomain` não pode ser herdada automaticamente por uma tradução. O relatório recomenda que cada edição tenha `workRights`, `editionRights`, `translator`, `territory`, `licenseUrl` e `attribution` separados.
8. **V25 sem conteúdo textual literário correspondente:** a reconstrução contém seeds e SVGs em `public/assets/library`, mas a busca em `public/books` não encontrou arquivos. A integração editorial não deve ser considerada concluída só pela existência de capa e linha SQL.
9. **Falta de fontes primárias para alguns clássicos:** `Os Sertões`, os textos de Newton, Platão, Locke, Montaigne e Descartes precisam de registros de biblioteca ou acervo institucional. O Portal Domínio Público oferece pesquisa por mídia, autor, título e idioma, e a BNDigital explicita as condições de reutilização; são os próximos lugares corretos para fechar a cadeia. [3] [19]
10. **Direitos de obras modernas:** Camus, Arendt, Foucault, Paulo Freire, Darcy Ribeiro, Sérgio Buarque e Milton Santos não devem receber texto integral, PDF, OCR ou tradução copiada. O produto editorial possível é metadado, resumo original, questões autorais, bibliografia e link para leitura autorizada.

## Ampliações prioritárias — pelo menos 15 entradas úteis

As propostas abaixo priorizam autores brasileiros e portugueses, textos em português e fontes que permitem começar com edição de domínio público. Os resumos são autorais e não reproduzem trechos integrais.

| Prioridade | Obra e metadados mínimos | Conteúdo autoral incorporável | Fonte legítima / status |
|---:|---|---|---|
| 1 | **Quincas Borba**, Machado de Assis, 1891 | Rubião herda fortuna e um sistema filosófico, mas sua ascensão social expõe autoengano, interesse e crueldade. Guia: narrador, ironia, Humanitismo e mobilidade social. | Wikisource apresenta a edição de referência de 1891. [25] Domínio público no Brasil. |
| 2 | **O Alienista**, Machado de Assis, 1882 | Simão Bacamarte transforma a classificação da loucura em poder administrativo; a novela permite discutir autoridade científica, normalidade e crítica institucional. | Wikisource disponibiliza capítulos e texto em português. [26] Domínio público. |
| 3 | **Helena**, Machado de Assis, 1876 | A entrada de Helena numa família rica tensiona segredo, herança, afeto e convenções do romance romântico. Guia: ponto de vista, segredo e classe. | Listada na bibliografia de romances do autor em Wikisource. [18] Domínio público; localizar edição digital institucional antes de anexar TXT. |
| 4 | **Esaú e Jacó**, Machado de Assis, 1904 | A rivalidade dos irmãos Pedro e Paulo atravessa mudanças políticas e mostra como convicções públicas podem esconder disputas pessoais. | Autor e títulos confirmados no catálogo de obras de Machado. [18] Domínio público; falta ficha de edição no pacote. |
| 5 | **Memorial de Aires**, Machado de Assis, 1908 | O diário ficcional de Aires observa relações, velhice e mudanças sociais com distância irônica. Guia: forma diarística, observador e abolição. | Listado no Wikisource para Machado. [18] Domínio público; confirmar transcrição e edição-base. |
| 6 | **Papéis Avulsos**, Machado de Assis, 1882 | Coletânea útil para leitura curta: ironia, ciência, burocracia, ciúme e convenção social aparecem em contos independentes. | Wikisource lista a coleção e projetos de transcrição. [18] Domínio público; incorporar contos individualmente após checagem. |
| 7 | **Iracema**, José de Alencar, 1865 | O encontro entre Iracema e Martim articula mito de origem, natureza, conflito colonial e formação de identidade. Guia deve explicitar que a idealização literária não é fonte histórica neutra. | Wikisource conserva a edição de 1865, índice e carta final. [23] Domínio público. |
| 8 | **O Guarani**, José de Alencar, 1857 | A narrativa folhetinesca combina aventura, lealdade, natureza e construção romântica do indígena. Guia: folhetim, nacionalidade e representação. | Wikisource identifica autor, gênero, fonte da digitalização e edição inicial. [24] Domínio público. |
| 9 | **Senhora**, José de Alencar, 1875 | Aurélia usa riqueza e casamento para inverter uma relação de poder, revelando como o romance transforma dinheiro, honra e desejo em negociação. | Wikisource registra referência da Fundação Biblioteca Nacional e as quatro partes. [27] Domínio público. |
| 10 | **O Cortiço**, Aluísio Azevedo, 1890 | O cortiço funciona como espaço coletivo onde trabalho, exploração, desejo e ambiente moldam trajetórias. Guia: Naturalismo, determinismo e crítica social, sem tratar a tese naturalista como fato científico atual. | Wikisource identifica a edição Garnier de 1890. [28] Domínio público. |
| 11 | **O Ateneu**, Raul Pompeia, 1888 | A escola-internato é narrada como experiência de formação, hierarquia e memória; permite estudar espaço fechado, narrador retrospectivo e violência institucional. | Wikisource conserva a edição de 1888 e o índice de capítulos. [29] Domínio público. |
| 12 | **Memórias de um Sargento de Milícias**, Manuel Antônio de Almeida, 1855 | Leonardo percorre uma sociedade de favores, malandragens e ajustes, em narrativa que desloca o herói moral tradicional. Guia: anti-heroísmo, humor e vida urbana. | Wikisource oferece índice de 48 capítulos. [30] Domínio público. |
| 13 | **Clara dos Anjos**, Lima Barreto, 1923–1924/1948 | A trajetória de Clara revela racismo, desigualdade de gênero, vulnerabilidade e limites da promessa de ascensão. O estudo deve contextualizar publicação seriada e volume póstumo. | Wikisource documenta conto, publicação seriada e romance póstumo. [31] Lima Barreto morreu em 1922; obra em domínio público no Brasil. |
| 14 | **Bom-Crioulo**, Adolfo Caminha, 1895 | O romance confronta disciplina naval, desejo, raça e moralidade social, exigindo leitura histórica crítica e aviso de temas sensíveis. | Wikisource identifica autor, gênero, referência de origem e situação de domínio público. [32] |
| 15 | **A Moreninha**, Joaquim Manuel de Macedo, 1844 | O pacto amoroso e a memória de infância organizam um romance de costumes sobre juventude, promessa e convenção social. | Wikisource registra projetos das edições de 1844, 1845 e 1860. [33] Domínio público. |
| 16 | **O Crime do Padre Amaro**, Eça de Queirós, 1875 | A relação entre clero, desejo e moral pública permite estudar Realismo português, crítica institucional e conflito entre discurso e prática. | Wikisource oferece página de edição em português e indica domínio público para autores portugueses falecidos há mais de 70 anos. [34] |
| 17 | **A Relíquia**, Eça de Queirós, 1887 | Teodorico combina devoção aparente, oportunismo e fantasia; o romance questiona a autoridade de relíquias e a distância entre verdade e encenação. | Wikisource conserva a edição do Porto de 1887. [35] Domínio público. |
| 18 | **Mensagem**, Fernando Pessoa, 1934 | Livro de poemas sobre memória, mito e imaginário nacional; o guia deve separar símbolo poético de relato histórico. | A página de desambiguação do Wikisource identifica o livro de Fernando Pessoa, mas o link interno precisa ser corrigido antes de ingestão. [36] Pessoa morreu em 1935; obra em domínio público no Brasil. |
| 19 | **A Alma Encantadora das Ruas**, João do Rio, 1908 | Crônicas urbanas podem ampliar a leitura de cidade, trabalho, espetáculo e desigualdade, com análise crítica do olhar do cronista. | A lista de clássicos brasileiros do Wikisource registra a obra entre as de João do Rio. [13] Domínio público; localizar exemplar institucional. |
| 20 | **Navio Negreiro**, Castro Alves, 1869/1880 | Poema adequado para estudar abolicionismo, oratória, ritmo e representação da violência escravista, com contextualização histórica rigorosa. | A lista de clássicos brasileiros registra a obra e a coleção de Castro Alves. [13] Domínio público; escolher edição digital identificada. |

As primeiras 15 ampliações são as mais recomendadas para execução. Todas permitem uma ficha com título, autoria, data, gênero, temas, resumo autoral, contexto, cinco perguntas e conexões com o estudo, sem copiar capítulos protegidos. Para texto integral, priorizar as páginas de Wikisource/BNDigital cuja edição e política sejam identificáveis; para os demais, incorporar apenas metadados e guia até a verificação do exemplar.

## Conteúdo autoral pronto para o pacote

### Campos editoriais recomendados

```json
{
  "id": "quincas-borba",
  "title": "Quincas Borba",
  "author": "Machado de Assis",
  "year": 1891,
  "language": "pt",
  "workRights": "public-domain-brazil",
  "editionRights": "verify-edition-and-source",
  "readingUrl": "https://pt.wikisource.org/wiki/Quincas_Borba",
  "catalogUrl": "https://openlibrary.org/",
  "sourceType": "institutional-text",
  "attribution": "Machado de Assis; edição digital consultada no Wikisource",
  "integralTextIncluded": false
}
```

`workRights` e `editionRights` devem ser separados. Para obras protegidas, usar `workRights: protected-brazil`, `integralTextIncluded: false`, `summary: original-editorial` e uma URL de editora, biblioteca ou MEC Livros. Para traduções, acrescentar `translator` e `translatorDeathYear` quando conhecidos. O campo `catalogUrl` nunca deve ser usado como se fosse licença.

### Exemplo de ficha autoral para uma ampliação

**Quincas Borba — Machado de Assis (1891)**

- **A obra:** Rubião recebe fortuna, um cachorro e uma filosofia que parecem prometer uma vida melhor. A herança, porém, coloca o personagem em redes de interesse nas quais amizade, amor e cálculo se confundem.
- **Contexto:** O romance observa a sociedade urbana do final do século XIX e usa a ironia para mostrar a distância entre discursos generosos e relações de poder.
- **Forma:** A narração interrompe a ação, comenta as escolhas do leitor e transforma a própria explicação em objeto de desconfiança.
- **Pergunta-guia:** Quando uma ideia é apresentada como filosofia universal, quem se beneficia dela?
- **Conexões:** Realismo brasileiro, narrador, crítica social, mobilidade, linguagem irônica e ética da responsabilidade.

Esse bloco é autoral e pode ser adaptado ao formato `sections` do catálogo sem inserir texto integral da obra.

### Guia curto para obras protegidas

Para **O Estrangeiro**, **As Origens do Totalitarismo**, **Vigiar e Punir**, **Pedagogia do Oprimido**, **O Povo Brasileiro**, **Raízes do Brasil** e **A Natureza do Espaço**, a ampliação segura é: metadados completos, três parágrafos de resumo autoral, contexto histórico, conceitos, perguntas de leitura, bibliografia e link para a editora/MEC Livros/biblioteca. O catálogo deve dizer claramente: “obra protegida; esta ficha não substitui a edição integral”. A FAQ do Ministério da Cultura confirma que disponibilização pela Internet de obra protegida exige autorização do autor ou titular. [2]

## Política de fontes e redistribuição

- **Project Gutenberg:** usar como fonte de descoberta e, quando necessário, como origem de um arquivo específico somente depois de revisar o cabeçalho, os termos e a situação no Brasil. Não usar a marca Gutenberg em produto sem observar a licença; não presumir que “public domain in the USA” equivale a domínio público brasileiro. [5]
- **Wikisource:** útil para edições antigas em português e para localizar transcrições, mas registrar a edição de referência, o estado de transcrição e a licença da plataforma. Não copiar automaticamente traduções modernas.
- **Domínio Público/MEC:** usar a busca por autor, título e idioma para localizar arquivos, conferindo a ficha da obra e a fonte. O portal lista literatura em português, Machado de Assis, Fernando Pessoa e A Divina Comédia em português. [19]
- **BNDigital:** preferir obras cujo próprio acervo declare domínio público ou autorização. Atribuir “Acervo da Fundação Biblioteca Nacional – Brasil” quando reutilizar conteúdo conforme a orientação institucional. [3]
- **Open Library:** somente catálogo, ISBN, edição e descoberta. Não registrar a página como licença de redistribuição nem como garantia de acesso aberto.
- **MEC Livros:** fonte legítima para leitura quando o título aparecer no acervo; a plataforma reúne obras públicas e licenciadas, mas o acesso ocorre pela plataforma própria e login gov.br. [4]
- **Obras protegidas:** não baixar, OCRizar, hospedar, colar ou recomendar cópias não autorizadas. Oferecer metadados, resumo autoral, questões e fonte legítima.

## Próximos passos recomendados

1. Corrigir os IDs, separar `workRights` de `editionRights` e rebaixar para `metadata` os registros marcados `integrated` sem texto correspondente.
2. Substituir a leitura principal dos seis arquivos estrangeiros por uma ficha explicitamente em português; manter os textos originais apenas em uma frente multilíngue separada, se houver necessidade editorial.
3. Para os cinco TXT portugueses existentes, validar edição, territorialidade, cabeçalho e atribuição; priorizar versões BNDigital/Domínio Público/Wikisource quando a política permitir reutilização.
4. Integrar primeiro as 15 ampliações prioritárias, começando por Machado, José de Alencar, Lima Barreto, Aluísio Azevedo, Raul Pompeia, Manuel Antônio de Almeida e Eça de Queirós.
5. Criar uma planilha ou JSON de proveniência com `sourceUrl`, `edition`, `translator`, `licenseUrl`, `rightsStatus`, `checkedAt`, `integralTextIncluded` e `attribution`.
6. Corrigir os seeds V25 para apontar para fontes realmente cadastradas e adicionar testes que falhem quando `reading_mode=integrated` não tiver arquivo ou quando `language` não for `pt` nesta frente.

## Referências

[1]: https://www.planalto.gov.br/ccivil_03/leis/l9610.htm "Lei nº 9.610/1998 — direitos autorais, arts. 41 a 46"
[2]: https://www.gov.br/cultura/pt-br/assuntos/direitos-autorais/perguntas-frequentes/perguntas-frequentes "Ministério da Cultura — Perguntas frequentes sobre direitos autorais"
[3]: https://bndigital.bn.gov.br/orientacoes-de-uso-de-arquivos-digitais/ "BNDigital — Orientações de uso de arquivos digitais"
[4]: https://www.gov.br/mec/pt-br/mec-livros "MEC Livros — biblioteca digital do Brasil"
[5]: https://www.gutenberg.org/policy/license.html "Project Gutenberg — licença e verificação territorial"
[6]: https://www.gutenberg.org/ebooks/2600 "Project Gutenberg — War and Peace, eBook 2600"
[7]: https://www.gutenberg.org/ebooks/2554 "Project Gutenberg — Crime and Punishment, eBook 2554"
[8]: https://www.gutenberg.org/ebooks/1342 "Project Gutenberg — Pride and Prejudice, eBook 1342"
[9]: https://www.gutenberg.org/ebooks/67535 "Project Gutenberg — Triste Fim de Polycarpo Quaresma, eBook 67535"
[10]: https://www.gutenberg.org/ebooks/42942 "Project Gutenberg — O Primo Bazilio, eBook 42942"
[11]: https://www.gutenberg.org/ebooks/54829 "Project Gutenberg — Memorias Posthumas de Braz Cubas, eBook 54829"
[12]: https://www.gutenberg.org/ebooks/55752 "Project Gutenberg — Dom Casmurro, eBook 55752"
[13]: https://pt.wikisource.org/wiki/Wikisource:Cl%C3%A1ssicos_brasileiros "Wikisource — Clássicos brasileiros"
[14]: https://www.gutenberg.org/ebooks/3333 "Project Gutenberg — Os Lusíadas, eBook 3333"
[15]: https://pt.wikisource.org/wiki/Os_Lus%C3%ADadas "Wikisource — Os Lusíadas, edições e transcrições"
[16]: https://pt.wikisource.org/wiki/A_Divina_Com%C3%A9dia "Wikisource — A Divina Comédia e traduções antigas em português"
[17]: https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas "Wikisource — Memórias Póstumas de Brás Cubas, edição de 1881"
[18]: https://pt.wikisource.org/wiki/Autor:Machado_de_Assis "Wikisource — Autor: Machado de Assis"
[19]: https://dominiopublico.mec.gov.br/ "Portal Domínio Público — pesquisa de obras"
[20]: https://www.companhiadasletras.com.br/livro/9788535925098/o-estrangeiro "Companhia das Letras — O Estrangeiro, página de produto localizada; conferir se é adaptação"
[21]: https://www.companhiadasletras.com.br/livro/9788535927610/raizes-do-brasil "Companhia das Letras — Raízes do Brasil, edição oficial"
[22]: https://www.edusp.com.br/wp-content/uploads/2022/05/A-Natureza-do-Espa%C3%A7o.pdf "Edusp — material oficial sobre A Natureza do Espaço"
[23]: https://pt.wikisource.org/wiki/Iracema "Wikisource — Iracema, edição de 1865"
[24]: https://pt.wikisource.org/wiki/O_Guarani "Wikisource — O Guarani, José de Alencar"
[25]: https://pt.wikisource.org/wiki/Quincas_Borba "Wikisource — Quincas Borba, edição de 1891"
[26]: https://pt.wikisource.org/wiki/O_Alienista "Wikisource — O Alienista, capítulos em português"
[27]: https://pt.wikisource.org/wiki/Senhora "Wikisource — Senhora, José de Alencar"
[28]: https://pt.wikisource.org/wiki/O_Corti%C3%A7o "Wikisource — O Cortiço, edição de 1890"
[29]: https://pt.wikisource.org/wiki/O_Ateneu "Wikisource — O Ateneu, edição de 1888"
[30]: https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias "Wikisource — Memórias de um Sargento de Milícias"
[31]: https://pt.wikisource.org/wiki/Clara_dos_Anjos "Wikisource — Clara dos Anjos, conto, seriado e romance"
[32]: https://pt.wikisource.org/wiki/Bom-Crioulo "Wikisource — Bom-Crioulo, Adolfo Caminha"
[33]: https://pt.wikisource.org/wiki/A_Moreninha "Wikisource — A Moreninha, edições de 1844, 1845 e 1860"
[34]: https://pt.wikisource.org/wiki/O_Crime_do_Padre_Amaro "Wikisource — O Crime do Padre Amaro, Eça de Queirós"
[35]: https://pt.wikisource.org/wiki/A_Rel%C3%ADquia "Wikisource — A Relíquia, edição de 1887"
[36]: https://pt.wikisource.org/wiki/Mensagem "Wikisource — Mensagem, página de desambiguação"
