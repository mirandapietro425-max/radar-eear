# RADAR EEAR V47 — correções reais aplicadas

Esta versão foi corrigida diretamente no código do RADAR EEAR. A Manus não deve implementar nada: ela deve apenas publicar esta versão.

## Questões
- Navegação por matéria e módulo.
- Cada módulo usa seu `contentId` real.
- O filtro não cai mais para o banco geral quando um módulo está selecionado.
- 420 questões verificadas em 28 módulos, 15 por módulo.
- O módulo preserva matéria, conteúdo, subtema, dificuldade, origem, resposta e explicação.

## Biblioteca e livros
- Biblioteca passa a reconhecer automaticamente edições públicas de Gutenberg/Wikisource como leitura integrada quando há fonte identificada.
- O leitor pode inferir o `.txt` do Project Gutenberg a partir da página da obra.
- Foi criado `api/book.js` como proxy de mesmo domínio para Gutenberg/Wikisource, reduzindo falhas de CORS e permitindo cache no Vercel.
- Leitor ganhou botão de nova tentativa quando uma edição não carrega.
- Preservadas capas reais e proporção das capas.
- Removidas dependências de caminhos locais inexistentes para fulltext.

## Assistente
- Mantido reconhecimento por voz.
- Adicionado painel de voz mais evidente.
- Adicionada resposta por voz com `SpeechSynthesisUtterance`.
- Comando falado pode navegar para Atlas, matérias, livros, questões, pessoas, curiosidades e módulos.
- O assistente pode levar diretamente a lugares do Atlas.
- Rotas de cobertura foram corrigidas para Pré-história, Computação, Cultura e Ciência.

## Conteúdo / Explorar
- Corrigidas rotas de módulos que antes apontavam experiências de uma área errada.
- Pré-história possui experiência de evidência/reconstrução.
- Ciência possui experiência de hipótese/experimento.
- Preservada a separação entre módulos de ciência, pré-história, computação e cultura.

## Curiosidades
- Mantidas imagens próprias e fontes.
- Detalhe agora é uma leitura em camadas: registro, importância, verificação e continuidade de estudo.
- Relações com Atlas, questão e Assistente aparecem quando os dados permitem.

## Pensadores
- Mantidos dossiês, obras, relações e fontes.
- Adicionada camada de Ciência e Matemática com fórmulas e explicações para os pensadores que possuem relação cadastrada.

## Persistência / UX
- Mantida persistência local e retomada de sessões.
- Mantidos Modo Foco, Media Session, wake lock, notificações e PWA já existentes.
- Preservados Bíblia, Jogos, Atlas, Simulados, Revisões e demais áreas existentes.

## Validação desta rodada
- V47 repair validation: 20/20.
- Assistant smoke: PASS.
- Runtime smoke: PASS.
- TypeScript/TSX syntax transpilation: PASS para os arquivos alterados.

## Limitação do ambiente
O build Vite completo não foi executado nesta sessão porque o ambiente de trabalho não possui as dependências instaladas e o projeto exige Node 24. Isso não é apresentado como build aprovado.
