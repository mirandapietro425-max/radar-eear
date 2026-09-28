# RADAR EEAR — V42 integrada / ordem de postagem

## STATUS

A integração dos assets da rodada V41 foi feita **no código do RADAR**, não apenas no pacote de documentação.

O pacote V42 abaixo já contém:

- 6 capas/folhas de rosto reais em domínio público ligadas por `entityId` ao pipeline da Biblioteca:
  - `machado-dom-casmurro`
  - `machado-memorias`
  - `iracema`
  - `o-guarani`
  - `camões-lusiadas`
  - `newton-principia`
- 75 curiosidades com imagem individual em `public/assets/curiosities/`.
- 15 fotografias documentais do Atlas ligadas aos `placeId` corretos.
- Google Maps preservado como Atlas principal.
- Navegação dos Apócrifos por `?work=` preservada.
- Manifestos e créditos dos assets preservados.
- Screenshots reais desktop/mobile da rodada V41 preservados dentro do pacote.

## VALIDAÇÃO FEITA NESTA RODADA

`node scripts/validate-v42-assets.mjs`

**23/23 checks passaram.**

Também passaram:

`node scripts/validate-v26.6.mjs` → **23/23**

`node scripts/assistant-smoke.mjs` → **PASS**

A validação específica está em `V42_ASSET_INTEGRATION_VALIDATION.json`.

## O QUE AINDA PRECISA SER FEITO NO AMBIENTE DE DEPLOY

O ambiente desta montagem está com Node 22 e sem os binários de dependências instalados (`tsc`/`vite`), enquanto o projeto declara Node `>=24 <25`. Portanto, **não marcar build/typecheck como validados aqui**.

No ambiente do repositório/Vercel, executar:

```bash
npm ci
npm run typecheck
npm run build
npm run test:runtime
npm run test:assistant
```

Depois validar as rotas:

```text
/
/dia
/biblioteca
/biblioteca/machado-dom-casmurro
/curiosidades
/pensadores
/atlas
/biblia/genesis/1
/apocrifos
/estudar
/assistente
```

## POSTAGEM

1. Usar **este V42** como base de produção.
2. Fazer commit/push para a branch que alimenta a Vercel.
3. Fazer deploy de produção na Vercel.
4. Conferir as imagens localmente pelo prefixo `/assets/`.
5. Confirmar que os 6 livros, as 75 curiosidades e os 15 lugares não dependem de busca externa para a imagem principal.
6. Confirmar que o Google Maps continua abrindo normalmente no Atlas.
7. Entregar apenas um relatório final com: commit, URL de produção, resultado do build/typecheck e qualquer erro restante.

## NÃO ALTERAR

- Não trocar o Google Maps pelo globo customizado.
- Não substituir as capas reais por capas comerciais sem licença.
- Não trocar as 75 imagens individuais por uma imagem/fallback único.
- Não gerar outro pacote de planejamento no lugar do deploy.
- Não remover os assets ou a integração já feita nesta V42.
