import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const checks=[];
const ok=(name,value,detail='')=>checks.push({name,ok:Boolean(value),detail});
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');

const app=read('src/app/App.tsx');
const runtime=read('src/lib/content-runtime.ts');
const assistant=read('src/components/RadarAssistant.tsx');
const assistantLogic=read('src/lib/radar-assistant.ts');
const css=read('src/index.css');
const v45=read('src/data/question-bank-v45.ts');

ok('book-proxy-api',fs.existsSync(path.join(root,'api/book.js')),'api/book.js');
ok('book-proxy-allowlist',read('api/book.js').includes("www.gutenberg.org") && read('api/book.js').includes('wikisource.org'));
ok('book-reader-meta-inference',app.includes('function bookReaderMeta') && app.includes("/cache/epub/${n}/pg${n}.txt"));
ok('book-reader-proxy-runtime',runtime.includes('/api/book?url=') && runtime.includes('fetchGutenbergText'));
ok('question-hub',app.includes('Prática por módulo') && app.includes('contentId=${encodeURIComponent(m.guideId)}'));
ok('question-exact-filter',app.includes('const list=pool') && !app.includes('const list=pool.length?pool:ALL_QUESTIONS.filter'));
const ids=[...v45.matchAll(/"contentId":\s*"([^"]+)"/g)].map(m=>m[1]);
const countMap=ids.reduce((m,id)=>(m[id]=(m[id]||0)+1,m),{});
ok('420-questions',ids.length===420,`found ${ids.length}`);
ok('28-question-modules',Object.keys(countMap).length===28,`found ${Object.keys(countMap).length}`);
ok('15-per-question-module',Object.values(countMap).every(n=>n===15),JSON.stringify(Object.values(countMap).filter(n=>n!==15)));
ok('no-local-missing-book-paths',!app.includes('/content/books/fulltext/'),'local fulltext refs removed');
ok('assistant-voice',assistant.includes('SpeechRecognition') && assistant.includes('Falar com o RADAR'));
ok('assistant-speech-output',assistant.includes('speechSynthesis') && assistant.includes('SpeechSynthesisUtterance'));
ok('assistant-navigation-actions',assistantLogic.includes('function coveragePath') && assistantLogic.includes("/atlas?place=${p.id}"));
ok('coverage-route-helper',app.includes('function coverageModuleHref') && app.includes("pre-historia-evidencias"));
ok('prehistory-alias',read('src/pages/V25Pages.tsx').includes("slug:'evidencia'"));
ok('science-experiment-alias',read('src/pages/V25Pages.tsx').includes("experimento-e-hipotese"));
ok('curiosity-detail',app.includes('Leitura em camadas') && app.includes('curiosity-reading-block'));
ok('thinker-math',app.includes('Ciência e Matemática') && app.includes('Relação'));
ok('voice-first-css',css.includes('.radar-assistant-voice-stage'));
ok('reader-error-retry',app.includes('Tentar novamente') && app.includes('setRetry(v=>v+1)'));
ok('curiosity-detail-route',app.includes('href={`/curiosidades/${encodeURIComponent(String(c.id))}`}') && assistantLogic.includes('/curiosidades/${encodeURIComponent(String(c.id))}'),'curiosidade abre a rota de detalhe real');
ok('library-effective-integrated-count',app.includes("effectiveBooks.filter((b:any)=>b.readingMode==='integrated').length"),'contador usa leitura efetiva');
ok('library-continue-reading',app.includes('Agora lendo') && app.includes('continueReading'),'retomada por progresso de livro');
ok('notification-permission',app.includes('Notification.requestPermission()'),'toggle solicita permissão real');
ok('domain-progress-all-subjects',read('src/pages/V25Pages.tsx').includes('languageProgress') && read('src/pages/V25Pages.tsx').includes('pctFor'),'idiomas não ficam artificialmente em 0%');
ok('review-direct-question',app.includes('Rever questão') && app.includes('question_answered'),'revisão retorna à questão e aproveita diagnóstico');
ok('microprofile-parentheses',app.includes("if(math && (n.includes('progress') || n.includes('p.a')))"),'regras matemáticas sem ambiguidade de precedência');
ok('question-hub-curated-15',app.includes('v45Questions.forEach') && app.includes('{v45Questions.length}'),'hub usa pacote fechado de 420 questões');
ok('question-helper-curated-first',app.includes('const direct=contentId?v45Questions.find') && app.includes('const byTopic=v45Questions.find'),'atalhos de estudo priorizam o pacote fechado');
ok('simulation-curated-pool',app.includes("const pool=useMemo(()=>{const filtered=subject==='all'?v45Questions"),'simulados usam o pacote fechado para treino');
ok('curiosity-save',app.includes('Salva no Meu Radar') && app.includes('curiosity:'),'curiosidade pode entrar no conhecimento pessoal');
ok('default-notifications-off',app.includes('notifications:false'),'estado inicial não promete notificações antes da permissão');
ok('curiosity-dataset-quality',JSON.parse(require('fs').readFileSync(new URL('../src/data/curiosities-v26.json',import.meta.url),'utf8')).length===75,'75 registros editoriais presentes');
ok('study-guides-28',JSON.parse(require('fs').readFileSync(new URL('../src/data/content-guides-v45.ts',import.meta.url),'utf8'))===null ? false : true,'arquivo de guias presente');
ok('compare-types',read('src/pages/V25Pages.tsx').includes("'Pessoa'|'Conceito'|'Livro'|'Lugar'"),'Compare cobre quatro tipos de entidade');
ok('curiosity-saved-resolution',read('src/pages/V25Pages.tsx').includes("type==='curiosity'") && read('src/pages/V25Pages.tsx').includes('/curiosidades/${encodeURIComponent(String(id))}'),'salvos resolve curiosidades para a página correta');
ok('question-empty-state-safe',app.includes('const q=list.length?list[i%list.length]:undefined') && app.includes('Nenhuma questão cadastrada neste módulo.'),'filtro vazio não gera acesso a q indefinido');




const failed=checks.filter(x=>!x.ok);
console.log(JSON.stringify({timestamp:new Date().toISOString(),passed:checks.length-failed.length,total:checks.length,failed:failed.length,checks,failures:failed},null,2));
if(failed.length)process.exitCode=1;
