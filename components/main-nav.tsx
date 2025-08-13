'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';

interface Category {
  id?: string;
  _id?: string;
  name: string;
}

interface MainNavProps {
  data: Category[];
  className?: string;
}

export default function MainNav({ data, className }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('mx-6 flex flex-wrap justify-center items-center gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3', className)}>
      {data.map((c) => {
        const id = c.id ?? c._id; // ✅ fallback for Mongo
        if (!id) return null; // ✅ skip invalid to avoid /undefined
        const href = `/category/${id}`;
        const active = pathname === href;

        return (
          <Fragment key={id}>
            {/* force new row starting at "Mitsubishi" on ≤562px */}
            {c.name === 'Mitsubishi' && <div className='w-full max-[562px]:block hidden' />}

            <Link
              href={href}
              className={cn('text-sm font-medium transition-colors hover:text-black', active ? 'text-black' : 'text-neutral-500')}>
              {c.name}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}

// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// import { cn } from '@/lib/utils';
// import { Category } from '@/types';

// // Extend Category to include optional MongoDB _id
// type NavCategory = Category & { _id?: string };

// interface MainNavProps {
//   data: Category[];
// }

// const MainNav: React.FC<MainNavProps> = ({ data }) => {
//   const pathname = usePathname();

//   const routes = (data as NavCategory[]).map((route) => {
//     const catId = route._id ?? route.id;
//     return {
//       href: `/category/${catId}`,
//       label: route.name,
//       active: pathname === `/category/${catId}`,
//     };
//   });

//   return (
//     <nav className='mx-6 flex flex-wrap justify-center items-center gap-x-4 lg:gap-x-6 gap-y-4 lg:gap-y-3'>
//       {routes.map((route) => (
//         <>
//           {route.label === 'Category-here' && <div className='w-full max-[562px]:block hidden'></div>}
//           <Link
//             key={route.href}
//             href={route.href}
//             className={cn('text-sm font-medium transition-colors hover:text-black', route.active ? 'text-black' : 'text-neutral-500')}>
//             {route.label}
//           </Link>
//         </>
//       ))}
//     </nav>
//   );
// };

// export default MainNav;
