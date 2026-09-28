import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const exists=p=>fs.existsSync(path.join(root,p));
const result={issues:[],stats:{}};
const issue=(kind,message,detail='')=>result.issues.push({kind,message,detail});
const mods=await Promise.all([
  import('../src/data/catalog.ts'),
  import('../src/data/library-v45.ts'),
  import('../src/experience-data.ts'),
  import('../src/data/hardware.ts'),
  import('../src/data/daily.ts'),
  import('../src/data/apocrypha.ts'),
  import('../src/data/thinker-details.ts'),
  import('../src/data/editorial-expansion.ts'),
  import('../src/data/content-guides-v45.ts'),
  import('../src/data/question-bank-v45.ts')
]);
const [{broaderBooks},{libraryV45},{bibleBooks,bibleContext,books,games,places,questions,thinkers},{hardwareModules},{dailyContent},{apocrypha},{thinkerDetails},{expandedBooks,expandedThinkers},{contentGuidesV45},{v45Questions}]=mods;
const asset=(ref,owner)=>{if(!ref||typeof ref!=='string')return;if(ref.startsWith('/assets/')&&!exists('public'+ref))issue('asset',`Missing asset ${ref}`,owner);};
const checkIds=(arr,label,getId=x=>x?.id)=>{const ids=arr.map(getId).filter(Boolean);const dup=ids.filter((x,i)=>ids.indexOf(x)!==i);if(dup.length)issue('data',`${label} duplicate IDs`,[...new Set(dup)].slice(0,20).join(', '));};
result.stats.books={base:books.length,libraryV45:libraryV45.length,broader:broaderBooks.length,expanded:expandedBooks.length};
result.stats.thinkers={base:thinkers.length,expanded:expandedThinkers.length};
result.stats.places=places.length;result.stats.bibleBooks=bibleBooks.length;result.stats.apocrypha=apocrypha.length;result.stats.hardware=hardwareModules.length;result.stats.games=games.length;result.stats.daily=dailyContent.length;
checkIds(books,'books');checkIds(libraryV45,'libraryV45');checkIds(expandedBooks,'expandedBooks');checkIds(thinkers,'thinkers');checkIds(expandedThinkers,'expandedThinkers');checkIds(places,'places',x=>x?.id);checkIds(dailyContent,'daily');
for(const b of books){asset(b.image||b.cover||'',`book:${b.id}`);if(!b.title||!b.author)issue('data','Book missing title/author',b.id)}
for(const b of libraryV45){asset(b.cover||'',`library:${b.id}`);if(!b.title||!b.author)issue('data','V45 library missing title/author',b.id)}
for(const b of expandedBooks){asset(b.cover||'',`expanded-book:${b.id}`);if(!b.title||!b.author||!b.source)issue('data','Expanded book missing core metadata',b.id)}
for(const t of thinkers){asset(t.image||'',`thinker:${t.id}`);if(!t.name||!t.blurb)issue('data','Thinker missing core metadata',t.id)}
for(const t of expandedThinkers){asset(t.image||'',`expanded-thinker:${t.id}`);if(!t.name||!t.summary||!t.source)issue('data','Expanded thinker missing core metadata',t.id)}
for(const p of places){asset(p?.image||'',`place:${p?.id||'unknown'}`);if(!p?.name||!p?.region)issue('data','Place missing name/region',p?.id||'unknown')}
for(const d of dailyContent){asset(d.image,`daily:${d.id}`);if(!d.title||!d.body||!d.source)issue('data','Daily item missing content/source',d.id)}
for(const a of apocrypha){asset(`/assets/apocrypha/${a[0]}.svg`,`apocrypha:${a[0]}`)}
for(const b of bibleBooks){asset(`/assets/bible/books/${b[1]}.svg`,`bible:${b[1]}`)}
for(const h of hardwareModules){asset(`/assets/hardware/${h[0]}.svg`,`hardware:${h[0]}`)}
for(const g of games){asset(g.image,`game:${g.id}`)}
// cross reference thinkers -> details where details are expected
for(const t of thinkers){if(!thinkerDetails[t.id]) issue('relation','Base thinker without detail dossier',t.id)}
// all guide assets/files
for(const g of contentGuidesV45){asset(g.image,`guide:${g.id}`);if(!exists('public'+g.guidePath))issue('content','Guide file missing',g.guidePath)}
// all questions cross link to guides
const guideMap=new Map(contentGuidesV45.map(g=>[g.id,g]));
for(const q of v45Questions){const g=guideMap.get(q.contentId);if(!g)issue('relation','Question has no guide',q.id);else if(g.subject!==q.subject)issue('relation','Question subject differs from guide',`${q.id}:${q.subject}/${g.subject}`);if(!Array.isArray(q.options)||q.options.length!==4)issue('data','Question option count != 4',q.id);if(!q.id||!q.prompt||!q.explanation)issue('data','Question missing core text',q.id);}
// content context references
if(!bibleContext || Object.keys(bibleContext).length<10)issue('content','Bible context registry unexpectedly small');
// check direct asset refs in all static source text
const files=[];
function walk(d){for(const ent of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,ent.name);if(ent.name==='node_modules'||ent.name==='.git')continue;if(ent.isDirectory())walk(p);else if(/\.(ts|tsx|js|mjs|json|css|html|webmanifest)$/.test(ent.name))files.push(p)}}
walk(path.join(root,'src'));walk(path.join(root,'public'));
const assetRe=/['"](\/assets\/[^'"`]+\.(?:svg|png|jpe?g|webp|gif|avif))(?:\?[^'"`]*)?['"]/gi;const refs=new Set();for(const f of files){let txt;try{txt=fs.readFileSync(f,'utf8')}catch{continue}for(const m of txt.matchAll(assetRe))refs.add(m[1]);}for(const ref of refs)if(!exists('public'+ref))issue('asset','Static source references missing asset',ref);
console.log(JSON.stringify(result,null,2));
process.exitCode=result.issues.length?1:0;
