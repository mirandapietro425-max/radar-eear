# Auditoria editorial — filósofos, cientistas e autores

A auditoria de `src/data/thinker-details.ts` encontrou **24 perfis**: Newton, Platão, Sócrates, Aristóteles, Agostinho, Tomás de Aquino, Descartes, Pascal, Galileu, Kepler, Faraday, Maxwell, Mendel, Gödel, Marx, Weber, Durkheim, Tocqueville, Bourdieu, Goffman, W. E. B. Du Bois, Merton, Mannheim e Lemaître. Os 24 IDs coincidem com os 24 pensadores em `experience-data.ts`; portanto, não há perfil quebrado por ausência de chave. O problema principal é editorial: os perfis ainda são sínteses sem rastreabilidade bibliográfica individual.

## Achados verificáveis no arquivo

O tipo `ThinkerDetail` é adequado como esqueleto de perfil: local de nascimento, período, áreas, contexto, ideias, obras, influências, fonte, livro relacionado, tema e relações. Porém, o campo `source` não guarda URL: os cinco perfis iniciais usam fórmulas como “Curadoria editorial...” e todos os perfis criados por `simple()` recebem o mesmo texto genérico. Isso impede que o leitor verifique datas, obras e interpretações.

O helper `simple()` também fixa `birthplace` como “Biografia resumida; consulte a fonte primária para o local exato.” Assim, 19 entradas não têm local de nascimento factual no pacote. A mesma função substitui relações externas por `/explorar`, e a maior parte das relações atuais é interna ao Radar, não uma fonte institucional. O perfil de Sócrates é uma boa exceção metodológica: explicita que ele não deixou obras e que os testemunhos são indiretos. Essa cautela deve ser mantida e ampliada para autores cuja datação ou atribuição é controversa.

As obras estão em listas de strings, sem ano, edição, idioma, URL, tipo de fonte ou estatuto de direito autoral. Isso é especialmente problemático em `faraday`, `maxwell`, `godel`, `dubois`, `merton`, `mannheim` e `lemaitre`, cujos títulos aparecem em inglês, embora a frente editorial peça links em português. Também falta separar obra original, tradução, edição crítica, resumo autoral e texto integral.

Há sinais de conteúdo já existente fora do arquivo que não foi convertido em perfil: `catalog.ts` relaciona Machado de Assis, Eça de Queirós, Lima Barreto, Euclides da Cunha, Dante, Camões, Camus, Kierkegaard, Nietzsche, Montaigne, Thomas More, Locke, Hannah Arendt, Foucault, Paulo Freire, Darcy Ribeiro, Sérgio Buarque de Holanda e Milton Santos. O catálogo também inclui Darwin como evento da linha do tempo, mas não como pensador. Esses itens são lacunas concretas de integração entre biblioteca, linha do tempo e perfis.

## Correções e enriquecimentos para perfis já existentes

### Newton, Aristóteles e Galileu

A página universitária de Física e Cidadania da UFJF apresenta Aristóteles como pensador do século IV a.C., com contribuições para ética, metafísica, classificação dos animais, observação e raciocínio silogístico; ao discutir sua física, a própria fonte deixa claro que se trata de uma reconstrução histórica e que suas explicações não são a física moderna [1]. Esse material permite substituir o contexto genérico de Aristóteles por uma distinção útil entre lógica, biologia, física antiga e limites históricos do modelo dos quatro elementos.

A página da mesma instituição sobre Galileu informa nascimento em Pisa em 15 de fevereiro de 1564, morte em 8 de janeiro de 1642, docência em Pádua, uso do telescópio em astronomia, observações de Júpiter, manchas solares, Lua e Via Láctea, além das obras *Dialogo* e *Discorsi* [2]. O bloco autoral incorporável é: “Galileu articulou demonstração matemática, observação instrumental e estudo experimental do movimento. Suas observações telescópicas ampliaram o debate astronômico, enquanto os estudos sobre queda, plano inclinado e projéteis ajudaram a deslocar a investigação da natureza para uma linguagem matemática.” O texto deve evitar afirmar que ele inventou o telescópio ou que um episódio popular de queda de objetos foi comprovado, pois a própria fonte trata histórias desse tipo como não comprovadas.

