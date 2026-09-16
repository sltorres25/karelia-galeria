/**
 * Tab & Session Manager for Karelia Galería
 * Enforces automatic cache clearing and session termination when tabs/windows close.
 */

export function markTabSessionActive() {
  try {
    sessionStorage.setItem('karelia_tab_session_active', 'true');
  } catch (e) {
    console.warn('SessionStorage error:', e);
  }
}

export function isTabSessionActive() {
  try {
    return sessionStorage.getItem('karelia_tab_session_active') === 'true';
  } catch (e) {
    return false;
  }
}

export async function clearAllCachesAndLogout() {
  try {
    // 1. Clear Web Cache Storage (Cache API)
    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map(key => caches.delete(key)));
    }

    // 2. Clear Session Storage
    sessionStorage.clear();

    // 3. Clear auth cookie on server
    await fetch('/api/auth/logout', { 
      method: 'POST',
      headers: { 'Cache-Control': 'no-cache' }
    });
  } catch (err) {
    console.warn('Error clearing cache/session:', err);
  }
}

export async function validateTabSession() {
  const active = isTabSessionActive();
  if (!active) {
    // Tab was closed or fresh tab session -> clear orphaned server cookies & browser cache
    await clearAllCachesAndLogout();
    return false;
  }
  return true;
}
