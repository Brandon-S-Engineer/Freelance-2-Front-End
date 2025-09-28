'use client';

import { useTrackRecent } from '@/hooks/use-track-recent';

type RecentProduct = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  href: string;
};

export default function TrackRecent({ product }: { product: RecentProduct }) {
  useTrackRecent(product);
  return null; // doesn’t render anything, just tracks
}