Para Newton, a fonte mais segura para o conteúdo científico a ser ligado é a história da ciência da FUNAG, em seus volumes sobre ciência moderna e século XIX [3]. O perfil atual tem boa seleção de ideias, mas precisa de datação da edição usada, URL institucional e distinção entre *Principia*, *Opticks* e *Arithmetica Universalis*. O período “1643–1727” deve receber uma nota editorial sobre calendários e não ser alterado silenciosamente.

### Agostinho e a transição entre Antiguidade e Idade Média

O artigo de Eric Marçal sobre Agostinho, publicado na revista *Kriterion* e disponível na SciELO, mostra que classificá-lo simplesmente como “medieval” é uma escolha historiográfica discutível: o autor defende que Agostinho pertence ao mundo antigo, embora tenha sido decisivo para a incorporação da filosofia grega no pensamento cristão [4]. O perfil deve registrar essa condição de autor de transição, em vez de apresentar “teologia latina” como uma etiqueta sem contexto. O bloco autoral sugerido é: “Agostinho escreve no fim do mundo romano e transforma problemas de memória, tempo, vontade e mal em questões filosóficas e teológicas. Sua recepção medieval foi enorme, mas sua classificação histórica exige separar época de vida, tradição recebida e influência posterior.”

### Bourdieu e a recepção brasileira

O artigo de José Sergio Leite Lopes na SciELO não é uma biografia, mas documenta a circulação de Bourdieu nas ciências sociais brasileiras e a apropriação de ferramentas de análise por gerações posteriores [5]. Ele serve para o campo `influenced`, para a relação com o Brasil e para uma nota de recepção; não deve ser usado sozinho para confirmar nascimento, morte ou lista completa de obras. O bloco autoral seguro é: “Na recepção brasileira, Bourdieu aparece associado à análise de campo intelectual, classes populares e circulação internacional de ideias. Campo, habitus e capital cultural devem ser apresentados como instrumentos analíticos, não como sinônimos de classe social.” É necessário localizar uma fonte biográfica específica antes de publicar as datas já inseridas no código (1930–2002).

### Gödel

A biografia do MacTutor, projeto da University of St Andrews, confirma a trajetória de Gödel em Brno/Viena, a tese de completude de 1929 e a publicação, em 1931, dos teoremas da incompletude [6]. O bloco autoral é: “Gödel mostrou que sistemas formais suficientemente expressivos podem conter proposições que não são decidíveis apenas pelos axiomas do próprio sistema; o resultado não ‘prova que a matemática é inútil’, mas delimita o alcance de certos programas de formalização.” O perfil atual deve substituir “Teoremas da incompletude” como obra única por uma referência bibliográfica ao artigo de 1931 e por uma explicação que não transforme o resultado em slogan sobre computadores.

## Inclusões prioritárias que faltam

### Cientistas

**Albert Einstein (1879–1955).** O Nobel registra nascimento em Ulm, formação em Zurique, trabalho no Escritório de Patentes, relatividade restrita em 1905, relatividade geral publicada em 1916, migração para Princeton e morte em 18 de abril de 1955 [7]. A mesma fonte lista *Relativity*, *Investigations on Theory of Brownian Movement* e *The Evolution of Physics*, além de textos não científicos. Conteúdo autoral: “Einstein reformulou as relações entre espaço, tempo, movimento, gravitação e luz. O Nobel de 1921 reconheceu seu trabalho sobre o efeito fotoelétrico, e não a relatividade como tal.”

**Charles Darwin (1809–1882).** O Darwin Correspondence Project informa nascimento em 12 de fevereiro de 1809, a viagem de cinco anos no *Beagle*, o papel de geologia e zoologia em sua formação e a publicação de *On the Origin of Species* em 1859 [8]. A linha do tempo institucional também registra *The Descent of Man* em 1871, *The Expression of the Emotions in Man and Animals* em 1872 e a morte em 19 de abril de 1882 [9]. Conteúdo autoral: “Darwin reuniu observações de campo, geologia, criação de animais e comparação de espécies para formular a seleção natural. *A origem das espécies* deve ser tratada como uma obra científica histórica, e não como transcrição de uma teoria contemporânea completa.”

**Marie Skłodowska-Curie (1867–1934).** O Nobel confirma nascimento em Varsóvia, morte em 4 de julho de 1934, Nobel de Física de 1903 e Nobel de Química de 1911 [10] [11]. A instituição atribui à pesquisa dos Curies a identificação de polônio e rádio e registra o isolamento do rádio metálico em 1910. Conteúdo autoral: “Marie Curie investigou a radioatividade como propriedade ligada ao interior do átomo, combinando medição física e separação química. Sua trajetória deve aparecer também como história institucional de acesso das mulheres à formação científica.”

