# Radar EEAR — V24 final local implementation status

## Implementado no pacote

- substituição da aplicação `artifacts/radar-eear` via script de aplicação com backup automático
- scripts de validação/teste e suíte E2E preparada com Playwright
- onboarding sem usuário demo e modo local explicitamente identificado
- suporte opcional a Supabase Auth com recuperação de senha
- progresso derivado de eventos; sem métricas pré-preenchidas
- sessões, retomada universal e modo foco sem iniciar cronômetro automaticamente
- questões com confiança e classificação do erro antes do registro
- revisão adaptativa e recomendação determinística/auditável
- simulados com salvamento de posição
- Biblioteca com 30 obras catalogadas; 11 com leitura integrada quando edição pública está acessível; demais como ficha editorial/metadados + fonte legítima
- Bíblia com 66 livros e 1.189 capítulos, navegação, progresso, notas, destaques, favoritos e contexto por rota quando conteúdo específico está cadastrado
- Atlas editorial com 31 pontos funcionais, filtros, zoom, seleção, busca e fallback sem Google
- Google Maps 3D como progressive enhancement, com marcadores interativos e carregamento sob demanda quando a chave existe
- 11 jogos jogáveis com replay/recorde
- 24 perfis de pensadores com páginas próprias
- 20 módulos de hardware
- 214 microconceitos de Matemática e 240 de Física
- 98 questões no banco local
- catálogo de 64 referências de provas anteriores com origem institucional; parte do arquivo permanece como referência externa até a incorporação legal do PDF/gabarito
- busca universal, Knowledge Graph, apócrifos, conteúdo diário e páginas de ciência/pré-história/cultura
- 276 assets locais, fallback de imagem e metadata de origem/licença
- PWA, metadata pt-BR, rewrite SPA e rotas profundas
- merge de progresso remoto + local sem descarte silencioso de eventos locais
- restauração remota de progresso/posição de livros
- fila offline para eventos, sessões, revisões, jogos, simulados, notas e progresso

## Validação executada nesta rodada

- `node --experimental-strip-types scripts/runtime-smoke.mjs`: PASS
- `node scripts/validate-v24.mjs`: PASS — 37/37 checks
- `tsc -p .tscheck/tsconfig.json --pretty false`: PASS
- teste do `tools/apply-radar-v24.mjs` em monorepo de ensaio: PASS
- assets encontrados: 276
- referências estáticas de assets quebradas: 0

## Não executado neste ambiente

- `pnpm install --frozen-lockfile` no monorepo real
- typecheck real do monorepo com todas as dependências instaladas
- build real do Vite com o grafo de dependências do repositório oficial
- Playwright/E2E contra uma aplicação construída com dependências reais
- login real no projeto Supabase do usuário
- Google Maps 3D com uma chave real e domínio autorizado
- commit/push para GitHub
- deploy real na Vercel

## Situação do repositório público

A página pública do GitHub ainda mostra o `main` antigo e o README original descreve dados locais/demonstrativos. A V24 permanece como pacote local/integrável até que seja aplicada nesse repositório. Isso é deliberado: não declarar integração, commit ou deploy que não foram efetivamente executados.
