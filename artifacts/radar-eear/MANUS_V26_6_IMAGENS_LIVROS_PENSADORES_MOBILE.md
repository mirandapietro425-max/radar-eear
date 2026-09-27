# MANUS V26.6 — IMAGENS REAIS + LIVROS + PENSADORES + MOBILE + JOGOS

Trabalhe diretamente sobre o RADAR EEAR existente. Não crie uma demo paralela.

## OBJETIVO

Esta rodada resolve os problemas de experiência encontrados na auditoria do usuário:

- imagens da Home incoerentes com a matéria estudada;
- capas de livros artificiais/provisórias;
- livros sem capa real e sem acesso claro;
- pensadores sem retrato;
- pensadores sem suas obras visíveis;
- módulos de Matemática/Física repetindo a mesma explicação;
- blocos brancos/legados na interface;
- alternativas de questões ilegíveis;
- mapa do simulado ocupando a tela inteira;
- Bíblia com camada branca sobre o texto;
- apócrifos que parecem clicáveis mas não abrem;
- Atlas com layout grande demais em algumas larguras;
- títulos/imagens cortados no celular;
- jogos precisam evoluir para experiências HTML5 legítimas quando houver fonte/licença adequada.

## 1. IMAGENS DA HOME / HOJE

Não use uma única fotografia genérica para diferentes matérias.

A imagem de fundo/hero precisa ser semanticamente coerente com a ação recomendada.

Exemplos:

Matemática → gráfico/geometria/números.
Física → fenômeno físico/laboratório/instrumentação.
Português → livro/texto/escrita.
Inglês → leitura/língua/comunicação.
Bíblia → manuscrito/mapa/iconografia apropriada.
Atlas → mapa/paisagem/local.
Biblioteca → edição/capa/acervo.
Descoberta → imagem específica do fato descoberto.

Não inventar relação entre imagem e conteúdo.

Preferir imagens reais, históricas, institucionais ou de acervo aberto.

Registrar:
- URL;
- autor/instituição;
- licença;
- crédito;
- alt text;
- finalidade.

## 2. CAPAS DOS LIVROS

NÃO usar capas SVG inventadas como se fossem capas reais.

Para cada livro do catálogo:

1. procurar edição/capa real;
2. conferir título;
3. conferir autor;
4. preferir capa de edição conhecida;
5. registrar fonte;
6. registrar crédito/licença quando necessário.

Priorizar:

- Google Books;
- Open Library;
- Internet Archive;
- bibliotecas nacionais;
- bibliotecas universitárias;
- Wikimedia Commons;
- editoras quando apropriado.

Se a capa não puder ser reproduzida legalmente:

usar metadados e uma representação neutra, sem fingir que é a capa original.

O sistema já possui suporte para estes caminhos locais:

`/assets/library/covers/<book-id>.webp`
`/assets/library/covers/<book-id>.jpg`
`/assets/library/covers/<book-id>.png`

Use esses caminhos quando houver arquivo local.

## 3. LEITOR DOS LIVROS

Cada livro deve ser classificado claramente como:

- leitura integrada;
- acesso externo legítimo;
- ficha editorial.

Nunca chamar “leitura integrada” uma obra que só tenha uma ficha.

Para obras públicas/abertas com texto legítimo:

- leitor real;
- capítulo/parte;
- posição;
- progresso;
- continuar;
- anterior/próximo;
- nota;
- fonte.

Para obras protegidas:

- metadados;
- contexto;
- curiosidades;
- relações;
- fonte;
- acesso legal externo.

## 4. PENSADORES

Adicionar retratos reais aos perfis relevantes.

Priorizar fontes institucionais, Wikimedia/Wikipedia quando apropriado e acervos históricos.

Não precisa de tratamento fotográfico sofisticado.

A imagem deve parecer uma fotografia/retrato documental, não uma ilustração genérica.

O sistema já aceita estes caminhos locais:

`/assets/portraits/<slug>.webp`
`/assets/portraits/<slug>.jpg`
`/assets/portraits/<slug>.png`

Também:

`/assets/people/<slug>.*`

## 5. PENSADORES + OBRAS

Todo grande pensador deve mostrar suas obras no próprio dossiê.

Exemplos prioritários:

Newton:
- Principia;
- Opticks;
- escritos relacionados quando cadastrados.

Descartes:
- Discurso do Método;
- Meditações Metafísicas.

Platão:
- A República;
- outros diálogos já cadastrados.

