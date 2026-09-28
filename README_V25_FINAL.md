# Radar EEAR — V25 final local package

Este pacote é a reconstrução V25 do aplicativo `artifacts/radar-eear`, partindo do V24 local e adicionando a camada editorial, de experiências, mídia e navegação exigida pelo Master Prompt V25.

## Autoridade

O repositório GitHub público continua sendo a autoridade para integração. A página pública auditada em 26/09/2026 ainda mostrava o `main` antigo, com 3 commits e README que descrevia os dados da primeira versão como locais/demonstrativos. O pacote V25 não finge que houve push.

## Incluído

- código da aplicação atualizado;
- 276 assets locais catalogados;
- EntityMedia com lazy loading, fallback, alt, fonte e licença;
- trilhas, linha do tempo, diário, salvos, comparação e mapa de domínio;
- Atlas editorial + Google Maps 3D progressivo;
- Biblioteca com 30 obras, 11 com leitura integrada por edição pública identificada;
- Bíblia com 66 livros e 1.189 capítulos;
- 24 pensadores, 31 lugares, 25 apócrifos, 20 módulos de hardware;
- 214 microconceitos de Matemática e 240 de Física;
- 98 questões e 11 jogos;
- persistência, eventos, revisão, recomendação e retomada;
- E2E preparado em Playwright;
- ferramentas de aplicação ao monorepo;
- documentação e matriz de aceite.

## Validação local executada

- runtime smoke: PASS;
- validação V24: PASS;
- validação V25: deve ser executada como `node scripts/validate-v25.mjs`;
- typecheck estrutural com TypeScript e stubs locais: PASS.

## Limitações externas

- build Vite real não foi executado porque o ambiente não possui as dependências npm instaladas e `npm install --offline` falhou por ausência dos pacotes no cache;
- Playwright/E2E real não foi executado pelo mesmo motivo;
- login cloud e sincronização Supabase dependem das variáveis do projeto;
- Google Maps 3D depende de `VITE_GOOGLE_MAPS_API_KEY` válida e autorização de domínio;
- Tutor depende da Edge Function e das variáveis do provedor;
- commit/push para GitHub e deploy Vercel não foram executados.
