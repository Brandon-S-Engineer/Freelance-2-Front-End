'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgePercent, Gift, TicketPercent, Clock, Sparkles, Layers } from 'lucide-react';

export type Promotion = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  imageUrl?: string; // optional decorative image
  badge?: string; // e.g., "-20%", "Nuevo", "Hot"
  tone?: 'slate' | 'sky' | 'rose' | 'amber' | 'emerald' | 'violet' | 'zinc';
  layout?: 'hero' | 'wide' | 'tall' | 'card' | 'chip';
  expiresAt?: string; // ISO, optional countdown
  group?: string; // grouping label (e.g., Smartphones, Apple, Audio, etc.)
  kind?: 'deal' | 'category'; // used to force deals on right rail
};

export type CollectionBanner = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  imageUrl: string;
  tone?: 'slate' | 'sky' | 'rose' | 'amber' | 'emerald' | 'violet' | 'zinc';
};

// Dummy seed so you can visualize immediately
const DUMMY: Promotion[] = [
  {
    id: 'hero-deal',
    title: 'Mega Ofertas de la Semana',
    subtitle: 'Hasta 30% en reacondicionados Premium',
    href: '/deals',
    badge: 'Limitado',
    tone: 'violet',
    layout: 'hero',
    // expiresAt will be computed client-side to avoid SSR/client drift
  },
  {
    id: 'deal-iphone13',
    title: 'iPhone 13 desde $8,999',
    subtitle: 'Ahorra hasta 20%',
    href: '/deals/iphone-13',
    badge: '-20%',
    tone: 'sky',
    layout: 'wide',
    group: 'Smartphones',
    kind: 'deal',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'deal-monitores',
    title: 'Monitores Gaming',
    subtitle: '-19% esta semana',
    href: '/deals/monitores',
    badge: '-19%',
    tone: 'zinc',
    layout: 'wide',
    group: 'Cómputo & Monitores',
    kind: 'deal',
    imageUrl: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=1200&auto=format&fit=crop',
  },
  { id: 'phones', title: 'iPhone & Samsung', subtitle: 'Descuentos diarios', href: '/c/smartphones', badge: '-25%', tone: 'sky', layout: 'card', group: 'Smartphones', kind: 'category', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop' },
  { id: 'mac', title: 'MacBook Certificados', subtitle: 'Garantía 12 meses', href: '/c/macbook/pro', badge: 'Top', tone: 'emerald', layout: 'card', group: 'Apple', kind: 'category', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ipad', title: 'iPad Pro / Air', subtitle: 'Desde $3,999', href: '/c/ipad/pro', tone: 'amber', layout: 'card', group: 'Apple', kind: 'category', imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop' },
  {
    id: 'audio',
    title: 'Audio & Bocinas',
    subtitle: 'Hasta 40%',
    href: '/c/bocinas',
    badge: 'Hot',
    tone: 'rose',
    layout: 'card',
    group: 'Audio & Wearables',
    kind: 'category',
    imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/homepod-mini-select-202210?wid=1080&hei=880&fmt=jpeg&qlt=90&.v=K2c3bEwyaWVDeDZkdHpLbHkwcGVSam9RVGpuTmx0T1h4bDIxVHQ5RDRIRkJPeDF2ZVVaSE5jWEZxb1JBMHNSQkJkRlpCNVhYU3AwTldRQldlSnpRa0NKOUJGbUVtUkw5S2dEY1BnYXVWR2c',
  },
  { id: 'gaming', title: 'Gaming Zone', subtitle: 'Consolas y Monitores', href: '/c/videogames', tone: 'zinc', layout: 'card', group: 'Gaming', kind: 'category', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop' },
  { id: 'smartwatch', title: 'Smartwatch', subtitle: 'Apple Watch y más', href: '/c/smartwatch', badge: '-15%', tone: 'slate', layout: 'chip', group: 'Audio & Wearables' },
  { id: 'drones', title: 'Drones & Cámaras', subtitle: 'Vuela al mejor precio', href: '/c/drones', tone: 'sky', layout: 'chip', group: 'Cámaras & Drones' },
  { id: 'robot', title: 'Robot Vacuum', subtitle: 'Casa impecable', href: '/c/robot-vacuum', tone: 'emerald', layout: 'chip', group: 'Smart Home & Hogar' },
  { id: 'monitores', title: 'Monitores', subtitle: 'Gaming / Trabajo', href: '/c/monitores', tone: 'violet', layout: 'chip', group: 'Computo & Monitores' },
];

const COLLECTIONS_DUMMY: CollectionBanner[] = [
  { id: 'col-back-to-school', title: 'Back to School', subtitle: 'Laptops, iPads y accesorios', href: '/c/back-to-school', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', tone: 'emerald' },
  { id: 'col-gaming-week', title: 'Gaming Week', subtitle: 'Consolas, monitores y headsets', href: '/c/gaming', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop', tone: 'violet' },
  { id: 'col-smart-home', title: 'Smart Home', subtitle: 'Robots y bocinas inteligentes', href: '/c/smart-home', imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop', tone: 'sky' },
];

function useCountdown(iso?: string) {
  const target = useMemo(() => (iso ? new Date(iso).getTime() : null), [iso]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!target) return;
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);

  if (!target || now === null) return null;

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const rem = diff % 86_400_000;
  const h = String(Math.floor(rem / 3_600_000)).padStart(2, '0');
  const m = String(Math.floor((rem % 3_600_000) / 60_000)).padStart(2, '0');
  const s = String(Math.floor((rem % 60_000) / 1000)).padStart(2, '0');
  return days > 0 ? `${days}d ${h}:${m}:${s}` : `${h}:${m}:${s}`;
}

function toneClasses(t: Promotion['tone'] = 'slate') {
  switch (t) {
    case 'sky':
      return { bg: 'from-sky-500 to-sky-600', pill: 'bg-sky-900/10 text-sky-900', glow: 'shadow-[0_0_0_1px_rgba(14,165,233,0.15)]' };
    case 'rose':
      return { bg: 'from-rose-500 to-rose-600', pill: 'bg-rose-900/10 text-rose-900', glow: 'shadow-[0_0_0_1px_rgba(244,63,94,0.15)]' };
    case 'amber':
      return { bg: 'from-amber-500 to-amber-600', pill: 'bg-amber-900/10 text-amber-900', glow: 'shadow-[0_0_0_1px_rgba(245,158,11,0.15)]' };
    case 'emerald':
      return { bg: 'from-emerald-500 to-emerald-600', pill: 'bg-emerald-900/10 text-emerald-900', glow: 'shadow-[0_0_0_1px_rgba(16,185,129,0.15)]' };
    case 'violet':
      return { bg: 'from-violet-500 to-violet-600', pill: 'bg-violet-900/10 text-violet-900', glow: 'shadow-[0_0_0_1px_rgba(139,92,246,0.15)]' };
    case 'zinc':
      return { bg: 'from-zinc-600 to-zinc-800', pill: 'bg-zinc-900/10 text-zinc-900', glow: 'shadow-[0_0_0_1px_rgba(24,24,27,0.15)]' };
    default:
      return { bg: 'from-slate-600 to-slate-800', pill: 'bg-slate-900/10 text-slate-900', glow: 'shadow-[0_0_0_1px_rgba(15,23,42,0.15)]' };
  }
}

export default function PromotionsBoard({ title = 'Promociones que no te puedes perder', endpoint }: { title?: string; endpoint?: string }) {
  const [promos, setPromos] = useState<Promotion[] | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        if (!endpoint) throw new Error('no-endpoint');
        const res = await fetch(endpoint, { cache: 'no-store' });
        if (!res.ok) throw new Error('bad-status');
        const json = (await res.json()) as Promotion[];
        if (!ignore) setPromos(Array.isArray(json) && json.length ? json : DUMMY);
      } catch {
        if (!ignore) setPromos(DUMMY);
      } finally {
        // (loading state removed)
      }
    })();
    return () => {
      ignore = true;
    };
  }, [endpoint]);

  const data = promos ?? DUMMY;
  const hero = useMemo(() => data.find((p) => p.layout === 'hero') ?? null, [data]);
  const heroExpiresAt = useMemo(() => {
    if (!hero) return undefined;
    if (hero.expiresAt) return hero.expiresAt;
    // Compute end-of-week (Monday 23:59:59.999) client-side only for the dummy hero
    if (mounted && hero.id === 'hero-deal') {
      const d = new Date();
      const day = d.getDay(); // 0 = Sunday, 1 = Monday, ...
      const daysToMonday = (8 - day) % 7; // distance to next Monday (0 if already Monday)
      d.setDate(d.getDate() + daysToMonday);
      d.setHours(23, 59, 59, 999); // end of Monday night
      return d.toISOString();
    }
    return undefined;
  }, [hero, mounted]);
  const countdown = useCountdown(heroExpiresAt);

  return (
    <section className=''>
      <div className='mb-4 flex items-end justify-between gap-3'>
        <h2 className='text-2xl font-bold text-slate-900'>{title}</h2>
        <Link
          href='/deals'
          className='inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline'>
          Ver más promociones <ArrowRight className='h-4 w-4' />
        </Link>
      </div>

      {(() => {
        const rest = data.filter((p) => p !== hero);
        const looksDeal = (p: Promotion) => p.kind === 'deal' || /%|dto|descuento/i.test(p.badge ?? '') || !!p.expiresAt;
        const dealsWide: Promotion[] = rest.filter((p) => p.layout === 'wide' && looksDeal(p)).slice(0, 2);
        const cards: Promotion[] = rest.filter((p) => p.layout === 'card' || p.layout === 'tall');
        const chips: Promotion[] = rest.filter((p) => p.layout === 'chip');
        // Promote chips into cards so "Destacados por categoría" tenga más elementos
        const catCards: Promotion[] = [...cards, ...chips.map((c) => ({ ...c, layout: 'card' as const }))];
        while (dealsWide.length < 2) {
          const fallback = rest.find((p) => p.layout === 'wide' && !dealsWide.includes(p));
          if (fallback) dealsWide.push(fallback);
          else if (cards.length) dealsWide.push(cards.shift()!);
          else break;
        }

        return (
          <>
            {/* TOP: Hero + right stack (wides) */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
              {/* HERO (spans 8 cols, 2 rows on lg) */}
              {hero && (
                <article className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-8 lg:row-span-2'>
                  <div className={`h-full w-full bg-gradient-to-br ${toneClasses(hero.tone).bg} text-white p-6 flex flex-col justify-between relative`}>
                    {hero.imageUrl && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={hero.imageUrl}
                          alt={hero.title}
                          className='pointer-events-none absolute right-6 bottom-0 h-[52%] max-h-[220px] w-auto object-contain opacity-95 drop-shadow-[0_14px_30px_rgba(0,0,0,0.25)]'
                        />
                      </>
                    )}
                    <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wide opacity-90'>
                      <BadgePercent className='h-4 w-4' />
                      {hero.badge ?? 'Promoción'}
                    </div>
                    <div>
                      <h3 className='text-2xl sm:text-3xl font-extrabold leading-tight'>{hero.title}</h3>
                      {hero.subtitle && <p className='mt-1 text-sm/6 opacity-95'>{hero.subtitle}</p>}
                    </div>
                    <div className='mt-4 flex items-center gap-3'>
                      {mounted && countdown && (
                        <span
                          suppressHydrationWarning
                          className='inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-1 text-xs font-semibold backdrop-blur'>
                          <Clock className='h-3.5 w-3.5' /> Termina en {countdown}
                        </span>
                      )}
                      <Link
                        href={hero.href}
                        className='inline-flex items-center gap-2 rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white'>
                        Ver ofertas <ArrowRight className='h-4 w-4' />
                      </Link>
                    </div>
                    {/* Soft blobs */}
                    <div className='pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 animate-drift animate-pulse-slow' />
                    <div className='pointer-events-none absolute -right-6 top-24 h-40 w-40 rounded-full bg-white/10 animate-drift animate-pulse-slow delay-500' />
                  </div>
                </article>
              )}

              {/* RIGHT STACK: up to 2 wide tiles */}
              <div className={`grid gap-4 ${hero ? 'lg:col-span-4 lg:grid-rows-[auto_1fr_1fr]' : 'lg:col-span-12 grid-cols-1 sm:grid-cols-2'}`}>
                {hero && (
                  <div className='lg:col-span-1'>
                    <div className='flex items-center justify-between text-xs font-semibold text-slate-700'>
                      <div className='inline-flex items-center gap-1'>
                        <Sparkles className='h-3.5 w-3.5' /> Ofertas destacadas de esta semana
                      </div>
                      <Link
                        href='/deals'
                        className='text-slate-500 hover:text-slate-700'>
                        Ver todas
                      </Link>
                    </div>
                  </div>
                )}
                {dealsWide.map((p, idx) => (
                  <Link
                    key={p.id}
                    href={p.href}
                    className='group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
                    <div className='absolute -right-2 -top-2 z-[2] grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white shadow'>#{idx + 1}</div>
                    {/* Image banner */}
                    {p.imageUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className='h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                          loading='lazy'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent' />
                        <div className='absolute left-0 right-0 bottom-0 z-[2] p-4'>
                          <div className='mb-1 flex items-center justify-between'>
                            <span className={`inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-900`}>{p.badge ?? 'Oferta'}</span>
                            <TicketPercent className='h-4 w-4 text-white/90 drop-shadow' />
                          </div>
                          <h3 className='text-sm font-semibold text-white drop-shadow'>{p.title}</h3>
                          {p.subtitle && <p className='text-xs text-white/90 drop-shadow'>{p.subtitle}</p>}
                        </div>
                      </>
                    ) : (
                      <div className='p-4'>
                        <div className='mb-2 flex items-center justify-between'>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClasses(p.tone).pill}`}>{p.badge ?? 'Oferta'}</span>
                          <TicketPercent className='h-4 w-4 text-slate-400' />
                        </div>
                        <h3 className='text-sm font-semibold text-slate-900'>{p.title}</h3>
                        {p.subtitle && <p className='text-xs text-slate-600 mt-0.5'>{p.subtitle}</p>}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* SECTION: Destacados por categoría (cards) */}
            {catCards.length > 0 && (
              <div className='mt-6'>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-700'>Destacados por categoría</h3>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                  {catCards.map((p) => (
                    <Link
                      key={p.id}
                      href={p.href}
                      className='group relative block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md'>
                      {/* Fondo: imagen full-bleed o gradiente por tono */}
                      {p.imageUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className='h-36 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                            loading='lazy'
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent' />
                        </>
                      ) : (
                        <div className={`h-36 w-full bg-gradient-to-br ${toneClasses(p.tone).bg} opacity-90`} />
                      )}

                      {/* Decoración: círculos suaves como en Mega Ofertas */}
                      <div className='pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-md animate-drift animate-pulse-slow z-[1]' />
                      <div className='pointer-events-none absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-white/10 blur-md animate-drift animate-pulse-slow delay-500 z-[1]' />

                      {/* Overlay de texto */}
                      <div className='absolute inset-x-0 bottom-0 z-[2] p-3'>
                        <div className='mb-1 flex items-center justify-between'>
                          <span className='inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-900'>{p.group ?? 'Categoría'}</span>
                          <Gift className='h-4 w-4 text-white/90 drop-shadow' />
                        </div>
                        <h4 className='text-sm font-semibold text-white drop-shadow'>{p.title}</h4>
                        {p.subtitle && <p className='text-xs text-white/90 drop-shadow'>{p.subtitle}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: Colecciones destacadas (bento) */}
            <div className='mt-6'>
              <div className='mb-2 flex items-center justify-between'>
                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-700'>Colecciones de la semana</h3>
                <Link
                  href='/collections'
                  className='text-xs font-semibold text-slate-600 hover:text-slate-800'>
                  Ver colecciones
                </Link>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {COLLECTIONS_DUMMY.map((c) => (
                  <Link
                    key={c.id}
                    href={c.href}
                    className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
                    <div className='absolute inset-0 bg-gradient-to-br from-black/10 to-black/0 z-[1]' />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className='h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-48'
                      loading='lazy'
                    />
                    <div className='absolute inset-x-0 bottom-0 z-[2] p-4'>
                      <span className='mb-1 inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-slate-900'>
                        <Layers className='h-3.5 w-3.5' /> Colección
                      </span>
                      <h4 className='text-base font-bold text-white drop-shadow'>{c.title}</h4>
                      {c.subtitle && <p className='text-xs text-white/90 drop-shadow'>{c.subtitle}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        );
      })()}

      {/* Global styles for soft pulse */}
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
          animation: pulseSlow 6s ease-in-out infinite;
        }
        .delay-500 {
          animation-delay: 3s;
        }
        @keyframes driftSlow {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(6px, -4px) scale(1.08);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        .animate-drift {
          animation: driftSlow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
