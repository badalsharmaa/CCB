import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, ArrowRight, Mail, MapPin, Clock } from 'lucide-react';

const YelpIcon = (props: any) => (
  <svg role="img" viewBox="0 0 228.097 228.097" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g>
      <path d="M173.22,68.06c8.204,6.784,30.709,25.392,27.042,38.455c-1.696,5.867-8.434,7.746-13.43,9.579c-11.505,4.171-23.33,7.471-35.339,9.9c-9.717,1.971-30.48,6.279-26.63-10.909c1.512-6.646,6.875-12.284,11.184-17.28c8.846-10.404,17.876-21.405,28.555-29.93c0.871-0.688,1.925-0.871,2.842-0.733C169.232,66.41,171.386,66.502,173.22,68.06z"/>
      <path d="M161.119,205.197c-7.196-5.821-12.284-14.942-16.684-22.917c-4.309-7.7-11.092-17.876-12.238-26.813c-2.337-18.38,24.292-7.333,31.947-4.675c10.175,3.575,37.447,7.517,34.422,23.421c-2.521,12.971-18.151,28.784-31.213,30.801c-0.137,0.046-0.321,0-0.504,0c-0.046,0.046-0.092,0.092-0.137,0.137c-0.367,0.183-0.779,0.413-1.192,0.596C163.961,206.573,162.449,206.252,161.119,205.197z"/>
      <path d="M101.58,157.896c14.484-6.004,15.813,10.175,15.721,19.984c-0.137,11.688-0.504,23.421-1.375,35.063c-0.321,4.721-0.137,10.405-4.629,13.384c-5.546,3.667-16.225,0.779-21.955-1.008c-0.183-0.092-0.367-0.183-0.55-0.229c-12.054-2.108-26.767-7.654-28.188-18.792c-0.138-1.283,0.367-2.429,1.146-3.3c0.367-0.688,0.733-1.329,1.146-1.925c1.788-2.475,3.85-4.675,5.913-6.921c3.483-5.179,7.242-10.175,11.229-14.988C85.813,172.197,92.917,161.471,101.58,157.896z"/>
      <path d="M103.689,107.661c-21.13-17.371-41.71-44.276-52.344-69.164c-8.113-18.93,12.513-30.48,28.417-35.705c21.451-7.059,29.976-0.917,32.13,20.534c1.788,18.471,2.613,37.08,2.475,55.643c-0.046,7.838,2.154,20.488-2.429,27.547c0.733,2.888-3.621,4.95-6.096,2.979c-0.367-0.275-0.733-0.642-1.146-0.963C104.33,108.303,104.009,108.028,103.689,107.661z"/>
      <path d="M101.397,134.566c1.696,7.517-3.621,10.542-9.854,13.384c-11.092,4.996-22.734,8.984-34.422,12.284c-6.784,1.879-17.188,6.371-23.742,1.375c-4.95-3.758-5.271-11.596-5.729-17.28c-1.008-12.696,0.917-42.993,18.517-44.276c8.617-0.596,19.388,7.104,26.447,11.138c9.396,5.409,19.48,11.596,26.492,20.076C100.159,131.862,101.03,132.916,101.397,134.566z"/>
    </g>
  </svg>
);
import { Link } from 'react-router-dom';

function navyScallopPath(totalW = 1440, archW = 42, archH = 44): string {
  const count = Math.ceil(totalW / archW) + 2;
  let d = `M0,${archH}`;
  for (let i = 0; i < count; i++) {
    d += ` Q${i * archW + archW / 2},0 ${(i + 1) * archW},${archH}`;
  }
  d += ` L${(count + 1) * archW},62 L0,62 Z`;
  return d;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="text-[13px] font-black tracking-[0.3em] uppercase text-[#c4622a]">{children}</h4>
      <div className="mt-2 w-6 h-[1.5px] bg-[#c4622a]/60 rounded-full" />
    </div>
  );
}

