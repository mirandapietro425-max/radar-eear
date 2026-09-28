# RADAR EEAR — AUDITORIA FINAL V48

Data: 28 de setembro de 2026

## Resultado

A segunda rodada de auditoria foi concluída no pacote de trabalho V48.

### Validação estrutural

- 37/37 verificações V48 passaram.
- 420 questões verificadas.
- 28 módulos de questões.
- 15 questões por módulo.
- 28 guias didáticos presentes.
- 75 curiosidades presentes.
- nenhuma referência de asset verificada pelo auditor apontou arquivo ausente.
- proxy de livros presente e com allowlist de origens.
- assistente de voz e saída por voz presentes.
- rotas contextuais de curiosidades, pré-história e ciência corrigidas.
- retry de leitura de livros presente.
- notificações não começam como “ligadas” antes da permissão do navegador.
- Compare cobre Pessoa, Conceito, Livro e Lugar sem criar ranking.
- curiosidades salvas resolvem para a rota de detalhe correta.
- questões e simulados priorizam o pacote fechado V45 de 420 questões.

## Smoke runtime

`runtime-smoke` passou com:

- 30 livros;
- 66 livros bíblicos;
- 1189 capítulos bíblicos;
- 24 pensadores;
- 31 lugares;
- 25 apócrifos;
- 20 módulos de hardware;
- 214 microconceitos de Matemática;
- 240 microconceitos de Física;
- 420 questões V45;
- 28 guias V45;
- 64 provas anteriores;
- 11 jogos.

`assistant-smoke`: PASS.

## Problema de qualidade encontrado na auditoria

A estrutura de Curiosidades está completa, mas o banco atual é editorialmente curto:

- 75 registros;
- mediana de 22 palavras no campo principal `body`;
- 65 de 75 têm menos de 30 palavras no `body`;
- as fontes e imagens existem, mas o texto ainda funciona muitas vezes mais como “fato curto” do que como mini-dossiê.

Por isso, nesta versão a interface foi reforçada com:

- leitura em camadas;
- fontes explícitas;
- relação com Atlas;
- questão relacionada;
- salvamento no Meu Radar;
- navegação anterior/próxima;
- descobertas relacionadas;
- título editorial limpo sem poluir o cabeçalho com marcadores de referência.

O aprofundamento factual das 75 curiosidades deve vir da pesquisa de conteúdo posterior, sem inventar informação.

## Biblioteca

A Biblioteca agora calcula o estado de leitura a partir da configuração efetivamente suportada pelo leitor e apresenta uma seção “Agora lendo” baseada em `bookProgress` real.

As capas foram protegidas contra sobreposição/pseudo-elementos e configuradas para preservarem proporção com `object-fit: contain`.

Livros com texto público suportado podem usar o proxy interno; conteúdos sem texto integral legítimo continuam claramente identificados como acesso externo/metadado.

## Persistência

O RADAR usa localStorage como fallback rápido e IndexedDB como snapshot complementar, além de sincronização remota quando Supabase está configurado.

Ao entrar autenticado, eventos remotos, retomada, notas, favoritos, progresso de livros e revisões são hidratados e mesclados com o estado local.

## Cronômetro e navegação

O cronômetro do Modo Foco já trabalha em `HH:MM:SS`, portanto horas são contabilizadas.

O cabeçalho global já contém controles explícitos de Voltar/Avançar do histórico do navegador.

O Modo Foco preserva a sessão enquanto o usuário navega e usa Wake Lock/Media Session quando suportados pelo dispositivo.

## Service Worker

O cache do service worker foi versionado para V48. Isso é importante para evitar que uma instalação antiga continue servindo a shell V46 depois da publicação de uma versão nova.

## Limitação de validação

O ambiente de auditoria local não possui uma instalação completa de React/Vite/@types no `node_modules`, e a tentativa de reinstalação não completou. Por isso:

- não foi apresentado um `npm run build` como sucesso;
- a validação foi feita por transpile de sintaxe dos principais TS/TSX, smoke tests e auditorias estruturais/dados.

O deploy real ainda precisa executar o build no ambiente da publicação.

Também não foi possível consultar os runtime errors da Vercel nesta rodada porque a integração disponível respondeu `403 Forbidden` ao endpoint de erros. Portanto, nada de produção foi declarado como verificado com base nessa consulta.
