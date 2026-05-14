import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Users, Sparkles, Heart, Utensils } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Customizable Menus",
    description: "From traditional thalis to Indo-Chinese fusion, tailored for your specific needs.",
    icon: Sparkles,
    color: "text-brand-orange"
  },
  {
    title: "Professional Service",
    description: "Full buffet setup with elegant presentation and experienced staff.",
    icon: Users,
    color: "text-brand-blue"
  },
  {
    title: "Every Occasion",
    description: "Perfect for weddings, corporate events, and intimate home gatherings.",
    icon: Heart,
    color: "text-brand-orange"
  }
];

export function CateringSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".catering-img-container",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ".catering-img-container",
          start: 'top 80%',
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="catering" className="py-24 px-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 rounded-l-full blur-3xl -z-10 transform translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
          {/* Left Column: Image Collage Effect */}
          <div className="lg:col-span-5 relative">
            <div className="catering-img-container relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-brand-white">
              <img
                src="/assets/real_assets/buffet002.png"
                alt="Catering Spread"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent flex items-end p-10">
                <div className="bg-brand-yellow text-brand-navy px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-3 shadow-2xl transform -translate-y-4">
                  <Utensils className="w-5 h-5" /> 10 to 500+ Guests
                </div>
              </div>
            </div>
            
            {/* Small floating ornament */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-cream rounded-2xl shadow-xl flex items-center justify-center border-4 border-brand-white transform rotate-12 z-20 hidden md:flex">
               <img src="/assets/logo.png" alt="Logo" className="w-20 h-auto grayscale opacity-50" />
            </div>
          </div>

          {/* Right Column: Content */}
          <motion.div
            className="lg:col-span-7 pt-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-brand-orange"></div>
              <h3 className="text-brand-orange tracking-[0.3em] text-xs uppercase font-bold">
                Exquisite Events
              </h3>
            </div>
            
            <h2 className="font-serif text-5xl md:text-7xl text-brand-navy leading-none mb-8">
              Let us satisfy your guests' <br />
              <span className="italic text-brand-blue relative">
                food palate.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h2>
            
            <p className="text-xl text-brand-navy/70 font-light mb-12 leading-relaxed max-w-2xl">
              We bring the authentic taste of Kolkata to your next gathering. From intimate house parties to large-scale corporate galas, South Bay's best Bengali and Indo-Chinese cuisine is ready to serve.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {FEATURES.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-3"
                >
                  <div className={`${feature.color} bg-brand-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-brand-navy text-sm uppercase tracking-wider">{feature.title}</h4>
                  <p className="text-xs text-brand-navy/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/catering-concierge"
                className="px-10 py-5 bg-brand-navy text-brand-white hover:bg-brand-blue transition-all duration-300 rounded-full flex items-center justify-center space-x-4 group shadow-xl hover:-translate-y-1"
              >
                <span className="uppercase tracking-widest text-sm font-bold">Plan Your Event</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-10 py-5 bg-brand-white border-2 border-brand-navy/10 text-brand-navy hover:border-brand-navy transition-all duration-300 rounded-full flex items-center justify-center space-x-4 font-bold uppercase tracking-widest text-sm shadow-sm">
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
