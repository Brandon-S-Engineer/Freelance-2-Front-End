'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';

interface Category {
  id?: string;
  _id?: string;
  name: string;
}

interface MainNavProps {
  data: Category[];
  className?: string;
}

export default function MainNav({ data, className }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('mx-6 flex flex-wrap justify-center items-center gap-x-4 lg:gap-x-6 gap-y-2 max-[728px]:gap-y-4 lg:gap-y-3', className)}>
      {data.map((c) => {
        const id = c.id ?? c._id; // ✅ fallback for Mongo
        if (!id) return null; // ✅ skip invalid to avoid /undefined
        const href = `/category/${id}`;
        const active = pathname === href;

        return (
          <Fragment key={id}>
            <Link
              href={href}
              className={cn('text-sm font-medium transition-colors hover:underline', active ? 'text-sky-200' : 'text-white')}>
              {c.name}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
