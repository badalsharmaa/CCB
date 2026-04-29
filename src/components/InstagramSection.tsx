import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const IG_POSTS = [
  "/assets/real_assets/food057.png",
  "/assets/real_assets/food103.png",
  "/assets/real_assets/food014.png",
  "/assets/real_assets/food067.png",
  "/assets/real_assets/storefront001.png",
  "/assets/real_assets/thali001.png",
  "/assets/real_assets/food104.png",
  "/assets/real_assets/food098.png",
  "/assets/real_assets/food086.png",
  "/assets/real_assets/food061.png"
];

export function InstagramSection() {
  return (
    <section className="py-24 bg-brand-cream-light relative overflow-hidden border-t border-brand-navy/5">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-white shadow-md mb-6 text-brand-orange">
            <Instagram className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-4">Follow the Flavor</h2>
          <a href="https://www.instagram.com/calcutta_chaat_bakery/" className="text-brand-blue font-bold tracking-widest uppercase text-sm hover:text-brand-orange transition-colors">
            @calcutta_chaat_bakery
          </a>
        </motion.div>
      </div>

      <div className="flex overflow-hidden gap-4 max-w-[100vw]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex gap-4 min-w-max px-2"
        >
          {/* Duplicate array to create seamless loop */}
          {[...IG_POSTS, ...IG_POSTS].map((img, i) => (
            <div key={i} className="w-64 h-64 md:w-80 md:h-80 relative group rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer shadow-lg border-4 border-brand-white">
              <img
                src={img}
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <Instagram className="w-10 h-10 text-brand-white transform scale-50 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
