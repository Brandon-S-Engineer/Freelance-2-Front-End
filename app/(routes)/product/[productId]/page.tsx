import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import Gallery from '@/components/gallery';
import Info from '@/components/info';

import TrackRecent from '@/components/TrackRecent';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  if (!product) {
    return <div className='p-10'>Product not found</div>;
  }

  const primaryImage = Array.isArray(product.images) ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url ?? '') : '';

  const suggestedProducts = product?.categoryId?._id ? await getProducts({ categoryId: product.categoryId._id }) : [];

  return (
    <div className='bg-white'>
      <TrackRecent
        product={{
          id: product.id,
          title: product.name,
          price: product.price,
          imageUrl: primaryImage,
          href: `/product/${product.id}`,
        }}
      />

      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <Gallery images={product.images} />

            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              <Info data={product} />
            </div>
          </div>

          <hr className='my-10' />

          {/* Aqui descripcion del auto */}
          <ProductList
            title='Artículos relacionados'
            items={suggestedProducts}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
