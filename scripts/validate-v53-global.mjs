import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const checks=[];
const ok=(name,value,detail='')=>checks.push({name,ok:Boolean(value),detail});
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const exists=(p)=>fs.existsSync(path.join(root,p));
const app=read('src/app/App.tsx');
const pages=read('src/pages/V25Pages.tsx');
const sync=read('src/lib/sync.ts');
const db=read('src/lib/storage/local-db.ts');
const sw=read('public/sw.js');
const manifest=read('public/manifest.webmanifest');
const css=read('src/index.css');
const pkg=JSON.parse(read('package.json'));
const curiosities=JSON.parse(read('src/data/curiosities-v26.json'));
const guidesMod=await import('../src/data/content-guides-v45.ts');
const questionsMod=await import('../src/data/question-bank-v45.ts');
const expansion=await import('../src/data/editorial-expansion.ts');
const guides=guidesMod.contentGuidesV45;
const questions=questionsMod.v45Questions;
const expandedBooks=expansion.expandedBooks||[];
const expandedThinkers=expansion.expandedThinkers||[];

ok('version-v53',pkg.version==='0.6.6',`package ${pkg.version}`);

ok('sw-cache-v53',sw.includes('radar-eear-v53-shell'),'cache shell version remains current');
ok('manifest-icons',manifest.includes('/icon-192.png')&&manifest.includes('/icon-512.png'),'installable raster icons');
ok('sw-caches-icons',sw.includes('/icon-192.png')&&sw.includes('/icon-512.png'),'service worker precaches install icons');
ok('timer-audio',exists('public/media/timer-silence.wav')&&app.includes("new Audio('/media/timer-silence.wav')"),'timer has mobile media-session audio keepalive');
ok('focus-visible',css.includes('focus-visible'),'keyboard focus styles');

const qCounts=new Map(); for(const q of questions) qCounts.set(q.contentId,(qCounts.get(q.contentId)||0)+1);
ok('questions-420',questions.length===420,`found ${questions.length}`);
ok('question-modules-28',qCounts.size===28,`found ${qCounts.size}`);
ok('question-modules-15',Array.from(qCounts.values()).every(n=>n===15),`bad ${Array.from(qCounts.values()).filter(n=>n!==15).length}`);
ok('questions-have-content',questions.every(q=>guides.some(g=>g.id===q.contentId)),'every question maps to a guide');
ok('guide-count-28',guides.length===28,`found ${guides.length}`);
ok('guide-files',guides.every(g=>exists('public'+g.guidePath)),'all guides resolve');
ok('guide-images',guides.every(g=>exists('public'+g.image)),'all guide images resolve');

ok('curiosities-75',curiosities.length===75,`found ${curiosities.length}`);
ok('curiosity-fields',curiosities.every(c=>c.id&&c.title&&c.body&&c.why_it_matters&&c.image&&Array.isArray(c.sources)&&c.sources.length),'curiosities have editorial/source fields');
ok('curiosity-images',curiosities.every(c=>exists('public'+c.image)),'curiosity images resolve');

ok('expanded-thinkers-route',app.includes("const requestedThinker=[...thinkers,...expandedThinkers]")&&app.includes('selected=requestedThinker||topicThinker'),'expanded thinker routes resolve');
ok('expanded-thinker-relations',app.includes("if(h.startsWith('/pensadores/'))return Boolean([...thinkers,...expandedThinkers]"),'relation sanitizer knows expanded thinkers');
ok('expanded-books-unique',new Set(expandedBooks.map(x=>x.id)).size===expandedBooks.length,'expanded books unique');

