import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Sparkles, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Varying column widths for organic, layered feel (must sum to 100)
const COLUMNS = [
  { width: '16%', shade: '#0F172A' },
  { width: '14%', shade: '#111827' },
  { width: '18%', shade: '#0F172A' },
  { width: '15%', shade: '#111827' },
  { width: '19%', shade: '#0F172A' },
  { width: '18%', shade: '#111827' },
];

const NAV_LINKS = [
  {
    name: 'Order Online',
    path: '/order',
    panelImage: '/assets/hero-bg.jpg',
    panelLabel: 'Fresh & Hot Daily',
  },
  {
    name: 'About Us',
    path: '/about',
    panelImage: '/assets/catering-blog-bg.jpg',
    panelLabel: 'Our Kolkata Story',
  },
  {
    name: 'Catering',
    path: '/catering',
    panelImage: '/assets/catering-blog-bg.jpg',
    panelLabel: 'Events & Gatherings',
  },
  {
    name: 'Contact',
    path: '/contact',
    panelImage: '/assets/hero-bg.jpg',
    panelLabel: 'Say Hello',
  },
];

export function Navbar({ isLight = false }: { isLight?: boolean }) {
  const { user, login, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsDrawerOpen(false); }, [location]);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  // ESC to close
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsDrawerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDrawerOpen]);

  const navTextColor = isLight ? 'text-white' : 'text-brand-navy';
  const loginTextColor = isLight ? 'text-white' : 'text-brand-navy';
  const hamburgerBg = isLight ? 'bg-white/20' : 'bg-brand-navy/10';
  const hamburgerIconColor = isLight ? 'text-white' : 'text-brand-navy';

  const activePanelIndex = hoveredLink !== null ? hoveredLink : 0;

  return (
    <>
      {/* ── Top transparent navbar (visible only at top) ── */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            key="top-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-transparent"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-start justify-between pt-6">
              <Link to="/" className="flex-shrink-0 relative group">
                {/* Focal point gradient background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-radial-[at_center] from-white/60 via-white/20 to-transparent blur-3xl -z-10 group-hover:from-white/80 transition-all duration-700" />
                
                <img
                  src="/assets/logo.png"
                  alt="Calcutta Chaat & Bakery"
                  className="h-24 md:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                />
              </Link>

              <div className="hidden md:flex items-center gap-8 pt-6">
                {NAV_LINKS.map(link => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? 'text-brand-orange' : `${navTextColor} hover:text-brand-orange`
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {user ? (
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`w-10 h-10 rounded-full border-2 ${isLight ? 'border-white' : 'border-brand-navy'} overflow-hidden hover:border-brand-orange transition-colors`}
                  >
                    {user.photoURL
                      ? <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                      : <User className={`w-5 h-5 m-auto ${isLight ? 'text-white' : 'text-brand-navy'}`} />}
                  </button>
                ) : (
                  <button onClick={login} className={`text-sm font-bold tracking-widest uppercase ${loginTextColor} hover:text-brand-orange transition-colors`}>
                    Login
                  </button>
                )}

                <Link to="/order" className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-navy text-white hover:bg-brand-orange transition-colors shadow-lg">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-yellow text-brand-navy text-[10px] font-bold flex items-center justify-center rounded-full">2</span>
                </Link>
              </div>

              {/* Mobile hamburger (top) */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className={`md:hidden mt-4 w-11 h-11 flex items-center justify-center rounded-full ${hamburgerBg} ${hamburgerIconColor} hover:bg-brand-navy hover:text-white transition-colors`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Floating hamburger (appears on scroll) ── */}
      <AnimatePresence>
        {isScrolled && !isDrawerOpen && (
          <motion.button
            key="fab-menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsDrawerOpen(true)}
            className="fixed top-6 right-6 z-50 w-14 h-14 bg-brand-navy text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-orange transition-colors duration-300 border-2 border-brand-yellow"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Full-screen premium overlay menu ── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div key="fullscreen-menu" className="fixed inset-0 z-[100] overflow-hidden">

            {/* Phase 1: Staggered column construction — drops top→bottom */}
            <div className="absolute inset-0 flex">
              {COLUMNS.map((col, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: 1,
                    transition: {
                      delay: i * 0.07,
                      duration: 0.55,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }}
                  exit={{
                    scaleY: 0,
                    transition: {
                      // reversed stagger: last column exits first; 0.25s delay lets content fade first
                      delay: 0.25 + (COLUMNS.length - 1 - i) * 0.055,
                      duration: 0.4,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }}
                  style={{
                    width: col.width,
                    backgroundColor: col.shade,
                    transformOrigin: 'top',
                  }}
                  className="h-full"
                />
              ))}
            </div>

            {/* Logo — sits above columns, no delay, no filter so it renders naturally */}
            <Link
              to="/"
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-5 left-8 z-10 pointer-events-auto group"
            >
              {/* Focal point gradient background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-radial-[at_center] from-white/40 via-white/10 to-transparent blur-3xl -z-10 group-hover:from-white/60 transition-all duration-700" />
              
              <img
                src="/assets/logo.png"
                alt="Calcutta Chaat & Bakery"
                className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Phase 2: Content layer — appears after columns fill screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5, duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.18 },
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="relative w-full h-full flex pointer-events-auto">

                {/* Close button */}
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                  className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-yellow hover:text-brand-yellow transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* ─── Left pane: primary navigation ─── */}
                <div className="flex-1 flex flex-col justify-center px-10 md:px-16 lg:px-24 pt-28 pb-12">
                  <nav>
                    {NAV_LINKS.map((link, i) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: 0.58 + i * 0.09,
                              duration: 0.55,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          }}
                          exit={{
                            opacity: 0,
                            y: 18,
                            transition: { delay: i * 0.045, duration: 0.18 },
                          }}
                        >
                          <Link
                            to={link.path}
                            onClick={() => setIsDrawerOpen(false)}
                            onMouseEnter={() => setHoveredLink(i)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="group relative block py-3 border-b border-white/10"
                          >
                            {/* Dual-layer text slide hover effect */}
                            <span className="relative block overflow-hidden leading-none">
                              {/* Layer 1 — default visible, slides up on hover */}
                              <span
                                className={`block font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight
                                  transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                                  group-hover:-translate-y-full
                                  ${isActive ? 'text-brand-yellow' : 'text-white'}`}
                              >
                                {link.name}
                              </span>
                              {/* Layer 2 — hidden below, slides in on hover */}
                              <span
                                className="absolute inset-0 block font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight
                                  text-brand-yellow
                                  translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                                  group-hover:translate-y-0"
                              >
                                {link.name}
                              </span>
                            </span>

                            {/* Item index */}
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white/18 text-xs font-mono tracking-widest select-none">
                              0{i + 1}
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Footer actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 1.05, duration: 0.5 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="mt-10 flex items-center flex-wrap gap-4"
                  >
                    <button className="flex items-center gap-2 py-2.5 px-6 rounded-full border border-white/25 text-white/75 font-bold text-xs tracking-widest uppercase hover:border-brand-yellow hover:text-brand-yellow transition-all duration-200">
                      <Sparkles className="w-3.5 h-3.5" /> Chat to Order
                    </button>

                    {user ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-white/25 overflow-hidden flex-shrink-0">
                          {user.photoURL
                            ? <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                            : <User className="w-4 h-4 m-auto text-white/60" />}
                        </div>
                        <span className="text-white/50 text-sm">{user.displayName}</span>
                        <button
                          onClick={() => { logout(); setIsDrawerOpen(false); }}
                          className="text-white/30 hover:text-white/70 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { login(); setIsDrawerOpen(false); }}
                        className="text-white/50 font-bold text-xs tracking-widest uppercase hover:text-white transition-colors"
                      >
                        Login
                      </button>
                    )}
                  </motion.div>
                </div>

                {/* ─── Right pane: visual panel (desktop only) ─── */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  }}
                  exit={{
                    opacity: 0,
                    x: 30,
                    transition: { duration: 0.18 },
                  }}
                  className="hidden lg:flex w-[42%] items-center justify-center p-14 relative"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePanelIndex}
                      initial={{ opacity: 0, scale: 0.94, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.03, y: -12 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full aspect-[3/4] max-h-[68vh] rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <img
                        src={NAV_LINKS[activePanelIndex].panelImage}
                        alt={NAV_LINKS[activePanelIndex].panelLabel}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/10 to-transparent" />
                      <div className="absolute bottom-8 left-8">
                        <p className="text-brand-yellow text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                          {NAV_LINKS[activePanelIndex].panelLabel}
                        </p>
                        <p className="text-white font-serif text-3xl leading-tight">
                          {NAV_LINKS[activePanelIndex].name}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Profile dropdown (desktop, top nav) ── */}
      <AnimatePresence>
        {showProfileMenu && user && !isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed top-20 right-12 z-50 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
          >
            <div className="px-4 py-2 border-b border-gray-100 mb-2">
              <p className="text-sm font-bold text-brand-navy truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => { logout(); setShowProfileMenu(false); }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
