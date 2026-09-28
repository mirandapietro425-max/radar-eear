# RADAR EEAR V36 — Assistente integrado + voz + navegação contextual

Base usada: snapshot local `RADAR_EEAR_V28_RELACOES_RESTAURADO_2026-09-27.zip`.

## Implementado

- Assistente flutuante em todas as telas.
- Rota `/tutor` reutilizando a mesma camada do Assistente.
- Contexto automático da página atual.
- Navegação determinística para comandos comuns, sem depender de IA externa.
- Busca por livros, pessoas, lugares, questões, descobertas e módulos.
- Integração contextual com Atlas: quando a descoberta atual possui um lugar relacionado, `"Leva isso para o Atlas"` abre o ponto correspondente.
- Integração com Biblioteca, Bíblia, Apócrifos, Pensadores, Praticar, matérias, Jogos, Revisões, Simulados, Cronômetro e Perfil.
- Entrada por voz quando o navegador oferece `SpeechRecognition`.
- Saída por voz usando `SpeechSynthesis` do dispositivo.
- Botão `Ouvir` nas respostas e modo de fala automática.
- API server-side em `/api/assistant` usando uma API compatível com o formato de Chat Completions.
- A chave da API fica somente no servidor via `OPENAI_API_KEY`.
- Modelo/base URL configuráveis por `OPENAI_MODEL` e `OPENAI_BASE_URL`.
- Validação de ações para aceitar somente navegação interna.
- Smoke test sem dependências externas.

## Importante

Sem chave da API configurada, o Assistente ainda funciona para comandos locais de navegação e voz. Respostas livres dependem da configuração do servidor.

A síntese de voz não depende de um serviço pago: usa a voz disponível no próprio navegador/dispositivo. Não foi introduzido um tradutor externo só para gerar áudio; isso seria desnecessário para a fala em português. Quando houver necessidade de traduzir texto, a camada de IA pode tratar o idioma sob demanda.

## Verificação feita

- `node --check api/assistant.js` — PASS
- `scripts/assistant-smoke.mjs` — PASS
- parsing/transpilação sintática de `App.tsx`, `RadarAssistant.tsx` e `radar-assistant.ts` — PASS

Não foi possível executar `npm run build` nesta sessão porque as dependências do projeto não estão instaladas localmente e a instalação de pacotes excedeu o tempo disponível.