ok('book-position-real',app.includes('position:state.bookPosition[id]??page,current_question_index:page'),'book resume stores actual reader position');
ok('book-position-latest-event',app.includes("type==='book_progress'")&&app.includes("position:Math.max(0,Number(e.meta?.page||1)-1)"),'backward book movement survives persistence');
ok('book-hydration-merge',app.includes('localBookPositionByTime')&&app.includes('localProgress>remoteProgress')&&app.includes('localProgress===remoteProgress'),'higher progress wins and newer equal-progress position wins');
ok('notifications-permission',app.includes("Notification.permission!=='granted'")&&app.includes('notifications:Boolean(r?.notifications===true'),'notifications require browser permission');
ok('notifications-default-off-remote',sync.includes('notifications:profile.notifications===true'),'remote profile defaults to notifications disabled unless explicitly enabled');
ok('notifications-remote-save',app.includes('saveRemoteProfile(state.account.id,{...state.profile,notifications:enabled})'),'notification toggle persists to remote profile');
ok('logout-clears-local',app.includes('clearLocalSnapshot()')&&app.includes('clearQueue()'),'logout clears local snapshot and queue');
ok('backup-keeps-account',app.includes('const safeCandidate=')&&app.includes('account:state.account'),'backup import preserves active account');
ok('bible-history',app.includes('const goChapter=(next:number)=>')&&app.includes('history.pushState({radarChapter:n}')&&app.includes('onPopState=()=>setChapter(readChapterFromUrl())'),'Bible chapters support browser back/forward');
ok('question-search-specific',app.includes('x.contentId?`&contentId=${encodeURIComponent(x.contentId)}`'),'search result keeps question module');
ok('question-practice-specific',app.includes('function questionPracticePath')&&app.includes('const direct=contentId?v45Questions.find'),'practice path stays module-specific');
ok('timer-module-isolation',app.includes('contentId?:string')&&app.includes('state.timer.contentId===contentId')&&app.includes('contentId:contentId||undefined')&&!app.includes('storedTimer?.sessionId||state.activeSessionId||uid()'),'timer state is isolated per content module');
ok('timer-resume-route-specific',app.includes("route:`/estudar/foco?subject=")&&app.includes('contentId?`&contentId=${encodeURIComponent(contentId)}`:\'\'') ,'focus resume keeps exact contentId route');
ok('focus-notes-isolated',app.includes('focus:${subject}:${contentId||topic}')&&app.includes('legacyFocusNoteKey'),'focus notes do not collide across subjects/modules');
ok('recommendation-map-key',read('src/lib/learning/engines.ts').includes('candidateMap.set(key,x);'),'adaptive recommendation stores candidate by the same composite key used to retrieve it');
ok('search-deduplicated',app.includes('const unique=Array.from(new Map(all.map(x=>[x.path,x])).values())'),'universal search deduplicates identical destinations');
ok('search-accent-insensitive',app.includes('normalize(`${x.k} ${x.label}`).includes(nq)'),'universal search ignores diacritics');
ok('library-author-actions',app.includes('const person=[...thinkers,...expandedThinkers].find')&&app.includes('abrir dossiê')&&app.includes('filtrar estante'),'library author strip has real actions');
ok('assistant-continue-exact',read('src/lib/radar-assistant.ts').includes('/biblioteca?continue=1')&&app.includes("params.get('continue')==='1'"),'assistant can jump to active reading');
ok('related-question-exact',app.includes('href:questionHref(relatedQuestion)'),'related questions keep subject and content module');
ok('sw-offline-safe',sw.includes('if(isNavigation)return caches.match(\'/index.html\');throw err'),'API failures are not masked with HTML');
ok('sync-sources',sync.includes('loadRemoteProfile')&&sync.includes('loadRemoteEvents')&&sync.includes('loadRemoteResume'),'cloud sync primitives present');
ok('sync-events-paginated',sync.includes('pageSize=1000')&&sync.includes('offset=${offset}&limit=${pageSize}')&&sync.includes('if(page.length<pageSize)break;'),'remote events load beyond the first page');
ok('sync-events-no-local-cap',app.includes('for(const e of snapshot){if(cancelled)break;if(syncedEventIdsRef.current.has(e.id))continue'),'local event sync does not truncate history to last 100');
ok('no-event-hard-cap',app.includes('const mergedEvents=[...byId.values()].sort((a,b)=>a.createdAt.localeCompare(b.createdAt));'),'event hydration does not silently discard older history');
ok('indexeddb-snapshot',db.includes("const STORE = 'snapshots'")&&db.includes('writeLocalSnapshot'),'IndexedDB snapshot exists');

