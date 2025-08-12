// NavbarActions.tsx
'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const buildWhatsAppLinkGeneral = () => {
  const base = 'https://wa.me/5215581631195';
  const text = `Hola, ¿me puedes dar más información?`;
  return `${base}?text=${encodeURIComponent(text)}`;
};

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  const href = buildWhatsAppLinkGeneral();

  return (
    <div className='ml-auto flex items-center gap-x-2'>
      {/* xl+: full pill */}
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='hidden xl:inline-flex items-center justify-center gap-x-2 rounded-full bg-green-600 px-6 py-2 text-lg font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700'
        aria-label='Solicitar informes por WhatsApp (se abre en una pestaña nueva)'>
        <FaWhatsapp
          aria-hidden='true'
          className='flex-shrink-0'
          size={22}
        />
        <span className='flex items-center gap-x-1'>
          WhatsApp: 5581631195
          <FiExternalLink
            aria-hidden='true'
            size={18}
            className='ml-1 flex-shrink-0'
          />
        </span>
        <span className='sr-only'>(Se abre en una pestaña nueva)</span>
      </a>

      {/* lg..xl: medium pill without number */}
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='hidden lg:inline-flex xl:hidden items-center justify-center gap-x-2 rounded-full bg-green-600 px-5 py-2 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700'
        aria-label='Solicitar informes por WhatsApp (se abre en una pestaña nueva)'>
        <FaWhatsapp
          aria-hidden='true'
          className='flex-shrink-0'
          size={20}
        />
        <span className='flex items-center gap-x-1'>
          WhatsApp
          <FiExternalLink
            aria-hidden='true'
            size={16}
            className='ml-1 flex-shrink-0'
          />
        </span>
        <span className='sr-only'>(Se abre en una pestaña nueva)</span>
      </a>

      {/* <lg: icon-only */}
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex lg:hidden items-center justify-center rounded-full bg-green-600 p-3 text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700'
        aria-label='WhatsApp (se abre en una pestaña nueva)'>
        <FaWhatsapp
          aria-hidden='true'
          size={20}
        />
        <span className='sr-only'>Abrir WhatsApp</span>
      </a>
    </div>
  );
};

export default NavbarActions;

// 'use client';

// import { useEffect, useState } from 'react';
// import { FaWhatsapp } from 'react-icons/fa';
// import { FiExternalLink } from 'react-icons/fi'; // ícono de link externo

// const buildWhatsAppLinkGeneral = () => {
//   const base = 'https://wa.me/5215581631195';
//   const text = `Hola, ¿me puedes dar más información?`;
//   return `${base}?text=${encodeURIComponent(text)}`;
// };

// const NavbarActions = () => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <div className='ml-auto flex items-center gap-x-4'>
//       <a
//         href={buildWhatsAppLinkGeneral()}
//         target='_blank'
//         rel='noopener noreferrer'
//         aria-label='Solicitar informes por WhatsApp (se abre en una pestaña nueva)'
//         className='inline-flex items-center justify-center gap-x-2 rounded-full bg-green-600 px-6 py-2 text-lg font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700'>
//         <FaWhatsapp
//           aria-hidden='true'
//           className='flex-shrink-0'
//           size={22}
//         />
//         <span className='flex items-center gap-x-1'>
//           WhatsApp: 5581631195
//           <FiExternalLink
//             aria-hidden='true'
//             size={18}
//             className='ml-1 flex-shrink-0'
//             title='Abre en una pestaña nueva'
//           />
//         </span>
//         <span className='sr-only'>(Se abre en una pestaña nueva)</span>
//       </a>
//     </div>
//   );
// };

// export default NavbarActions;
