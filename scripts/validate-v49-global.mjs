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
const sw=read('public/sw.js');
const manifest=read('public/manifest.webmanifest');
const css=read('src/index.css');
const packageJson=JSON.parse(read('package.json'));
const curiosities=JSON.parse(read('src/data/curiosities-v26.json'));
const guidesMod=await import('../src/data/content-guides-v45.ts');
const questionsMod=await import('../src/data/question-bank-v45.ts');
const expansion=await import('../src/data/editorial-expansion.ts');
const guides=guidesMod.contentGuidesV45;
const questions=questionsMod.v45Questions;
const expandedBooks=expansion.expandedBooks||[];
const expandedThinkers=expansion.expandedThinkers||[];

ok('version-v49',packageJson.version==='0.6.2',`package ${packageJson.version}`);
ok('sw-cache-v49',sw.includes("radar-eear-v49-shell"),'cache shell version bumped');
ok('manifest-png-icons',manifest.includes('/icon-192.png')&&manifest.includes('/icon-512.png'),'installable icons');
ok('sw-notification-png',sw.includes("icon:'/icon-192.png'")&&sw.includes("badge:'/icon-192.png'"),'notification uses raster icon');
ok('manifest-shortcut-png',manifest.match(/shortcuts/) && (manifest.match(/\/icon-192\.png/g)||[]).length>=3,'shortcuts use installable icon');
ok('focus-visible',css.includes('focus-visible')&&css.includes('outline:2px solid var(--gold-soft)'),'keyboard focus visible');
ok('no-backups',!['src/components/RadarAssistant.tsx.bak','src/lib/content-runtime.ts.bak'].some(exists),'no stale backup source files');

const qIds=questions.map(q=>q.id);
const qIdSet=new Set(qIds);
const contentIds=questions.map(q=>q.contentId);
const contentSet=new Set(guides.map(g=>g.id));
const duplicates=qIds.filter((id,i)=>qIds.indexOf(id)!==i);
const invalidAnswers=questions.filter(q=>!Array.isArray(q.options)||q.options.length!==4||q.answer<0||q.answer>3);
const missingQuestionContent=questions.filter(q=>!contentSet.has(q.contentId));
const mismatchedSubject=questions.filter(q=>{const g=guides.find(x=>x.id===q.contentId);return g&&g.subject!==q.subject;});
const guideFilesMissing=guides.filter(g=>!exists('public'+g.guidePath));
const guideImagesMissing=guides.filter(g=>!exists('public'+g.image));
const moduleCounts=new Map(); for(const q of questions)moduleCounts.set(q.contentId,(moduleCounts.get(q.contentId)||0)+1);
ok('questions-420',questions.length===420,`found ${questions.length}`);
ok('question-ids-unique',duplicates.length===0,duplicates.slice(0,5).join(', '));
ok('question-options-valid',invalidAnswers.length===0,`invalid ${invalidAnswers.length}`);
ok('question-content-linkage',missingQuestionContent.length===0,`missing content links ${missingQuestionContent.length}`);
ok('question-subject-consistency',mismatchedSubject.length===0,`subject mismatches ${mismatchedSubject.length}`);
ok('content-guides-28',guides.length===28,`found ${guides.length}`);
ok('question-modules-28',moduleCounts.size===28,`found ${moduleCounts.size}`);
ok('question-modules-15',Array.from(moduleCounts.values()).every(n=>n===15),JSON.stringify(Array.from(moduleCounts.values()).filter(n=>n!==15)));
ok('guide-files-all-present',guideFilesMissing.length===0,guideFilesMissing.map(x=>x.id).join(', '));
ok('guide-images-all-present',guideImagesMissing.length===0,guideImagesMissing.map(x=>x.id).join(', '));
ok('guide-subject-balance',Object.values(Object.groupBy(guides,g=>g.subject)).every(x=>x.length===7),JSON.stringify(Object.fromEntries(Object.entries(Object.groupBy(guides,g=>g.subject)).map(([k,v])=>[k,v.length]))));

