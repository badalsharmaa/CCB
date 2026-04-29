import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import { HeadingWithDividers } from '../components/HeadingOrnament';

export function Contact() {
  return (
    <div className="min-h-screen bg-brand-cream-light font-sans overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-40 pb-24 flex items-center justify-center bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/assets/taxi-tram.png"
            alt="Kolkata Streets"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/80 to-brand-navy"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <HeadingWithDividers invert className="justify-center mb-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white">Get in Touch</h1>
          </HeadingWithDividers>
          <p className="text-lg md:text-xl text-brand-yellow font-medium max-w-2xl mx-auto leading-relaxed">
            Whether you're craving a specific chaat, planning a grand celebration, or just want to share your love for Bengali food, we're here to listen.
          </p>
        </motion.div>

        {/* Floating Ornaments */}
        <motion.img
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          src="/assets/Ornament11.png"
          alt=""
          className="absolute -bottom-10 -left-10 w-48 h-48 object-contain opacity-30 z-10 hidden lg:block pointer-events-none"
        />
        <motion.img
          animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          src="/assets/Ornament7.png"
          alt=""
          className="absolute top-20 -right-10 w-64 h-64 object-contain opacity-20 z-10 hidden lg:block pointer-events-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-brand-navy/5 relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
              <img src="/assets/Ornament3.png" alt="" className="w-full h-full object-contain" />
            </div>

            <div className="relative z-10">
              <h2 className="font-serif text-3xl text-brand-navy mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest ml-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Rohit"
                      className="w-full bg-brand-cream-light/30 border border-brand-navy/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest ml-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Das"
                      className="w-full bg-brand-cream-light/30 border border-brand-navy/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="hello@example.com"
                    className="w-full bg-brand-cream-light/30 border border-brand-navy/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea 
                    rows={5} 
                    placeholder="Tell us what's on your mind..."
                    className="w-full bg-brand-cream-light/30 border border-brand-navy/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="button" 
                  className="w-full py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-brand-navy transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20 group"
                >
                  <span className="tracking-widest uppercase text-sm">Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Location Cards */}
            <div className="bg-brand-navy text-white p-10 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:opacity-20 transition-opacity">
                <img src="/assets/Ornament10.png" alt="" className="w-full h-full object-contain" />
              </div>
              
              <h3 className="font-serif text-3xl mb-8 flex items-center gap-3">
                <MapPin className="text-brand-yellow w-6 h-6" /> Our Locations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <h4 className="font-bold text-xl text-brand-yellow">Fremont</h4>
                  <a 
                    href="https://maps.app.goo.gl/FMBayRqrko9ScZCY8"
                    className="text-brand-cream/80 leading-relaxed">  
                    4906 Paseo Padre Pkwy<br/>Fremont, CA 94555
                  </a>
                  <a 
                    href="tel:+15074194523" 
                    className="inline-block font-bold text-white hover:text-brand-orange transition-colors mt-2"
                  >
                    (507) 419 4523
                  </a>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-xl text-brand-yellow">Milpitas</h4>
                  <a 
                    href="https://maps.app.goo.gl/kFLuyPxC8shVrPW68"
                    className="text-brand-cream/80 leading-relaxed">
                    81 S Main Street<br/>Milpitas, CA 95035
                  </a>
                  <a 
                    href="tel:+16693198966" 
                    className="inline-block font-bold text-white hover:text-brand-orange transition-colors mt-2"
                  >
                    (669) 319 8966
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Hours Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] border border-brand-navy/5 shadow-lg flex flex-col items-center text-center group hover:border-brand-orange/30 transition-colors">
                <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-brand-navy mb-2">Email Us</h4>
                <p className="text-brand-navy/60 text-sm mb-4">Direct inquiries to our team</p>
                <a href="mailto:info@calcuttachaat.com" className="font-bold text-brand-navy hover:text-brand-orange transition-colors">
                  info@calcuttachaat.com
                </a>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-brand-navy/5 shadow-lg flex flex-col items-center text-center group hover:border-brand-yellow/30 transition-colors">
                <div className="w-16 h-16 bg-brand-yellow/10 text-brand-yellow rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-brand-navy mb-2">Hours</h4>
                <p className="text-brand-navy/60 text-sm mb-2">Tue – Sun</p>
                <p className="font-bold text-brand-navy">
                  11:30 AM – 9:00 PM
                </p>
                <p className="text-brand-orange text-xs font-bold mt-2">CLOSED MONDAYS</p>
              </div>
            </div>

            {/* Social / Extra Info */}
            <div className="flex justify-center pt-4">
              <img src="/assets/dividers/divider-2.png" alt="" className="h-8 opacity-40" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
