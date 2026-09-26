export type QueueItem = { id: string; table: string; payload: unknown; createdAt: string; attempts: number };
const DB = 'radar-eear-offline-v23';
const STORE = 'queue';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath:'id' });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
export async function enqueue(table:string, payload:unknown) {
  const db = await openDB();
  const item:QueueItem={id:crypto.randomUUID(),table,payload,createdAt:new Date().toISOString(),attempts:0};
  await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(item);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});
}
export async function listQueue():Promise<QueueItem[]> { const db=await openDB(); return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readonly');const r=tx.objectStore(STORE).getAll();r.onsuccess=()=>resolve(r.result as QueueItem[]);r.onerror=()=>reject(r.error)}) }
export async function removeQueue(id:string){ const db=await openDB(); await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)}) }
export async function clearQueue(){ const db=await openDB(); await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).clear();tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)}) }
