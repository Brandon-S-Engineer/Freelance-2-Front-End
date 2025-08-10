const Footer = () => {
  const currentYear = new Date().toLocaleDateString('es-ES', { year: 'numeric' });

  return (
    <footer className='bg-white border-t'>
      <div className='mx-auto py-10'>
        <p className='text-center text-sm text-black'>&copy; {currentYear} Catálogo de autos - Edith Araceli Soria Villavicencio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
