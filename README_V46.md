# RADAR EEAR V46

Integração de engenharia sobre o pacote final V45 de conteúdo e assets.

## O que entra nesta build

- 28 conteúdos didáticos V45 (7 Português, 7 Inglês, 7 Matemática, 7 Física)
- 420 questões V45, 15 por conteúdo, filtráveis por conteúdo
- 85 registros catalográficos da Biblioteca V45, com direitos preservados
- 75 imagens individuais de Curiosidades
- 31 fotografias/ambientes de Atlas
- 31 retratos de Pensadores
- 6 capas de livros verificadas pela entrega V45
- 7 diagramas pedagógicos
- Atlas Google Maps preservado como camada principal
- Apócrifos com rota parametrizada para abertura individual
- Bíblia com navegação temática e de livros
- História/Brasil antigo com rotas internas corrigidas
- cronômetro HH:MM:SS, checkpoint temporal e retomada
- persistência local via IndexedDB + localStorage; sincronização remota quando Supabase estiver configurado
- backup manual de perfil/estado
- notificações locais e ações de pausa da sessão quando o navegador/SO suportarem
- navegação Voltar/Avançar também no mobile
- Biblioteca adicionada à navegação inferior do celular
- retratos V45 preferidos para evitar enquadramentos antigos cortados
- imagens V45 específicas usadas nas 4 matérias e em cada guia

## Validação disponível

`npm run validate` → 23/23 no validador legado V26.6.

`V46_REALITY_VALIDATION.json` registra as verificações estruturais da integração V45.

O ambiente de empacotamento atual não possui Node 24 + dependências completas para executar um build final do Vite; por isso, não declarar build/typecheck final como aprovado sem rodar isso no ambiente de publicação.
