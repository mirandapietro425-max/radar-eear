# RADAR EEAR — V36.1 — Especificação consolidada

## Objetivo

Preservar a base visual e funcional que já foi aprovada e executar uma rodada de refinamento sem refazer o produto.

A prioridade é: conteúdo correto, apresentação clara, UX coesa, imagens relevantes, navegação funcional, arquitetura estável e integração do RADAR Assistente.

## Visual e UX

- Não transformar a aplicação em mural de cards.
- Manter identidade premium/editorial/científica/tecnológica.
- Melhorar hierarquia, densidade, espaçamento, largura de leitura e ritmo.
- Usar imagens com função semântica.
- Curiosidades recebem imagem contextual quando possível e ligação ao Atlas.
- Hoje não repete a mesma fotografia sem necessidade.
- Livros usam a capa da própria obra/edição em proporção correta.
- Pensadores preservam retratos que já foram aprovados.
- Atlas Google Maps permanece como referência e não deve ser degradado.
- Mobile e desktop devem ter experiência própria, sem clipping ou overflow.

## Conteúdo e fontes

- Restaurar o conteúdo original do RADAR.
- Aprofundar Matemática, Física, Português e Inglês.
- Manter Ciência, Pré-história, Paleontologia, Computação/Hardware, Astronomia/Espaço, História das línguas, Bíblia, Apócrifos, Cultura e Pensadores integrados ao universo original.
- Expandir fortemente o banco de questões, mirando 2.000–3.000 itens, sem fabricar volume vazio.
- Diferenciar oficial, curada, similar e autoral.
- Não copiar questões protegidas.
- Pesquisar livros e PDFs legalmente disponíveis; quando for permitido, priorizar leitura interna.
- Não tratar livraria/catálogo como substituto de leitura integral.
- Priorizar Português e Inglês quando houver versões adequadas; não apresentar alemão como opção principal quando não houver versão estudável em português/inglês.
- Registrar fonte, licença, crédito e status de acesso.

## Funcionalidades preservadas

- Biblioteca + leitor.
- Bíblia + navegação de capítulos + notas/favoritos/progresso.
- Apócrifos, com abertura de cada obra sem botão morto.
- Atlas Google Maps.
- Pensadores e obras.
- Praticar e simulados.
- Jogos.
- Estudar e microexperiências.
- Continuidade global.
- Revisão e progresso reais.

## RADAR Assistente

### Papel

Assistente de navegação do produto, não substituto do conteúdo e não chatbot decorativo.

### Funções

- entender linguagem natural;
- navegar para telas e entidades reais;
- encontrar livros, pessoas, lugares, questões, curiosidades e conceitos;
- abrir a página certa;
- levar uma curiosidade ao ponto correto do Atlas;
- sugerir a próxima ação;
- explicar rapidamente o que existe na página;
- receber contexto da rota atual;
- preservar histórico curto de conversa;
- oferecer voz de entrada/saída quando o navegador suportar.

### Segurança

- chave da API somente no servidor;
- nenhuma rota externa recebida pela IA é executada diretamente;
- ações precisam ser internas e validadas;
- entidades específicas devem vir de correspondências locais/contexto quando possível;
- fallback local mantém a navegação funcionando mesmo sem IA online.

### Voz

A saída de voz usa `SpeechSynthesis` do dispositivo. Isso evita adicionar uma dependência paga de TTS apenas para falar a resposta.

A entrada de voz usa `SpeechRecognition`/`webkitSpeechRecognition` quando disponível.

## Qualidade de engenharia

- arquitetura modular;
- dados separados da apresentação quando apropriado;
- componentes reutilizáveis;
- evitar duplicação;
- preservar code splitting/lazy loading;
- testar após blocos importantes;
- nenhum botão deve existir apenas como decoração;
- estados loading/erro/vazio/offline devem ser utilizáveis;
- não declarar concluído apenas porque o projeto compila.

## Entrega

Antes de considerar a rodada final:

1. typecheck;
2. build;
3. testes existentes;
4. smoke do Assistente;
5. teste funcional das rotas afetadas;
6. teste mobile/desktop;
7. auditoria visual de imagens/capas;
8. auditoria dos Apócrifos;
9. teste da navegação contextual do Assistente;
10. teste de produção quando houver credenciais/ambiente de deploy.
