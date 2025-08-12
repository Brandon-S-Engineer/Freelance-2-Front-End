// Layout rules:
// xl+  : original single row (untouched)
// lg   : single row, compact sizes so it fits (your 1085px case)
// <lg  : stacked (title + WA, then categories centered)

import Link from 'next/link';
import Container from '@/components/ui/container';
import MainNav from '@/components/main-nav';
import getCategories from '@/actions/get-categories';
import NavbarActions from '@/components/navbar-actions';
import { Category } from '@/types';

export const revalidate = 0;

const Navbar = async () => {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (e) {
    console.error('Failed to fetch categories:', e);
  }

  return (
    <div className='border-b'>
      <Container>
        {/* === Desktop (xl): keep your original row exactly === */}
        <div className='hidden xl:flex h-16 items-center px-4'>
          {/* Left: title */}
          <Link
            href='/'
            className='flex-shrink-0'>
            <p className='font-bold text-xl'>Promociones</p>
          </Link>

          {/* Middle: categories, centered */}
          <div className='flex-1 flex justify-center min-w-0'>
            {/* normal spacing at xl+ */}
            <div className='text-base'>
              <MainNav data={categories} />
            </div>
          </div>

          {/* Right: full WhatsApp pill (full size) */}
          <NavbarActions size='xl' />
        </div>

        {/* === Laptop (lg: 1024–1279): still one row, compact so everything fits === */}
        <div className='hidden min-[1041px]:flex xl:hidden h-16 items-center px-4 gap-3'>
          {/* Smaller title on lg so it doesn’t push content */}
          <Link
            href='/'
            className='flex-shrink-0'>
            <p className='font-bold text-lg'>Promociones</p>
          </Link>

          {/* Tighter categories in the middle (smaller text + gaps) */}
          <div className='flex-1 flex justify-center min-w-0'>
            <div className='text-sm'>
              <MainNav
                data={categories}
                compact
              />
            </div>
          </div>

          {/* WhatsApp pill, compact on lg */}
          <NavbarActions size='lg' />
        </div>

        {/* === Mobile/Tablet (<lg): stack under === */}
        <div className='hidden max-[1040px]:flex xl:hidden flex-col gap-2 px-4 py-3'>
          <div className='w-full flex items-center justify-between gap-3'>
            <Link
              href='/'
              className='flex-shrink-0'>
              <p className='font-bold text-2xl'>Promociones</p>
            </Link>
            <NavbarActions size='md' />
          </div>
          <div className='w-full'>
            <nav className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
              <MainNav data={categories} />
            </nav>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

// import Link from 'next/link';
// import Container from '@/components/ui/container';
// import MainNav from '@/components/main-nav';
// import getCategories from '@/actions/get-categories';
// import NavbarActions from '@/components/navbar-actions';
// import { Category } from '@/types';

// export const revalidate = 0;

// const Navbar = async () => {
//   let categories: Category[] = [];

//   try {
//     categories = await getCategories();
//   } catch (error) {
//     console.error('Failed to fetch categories:', error);
//     categories = []; // Fallback to empty categories on error
//   }

//   // const categories = await getCategories();

//   return (
//     <div className='border-b'>
//       <Container>
//         <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center'>
//           <Link
//             href='/'
//             className='ml-4 flex lg:ml-0 gap-x-2'>
//             <p className='font-bold text-xl'>Promociones</p>
//           </Link>

//           <MainNav data={categories} />

//           <NavbarActions />
//         </div>
//       </Container>
//     </div>
//   );
// };

// Navbar.displayName = 'Navbar';

// export default Navbar;
