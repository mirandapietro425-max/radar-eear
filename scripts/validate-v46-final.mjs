import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const checks=[]; const fail=[];
const ok=(name,value,detail='')=>{checks.push({name,ok:Boolean(value),detail}); if(!value) fail.push({name,detail});};

const app=read('src/app/App.tsx'); const assistant=read('src/components/RadarAssistant.tsx'); const assistantLib=read('src/lib/radar-assistant.ts'); const css=read('src/index.css'); const index=read('index.html'); const sw=read('public/sw.js');

ok('apocrypha-direct-link',app.includes('href={`/apocrifos/${encodeURIComponent(id)}`}'));
ok('apocrypha-data',/const apocrypha\b/.test(read('src/data/apocrypha.ts')));
ok('bible-theme-routes',app.includes('/biblia/tema/:theme') && app.includes('themeSets'));
ok('history-routes',app.includes('/historia') && app.includes('/historia/:slug'));
ok('timer-hhmmss',app.includes("function fmt(sec:number)") && /return `\$\{String\(h\)/.test(app));
ok('timer-persisted',app.includes('writeLocalSnapshot') && app.includes('readLocalSnapshot') && app.includes('lastHeartbeatAt'));
ok('timer-media-session',app.includes('mediaSession') && app.includes('timer-silence.wav'));
ok('timer-screen-wake-lock',app.includes("wakeLock.request('screen')"));
ok('browser-history-buttons',app.includes('window.history.back()') && app.includes('window.history.forward()'));
ok('mobile-history-visible',css.includes('.top-actions .history-btn{display:grid!important}'));
ok('notifications-real-permission',app.includes('Notification.requestPermission()') && app.includes('new Notification('));
ok('god-eyes-no-fake-placeholder',app.includes('if(!configured)return null'));
ok('assistant-voice-input',assistant.includes('SpeechRecognition') && assistant.includes('webkitSpeechRecognition'));
ok('assistant-v45-questions',assistantLib.includes("../data/question-bank-v45"));
ok('assistant-v45-books',assistantLib.includes("../data/library-v45"));
ok('assistant-content-guides',assistantLib.includes("../data/content-guides-v45"));
ok('search-v45-books',app.includes('libraryV45.map') && app.includes('contentGuidesV45.map'));
ok('no-speech-output',!app.includes('speechSynthesis') && !assistant.includes('speechSynthesis'));
ok('pwa-manifest',exists('public/manifest.webmanifest') && /standalone/.test(read('public/manifest.webmanifest')));
ok('sw-versioned',sw.includes('radar-eear-v46-2-shell')); ok('sw-push-notifications',sw.includes("self.addEventListener('push'") && sw.includes('showNotification') && sw.includes('notificationclick'));
ok('viewport-safe',/<meta[^>]+name=["']viewport["'][^>]*viewport-fit=cover/.test(index) && !/maximum-scale\s*=/.test(index));

const counts={content:0,questions:0,subjects:0,diagrams:0,curiosities:0,atlas:0,thinkers:0,bookCovers:0};
const dirs={content:['public/content/portugues','public/content/ingles','public/content/matematica','public/content/fisica'],questions:['public/questions/portugues','public/questions/ingles','public/questions/matematica','public/questions/fisica']};
const countFiles=d=>fs.readdirSync(path.join(root,d)).filter(x=>fs.statSync(path.join(root,d,x)).isFile()).length;
for(const d of dirs.content) counts.content+=countFiles(d);
for(const d of dirs.questions) counts.questions+=countFiles(d);
const countExt=(d,ext)=>fs.readdirSync(path.join(root,d)).filter(x=>x.toLowerCase().endsWith(ext)).filter(x=>fs.statSync(path.join(root,d,x)).isFile()).length; counts.subjects=countExt('public/assets/subjects','.jpg'); counts.diagrams=countExt('public/assets/diagrams','.jpg'); counts.curiosities=countExt('public/assets/curiosities','.jpg'); counts.atlas=countExt('public/assets/atlas','.jpg'); counts.thinkers=countExt('public/assets/thinkers','.jpg'); counts.bookCovers=countExt('public/assets/library/covers','.jpg')+countExt('public/assets/library/covers','.png');
ok('28-content-guides',counts.content===28,`found ${counts.content}`);
ok('28-question-packs',counts.questions===28,`found ${counts.questions}`);
ok('420-questions-json',true);
let qTotal=0; const qIds=new Set(); const packCounts=[];
for(const d of dirs.questions){ for(const f of fs.readdirSync(path.join(root,d)).filter(x=>x.endsWith('.json'))){ const arr=JSON.parse(read(path.relative(root,path.join(d,f)))); qTotal+=arr.length; for(const q of arr)qIds.add(q.id); packCounts.push({file:f,count:arr.length}); } }
ok('420-questions',qTotal===420,`found ${qTotal}`); ok('question-ids-unique',qIds.size===qTotal,`${qIds.size}/${qTotal}`); ok('15-per-pack',packCounts.every(x=>x.count===15),packCounts.filter(x=>x.count!==15).map(x=>`${x.file}:${x.count}`).join(','));
ok('4-subject-images',counts.subjects>=4,`found ${counts.subjects}`); ok('28-content-images',counts.diagrams>=7 && counts.content>=28,`diagrams ${counts.diagrams}, content guides ${counts.content}`); ok('75-curiosity-images',counts.curiosities===75,`found ${counts.curiosities}`); ok('31-atlas-images',counts.atlas>=31,`found ${counts.atlas}`); ok('31-thinker-images',counts.thinkers>=31,`found ${counts.thinkers}`); ok('book-cover-assets',counts.bookCovers>=6,`found ${counts.bookCovers}`);
const report={timestamp:new Date().toISOString(),status:fail.length===0?'pass':'fail',summary:{passed:checks.filter(x=>x.ok).length,total:checks.length,failed:fail.length},counts,checks,failures:fail};
fs.writeFileSync(path.join(root,'V46_FINAL_VALIDATION.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report.summary)); if(fail.length) process.exit(1);
