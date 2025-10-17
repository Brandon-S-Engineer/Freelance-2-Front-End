import React, { useEffect, useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Close with Esc
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignIn = () => {
    console.log({ email, password });
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'
      onClick={onClose} // ⬅️ click outside closes
      role='dialog'
      aria-modal='true'
      aria-labelledby='login-title'>
      <div
        className='w-96 rounded-lg bg-white p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()} // ⬅️ prevent inner clicks from closing
      >
        <h2
          id='login-title'
          className='mb-4 text-2xl font-semibold'>
          Sign In
        </h2>

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-3 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <div className='flex justify-between'>
          <button
            onClick={handleSignIn}
            className='rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'>
            Sign In
          </button>
          <button
            onClick={onClose}
            className='rounded bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
