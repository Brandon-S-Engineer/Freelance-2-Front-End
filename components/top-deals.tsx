'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';

// Minimal product contract for this section
export type DealProduct = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  href: string;
  discountPct?: number; // e.g., 19 => "19%"
  tag?: string; // e.g., "Oferta"
};

type UnknownRecord = Record<string, unknown>;
const isObj = (v: unknown): v is UnknownRecord => !!v && typeof v === 'object';
const isDeal = (v: unknown): v is DealProduct => isObj(v) && typeof v.id === 'string' && typeof v.title === 'string' && typeof v.href === 'string' && typeof v.imageUrl === 'string' && typeof (v as UnknownRecord).price === 'number';
const isDealArray = (v: unknown): v is DealProduct[] => Array.isArray(v) && v.every(isDeal);

// --- Custom animation styles for slow pulse ---
const style = (
  <style
    jsx
    global>{`
    @keyframes pulseSlow {
      0%,
      100% {
        transform: scale(1);
        opacity: 0.4;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.6;
      }
    }
    .animate-pulse-slow {
      animation: pulseSlow 25s ease-in-out infinite;
    }
    .delay-500 {
      animation-delay: 3s;
    }
  `}</style>
);

function useCountdownToMidnight() {
  const [target, setTarget] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // Compute end-of-day client-side only to avoid SSR/client drift
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    setTarget(d.getTime());
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (target == null || now == null) return null;

  const diff = Math.max(0, target - now);
  const hours = String(Math.floor(diff / 3_600_000)).padStart(2, '0');
  const minutes = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, '0');
  const seconds = String(Math.floor((diff % 60_000) / 1000)).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);
}

// --- Dummy seed (used if fetch fails or returns empty) ---
const DUMMY: DealProduct[] = [
  {
    id: 'px248',
    title: 'Pixio PX248 Wave Gaming Monitor 24" - White - Excelente',
    price: 2299,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900&auto=format&fit=crop',
    href: '/product/px248',
    discountPct: 19,
    tag: 'Oferta',
  },
  {
    id: 'px278',
    title: 'Pixio PX278 Wave Gaming Monitor 27" - Pink - Excelente',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1638803782506-d975a6809f43?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/product/px278',
    discountPct: 15,
    tag: 'Oferta',
  },
  {
    id: 'iphone16e',
    title: 'Apple iPhone 13 - 128GB - Desbloqueado - Excelente',
    price: 8999,
    imageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/product/iphone13-128',
    discountPct: 20,
    tag: 'Oferta',
  },
];

async function fetchDeals(endpoint: string, signal?: AbortSignal): Promise<DealProduct[]> {
  const res = await fetch(endpoint, { signal, cache: 'no-store' });
  if (!res.ok) throw new Error('bad status');
  const json: unknown = await res.json();
  let arr: DealProduct[] = [];
  if (isDealArray(json)) {
    arr = json;
  } else if (isObj(json) && isDealArray((json as UnknownRecord).items)) {
    arr = (json as UnknownRecord).items as DealProduct[];
  }
  return arr.filter(Boolean).slice(0, 3);
}

export default function TopDeals3({
  title = 'Ofertas Destacadas de Hoy',
  ctaHref = '/deals',
  endpoint = '/api/deals/top3', // backend later; safe to change
}: {
  title?: string;
  ctaHref?: string;
  endpoint?: string;
}) {
  const countdown = useCountdownToMidnight();
  const [products, setProducts] = useState<DealProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ctl = new AbortController();
    (async () => {
      try {
        const data = await fetchDeals(endpoint, ctl.signal);
        setProducts(data.length ? data : DUMMY);
      } catch {
        setProducts(DUMMY);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctl.abort();
  }, [endpoint]);

  const list = (products ?? DUMMY).slice(0, 3);

  return (
    <section className='mx-auto bg-white pt-4 pb-6 pl-4 pr-4'>
      <h2 className='text-2xl font-bold text-slate-900 mb-4'>{title}</h2>

      <div className='grid grid-cols-1 md:grid-cols-[minmax(280px,1fr)_2fr] gap-4'>
        {/* Left Promo Card */}
        <div className='relative overflow-hidden rounded-2xl bg-slate-900 text-white p-6 flex flex-col justify-between min-h-[260px]'>
          <div className='flex items-center gap-2 text-sm font-semibold uppercase tracking-wide opacity-90'>
            <Flame className='h-6 w-6' />
            Ahorra hasta 70%
          </div>
          <div>
            <p className='text-xl sm:text-2xl font-semibold'>Ofertas de hoy</p>
            {mounted && countdown && (
              <p
                suppressHydrationWarning
                className='mt-2 text-3xl sm:text-4xl font-extrabold tabular-nums'>
                {countdown}
              </p>
            )}
          </div>
          <div className='mt-4'>
            <Link
              href={ctaHref}
              className='inline-flex items-center gap-2 rounded-md bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white'>
              Ver todas las ofertas <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          {/* subtle circles bg */}
          <div className='pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 animate-pulse-slow' />
          <div className='pointer-events-none absolute -right-6 top-24 h-40 w-40 rounded-full bg-white/10 animate-pulse-slow delay-500' />
        </div>

        {/* Right products (exactamente 3) */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {(loading ? Array.from({ length: 3 }) : list).map((p, idx) => (
            <article
              key={loading ? idx : (p as DealProduct).id}
              className='relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
              {/* Rank chip */}
              <div className='absolute -right-2 -top-2 h-8 w-8 rounded-full bg-slate-900 text-white text-xs font-bold grid place-items-center shadow'>#{idx + 1}</div>

              {loading ? (
                <div className='animate-pulse'>
                  <div className='mb-3 h-5 w-24 rounded bg-rose-100/60' />
                  <div className='flex items-center justify-center'>
                    <div className='h-32 w-40 rounded bg-slate-100' />
                  </div>
                  <div className='mt-3 h-4 w-3/4 rounded bg-slate-100' />
                  <div className='mt-2 h-6 w-24 rounded bg-slate-200' />
                </div>
              ) : (
                <>
                  {/* Discount tags */}
                  {((p as DealProduct).discountPct != null || (p as DealProduct).tag) && (
                    <div className='mb-3 flex items-center gap-2'>
                      {typeof (p as DealProduct).discountPct === 'number' && <span className='rounded-md bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700'>{(p as DealProduct).discountPct}% dto</span>}
                      {(p as DealProduct).tag && <span className='rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800'>{(p as DealProduct).tag}</span>}
                    </div>
                  )}

                  <Link
                    href={(p as DealProduct).href}
                    className='block'>
                    <div className='flex items-center justify-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={(p as DealProduct).imageUrl}
                        alt={(p as DealProduct).title}
                        className='h-32 object-contain'
                        loading='lazy'
                      />
                    </div>
                    <h3 className='mt-3 line-clamp-2 text-sm font-medium text-slate-900'>{(p as DealProduct).title}</h3>
                  </Link>

                  <p className='mt-3 text-lg font-extrabold text-slate-900'>{formatCurrency((p as DealProduct).price)}</p>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
      {style}
    </section>
  );
}