Esses três nomes fecham a principal lacuna da linha do tempo: Darwin já aparece em `v25-content.ts`, Einstein e Curie aparecem apenas como referências dispersas. A inclusão deve ser feita primeiro com metadados, resumo autoral e fonte institucional, sem incorporar artigos científicos integrais.

### Autores e literatura em português

**Machado de Assis (1839–1908).** A Academia Brasileira de Letras confirma nascimento e morte no Rio de Janeiro, a atuação como jornalista, contista, cronista, romancista, poeta e teatrólogo, a fundação da cadeira 23 e a presidência da ABL [12]. A bibliografia institucional data *Memórias póstumas de Brás Cubas* de 1881, *Quincas Borba* de 1891, *Dom Casmurro* de 1899, *Esaú e Jacó* de 1904 e *Memorial de Aires* de 1908 [13]. Conteúdo autoral: “Machado atravessou poesia, teatro, conto, crônica e romance. Sua obra madura usa ironia, narradores pouco confiáveis e comentários sobre classe, escravidão, desejo e reputação; o perfil não deve reduzir sua literatura ao rótulo de ‘realismo’.”

O portal Machado de Assis do MEC informa que a coleção digital foi organizada em parceria com o Portal Domínio Público e o NUPILL/UFSC, com edições digitais gratuitas, cronologia e bibliografia [14]. Isso permite um link de leitura legal e um perfil editorial robusto. O portal, contudo, também alerta que a compilação pode conter omissões; portanto, registrar “acesso gratuito” não equivale a afirmar que toda edição ou tradução pode ser redistribuída sem conferência.

**Luís Vaz de Camões (c. 1524–c. 1580).** A Biblioteca Nacional de Portugal apresenta a datação aproximada e liga diretamente a vida do autor à obra *Os Lusíadas*, destacando a condição viajante e a escassez de certezas biográficas [15]. O perfil deve preservar “c.” nas datas, apresentar *Os Lusíadas* como epopeia e evitar biografias lendárias como fatos.

Dante, Eça de Queirós, Lima Barreto e Euclides da Cunha já têm obras no catálogo, mas não têm perfil em `thinker-details.ts`. São inclusões de segunda prioridade. Os links do catálogo podem permanecer como metadados até que cada autor receba fonte biográfica institucional em português; não se deve preencher datas apenas por memória editorial.

### Filosofia política e filosofia moderna

Hannah Arendt é a lacuna mais evidente porque já tem livro no catálogo (`arendt-origens`) e verbete acadêmico em português. A Enciclopédia Mulheres na Filosofia da Unicamp confirma nascimento em 1906 e morte em 1975, sua tese sobre Santo Agostinho, o exílio e a cidadania norte-americana, além de listar *Origens do Totalitarismo* (1951), *A Condição Humana* (1958), *Entre o Passado e o Futuro* (1961), *Sobre a Revolução* (1963), *Eichmann em Jerusalém* (1963) e *A Vida do Espírito* (póstuma e inacabada) [16]. Conteúdo autoral: “Arendt investigou totalitarismo, ação, liberdade, pluralidade, responsabilidade e julgamento. O perfil deve distinguir ‘banalidade do mal’ como formulação ligada ao relato sobre Eichmann de qualquer leitura que transforme a expressão em sinônimo de mal menor.”

Também devem ser priorizados Locke, Nietzsche, Foucault, Camus, Kierkegaard, Montaigne e Thomas More, já identificados no catálogo de livros. Para essa rodada, recomenda-se começar por metadados e resumos autorais: títulos, datas de publicação, temas e relações internas. A ausência atual não é apenas de nomes: é de ligações entre `broaderBooks`, `thinkers` e `thinkerDetails`.

### Teólogos e pensadores religiosos

**Orígenes de Alexandria (c. 185–254).** O artigo da revista *DoisPontos*, da UFPR, apresenta Orígenes como um dos primeiros grandes teólogos cristãos, descreve sua exegese bíblica, a sistematização doutrinal, o uso da alegoria e a relação crítica com o platonismo alexandrino [17]. Conteúdo autoral: “Orígenes combinou exegese bíblica, argumentação teológica e categorias filosóficas gregas. Seu perfil precisa indicar que se trata de um autor patrístico, com datação aproximada e recepção histórica disputada.”