ok('recommendation-exact-module',read('src/lib/learning/engines.ts').includes('weakness.contentId?`/questoes?subject=${encodeURIComponent(weakness.subject)}&contentId=${encodeURIComponent(weakness.contentId)}`'),'adaptive recommendation keeps the exact module when event has contentId');
ok('legacy-content-links-exact',read('src/data/v25-content.ts').includes('contentId=fis-cinematica')&&read('src/pages/V25Pages.tsx').includes('contentId=fis-ondas'),'legacy science question links use exact modules');

// No literal broken asset references.
const files=[...fs.globSync('src/**/*.{ts,tsx,js,mjs,json,css}',{cwd:root}),...fs.globSync('public/**/*.{html,webmanifest,js,json,css}',{cwd:root})];
const refs=new Set();
const assetRe=/['"](\/assets\/[^'"`]+\.(?:svg|png|jpe?g|webp|gif|avif))(?:\?[^'"`]*)?['"]/gi;
for(const f of files){const t=read(f);for(const m of t.matchAll(assetRe))refs.add(m[1]);}
const missing=[...refs].filter(x=>!exists('public'+x));
ok('literal-assets',missing.length===0,missing.slice(0,10).join(', '));

// Search for accidental demo identity strings in executable TS/TSX.
const srcFiles=[...fs.globSync('src/**/*.{ts,tsx}',{cwd:root})];
const demoHits=[]; for(const f of srcFiles){const t=read(f); if(/Marina Santos|CFS 2\/2025/.test(t) && !f.endsWith('exam-archive.ts')) demoHits.push(f);}
ok('no-demo-identity',demoHits.length===0,demoHits.join(', '));


ok('events-no-local-retention-cap',!app.includes('.slice(-5000)')&&!pages.includes('.slice(-5000)'),'event history is not silently truncated at 5000');
ok('simulation-attempt-isolated',app.includes('meta:{topic:q.topic,confidence,marked_doubt:doubt.includes(i),elapsed_ms:elapsedMs,simulation:true,attemptId}}')&&app.includes('e.meta?.attemptId===attemptId'),'simulation results are isolated to the current attempt');
ok('official-mode-honest',app.includes("const official=source.filter(q=>q.origin==='official')")&&app.includes('O acervo oficial ainda não foi incorporado'),'official mode cannot silently claim authorial questions are official');
ok('language-no-silent-fallback',app.includes('entry?.[1]')&&!app.includes('entry?.[1]||Object.values(LANGUAGE_LESSONS)[0]'),'unknown language topic does not fall back to another lesson');
ok('cycle-minutes-editable',app.includes('updateMinutes=(index:number,minutes:number)')&&app.includes('cycle-minutes'),'study cycle exposes editable block duration');
ok('hardware-completion-hydrates',app.includes("state.events.some(e=>e.type==='content_completed'&&e.entityId===`hardware:${selected[0]}`)"),'hardware checklist reflects prior completion');
ok('atlas-story-safe',app.includes('const activeStory=stories.find(st=>st.places.includes(id));')&&app.includes('activeStory?.id===st.id'),'Atlas does not substitute an unrelated journey when a place has no route');
ok('sync-incremental',app.includes('syncedEventIdsRef')&&app.includes('syncedResumeKeyRef')&&app.includes('if(syncedEventIdsRef.current.has(e.id))continue'),'authenticated sync avoids re-uploading the entire history on every new event');
ok('biblia-history-no-popstate-push',!app.includes('if(window.location.pathname+window.location.search!==u){history.pushState({radarChapter:chapter}'),'browser back does not push a new history entry');
const failed=checks.filter(x=>!x.ok);
console.log(JSON.stringify({timestamp:new Date().toISOString(),passed:checks.length-failed.length,total:checks.length,failed:failed.length,checks,failures:failed},null,2));
if(failed.length)process.exitCode=1;
