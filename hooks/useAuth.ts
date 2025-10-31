'use client';

import { useState, useEffect } from 'react';
import { API_BASE } from '@/lib/auth';

// 🧩 Universal type-safe user model for Cognito + social logins
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  provider: 'cognito' | 'google' | 'facebook';
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setUser(data.user ?? null);
      } catch (err) {
        console.error('useAuth error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
