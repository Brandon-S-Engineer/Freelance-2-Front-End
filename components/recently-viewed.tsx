// components/recently-viewed.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type RecentProduct = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  href: string;
};

const mxn = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

type UnknownRecord = Record<string, unknown>;
const isObj = (v: unknown): v is UnknownRecord => !!v && typeof v === 'object';
const toStr = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v));
const toNum = (v: unknown) => (typeof v === 'number' ? v : Number(v));

function coerceProduct(v: unknown): RecentProduct | null {
  if (!isObj(v)) return null;

  const pick = (o: UnknownRecord, keys: string[]): unknown => {
    for (const k of keys) {
      if (k in o && o[k] != null) return o[k];
    }
    return undefined;
  };

  const id = toStr(pick(v, ['id', '_id', 'sku', 'slug']));
  if (!id) return null; // necesitamos al menos un identificador estable

  const title = toStr(pick(v, ['title', 'name', 'label']));
  const imageUrl = toStr(pick(v, ['imageUrl', 'image', 'thumbnail', 'img', 'picture', 'photo']));
  const hrefRaw = pick(v, ['href', 'url', 'path']);
  const href = toStr(hrefRaw ?? `/product/${id}`); // fallback razonable

  const priceRaw = toNum(pick(v, ['price', 'amount', 'finalPrice', 'salePrice']));
  const price = Number.isFinite(priceRaw) ? priceRaw : 0;

  return { id, title, price, imageUrl, href };
}

export default function RecentlyViewed() {
  const [items, setItems] = useState<RecentProduct[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('recently_viewed');
      const parsed: unknown = raw ? JSON.parse(raw) : [];

      // Ensure we always have an array
      const arr: unknown[] = Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];

      // Sanitize, normalize and de-dup (by id), keep most-recent-first
      const cleaned: RecentProduct[] = arr.map(coerceProduct).filter((x): x is RecentProduct => x !== null);

      const seen = new Set<string>();
      const unique = cleaned.filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true)));

      console.debug('[recently_viewed]', { total: arr.length, cleaned: cleaned.length, unique: unique.length });
      setItems(unique.slice(0, 4));
    } catch {
      setItems([]);
    }
  }, []);

  if (items.length === 0) return null; // Show when 1+

  return (
    <section className='bg-white pt-4 pb-6 pl-4 pr-4'>
      <h2 className='text-2xl font-bold tracking-tight mb-4'>Visto Recientemente</h2>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 '>
        {items.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className='group rounded-xl border border-gray-200 bg-white p-3 hover:shadow-md transition'>
            <div className='relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-50'>
              {p.imageUrl && (
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className='object-contain group-hover:scale-[1.03] transition-transform'
                />
              )}
            </div>
            <div className='mt-3'>
              <p className='line-clamp-2 text-sm font-medium text-gray-900'>{p.title}</p>
              <p className='mt-1 text-sm text-gray-700'>{mxn.format(Number(p.price) || 0)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
