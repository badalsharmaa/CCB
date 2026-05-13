import { motion } from 'motion/react';
import { ArrowRight, Clock3, MapPin, MessageSquare, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const signatureDishes = [
  {
    name: 'Kolkata Chicken Biryani',
    description: 'Fragrant rice, tender chicken, the signature potato, and slow-built spice.',
    price: '$18',
    image: '/assets/v2/biryani.jpg',
    accent: 'from-[#8D3E16] to-[#D97706]',
  },
  {
    name: 'Street-Style Momos',
    description: 'Steamed dumplings with the kind of comfort and heat that keeps regulars coming back.',
    price: '$13',
    image: '/assets/v2/momos.jpg',
    accent: 'from-[#0F4C81] to-[#0EA5E9]',
  },
  {
    name: 'Late-Night Indo-Chinese',
    description: 'Wok-fired, smoky, and unapologetically bold with the right level of chaos.',
    price: '$16',
    image: '/assets/v2/kitchen-fire.jpg',
    accent: 'from-[#7C2D12] to-[#EA580C]',
  },
];

const locations = [
  {
    name: 'Fremont',
    address: '4906 Paseo Padre Pkwy, Fremont, CA 94555',
    phone: '507-419-4523',
  },
  {
    name: 'Milpitas',
    address: '81 S Main Street, Milpitas, CA 95035',
    phone: null,
  },
];

const proofs = [
  '4.8-star local love',
  'Two Bay Area locations',
  'Pickup, catering, and smart ordering',
];

export function HomeV2() {
  return (
    <main className="min-h-screen bg-[#f7ecd8] text-brand-navy">
      <header className="sticky top-0 z-50 border-b border-brand-navy/10 bg-[#f7ecd8]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Calcutta Chaat & Bakery" className="h-12 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-orange">Version 2</p>
              <p className="font-serif text-xl">Calcutta Chaat</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#menu" className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-navy/70 transition-colors hover:text-brand-orange">
              Menu
            </a>
            <a href="#story" className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-navy/70 transition-colors hover:text-brand-orange">
              Story
            </a>
            <a href="#locations" className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-navy/70 transition-colors hover:text-brand-orange">
              Locations
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden rounded-full border border-brand-navy/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange sm:inline-flex"
            >
              Current Home
            </Link>
            <Link
              to="/order"
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-brand-orange"
            >
              Order Online
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14">
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.28),_transparent_44%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.15),_transparent_34%)]" />
        <div className="absolute right-0 top-16 hidden lg:block">
          <img src="/assets/howrah-bridge.png" alt="" aria-hidden="true" className="h-[28rem] w-auto opacity-[0.08]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl pt-8 lg:pt-12"
          >
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-brand-navy/10 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-orange" />
              Bengali street food, refined for the Bay
            </div>

            <h1 className="max-w-xl font-serif text-5xl leading-[0.94] text-brand-navy md:text-7xl lg:text-[5.5rem]">
              Kolkata comfort,
              <span className="block italic text-brand-orange">Bay Area rhythm.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-navy/70 md:text-xl">
              A quieter, stronger homepage direction: real food forward, heritage visible, and ordering kept simple.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/order"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-orange px-7 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white shadow-lg shadow-brand-orange/20 transition-all hover:-translate-y-0.5 hover:bg-brand-orange/90"
              >
                Start Pickup Order
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-brand-navy/15 px-7 py-4 text-sm font-bold uppercase tracking-[0.24em] text-brand-navy transition-all hover:border-brand-navy hover:bg-white/70"
              >
                Explore Signature Dishes
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {proofs.map((proof) => (
                <div key={proof} className="rounded-[1.75rem] border border-brand-navy/10 bg-white/55 px-5 py-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">Why it works</p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-brand-navy/75">{proof}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="relative lg:min-h-[44rem]"
          >
            <div className="relative overflow-hidden rounded-[2.25rem] border border-brand-navy/10 bg-[#1a2435] shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
              <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[24rem] md:min-h-[42rem]">
                  <img src="/assets/v2/biryani.jpg" alt="Kolkata chicken biryani" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2435]/70 via-[#1a2435]/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">Signature Plate</p>
                    <h2 className="mt-3 max-w-sm font-serif text-3xl leading-tight md:text-5xl">
                      Built around dishes people already crave.
                    </h2>
                  </div>
                </div>

                <div className="grid gap-0 border-t border-white/10 md:border-l md:border-t-0">
                  <div className="relative min-h-[14rem] overflow-hidden border-b border-white/10">
                    <img src="/assets/v2/momos.jpg" alt="Steamed momos" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
                    <div className="absolute bottom-0 p-5 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">Street Favorite</p>
                      <p className="mt-2 font-serif text-2xl">Momos with bite.</p>
                    </div>
                  </div>

                  <div className="relative flex min-h-[16rem] flex-col justify-between bg-[#111827] p-6 text-white md:min-h-[18rem]">
                    <div className="absolute right-0 top-0 opacity-15">
                      <img src="/assets/taxi-tram.png" alt="" aria-hidden="true" className="h-32 w-auto" />
                    </div>
                    <div className="relative">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">Operational clarity</p>
                      <div className="mt-5 grid gap-4">
                        <div className="flex items-center gap-3">
                          <Clock3 className="h-4 w-4 text-brand-yellow" />
                          <span className="text-sm text-white/78">Fast pickup flow with clear order intent</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="h-4 w-4 text-brand-yellow" />
                          <span className="text-sm text-white/78">Restaurant-first messaging, not startup-first</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/catering"
                      className="relative inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                    >
                      Catering
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="menu" className="px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue">Signature dishes</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-navy md:text-6xl">
                A stronger homepage should sell dishes,
                <span className="block italic text-brand-orange">not abstract moods.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-brand-navy/70">
              This version moves from concept-card language into concrete menu anchors with price context and sharper visual hierarchy.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {signatureDishes.map((dish, index) => (
              <motion.article
                key={dish.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                className="overflow-hidden rounded-[2rem] border border-brand-navy/10 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${dish.accent} opacity-90`} />
                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#111827]/65 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                    {dish.price}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-3xl text-brand-navy">{dish.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-brand-navy/68">{dish.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">Best seller</span>
                    <Link to="/order" className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition-colors hover:text-brand-orange">
                      Add to cart
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="border-y border-brand-navy/10 bg-white/40 px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-brand-navy/10 bg-brand-navy shadow-[0_22px_60px_rgba(15,23,42,0.16)]">
            <img src="/assets/v2/kitchen-fire.jpg" alt="Food being cooked over open flame" className="h-full min-h-[24rem] w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/25 to-transparent" />
            <div className="absolute bottom-0 p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">Kitchen energy</p>
              <p className="mt-3 max-w-sm font-serif text-3xl leading-tight">The page gets better when the cooking feels immediate.</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange">Brand direction</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-brand-navy md:text-6xl">
              Heritage up front.
              <span className="block italic text-brand-blue">Tech as a quiet convenience layer.</span>
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.8rem] border border-brand-navy/10 bg-[#f7ecd8] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-orange">Storytelling</p>
                <p className="mt-4 text-base leading-relaxed text-brand-navy/72">
                  The main narrative should be Bengali street food, family memory, and Bay Area community. That reads warmer and more believable than leading with AI language.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-brand-navy/10 bg-white p-6">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-blue">Utility</p>
                <p className="mt-4 text-base leading-relaxed text-brand-navy/72">
                  The AI assistant still belongs here, but as a lightweight ordering shortcut after trust, appetite, and place have already been established.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-brand-navy/10 bg-brand-navy p-7 text-white shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">Smart ordering, reduced</p>
                  <h3 className="mt-3 font-serif text-3xl">Chat to order should feel helpful, not dominant.</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/75">
                    Keep the feature, but move it into a clear supporting slot with practical language about dietary questions, spice preference, and quick pickup planning.
                  </p>
                </div>
                <Link
                  to="/order"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-yellow px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-brand-navy transition-colors hover:bg-white"
                >
                  <MessageSquare className="h-4 w-4" />
                  Try Ordering Flow
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="locations" className="px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue">Trust block</p>
              <h2 className="mt-4 font-serif text-4xl text-brand-navy md:text-6xl">
                Put the real-world proof
                <span className="block italic text-brand-orange">higher on the page.</span>
              </h2>
            </div>
            <div className="rounded-[1.6rem] border border-brand-navy/10 bg-white px-6 py-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">Open daily</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/72">Mon to Thu 11 AM to 9:30 PM, Fri to Sat 11 AM to 10 PM, Sun 11 AM to 9:30 PM</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-5">
              {locations.map((location) => (
                <div key={location.name} className="rounded-[2rem] border border-brand-navy/10 bg-white px-6 py-6 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">Location</p>
                      <h3 className="mt-2 font-serif text-3xl text-brand-navy">{location.name}</h3>
                      <div className="mt-3 flex items-start gap-3 text-brand-navy/72">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                        <p className="text-sm leading-relaxed">{location.address}</p>
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] bg-[#f7ecd8] px-5 py-4">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">Contact</p>
                      <p className="mt-2 text-sm font-semibold text-brand-navy">{location.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[2.2rem] border border-brand-navy/10 bg-brand-navy p-8 text-white shadow-[0_22px_60px_rgba(15,23,42,0.14)]">
              <div className="absolute bottom-0 right-0 opacity-20">
                <img src="/assets/tea.png" alt="" aria-hidden="true" className="h-52 w-auto" />
              </div>
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">Why this layout is stronger</p>
                <ul className="mt-6 space-y-5 text-sm leading-relaxed text-white/78">
                  <li className="flex gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                    The page reads like a restaurant brand first, then a digital product.
                  </li>
                  <li className="flex gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                    The hierarchy is calmer: fewer competing cards, fewer floating decorations, clearer CTAs.
                  </li>
                  <li className="flex gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                    Conversion cues such as locations, hours, and dishes appear earlier and with less friction.
                  </li>
                </ul>
                <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-yellow">Next step</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/78">
                    If this direction is right, the next upgrade should be swapping in real Calcutta Chaat photography and applying the same visual system to About, Catering, and Contact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-brand-navy/10 bg-[linear-gradient(135deg,#0f172a,#172554)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)] md:px-12 md:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">Standalone prototype</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
                Version 2 now lives separately,
                <span className="block italic text-brand-yellow">without touching the current homepage.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:border-brand-yellow hover:text-brand-yellow"
              >
                Back to current home
              </Link>
              <Link
                to="/order"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-yellow px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-brand-navy transition-colors hover:bg-white"
              >
                Test order flow
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
