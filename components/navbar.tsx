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
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    categories = []; // Fallback to empty categories on error
  }

  // const categories = await getCategories();

  return (
    <div className='border-b'>
      <Container>
        <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center'>
          <Link
            href='/'
            className='ml-4 flex lg:ml-0 gap-x-2'>
            <p className='font-bold text-xl'>Promociones</p>
          </Link>

          <MainNav data={categories} />

          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
