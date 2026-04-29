import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const MOODS = [
  { name: "Street Food Cravings", image: "/assets/real_assets/mughlai001 2.png", color: "bg-brand-orange" },
  { name: "Comfort Meal", image: "/assets/real_assets/food108.png", color: "bg-brand-blue" },
  { name: "Something Spicy", image: "/assets/real_assets/tandoori001.png", color: "bg-brand-yellow" },
  { name: "Late Night Indo-Chinese", image: "/assets/real_assets/food009.png", color: "bg-brand-navy" }
];

export function MenuHighlights() {
  return (
    <section id="menu" className="py-32 px-4 lg:px-10 bg-brand-cream-light relative">
      <div className="max-w-[1500px] mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-1 bg-brand-blue"></div>
              <h3 className="text-brand-blue tracking-[0.2em] text-xs uppercase font-bold flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> AI-Powered Ordering
              </h3>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-5xl text-brand-navy leading-none whitespace-nowrap">
              What are you in the <span className="italic text-brand-orange">mood</span> for?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/order" className="px-6 py-3 rounded-full border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-white transition-all duration-300 flex items-center gap-2 group font-bold text-sm uppercase tracking-widest">
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* pt-20 gives the arch dome room to float above; gap-y-24 on mobile prevents dome overlap between stacked cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24 md:gap-6 pt-20">
          {MOODS.map((mood, index) => (
            <motion.div
              key={mood.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Arch card — reduced height */}
              <div className="relative h-[360px]">
                {/* Food image — same position/size as frame; left shifted 1px to close visual gap */}
                <div
                  className="absolute"
                  style={{
                    top: '-18%',
                    left: 'calc(-6% - 1px)',
                    width: '112%',
                    height: '122%',
                    maskImage: 'url(/assets/image-mask.png)',
                    WebkitMaskImage: 'url(/assets/image-mask.png)',
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                  }}
                >
                  <div className={`absolute inset-0 ${mood.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10 mix-blend-multiply`} />
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Frame — same position as food container; alpha transparent, no blend mode */}
                <img
                  src="/assets/frame.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    top: '-18%',
                    left: '-6%',
                    width: '112%',
                    height: '122%',
                    objectFit: 'fill',
                    zIndex: 20,
                  }}
                />
              </div>

              {/* Text below arch — always visible on cream background */}
              <div className="pt-3 px-2" style={{ zIndex: 30 }}>
                <div className={`w-8 h-1 ${mood.color} mb-2 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500`} />
                <h4 className="font-serif text-xl text-brand-navy leading-tight">
                  {mood.name}
                </h4>
                <p className="text-xs uppercase font-bold tracking-widest text-brand-navy/50 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 mt-1">
                  Curate my cart <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
