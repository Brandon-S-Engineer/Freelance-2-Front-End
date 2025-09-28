'use client';

import { CreditCard, Wallet, HandCoins, Truck } from 'lucide-react';

type Item = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

export default function PaymentMethodsStrip() {
  const payItems: Item[] = [
    {
      icon: <Wallet className='h-6 w-6' />,
      title: 'PayPal',
    },
    {
      icon: <HandCoins className='h-6 w-6' />,
      title: 'Mercado Pago',
    },
    {
      icon: <CreditCard className='h-6 w-6' />,
      title: 'Visa / MasterCard',
    },
    {
      icon: <Truck className='h-6 w-6' />,
      title: 'Envíos gratis',
      subtitle: 'En compras mayores a $2,000',
    },
  ];

  return (
    <section
      aria-label='Nuestros métodos de pago'
      className='w-full'>
      <h2 className='text-2xl font-bold tracking-tight mb-4'>Nuestros Métodos de Pago</h2>
      <div
        className='
          mx-auto w-full border border-gray-200/70 bg-white/90
          backdrop-blur supports-[backdrop-filter]:bg-white/80
          px-3 sm:px-4
        '>
        <ul
          className='
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            divide-y sm:divide-y-0 sm:divide-x divide-gray-200/70
          '>
          {payItems.map((item, i) => (
            <li
              key={i}
              className='flex items-center gap-3 px-4 py-3 sm:py-4'>
              <span
                className='
                  inline-flex h-10 w-10 flex-none items-center justify-center
                  rounded-full bg-slate-900 text-white
                '
                aria-hidden='true'>
                {item.icon}
              </span>

              <div className='min-w-0'>
                <p className='truncate text-sm font-semibold text-slate-900'>{item.title}</p>
                {item.subtitle && <p className='truncate text-xs text-slate-600'>{item.subtitle}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
