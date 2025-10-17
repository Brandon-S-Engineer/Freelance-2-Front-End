'use client';

import { useEffect, useState } from 'react';
import { FiUser, FiPackage, FiShoppingCart } from 'react-icons/fi';
import LoginModal from './login-modal';
import SignUpModal from './signup-modal';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  useEffect(() => {
    console.log('NavbarActions mounted');
  }, []);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div style={{ height: 40 }} />;

  return (
    <>
      <div className='ml-auto flex items-center gap-x-6 max-[483px]:justify-center max-[483px]:ml-0 max-[483px]:w-full'>
        <button
          onClick={() => setIsLoginOpen(true)}
          className='text-sm font-medium hover:text-blue-600 flex items-center gap-x-1'>
          <FiUser size={16} />
          Iniciar sesión
        </button>

        <button
          onClick={() => setIsSignUpOpen(true)}
          className='text-sm font-medium hover:text-blue-600 flex items-center gap-x-1'>
          Crear cuenta
        </button>

        <a
          href='/orders'
          className='text-sm font-medium hover:text-blue-600'>
          <span className='flex items-center gap-x-1'>
            <FiPackage size={16} />
            Pedidos
          </span>
        </a>

        <a
          href='/cart'
          className='text-sm font-medium hover:text-blue-600'>
          <span className='flex items-center gap-x-1'>
            <FiShoppingCart size={16} />
            Carrito
          </span>
        </a>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </>
  );
};

export default NavbarActions;
