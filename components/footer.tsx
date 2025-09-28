import Link from 'next/link';
import { HelpCircle, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || 'Tu Tienda';

// components/footer.tsx
const groups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre PrimeFinds', href: '/about' },
      { label: 'Tienda y Sucursales', href: '/sucursales' },
      { label: 'Programa de Afiliados', href: '/afiliados' },
      { label: 'Blog y Guías de Compra', href: '/blog' },
      { label: 'Prensa', href: '/prensa' },
      { label: 'Bolsa de Trabajo', href: '/empleos' },
    ],
  },
  {
    title: 'Compra con Confianza',
    links: [
      { label: 'Cómo Comprar', href: '/ayuda/como-comprar' },
      { label: 'Métodos de Pago', href: '/ayuda/metodos-de-pago' },
      { label: 'Envíos y Tiempos', href: '/ayuda/envios' },
      { label: 'Devoluciones y Cancelaciones', href: '/ayuda/devoluciones' },
      { label: 'Preguntas Frecuentes', href: '/ayuda/faq' },
      { label: 'Rastrea tu Pedido', href: '/orden/seguimiento' },
    ],
  },
  {
    title: 'Vende tu Equipo',
    links: [
      { label: 'Cómo Vender / Trade-in', href: '/vender' },
      { label: 'Cotiza tu Dispositivo', href: '/vender/cotizador' },
      { label: 'Condiciones de Recepción', href: '/vender/condiciones' },
      { label: 'Proceso de Pago al Vendedor', href: '/vender/pagos' },
      { label: 'Estado de tu Evaluación', href: '/vender/estado' },
      { label: 'FAQ de Venta', href: '/vender/faq' },
    ],
  },
  {
    title: 'Certificación y Garantía',
    links: [
      { label: 'Proceso de Certificación', href: '/certificacion/proceso' },
      { label: 'Garantía 12 Meses', href: '/garantia' },
      { label: 'Grados Estéticos (A/B/C)', href: '/certificacion/grados' },
      { label: 'Batería y Piezas Reemplazadas', href: '/certificacion/piezas' },
      { label: 'Política de Reemplazo', href: '/garantia/reemplazo' },
      { label: 'Verificación de IMEI', href: '/certificacion/imei' },
    ],
  },
  {
    title: 'Soporte y Servicios',
    links: [
      { label: 'Soporte Técnico', href: '/soporte' },
      { label: 'Diagnóstico y Reparaciones', href: '/servicios/reparaciones' },
      { label: 'Accesorios y Refacciones', href: '/accesorios' },
      { label: 'Seguro / Protección', href: '/servicios/seguro' },
      { label: 'Centro de Descargas', href: '/descargas' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
];

const LegalNav = () => (
  <nav
    aria-label='Legal'
    className='w-full'>
    <ul className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600'>
      {[
        { label: 'Términos y Condiciones', href: '#' },
        { label: 'Aviso de privacidad', href: '#' },
        { label: 'Política de Cookies', href: '#' },
        { label: 'Configuración de Cookies', href: '#' },
      ].map((l, i) => (
        <li
          key={i}
          className='flex items-center'>
          <Link
            href={l.href}
            className='hover:text-slate-900'>
            {l.label}
          </Link>
          {i < 3 && <span className='mx-3 select-none text-slate-300'>|</span>}
        </li>
      ))}
    </ul>
  </nav>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t'>
      {/* Top utilities row */}
      <section className=' bg-gray-100'>
        <div className='mx-auto px-5 py-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex justify-evenly '>
          {/* Atención al Cliente */}
          <div>
            <h3 className='text-base font-semibold text-slate-900 flex items-center gap-2'>
              <HelpCircle className='h-5 w-5 text-slate-700' /> Atención a cliente
            </h3>
            <Link
              href='#'
              className='mt-2 inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900'>
              <span>Obtén Ayuda o Contáctanos</span>
            </Link>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='text-base font-semibold text-slate-900 flex items-center gap-2'>
              <Mail className='h-5 w-5 text-slate-700' /> Recibe nuestro Newsletter (Promociones)
            </h3>
            <form className='mt-2 flex gap-2'>
              <label
                className='sr-only'
                htmlFor='footer-email'>
                Ingresa tu email
              </label>
              <input
                id='footer-email'
                type='email'
                placeholder='Ingresa tu email'
                className='flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900'
              />
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'>
                Suscribirme
              </button>
            </form>
          </div>

          {/* Canales Oficiales */}
          <div>
            <h3 className='text-base font-semibold text-slate-900'>Nuestras Redes Sociales</h3>
            <div className='mt-2 flex items-center gap-4'>
              <Link
                aria-label='Facebook'
                href='#'
                className='rounded-full bg-slate-900 text-white p-2 hover:bg-slate-800'>
                <Facebook className='h-4 w-4' />
              </Link>
              <Link
                aria-label='Instagram'
                href='#'
                className='rounded-full bg-slate-900 text-white p-2 hover:bg-slate-800'>
                <Instagram className='h-4 w-4' />
              </Link>
              <Link
                aria-label='YouTube'
                href='#'
                className='rounded-full bg-slate-900 text-white p-2 hover:bg-slate-800'>
                <Youtube className='h-4 w-4' />
              </Link>
              <Link
                aria-label='X/Twitter'
                href='#'
                className='rounded-full bg-slate-900 text-white p-2 hover:bg-slate-800'>
                <Twitter className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Links grid */}
      <section className='bg-gray-100'>
        <div className='mx-auto px-8 py-8 bg-slate-800 text-white'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8'>
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className='font-semibold'>{g.title}</h4>
                <ul className='mt-3 space-y-2 font-medium'>
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className='text-sm text-white hover:text-stone-400'>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom legal + copyright */}
      <section className='border-t'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6'>
          <LegalNav />
          <p className='mt-4 text-center text-xs sm:text-sm text-slate-600'>
            © {year} {brandName}. Todos los derechos reservados.
          </p>
        </div>
      </section>
    </footer>
  );
}
