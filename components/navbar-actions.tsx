'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

import AuthStatus from '@/components/auth-status';
import { startLogin, startSignup } from '@/lib/auth';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div style={{ height: 40 }} />;

  return (
    <>
      <div className='ml-auto flex items-center gap-x-6 max-[483px]:justify-center max-[483px]:ml-0 max-[483px]:w-full'>
        <button
          onClick={() => startLogin()}
          className='text-sm font-medium hover:text-blue-600 flex items-center gap-x-1'>
          Iniciar sesión
        </button>

        <button
          onClick={() => startSignup()}
          className='text-sm font-medium hover:text-blue-600 flex items-center gap-x-1'>
          Registrarse
        </button>

        <Link
          href='/cart'
          className='text-sm font-medium hover:text-blue-600'>
          <span className='flex items-center gap-x-1'>
            <FiShoppingCart size={16} />
            Carrito
          </span>
        </Link>

        {/* Profile authenticated */}
        <AuthStatus />
      </div>
    </>
  );
};

export default NavbarActions;
