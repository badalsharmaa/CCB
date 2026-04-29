import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function StoryTeaser() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const images = gsap.utils.toArray('.story-img');

    images.forEach((img: any, i) => {
      gsap.fromTo(img,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} id="our-story" className="py-32 px-6 bg-brand-white relative overflow-hidden">
      {/* Creative background element */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-cream to-transparent"></div>

      {/* Floating Rosogolla — top right */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 12 }}
        whileInView={{ opacity: 1, y: 0, rotate: 8 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-16 right-4 pointer-events-none hidden lg:block"
        style={{ filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.12))' }}
      >
        <img src="/assets/rosogolla.png" alt="" className="h-32 xl:h-40 w-auto object-contain" aria-hidden="true" />
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Text Content */}
        <div className="order-2 lg:order-1 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-brand-orange"></div>
              <h3 className="text-brand-orange tracking-[0.2em] text-xs uppercase font-bold">
                Our Story
              </h3>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-navy leading-none mb-8">
              A dream that has been <br />
              <span className="italic text-brand-blue relative">
                cooking for years.
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-brand-yellow -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <div className="space-y-6 text-brand-navy/70 font-light leading-relaxed text-lg">
              <p>
                  Authentic regional food is hard to come by when you live away from home. West Bengal, being a melting pot of regions, cultures, and lifestyles, is home to people from many different backgrounds.                  </p>
              <p>
                While the city bustles with a plethora of restaurants serving yummy cuisines, everyone craves home-style regional food once in a while. Led by <strong className="text-brand-navy font-bold">Chef Bapi Das</strong>, we bring the authentic, unapologetic flavors of Bengali street food to the heart of the Bay Area, CA.
              </p>
            </div>

            <div className="mt-12">
              <Link to="/about" className="inline-block text-sm uppercase tracking-widest text-brand-navy font-bold border-b-2 border-brand-blue pb-1 hover:text-brand-blue transition-colors duration-300">
                Discover Our Journey
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Image Grid */}
        <div className="order-1 lg:order-2 relative">
          <div className="absolute inset-0 bg-brand-yellow/20 rounded-full blur-3xl transform translate-x-10 translate-y-10 -z-10"></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 mt-16">
              <div className="story-img rounded-2xl overflow-hidden shadow-xl border-4 border-brand-white">
                <img src="/assets/real_assets/food097.png" alt="Spices" className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="story-img rounded-2xl overflow-hidden shadow-xl border-4 border-brand-white">
                <img src="/assets/real_assets/food065.png" alt="Street Food" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="story-img rounded-2xl overflow-hidden shadow-xl border-4 border-brand-white">
                <img src="/assets/real_assets/food010.png" alt="Cooking" className="w-full h-56 object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="story-img rounded-2xl overflow-hidden shadow-xl border-4 border-brand-white">
                <img src="/assets/real_assets/cutlet002.png" alt="Indian Dish" className="w-full h-72 object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
