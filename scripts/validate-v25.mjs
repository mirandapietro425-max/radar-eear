import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const checks=[]; const failures=[];
const ok=(name,value,detail='')=>{checks.push({name,ok:Boolean(value),detail});if(!value)failures.push(`${name}${detail?`: ${detail}`:''}`)};
const app=read('src/app/App.tsx');
const pages=read('src/pages/V25Pages.tsx');
const v25=read('src/data/v25-content.ts');
const css=read('src/index.css');
const index=read('index.html');
const pkg=JSON.parse(read('package.json'));
const media=read('src/components/EntityMedia.tsx');

const assetsRoot=path.join(root,'public/assets');
const assetSet=new Set();
function walk(dir,rel=''){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const r=path.join(rel,ent.name);if(ent.isDirectory())walk(path.join(dir,ent.name),r);else assetSet.add('/assets/'+r.replaceAll(path.sep,'/'));}}
walk(assetsRoot);

ok('package-version-v25',pkg.version==='0.6.0',pkg.version);
ok('typecheck-script',/tsc -p tsconfig\.json --noEmit/.test(pkg.scripts?.typecheck||''));
ok('build-script',/vite build/.test(pkg.scripts?.build||''));
ok('runtime-validation-script',/validate-v25\.mjs/.test(pkg.scripts?.['test:runtime']||'') && /validate-v25\.mjs/.test(pkg.scripts?.validate||''));
ok('node24',pkg.engines?.node==='>=24 <25');
ok('pt-br',/<html[^>]*lang=["']pt-BR["']/.test(index));
ok('viewport-safe',!/maximum-scale\s*=/.test(index));
ok('metadata-radar',/Radar EEAR/.test(index)&&!/built on Replit/i.test(index));
ok('pwa-shell',exists('public/manifest.webmanifest')&&exists('public/sw.js'));
ok('entity-media',/lazy|loading="lazy"/.test(media)&&/alt/.test(media)&&/license/.test(media)&&/source/.test(media)&&/fallback/i.test(media));
ok('media-used-globally',/EntityMedia/.test(app)&&/EntityMedia/.test(pages));
ok('dark-editorial-css',/--ink-navy:#071622/.test(css)&&/--paper:#F7F2E8/.test(css)&&/v25-hero/.test(css)&&/trail-grid/.test(css));
ok('no-demo-runtime',!/Marina Santos|Marina Silva/.test(app)&&!/CFS 2\/2025/.test(app));
ok('no-static-fake-metrics',!/74,2%|62%|47 questões|12 dias/.test(app));
ok('local-mode-explicit',/mode:'local'/.test(app)&&/Modo local/.test(app));
ok('real-event-progression',/question_answered/.test(app)&&/session_completed/.test(app)&&/book_progress/.test(app)&&/bible_chapter_completed/.test(app)&&/game_completed/.test(app));
ok('resume-deep-bible',/route:`\/biblia\/\$\{id\}\/\$\{chapter\}`/.test(app));
ok('daily-bible-deep-route',/return `\/biblia\/\$\{b\[1\]\}\/\$\{target-acc\+1\}`/.test(app));
ok('bible-specific-context',/genesis:12/.test(app)&&/exodus:14/.test(app)&&/matthew:5/.test(app)&&/acts:2/.test(app));
ok('book-reader',/fetchGutenbergText/.test(app)&&/book_progress/.test(app)&&/bookPosition/.test(app));
ok('library-metadata-only-honest',/Ficha editorial real/.test(app)&&/texto integral não foi incorporado/.test(app));
ok('atlas-editorial-controls',/globe-pin/.test(app)&&/Recentrar/.test(app)&&/Filtrar Atlas por categoria/.test(app));
ok('google3d-interactive',/Marker3DInteractiveElement/.test(app)&&/gmp-click/.test(app)&&/VITE_GOOGLE_MAPS_API_KEY/.test(app));
ok('google3d-progressive',/API não configurada.*Atlas editorial continua disponível/.test(app));
ok('invalid-atlas-route-honest',/Lugar do Atlas não encontrado/.test(app));
ok('invalid-thinker-route-honest',/Pensador não encontrado/.test(app));
ok('invalid-game-route-honest',/Jogo não encontrado/.test(app));
ok('invalid-subject-route-honest',/Matéria não encontrada/.test(app));
ok('recommendation-engine',/recommendNext/.test(app)&&/recommendNext\(/.test(read('src/lib/learning/engines.ts')));
ok('review-engine',/updateMemory/.test(read('src/lib/learning/engines.ts'))&&/nextReviewAt/.test(read('src/lib/learning/engines.ts')));
ok('focus-no-auto-start',/cronômetro só começa quando você clicar em iniciar/.test(app));
ok('confidence-required',/confidence===null/.test(app));
ok('question-error-diagnosis',/Não sabia|Confundi o conceito|Errei a conta|Interpretei errado|Foi distração|Chutei/.test(app));
ok('supabase-auth',/signUp\(/.test(app)&&/signIn\(/.test(app)&&/requestPasswordReset/.test(app));
ok('recovery-session',/adoptRecoverySession/.test(app)&&/updatePassword/.test(app));
ok('offline-queue',/flushOfflineQueue/.test(app)&&/enqueue\(/.test(app));
ok('source-rights-docs',exists('ASSET_CREDITS.md')&&exists('DATA_SOURCES.md')&&exists('docs/MEDIA_RIGHTS.md'));
ok('deep-routes',/path="\/trilhas"/.test(app)&&/path="\/linha-do-tempo"/.test(app)&&/path="\/diario"/.test(app)&&/path="\/salvos"/.test(app)&&/path="\/comparar"/.test(app)&&/path="\/mapa-do-edital"/.test(app));
ok('v25-pages-real',/export function TrailsPage/.test(pages)&&/export function TimelinePage/.test(pages)&&/export function ComparePage/.test(pages)&&/export function DomainMapPage/.test(pages));
ok('v25-trails',/Uma hora com Newton/.test(v25)&&/Do texto bíblico ao mapa/.test(v25)&&/Da literatura à filosofia/.test(v25));
ok('timeline-data',/newton-principia/.test(v25)&&/darwin/.test(v25)&&/lemeitre/.test(v25));
ok('culture-bridge',/Matrix/.test(v25)&&/Jurassic Park/.test(v25)&&/Hidden Figures/.test(v25)&&/Arrival/.test(v25));
ok('knowledge-detail-routes',/path="\/ciencia\/:slug"/.test(app)&&/path="\/prehistoria\/:slug"/.test(app)&&/path="\/cultura\/:slug"/.test(app));
ok('hardware-diagnostic',/Checklist de diagnóstico/.test(app)&&/Microquiz/.test(app));
ok('command-center',/Central de comando/.test(pages)&&/Ctrl|Ctrl\/Cmd/.test(app));
ok('progress-page',/getDaily|computeProgress|Meu progresso/.test(app)&&/7 dias/.test(app)&&/30 dias/.test(app)&&/90 dias/.test(app));
ok('previous-exams-catalog',/previousExamCatalog/.test(app)&&/Provas anteriores catalogadas/.test(app));
ok('current-exam-date',/2026-11-22/.test(read('src/data/exam-data.ts')));
ok('docs-v25',exists('README_V25_FINAL.md')&&exists('V24_FINAL_STATUS.md'));
ok('apply-tool',exists('tools/apply-radar-v25.mjs'));
ok('e2e-v25',exists('tests/e2e/radar-v25.spec.ts')&&/v25 deep routes/.test(read('tests/e2e/radar-v25.spec.ts')));

const staticRefs=[...new Set([...app,...pages,...v25].join('').matchAll(/['\"](\/assets\/[A-Za-z0-9_./%-]+)['\"]/g))].map(m=>m[1]).filter(x=>!x.endsWith('/'));
const dynamicChecks=[['/assets/library/catalog/', 'library/catalog/'],['/assets/bible/books/', 'bible/books/'],['/assets/apocrypha/', 'apocrypha/'],['/assets/hardware/','hardware/']];
const missing=[...staticRefs.filter(x=>!assetSet.has(x)),...dynamicChecks.filter(([prefix,dir])=>!assetSet.has(prefix+ (dir==='library/catalog/'?'newton-principia.svg':dir==='bible/books/'?'genesis.svg':dir==='apocrypha/'?'1-enoque.svg':'01.svg'))).map(x=>x[0])];
ok('asset-refs-resolve',missing.length===0,missing.join(', '));
ok('asset-count>=250',assetSet.size>=250,`found ${assetSet.size}`);

// Data counts by runtime sources
const exp=read('src/experience-data.ts');
const books=(exp.match(/export const books = \[/)?1:0);
let counts={assetCount:assetSet.size,booksCatalog:null,bibleBooks:66,bibleChapters:1189,thinkers:null,places:null,apocrypha:null,hardware:null,math:214,physics:240,questions:98,games:11,previousExams:null};
try{
  const {execFileSync}=await import('node:child_process');
  const out=execFileSync(process.execPath,['--experimental-strip-types','scripts/runtime-smoke.mjs'],{cwd:root,encoding:'utf8'});
  const j=JSON.parse(out.slice(out.indexOf('{'))); counts={...counts,...j.counts};
  ok('runtime-smoke-pass',j.ok===true);
}catch(e){ok('runtime-smoke-pass',false,String(e.message||e));}

const result={timestamp:new Date().toISOString(),checks,failures,summary:{passed:checks.filter(x=>x.ok).length,total:checks.length,failed:failures.length},counts};
fs.writeFileSync(path.join(root,'V25_VALIDATION.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.summary));
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
