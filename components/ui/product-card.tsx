'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import Currency from '@/components/ui/currency';

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'>
      {/* Images and Icons */}
      <div className='rounded-xl bg-gray-100 relative'>
        <Image
          src={data?.images && data.images.length > 0 ? (typeof data.images[0] === 'string' ? data.images[0] : data.images[0].url) : 'https://via.placeholder.com/300'}
          alt='Image'
          width={400}
          height={250}
          className='w-full h-auto object-contain rounded-md'
        />
      </div>

      {/* Description */}
      <div>
        <p className='font-semibold text-lg'>{data.name}</p>

        <p className='text-sm text-gray-500'>{data.category?.name}</p>
      </div>

      {/* Price */}

      <div className='flex items-center space-x-2'>
        {data?.promoPrice != null && data.promoPrice < data.price ? (
          <>
            <span className='text-gray-500 line-through'>
              <Currency value={data.price} />
            </span>
            <span className='text-red-600 font-semibold'>
              <Currency value={data.promoPrice} />
            </span>
          </>
        ) : (
          <>
            <span className='text-gray-600 mr-1'>desde</span>
            <Currency value={data.price} />
          </>
        )}
      </div>

      {/* <div className='flex items-center '>
        <span className='text-gray-600 mr-1'>desde</span>
        <Currency value={data?.price} />
      </div> */}
    </div>
  );
};

export default ProductCard;
