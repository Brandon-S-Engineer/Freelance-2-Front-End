'use client';

import { Product } from '@/types';
import Currency from '@/components/ui/currency';

import React from 'react';

import Link from 'next/link';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  // console.log('Data - Variants:', data);

  // helper para armar el link

  return (
    <div>
      <h1 className='max-[760px]:text-xl max-[1023px]:text-2xl text-3xl font-bold mb-8'>{data.name}</h1>

      <div className='mt-2 flex flex-col gap-y-4 max-w-[800px] mx-auto'>
        {/* Precio base como los variants, en negrita y alineado */}
        <div className='flex flex-col items-start mb-3'>
          <p className='text-xl max-[600px]:text-sm max-[1278px]:text-lg font-bold'>Precio base:</p>

          <div className='flex gap-x-3'>
            {data.promoPrice != null && data.promoPrice < data.price ? (
              <>
                <span className='text-xl max-[600px]:text-sm max-[1278px]:text-lg font-bold line-through text-gray-500'>
                  <Currency value={data.price} />
                </span>
                <span className='text-xl max-[600px]:text-sm max-[1278px]:text-lg font-bold text-red-600'>
                  <Currency value={data.promoPrice} />
                </span>
              </>
            ) : (
              <p className='text-xl max-[600px]:text-sm max-[1278px]:text-lg font-bold'>
                <Currency value={data.price} />
              </p>
            )}
          </div>
        </div>

        <hr className='border-gray-700 mb-2' />

        {/* Variantes */}
        {data.variants?.map((variant) => (
          <React.Fragment key={variant._id}>
            <div className='flex flex-col items-start'>
              <p className='text-xl max-[600px]:text-sm max-[1278px]:text-lg font-bold'>{variant.name}:</p>

              <div className='flex gap-x-3'>
                {variant.promoPrice != null && variant.promoPrice < variant.price ? (
                  <>
                    <span className='text-xl max-[600px]:text-sm max-[1278px]:text-lg font-bold line-through text-gray-500'>
                      <Currency value={variant.price} />
                    </span>
                    <span className='text-xl max-[600px]:text-sm max-[1278px]:text-lg font-bold text-red-600'>
                      <Currency value={variant.promoPrice} />
                    </span>
                  </>
                ) : (
                  <p className='text-xl max-[600px]:text-sm max-[1278px]:text-lg font-bold'>
                    <Currency value={variant.price} />
                  </p>
                )}
              </div>
            </div>

            <hr className='my-2 border-gray-700' />
          </React.Fragment>
        ))}
      </div>

      {/* contenedor centrado */}
      <div className='mt-10 flex flex-wrap justify-center items-center gap-x-3 gap-y-2'>
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
