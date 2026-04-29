import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  useGSAP(() => {
    // Staggered text animation for the main heading
    gsap.from(".hero-text-line", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    });

    // Image clip-path reveals
    gsap.fromTo(".hero-img-1",
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, ease: "power3.inOut", delay: 0.4 }
    );

    gsap.fromTo(".hero-img-2",
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, ease: "power3.inOut", delay: 0.6 }
    );

    // Floating badge pop
    gsap.from(".hero-badge", {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 1.2
    });

  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative isolate min-h-screen w-full overflow-hidden flex items-center pt-28"
    >
      <div
        className="absolute inset-0 z-0 scale-[1.04]"
        style={{
          backgroundImage: "url('/assets/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
      {/* Howrah Bridge overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/howrah-bridge.png"
          alt=""
          className="absolute bottom-0 right-0 w-full h-full object-cover object-center opacity-[0.15]"
          aria-hidden="true"
        />
      </div>
      {/* Light tint so text stays readable */}
      <div className="absolute inset-0 z-0 bg-white/20 pointer-events-none" />

      {/* Floating Tea Cup — large, flush to left edge */}
      <motion.div
        initial={{ opacity: 0, x: -80, rotate: -12 }}
        animate={{ opacity: 1, x: 0, rotate: -5 }}
        transition={{ duration: 1.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 pointer-events-none hidden lg:block"
        style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.18))' }}
      >
        <img src="/assets/tea.png" alt="" className="h-82 lg:h-50 2xl:h-96 w-auto object-contain" aria-hidden="true" />
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 z-0 w-1/2 h-full bg-brand-yellow/10 rounded-l-full blur-3xl transform translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 z-0 w-1/3 h-2/3 bg-brand-blue/5 rounded-tr-full blur-3xl transform -translate-x-1/4"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center space-x-2 bg-brand-white px-4 py-2 rounded-full shadow-sm border border-brand-navy/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-navy">Silicon Valley AI Experience</span>
            </div>
          </motion.div>

          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-brand-navy mb-8 overflow-hidden">
            <div className="hero-text-line">Kolkata's</div>
            <div className="hero-text-line relative inline-block">
              <span className="relative z-10 italic text-brand-blue">Street Food</span>
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-brand-yellow -z-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div className="hero-text-line">Soul.</div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-brand-navy/70 max-w-md mb-12 font-light leading-relaxed"
          >
            Chaat. Rolls. Indo-Chinese. Bakery classics. Crafted with heritage, served with modern precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link to="/order" className="px-8 py-4 bg-brand-orange text-brand-white hover:bg-brand-orange/90 transition-all duration-300 rounded-full flex items-center justify-center space-x-3 group shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-1">
              <span className="uppercase tracking-widest text-sm font-bold">Order Pickup</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/catering-concierge"
              className="px-8 py-4 bg-brand-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-brand-white transition-all duration-300 rounded-full flex items-center justify-center space-x-3 group shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              <span className="uppercase tracking-widest text-sm font-bold">Chat to Order</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Image Composition */}
        <div className="relative h-[600px] hidden lg:block lg:-translate-x-12">
          <div className="hero-img-1 absolute top-10 right-10 w-3/4 h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-white z-20 transform -rotate-2">
            <img src="/assets/real_assets/pav001.png" alt="Indian Food" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          <div className="hero-img-2 absolute bottom-10 left-0 w-2/3 h-[300px] rounded-2xl overflow-hidden shadow-xl border-4 border-brand-white z-30 transform rotate-3">
            <img src="/assets/real_assets/food089.png" alt="Chaat" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          {/* Floating Badge */}
          <div className="hero-badge absolute top-1/2 -left-10 z-40 w-36 h-36 flex items-center justify-center transform -translate-y-1/2 pointer-events-none">
            <img 
              src="/assets/100%25authenic.png"
              alt="100% Authentic" 
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
