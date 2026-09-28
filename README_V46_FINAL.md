# RADAR EEAR V46 — Mobile-first / Study Core / V45 integrated

Esta versão integra os materiais finais V45 no código do Radar e fecha uma rodada de engenharia focada em uso diário, especialmente no celular.

## Integrado

- 28 guias de conteúdo V45 (7 por matéria: Português, Inglês, Matemática e Física).
- 420 questões V45, 15 por conteúdo, integradas ao banco geral e filtráveis por `contentId`.
- Catálogo de Biblioteca V45 com os registros e dados de direitos recebidos.
- Assets V45: 4 imagens de matéria, 28 imagens de conteúdo, 7 diagramas, 75 curiosidades, 31 Atlas, 31 pensadores e 6 capas verificadas.
- Busca universal incluindo conteúdos e livros V45.
- Assistente contextual com reconhecimento de voz do navegador; síntese de voz/TTS foi removida por ser inadequada para a experiência desejada.
- Slot de God Eyes permanece oculto quando não existe URL oficial/configurada; não há placeholder que finja integração.
- Apócrifos: rota direta `/apocrifos/:id` e abertura via `?work=` para desktop/mobile.
- Bíblia, História e `Brasil antigo` mantêm rotas de detalhe conectadas a conteúdo local.
- Cronômetro em `HH:MM:SS`, com persistência/retomada, heartbeat e Media Session quando suportado pelo navegador/dispositivo.
- Dados locais persistidos em localStorage + IndexedDB; com conta configurada, eventos e sessões podem sincronizar com Supabase.
- Backup manual de perfil/estado em JSON.
- Notificações web via permissão do navegador, respeitando os limites do modelo de notificações local.
- Botões de voltar/avançar do histórico do navegador visíveis também em mobile.
- PWA/standalone e viewport com `viewport-fit=cover`.
- Ajustes mobile e touch targets preservando o desktop.

## Validação

- `validate-v46-final.mjs`: 33/33 checks.
- runtime smoke: OK.
- `api/assistant.js`: sintaxe OK.
- validator: sintaxe OK.

## Limitações conhecidas

O build completo não foi executado neste ambiente porque o projeto exige Node `>=24 <25`, enquanto o runtime disponível na máquina é Node 22.16.0, e as ferramentas locais `vite`/`tsc` não estão instaladas nesta cópia. Portanto, o pacote não deve ser considerado como tendo um build de produção verificado aqui.

O Media Session, controles na tela bloqueada e reprodução em segundo plano dependem do navegador, do sistema operacional e do modo de instalação do PWA; o cronômetro usa timestamps persistidos para manter a contagem correta quando a aba é suspensa.

Notificações locais dependem da permissão do navegador e não substituem um backend Push/VAPID para agendamento garantido em segundo plano.

A integração de IA online do endpoint `/api/assistant` exige `OPENAI_API_KEY` configurada no ambiente de deploy. Sem a chave, o assistente continua com o fluxo local/voz/navegação, mas não há modelo online.
