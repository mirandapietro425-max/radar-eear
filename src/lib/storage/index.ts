export type StorageArea = {
  get<T=unknown>(key: string): T | null;
  set<T=unknown>(key: string, value: T): void;
  remove(key: string): void;
};

export type StorageAdapter = {
  user: StorageArea;
  progress: StorageArea;
  sessions: StorageArea;
  questions: StorageArea;
  reviews: StorageArea;
  library: StorageArea;
  bible: StorageArea;
  atlas: StorageArea;
  games: StorageArea;
};

function safeGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  } catch { return null; }
}

function area(prefix: string): StorageArea {
  return {
    get: <T=unknown>(key: string) => safeGet<T>(`${prefix}:${key}`),
    set: <T=unknown>(key: string, value: T) => { try { localStorage.setItem(`${prefix}:${key}`, JSON.stringify(value)); } catch { /* quota/offline */ } },
    remove: (key: string) => { try { localStorage.removeItem(`${prefix}:${key}`); } catch { /* noop */ } },
  };
}

export const storage: StorageAdapter = {
  user: area('radar:user'),
  progress: area('radar:progress'),
  sessions: area('radar:sessions'),
  questions: area('radar:questions'),
  reviews: area('radar:reviews'),
  library: area('radar:library'),
  bible: area('radar:bible'),
  atlas: area('radar:atlas'),
  games: area('radar:games'),
};

// Compatibility helpers for the single app-state snapshot currently used by the UI.
storage.user.get = <T=unknown>(key: string) => {
  try { return JSON.parse(localStorage.getItem(key) || 'null') as T | null; } catch { return null; }
};
storage.user.set = <T=unknown>(key: string, value: T) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ }
};