const curiosityRequired=['id','title','body','why_it_matters','entity_id','confidence','checked_at','image','image_credit','image_license','sources'];
const badCuriosity=curiosities.filter(c=>curiosityRequired.some(k=>c[k]===undefined||c[k]===null||String(c[k]).trim()===''));
const badCuriositySources=curiosities.filter(c=>!Array.isArray(c.sources)||!c.sources.length||c.sources.some(s=>!s?.url));
const curiosityImageMissing=curiosities.filter(c=>!exists('public'+String(c.image||'')));
const curiosityIds=curiosities.map(c=>String(c.id));
ok('curiosities-75',curiosities.length===75,`found ${curiosities.length}`);
ok('curiosity-ids-unique',new Set(curiosityIds).size===curiosityIds.length,'unique ids');
ok('curiosity-required-fields',badCuriosity.length===0,`bad ${badCuriosity.length}`);
ok('curiosity-sources',badCuriositySources.length===0,`bad sources ${badCuriositySources.length}`);
ok('curiosity-images',curiosityImageMissing.length===0,`missing ${curiosityImageMissing.length}`);

const expandedCoverRefs=expandedBooks.filter(b=>b.cover&&!exists('public'+b.cover));
ok('expanded-book-covers',expandedCoverRefs.length===0,expandedCoverRefs.map(x=>x.id).join(', '));
ok('expanded-book-ids-unique',new Set(expandedBooks.map(b=>b.id)).size===expandedBooks.length,'expanded books unique');
ok('expanded-thinker-ids-unique',new Set(expandedThinkers.map(t=>t.id)).size===expandedThinkers.length,'expanded thinkers unique');

ok('bible-chapter-history',app.includes('onPopState=()=>setChapter(readChapterFromUrl())')&&app.includes('history.pushState({radarChapter:chapter}'),'chapters participate in browser history');
ok('book-reader-scroll',app.includes("document.getElementById('leitor')?.scrollIntoView"),'reader navigation returns focus to reader');
ok('language-wrong-feedback',app.includes('attemptedWrong')&&app.includes('Tentar novamente'),'wrong answer gets feedback and retry');
ok('legacy-notifications-off',app.includes('p.notifications=p.notifications===true')&&app.includes('checked={state.profile.notifications===true}'),'legacy snapshots cannot enable notifications silently');
ok('expanded-explore-person',app.includes('const requestedThinker=[...thinkers,...expandedThinkers]')&&app.includes('selected=requestedThinker||topicThinker'),'Explore resolves expanded thinkers');
ok('focus-tutor-current-question',app.includes('questionForTopic?.id||v45Questions.find(q=>q.subject===subject)?.id||'), 'Tutor follows current study question');
ok('account-safe-backup',app.includes('const safeCandidate=')&&app.includes('account:state.account')&&app.includes("profile:{...candidate.profile,email:state.account?.email||candidate.profile.email||''}"),'backup import preserves account identity');
ok('reviews-merge',app.includes('const mergedReviews:Record<string,any>={...derivedReviews')&&app.includes('reviews:mergedReviews'),'remote review state merges with local derived events');
ok('book-progress-max-merge',app.includes('const mergedBookProgress')&&app.includes('Math.max(Number(mergedBookProgress[k]||0),Number(v||0))'),'higher local book progress survives hydration');
ok('sw-navigation-fallback-only',sw.includes("if(isNavigation)return caches.match('/index.html');throw err"),'non-navigation failures do not receive HTML fallback');
ok('book-reader-anchor',app.includes('className="reader-zone" id="leitor"'),'continue-reading anchor exists');
ok('question-route-contentId',app.includes('x.contentId?`&contentId=${encodeURIComponent(x.contentId)}`')&&app.includes('questionPracticePath'),'question search keeps module specificity');

// Literal /assets references should all resolve from public/. Ignore dynamic template refs.
const files=[...fs.globSync('src/**/*.{ts,tsx,js,mjs,json,css}',{cwd:root}),...fs.globSync('public/**/*.{html,webmanifest,js,json,css}',{cwd:root})];
const refs=new Set();
const assetRe=/['"](\/assets\/[^'"`]+\.(?:svg|png|jpe?g|webp|gif|avif))(?:\?[^'"`]*)?['"]/gi;
for(const f of files){const t=read(f); for(const m of t.matchAll(assetRe))refs.add(m[1]);}
const missingAssets=[...refs].filter(x=>!exists('public'+x));
ok('literal-assets-resolve',missingAssets.length===0,missingAssets.slice(0,20).join(', '));

const failed=checks.filter(c=>!c.ok);
console.log(JSON.stringify({timestamp:new Date().toISOString(),passed:checks.length-failed.length,total:checks.length,failed:failed.length,checks,failures:failed},null,2));
if(failed.length)process.exitCode=1;
