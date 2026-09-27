# RADAR Assistente — configuração final

O RADAR Assistente está integrado ao aplicativo. A interface, navegação contextual, voz e chamadas para o endpoint estão no código; a única credencial que não pode ser embutida no repositório é a chave do provedor de IA.

## Ambiente do servidor

Configure no ambiente da Vercel/servidor:

- `OPENAI_API_KEY` — chave privada, somente no servidor.
- `OPENAI_MODEL` — modelo escolhido por você. Se omitido, o projeto usa `gpt-4o-mini` como valor padrão compatível com o código atual.
- `OPENAI_BASE_URL` — opcional; permite apontar para um endpoint compatível com o formato de Chat Completions.

Nunca coloque `OPENAI_API_KEY` em `VITE_*` ou em código entregue ao navegador.

## O que já está integrado

- botão flutuante em todas as páginas;
- contexto da página atual;
- navegação para matérias, Biblioteca, livros, Bíblia, Apócrifos, Atlas, Curiosidades, Pensadores, Praticar, Jogos, Revisões, Simulados, Cronômetro e Perfil;
- busca contextual por títulos, pessoas, lugares, módulos, questões e curiosidades;
- comandos específicos como "leva essa curiosidade para o Atlas";
- links de Tutor a partir de questões/curiosidades;
- voz de entrada quando o navegador oferece `SpeechRecognition`;
- voz de saída com `SpeechSynthesis` do próprio dispositivo;
- status de `IA online` consultando `GET /api/assistant`;
- endpoint `POST /api/assistant` pronto para produção;
- validação server-side de rotas internas;
- fallback local de navegação quando a IA estiver indisponível;
- histórico curto de conversa;
- hints locais enviados ao provedor para reduzir alucinação de rotas/entidades.

## Como a IA funciona

A IA não controla o site diretamente. Ela devolve uma intenção limitada a ações seguras. O navegador só executa ações internas validadas.

Exemplo:

usuário → "onde estudo lançamento oblíquo?"
→ correspondência local do conceito
→ `/estudar/fisica?topic=...`
→ a página correta abre.

Quando a resposta exigir texto livre, o endpoint envia ao provedor:

- pergunta;
- contexto da rota atual;
- entidade atual;
- correspondências locais relevantes;
- histórico curto.

## Voz

Não é necessário um serviço separado de tradução/TTS para fazer o Assistente falar. Quando o navegador possui uma voz adequada, `SpeechSynthesis` usa a voz local do dispositivo.

Isso mantém a funcionalidade barata e funciona como camada de apresentação para as respostas da IA.
