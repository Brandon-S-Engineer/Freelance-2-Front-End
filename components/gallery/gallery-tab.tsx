import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/types';

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className='group relative flex cursor-pointer items-center justify-center rounded-md bg-white w-24 h-16 focus:outline-none px-[2px]'>
      {({ selected }) => (
        <div className='relative w-full h-full'>
          {/* imagen centrada sin recortar */}
          <div className='absolute inset-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center'>
            <Image
              fill
              src={image.url}
              alt=''
              sizes='6rem'
              className='object-contain'
              priority={false}
              draggable={false}
            />
          </div>

          {/* borde de selección y hover usando pseudo-elementos Tailwind */}
          <span
            aria-hidden='true'
            className={cn(
              'absolute inset-0 rounded-md pointer-events-none transition',
              selected
                ? "after:content-[''] after:absolute after:inset-0 after:rounded-md after:border-[3px] after:border-black"
                : "group-hover:after:content-[''] group-hover:after:absolute group-hover:after:inset-0 group-hover:after:rounded-md group-hover:after:border-[2px] group-hover:after:border-[rgba(0,0,0,0.35)]"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;

// import Image from 'next/image';
// import { Tab } from '@headlessui/react';

// import { cn } from '@/lib/utils';
// import { Image as ImageType } from '@/types';

// interface GalleryTabProps {
//   image: ImageType;
// }

// const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
//   return (
//     <Tab className='relative flex cursor-pointer items-center justify-center rounded-md bg-white w-24 h-24'>
//       {({ selected }) => (
//         <div>
//           <span className='absolute h-full w-full inset-0 overflow-hidden rounded-md'>
//             <Image
//               fill
//               src={image.url}
//               alt=''
//               className='object-cover object-center'
//             />
//           </span>

//           <span className={cn('absolute inset-0 rounded-md ring-2 ring-offset-2', selected ? 'ring-black' : 'ring-transparent')} />
//         </div>
//       )}
//     </Tab>
//   );
// };

// export default GalleryTab;
