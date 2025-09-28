'use client';

import { ShieldCheck, BadgeCheck, Undo2, Star } from 'lucide-react';

type Item = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

const items: Item[] = [
  {
    icon: <ShieldCheck className='h-6 w-6' />,
    title: '12 Meses de Garantía',
  },
  {
    icon: <BadgeCheck className='h-6 w-6' />,
    title: 'Productos Certificados',
  },
  {
    icon: <Undo2 className='h-6 w-6' />,
    title: 'Devolución gratis por 30 días',
  },
  {
    icon: <Star className='h-6 w-6' />,
    title: 'Excelente',
    subtitle: 'Trustpilot',
  },
];

export default function FeatureStrip() {
  return (
    <section
      aria-label='Purchase guarantees and store assurances'
      className='w-full'>
      <div
        className='
          mx-auto w-full border border-gray-200/70 bg-white
          px-3 sm:px-4
        '>
        <ul
          className='
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            divide-y sm:divide-y-0 sm:divide-x divide-gray-200/70
          '>
          {items.map((item, i) => (
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
