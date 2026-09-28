const DB_NAME = 'radar-eear-state-v2';
const STORE = 'snapshots';
const KEY = 'app';

type Snapshot<T> = { key: string; savedAt: number; state: T };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') return reject(new Error('INDEXEDDB_UNAVAILABLE'));
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE, { keyPath: 'key' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('INDEXEDDB_OPEN_FAILED'));
  });
}

export async function saveSnapshot<T>(state: T): Promise<number> {
  const savedAt = Date.now();
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put({ key: KEY, savedAt, state } satisfies Snapshot<T>);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('INDEXEDDB_WRITE_FAILED'));
  });
  db.close();
  return savedAt;
}

export async function loadSnapshot<T>(): Promise<Snapshot<T> | null> {
  try {
    const db = await openDb();
    const value = await new Promise<Snapshot<T> | null>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => resolve((req.result as Snapshot<T> | undefined) || null);
      req.onerror = () => reject(req.error || new Error('INDEXEDDB_READ_FAILED'));
    });
    db.close();
    return value;
  } catch {
    return null;
  }
}

export async function clearSnapshot(): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('INDEXEDDB_DELETE_FAILED'));
    });
    db.close();
  } catch {}
}