**Martinho Lutero (1483–1546).** É uma inclusão recomendável para a dimensão teológica e para a Reforma, mas a auditoria não encontrou ainda uma fonte institucional brasileira suficientemente completa para fechar data, obras e tradução. Deve entrar como pendência de pesquisa, não como perfil preenchido por texto enciclopédico sem URL. A mesma regra vale para outros autores religiosos fora da lista atual.

## Texto integral redistribuível versus metadados e resumo

A classificação editorial deve ficar explícita em cada obra. “Texto integral redistribuível” só deve ser usado quando o arquivo específico estiver em domínio público ou tiver licença que permita redistribuição. “Acesso gratuito” é uma categoria diferente: permite leitura no site, mas não necessariamente copiar a edição, a tradução, a revisão ou o PDF para dentro do pacote.

A Lei nº 9.610/1998 protege textos literários, científicos e traduções/adaptações [18]. Os direitos patrimoniais duram 70 anos contados de 1º de janeiro do ano seguinte à morte do autor, e pertencem ao domínio público as obras cujo prazo expirou ou de autor desconhecido nas condições legais [18]. A própria Câmara registra, no art. 46, a possibilidade de citação de passagens para estudo, crítica ou polêmica, com nome do autor e origem, mas isso não autoriza copiar uma obra moderna inteira [18]. O Ministério da Cultura reforça que os direitos morais permanecem e que, para obra não caída em domínio público, a disponibilização na internet requer autorização [19].

Aplicação ao pacote:

- **Pode ser considerado candidato a texto integral redistribuível:** obras originais de autores falecidos há mais de 70 anos, como Platão, Aristóteles, Agostinho, Aquino, Descartes, Newton, Darwin, Machado e Camões, desde que se use uma edição cujo texto e aparato não tenham direitos adicionais. Mesmo nesse caso, creditar autor, tradutor e editor quando aplicável.
- **Caso concreto com evidência de licença:** o item em português do *Principia* no Internet Archive exibe “Public Domain Mark 1.0”, idioma português e os livros I, II e III [20]. Recomenda-se manter o link para leitura e registrar a licença do item; não importar automaticamente o arquivo de 1,4 GB nem presumir que toda camada editorial da digitalização seja livre.
- **Caso institucional de acesso legal:** o portal do MEC oferece a coleção digital de Machado, com acesso gratuito e parceria pública/universitária [14]. A integração mais segura é usar URL de leitura, metadados e resumos autorais; a cópia local deve depender da verificação da licença/edição concreta.
- **Somente metadados e resumo:** Arendt, Bourdieu, Goffman, Merton, Mannheim, Lemaître, Einstein, Freire, Milton Santos, Foucault, Camus e outros autores modernos. Usar título, ano, autor, obra, conceitos e paráfrase própria, com fonte; não incluir capítulos, traduções ou PDFs protegidos.
- **Fontes acadêmicas em acesso aberto:** artigos da UFPR, SciELO, Unicamp e UnB podem ser citados e resumidos conforme a licença indicada pela página. O artigo da UFPR sobre Orígenes declara CC BY 4.0 [17]; essa permissão cobre o artigo nas condições da licença, não transforma automaticamente as obras antigas ou traduções citadas em material livre.

## Conteúdo autoral de dados a incorporar

Adicionar ao modelo, no mínimo, `sourceUrls: string[]`, `sourceType: 'institucional' | 'academica' | 'primaria' | 'catalogo'`, `contentStatus: 'summary' | 'integral-reusable' | 'metadata-only'`, `workLanguage`, `workYear`, `editionNote`, `license`, `licenseUrl` e `uncertaintyNote`. Uma obra deve ter o formato conceitual `{title, year, kind, language, accessUrl, rightsStatus}` em vez de uma string isolada.

Para cada novo perfil, registrar: nome normalizado; nome original quando relevante; nascimento e morte com `c.` quando a fonte assim exigir; local; áreas; três a cinco ideias; três a cinco obras com ano; influências; impacto; uma fonte biográfica; uma fonte sobre a obra; e uma nota de direitos. O `source` textual atual pode permanecer como resumo curto, mas não deve substituir URLs específicas.

