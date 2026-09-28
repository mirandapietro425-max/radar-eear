const DB_NAME = 'radar-eear-db-v1';
const STORE = 'snapshots';
const KEY = 'app-state';

type Snapshot<T> = { key: string; updatedAt: number; value: T };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('indexeddb-unavailable'));
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'key' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('indexeddb-open-failed'));
  });
}

export async function readLocalSnapshot<T>(): Promise<Snapshot<T> | null> {
  try {
    const db = await openDb();
    return await new Promise<Snapshot<T> | null>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => resolve((req.result as Snapshot<T> | undefined) || null);
      req.onerror = () => reject(req.error || new Error('indexeddb-read-failed'));
      tx.oncomplete = () => db.close();
      tx.onerror = () => db.close();
    });
  } catch { return null; }
}

export async function writeLocalSnapshot<T>(value: T, updatedAt = Date.now()): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put({ key: KEY, updatedAt, value } satisfies Snapshot<T>);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error || new Error('indexeddb-write-failed')); };
    });
  } catch { /* localStorage remains the fast fallback */ }
}
