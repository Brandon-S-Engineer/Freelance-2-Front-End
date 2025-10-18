'use client';

import { useEffect, useState } from 'react';
import { FiUser, FiPackage, FiShoppingCart } from 'react-icons/fi';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div style={{ height: 40 }} />;

  return (
    <>
      <div className='ml-auto flex items-center gap-x-6 max-[483px]:justify-center max-[483px]:ml-0 max-[483px]:w-full'>
        {/* Login Button and Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              type='button'
              className='text-sm font-medium hover:text-blue-600 flex items-center gap-x-1'>
              <FiUser size={16} />
              Iniciar sesión
            </button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-[400px]'>
            <DialogHeader>
              <DialogTitle>Iniciar sesión</DialogTitle>
            </DialogHeader>

            <form className='flex flex-col gap-4 mt-4'>
              <Input
                type='email'
                placeholder='Correo electrónico'
              />
              <Input
                type='password'
                placeholder='Contraseña'
              />
              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700'>
                Entrar
              </Button>
            </form>
          </DialogContent>
        </Dialog>

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
    </>
  );
};

export default NavbarActions;
