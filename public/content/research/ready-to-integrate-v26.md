# Blocos prontos para integrar — Atlas V26

## Dados

1. Carregar `content/editorial/atlas-country-research-v26.json`.
2. Para cada ponto, exibir `country`, `fact`, `why`, duas curiosidades, três links de estudo, fontes e `checked_at`.
3. Para cada rota, exibir pergunta de abertura, sequência, paradas, atividade final e fontes derivadas dos pontos.
4. Para cada curiosidade, usar título, corpo, ligação pedagógica, entidade, fonte, confiança e alt da imagem.

## Padrão visual recomendado

- O card do ponto deve mostrar país e período antes da frase factual.
- A seção “Por que este lugar?” deve ficar separada de “O que a fonte confirma?”.
- A seção “Continue estudando” deve listar módulos, livro/pessoa/conceito relacionados e uma questão.
- O mapa precisa ter descrição textual equivalente: país, ponto, período, tema e rota.
- Imagens sem licença confirmada devem aparecer como placeholder editorial ou ser substituídas por diagrama próprio.

## Rotas incorporadas

As 12 rotas estão no JSON com IDs estáveis. Não exibir uma conexão como fato histórico apenas porque dois lugares aparecem na mesma rota: a rota é uma organização pedagógica, salvo quando a fonte do relatório documenta a relação.
