import React, { useRef, useState, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle, Phone, Mail, Users, Utensils, MapPin, ArrowRight, Sparkles, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { escapeHtml, isReadable, isValidEmail, isValidName, isValidMessage } from '../utils/security';

gsap.registerPlugin(ScrollTrigger);

export function Catering() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    eventDate: '',
    guests: '',
    eventType: 'Corporate Gala',
    message: '',
    company: '', // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [mountTime] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => setCanSubmit(true), 3000); // 3s delay
    return () => clearTimeout(timer);
  }, []);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    
    // Auto-format MM/DD/YYYY
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = value.slice(0, 2);
      if (value.length > 2) {
        formattedValue += '/' + value.slice(2, 4);
        if (value.length > 4) {
          formattedValue += '/' + value.slice(4, 8);
        }
      }
    }
    setFormData({ ...formData, eventDate: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check
    if (formData.company) {
      console.log('Bot detected: Honeypot filled');
      setSubmitStatus('success');
      return;
    }

    // 2. Time-based check
    if (Date.now() - mountTime < 3000) {
      setErrorMessage('Please wait a moment before submitting.');
      setSubmitStatus('error');
      return;
    }

    // 3. Validation
    if (!isValidName(formData.fullName)) {
      setErrorMessage('Please enter a valid name (2-50 characters).');
      setSubmitStatus('error');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setSubmitStatus('error');
      return;
    }
    if (!formData.eventDate || formData.eventDate.length < 10) {
      setErrorMessage('Please enter a valid date (MM/DD/YYYY).');
      setSubmitStatus('error');
      return;
    }
    if (!formData.guests || parseInt(formData.guests) < 1) {
      setErrorMessage('Please enter a valid number of guests.');
      setSubmitStatus('error');
      return;
    }
    if (formData.message && !isValidMessage(formData.message)) {
      setErrorMessage('Special requests must be between 20 and 500 characters.');
      setSubmitStatus('error');
      return;
    }

    // 4. Gibberish Detection
    if (!isReadable(formData.fullName) || (formData.message && !isReadable(formData.message))) {
      console.log('Bot detected: Gibberish input');
      setSubmitStatus('success');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 5. Sanitization & Submission
    const sanitizedData = {
      fullName: escapeHtml(formData.fullName),
      email: escapeHtml(formData.email),
      eventDate: escapeHtml(formData.eventDate),
      guests: escapeHtml(formData.guests),
      eventType: escapeHtml(formData.eventType),
      message: escapeHtml(formData.message),
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Catering inquiry submitted:', sanitizedData);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        eventDate: '',
        guests: '',
        eventType: 'Corporate Gala',
        message: '',
        company: '',
      });
    } catch (error) {
      setErrorMessage('Failed to submit inquiry. Please try again later.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    // Hero Animations
    gsap.from(".hero-text-line", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    });

    // Services Section
    gsap.from(".animate-service", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 80%",
        once: true
      }
    });

    // Form Section
    gsap.from(".animate-form", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".form-section",
        start: "top 90%",
        once: true
      }
    });
  }, { scope: container });

  const stats = [
    { label: 'Events Hosted', value: '500+', icon: Utensils },
    { label: 'Happy Guests', value: '50k+', icon: Users },
    { label: 'Experience', value: '15+ Years', icon: Sparkles }
  ];

  const features = [
    {
      title: 'Live Stations',
      desc: 'The sizzle of the tawa, the aroma of fresh spices—our live counters are a theatrical experience.',
      icon: Utensils,
      bg: 'bg-brand-orange/5',
      iconBg: 'bg-brand-orange/10',
      iconColor: 'text-brand-orange'
    },
    {
      title: 'Expert Planning',
      desc: 'Our concierge team handles every detail, from menu curation to logistics and setup.',
      icon: Sparkles,
      bg: 'bg-brand-navy/5',
      iconBg: 'bg-brand-navy/10',
      iconColor: 'text-brand-navy'
    },
    {
      title: 'Authentic Soul',
      desc: 'Recipes passed down through generations, prepared with passion and the finest ingredients.',
      icon: CheckCircle,
      bg: 'bg-brand-yellow/20',
      iconBg: 'bg-brand-yellow/30',
      iconColor: 'text-brand-navy'
    }
  ];

  return (
    <div ref={container} className="min-h-screen bg-brand-cream font-sans">

      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center pt-40 pb-32 overflow-hidden">
        <div className="hero-bg-reveal absolute inset-0 z-0">
          <img
            src="/assets/real_assets/storefront001.png"
            alt="Catering Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/20 to-brand-cream"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 bg-brand-yellow/20 backdrop-blur-md px-6 py-2 rounded-full border border-brand-yellow/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-yellow">Exquisite Catering</span>
          </motion.div>

          <h1 className="hero-text-line font-serif text-5xl md:text-8xl text-white mb-6 leading-[1.1]">
            Elevate Your <span className="italic text-brand-yellow">Celebrations</span>
          </h1>
          <p className="hero-text-line text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Bringing the soul of Kolkata street food to your most cherished moments. From intimate gatherings to grand galas.
          </p>

          <div className="hero-text-line flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#quote-form" className="px-10 py-5 bg-brand-orange text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-brand-orange/90 transition-all shadow-xl shadow-brand-orange/20 hover:-translate-y-1 flex items-center justify-center gap-3 group">
              Get Your Custom Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/catering-concierge" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white/20 transition-all flex items-center justify-center gap-3">
              <Sparkles className="w-4 h-4 text-brand-yellow" /> Chat with Concierge
            </a>
          </div>
        </div>
      </div>

      {/* Stats/Badge Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-brand-navy/5 flex items-center gap-6 border border-brand-navy/5"
              >
                <div className="w-14 h-14 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-orange">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-brand-navy">{stat.value}</p>
                  <p className="text-sm font-bold tracking-widest uppercase text-brand-navy/40">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-6xl text-brand-navy mb-6">Unforgettable Service</h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-brand-navy/60 max-w-2xl mx-auto">
              We don't just serve food; we create an immersive culinary journey that transports your guests to the bustling lanes of Kolkata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
                  className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-brand-navy/5 hover:shadow-2xl transition-shadow duration-500 group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
                  <div className={`w-16 h-16 ${item.iconBg} rounded-2xl flex items-center justify-center mb-8 relative z-10`}>
                    <Icon className={`w-8 h-8 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4 text-brand-navy relative z-10">{item.title}</h3>
                  <p className="text-brand-navy/60 leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ornamental Divider */}
      <div className="flex justify-center py-12">
        <img src="/assets/divider2.png" alt="Ornament" className="h-12 opacity-80" />
      </div>

      {/* Services Section */}
      <div className="services-section py-32 px-6 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/assets/real_assets/kitchen001-2.png" alt="Pattern" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="animate-service">
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">Corporate & <br /><span className="italic text-brand-yellow">Special Events</span></h2>
              <p className="text-white/70 text-lg mb-12 leading-relaxed">
                Whether it's a high-stakes board meeting or a festive holiday party, our catering brings a refreshing burst of flavor and energy to your workplace.
              </p>
              <div className="space-y-6">
                {[
                  'Customized Lunch Boxes',
                  'Full-Service Buffet Layouts',
                  'Interactive Live Stations',
                  'Dietary Specializations (Vegan/Jain)'
                ].map((li, i) => (
                  <div key={li} className="flex items-center gap-4 text-white">
                    <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium tracking-wide">{li}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-service relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl transform rotate-2 border-8 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
                  alt="Events"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <motion.img
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                src="/assets/Ornament1.png"
                className="absolute -bottom-10 -left-10 w-40 h-40 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lead Generation Form Area */}
      <div id="quote-form" className="form-section py-32 px-6 relative">
        <div className="absolute top-40 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-0 w-64 h-64 bg-brand-navy/5 rounded-full blur-3xl"></div>

        <div className="animate-form max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-brand-navy/5 relative z-10">
          <div className="flex flex-col lg:flex-row w-full">
            {/* Contact Info Side */}
            <div className="bg-brand-navy text-white p-12 lg:w-2/5 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="font-serif text-4xl mb-8">Let's Craft Your <span className="italic text-brand-yellow">Perfect Menu</span></h3>
                <p className="text-white/60 mb-12 text-lg leading-relaxed">Fill out the details and our catering specialist will reach out within 24 hours.</p>

                <div className="space-y-10">
                  {[
                    { icon: Phone, label: 'Phone', value: '(507) 419 4523' },
                    { icon: Mail, label: 'Email Us', value: 'catering@calcuttachaat.com' },
                    { icon: MapPin, label: 'Service Area', value: 'San Francisco Bay Area' }
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-6 group">
                        <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-brand-orange/20 transition-colors">
                          <Icon className="w-6 h-6 text-brand-orange" />
                        </div>
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">{item.label}</p>
                          <p className="font-bold text-xl">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-12 lg:w-3/5">
              <div className="flex items-center gap-3 mb-12">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <h3 className="font-serif text-2xl text-brand-navy">Request a Consultation</h3>
              </div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/10">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl text-brand-navy mb-2">Inquiry Received!</h3>
                      <p className="text-brand-navy/60 max-w-sm mx-auto">Our catering concierge will review your details and reach out within 24 hours.</p>
                    </div>
                    <button 
                      onClick={() => setSubmitStatus('idle')}
                      className="px-8 py-3 bg-brand-navy text-white font-bold rounded-xl hover:bg-brand-orange transition-colors shadow-lg"
                    >
                      New Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Honeypot Field */}
                    <div className="hidden">
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={(e) => setFormData({...formData, company: e.target.value})} 
                        tabIndex={-1} 
                        autoComplete="off" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold text-brand-navy uppercase tracking-[0.2em] opacity-50 group-focus-within:opacity-100 transition-opacity">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full bg-brand-cream/30 border-b-2 border-brand-navy/10 py-3 focus:border-brand-orange outline-none transition-all font-medium" 
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold text-brand-navy uppercase tracking-[0.2em] opacity-50 group-focus-within:opacity-100 transition-opacity">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-brand-cream/30 border-b-2 border-brand-navy/10 py-3 focus:border-brand-orange outline-none transition-all font-medium" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold text-brand-navy uppercase tracking-[0.2em] opacity-50 group-focus-within:opacity-100 transition-opacity">Event Date</label>
                        <input 
                          type="text" 
                          placeholder="MM/DD/YYYY"
                          value={formData.eventDate}
                          onChange={handleDateChange}
                          required
                          maxLength={10}
                          className="w-full bg-brand-cream/30 border-b-2 border-brand-navy/10 py-3 focus:border-brand-orange outline-none transition-all font-medium" 
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold text-brand-navy uppercase tracking-[0.2em] opacity-50 group-focus-within:opacity-100 transition-opacity">Expected Guests</label>
                        <input 
                          type="number" 
                          required
                          value={formData.guests}
                          onChange={(e) => setFormData({...formData, guests: e.target.value})}
                          className="w-full bg-brand-cream/30 border-b-2 border-brand-navy/10 py-3 focus:border-brand-orange outline-none transition-all font-medium" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-brand-navy uppercase tracking-[0.2em] opacity-50 group-focus-within:opacity-100 transition-opacity">Event Type</label>
                      <select 
                        value={formData.eventType}
                        onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                        className="w-full bg-brand-cream/30 border-b-2 border-brand-navy/10 py-3 focus:border-brand-orange outline-none transition-all font-medium appearance-none bg-transparent"
                      >
                        <option>Corporate Gala</option>
                        <option>Wedding Celebration</option>
                        <option>Private Soiree</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-brand-navy uppercase tracking-[0.2em] opacity-50 group-focus-within:opacity-100 transition-opacity">Special Requests</label>
                      <textarea 
                        rows={3} 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Any dietary restrictions or specific themes?"
                        className="w-full bg-brand-cream/30 border-b-2 border-brand-navy/10 py-3 focus:border-brand-orange outline-none transition-all font-medium resize-none"
                      ></textarea>
                    </div>

                    {submitStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm border border-red-100"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <p>{errorMessage}</p>
                      </motion.div>
                    )}

                    <div className="space-y-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting || !canSubmit}
                        className="w-full bg-brand-navy text-white font-bold text-sm tracking-[0.3em] py-5 rounded-2xl hover:bg-brand-orange transition-all shadow-xl shadow-brand-navy/10 hover:shadow-brand-orange/30 uppercase flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>Submit Inquiry <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                      {!canSubmit && (
                        <p className="text-[10px] text-center text-brand-navy/40 uppercase tracking-tighter">Secure verification in progress...</p>
                      )}
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-24">
        <img src="/assets/divider2_rev.png" alt="Ornament" className="h-12 opacity-80" />
      </div>
    </div>
  );
}
