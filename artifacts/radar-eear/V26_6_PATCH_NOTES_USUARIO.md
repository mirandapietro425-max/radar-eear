# RADAR EEAR V26.6 — PATCH DA AUDITORIA DO USUÁRIO

## Correções incorporadas no código

- SmartBookCover prioriza arquivo local de capa real (`realCover` ou raster) e procura capas em Open Library/Google Books.
- SmartPortrait prioriza retrato raster local e procura fallback em Wikipedia.
- resolução de lugares ganhou aliases para conectar livros ao Atlas.
- acesso legítimo de livros agora usa URL explícita ou Open Library como fallback.
- `Descoberta do dia` passou a usar navegação normal, sem interceptação manual de clique.
- Apócrifos passaram a sincronizar a seleção via navegação Wouter.
- Matemática/Física com `?topic=` direcionam para o microconceito correspondente.
- Microexperiências passaram a ter perfis específicos para números complexos, geometria plana, produtos notáveis, simetria, PA, funções, cálculo, trabalho/energia, óptica, ondas, eletricidade, cinemática e gravitação.
- mapa de questões do simulado virou seção recolhível.
- regras CSS finais eliminam fundos brancos residuais nos componentes interativos.
- Bíblia ganhou leitura escura para impedir a sobreposição branca.
- Atlas/Google Maps recebeu restrições explícitas de largura e overflow.
- cards de pensadores foram compactados.
- títulos e metadados ganharam wrapping seguro no mobile.
- Home busca imagem relacionada à recomendação quando há material editorial compatível.

## Conteúdo que continua precisando de acervo externo

As imagens reais de cada capa/retrato devem ser adicionadas via pesquisa/curadoria da Manus, preferindo fontes abertas, institucionais e com crédito adequado. O código já possui caminhos locais determinísticos para receber esses arquivos.

## Limitação de execução neste ambiente

A instalação das dependências npm não concluiu dentro do ambiente disponível; portanto o build Vite completo não pôde ser reexecutado aqui. O código foi auditado estruturalmente e o diff foi mantido restrito aos pontos da auditoria.

## Correção adicional — rodada do usuário 2026-09-26

- Incluídos os textos integrais locais já preparados em `public/content/books/fulltext/` para 11 obras públicas/open-text identificadas no pacote, permitindo que o leitor do Radar carregue o conteúdo local em vez de depender de uma URL externa.
- `BOOK_META` atualizado para priorizar esses arquivos locais; o link de fonte legítima continua apontando para a edição externa correspondente.
- O leitor não usa uma capa sintética como se fosse edição real: a UI procura primeiro uma capa raster local e depois acervos externos configurados.
- Cache de capas/retratos agora é secundário aos assets locais novos, evitando que um resultado antigo em `localStorage` impeça uma imagem recém-instalada de aparecer.
- Integração de Atlas continua com Google Maps como experiência principal e limites responsivos.
- QA V26.6: runtime smoke PASS; validator PASS 23/23.
- Build Vite completo não foi executado neste ambiente porque a instalação de dependências não concluiu; o teste sintático dos arquivos JS/TS de validação passou.
