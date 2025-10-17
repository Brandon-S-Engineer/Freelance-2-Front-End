import React, { useState, useEffect } from 'react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Close with Esc + scroll lock (Strict-Mode-safe)
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    let mounted = true;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    if (mounted) document.body.style.overflow = 'hidden';

    return () => {
      mounted = false;
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignUp = async () => {
    console.log({ name, email, password });
    // Later: call signUp() from /lib/auth.ts
    onClose();
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'
      onClick={onClose}>
      <div
        className='w-96 rounded-lg bg-white p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}>
        <h2 className='mb-4 text-2xl font-semibold'>Crear cuenta</h2>

        <input
          type='email'
          placeholder='Correo electrónico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-3 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <div className='flex justify-between'>
          <button
            onClick={handleSignUp}
            className='rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'>
            Registrarse
          </button>
          <button
            onClick={onClose}
            className='rounded bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400'>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
