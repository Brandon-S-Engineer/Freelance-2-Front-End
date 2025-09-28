// hooks/use-track-recent.ts

'use client';

import { useEffect } from 'react';

type RecentProduct = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  href: string;
};

type UnknownRecord = Record<string, unknown>;
const isObj = (v: unknown): v is UnknownRecord => !!v && typeof v === 'object';

const normalizeMaybe = (v: unknown): string => {
  const s = typeof v === 'string' ? v.trim() : String(v ?? '').trim();
  const lower = s.toLowerCase();
  return s === '' || lower === 'undefined' || lower === 'null' || lower === 'nan' ? '' : s;
};

const normalizeHref = (v: unknown): string => {
  const s = normalizeMaybe(v);
  if (!s) return '';
  const seg = extractIdFromHref(s).toLowerCase();
  if (!seg || seg === 'undefined' || seg === 'null' || seg === 'nan') return '';
  return s;
};

const toAbsoluteUrl = (s: string): string => {
  try {
    if (!s) return '';
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    return new URL(s, base || 'http://localhost').toString();
  } catch {
    return s;
  }
};

const getPathname = (s: string): string => {
  try {
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    const u = new URL(s, base || 'http://localhost');
    return u.pathname || '';
  } catch {
    const clean = s.split('?')[0].split('#')[0];
    return clean.startsWith('/') ? clean : `/${clean}`;
  }
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const extractIdFromHref = (href: string): string => {
  try {
    const clean = href.split('?')[0].split('#')[0];
    const parts = clean.split('/').filter(Boolean);
    // prefer `/product/<id-or-slug>` pattern
    const idx = parts.findIndex((p) => p === 'product');
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    // else take last segment
    return parts[parts.length - 1] || '';
  } catch {
    return '';
  }
};

type PartialRP = Partial<RecentProduct> & { href?: string };

function coerceIncoming(p: PartialRP): RecentProduct {
  // Prefer the explicit href; else current page URL (product page)
  const candidateHref = normalizeHref(p.href) || (typeof window !== 'undefined' ? window.location.href : '');
  const absForId = toAbsoluteUrl(candidateHref);

  let id = normalizeMaybe(p.id);
  if (!id) id = extractIdFromHref(absForId);
  if (!id && typeof p.title === 'string') id = slugify(p.title);
  if (!id) id = String(Date.now());

  // Final href: absolute URL based on candidate or fallback to origin + /product/<id>
  const finalHref = candidateHref ? toAbsoluteUrl(candidateHref) : typeof window !== 'undefined' ? `${window.location.origin}/product/${id}` : `/product/${id}`;

  return {
    id,
    title: normalizeMaybe(p.title),
    price: typeof p.price === 'number' ? p.price : Number(p.price ?? 0) || 0,
    imageUrl: normalizeMaybe(p.imageUrl),
    href: finalHref,
  };
}

function coerceExisting(v: unknown): RecentProduct | null {
  if (!isObj(v)) return null;
  const rawHref = normalizeHref(v.href);
  const absHref = toAbsoluteUrl(rawHref);

  let id = normalizeMaybe(v.id);
  if (!id) id = extractIdFromHref(absHref);
  if (!id) return null;

  const priceVal = (v as UnknownRecord).price;
  return {
    id,
    title: normalizeMaybe(v.title),
    price: typeof priceVal === 'number' ? priceVal : Number(priceVal ?? 0) || 0,
    imageUrl: normalizeMaybe(v.imageUrl),
    href: absHref || (typeof window !== 'undefined' ? `${window.location.origin}/product/${id}` : `/product/${id}`),
  };
}

export function useTrackRecent(p: RecentProduct | null) {
  useEffect(() => {
    if (!p) return;
    try {
      const key = 'recently_viewed';
      const raw = localStorage.getItem(key);
      const parsed: unknown = raw ? JSON.parse(raw) : [];

      // Tolerate old/single-object values and junk
      const arr: unknown[] = Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
      const list: RecentProduct[] = arr.map(coerceExisting).filter((x): x is RecentProduct => x !== null);

      // coerce the incoming product to always have valid id/href
      const safeP = coerceIncoming(p as PartialRP);
      // de-dup by pathname, keep most recent first
      const incomingPath = getPathname(safeP.href);
      const filtered = list.filter((x) => getPathname(x.href) !== incomingPath);
      const next = [safeP, ...filtered].slice(0, 20); // cap at 20
      console.debug('[useTrackRecent] save', { incoming: safeP, prev: list.length, next: next.length });
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, [p]);
}
