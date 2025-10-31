// utils/auth.ts
export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3000';

export function startLogin(provider?: 'Google' | 'Facebook') {
  const url = provider ? `${API_BASE}/api/auth/login?provider=${provider}` : `${API_BASE}/api/auth/login`;
  window.location.href = url;
}

export function startSignup(provider?: 'Google' | 'Facebook') {
  const url = provider ? `${API_BASE}/api/auth/signup?provider=${provider}` : `${API_BASE}/api/auth/signup`;
  window.location.href = url;
}
