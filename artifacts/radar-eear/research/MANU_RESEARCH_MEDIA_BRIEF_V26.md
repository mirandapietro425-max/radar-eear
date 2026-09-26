# MANU — BRIEF DE PESQUISA, CURIOSIDADES, IMAGENS, MAPAS E SOM
## RADAR EEAR V26 · pacote pronto para alimentar o produto

### MISSÃO

Você é a camada editorial externa do RADAR EEAR. Não entregue ideias vagas: entregue **material pronto para integração no site**.

O produto já possui navegação, leitores, Atlas, Biblioteca, Bíblia, Pensadores, Jogos, Trilhas, Linha do Tempo, busca universal e módulos de estudo. Sua tarefa é aumentar **profundidade, evidência, beleza e conexão**, sem inventar fatos e sem transformar o site em um catálogo genérico.

A direção visual do produto é: **arquivo de museu + atlas digital + biblioteca de edição rara + cockpit de aprendizagem**. Conteúdo, imagem e som devem reforçar essa sensação.

---

## 1. REGRA DE PESQUISA

Pesquise na web antes de afirmar qualquer fato que não esteja explicitamente sustentado pelos materiais locais.

Prioridade de fonte:

1. fonte primária / arquivo / obra original;
2. instituição cultural, universidade, museu, biblioteca ou órgão oficial;
3. bases reconhecidas de patrimônio e ciência;
4. publicação acadêmica identificável;
5. fonte secundária confiável para contextualização.

Não use uma única página como prova para uma afirmação relevante. Para cada curiosidade factual, registre **fonte, URL e tipo de fonte**.

Não invente datas, coordenadas, autoria, citações, licenças, fotografias ou atribuições.

Quando houver incerteza, marque explicitamente:
- `confidence: high`
- `confidence: medium`
- `confidence: low`

Quando duas fontes discordarem, não escolha silenciosamente: registre a divergência em `notes`.

Para fatos atuais, mudanças recentes, disponibilidade de museus, horários, APIs, licenças e URLs, registre também `checked_at` em ISO-8601.

---

## 2. LIVROS — 38+ OBRAS

Expandir cada obra já presente na Biblioteca, incluindo o acervo base e as expansões editoriais.

Para cada livro, produzir:

- resumo factual em 80–140 palavras;
- autor em 100–180 palavras;
- 3–6 curiosidades realmente verificáveis;
- 4–8 temas/conceitos;
- 2–4 relações com outros livros, pessoas ou lugares;
- 1 contexto histórico/cultural;
- 1 contexto de publicação/edição quando verificável;
- status de domínio público/licenciamento por **edição**, não apenas por obra;
- fonte de texto integral quando existir e for legítima;
- fonte bibliográfica;
- sugestões de imagem;
- alt text de cada imagem.

Obras prioritárias da expansão:

- Quincas Borba
- Iracema
- O Guarani
- O Cortiço
- O Ateneu
- Memórias de um Sargento de Milícias
- O Crime do Padre Amaro
- A Relíquia
- O Estrangeiro
- Vigiar e Punir
- Pedagogia do Oprimido
- As Origens do Totalitarismo

Para obras protegidas, **não envie texto integral**. Entregue apenas metadados, resumo, contexto, citações curtas quando juridicamente cabíveis e caminhos de acesso legítimo.

---

## 3. AUTORES E PENSADORES — 24 BASE + 7 EXPANDIDOS

Aprofundar os dossiês existentes e os recém-adicionados:

- Albert Einstein
- Charles Darwin
- Marie Curie
- Machado de Assis
- Luís Vaz de Camões
- Hannah Arendt
- Orígenes de Alexandria

Para cada pessoa:

- biografia factual curta;
- 5 marcos biográficos verificáveis;
- 4–8 ideias ou contribuições;
- 3–6 obras relevantes;
- 3 curiosidades verificadas;
- 2–5 lugares relacionados, com coordenadas somente quando confirmadas;
- 2–5 relações com outros pensadores;
- imagem de retrato institucional ou de acervo;
- crédito, licença, origem e alt text.

Não trate interpretações controversas como fatos consensuais. Quando houver debate historiográfico, apresente a divergência.

---

## 4. ATLAS — FAZER O MAPA PARECER UMA EXPERIÊNCIA, NÃO UM WIDGET

O Atlas é uma área central do produto. Pesquisar material que possa virar pontos, rotas, camadas e histórias.

Para cada ponto novo:

