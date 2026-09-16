/**
 * Session & Cache Manager for Karelia Galería
 * Handles session token storage, Authorization headers, and cache clearing.
 */

export function setSessionToken(token) {
  try {
    if (token) {
      sessionStorage.setItem('karelia_auth_token', token);
      sessionStorage.setItem('karelia_tab_session_active', 'true');
    }
  } catch (e) {
    console.warn('sessionStorage error:', e);
  }
}

export function getSessionToken() {
  try {
    return sessionStorage.getItem('karelia_auth_token');
  } catch (e) {
    return null;
  }
}

export function getAuthHeaders() {
  const token = getSessionToken();
  const headers = { 'Cache-Control': 'no-cache' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export function markTabSessionActive() {
  try {
    sessionStorage.setItem('karelia_tab_session_active', 'true');
  } catch (e) {
    console.warn('sessionStorage error:', e);
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
    sessionStorage.clear();

    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      }).catch(() => {});
    }

    await fetch('/api/auth/logout', { 
      method: 'POST',
      headers: { 'Cache-Control': 'no-cache' }
    }).catch(() => {});
  } catch (err) {
    console.warn('Error clearing cache/session:', err);
  }
}

export async function validateTabSession() {
  // If no tab session marker exists (fresh tab / tab closed), clear residual state
  const active = isTabSessionActive();
  if (!active) {
    await clearAllCachesAndLogout();
    return false;
  }
  return true;
}
