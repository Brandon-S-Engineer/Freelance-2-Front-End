'use client';

import { Product } from '@/types';
import Currency from '@/components/ui/currency';
import { FaWhatsapp } from 'react-icons/fa';

import React from 'react';

import Link from 'next/link';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  // console.log('Data - Variants:', data);

  // helper para armar el link
  const buildWhatsAppLink = (productName: string) => {
    const base = 'https://wa.me/5215581631195';
    const text = `Hola, quiero informes sobre: ${productName}`;
    return `${base}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div>
      <h1 className='text-2xl lg:text-4xl max-[760px]:text-xl font-bold mb-8'>{data.name}</h1>

      <div className='mt-3 flex flex-col gap-y-4'>
        {/* Precio base como los variants, en negrita y alineado */}
        <div className='flex justify-between items-center mb-5'>
          <p className='text-xl lg:text-2xl max-[760px]:text-lg font-bold'>Precio base:</p>

          {data.promoPrice != null && data.promoPrice < data.price ? (
            <div className='flex items-center gap-x-3'>
              <span className='text-xl lg:text-2xl max-[760px]:text-lg font-bold line-through text-gray-500'>
                <Currency value={data.price} />
              </span>
              <span className='text-xl lg:text-2xl max-[760px]:text-lg font-bold text-red-600'>
                <Currency value={data.promoPrice} />
              </span>
            </div>
          ) : (
            <p className='text-xl lg:text-2xl max-[760px]:text-lg font-bold'>
              <Currency value={data.price} />
            </p>
          )}
        </div>

        <hr className='border-gray-700' />

        {/* Variantes */}
        {data.variants?.map((variant) => (
          <React.Fragment key={variant._id}>
            <div className='flex justify-between items-center'>
              <p className='text-xl lg:text-2xl max-[760px]:text-lg font-bold'>{variant.name}:</p>

              {variant.promoPrice != null && variant.promoPrice < variant.price ? (
                <div className='flex items-center gap-x-3'>
                  <span className='text-xl lg:text-2xl max-[760px]:text-lg font-bold line-through text-gray-500'>
                    <Currency value={variant.price} />
                  </span>
                  <span className='text-xl lg:text-2xl max-[760px]:text-lg font-bold text-red-600'>
                    <Currency value={variant.promoPrice} />
                  </span>
                </div>
              ) : (
                <p className='text-xl lg:text-2xl max-[760px]:text-lg font-bold'>
                  <Currency value={variant.price} />
                </p>
              )}
            </div>

            <hr className='my-4 border-gray-700' />
          </React.Fragment>
        ))}
      </div>

      {/* contenedor centrado */}
      <div className='mt-10 flex flex-wrap justify-center items-center gap-x-3 gap-y-2'>
        {/* WhatsApp informes */}
        <a
          href={buildWhatsAppLink(data.name)}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Contactar por WhatsApp para informes'
          className='inline-flex items-center justify-center gap-x-2 rounded-full bg-green-600 px-6 py-2 text-lg font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700'>
          {/* icono un poco más grande para claridad sin exagerar */}
          <FaWhatsapp
            aria-hidden='true'
            className='flex-shrink-0'
            size={22}
          />
          Apártalo / Informes
        </a>

        {/* ficha técnica */}
        {data.specPdfUrl && (
          <Link
            href={data.specPdfUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Ver ficha técnica en PDF'
            className='inline-flex items-center justify-center gap-x-2 rounded-full bg-black px-6 py-2 text-lg font-semibold text-white transition-all duration-150 hover:brightness-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'>
            Ver ficha técnica
          </Link>
        )}
      </div>
    </div>
  );
};

export default Info;
