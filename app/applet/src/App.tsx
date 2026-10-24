/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Impulsores from './components/Impulsores';
import Services from './components/Services';
import Infrastructure from './components/Infrastructure';
import RainWidget from './components/RainWidget';
import Location from './components/Location';
import Values from './components/Values';
import WhyUs from './components/WhyUs';
import ContactForm from './components/ContactForm';
import ClientAccess from './components/ClientAccess';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileBottomNav from './components/MobileBottomNav';
import CanjeSimulator from './components/CanjeSimulator';
import CanjeFloatingTrigger from './components/CanjeFloatingTrigger';
import InboxPanel from './components/InboxPanel';

export default function App() {
  const [showSimulator, setShowSimulator] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Check if URL hash is #simulador
    const handleHashChange = () => {
      if (window.location.hash === '#simulador') {
        setShowSimulator(true);
      } else {
        setShowSimulator(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenSimulator = () => {
    setShowSimulator(true);
    window.location.hash = 'simulador';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setShowSimulator(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMessageSubmitted = (msg: any) => {
    setMessages((prev) => [msg, ...prev]);
  };

  if (showSimulator) {
    return (
      <div className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-brand-green selection:text-white">
        <CanjeSimulator onBackToLanding={handleBackToLanding} />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-brand-green selection:text-white antialiased">
      <Header
        onOpenInbox={() => setInboxOpen(true)}
        unreadCount={messages.length}
        onOpenSimulator={handleOpenSimulator}
      />

      <CanjeFloatingTrigger onOpenSimulator={handleOpenSimulator} />

      <main id="main-content">
        <Hero />
        <AboutUs />
        <Impulsores />
        <Services />
        <Infrastructure />
        <RainWidget />
        <Location />
        <Values />
        <WhyUs />
        <ContactForm onMessageSubmitted={handleMessageSubmitted} />
        <ClientAccess />
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileBottomNav onOpenSimulator={handleOpenSimulator} />

      {inboxOpen && (
        <InboxPanel
          messages={messages}
          onClose={() => setInboxOpen(false)}
          onDelete={(id) => setMessages((prev) => prev.filter((m) => m.id !== id))}
        />
      )}
    </div>
  );
}
