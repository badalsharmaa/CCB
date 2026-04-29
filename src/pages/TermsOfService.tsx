import { motion } from 'motion/react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl text-brand-navy mb-8">Terms of Service</h1>
          <p className="text-brand-navy/60 mb-12 italic">Last Updated: April 29, 2026</p>

          <div className="prose prose-lg max-w-none text-brand-navy/80 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Calcutta Chaat & Bakery website, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">2. Use of Services</h2>
              <p>
                You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">3. Orders and Payments</h2>
              <p>
                All orders placed through our website are subject to acceptance by us. We reserve the right to refuse or cancel any order for any reason. Prices are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Intellectual Property</h2>
              <p>
                The content on our website, including text, graphics, logos, and images, is the property of Calcutta Chaat & Bakery and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Limitation of Liability</h2>
              <p>
                Calcutta Chaat & Bakery shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">7. Contact Information</h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at:
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
