export type BibleVerse = { verse:number; text:string };
export type BibleChapter = { book:string; chapter:number; verses:BibleVerse[] };

// getBible v2 publishes static JSON files with open CORS. The app keeps the chosen
// translation/source visible so licensing is never ambiguous. We use the Portuguese
// Almeida file published as the 1911/1900 edition metadata in getBible for the live reader.
export async function fetchBibleChapter(bookNumber:number, chapter:number):Promise<BibleChapter>{
  const url=`https://api.getbible.net/v2/almeida/${bookNumber}/${chapter}.json`;
  const cache=await caches.open('radar-eear-content-v23').catch(()=>null);
  let r:Response;
  try{r=await fetch(url,{cache:'force-cache'});if(cache&&r.ok)await cache.put(url,r.clone());}
  catch{const cached=cache?await cache.match(url):undefined;if(!cached)throw new Error('BIBLE_OFFLINE');r=cached;}
  if(!r.ok)throw new Error(`BIBLE_${r.status}`);
  const data:any=await r.json();
  const verses = Array.isArray(data?.verses) ? data.verses.map((v:any)=>({verse:Number(v.verse),text:String(v.text||'')})) : [];
  return {book:String(data?.book||bookNumber),chapter,verses};
}

export async function fetchGutenbergText(url:string){
  const cache=await caches.open('radar-eear-books-v23').catch(()=>null);
  let r:Response;
  try{r=await fetch(url,{cache:'force-cache'});if(cache&&r.ok)await cache.put(url,r.clone());}
  catch{const cached=cache?await cache.match(url):undefined;if(!cached)throw new Error('BOOK_OFFLINE');r=cached;}
  if(!r.ok)throw new Error(`BOOK_${r.status}`);
  return r.text();
}

export function chunkText(text:string,maxChars=7200){
  const paras=text.replace(/\r/g,'').split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  const chunks:string[]=[]; let current='';
  for(const p of paras){ if(current && current.length+p.length>maxChars){chunks.push(current);current='';} current+=(current?'\n\n':'')+p; }
  if(current)chunks.push(current); return chunks;
}

export async function fetchWikisourceText(pageUrl:string){
  const page=new URL(pageUrl);
  const title=decodeURIComponent(page.pathname.replace(/^\/wiki\//,''));
  const api=`https://${page.host}/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=text&format=json&origin=*`;
  const cache=await caches.open('radar-eear-books-v23').catch(()=>null);
  let response:Response;
  try{response=await fetch(api,{cache:'force-cache'});if(cache&&response.ok)await cache.put(api,response.clone());}
  catch{const cached=cache?await cache.match(api):undefined;if(!cached)throw new Error('BOOK_WIKISOURCE_OFFLINE');response=cached;}
  if(!response.ok)throw new Error(`BOOK_WIKISOURCE_${response.status}`);
  const data:any=await response.json();
  const html=String(data?.parse?.text?.['*']||'');
  if(!html)throw new Error('BOOK_WIKISOURCE_EMPTY');
  const doc=new DOMParser().parseFromString(html,'text/html');
  for(const el of Array.from(doc.querySelectorAll('style,script,table,.mw-editsection,.reference')))el.remove();
  return (doc.body?.innerText||doc.body?.textContent||'').replace(/\n{3,}/g,'\n\n').trim();
}
