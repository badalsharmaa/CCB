import { useRef } from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    text: "The closest thing to Kolkata's Park Street I've experienced in the Bay Area. The Kathi Rolls are absolutely phenomenal—flaky paratha, perfectly spiced filling.",
    author: "Priya S.",
    role: "Local Food Critic",
    rating: 5
  },
  {
    id: 2,
    text: "Finally, authentic Puchka! The tamarind water has that exact street-style zing. Calcutta Chaat has become our weekly weekend ritual.",
    author: "Rahul M.",
    role: "Tech Executive",
    rating: 5
  },
  {
    id: 3,
    text: "Their catering for our Diwali party was flawless. The Indo-Chinese Chilli Chicken disappeared in minutes. Highly recommend!",
    author: "Anita D.",
    role: "Event Organizer",
    rating: 5
  }
];

export function TestimonialSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".testimonial-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 px-2 md:px-4 bg-brand-cream-light">

      {/* SVG clip path — notched concave corners (vintage plaque shape) */}
      <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
        <defs>
          <clipPath id="testimonial-arch-sides" clipPathUnits="objectBoundingBox">
            {/* Quadratic bezier concave notch at each corner:
                control point sits in the "interior corner" so the curve bows inward */}
            <path d="M 0.03,0 L 0.97,0 Q 0.97,0.08 1,0.08 L 1,0.92 Q 0.97,0.92 0.97,1 L 0.03,1 Q 0.03,0.92 0,0.92 L 0,0.08 Q 0.03,0.08 0.03,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Wide plaque-shaped box */}
      <div
        className="testimonial-arch-box mx-auto bg-brand-navy text-brand-white relative"
        style={{
          maxWidth: '1600px',
          filter: 'drop-shadow(0 32px 80px rgba(15,23,42,0.35))',
        }}
      >
        {/* Double border SVG overlay — two concentric plaque-outline strokes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 20 }}
        >
          {/* Outer border — hugs the clip edge */}
          <path
            d="M 3.5,0.5 L 96.5,0.5 Q 96.5,8.5 99.5,8.5 L 99.5,91.5 Q 96.5,91.5 96.5,99.5 L 3.5,99.5 Q 3.5,91.5 0.5,91.5 L 0.5,8.5 Q 3.5,8.5 3.5,0.5 Z"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Inner border — ~3 viewBox units further in */}
          <path
            d="M 5.5,3 L 94.5,3 Q 94.5,11 97.5,11 L 97.5,89 Q 94.5,89 94.5,97 L 5.5,97 Q 5.5,89 2.5,89 L 2.5,11 Q 5.5,11 5.5,3 Z"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Background noise texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise-test">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-test)" />
          </svg>
        </div>

        {/* Content */}
        <div className="px-8 md:px-20 py-20 relative z-10">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-1 bg-brand-yellow"></div>
              <h3 className="text-brand-yellow tracking-[0.2em] text-xs uppercase font-bold">
                Word on the Street
              </h3>
              <div className="w-8 h-1 bg-brand-yellow"></div>
            </div>
            {/* Heading — no left ornament, right ornament placed below centered */}
            <h2 className="font-serif text-4xl md:text-6xl leading-tight text-center mb-6 max-w-4xl mx-auto">
              Don't just take our <span className="italic text-brand-orange">word for it.</span>
            </h2>
            <img
              src="/assets/dividers/divider-5.png"
              alt=""
              aria-hidden="true"
              className="h-7 w-auto object-contain opacity-60 brightness-0 invert"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card bg-brand-white/5 border border-brand-white/10 p-8 rounded-3xl relative group hover:bg-brand-white/10 transition-colors duration-300">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-white/5 group-hover:text-brand-yellow/20 transition-colors duration-300" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>
                <p className="text-lg font-light leading-relaxed mb-8 text-brand-white/90">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-yellow flex items-center justify-center text-brand-navy font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold tracking-wide">{testimonial.author}</h4>
                    <p className="text-xs text-brand-white/50 uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
