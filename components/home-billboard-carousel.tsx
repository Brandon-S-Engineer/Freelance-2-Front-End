'use client';

import { useRef, useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import Billboard from '@/components/billboard';

type BillboardType = {
  id: string;
  label: string;
  imageUrl: string;
  [key: string]: unknown;
};

const keyFor = (b: BillboardType, i: number) => (b && typeof b.id === 'string' && b.id.trim() ? `bb-${b.id}-${i}` : `bb-${i}`);

export default function HomeBillboardCarousel({ items }: { items: BillboardType[] }) {
  // Keep the plugin instance in a ref
  const autoplay = useRef(
    Autoplay({ delay: 450000, stopOnInteraction: false }) // don't stop permanently on interaction
  );

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (!items || items.length === 0) return null;

  return (
    <div className=''>
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[autoplay.current]}
        className='relative w-full '
        setApi={setApi}
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}>
        <CarouselContent>
          {items.map((b: BillboardType, index: number) => (
            <CarouselItem
              key={keyFor(b, index)}
              className='basis-full'>
              <Billboard data={b} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 z-10'>
          {items.map((b: BillboardType, index: number) => (
            <button
              key={keyFor(b, index)}
              onClick={() => api?.scrollTo(index)}
              className={`h-3 w-3 rounded-full transition-colors ${selectedIndex === index ? 'bg-black/100' : 'bg-black/20'}`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>

        <CarouselPrevious
          className='
              absolute left-3 md:left-5 top-1/2 -translate-y-1/2
              z-10 h-12 w-12 rounded-full border border-white/20
              bg-black/50 text-white shadow-2xl
              hover:bg-black/70 focus:bg-black/80 focus-visible:bg-black/80
              focus:outline-none focus:ring-2 focus:ring-white/50
              flex items-center justify-center
            '
        />
        <CarouselNext
          className='
              absolute right-3 md:right-5 top-1/2 -translate-y-1/2
              z-10 h-12 w-12 rounded-full border border-white/20
              bg-black/50 text-white shadow-2xl
              hover:bg-black/70 focus:bg-black/80 focus-visible:bg-black/80
              focus:outline-none focus:ring-2 focus:ring-white/50
              flex items-center justify-center
            '
        />
      </Carousel>
    </div>
  );
}
