import { useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".about-img",
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.5,
        ease: 'power3.inOut',
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-brand-cream font-sans overflow-hidden">

      {/* Hero Section — Calcutta illustration banner */}
      <div className="relative pt-40 pb-32 flex items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          {/* Mobile: left-aligned so only blank cream area shows; desktop: right-aligned to show illustration */}
          <img
            src="/assets/about-banner.png"
            alt="Calcutta illustration"
            className="w-full h-full object-cover object-left md:object-right opacity-50"
          />
          {/* Light filter overlay */}
          <div className="absolute inset-0 bg-white/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cream/20 to-brand-cream"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-5xl mx-auto px-6"
        >
          <h1 className="font-serif text-6xl md:text-8xl text-brand-navy mb-4">Our Story</h1>
          <h2 className="font-serif text-2xl md:text-3xl text-brand-orange mb-8">Culinary passion runs in our family</h2>
          <p className="text-lg md:text-xl text-brand-navy/80 leading-relaxed font-medium max-w-4xl mx-auto">
            On one side of the globe, there’s a world of family, traditions, and simplicity. On the other side, there’s a world of busy lives, diversity, and innovation. When you fuse the two worlds together, you can create something truly magical. At times like these, it’s not easy to immerse ourselves in a new culture, but when we sit around a dinner table and share its food, we experience something meaningful.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">

        {/* Ornamental Divider */}
        <div className="flex justify-center py-12 md:py-20">
          <img src="/assets/divider2.png" alt="Ornament" className="h-8 md:h-12 opacity-80" />
        </div>
        {/* The Journey Section */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12 md:mb-24">
          <div className="about-img rounded-3xl overflow-hidden h-[500px] md:h-[600px] shadow-2xl relative">
            <img src="/assets/real_assets/food098.png" alt="Spices" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-8 relative">

            {/* Floating Chai */}
            <motion.img
              animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src="/assets/Ornament3.png"
              alt="Kulhad Chai"
              className="absolute -bottom-50 -right-10 md:-right-20 w-48 h-48 md:w-45 md:h-45 object-contain opacity-90 drop-shadow-2xl z-10 hidden sm:block"
            />

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-brand-orange"></div>
              <h3 className="text-brand-orange tracking-[0.2em] text-xs uppercase font-bold">
                Roots & Traditions
              </h3>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-navy leading-tight">Bengali Food: Forget The Frills, Just Add Flavour</h2>
            <p className="text-brand-navy/80 leading-relaxed text-lg ">
              Chef Bapi Das was born and raised in Taherpur, Nadia, West-Bengal. Bengali food isn’t exactly “fine-dining-michelin-starred-quality” — but it’s prepared with love, passion, and ingredients picked straight from the ground.
            </p>
            <p className="text-brand-navy/80 leading-relaxed text-lg ">
              In West Bengal, it is traditional for women to cook at home while men go to work. It’s almost frowned upon for men to be in the kitchen… Growing up, Chef Bapi loved watching raw ingredients transform into stunning, delicious meals. He saw how much his mom loved to be in the kitchen, and he wanted to join in on the fun. Due to the tradition of women being in the kitchen, Chef Bapi’s father wasn’t entirely on board with the idea of him participating in the “kitchen chores”. But, Chef Bapi’s passion was too great, and his mom was happy to pass along her culinary knowledge to her eager son.
            </p>
          </div>
        </div>

        {/* Quote Section with Side Ornaments */}
        <div className="py-16 md:py-24 flex items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
          <img src="/assets/Left_partition.png" alt="Left Ornament" className="h-12 md:h-24 opacity-80 shrink-0" />
          <h3 className="font-serif text-2xl md:text-3xl text-brand-navy text-center leading-relaxed italic">
            "There was never deprivation of having the chance to indulge in real, homemade food. My mom was an amazing cook, and I was so fortunate to have been able to grow up eating her meals. She put so much love and passion into everything she made. It wasn’t fancy, but it tasted so good!"
          </h3>
          <img src="/assets/right_partion.png" alt="Right Ornament" className="h-12 md:h-24 opacity-80 shrink-0" />
        </div>

        {/* The Craft Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8 relative">

            {/* Floating Rasgulla */}
            <motion.img
              animate={{ y: [0, 15, 0], rotate: [0, -2, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src="/assets/Ornament1.png"
              alt="Pani Puri"
              className="absolute -top-44 -left-10 md:-left-20 w-68 h-48 md:w-40 md:h-40 object-contain opacity-90 drop-shadow-2xl z-10 hidden sm:block"
            />

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-brand-blue"></div>
              <h3 className="text-brand-blue tracking-[0.2em] text-xs uppercase font-bold">
                The Bond
              </h3>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-navy leading-tight">Breaking Barriers By Breaking Bread… Together</h2>
            <p className="text-brand-navy/80 leading-relaxed text-lg">
              Chef Bapi and his mom would bond in the kitchen day in and day out. Whether they were filled with cheer, or stressed from a tough day, they knew they’d be able to ground themselves in the kitchen. Cooking provided a sense of peace and the kitchen quickly became a space to create memories they’d cherish forever.
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-navy/5 relative mt-8">
              <div className="absolute -top-4 -left-4 text-6xl text-brand-orange/20 font-serif">"</div>
              <p className="text-brand-navy/90 leading-relaxed text-lg italic relative z-10">
                Cooking with my mom was so important to my upbringing. It’s how we bonded, and I hold those memories so close to my heart. Some days, my dad would come home from work stressed, and my mom would be upset. I knew that as soon as we were in the kitchen cooking, she would be able to smile and forget about her day. It became a way to relieve my mom’s pain, and share my love for my family through food.
              </p>
              <div className="mt-6 pt-6 border-t border-brand-navy/10">
                <p className="font-bold text-brand-navy text-lg">Chef Bapi Das</p>
                <p className="text-brand-orange text-sm font-bold tracking-widest uppercase">Owner & Executive Chef</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 about-img rounded-3xl overflow-hidden h-[500px] md:h-[600px] shadow-2xl relative">
            <img src="/assets/real_assets/kitchen001-2.png" alt="Cooking" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Bottom Ornamental Divider */}
        <div className="flex justify-center pt-20 md:pt-32">
          <img src="/assets/divider2_rev.png" alt="Ornament" className="h-8 md:h-12 opacity-80" />
        </div>

      </div>
    </div>
  );
}
