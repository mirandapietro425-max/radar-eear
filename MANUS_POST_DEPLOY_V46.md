# MANUS — publicação da V46

Use **somente o ZIP RADAR_EEAR_V46** entregue pelo GPT como base de publicação.

1. Substituir a versão publicada pelo conteúdo integral da V46.
2. Rodar com Node 24 conforme `package.json`.
3. Instalar dependências limpas.
4. Executar `npm run validate`.
5. Executar `npm run typecheck` e `npm run build`.
6. Corrigir apenas erros de integração/ambiente encontrados durante a publicação; não remover funcionalidades para mascarar erro.
7. Fazer commit e push no repositório do Radar EEAR.
8. Publicar na Vercel/projeto conectado.
9. Confirmar a URL pública e informar o commit publicado.

Fluxos mínimos para smoke test após publicação:

- `/`
- `/estudar/matematica`
- `/estudar/matematica?content=mat-algebra`
- `/questoes?content=mat-algebra`
- `/biblioteca`
- `/biblioteca/guerra-e-paz`
- `/biblia`
- `/biblia/genesis`
- `/apocrifos`
- `/apocrifos/1-enoque`
- `/historia`
- `/historia/brasil-antigo`
- `/atlas`
- `/pensadores`
- `/cronometro`

Não criar outra arquitetura e não substituir os assets V45 por placeholders.
