import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Send, Clock, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { HeadingWithDividers } from '../components/HeadingOrnament';
import { escapeHtml, isReadable, isValidEmail, isValidName, isValidMessage } from '../utils/security';

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Honeypot check
    if (formData.company) {
      console.log('Bot detected: Honeypot filled');
      setSubmitStatus('success'); // Silent success for bots
      return;
    }

    // 2. Time-based check
    if (Date.now() - mountTime < 3000) {
      setErrorMessage('Please wait a moment before submitting.');
      setSubmitStatus('error');
      return;
    }

    // 3. Validation
    if (!isValidName(formData.firstName) || !isValidName(formData.lastName)) {
      setErrorMessage('Please enter a valid name (2-50 characters).');
      setSubmitStatus('error');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setSubmitStatus('error');
      return;
    }
    if (!isValidMessage(formData.message)) {
      setErrorMessage('Message must be between 20 and 500 characters.');
      setSubmitStatus('error');
      return;
    }

    // 4. Gibberish Detection
    if (!isReadable(formData.message) || !isReadable(formData.firstName)) {
      console.log('Bot detected: Gibberish input');
      setSubmitStatus('success'); // Silent success for bots
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 5. Sanitization & Submission
    const sanitizedData = {
      firstName: escapeHtml(formData.firstName),
      lastName: escapeHtml(formData.lastName),
      email: escapeHtml(formData.email),
      message: escapeHtml(formData.message),
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', sanitizedData);
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '', company: '' });
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again later.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream-light font-sans overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-40 pb-48 flex items-center justify-center bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/b9.png"
            alt="Contact Hero Background"
            className="w-full h-full object-cover object-top opacity-80"
          />
          {/* Multi-layered gradients for depth and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-50"></div>
          
          {/* Smooth transition to the next section */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-brand-cream-light to-transparent"></div>
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
      </div>

      <div 
        className="relative -mt-24 z-20"
        style={{
          backgroundImage: 'url("/assets/bg12.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 relative z-20 pb-24">
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
                
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 flex flex-col items-center text-center space-y-4"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="font-serif text-2xl text-brand-navy">Message Sent!</h3>
                      <p className="text-brand-navy/60">Thank you for reaching out. We'll get back to you shortly.</p>
                      <button 
                        onClick={() => setSubmitStatus('idle')}
                        className="text-brand-orange font-bold hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest ml-1">First Name</label>
                          <input 
                            type="text" 
                            placeholder="Rohit"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full bg-brand-cream-light/30 border border-brand-navy/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest ml-1">Last Name</label>
                          <input 
                            type="text" 
                            placeholder="Das"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full bg-brand-cream-light/30 border border-brand-navy/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="hello@example.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-brand-cream-light/30 border border-brand-navy/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea 
                          rows={5} 
                          placeholder="Tell us what's on your mind..."
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-brand-cream-light/30 border border-brand-navy/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all resize-none"
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

                      <button 
                        type="submit" 
                        disabled={isSubmitting || !canSubmit}
                        className="w-full py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-brand-navy transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span className="tracking-widest uppercase text-sm">Send Message</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                      {!canSubmit && (
                        <p className="text-[10px] text-center text-brand-navy/40 uppercase tracking-tighter">Secure verification in progress...</p>
                      )}
                    </form>
                  )}
                </AnimatePresence>
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
    </div>
  );
}
