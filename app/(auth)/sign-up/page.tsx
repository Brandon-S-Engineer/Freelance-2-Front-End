'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { FiMail, FiLock } from 'react-icons/fi';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Integrate with Cognito Auth endpoint (Next.js → Node.js → Cognito)
      console.log('Registering:', { email, password });

      // Example redirect after successful registration
      router.push('/');
    } catch (error) {
      console.error('Error registering:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6 max-w-md mx-auto py-12'>
      <Script
        id='fb-sdk-init'
        strategy='afterInteractive'>{`
    window.fbAsyncInit = function() {
      FB.init({
        appId  : '${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}',
        cookie : true,
        xfbml  : true,
        version: 'v20.0'
      });
    };
  `}</Script>
      <Script
        id='fb-sdk'
        strategy='afterInteractive'
        src='https://connect.facebook.net/es_LA/sdk.js'
        crossOrigin='anonymous'
      />
      <div className='text-center'>
        <h1 className='text-2xl font-semibold tracking-tight text-foreground'>Crear cuenta</h1>
        <p className='text-sm text-muted-foreground mt-1'>Crea tu cuenta en Omaleon</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Correo electrónico</Label>
          <div className='flex items-center gap-2'>
            <FiMail
              className='text-muted-foreground'
              size={18}
            />
            <Input
              id='email'
              type='email'
              placeholder='tucorreo@ejemplo.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Contraseña</Label>
          <div className='flex items-center gap-2'>
            <FiLock
              className='text-muted-foreground'
              size={18}
            />
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <Button
          type='submit'
          className='w-full'
          disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </Button>
      </form>

      <div className='flex items-center gap-2 my-4'>
        <Separator className='flex-1' />
        <span className='text-xs text-muted-foreground'>o registrarse con</span>
        <Separator className='flex-1' />
      </div>

      {/* Social Sign-in buttons (for Cognito Federated Identities) */}
      <div className='flex flex-col items-center gap-4'>
        <button
          className='gsi-material-button'
          style={{ width: 236 }}>
          <div className='gsi-material-button-state'></div>
          <div className='gsi-material-button-content-wrapper'>
            <div className='gsi-material-button-icon'>
              <svg
                version='1.1'
                xmlns={'http://www.w3.org/2000/svg'}
                viewBox='0 0 48 48'
                // xmlns={{ xlink: 'http://www.w3.org/1999/xlink' }}
                style={{ display: 'block' }}>
                <path
                  fill='#EA4335'
                  d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'></path>
                <path
                  fill='#4285F4'
                  d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'></path>
                <path
                  fill='#FBBC05'
                  d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'></path>
                <path
                  fill='#34A853'
                  d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'></path>
                <path
                  fill='none'
                  d='M0 0h48v48H0z'></path>
              </svg>
            </div>
            <span className='gsi-material-button-contents'>Continuar con Google</span>
            <span style={{ display: 'none' }}>Continuar con Google</span>
          </div>
        </button>

        {/* Official Facebook Login Button (SDK Plugin) */}
        <div
          className='fb-login-button'
          data-size='large'
          data-layout='default'
          data-button-type='continue_with'
          data-auto-logout-link='false'
          data-use-continue-as='false'
          data-width=''></div>
      </div>

      <p className='text-center text-sm text-muted-foreground mt-4'>
        ¿Ya tienes cuenta?{' '}
        <button
          type='button'
          className='text-primary underline underline-offset-4 hover:text-primary/80'
          onClick={() => router.push('/sign-in')}>
          Inicia sesión
        </button>
      </p>
    </div>
  );
}
