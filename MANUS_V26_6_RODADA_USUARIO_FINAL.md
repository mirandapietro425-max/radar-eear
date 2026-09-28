# MANUS V26.6 — RODADA FINAL DE CORREÇÕES OBSERVADAS PELO USUÁRIO

## CONTEXTO

O usuário navegou no produto em desktop e mobile e identificou problemas concretos.
Não responder com análise: corrigir no projeto existente, testar e publicar.

## PRIORIDADE 1 — IMAGENS

As imagens da Home / Hoje estão sem relação clara com a ação de estudo.
Trocar por imagens semanticamente coerentes:

- Matemática → matemática/geometria/gráficos;
- Física → laboratório/fenômeno físico/instrumentação;
- Português → livro/texto/escrita;
- Inglês → leitura/idioma/comunicação;
- Bíblia → manuscritos/mapas/iconografia/contexto;
- Atlas → mapa/paisagem/local;
- Biblioteca → capa/acervo/edição;
- Descoberta → imagem específica da descoberta.

Não usar fundo genérico.

Pedir/pesquisar imagens reais e adequadas em fontes abertas ou institucionais, registrar crédito/licença/alt e copiar assets estáveis para o projeto quando permitido.

## PRIORIDADE 2 — CAPAS

As capas atuais parecem inventadas/provisórias.
Substituir por capas reais das obras, quando houver uso permitido.

Priorizar fontes de biblioteca, Wikimedia, Open Library, Google Books, Internet Archive e acervos institucionais.

Não inventar edição.

Para obras sem permissão para reproduzir capa, usar representação neutra e identificar como tal.

## PRIORIDADE 3 — PENSADORES

Adicionar retratos documentais aos pensadores relevantes:

Aristóteles, Descartes, Pascal, Max Weber, Karl Marx, Isaac Newton e demais nomes importantes.

Cada pensador deve mostrar as obras diretamente no dossiê.

Não mostrar apenas “quem ele foi”.

Mostrar:

- obras;
- conceitos;
- relações;
- lugares;
- curiosidades;
- fontes.

## PRIORIDADE 4 — LIVROS

Testar cada ação:

Abrir obra
Ver acesso legítimo
Ver lugar relacionado
Continuar leitura

Para as obras com texto público local:
abrir leitor integrado.

Para as demais:
mostrar acesso legal externo funcional.

Não classificar uma obra como leitura integrada sem texto correspondente.

## PRIORIDADE 5 — APÓCRIFOS

Todos os cards devem abrir seu próprio dossiê.

Testar pelo menos:
1 Enoque
2 Enoque
3 Enoque
Jubileus

## PRIORIDADE 6 — BÍBLIA

A experiência atual está boa e deve ser preservada.

Corrigir somente:

- camada branca sobre o texto;
- botões/abas sem resposta real;
- mobile.

Preservar:
66 livros
1.189 capítulos

## PRIORIDADE 7 — ESTUDAR

Eliminar os blocos brancos legados perto de “Estudar agora”.

Alternativas de questões também precisam ser escuras e legíveis.

## PRIORIDADE 8 — MÓDULOS

Math/Physics:

cada tópico precisa abrir sua própria explicação.

Não fazer:

Números Complexos → mesma explicação de Geometria Plana.

Não fazer:

Aceleração → texto de outro tópico.

Cada módulo precisa ter conteúdo específico, exemplo específico, interação específica e questão relacionada.

## PRIORIDADE 9 — SIMULADOS

O mapa das questões não deve aparecer ocupando a área principal.

Deixar recolhido.

O enunciado deve vir primeiro.

Depois alternativas.

As alternativas não podem ser blocos brancos.

## PRIORIDADE 10 — ATLAS

Google Maps é a camada principal.

Não recriar o globo 3D próprio.

O mapa deve:

- ocupar apenas o espaço disponível;
- nunca ultrapassar viewport;
- funcionar no desktop;
- funcionar no mobile;
- sincronizar ponto ↔ painel;
- permitir abrir local;
- conectar curiosidade ↔ Atlas.

## PRIORIDADE 11 — MOBILE

Testar 320, 360, 390, 430 px.

Corrigir:

- imagem cortada;
- nome cortado;
- títulos grandes;
- barras de navegação cobrindo conteúdo;
- cards largos;
- mapa maior que tela;
- texto fora de container.

## PRIORIDADE 12 — JOGOS

Pesquisar jogos HTML5/open source somente quando licença/permissão permitir.

Não usar iframe aleatório.

Cada integração deve possuir:

- wrapper;
- loading;
- instrução;
- origem;
- licença;
- fallback.

Manter os jogos próprios que já são funcionais.

## QA OBRIGATÓRIO

Depois das alterações:

- typecheck;
- build;
- testes;
- E2E se disponível;
- testar produção;
- verificar 404 de assets;
- verificar console;
- verificar mobile.

Depois:

commit GitHub
push
Vercel production
abrir URL pública
validar rotas críticas novamente.

Só declarar concluído depois de testar a versão publicada.
