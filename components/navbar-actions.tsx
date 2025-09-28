'use client';

import { useEffect, useState } from 'react';
import { FiUser, FiPackage, FiShoppingCart } from 'react-icons/fi';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <div className='ml-auto flex items-center gap-x-6 max-[483px]:justify-center max-[483px]:ml-0 max-[483px]:w-full'>
      <a
        href='/account'
        className='text-sm font-medium hover:text-blue-600'>
        <span className='flex items-center gap-x-1'>
          <FiUser size={16} />
          Iniciar sesión
        </span>
      </a>
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
  );
};

export default NavbarActions;
