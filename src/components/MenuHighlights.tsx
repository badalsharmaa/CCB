import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, UtensilsCrossed } from 'lucide-react';
import { HeadingWithDividers } from './HeadingOrnament';

const MOODS = [
  { 
    name: "Street Food Cravings", 
    image: "/assets/real_assets/food087.png", 
    color: "bg-brand-orange",
    description: "Authentic Kolkata jhal muri, fuchka, and more."
  },
  { 
    name: "Comfort Meal", 
    image: "/assets/real_assets/thali002-2.png", 
    color: "bg-brand-blue",
    description: "Hearty thalis that feel like home."
  },
  { 
    name: "Something Spicy", 
    image: "/assets/real_assets/food044.png", 
    color: "bg-brand-yellow",
    description: "Bold flavors from our signature curries."
  },
  { 
    name: "Late Night Indo-Chinese", 
    image: "/assets/real_assets/food088.png", 
    color: "bg-brand-navy",
    description: "The legendary Tangra-style street flavors."
  }
];

export function MenuHighlights() {
  return (
    <section id="menu" className="py-32 px-4 lg:px-10 bg-brand-cream-light relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/assets/alpona/circular_motif.png" alt="" className="w-full h-full animate-spin-slow" />
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 translate-x-1/3 translate-y-1/3 pointer-events-none">
        <img src="/assets/alpona/circular_motif.png" alt="" className="w-full h-full animate-spin-slow-reverse" />
      </div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-[2px] bg-brand-orange"></div>
              <span className="text-brand-orange tracking-[0.3em] text-xs uppercase font-bold flex items-center gap-2">
                <UtensilsCrossed className="w-3 h-3" /> Culinary Excellence
              </span>
              <div className="w-8 h-[2px] bg-brand-orange"></div>
            </div>
            
            <HeadingWithDividers divider={4} className="mb-6 w-full">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-brand-navy leading-tight">
                What are you in the <span className="italic text-brand-orange underline decoration-brand-yellow/30 underline-offset-8">mood</span> for?
              </h2>
            </HeadingWithDividers>
            
            <p className="max-w-2xl text-brand-navy/60 text-lg font-light leading-relaxed mb-10">
              Discover the authentic flavors of Kolkata street food and Bengali home-style cooking, curated for every craving.
            </p>

            <Link to="/order" className="group relative px-8 py-4 bg-brand-navy text-brand-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative flex items-center gap-3 font-bold text-sm uppercase tracking-widest">
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 pt-10">
          {MOODS.map((mood, index) => (
            <motion.div
              key={mood.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Arch card */}
              <div className="relative h-[420px] mb-8">
                {/* Image Container with Mask */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{
                    maskImage: 'url(/assets/image-mask.png)',
                    WebkitMaskImage: 'url(/assets/image-mask.png)',
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                  }}
                >
                  <div className={`absolute inset-0 ${mood.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-multiply`} />
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay for better text readability on hover if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Decorative Frame */}
                <img
                  src="/assets/frame.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none object-fill z-20 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Floating Badge on Hover */}
                <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-brand-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Sparkles className={`w-5 h-5 ${mood.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="relative z-30 px-2">
                <div className={`w-12 h-[2px] ${mood.color} mb-4 transform origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500`} />
                <h4 className="font-serif text-2xl text-brand-navy leading-tight mb-2 group-hover:text-brand-orange transition-colors duration-300">
                  {mood.name}
                </h4>
                <p className="text-brand-navy/60 text-sm font-light leading-relaxed mb-4 line-clamp-2">
                  {mood.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-navy group-hover:text-brand-orange transition-colors duration-300">
                  <span>Start Ordering</span>
                  <ArrowRight className="w-3 h-3 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
