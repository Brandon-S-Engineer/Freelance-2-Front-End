import getBillboard from '@/actions/get-billboard';
import Container from '@/components/ui/container';

import HomeBillboardCarousel from '@/components/home-billboard-carousel';
import FeatureStrip from '@/components/feature-strip';

import RecentlyViewed from '@/components/recently-viewed';
import PaymentMethodsStrip from '@/components/ui/paymentMethodStrip';
import TopDeals3 from '@/components/top-deals';

import PromotionsBoard from '@/components/promotions-board';

export const revalidate = 0;

type BillboardType = {
  id: string;
  label: string;
  imageUrl: string;
  // add other fields your <Billboard /> component requires
};

const HomePage = async () => {
  // Ensure we have an array of billboards
  const raw = await getBillboard(''); // your current call
  const billboards = Array.isArray(raw) ? raw : raw ? [raw] : [];

  return (
    <Container>
      <div className=''>
        <HomeBillboardCarousel items={billboards as BillboardType[]} />

        {/* Trust/benefits strip */}
        <div className='px-5 mt-1 mb-8'>
          <FeatureStrip />
        </div>
        <div className='px-5 my-8'>
          <RecentlyViewed />
        </div>
        <div className='px-5 mt-10 mb-10'>
          <TopDeals3 />
        </div>
        <div className='flex flex-col gap-y-8 px-5 mb-10'>
          <PromotionsBoard />
        </div>
        <div className='px-5 mt-1 mb-10'>
          <PaymentMethodsStrip />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
