'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';

// ---------- Data model ----------
export type DeptItem = { label: string; href: string };
export type DeptColumn = { title: string; items: DeptItem[] };
export type Department = {
  id: string;
  label: string;
  columns: DeptColumn[];
  badge?: string; // e.g., “Nuevo”, “-15%”
};

// util: turn label => slug (fallback for demo URLs)
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// ---------- Seed taxonomy (we'll refine later) ----------
const DEPARTMENTS: Department[] = [
  {
    id: 'smartphones',
    label: 'Smartphones',
    columns: [
      {
        title: 'Marcas',
        items: [
          { label: 'iPhones', href: '/c/smartphones/iphone' },
          { label: 'Samsung Phones', href: '/c/smartphones/samsung' },
          { label: 'Google Pixel', href: '/c/smartphones/pixel' },
          { label: 'Otros Android', href: '/c/smartphones/android' },
        ],
      },
      {
        title: 'Colecciones',
        items: [
          { label: 'Gama Alta', href: '/c/smartphones/high-end' },
          { label: 'Gama Media', href: '/c/smartphones/mid' },
          { label: 'Bajo $5,000', href: '/c/smartphones/under-5k' },
          { label: 'Dual-SIM', href: '/c/smartphones/dual-sim' },
        ],
      },
      {
        title: 'Servicios',
        items: [
          { label: 'Grados Estéticos (A/B/C)', href: '/certificacion/grados' },
          { label: 'Verificar IMEI', href: '/certificacion/imei' },
          { label: 'Garantía 12 Meses', href: '/garantia' },
        ],
      },
    ],
  },
  {
    id: 'apple',
    label: 'Apple (iPad & Mac)',
    columns: [
      {
        title: 'iPad',
        items: [
          { label: 'iPad', href: '/c/ipad/all' },
          { label: 'iPad Pro', href: '/c/ipad/pro' },
          { label: 'iPad Air', href: '/c/ipad/air' },
          { label: 'iPad mini', href: '/c/ipad/mini' },
        ],
      },
      {
        title: 'MacBook',
        items: [
          { label: 'MacBook Air', href: '/c/macbook/air' },
          { label: 'MacBook Pro', href: '/c/macbook/pro' },
          { label: 'Monitores', href: '/c/monitores' },
        ],
      },
      {
        title: 'Wearables',
        items: [
          { label: 'Apple Watch', href: '/c/smartwatch/apple-watch' },
          { label: 'AirPods / Audífonos', href: '/c/headphones' },
          { label: 'Accesorios', href: '/c/accesorios/apple' },
        ],
      },
    ],
  },
  {
    id: 'audio',
    label: 'Audio & Wearables',
    columns: [
      {
        title: 'Audio',
        items: [
          { label: 'Headphones', href: '/c/headphones' },
          { label: 'Bocinas', href: '/c/bocinas' },
          { label: 'Barra de Sonido', href: '/c/audio/soundbar' },
        ],
      },
      {
        title: 'Wearables',
        items: [
          { label: 'Smartwatch', href: '/c/smartwatch' },
          { label: 'Banda Deportiva', href: '/c/wearables/bandas' },
        ],
      },
      {
        title: 'Servicios',
        items: [
          { label: 'Reemplazo de Batería', href: '/servicios/reparaciones' },
          { label: 'Garantía', href: '/garantia' },
        ],
      },
    ],
  },
  {
    id: 'gaming',
    label: 'Videogames',
    columns: [
      {
        title: 'Consolas',
        items: [
          { label: 'PlayStation', href: '/c/consolas/ps' },
          { label: 'Xbox', href: '/c/consolas/xbox' },
          { label: 'Nintendo', href: '/c/consolas/nintendo' },
        ],
      },
      {
        title: 'Categorías',
        items: [
          { label: 'Videojuegos', href: '/c/videogames' },
          { label: 'Accesorios', href: '/c/videogames/acc' },
          { label: 'Monitores Gaming', href: '/c/monitores/gaming' },
        ],
      },
      {
        title: 'Colecciones',
        items: [
          { label: 'Outlet / Últimas Piezas', href: '/c/outlet' },
          { label: 'Reacondicionados Premium', href: '/c/gaming/premium' },
        ],
      },
    ],
  },
  {
    id: 'camaras-drones',
    label: 'Cámaras & Drones',
    columns: [
      {
        title: 'Cámaras',
        items: [
          { label: 'Mirrorless', href: '/c/camaras/mirrorless' },
          { label: 'DSLR', href: '/c/camaras/dslr' },
          { label: 'Accesorios', href: '/c/camaras/acc' },
        ],
      },
      {
        title: 'Drones',
        items: [
          { label: 'Drones', href: '/c/drones' },
          { label: 'Baterías / Hélices', href: '/c/drones/acc' },
        ],
      },
      {
        title: 'Acción',
        items: [
          { label: 'Action Cams', href: '/c/camaras/action' },
          { label: 'Gimbals', href: '/c/camaras/gimbals' },
        ],
      },
    ],
  },
  {
    id: 'movilidad',
    label: 'Movilidad & Hogar',
    columns: [
      {
        title: 'Movilidad',
        items: [
          { label: 'Scooters', href: '/c/scooter' },
          { label: 'Robot Vacuum', href: '/c/robot-vacuum' },
          { label: 'Smart Home', href: '/c/smart-home' },
        ],
      },
      {
        title: 'Hogar',
        items: [
          { label: 'Pantallas', href: '/c/pantallas' },
          { label: 'Monitores', href: '/c/monitores' },
          { label: 'Home & Kitchen', href: '/c/home-kitchen' },
        ],
      },
      {
        title: 'Ofertas',
        items: [
          { label: 'Top Deals', href: '/deals' },
          { label: 'Refurb Premium', href: '/c/premium' },
        ],
      },
    ],
  },
  // Ejemplo de “Moda & Belleza (nuevo)” si decides mezclarlo:
  // {
  //   id: 'fashion',
  //   label: 'Moda & Belleza (Nuevo)',
  //   badge: 'Nuevo',
  //   columns: [
  //     { title: 'Mujer', items: [{ label: 'Ropa', href: '/c/mujer/ropa' }, { label: 'Pinturas', href: '/c/mujer/pinturas' }] },
  //     { title: 'Accesorios', items: [{ label: 'Bolsas', href: '/c/mujer/bolsas' }] },
  //     { title: 'Belleza', items: [{ label: 'Cuidado de la piel', href: '/c/mujer/skin' }] },
  //   ],
  // },
];

