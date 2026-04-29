import { ReactLenis } from 'lenis/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingChatbot } from './components/FloatingChatbot';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { HomeV2 } from './pages/HomeV2';
import { Order } from './pages/Order';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Catering } from './pages/Catering';
import { CateringConcierge } from './pages/CateringConcierge';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const location = useLocation();
  const isOrderPage = location.pathname === '/order';
  const isV2Page = location.pathname === '/v2';
  const isCateringConcierge = location.pathname === '/catering-concierge';
  const isAboutPage = location.pathname === '/about';
  const isCateringPage = location.pathname === '/catering';
  const isContactPage = location.pathname === '/contact';
  const isLegalPage = location.pathname === '/privacy' || location.pathname === '/terms';
  const showGlobalChrome = !isOrderPage && !isV2Page && !isCateringConcierge;

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-brand-cream-light text-brand-navy font-sans selection:bg-brand-yellow/30 selection:text-brand-navy">
        {showGlobalChrome && <Navbar isLight={isCateringPage || isContactPage} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/v2" element={<HomeV2 />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/catering-concierge" element={<CateringConcierge />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
        {showGlobalChrome && <Footer />}
        {showGlobalChrome && <FloatingChatbot />}
      </div>
    </ReactLenis>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
