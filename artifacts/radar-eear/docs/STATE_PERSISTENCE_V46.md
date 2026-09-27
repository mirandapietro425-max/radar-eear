# Estado, continuidade e persistência — V46

## O que nunca deve ser perdido no aparelho

O estado de estudo é mantido no armazenamento do navegador e também em um snapshot IndexedDB. O app registra eventos como início/fim de sessão, questões respondidas, revisão, progresso de leitura, capítulos da Bíblia, jogos e simulações.

## Cronômetro

O cronômetro não depende de um contador que precise executar a cada segundo para preservar a duração. Enquanto uma sessão está em andamento, ela guarda `startedAt` e `accumulatedSeconds`; ao voltar para o app, a duração é reconstruída a partir do horário atual. Isso permite recuperar corretamente o tempo transcorrido depois de uma troca de aba ou retorno do celular.

## Nuvem

A camada Supabase é opcional. Com configuração válida, os eventos pessoais são enviados para tabelas remotas e, em caso de falha/offline, ficam em fila IndexedDB para sincronização posterior. Sem configuração, o app informa que está em modo local e usa a persistência do dispositivo.

## Backup

O perfil disponibiliza exportação/importação de um arquivo JSON contendo o estado pessoal. O mecanismo de importação valida a estrutura mínima antes de restaurar.
