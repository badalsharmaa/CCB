import { motion } from 'motion/react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl text-brand-navy mb-8">Privacy Policy</h1>
          <p className="text-brand-navy/60 mb-12 italic">Last Updated: April 29, 2026</p>

          <div className="prose prose-lg max-w-none text-brand-navy/80 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Introduction</h2>
              <p>
                Welcome to Calcutta Chaat & Bakery. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">2. Information We Collect</h2>
              <p>
                We may collect several types of information from and about users of our website, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> Name, username, or similar identifier.</li>
                <li><strong>Contact Data:</strong> Email address, telephone numbers, and delivery address.</li>
                <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products and services you have purchased from us.</li>
                <li><strong>Technical Data:</strong> IP address, login data, browser type and version, time zone setting and location.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide and maintain our service, process your orders, and communicate with you about your account or our services. We also use information to improve our website and marketing efforts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Data Security</h2>
              <p>
                We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: info@calcuttachaat.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
