import { test, expect } from '@playwright/test';

async function bootstrap(page:any){
  await page.addInitScript(()=>{
    localStorage.removeItem('radar-eear-v24-state');
    localStorage.removeItem('radar-eear-v25-state');
    localStorage.removeItem('radar-eear-supabase-session');
    localStorage.setItem('radar-eear-v25-state', JSON.stringify({
      profile:{name:'Teste V25',email:'',goalMinutes:120,target:'cfs-2-2027',onboardingDone:true,availableTime:120,preferredSubjects:['matematica'],theme:'dark',reducedMotion:false},
      account:{id:'e2e-local',name:'Teste V25',email:'',createdAt:'2026-01-01T00:00:00.000Z',mode:'local'},
      events:[],reviews:{},bookProgress:{},bookPosition:{},bibleProgress:{},bibleHighlights:{},bibleBookmarks:{},notes:{},favorites:[],gameRecords:{},cycleBlocks:[]
    }));
  });
  await page.route('https://api.getbible.net/**', async (route:any)=>await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({book:'1',chapter:1,verses:Array.from({length:8},(_,i)=>({verse:i+1,text:`Versículo ${i+1} para o teste do leitor.`}))})}));
  await page.route('https://www.gutenberg.org/**', async (route:any)=>await route.fulfill({status:200,contentType:'text/plain',body:'*** START OF THE PROJECT GUTENBERG EBOOK TEST ***\n\nCHAPTER I\n\nTexto público de teste.\n\nCHAPTER II\n\nContinuação da obra para validar retomada.\n\n*** END OF THE PROJECT GUTENBERG EBOOK TEST ***'}));
  await page.goto('/');
  await expect(page.locator('.modal-backdrop')).toHaveCount(0);
  await expect(page.locator('.main-shell')).toBeVisible();
}

test.beforeEach(async({page})=>bootstrap(page));

test('v25 deep routes and contextual tools are reachable', async({page})=>{
  const urls=['/trilhas','/linha-do-tempo','/diario','/salvos','/comparar','/mapa-do-edital','/cultura/matrix','/ciencia/movimento-e-energia','/prehistoria/fossies','/hardware','/conquistas'];
  for(const u of urls){const r=await page.goto(u);expect(r?.status(),u).toBeLessThan(400);await expect(page.locator('body')).not.toContainText('Conteúdo não encontrado.');}
});

test('v25 bible uses deep chapter route and specific context', async({page})=>{
  await page.goto('/biblia/genesis/12');
  await expect(page.getByRole('heading',{name:/Gênesis.*capítulo 12/i})).toBeVisible();
  await page.getByRole('link',{name:/Explorar contexto/i}).click();
  await expect(page).toHaveURL(/\/biblia\/genesis\/12\/contexto$/);
  await expect(page.getByText(/Harã|Canaã|Antigo Oriente Próximo/i).first()).toBeVisible();
});

test('v25 library metadata and integrated reader are explicit', async({page})=>{
  await page.goto('/biblioteca');
  await expect(page.locator('.library-shelf h2').first()).toBeVisible();
  await page.goto('/biblioteca/guerra-e-paz');
  await expect(page.getByRole('heading',{name:'Leitura integrada'})).toBeVisible();
  await expect(page.getByText(/texto público identificado/i).first()).toBeVisible();
  await page.getByRole('button',{name:/Próxima|Leitura concluída/}).click();
  await expect(page.locator('.page-meta')).toContainText(/parte [12]/i);
  await page.reload();
  await expect(page.locator('.page-meta')).toContainText(/parte [12]/i);
});

test('v25 no fake progress at first entry', async({page})=>{
  await expect(page.getByText(/74,2%|62%|47 questões|12 dias/)).toHaveCount(0);
  await page.goto('/progresso');
  await expect(page.getByText(/Sem eventos neste período|sem base/i).first()).toBeVisible();
});

test('v28 relations resolve to the requested entities', async({page})=>{
  const relations=[
    ['/pensadores/newton','/biblioteca/newton-principia','/atlas/cambridge'],
    ['/pensadores/plato','/biblioteca/plato-republica','/atlas/atenas'],
    ['/pensadores/descartes','/biblioteca/descartes-metodo','/atlas/paris'],
    ['/pensadores/galileo','/biblioteca/galileo-sidereus','/atlas/pisa'],
    ['/pensadores/kepler','/biblioteca/kepler-astronomia-nova','/atlas/praga'],
    ['/pensadores/faraday','/biblioteca/faraday-electricity','/atlas/londres'],
    ['/pensadores/machado-de-assis','/biblioteca/machado-dom-casmurro','/atlas/rio'],
    ['/pensadores/camoes','/biblioteca/camões-lusiadas','/atlas/lisboa'],
  ];
  for(const [person,work,place] of relations){
    for(const url of [person,work,place]){
      const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:15000});
      expect(response?.status(),url).toBeLessThan(400);
      await expect(page.locator('body')).not.toContainText('Conteúdo não encontrado.');
    }
  }
});
