import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function CateringSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".catering-img",
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: ".catering-img",
          start: 'top 80%',
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="catering" className="py-32 px-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 rounded-l-full blur-3xl -z-10 transform translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="catering-img relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-cream">
          <img
            src="/assets/real_assets/buffet002.png"
            alt="Catering Spread"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent flex items-end p-8">
            <div className="bg-brand-yellow text-brand-navy px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <Users className="w-4 h-4" /> For 10 to 500+ Guests
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-1 bg-brand-orange"></div>
            <h3 className="text-brand-orange tracking-[0.2em] text-xs uppercase font-bold">
              Private Events & Catering
            </h3>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-brand-navy leading-none mb-6">
            Let us satisfy your guests' <span className="italic text-brand-blue">food palate.</span>
          </h2>
          <p className="text-lg text-brand-navy/70 font-light mb-8 leading-relaxed">
            We are ready to serve your guests with South Bay's best Bengali, Indian & Indo-Chinese cuisine. From intimate house parties to large corporate events, bring the authentic taste of Kolkata to your next gathering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/catering-concierge"
              className="px-8 py-4 bg-brand-navy text-brand-white hover:bg-brand-blue transition-all duration-300 rounded-full flex items-center justify-center space-x-3 group shadow-lg hover:-translate-y-1"
            >
              <span className="uppercase tracking-widest text-sm font-bold">Plan Your Event</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-white transition-all duration-300 rounded-full flex items-center justify-center space-x-3 font-bold uppercase tracking-widest text-sm">
              Download Menu
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
