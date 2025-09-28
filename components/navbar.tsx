import Link from 'next/link';
import Container from '@/components/ui/container';
import MainNav from '@/components/main-nav';
import getCategories from '@/actions/get-categories';
import NavbarActions from '@/components/navbar-actions';
import { Category } from '@/types';
import { GiOpenTreasureChest } from 'react-icons/gi';

import DepartmentsMenu from './departments-menu';

// Helper to get current month in Spanish, capitalized
const getMesActualEnEspañol = () => {
  const mes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());
  return mes.charAt(0).toUpperCase() + mes.slice(1);
};

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
        <div className='hidden xl:flex h-16 pt-4 items-center px-4'>
          {/* Left: title */}
          <Link
            href='/'
            className='flex-shrink-0 justify-center'>
            <p className='font-bold text-xl inline-flex items-center gap-1 relative top-[2px]'>
              <GiOpenTreasureChest
                size={32}
                className='text-cyan-600'
                aria-hidden='true'
              />
              PrimeFinds
            </p>
          </Link>

          <div className='flex-1 flex justify-center min-w-0'>
            <form
              method='GET'
              action='/search'
              className='max-w-[42rem] w-full'>
              <div className='relative'>
                <input
                  type='text'
                  name='q'
                  placeholder='Buscar por modelo, color, marca...'
                  className='w-full rounded-sm bg-gray-100 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-600 placeholder:opacity-100 border border-slate-900'
                />
                <button
                  type='submit'
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                  aria-label='Buscar'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <circle
                      cx='11'
                      cy='11'
                      r='8'></circle>
                    <line
                      x1='21'
                      y1='21'
                      x2='16.65'
                      y2='16.65'></line>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right: full WhatsApp pill (full size) */}
          <NavbarActions />
        </div>

        {/* === Laptop (lg: 1024–1279): still one row, compact so everything fits === */}
        <div className='hidden min-[1193px]:flex xl:hidden h-16 items-center px-4 gap-3'>
          <Link
            href='/'
            className='flex-shrink-0'>
            <p className='font-bold text-lg inline-flex items-center gap-1 relative top-[2px]'>
              <GiOpenTreasureChest
                size={30}
                className='text-cyan-600'
                aria-hidden='true'
              />
              PrimeFinds
            </p>
          </Link>

          <div className='flex-1 flex justify-center min-w-0'>
            <form
              method='GET'
              action='/search'
              className='max-w-[36rem] w-full'>
              <div className='relative'>
                <input
                  type='text'
                  name='q'
                  placeholder='Buscar por modelo, color, marca...'
                  className='w-full rounded-sm bg-gray-100 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-600 placeholder:opacity-100'
                />
                <button
                  type='submit'
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                  aria-label='Buscar'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <circle
                      cx='11'
                      cy='11'
                      r='8'></circle>
                    <line
                      x1='21'
                      y1='21'
                      x2='16.65'
                      y2='16.65'></line>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <NavbarActions />
        </div>

        <div className='hidden min-[1193px]:block lg:border-t mb-3 pt-3'>
          <div className='mx-auto w-full max-w-[90rem] px-5 bg-slate-800'>
            <nav className='flex justify-start'>
              <DepartmentsMenu />
              <MainNav data={categories} />
              {/* Here */}
            </nav>
          </div>
        </div>

        {/* === Mobile/Tablet (<lg): stack under === */}
        <div className='hidden max-[1192px]:flex xl:hidden flex-col gap-2 px-4 py-3'>
          <div className='flex justify-center'>
            <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 max-w-max max-[1040px]:mb-3 max-[1192px]:mb-3'>
              <Link
                href='/'
                className='flex-shrink-0'>
                <p className='w-full font-bold text-2xl max-[1040px]:mr-6 max-[1040px]:pb-1 max-[1192px]:mr-6 max-[1192px]:pb-1 text-center inline-flex items-center gap-1 justify-center relative top-[0px]'>
                  <GiOpenTreasureChest
                    size={27}
                    className='text-cyan-600'
                    aria-hidden='true'
                  />
                  <span className='hidden max-[483px]:inline'>PrimeFinds {getMesActualEnEspañol()}</span>
                  <span className='inline max-[483px]:hidden'>PrimeFinds</span>
                </p>
              </Link>
              <NavbarActions />
            </div>
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
