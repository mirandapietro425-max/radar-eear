# MANUS — V28 HANDOFF / RELAÇÕES E CONTEÚDO

A base desta versão já recebeu correções diretas no código. NÃO refazer a arquitetura nem voltar para o globo 3D.

## Já corrigido no código

- Relações de pensadores deixaram de depender de links genéricos ou de uma heurística ambígua.
- Existe um mapa explícito de relações confiáveis entre pensadores e lugares (quando o lugar faz sentido dentro do Atlas).
- Obras dos pensadores que antes apareciam apenas como texto agora têm itens reais no catálogo da Biblioteca e navegação para `/biblioteca/<id>`.
- O catálogo inclui obras metadata-only quando a obra ainda não tem texto local, evitando botão morto.
- O Atlas mantém Google Maps como mapa principal.
- `Abrir conexão` do Atlas procura uma relação real antes de aparecer.
- `Abrir jornada` faz foco/scroll no painel do lugar.
- Conteúdos recuperados do contexto-mestre voltam a aparecer em um rack orgânico dentro de Explorar: pré-história, computação, ecologia e experimentos, sem criar um excesso de novas abas.
- Conteúdo de Matemática/Física/Português/Inglês usa seleção específica de tópico e não deve cair silenciosamente no primeiro conteúdo.
- Questões são filtradas por disciplina e tópico quando disponível.
- Biblioteca marca leitura integrada somente quando existe uma fonte de leitura local/legítima conhecida.
- Leitor usa tema de texto contrastante e não deve ter overlays brancos sobre o conteúdo.

## O que a Manus deve fazer agora

### 1. Capas e retratos

Pesquisar e adicionar imagens reais, priorizando fontes institucionais, Wikimedia Commons, Internet Archive, Open Library, bibliotecas nacionais, museus e outras fontes com direitos adequados.

Para cada asset registrar:
- URL
- fonte
- licença
- crédito
- alt text
- edição, quando for capa de livro

Substituir primeiro os fallbacks das obras de pensadores e as capas metadata-only mais importantes.

### 2. Livros / textos públicos

Para cada item de `THINKER_WORK_CATALOG` e demais livros metadata-only, tentar localizar texto integral ou scan legal em:
- Project Gutenberg
- Wikisource
- Internet Archive
- HathiTrust/full view
- bibliotecas digitais
- Google Books full view, quando permitido

Não confundir obra antiga com qualquer edição moderna livre de direitos. Verificar obra, edição e tradução.

Quando houver fonte legal:
- baixar/materializar se a licença permitir;
- adicionar leitor interno;
- registrar origem/licença.

Quando não houver:
- manter catálogo + análise + fonte externa legal;
- NÃO fingir leitura interna.

### 3. Testar relações

Testar pelo menos:
- Newton → Principia → Cambridge
- Platão → A República → Atenas
- Descartes → Discurso do Método / Meditações → Paris
- Galileu → Sidereus Nuncius → Pisa/Pádua
- Kepler → Astronomia Nova → Praga
- Faraday → Experimental Researches in Electricity → Londres
- Machado de Assis → Dom Casmurro → Rio
- Camões → Os Lusíadas → Lisboa

Cada link precisa abrir a entidade correta.

### 4. Testar conteúdo restaurado

Verificar que o universo original continua acessível por caminhos internos:
- Ciência
- Pré-história/Paleontologia
- Computação/Manutenção
- Ecologia
- Experimentos
- Cultura
- Atlas
- Curiosidades

Não criar novas abas só para esses itens se o conteúdo já puder viver dentro de Explorar/Estudar/Trilhas/Atlas.

### 5. Não quebrar

Preservar o que já funciona:
- Bíblia
- Google Maps/Atlas
- jogos
- questões
- edital
- mapa do edital
- trilhas
- Biblioteca
- leitor

### 6. QA obrigatório

Testar desktop e mobile.

Testar:
- Home
- Estudar
- Praticar
- Biblioteca
- Pensadores
- Atlas
- Curiosidades
- Bíblia
- Apócrifos
- Jogos
- Simulados
- Menu mobile

Para cada ação:
clique → destino correto → conteúdo atualizado → retorno possível.

### 7. Publicação

Só depois:
- `npm install`
- `npm run typecheck`
- `npm run build`
- E2E, se disponível
- commit
- push GitHub
- deploy Vercel
- teste da URL de produção

Não afirmar que está publicado sem URL real de produção e teste.