// ---------- Component ----------
export default function DepartmentsMenu({ label = 'Departamentos', data = DEPARTMENTS }: { label?: string; data?: Department[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(data[0]?.id ?? '');
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnId = useId();

  // Smooth open/close with a small delay to avoid hover gaps
  const closeTimer = useRef<number | null>(null);
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const current = useMemo(() => data.find((d) => d.id === active) ?? data[0], [data, active]);

  return (
    <div
      className='relative'
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      aria-haspopup='true'
      aria-expanded={open}
      aria-controls={`${btnId}-panel`}>
      <button
        id={btnId}
        type='button'
        className='inline-flex items-center gap-2 rounded-md py-2 text-sm font-semibold text-white hover:text-black hover:bg-slate-100'
        onMouseEnter={() => {
          cancelClose();
          setOpen(true);
        }}
        onClick={() => setOpen((v) => !v)}
        onMouseLeave={scheduleClose}>
        <Menu className='h-4 w-4' />
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          aria-hidden
          className='absolute left-0 right-0 top-full h-2'
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      )}

      {open && (
        <div
          ref={panelRef}
          id={`${btnId}-panel`}
          className='absolute left-0 top-full z-50 mt-0 w-[920px] rounded-xl border border-gray-200 bg-white shadow-xl'
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}>
          <div className='grid grid-cols-[280px_1fr]'>
            {/* Left rail */}
            <ul className='max-h-[520px] overflow-auto p-2'>
              {data.map((d) => (
                <li key={d.id}>
                  <button
                    onMouseEnter={() => setActive(d.id)}
                    onFocus={() => setActive(d.id)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm ${active === d.id ? 'bg-slate-900 text-white' : 'text-slate-900 hover:bg-slate-100'}`}>
                    <span className='flex items-center gap-2'>
                      {d.label}
                      {d.badge && <span className='ml-2 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700'>{d.badge}</span>}
                    </span>
                    <ChevronDown className={`h-4 w-4 -rotate-90 ${active === d.id ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Right content */}
            <div className='border-l border-gray-200 p-4'>
              <div className='grid grid-cols-3 gap-6'>
                {current?.columns.map((col, i) => (
                  <div key={i}>
                    <p className='text-sm font-semibold text-slate-900'>{col.title}</p>
                    <ul className='mt-2 space-y-1.5'>
                      {col.items.map((it) => (
                        <li key={it.label}>
                          <Link
                            href={it.href || `/c/${slug(current.label)}/${slug(it.label)}`}
                            className='text-sm text-slate-700 hover:text-slate-900'
                            onClick={() => setOpen(false)}>
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
