import { Billboard as BillboardType } from '@/types';

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const renderLabel = (label: string) => {
    // Match: FirstWord [& or -] NextWord, then the rest
    const m = label.match(/^(\S+)\s*([&-])\s*(\S+)([\s\S]*)$/);
    if (m) {
      const [, first, sym, second, rest] = m;
      return (
        <>
          <span className='text-cyan-300'>
            {first} {sym} {second}
          </span>
          {rest}
        </>
      );
    }

    const [first = '', second = '', ...restArr] = label.split(/\s+/);
    // NEW: If the *second* word is Celulares, color first + second together
    if (second.toLowerCase() === 'celulares') {
      return (
        <>
          <span className='text-cyan-300'>
            {first} {second}
          </span>
          {restArr.length ? ' ' + restArr.join(' ') : ''}
        </>
      );
    }

    // Default: color only first word
    return (
      <>
        <span className='text-cyan-300'>{first}</span>
        {second ? ' ' + [second, ...restArr].join(' ') : ''}
      </>
    );
  };

  return (
    <div className='p-5 mb-3 rounded-xl overflow-hidden'>
      <div
        className='rounded-sm relative aspect-[4/1] md:aspect-[6/1] overflow-hidden bg-cover'
        style={{
          backgroundImage: `url(${data?.imageUrl || 'https://placehold.co/800x300'})`,
        }}>
        <div className='absolute inset-0 flex items-end mb-3'>
          <div className='font-bold text-3xl sm:text-5xl lg:text-4xl text-white relative inline-block leading-tight w-full text-center '>
            <div className='w-full flex justify-center'>
              <div className='inline-block bg-black/75 rounded-md px-2 py-1'>
                <span
                  className='block text-white font-bold'
                  style={{
                    WebkitTextStroke: '2px #000',
                    paintOrder: 'stroke fill',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    fontSize: 'clamp(18px,3vw,32px)',
                    letterSpacing: '0.02em',
                    lineHeight: 1.1,
                  }}>
                  {data?.label && renderLabel(data.label)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
