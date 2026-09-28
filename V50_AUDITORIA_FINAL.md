# RADAR EEAR — AUDITORIA GLOBAL V50

Data: 28 de setembro de 2026

## Resultado

A rodada V50 foi uma revisão global do produto existente, cobrindo lógica, dados, persistência, navegação, conteúdo, PWA, acessibilidade, assets e integrações internas.

### Validação automatizada

- 43/43 verificações V50 passaram.
- runtime smoke: PASS.
- assistant smoke: PASS.
- auditoria de conteúdo/assets: PASS.
- 420 questões.
- 28 módulos de questões.
- exatamente 15 questões por módulo.
- 28 guias didáticos presentes.
- 75 curiosidades presentes.
- todas as imagens dos 75 registros resolvem no pacote.
- nenhuma referência literal de asset apontada pelo auditor está ausente.

## Correções importantes encontradas na revisão V50

### 1. Próxima melhor ação

O motor de recomendação montava uma chave composta por matéria + contentId, mas salvava o candidato usando somente o tópico. Isso quebrava a própria lógica de isolamento criada nas versões anteriores.

Corrigido para armazenar e recuperar pela mesma chave composta.

Resultado: recomendações de estudo permanecem ligadas ao módulo real em vez de poderem colidir entre matérias/conteúdos.

### 2. Cronômetro por módulo

O estado do cronômetro agora inclui `contentId` quando a sessão pertence a um módulo específico.

Isso evita que uma sessão de um tópico seja reutilizada indevidamente em outro conteúdo com nome semelhante.

O Modo Foco também salva a rota exata, incluindo `contentId`.

O formato continua `HH:MM:SS`.

### 3. Notas do Modo Foco

As notas não ficam mais apenas em `focus:${topic}`.

Agora usam matéria + módulo/tópico, preservando compatibilidade com anotações antigas.

Resultado: duas matérias que tenham tópicos de mesmo nome não sobrescrevem as anotações umas das outras.

### 4. Biblioteca — retomada real

A posição do livro é preservada como o último ponto efetivamente lido, enquanto o progresso percentual continua monotônico.

Isso permite avançar e também voltar sem o estado de leitura “pular” novamente para uma posição mais antiga ou mais alta.

A hidratação remota também compara timestamps para impedir que um estado remoto antigo sobrescreva uma posição local mais nova.

### 5. Sincronização de histórico

A busca remota de eventos não fica mais restrita aos primeiros 5.000 registros.

Agora ela pagina os eventos e a hidratação local não corta silenciosamente os registros antigos.

### 6. Pesquisa universal

Resultados duplicados que apontavam para a mesma rota foram deduplicados antes de limitar a lista de resultados.

### 7. Questões relacionadas

Atalhos vindos de pensadores e de áreas editoriais agora usam o helper de rota exata, preservando matéria e `contentId` quando disponíveis.

### 8. PWA e experiência mobile

O shell do Service Worker foi versionado para V50 para reduzir risco de uma instalação antiga continuar exibindo a versão anterior.

Manifesto usa ícones PNG 192/512 e os atalhos também apontam para ícone raster.

O Modo Foco mantém Wake Lock/Media Session quando suportados e possui áudio silencioso em loop para favorecer a continuidade do cronômetro durante bloqueio da tela em dispositivos compatíveis.

### 9. Notificações

Notificações não são apresentadas como ligadas sem permissão do navegador.

A preferência também é persistida remotamente quando existe conta conectada.

### 10. Persistência pessoal

Logout limpa snapshot local e fila offline.

Importação de backup preserva a identidade da conta atual.

Revisões, destaques bíblicos e favoritos possuem estratégia de mesclagem para reduzir sobrescritas desnecessárias.

### 11. Bíblia

Capítulos possuem integração com histórico do navegador para Voltar/Avançar.

A experiência visual existente foi preservada.

### 12. Acessibilidade e tema

Foco de teclado e `focus-visible` estão mantidos.

O tema claro, existente como preferência do perfil, recebeu uma camada real de estilos de papel para não funcionar apenas como estado de configuração sem efeito visual.

### 13. Curiosidades

As 75 curiosidades possuem imagem, fontes e metadados estruturais.

O auditor encontrou uma limitação editorial real: a mediana do campo principal `body` continua em 22 palavras. Não foi inventado conteúdo factual novo durante esta revisão; o V50 fortalece a apresentação, as conexões e o salvamento, enquanto a expansão factual foi deixada para a pesquisa de conteúdo dedicada da Manus.

### 14. Conteúdo didático

Os 28 guias existentes resolvem no pacote. A mediana de extensão é aproximadamente 2.460 palavras, portanto a principal pendência editorial é expansão/revisão de profundidade específica, não ausência dos arquivos.

## Testes de conteúdo

- 28 módulos de guias.
- 28 módulos de questões.
- 15 questões em cada módulo.
- 420 questões V45.
- 75 curiosidades.
- 31 lugares do Atlas.
- 25 registros de Apócrifos.
- 66 livros bíblicos.
- 1.189 capítulos bíblicos.
- 11 jogos.

## Limitações honestas

O ambiente local continua sem uma instalação completa das dependências do projeto. O Node disponível é 22.x enquanto o `package.json` declara Node >=24 <25, e o `node_modules` local está incompleto.

Por isso não foi declarado sucesso de `npm run build` nem de `typecheck`.

A sintaxe dos principais arquivos modificados foi verificada com TypeScript 5.8.3 disponível globalmente e todos passaram a transpilação sintática.

Também não foi possível consultar os runtime errors da Vercel nem abrir a produção com a integração disponível nesta rodada; ela retornou 403/permite apenas projetos autorizados. Logo, nada aqui deve ser interpretado como confirmação de que a produção já está no V50.

## Próximo passo

O pacote V50 foi preparado para publicação.

A Manus deve publicar o diretório `site/` exatamente como recebido e não programar/corrigir o código nesta etapa.
