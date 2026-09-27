# RADAR EEAR V43 — ORDEM DE POSTAGEM / DEPLOY

Use **exatamente este pacote V43** como base. Não volte para V37/V41/V42 nem refaça a camada visual a partir de versões antigas.

## O que já está integrado nesta V43

- **Voz de entrada do Assistente:** botão de microfone usa `SpeechRecognition`/`webkitSpeechRecognition`; a fala vira texto e é enviada ao Assistente no componente flutuante. No modo página, o microfone preenche o campo para execução.
- **Áudio de saída removido:** não existe mais `speechSynthesis`, botão “Ouvir”, auto-voz nem seletor de voz. O Assistente responde em texto.
- **Aba dedicada do Assistente removida da navegação lateral:** o Assistente continua disponível pelo botão flutuante e pela rota `/tutor` para contexto profundo.
- **Curiosidades V41 realmente conectadas:** o `App.tsx` usa `src/data/curiosities-v26.json`, que aponta para as **75 imagens locais individuais** em `public/assets/curiosities/`.
- **Atlas conectado às fotos V41:** 15 `placeId`s usam as fotografias documentais locais em `public/assets/atlas/photos/`; o Google Maps continua sendo o mapa principal.
- **Imagens de Português / Inglês / Matemática / Física renovadas:** os quatro SVGs de matéria foram substituídos por artes específicas e visualmente distintas.
- **Banco de questões:** entrou `src/data/question-bank-v43.ts` com **70 questões novas autorais/similares**, sempre com 4 alternativas, resposta, explicação e dificuldade. O banco total desta versão é **500 questões únicas**.
- **Biblioteca:** além dos 11 textos locais já existentes, foram preparados leitores para `Iracema`, `O Guarani`, `Ensaios`, `Utopia` e `A República` com fontes públicas remotas específicas. Para obras sem texto integral incorporado, a ficha agora apresenta caminhos de pesquisa em **Wikisource, Project Gutenberg e Internet Archive**, em vez de um único CTA genérico de “edição digital”.
- **Apócrifos:** removido o `preventDefault` que podia impedir a troca de rota; os cards usam navegação Wouter direta para `/apocrifos?work=<id>`.
- **Atlas:** removido o `min-height: 610px` que criava o grande bloco preto vazio; os botões “Abrir jornada” têm estilo explícito e não herdam aparência branca/default.
- **Curiosidades:** layout refeito para dar protagonismo à imagem real, remover a aparência triangular/estranha e melhorar hierarquia, leitura e CTA.

## Validação já executada

- Banco total: **500 questões / 500 IDs únicos**.
- Novas questões V43: **70/70 válidas**.
- Curiosidades: **75/75** apontam para imagens locais.
- Fotos documentais do Atlas: **15/15** arquivos presentes.
- Assistente: microfone presente e nenhuma chamada a `speechSynthesis`/`speakText`.
- Apócrifos: navegação direta sem `preventDefault`.
- Validador legado V26.6 atualizado: **23/23**.
- Validador de assets V43: **23/23**.

## Agora faça o deploy

1. Coloque este conteúdo no repositório/projeto RADAR EEAR que alimenta a Vercel.
2. Não descarte `public/assets/atlas`, `public/assets/curiosities`, `public/assets/library/covers`, `public/content/books/fulltext` nem `src/data/question-bank-v43.ts`.
3. Use **Node 24** conforme o `package.json` (`>=24 <25`).
4. Rode:
   - `npm ci`
   - `npm run typecheck`
   - `npm run build`
   - `npm run test:runtime`
   - `npm run test:assistant`
   - `npm run test:e2e` (quando o ambiente Playwright estiver disponível)
5. Corrija erros de compilação que ainda existirem em `Profile/Auth` e `RadarAssistant`; não faça deploy silencioso com erro de build.
6. Faça commit/push da V43.
7. Publique na Vercel e gere a URL final de produção.
8. Teste manualmente no ambiente publicado estas rotas: `/`, `/estudar/portugues`, `/estudar/ingles`, `/estudar/matematica`, `/estudar/fisica`, `/questoes`, `/biblioteca`, um livro integrado, `/curiosidades`, `/atlas`, `/apocrifos`, `/tutor`.
9. No Assistente, teste microfone → transcrição → execução → navegação. O site não deve falar a resposta em voz alta.
10. No final, entregue somente um relatório curto com: commit, URL de produção, resultado de build/typecheck, resultado dos testes e qualquer bloqueio restante.

## Variável de IA

O Assistente funciona com navegação inteligente local sem chave. A camada de IA externa só fica “IA online” quando `OPENAI_API_KEY` estiver configurada no ambiente da Vercel. Não invente chave nem marque como online sem configuração real.
