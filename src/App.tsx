/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Impulsores from './components/Impulsores';
import Values from './components/Values';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Infrastructure from './components/Infrastructure';
import Location from './components/Location';
import ClientAccess from './components/ClientAccess';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import RainWidget from './components/RainWidget';
import MobileBottomNav from './components/MobileBottomNav';
import CanjeSimulator from './components/CanjeSimulator';
import CanjeFloatingTrigger from './components/CanjeFloatingTrigger';

import { initGA, trackPageView } from './utils/analytics';

export default function App() {
  // Check URL pathname, query, or hash to determine initial page
  const [currentPage, setCurrentPage] = useState<'landing' | 'simulador'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const search = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      if (
        path === '/simulador' ||
        path.endsWith('/simulador') ||
        path.endsWith('/simulador/') ||
        search.get('page') === 'simulador' ||
        search.get('view') === 'simulador' ||
        hash === '#simulador' ||
        hash === '#/simulador' ||
        hash.includes('simulador')
      ) {
        return 'simulador';
      }
    }
    return 'landing';
  });

  // Pluviómetro preservado en código (oculto de la visualización actual por pedido del cliente)
  const [isRainOpen, setIsRainOpen] = useState(false);

  // Inicializar Google Analytics de forma segura en montaje
  useEffect(() => {
    initGA();
  }, []);

  // Synchronize browser history / back-forward navigation & hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const search = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      if (
        path === '/simulador' ||
        path.endsWith('/simulador') ||
        path.endsWith('/simulador/') ||
        search.get('page') === 'simulador' ||
        search.get('view') === 'simulador' ||
        hash === '#simulador' ||
        hash === '#/simulador' ||
        hash.includes('simulador')
      ) {
        setCurrentPage('simulador');
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Synchronize SEO titles, meta descriptions, and canonical tags for SPA routes
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const isProdHost = typeof window !== 'undefined' && window.location.hostname.includes('almacendegranos.com.ar');
    const baseDomain = isProdHost ? 'https://almacendegranos.com.ar' : (typeof window !== 'undefined' ? window.location.origin : 'https://almacendegranos.com.ar');

    const canonicalEl = document.getElementById('canonical-url') as HTMLLinkElement | null;
    const metaDescEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const ogTitleEl = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    const ogDescEl = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    const ogUrlEl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;

    if (currentPage === 'simulador') {
      const title = 'Simulador de Canje de Granos | ADG Almacén de Granos';
      const desc = 'Simulá y calculá operaciones de canje de granos versus venta tradicional (soja, maíz, trigo, cebada, sorgo, arveja, maní) con cotizaciones oficiales de pizarras y dólar BNA.';
      document.title = title;
      if (metaDescEl) metaDescEl.content = desc;
      if (ogTitleEl) ogTitleEl.content = title;
      if (ogDescEl) ogDescEl.content = desc;
      const simUrl = `${baseDomain}/simulador`;
      if (canonicalEl) canonicalEl.href = simUrl;
      if (ogUrlEl) ogUrlEl.content = simUrl;
      trackPageView('/simulador', title);
    } else {
      const title = 'ADG Almacén de Granos | Acopio y Comercialización en Daireaux';
      const desc = 'Acopio de granos, logística y comercialización para el productor agropecuario en Daireaux, provincia de Buenos Aires. Respaldada por Monasterio Tattersall y PGL.';
      document.title = title;
      if (metaDescEl) metaDescEl.content = desc;
      if (ogTitleEl) ogTitleEl.content = title;
      if (ogDescEl) ogDescEl.content = desc;
      const homeUrl = `${baseDomain}/`;
      if (canonicalEl) canonicalEl.href = homeUrl;
      if (ogUrlEl) ogUrlEl.content = homeUrl;
      trackPageView('/', title);
    }
  }, [currentPage]);

  const goToSimulator = () => {
    setCurrentPage('simulador');
    try {
      if (typeof window !== 'undefined' && window.location.pathname !== '/simulador') {
        window.history.pushState({}, '', '?page=simulador#simulador');
      }
    } catch (_) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLanding = () => {
    setCurrentPage('landing');
    try {
      if (typeof window !== 'undefined') {
        const baseUrl = window.location.href.split('?')[0].split('#')[0];
        window.history.pushState({}, '', baseUrl);
      }
    } catch (_) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated standalone Canje Simulator page (outside of the landing)
  if (currentPage === 'simulador') {
    return <CanjeSimulator onBackToLanding={goToLanding} />;
  }

  // Main ADG Landing Page
  return (
    <div id="app-root" className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      
      {/* Navigation Header */}
      <Header onOpenSimulator={goToSimulator} />

      {/* Main Single Page Sections with bottom padding on mobile to clear the bottom nav */}
      <main className="flex-grow pb-24 lg:pb-0">
        
        {/* Section 1: Hero Banner */}
        <Hero />

        {/* Section 2: Quiénes Somos */}
        <AboutUs />

        {/* Section 2b: Quienes Impulsan este Proyecto (Origen de Marca) */}
        <Impulsores />

        {/* Section 3: Nuestra Esencia (Valores) */}
        <Values />

        {/* Section 4: Servicios (Acopio, Logística, Asesoramiento) */}
        <Services />

        {/* Section 5: ¿Por qué ADG? */}
        <WhyUs />

        {/* Section 6: Nuestra Infraestructura */}
        <Infrastructure />

        {/* Section 7: Dónde Estamos (Ubicación & Google Maps) */}
        <Location />

        {/* Section 8: Acceso Clientes Info Block */}
        <ClientAccess />

        {/* Section 9: Contacto & Formulario de Envío */}
        <ContactForm />

      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating Channels */}
      <WhatsAppButton />

      {/* Acceso Directo Flotante al Simulador de Canje de Granos (ubicado donde estaba el pluviómetro) */}
      <CanjeFloatingTrigger onOpenSimulator={goToSimulator} />

      {/* 
        Pluviómetro preservado en el código para reactivación futura:
        <RainWidget 
          isOpen={isRainOpen}
          onOpenChange={setIsRainOpen}
        />
      */}

      {/* Mobile App Bottom Navigation Bar */}
      <MobileBottomNav onOpenSimulator={goToSimulator} />

    </div>
  );
}

