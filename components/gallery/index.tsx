'use client';

import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { Image as ImageType } from '@/types';
import GalleryTab from './gallery-tab';

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  // Normalize images to ensure each has id and url
  const items = images.map((image, idx) => {
    if (typeof image === 'string') {
      return { id: `img-${idx}`, url: image };
    } else {
      return { id: image.id ?? `img-${idx}`, url: image.url };
    }
  });

  return (
    <Tab.Group
      as='div'
      className='flex flex-col'>
      <Tab.Panels className='w-full'>
        {items.map((image) => (
          <Tab.Panel key={image.id}>
            <div
              className='relative w-full overflow-hidden rounded-lg'
              style={{ paddingTop: '66.66%' }} // 3:2 ratio; ajustar a 75% para 4:3 o 100% para cuadrado
            >
              <Image
                fill
                src={image.url || '/placeholder.png'}
                alt='Gallery image'
                className='object-contain object-center transition-opacity duration-300 ease-in-out'
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>

      {/* === Arreglo 2: thumbnails balanceados ===  */}
      <div className='mx-auto w-full sm:block lg:max-w-none mt-4'>
        <Tab.List className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
          {items.map((image) => (
            <GalleryTab
              key={image.id}
              image={image}
            />
          ))}
        </Tab.List>
      </div>
    </Tab.Group>
  );
};

export default Gallery;