function VDivider() {
  return (
    <div className="hidden lg:flex items-stretch mx-8">
      <div className="w-px bg-[#c4622a]/20 self-stretch" />
    </div>
  );
}

const LOCATIONS = [
  { name: 'Fremont',     addr: '4906 Paseo Padre Pkwy, CA 94555', phone: '(507) 419 4523', tel: '+15074194523' },
  { name: 'Milpitas',    addr: '81 S Main Street, CA 95035',       phone: '(669) 319 8966', tel: '+16693198966' },
  { name: 'Santa Clara', addr: '1480 Halford Ave, CA 95051',       phone: null,           tel: null },
];

const HOURS = [
  { day: 'Mon – Thu', time: '11 AM – 9:30 PM'  },
  { day: 'Fri – Sat', time: '11 AM – 10:00 PM' },
  { day: 'Sunday',    time: '11 AM – 9:30 PM'  },
];

export function Footer() {
  return (
    // navy bg on root so any seam between sections shows navy, not white
    <footer className="flex flex-col lg:min-h-screen bg-[#0f1c2e]">

      {/* ── Top divider — tiled, colorized to terracotta ── */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{ height: 40, background: 'linear-gradient(105deg,#f5e6d3 45%,#fde8c0 100%)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/footer-divider.png)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 38px',
            backgroundPosition: 'center',
            // converts white outlines → terracotta/orange on cream bg
            filter: 'invert(1) sepia(1) saturate(180%) hue-rotate(335deg) brightness(0.72)',
          }}
        />
      </div>

      {/* ── Cream body — extra paddingBottom so scallops can overlap ── */}
      <div
        className="relative flex-1 flex flex-col"
        style={{
          background: 'linear-gradient(108deg,#f5e6d3 42%,#fde8c0 100%)',
          paddingBottom: 72,
        }}
      >
        {/* Paper texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true">
          <svg width="100%" height="100%">
            <filter id="fp">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#fp)" />
          </svg>
        </div>

        {/* ── Illustration: full height, fills entire right side ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 bottom-0 right-0 hidden lg:block pointer-events-none z-0"
          style={{ width: '46%' }}
          aria-hidden="true"
        >
          <img
            src="/assets/footer-calcutta.png"
            alt=""
            className="w-full h-full object-contain object-right-bottom"
            style={{
              opacity: 0.9,
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 18%, black 42%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 18%, black 42%)',
            }}
          />
        </motion.div>

        {/* ── Content: full natural width, no forced right padding ── */}
        <div className="relative z-10 flex-1 flex flex-col max-w-[1380px] w-full mx-auto px-10 lg:px-20 pt-14">

          {/* Three columns — flex-1 wrapper centers them vertically in available space */}
          <div className="flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_auto_1.35fr_auto_1.1fr] items-start gap-y-10 lg:gap-y-0 w-full">

            {/* Brand */}
            <div>
              <img
                src="/assets/logo.png"
                alt="Calcutta Chaat & Bakery"
                className="h-[100px] w-auto object-contain mb-5"
              />
              <p className="text-[#5a3825]/65 text-[17px] leading-relaxed max-w-[220px]">
                Authentic Bengali street food meets Silicon Valley. Three Bay Area locations, one soul.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {[
                  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/calcutta_chaat_bakery/', hov: 'hover:bg-[#E1306C]' },
                  { Icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=100087365754763', hov: 'hover:bg-[#1877F2]' },
                  { Icon: YelpIcon,  label: 'Yelp',      href: 'https://www.yelp.com/biz/calcutta-chaat-and-bakery-milpitas-2', hov: 'hover:bg-[#d32323]' },
                ].map(({ Icon, label, href, hov }) => (
                  <a
                    key={label} href={href} aria-label={label}
                    target="_blank" rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-[#c4622a]/10 flex items-center justify-center text-[#5a3825]/65 ${hov} hover:text-white transition-all duration-300`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <VDivider />

            {/* Locations */}
            <div>
              <SectionHeading>Our Locations</SectionHeading>
              <div className="space-y-5">
                {LOCATIONS.map(loc => (
                  <div key={loc.name} className="flex gap-3">
                    <MapPin className="w-4 h-4 text-[#c4622a] mt-[3px] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#2a1506] text-[18px] leading-none mb-1.5">{loc.name}</p>
                      <p className="text-[#5a3825]/55 text-[15px] leading-snug">{loc.addr}</p>
                      {loc.phone && (
                        <a href={`tel:${loc.tel}`} className="text-[17px] font-bold text-[#c4622a] hover:text-[#8f3e12] transition-colors">
                          {loc.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <VDivider />

            {/* Hours & Contact */}
            <div>
              <SectionHeading>Hours &amp; Contact</SectionHeading>
              <div className="space-y-4">
                {HOURS.map(h => (
                  <div key={h.day} className="flex items-center gap-3">
                    <Clock className="w-3.5 h-3.5 text-[#c4622a] flex-shrink-0" />
                    <span className="text-[17px] text-[#5a3825]/55 w-[5.8rem]">{h.day}</span>
                    <span className="text-[17px] font-semibold text-[#2a1506]">{h.time}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:info@calcuttachaat.com"
                className="flex items-center gap-2 mt-5 text-[17px] text-[#5a3825]/50 hover:text-[#c4622a] transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-[#c4622a] transition-colors" />
                info@calcuttachaat.com
              </a>
            </div>
          </div>
          </div>{/* end flex-1 centering wrapper */}

          {/* CTA — sits below columns */}
          <div className="pt-10 pb-4">
            <div className="w-full lg:w-[60%] h-px bg-[#c4622a]/15 mb-8" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 lg:w-[60%]">
              <div>
                <p className="font-serif italic text-[36px] lg:text-[42px] text-[#1a0e04] leading-none">
                  Hungry?
                </p>
                <p className="text-[#5a3825]/55 text-[17px] mt-2">We&apos;re ready when you are.</p>
              </div>
              <Link
                to="/order"
                className="self-start sm:self-auto flex-shrink-0 flex items-center gap-2 px-7 py-3.5 bg-[#c4622a] text-white text-[15px] font-bold rounded-full hover:bg-[#8f3e12] transition-colors shadow-lg shadow-[#c4622a]/20 group"
              >
                Order Online
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Navy bar — pulled up 55px so scallops peek into cream section ── */}
      <div className="flex-shrink-0 relative z-10" style={{ marginTop: -55 }}>
        <svg
          aria-hidden="true"
          className="w-full block"
          style={{ height: 62, display: 'block' }}
          viewBox="0 0 1440 62"
          preserveAspectRatio="none"
        >
          <path d={navyScallopPath()} fill="#0f1c2e" />
        </svg>

        <div className="bg-[#0f1c2e] relative overflow-hidden">
          <img src="/assets/footer-mandala.png" alt="" aria-hidden="true"
            className="absolute left-0 bottom-0 w-20 h-20 object-contain opacity-[0.08] pointer-events-none select-none -translate-x-3 translate-y-3" />
          <img src="/assets/footer-mandala.png" alt="" aria-hidden="true"
            className="absolute right-0 bottom-0 w-20 h-20 object-contain opacity-[0.08] pointer-events-none select-none translate-x-3 translate-y-3" />

          <div className="relative z-10 max-w-[1380px] mx-auto px-10 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[15px] text-white/40">
            <p>&copy; {new Date().getFullYear()} Calcutta Chaat &amp; Bakery. All rights reserved.</p>
            <div className="flex items-center">
              <Link to="/privacy" className="hover:text-white/70 transition-colors px-3">Privacy Policy</Link>
              <span className="opacity-20">|</span>
              <Link to="/terms" className="hover:text-white/70 transition-colors px-3">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
