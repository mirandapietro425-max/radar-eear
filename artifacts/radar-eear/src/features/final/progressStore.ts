export type ProgressKind = 'viewed' | 'started' | 'progress' | 'completed' | 'saved';
export type ProgressEvent = { id:string; title:string; kind:ProgressKind; category:string; at:string; value?:number; seconds?:number };
const KEY='radar-eear-progress-v18';
function read():ProgressEvent[]{ if(typeof window==='undefined') return []; try{const x=window.localStorage.getItem(KEY);return x?JSON.parse(x):[]}catch{return[]} }
function write(items:ProgressEvent[]){try{window.localStorage.setItem(KEY,JSON.stringify(items.slice(-3000)))}catch{}; window.dispatchEvent(new CustomEvent('radar-progress-change'));}
export function recordProgress(e:Omit<ProgressEvent,'at'>){write([...read(),{...e,at:new Date().toISOString()}]);}
export function recordViewed(id:string,title:string,category:string){recordProgress({id,title,kind:'viewed',category});}
export function recordCompleted(id:string,title:string,category:string,value=1){recordProgress({id,title,kind:'completed',category,value});}
export function recordSaved(id:string,title:string,category:string){recordProgress({id,title,kind:'saved',category});}
export function getLearningStats(){const events=read();const categories:Record<string,{views:number;completed:number;saved:number;seconds:number}>={};for(const e of events){categories[e.category]??={views:0,completed:0,saved:0,seconds:0};if(e.kind==='viewed'||e.kind==='started')categories[e.category].views++;if(e.kind==='completed')categories[e.category].completed++;if(e.kind==='saved')categories[e.category].saved++;categories[e.category].seconds+=e.seconds??0;}const completed=events.filter(e=>e.kind==='completed').length;const viewed=events.filter(e=>e.kind==='viewed').length;const saved=events.filter(e=>e.kind==='saved').length;const radarIndex=Math.min(100,Math.round((completed*2+viewed+saved)/Math.max(1,viewed*1.2)*100));return{events,categories,completed,viewed,saved,radarIndex};}