```json
{
  "id": "slug-estavel",
  "name": "Nome do lugar",
  "country": "País",
  "region": "Região",
  "lat": 0,
  "lng": 0,
  "period": "período ou século",
  "categories": ["Ciência", "Literatura"],
  "fact": "fato verificável curto",
  "why": "por que este ponto muda a narrativa",
  "curiosities": ["curiosidade 1", "curiosidade 2"],
  "links": ["entidade relacionada"],
  "sources": [
    {"title":"Fonte", "url":"https://...", "type":"institutional"}
  ],
  "confidence": "high",
  "checked_at": "2026-09-26T00:00:00Z"
}
```

Priorizar pontos ligados a:

- Revolução Científica;
- mundo bíblico e arqueologia contextual;
- literatura atlântica;
- cidades do conhecimento;
- história da matemática;
- física e astronomia;
- história da aviação;
- história do Brasil;
- patrimônio, museus e bibliotecas;
- lugares ligados diretamente aos pensadores do produto.

### ROTAS / STORYTELLING

Criar pelo menos 12 jornadas de 3–7 pontos. Exemplos de formato:

- `Pisa → Pádua → Cambridge — revolução científica`
- `Jerusalém → Roma → Ásia Menor — mundo bíblico`
- `Lisboa → Coimbra → Rio — literatura em língua portuguesa`
- `Alexandria → Atenas → Paris — cidades do conhecimento`

Cada jornada deve ter:

- pergunta de abertura;
- sequência de pontos;
- explicação de 1–2 frases por parada;
- imagem hero;
- fontes;
- atividade de fechamento.

### GOOGLE MAPS / EARTH / 3D

Não dependa de API paga para a experiência principal. O Atlas interno precisa funcionar sozinho.

Também entregar, quando possível:

- URL canônica de Google Maps / Google Earth para cada lugar;
- nome exato usado pela busca;
- coordenada verificada;
- indicação de monumentos, museus ou vistas úteis;
- sugestão de camada 3D ou Earth Studio quando houver uma conexão legítima.

Não raspar conteúdo protegido ou impor dependência de uma API que não esteja configurada.

---

## 5. CURIOSIDADES — GRANDE BANCO EDITORIAL

Criar um banco de curiosidades em todas as áreas: Matemática, Física, Português, Inglês, Ciência, História, Filosofia, Literatura, Bíblia, Apócrifos, Aviação, Hardware e Cultura Pop.

Alvo inicial: **100 curiosidades verificadas**, distribuídas de forma equilibrada.

Cada item:

```json
{
  "id":"curiosity-slug",
  "area":"História",
  "title":"Título curto",
  "body":"Curiosidade verificável em 2–5 frases.",
  "why_it_matters":"Ligação pedagógica ou narrativa.",
  "entity_type":"book|thinker|place|concept|event",
  "entity_id":"id-relacionado",
  "sources":[{"title":"Fonte", "url":"https://...", "type":"institutional"}],
  "confidence":"high",
  "checked_at":"2026-09-26T00:00:00Z",
  "image":"opcional",
  "image_credit":"opcional"
}
```

Curiosidade não é frase de efeito. Não usar “você sabia?” para mascarar informação sem fonte.

---

## 6. CIÊNCIA / APRENDER FAZENDO

Aprofundar os módulos que já existem no projeto:

- evidência pré-histórica;
- cadeias alimentares/ecologia;
- diagnóstico computacional;
- cultura pop como ponte conceitual;
- método experimental;
- grafo de conhecimento.

Para cada módulo, entregar:

- explicação;
- demonstração visual;
- erro comum;
- microatividade;
- pergunta de investigação;
- resposta esperada;
- fonte;
- imagem/diagrama necessário.

Priorizar diagramas originais, mapas conceituais e fotografias institucionais em vez de imagens decorativas.

---

## 7. BÍBLIA — CONTEXTO SEM INVENTAR

Para cada livro bíblico, melhorar o contexto editorial com:

- gênero/livro;
- estrutura;
- personagens quando aplicável;
- lugares;
- contexto histórico discutido na literatura especializada;
- temas;
- 3–5 curiosidades verificadas;
- ligações com o Atlas;
- links internos para outros livros/capítulos;
- fontes e edição usada.

A separação precisa ficar clara entre:

- texto do livro;
- contexto histórico;
- tradição interpretativa;
- hipótese acadêmica;
- interpretação religiosa.

Para capítulos específicos, entregar contexto apenas quando houver base suficiente.

