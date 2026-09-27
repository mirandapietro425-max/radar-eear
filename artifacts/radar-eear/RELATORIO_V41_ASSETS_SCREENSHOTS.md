# Relatório curto — entrega de assets e screenshots V41

## Concluído

- **Capas:** 6 capas/folhas de rosto reais de obras em domínio público foram baixadas do Wikimedia Commons, conferidas por título/obra e registradas com origem e licença: *Dom Casmurro*, *Memórias Póstumas de Brás Cubas*, *Iracema*, *O Guarani*, *Os Lusíadas* e *Principia*.
- **Curiosidades:** as **75 curiosidades** receberam arquivo individual em `public/assets/curiosities/`, relacionado ao assunto por uma ilustração autoral específica; o JSON passou a apontar para cada arquivo, sem repetir o fallback genérico.
- **Atlas:** **15 fotografias documentais** foram associadas aos `placeId` corretos e registradas no manifesto: Atenas, Alexandria, Roma, Pisa, Cambridge, Rio, Brasília, Viena, Istambul, Lisboa, Dublin, Berlim, Genebra, Praga e Coimbra. O Google Maps não foi alterado.
- **Screenshots reais:** foram executadas as rotas reais do site em servidor Vite e capturadas em **Desktop Chrome** e **Pixel 7**: Home/Hoje, Biblioteca, livro, Curiosidades, Explorar, Estudar, Pensadores, Atlas, Bíblia, Apócrifos e Assistente.
- **Manifestos:** `public/assets/library/covers/manifest.json`, `public/assets/atlas/photos/manifest.json` e `public/assets/asset-manifest-v41.json` registram paths, origem e licenças.
- **Validação:** as 12 rotas carregaram sem `pageerror`; o Atlas, que estava vazio por um erro runtime de `selected` antes da declaração, foi corrigido de forma mínima para permitir a captura real.

## Não concluído / limites

- Não foram redistribuídas capas comerciais modernas sem licença. Para obras protegidas, o site continua usando metadados/fallback até que exista uma imagem legalmente reutilizável.
- Nem todos os 48 lugares do Atlas têm fotografia local: foram entregues apenas os 15 lugares importantes com foto documental verificada nesta rodada; os demais preservam os assets existentes.
- O `typecheck/build` do V37 ainda reporta erros preexistentes em `Profile/Auth` e `RadarAssistant`; a alteração dos assets não introduziu esses erros. A captura funcional foi validada no servidor de desenvolvimento real.
