import { chromium, devices } from '@playwright/test';
const base='http://127.0.0.1:4173';
const routes=[['home','/'],['hoje','/dia'],['biblioteca','/biblioteca'],['livro-dom-casmurro','/biblioteca/machado-dom-casmurro'],['curiosidades','/curiosidades'],['explorar','/explorar'],['estudar','/estudar/matematica'],['pensadores','/pensadores'],['atlas','/atlas?place=cambridge'],['biblia','/biblia'],['apocrifos','/apocrifos'],['assistente','/tutor']];
const specs=[['desktop',devices['Desktop Chrome']],['mobile',devices['Pixel 7']]];
const browser=await chromium.launch({headless:true});
for(const [mode,device] of specs){const context=await browser.newContext({...device,locale:'pt-BR'});const page=await context.newPage();for(const [name,path] of routes){await page.goto(base+path,{waitUntil:'networkidle'}).catch(()=>{});await page.waitForTimeout(350);await page.screenshot({path:`screenshots/${mode}/${name}.png`,fullPage:true});console.log(mode,name,page.url(),await page.title());}await context.close();}
await browser.close();
