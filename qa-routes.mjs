import { chromium } from '@playwright/test';
const routes=['/','/dia','/biblioteca','/biblioteca/machado-dom-casmurro','/curiosidades','/explorar','/estudar/matematica','/pensadores','/atlas?place=cambridge','/biblia','/apocrifos','/tutor'];
const b=await chromium.launch({headless:true});const p=await b.newPage();let errors=[];p.on('pageerror',e=>errors.push(e.message));for(const r of routes){errors=[];await p.goto('http://127.0.0.1:4173'+r,{waitUntil:'networkidle'}).catch(e=>errors.push(e.message));await p.waitForTimeout(300);console.log(r,'body=',(await p.locator('body').innerText()).slice(0,50).replace(/\n/g,' | '),'errors=',errors.length?errors.join(' || '):'none');if(r.startsWith('/atlas'))await p.screenshot({path:'screenshots/desktop/atlas.png',fullPage:true});}
await b.close();
