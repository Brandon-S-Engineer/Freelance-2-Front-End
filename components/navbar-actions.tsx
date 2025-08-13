'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const buildWhatsAppLinkGeneral = () => {
  const base = 'https://wa.me/5215581631195';
  const text = `Hola, ¿me puedes dar más información?`;
  return `${base}?text=${encodeURIComponent(text)}`;
};

type Size = 'md' | 'lg' | 'xl';

const sizeClasses: Record<Size, { wrap: string; icon: number; ext: number }> = {
  md: { wrap: 'px-4 py-1.5 text-base', icon: 18, ext: 16 },
  lg: { wrap: 'px-4 py-1.5 text-base', icon: 18, ext: 16 }, // compact for 1085px
  xl: { wrap: 'px-6 py-2 text-lg', icon: 22, ext: 18 }, // your original desktop
};

const NavbarActions = ({ size = 'xl' }: { size?: Size }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  const href = buildWhatsAppLinkGeneral();
  const s = sizeClasses[size];

  return (
    <div className='ml-auto flex items-center w-auto max-[483px]:justify-center max-[483px]:ml-0 max-[483px]:w-full'>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Solicitar informes por WhatsApp (se abre en una pestaña nueva)'
        className={`inline-flex items-center justify-center gap-x-2 rounded-full bg-green-600 ${s.wrap} font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700`}>
        <FaWhatsapp
          aria-hidden='true'
          size={s.icon}
        />
        <span className='flex items-center gap-x-1'>
          WhatsApp: 5581631195
          <FiExternalLink
            aria-hidden='true'
            size={s.ext}
            className='ml-1'
          />
        </span>
        <span className='sr-only'>(Se abre en una pestaña nueva)</span>
      </a>
    </div>
  );
};

export default NavbarActions;
