import getBillboard from '@/actions/get-billboard';
import Container from '@/components/ui/container';
import Billboard from '@/components/billboard';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/product-list';

export const revalidate = 0;

const getMesActualEnEspañol = () => {
  const mes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());
  return mes.charAt(0).toUpperCase() + mes.slice(1);
};

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const rawBillboard = await getBillboard('');
  const billboard = Array.isArray(rawBillboard) ? rawBillboard[0] : rawBillboard;

  const titulo = `Promociones ${getMesActualEnEspañol()}`;

  return (
    <Container>
      <div className=''>
        <Billboard data={billboard} />

        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mb-10'>
          <ProductList
            title={titulo}
            items={products}
          />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
