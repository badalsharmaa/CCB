import { Marquee } from './Marquee';

const row1Items = [
  <span key="1" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-brand-cream whitespace-nowrap">Kathi Rolls</span>,
  <span key="2" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">✦</span>,
  <span key="3" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-brand-cream whitespace-nowrap">Puchka &amp; Chaat</span>,
  <span key="4" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">✦</span>,
  <span key="5" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-brand-cream whitespace-nowrap">Mishti Doi</span>,
  <span key="6" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">✦</span>,
  <span key="7" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-brand-cream whitespace-nowrap">Kosha Mangsho</span>,
  <span key="8" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">✦</span>,
  <span key="9" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-brand-cream whitespace-nowrap">Rosogolla</span>,
  <span key="10" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">✦</span>,
];

const row2Items = [
  <span key="1" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-white whitespace-nowrap">Authentic Bengali</span>,
  <span key="2" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">❋</span>,
  <span key="3" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-white whitespace-nowrap">Kolkata Heritage</span>,
  <span key="4" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">❋</span>,
  <span key="5" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-white whitespace-nowrap">Ghugni &amp; Jhal Muri</span>,
  <span key="6" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">❋</span>,
  <span key="7" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-white whitespace-nowrap">Bay Area CA</span>,
  <span key="8" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">❋</span>,
  <span key="9" className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold py-3 md:py-5 px-5 md:px-8 block text-white whitespace-nowrap">Fresh Bakery</span>,
  <span key="10" className="text-2xl md:text-4xl lg:text-6xl py-3 md:py-5 px-3 md:px-4 block text-brand-yellow whitespace-nowrap">❋</span>,
];

export function SectionDivider() {
  return (
    <section className="overflow-hidden relative z-20 flex flex-col justify-center min-h-[220px] md:min-h-[280px] -mt-10 md:-mt-20 -mb-10 md:-mb-20">
      {/* Row 1 — navy bg, tilted -4deg, scrolls left — sits behind */}
      <div
        className="absolute w-[110%] left-[-5%] z-0"
        style={{ top: '50%', transform: 'rotate(-4deg) translateY(-50%)' }}
      >
        <div className="bg-brand-navy shadow-[0_20px_60px_rgba(0,0,0,0.0)] overflow-hidden">
          <Marquee
            items={row1Items}
            direction="left"
            duration="30s"
            pauseOnHover={false}
          />
        </div>
      </div>

      {/* Row 2 — orange bg, tilted +4deg, scrolls right — sits in front */}
      <div
        className="absolute w-[110%] left-[-5%] z-10"
        style={{ top: '50%', transform: 'rotate(4deg) translateY(-50%)' }}
      >
        <div className="bg-brand-orange shadow-[0_20px_60px_rgba(0,0,0,0.0)] overflow-hidden">
          <Marquee
            items={row2Items}
            direction="right"
            duration="25s"
            pauseOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}