Prioridade de implementação: (1) Einstein, Darwin, Marie Curie e Machado; (2) Arendt, Camões, Orígenes, Paulo Freire e Milton Santos; (3) Dante, Eça, Lima Barreto, Euclides, Locke, Nietzsche, Camus, Kierkegaard, Montaigne, Thomas More e Foucault; (4) Lutero e outros teólogos após fonte institucional. Em todos os casos, começar com metadados e síntese autoral, não com textos integrais.

## Referências

[1]: https://www2.ufjf.br/fisicaecidadania/temas-e-curiosidades/grandes-vultos-da-ciencia/aristoteles/ "Aristóteles — Projeto Física e Cidadania, UFJF"
[2]: https://www2.ufjf.br/fisicaecidadania/temas-e-curiosidades/grandes-vultos-da-ciencia/galileu-galilei/ "Galileu Galilei — Projeto Física e Cidadania, UFJF"
[3]: https://funag.gov.br/loja/download/1020-Historia_da_Ciencia_-_Vol.II_Tomo_I_-_A_Ciencia_Moderna.pdf "História da Ciência: A Ciência Moderna — FUNAG"
[4]: https://www.scielo.br/j/kr/a/FcqDXXG9HXjVk8WdSx9bYWj/?lang=pt "Por que Agostinho não é um filósofo medieval — SciELO/Kriterion"
[5]: https://www.scielo.br/j/sant/a/QpQnJhWSv4BT4ZVdpJNz74Q/?lang=pt "Touraine e Bourdieu nas ciências sociais brasileiras — SciELO"
[6]: https://mathshistory.st-andrews.ac.uk/Biographies/Godel/ "Kurt Gödel — MacTutor History of Mathematics, University of St Andrews"
[7]: https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/ "Albert Einstein — Nobel Prize biographical"
[8]: https://www.darwinproject.ac.uk/about-darwin "About Darwin — Darwin Correspondence Project"
[9]: https://www.darwinproject.ac.uk/learning-resources/timeline "Darwin's Timeline — Darwin Correspondence Project"
[10]: https://www.nobelprize.org/prizes/physics/1903/marie-curie/facts/ "Marie Curie — Nobel Prize in Physics 1903"
[11]: https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/facts/ "Marie Curie — Nobel Prize in Chemistry 1911"
[12]: https://www.academia.org.br/academicos/machado-de-assis/biografia "Machado de Assis — Academia Brasileira de Letras"
[13]: https://www.academia.org.br/academicos/machado-de-assis/bibliografia "Machado de Assis: bibliografia — Academia Brasileira de Letras"
[14]: https://machado.mec.gov.br/ "Machado de Assis — Coleção Digital, MEC/NUPILL"
[15]: https://www.bnportugal.gov.pt/index.php?option=com_content&view=article&id=2148%3Aexposicao-onde-tera-segura-a-curta-vida&catid=178%3A2026&Itemid=2136&lang=pt "Onde Terá Segura a Curta Vida? Camões e a Vida como Viagem — Biblioteca Nacional de Portugal"
[16]: https://www.blogs.unicamp.br/mulheresnafilosofia/hannah-arendt/ "Hannah Arendt — Enciclopédia Mulheres na Filosofia, Unicamp"
[17]: https://revistas.ufpr.br/doispontos/article/view/94803 "Orígenes leu Platão, mas.... — DoisPontos/UFPR"
[18]: https://www2.camara.leg.br/legin/fed/lei/1998/lei-9610-19-fevereiro-1998-365399-publicacaooriginal-1-pl.html "Lei nº 9.610/1998 — Câmara dos Deputados"
[19]: https://www.gov.br/cultura/pt-br/assuntos/direitos-autorais/perguntas-frequentes/perguntas-frequentes "Direitos autorais: perguntas frequentes — Ministério da Cultura"
[20]: https://archive.org/details/Principia.Livro.1.2.3-Isaac.Newton "Principia — Livros I, II e III, Isaac Newton — Internet Archive"
[21]: https://www.scielo.br/j/rh/a/4ttYpzfGyr5gwT4sxLd6cMp/?lang=pt "Milton Santos e o golpe de 1964 — SciELO/Revista de História"
[22]: https://periodicos.unb.br/index.php/insurgencia/article/download/41491/32531/122918 "Temas geradores Paulo Freire: vida e obra — Universidade de Brasília"
