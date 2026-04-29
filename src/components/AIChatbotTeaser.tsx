import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, ChefHat, User } from 'lucide-react';

const conversation = [
  { from: 'user', text: "I want something spicy but not too heavy for lunch." },
  { from: 'ai', text: "Perfect pick! Our Puchka & Chaat combo is light, tangy, and hits the right kick. Want a Masala Chai on the side?" },
  { from: 'user', text: "Yes please! Also — I'm lactose intolerant." },
  { from: 'ai', text: "All clear — Puchka is fully dairy-free. I've flagged your preference. What time works for pickup?" },
  { from: 'user', text: "1:00 PM works." },
  { from: 'ai', text: "Done! Order confirmed for 1:00 PM pickup. We'll see you then 🎉" },
];

const STEP_DELAY = 1400; // ms per message
const RESET_DELAY = 2800; // ms pause before restart

export function AIChatbotTeaser() {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function scheduleNext(count: number) {
      timerRef.current = setTimeout(() => {
        if (count < conversation.length) {
          setVisibleCount(count + 1);
          scheduleNext(count + 1);
        } else {
          timerRef.current = setTimeout(() => {
            setVisibleCount(0);
            scheduleNext(0);
          }, RESET_DELAY);
        }
      }, count === 0 ? 600 : STEP_DELAY);
    }

    scheduleNext(0);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);


  return (
    <section className="py-24 md:py-32 px-6 bg-brand-navy relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-orange/15 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              Always on
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl text-brand-white leading-[1.05] mb-6"
            >
              Meet your personal{' '}
              <span className="italic text-brand-yellow">culinary<br />concierge.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-brand-white/70 text-lg leading-relaxed mb-10 max-w-md"
            >
              Not sure what to order? Share your mood, spice preference, or dietary needs.
              Your concierge will curate the perfect meal, suggest pairings, and schedule
              your pickup — all in a simple chat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link to="/catering-concierge" className="px-8 py-4 bg-brand-yellow text-brand-navy hover:bg-white transition-all duration-300 rounded-full inline-flex items-center gap-3 font-bold shadow-xl hover:-translate-y-1 hover:shadow-brand-yellow/20">
                <MessageSquare className="w-5 h-5" />
                <span className="uppercase tracking-widest text-sm">Start Chatting</span>
              </Link>
            </motion.div>
          </div>

          {/* Right — animated chat window */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-brand-yellow/10 rounded-[2.5rem] blur-2xl" />

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center shadow-lg">
                  <ChefHat className="w-5 h-5 text-brand-navy" />
                </div>
                <div>
                  <p className="text-brand-white text-sm font-bold leading-none">Calcutta Concierge</p>
                  <p className="text-brand-white/40 text-xs mt-0.5">Your personal food guide</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 min-h-[320px] md:min-h-[360px] flex flex-col justify-end overflow-hidden">
                <AnimatePresence mode="sync">
                  {conversation.slice(0, visibleCount).map((msg, i) => (
                    <motion.div
                      key={`${i}-${visibleCount}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`flex items-end gap-2.5 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center shadow ${msg.from === 'ai'
                          ? 'bg-gradient-to-br from-brand-yellow to-brand-orange'
                          : 'bg-white/15 border border-white/20'
                        }`}>
                        {msg.from === 'ai'
                          ? <ChefHat className="w-3.5 h-3.5 text-brand-navy" />
                          : <User className="w-3.5 h-3.5 text-brand-white/80" />
                        }
                      </div>

                      {/* Bubble */}
                      <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === 'ai'
                          ? 'bg-white/10 text-brand-white rounded-bl-sm'
                          : 'bg-brand-yellow text-brand-navy font-medium rounded-br-sm'
                        }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator — shows between messages */}
                {visibleCount > 0 && visibleCount < conversation.length && conversation[visibleCount].from === 'ai' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center shadow">
                      <ChefHat className="w-3.5 h-3.5 text-brand-navy" />
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-brand-white/50 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Fake input bar */}
              <div className="px-5 py-4 border-t border-white/10 bg-white/5 flex items-center gap-3">
                <div className="flex-1 bg-white/10 rounded-full px-4 py-2.5 text-brand-white/30 text-sm">
                  Ask me anything…
                </div>
                <div className="w-9 h-9 rounded-full bg-brand-yellow flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-colors">
                  <MessageSquare className="w-4 h-4 text-brand-navy" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