---

## 8. IMAGENS — PESQUISAR E PEDIR, NÃO PREENCHER COM BANCO GENÉRICO

Para cada entidade importante, devolver um **media request**.

Fontes prioritárias:

- Wikimedia Commons;
- NASA;
- Smithsonian;
- Library of Congress;
- Europeana;
- Internet Archive;
- bibliotecas nacionais;
- museus e universidades;
- Openverse quando a licença estiver clara;
- acervos oficiais das instituições.

Para cada imagem:

```json
{
  "asset_id":"portrait-newton-01",
  "purpose":"hero|card|detail|atlas|diagram|timeline",
  "subject":"Isaac Newton",
  "source_url":"https://...",
  "source_name":"Instituição",
  "license":"CC BY / Public Domain / etc.",
  "credit":"Crédito completo",
  "alt":"Descrição acessível",
  "crop":"portrait|landscape|square|wide",
  "priority":"high|medium|low"
}
```

Não enviar imagens de procedência desconhecida como “prontas”. Se uma imagem ideal estiver protegida, pedir uma alternativa licenciada ou criar uma composição original simples.

### PACKS DE IMAGEM PRIORITÁRIOS

1. Atlas: globos, mapas históricos, monumentos e vistas de 20–30 pontos-chave.
2. Pensadores: retratos/acervos dos 31 perfis.
3. Biblioteca: capas/edições ou recriações editoriais não enganosas.
4. Ciência: diagramas de experimentos e fenômenos.
5. Bíblia: mapas/contexto arqueológico e histórico com atribuição.
6. Cultura Pop: somente material com uso legítimo ou imagens originais que representem o conceito sem copiar artes protegidas.

---

## 9. SOM — SÓ QUANDO MELHORAR A UX

Não transformar o produto em site barulhento.

Pesquisar ou produzir um pequeno pacote de sons licenciados/originais para:

- clique principal;
- conclusão de questão;
- avanço de trilha;
- descoberta do dia;
- modo Atlas;
- entrada/saída do modo foco.

Entregar no máximo 5–8 arquivos curtos, com:

- duração;
- origem;
- licença;
- volume recomendado;
- onde tocar;
- necessidade de respeitar `prefers-reduced-motion` e preferência de som.

Nada de trilhas comerciais ou efeitos sem licença clara.

---

## 10. ACESSIBILIDADE E UX EDITORIAL

Para cada imagem, fornecer alt text. Para mapas, fornecer descrição textual equivalente.

Para animações e som, sempre existir uma experiência equivalente sem movimento/som.

Para conteúdo muito denso, fornecer resumo escaneável e hierarquia de informação.

Não aumentar a quantidade de conteúdo sem aumentar sua navegabilidade.

---

## 11. FORMATO DE ENTREGA — SEM VAGUIDADE

Entregar quatro artefatos:

### A. `research-packs.json`
Banco estruturado de livros, pessoas, lugares, curiosidades e módulos.

### B. `media-registry-v26.json`
Registro de imagens, mapas, diagramas e sons com crédito/licença/alt.

### C. `editorial-changelog.md`
Lista objetiva do que foi pesquisado, o que foi confirmado, o que permanece incerto e quais links devem ser usados no produto.

### D. `ready-to-integrate.md`
Blocos finais prontos para copiar para cards, páginas, Atlas, Biblioteca, Bíblia e Descoberta do Dia.

**Não entregue apenas URLs.** Cada URL precisa estar ligada a uma afirmação, imagem, conceito ou recurso concreto.

---

## 12. CRITÉRIO DE ACEITE

O pacote estará pronto quando:

- cada fato importante tiver fonte;
- cada imagem tiver origem/licença/alt;
- cada novo lugar tiver coordenada verificável;
- cada curiosidade puder virar um card imediatamente;
- cada rota do Atlas puder virar uma jornada;
- cada pensador tiver material suficiente para uma página completa;
- cada livro tiver contexto + autor + curiosidades + relações;
- a Bíblia tiver contexto sem confundir texto com interpretação;
- o material protegido não receber texto integral indevido;
- não houver placeholder do tipo “pesquise mais” sem tarefa concreta;
- o output puder ser importado para o RADAR EEAR com pouca ou nenhuma edição manual.

### REGRA FINAL

**A pergunta não é “o que mais podemos colocar no site?”. A pergunta é “o que torna cada página mais verdadeira, visual, conectada e útil?”.**