Marx:
- obras já disponíveis no catálogo/dossiê.

Max Weber:
- obras já disponíveis no catálogo/dossiê.

Pascal:
- obras já disponíveis no catálogo/dossiê.

Aristóteles:
- obras já disponíveis no catálogo/dossiê.

Não apagar o material já existente.

## 6. MATEMÁTICA / FÍSICA

Cada microconceito deve apresentar conteúdo realmente específico.

Testar pelo menos:

Matemática:
- números complexos;
- geometria plana;
- áreas;
- produtos notáveis;
- simetria;
- progressão aritmética;
- funções;
- cálculo e métodos matemáticos.

Física:
- cinemática;
- aceleração;
- trabalho e energia;
- óptica;
- ondas;
- eletricidade;
- gravitação.

Não reutilizar a explicação de um tópico em outro apenas trocando o título.

Cada um deve ter:

- definição;
- intuição;
- fórmula/lei;
- exemplo próprio;
- erro comum;
- interação/visual;
- desafio;
- questão relacionada;
- revisão.

## 7. DESCOBERTA DO DIA

Todos os cards precisam abrir seu conteúdo específico.

Testar:

- Por que aceleração não é velocidade?
- Uma PA é determinada por dois dados?
- Gênesis como narrativa de origens.
- demais itens existentes.

Ao clicar:

URL muda → conteúdo muda → detalhe aparece → navegador pode voltar → mobile também funciona.

## 8. APÓCRIFOS

Cada obra deve abrir sua própria página/dossiê.

Testar:

- 1 Enoque;
- 2 Enoque;
- 3 Enoque;
- Jubileus;
- demais itens cadastrados.

Não deixar cards mortos.

## 9. BÍBLIA

Preservar a experiência que já funciona.

Corrigir apenas:

- camada branca sobre texto;
- filtros/abas que aparentem não responder;
- leitura diária;
- responsividade.

Não remover os 66 livros / 1.189 capítulos.

## 10. QUESTÕES

Todas as alternativas precisam ser visualmente legíveis.

Nunca deixar fundo branco sobre texto branco.

O mapa de questões do simulado deve ficar recolhido em um controle tipo:

“Mapa de questões · 270 preparadas”

em vez de ocupar todo o espaço abaixo do enunciado.

## 11. MOBILE

Testar:

320 px;
360 px;
390 px;
430 px.

Corrigir:

- títulos cortados;
- nomes de imagens cortados;
- botões pequenos;
- conteúdo sob bottom navigation;
- mapas que ultrapassam viewport;
- cartões estreitos;
- texto fora do container.

## 12. ATLAS

A decisão atual é definitiva:

Google Maps é a camada visual principal.

NÃO recriar o globo 3D próprio.

O Atlas deve ser:

Google Maps
+
painel editorial
+
pontos
+
jornadas
+
curiosidades
+
conexões.

O mapa precisa respeitar:

`width: 100%`
`max-width: 100%`
`min-width: 0`

e nunca ultrapassar o viewport.

No mobile, o mapa deve ocupar toda a largura disponível sem esconder conteúdo lateral.

## 13. JOGOS HTML5

Pesquisar experiências HTML5/open source realmente utilizáveis.

Preferir:

- licença aberta;
- domínio público;
- projetos educativos;
- jogos que rodem diretamente no navegador.

Verificar licenciamento antes de integrar.

Não simplesmente colocar um iframe aleatório.

Quando uma experiência externa puder ser incorporada legalmente:

- criar wrapper interno;
- mostrar título;
- instruções;
- origem;
- licença;
- estado de carregamento;
- fallback;
- voltar ao Radar sem perder estado.

Quando não houver licença/integração adequada, manter o jogo próprio funcional em vez de fingir que uma API existe.

## 14. QA DE REALIDADE

Testar cada botão que aparecer.

Perguntas obrigatórias:

“clicou?”
“abriu?”
“mostrou a entidade correta?”
“salvou?”
“voltou?”
“persistiu?”
“o progresso mudou?”
“a fonte existe?”
“a imagem existe?”
“o texto está legível?”

## 15. ENTREGA

Depois de implementar:

- typecheck;
- build;
- testes;
- E2E se disponível;
- commit GitHub;
- push;
- Vercel produção;
- teste da URL publicada.

Na resposta final informar apenas fatos verificáveis:

GitHub:
commit:
Vercel:
build:
testes:
rotas testadas:
pendências reais:

Não declarar publicação sem verificar a URL de produção.
