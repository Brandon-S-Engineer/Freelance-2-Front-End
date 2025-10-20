// app/(auth)/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: 'Cuenta | Omaleon',
    template: '%s • Cuenta | Omaleon',
  },
  // Auth pages generally shouldn't be indexed (search engines)
  robots: { index: false, follow: false },
  // Nice to keep the toolbar consistent on auth too
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e5e7eb' }, // gray-200
    { media: '(prefers-color-scheme: dark)', color: '#111827' }, // gray-900
  ],
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-svh bg-muted/40 dark:bg-muted/20'>
      <div className='mx-auto w-full max-w-md px-4 py-5'>
        {/* Brand / Back to home */}

        {/* Auth card wrapper */}
        <section className='rounded-xl border border-border bg-card p-6 shadow-sm'>{children}</section>

        {/* Legal / help */}
        <p className='mt-6 text-center text-xs text-muted-foreground'>
          Al continuar aceptas nuestros{' '}
          <Link
            href='/terms'
            className='underline underline-offset-4 hover:text-foreground'>
            Términos
          </Link>{' '}
          y{' '}
          <Link
            href='/privacy'
            className='underline underline-offset-4 hover:text-foreground'>
            Aviso de privacidad
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
