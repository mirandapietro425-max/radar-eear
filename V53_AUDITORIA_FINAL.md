# RADAR EEAR — Auditoria global V53

Data: 2026-09-28

## Resultado

Validação estrutural: **58/58 checks aprovados**.

Runtime smoke: **PASS**.
Assistente smoke: **PASS**.
Transpilação TS/TSX: **PASS** para `App.tsx`, `V25Pages.tsx`, `sync.ts` e `radar-assistant.ts`.

Build completo com Vite/tsc não foi executado neste ambiente porque a instalação local das dependências não ficou disponível; não tratar isso como prova de falha do código. A verificação de runtime da Vercel também não ficou disponível por resposta 403 da integração.

## Correções desta revisão global

### Integridade e persistência
- Removido o descarte silencioso de eventos em 5.000 itens.
- Sincronização autenticada passou a ser incremental, evitando reenviar todo o histórico a cada novo evento.
- Mantida paginação de eventos remotos.
- Logout limpa snapshot/queue locais.
- Importação de backup preserva a conta ativa.
- Reconciliação de posição de livros usa maior progresso; em empate, a posição mais recente.

### Questões e simulados
- 420 questões distribuídas em 28 módulos, 15 por módulo.
- Seleção por conteúdo continua exata e não cai para um pool misturado.
- Resultado de simulado agora fica isolado pelo `attemptId`.
- O modo “Oficial” não mascara questões autorais/similares como oficiais; quando não há acervo oficial incorporado, isso é informado ao usuário.
- Conquistas de simulado reconhecem o evento de conclusão usado atualmente.

### Navegação
- Bíblia: Voltar/Avançar do navegador não cria uma nova entrada ao processar `popstate`; a troca de capítulo via interface cria a entrada correta.
- Atlas: não substitui uma jornada específica por uma jornada aleatória quando o local não pertence a uma rota.
- Tópico de Inglês/Português inexistente não cai silenciosamente na primeira aula.
- Ciclo de estudo permite alterar a duração de cada bloco.
- Checklist de Hardware reconhece conclusão registrada anteriormente.

### Biblioteca e relações
- Busca de obras ligadas a pensadores considera também catálogo ampliado, evitando relações quebradas quando a obra está apenas no acervo expandido.
- Continuidade de leitura continua levando ao item em andamento.

### PWA / celular
- Service Worker atualizado para `radar-eear-v53-shell`.
- Ícones raster de instalação permanecem no manifest e no cache inicial.
- Modo Foco mantém áudio de sessão/Media Session/Wake Lock quando suportados pelo dispositivo.

## Conteúdo atual auditado

- 28 guias didáticos encontrados e resolvidos.
- 420 questões em 28 módulos.
- 75 curiosidades.
- 31 lugares do Atlas.
- 66 livros bíblicos / 1.189 capítulos.
- 25 registros de Apócrifos.
- 20 módulos de Hardware.
- 11 experiências/jogos cadastrados no runtime smoke.

## Observação editorial

As 75 curiosidades têm estrutura de fonte, imagem e conexão, mas a mediana do corpo textual permanece curta. Isso é uma pendência **editorial**, não estrutural, e deve ser ampliado pela pesquisa de conteúdo da Manus.

Não adicionar fatos não verificados só para aumentar comprimento.
