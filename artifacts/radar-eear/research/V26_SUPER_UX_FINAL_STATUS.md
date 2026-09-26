# RADAR EEAR V26 — SUPER UX / CONTEÚDO EDITORIAL INTEGRADO
Data: 26/09/2026

## Integração desta entrega
- Pesquisa editorial: 15 países/contextos
- Atlas: 31 pontos
- Jornadas: 12 percursos
- Curiosidades: 75 itens, todos com pelo menos uma fonte registrada
- Registro de mídia: 69 solicitações/itens editoriais
- Conteúdo local: 1414 arquivos sob content/
- Assets de interface: 303 arquivos sob public/assets/

## UX
- Atlas redesenhado como experiência editorial escura, com globo interativo, camadas, filtros, jornadas, contexto pesquisado, fontes e acervos.
- Google Maps / Google Earth tratados como progressive enhancement; o Atlas interno funciona sem chave externa.
- God Eyes permanece como integração opcional configurável por VITE_GOD_EYES_EMBED_URL / VITE_GOD_EYES_URL.
- Nova rota /curiosidades com busca, filtro por lugar, fonte por item e retorno direto ao Atlas.
- Biblioteca mantém abas de Contexto / Curiosidades / Relações / Fontes.

## Conteúdo
- As 12 jornadas do pacote novo passaram a aparecer como navegação e cards do Atlas.
- A pesquisa de cada ponto do Atlas aparece no detalhe, com resumo do país, curiosidades, estudos relacionados, fontes e sugestões de imagem/acervo.
- O pacote da Manu foi preservado em MANU_RESEARCH_MEDIA_BRIEF_V26.md.
- Material editorial de países/Atlas e o media registry foram preservados em dados locais e também publicados em public/content/editorial/.

## QA executado
- .tscheck/tsconfig.json: PASS
- npm run test:runtime: PASS
- V25 validator: 54/54
- V24 validator: 37/37
- V24 asset check: 303 assets / 0 missing
- V26 data: 31 pontos / 0 IDs duplicados; 12 jornadas / 0 lugares ausentes; 75 curiosidades / 75 IDs únicos / 0 sem fonte

## Limitação do ambiente
`npm run build` não pôde concluir porque o pacote não possui node_modules neste ambiente. O TypeScript foi validado pelo tsconfig de checagem sem dependências de React e o conjunto de smoke/validators passou.
Node disponível no ambiente: 22.16.0; package.json declara Node >=24 <25.

## Não testado aqui
- execução visual real em navegador/Playwright;
- Google Maps 3D com chave real;
- embed de God Eyes com URL real/permitida;
- deploy/CI;
- autenticação externa/cloud.


## Auditoria adicional da entrega final
- Integridade do ZIP recebido: PASS
- Assets públicos após recomposição: 303 arquivos
- Referências literais de assets em `src/`: 141 verificadas / 0 ausentes
- Assets editoriais restaurados em `public/assets/editorial-expansion/`: 27
- Nomes de capas com mojibake corrigidos: `camões-lusiadas.svg` e `eça-primo-basilio.svg`
- Capas editoriais originais restauradas para as 8 obras expandidas de domínio público, mantendo o status editorial já registrado.
