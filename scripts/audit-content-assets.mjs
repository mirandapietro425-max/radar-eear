import fs from 'node:fs';
import path from 'node:path';
import { contentGuidesV45 } from '../src/data/content-guides-v45.ts';
import { v45Questions } from '../src/data/question-bank-v45.ts';
import { editorialSubjects } from '../src/data/exam-data.ts';
import { books } from '../src/experience-data.ts';
import { broaderBooks } from '../src/data/catalog.ts';
import curiosities from '../src/data/curiosities-v26.json' with {type:'json'};

const root=process.cwd();
const existsUrl=(p)=>{const u=String(p||'').replace(/^\//,'');const real=u.startsWith('assets/')||u.startsWith('content/')?path.join(root,'public',u):path.join(root,u);return fs.existsSync(real)};
const words=(s)=>String(s||'').trim().split(/\s+/).filter(Boolean).length;
const missing=[];
for(const g of contentGuidesV45){if(!existsUrl(g.guidePath))missing.push(['guide',g.id,g.guidePath]);if(!existsUrl(g.image))missing.push(['guide-image',g.id,g.image]);}
for(const c of curiosities){if(c.image&&!existsUrl(c.image))missing.push(['curiosity-image',c.id,c.image]);if(!Array.isArray(c.sources)||c.sources.length<1)missing.push(['curiosity-source',c.id,'none']);}
for(const s of editorialSubjects){if(!existsUrl(s.image))missing.push(['subject-image',s.id,s.image]);}
for(const b of [...books,...broaderBooks.map(x=>({id:x[0],cover:`/assets/library/catalog/${x[0]}.svg`}))])if(b.cover&&!existsUrl(b.cover))missing.push(['book-cover',b.id,b.cover]);
const qBy=new Map();for(const q of v45Questions)qBy.set(q.contentId,(qBy.get(q.contentId)||0)+1);
const guideWords=contentGuidesV45.map(g=>words(fs.readFileSync(path.join(root,'public',g.guidePath.replace(/^\//,'')),'utf8')));
const curWords=curiosities.map(c=>words(c.body));
const report={guides:contentGuidesV45.length,missing,questionModules:qBy.size,questionCounts:[...qBy.values()].sort((a,b)=>a-b),curiosities:curiosities.length,curiosityBodyMedian:[...curWords].sort((a,b)=>a-b)[Math.floor(curWords.length/2)],guideWordMedian:[...guideWords].sort((a,b)=>a-b)[Math.floor(guideWords.length/2)]};
console.log(JSON.stringify(report,null,2));
if(missing.length)process.exitCode=1;
