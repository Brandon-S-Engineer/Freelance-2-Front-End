'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

export default function AuthStatus() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Hide on auth pages just in case
  const onAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');

  if (loading || onAuthPage) return null;

  // Only show something if logged in; otherwise show nothing
  if (!user) return null;

  return <div className='ml-auto text-white text-sm'>Hola, {user.email}</div>;
}
