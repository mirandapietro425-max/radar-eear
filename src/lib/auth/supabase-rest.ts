export type AuthUser = { id: string; email?: string; user_metadata?: Record<string, unknown> };
export type AuthSession = { access_token: string; refresh_token: string; expires_in?: number; user: AuthUser };

const url = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const anon = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;
export const SESSION_KEY = 'radar-eear-supabase-session';
export const supabaseConfigured = Boolean(url && anon);
const api = url ? `${url.replace(/\/$/, '')}` : '';

async function request(path: string, init: RequestInit = {}) {
  if (!supabaseConfigured) throw new Error('SUPABASE_NOT_CONFIGURED');
  const headers = new Headers(init.headers);
  headers.set('apikey', anon!);
  headers.set('Content-Type', 'application/json');
  const session = getStoredSession();
  if (session?.access_token && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${session.access_token}`);
  const r = await fetch(`${api}${path}`, { ...init, headers });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body?.msg || body?.message || body?.error_description || `HTTP_${r.status}`);
  return body;
}

export function getStoredSession(): AuthSession | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}
function saveSession(session: AuthSession | null) { if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session)); else localStorage.removeItem(SESSION_KEY); }

export function adoptRecoverySession(accessToken:string, refreshToken:string, expiresIn=3600) {
  saveSession({access_token:accessToken,refresh_token:refreshToken,expires_in:expiresIn,user:{id:'recovery'}});
}

export async function signUp(email: string, password: string, profile: { name: string; goalMinutes: number; target: string }) {
  const data = await request('/auth/v1/signup', { method:'POST', body: JSON.stringify({ email, password, data: profile }) });
  if (data?.access_token) saveSession(data as AuthSession);
  return data as AuthSession & { confirmation_sent_at?: string };
}
export async function signIn(email: string, password: string) {
  const data = await request('/auth/v1/token?grant_type=password', { method:'POST', body: JSON.stringify({ email, password }) });
  saveSession(data as AuthSession); return data as AuthSession;
}
export async function requestPasswordReset(email: string, redirectTo = `${window.location.origin}/perfil?recovery=1`) {
  return request('/auth/v1/recover', { method:'POST', body: JSON.stringify({ email, redirect_to: redirectTo }) });
}
export async function updatePassword(password: string) {
  return request('/auth/v1/user', { method:'PUT', body: JSON.stringify({ password }) });
}
export async function refreshSession() {
  const current = getStoredSession();
  if (!current?.refresh_token || current.user?.id === 'recovery') return null;
  const data = await request('/auth/v1/token?grant_type=refresh_token', { method:'POST', body: JSON.stringify({ refresh_token: current.refresh_token }) });
  saveSession(data as AuthSession); return data as AuthSession;
}
export async function signOut() { if (getStoredSession()?.access_token) await request('/auth/v1/logout', { method:'POST' }).catch(() => undefined); saveSession(null); }
export async function getUser() { return request('/auth/v1/user', { method:'GET' }) as Promise<AuthUser>; }

export async function tableSelect<T>(table: string, query = ''): Promise<T[]> {
  return request(`/rest/v1/${table}?${query}`, { method:'GET', headers:{ Accept:'application/json' } }) as Promise<T[]>;
}
export async function tableUpsert<T>(table: string, rows: T[], onConflict?: string) {
  const suffix = onConflict ? `?on_conflict=${encodeURIComponent(onConflict)}` : '';
  return request(`/rest/v1/${table}${suffix}`, { method:'POST', headers:{ Prefer:'resolution=merge-duplicates,return=representation' }, body: JSON.stringify(rows) });
}
export async function tableInsert<T>(table: string, rows: T[]) { return request(`/rest/v1/${table}`, { method:'POST', headers:{ Prefer:'return=minimal' }, body: JSON.stringify(rows) }); }
export async function tableDelete(table: string, query: string) { return request(`/rest/v1/${table}?${query}`, { method:'DELETE', headers:{ Prefer:'return=minimal' } }); }
export function clearSession() { saveSession(null); }
