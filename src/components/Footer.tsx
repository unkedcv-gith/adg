/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Facebook, Instagram, Linkedin, ArrowUp, X, Shield, FileText } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-brand-green-dark text-white border-t border-white/5 font-sans">
      
      {/* Upper Footer: Logo and quick info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: Brand presentation (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center">
              <Logo lightBg={false} height={64} />
            </div>

            <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
              Una nueva empresa, respaldada por la experiencia de quienes conocen el agro desde hace años y el compromiso inquebrantable de acompañar al productor en cada campaña.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-green-dark text-white flex items-center justify-center transition-all shadow-sm"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/adgsa.oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-green-dark text-white flex items-center justify-center transition-all shadow-sm"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-green-dark text-white flex items-center justify-center transition-all shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

            </div>
          </div>

          {/* Col 2: Navigation map (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-brand-gold text-xs uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#quienes-somos" className="hover:text-white transition-colors">Quiénes Somos</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#infraestructura" className="hover:text-white transition-colors">Infraestructura</a></li>
              <li><a href="#ubicacion" className="hover:text-white transition-colors">Ubicación</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Terms/Legals (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-semibold text-brand-gold text-xs uppercase tracking-widest">Soporte y Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal('privacy')}
                  className="hover:text-white transition-colors text-left focus:outline-none cursor-pointer"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal('terms')}
                  className="hover:text-white transition-colors text-left focus:outline-none cursor-pointer"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <span className="block text-xs text-gray-400 leading-relaxed mt-4">
                  Rivadavia 82, Daireaux, Buenos Aires.<br />
                  Cereales S.A. Reg. Nro. 2401-A
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Modal Legal */}
      {legalModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-4">
              {legalModal === 'privacy' ? (
                <Shield className="w-5 h-5 text-brand-gold" />
              ) : (
                <FileText className="w-5 h-5 text-brand-gold" />
              )}
              <h3 className="text-base font-bold text-white">
                {legalModal === 'privacy' ? 'Política de Privacidad' : 'Términos y Condiciones'}
              </h3>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    En <strong>ADG Almacén de Granos S.A.</strong> protegemos la privacidad de cada productor y cliente. Sus datos de contacto y detalles operativos se procesan con absoluta reserva para coordinar fletes, acopio, insumos y liquidaciones de cereales.
                  </p>
                  <p>
                    No comercializamos ni cedemos información personal o comercial a terceros ajenos a la operatoria institucional de ADG.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Todos los cupos de descarga, fijaciones, pesajes y transacciones de granos se rigen conforme a la normativa comercial vigente de la <strong>Bolsa de Cereales de la República Argentina</strong> y los estándares de las Cámaras Arbitrales de Cereales.
                  </p>
                  <p>
                    Las cotizaciones de pizarras y simulaciones son de carácter referencial y quedan formalizadas mediante los respectivos contratos de compraventa y canje de granos.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="bg-brand-green hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lower Footer: Copyright & Scroll to Top */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            © 2026 ADG Almacén de Granos S.A. Todos los derechos reservados. Desarrollado con el respaldo de Monasterio Tattersall S.A. y PGL.
          </p>
          <button
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors bg-white/5 py-2 px-4 rounded-full border border-white/5 hover:border-white/25 focus:outline-none"
            title="Volver arriba"
          >
            <span>Volver Arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
