import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const POSTS = [
  {
    title: "The Secret Behind Our Signature Biryani",
    date: "OCT 12, 2025",
    image: "/assets/real_assets/food053.png",
    category: "Kitchen Secrets"
  },
  {
    title: "Why Kolkata Street Food is Taking Over the Bay Area, CA",
    date: "SEP 28, 2025",
    image: "/assets/real_assets/food063.png",
    category: "Culture"
  },
  {
    title: "Meet Chef Bapi Das: The Man Behind the Menu",
    date: "AUG 15, 2025",
    image: "/assets/real_assets/owner.png",
    category: "Team"
  }
];

export function BlogSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-1 bg-brand-yellow"></div>
              <h3 className="text-brand-yellow tracking-[0.2em] text-xs uppercase font-bold">Journal</h3>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-brand-navy leading-none">
              Stories from the <span className="italic text-brand-orange">Kitchen.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button className="text-sm uppercase tracking-widest text-brand-navy font-bold border-b-2 border-brand-blue pb-1 hover:text-brand-orange transition-colors duration-300 flex items-center gap-2 group">
              <span>Read All Posts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-md border-4 border-brand-cream">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-brand-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm">
                  {post.category}
                </div>
              </div>
              <p className="text-brand-orange text-xs font-bold tracking-widest mb-3">{post.date}</p>
              <h4 className="font-serif text-2xl text-brand-navy mb-4 group-hover:text-brand-blue transition-colors leading-tight flex-grow">
                {post.title}
              </h4>
              <p className="text-sm font-bold uppercase tracking-widest text-brand-navy/50 group-hover:text-brand-navy transition-colors flex items-center gap-2 mt-auto">
                Read Article <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all" />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
