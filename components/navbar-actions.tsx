'use client';

import { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div style={{ height: 40 }} />;

  return (
    <>
      <div className='ml-auto flex items-center gap-x-6 max-[483px]:justify-center max-[483px]:ml-0 max-[483px]:w-full'>
        <a
          href='/sign-in'
          className='text-sm font-medium hover:text-blue-600 flex items-center gap-x-1'>
          Iniciar sesión
        </a>

        <a
          href='/sign-up'
          className='text-sm font-medium hover:text-blue-600'>
          Registrarse
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
    </>
  );
};

export default NavbarActions;
