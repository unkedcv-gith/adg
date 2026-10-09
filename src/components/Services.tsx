/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { SERVICES_CONTENT } from '../data/content';
import { Warehouse, Truck, FileSpreadsheet, X, ChevronLeft, ChevronRight, Camera, Images } from 'lucide-react';

// @ts-ignore
import dsc01609 from '../assets/images/DSC01609-1.jpg';
// @ts-ignore
import dsc01612 from '../assets/images/DSC01612-1.jpg';
// @ts-ignore
import dsc01614 from '../assets/images/DSC01614-1.jpg';
// @ts-ignore
import dsc01619 from '../assets/images/DSC01619-1.jpg';
// @ts-ignore
import dsc01640 from '../assets/images/DSC01640-1.jpg';
// @ts-ignore
import dsc01646 from '../assets/images/DSC01646-1.jpg';
// @ts-ignore
import dsc01649 from '../assets/images/DSC01649-1.jpg';
// @ts-ignore
import dsc01651 from '../assets/images/DSC01651-1.jpg';
// @ts-ignore
import dsc01655 from '../assets/images/DSC01655-1.jpg';
// @ts-ignore
import dsc01659 from '../assets/images/DSC01659-1.jpg';
// @ts-ignore
import dsc01661 from '../assets/images/DSC01661-1.jpg';
// @ts-ignore
import dsc01666 from '../assets/images/DSC01666-1.jpg';
// @ts-ignore
import dsc01674 from '../assets/images/DSC01674-1.jpg';
// @ts-ignore
import dsc01681 from '../assets/images/DSC01681-1.jpg';
// @ts-ignore
import dsc01685 from '../assets/images/DSC01685-1.jpg';
// @ts-ignore
import dsc01694 from '../assets/images/DSC01694-1.jpg';
// @ts-ignore
import dsc01695 from '../assets/images/DSC01695-1.jpg';
// @ts-ignore
import dsc01699 from '../assets/images/DSC01699-1.jpg';
// @ts-ignore
import dsc01704 from '../assets/images/DSC01704-1.jpg';
// @ts-ignore
import dsc01722 from '../assets/images/DSC01722-1.jpg';
// @ts-ignore
import dsc01723 from '../assets/images/DSC01723-1.jpg';
// @ts-ignore
import dsc01724 from '../assets/images/DSC01724-1.jpg';

// @ts-ignore
import logoCompletoBlanco from '../assets/images/logo_completo_blanco.png';

const iconsMap: Record<string, any> = {
  Warehouse,
  Truck,
  FileSpreadsheet
};

// Complete list of all 22 official photographs
const ALL_GALLERY_IMAGES = [
  dsc01609,
  dsc01612,
  dsc01614,
  dsc01619,
  dsc01640,
  dsc01646,
  dsc01649,
  dsc01651,
  dsc01655,
  dsc01659,
  dsc01661,
  dsc01666,
  dsc01674,
  dsc01681,
  dsc01685,
  dsc01694,
  dsc01695,
  dsc01699,
  dsc01704,
  dsc01722,
  dsc01723,
  dsc01724
];

// Specific hover reference images specified by user:
// 1. Acopio de granos -> DSC01674 (index 12 in ALL_GALLERY_IMAGES)
// 2. Logística -> DSC01699 (index 17 in ALL_GALLERY_IMAGES)
// 3. Asesoramiento -> DSC01640 (index 4 in ALL_GALLERY_IMAGES)
const SERVICE_HOVER_IMAGES = [
  dsc01674,
  dsc01699,
  dsc01640
];

const SERVICE_INITIAL_INDICES: Record<number, number> = {
  0: 12, // Acopio de granos -> DSC01674
  1: 17, // Logística -> DSC01699
  2: 4   // Asesoramiento -> DSC01640
};

export default function Services() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGalleryForService = (serviceIndex: number) => {
    const initialIndex = SERVICE_INITIAL_INDICES[serviceIndex] ?? 0;
    setCurrentIndex(initialIndex);
    setIsGalleryOpen(true);
  };

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ALL_GALLERY_IMAGES.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ALL_GALLERY_IMAGES.length) % ALL_GALLERY_IMAGES.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll while modal is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isGalleryOpen, closeGallery, nextImage, prevImage]);

  return (
    <section id="servicios" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">
              Soluciones para toda la campaña
            </h3>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-green-dark tracking-tight">
              Soluciones integrales para el agro.
            </h2>
          </div>
          <p className="text-gray-500 mt-4 md:mt-0 max-w-sm text-sm leading-relaxed">
            Ofrecemos un servicio unificado desde el acopio de la cosecha hasta la comercialización y coordinación logística, garantizando fluidez y confianza.
          </p>
        </div>

        {/* 3 Service Cards (Etiquetas: Acopio de granos, Logística, Asesoramiento) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_CONTENT.map((service, index) => {
            const IconComponent = iconsMap[service.iconName] || Warehouse;
            const bgReferenceImage = SERVICE_HOVER_IMAGES[index] || dsc01674;

            return (
              <div
                key={service.id}
                id={service.id}
                onClick={() => openGalleryForService(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openGalleryForService(index);
                  }
                }}
                className="group relative cursor-pointer rounded-3xl p-8 overflow-hidden transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between select-none border border-brand-green/30 hover:border-brand-gold/60"
              >
                {/* 1. Fondo verde de base permanente */}
                <div 
                  className="absolute inset-0 bg-[#044a27] transition-colors duration-500 group-hover:bg-[#033b1f] pointer-events-none" 
                />

                {/* 2. Fotografía más transparentona para que el verde se aprecie un ~25% más */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-45 transition-all duration-700 ease-out pointer-events-none scale-100 group-hover:scale-108"
                  style={{ backgroundImage: `url(${bgReferenceImage})` }}
                />

                {/* 3. Degradé equilibrado para asegurar legibilidad manteniendo el protagonismo del verde */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15 group-hover:from-black/80 group-hover:via-black/30 group-hover:to-transparent transition-all duration-500 pointer-events-none" 
                />

                {/* 4. Sutil destello de luz dorado institucional en la esquina superior al pasar el mouse */}
                <div 
                  className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                />

                {/* Contenido de la etiqueta */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Fila superior: Icono del servicio + Distintivo interactivo 'Galería fotográfica' */}
                    <div className="flex items-start justify-between mb-8">
                      {/* Icono del servicio en vidrio/blanco translúcido */}
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-gold group-hover:text-brand-green-dark group-hover:scale-105 transition-all duration-300 border border-white/25">
                        <IconComponent className="w-7 h-7" />
                      </div>

                      {/* Pill interactivo sutil: Galería fotográfica */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80 group-hover:text-brand-gold group-hover:border-brand-gold/50 group-hover:bg-black/60 transition-all duration-300 shadow-xs">
                        <Images className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                        <span className="text-xs font-semibold tracking-wide">
                          Galería fotográfica
                        </span>
                      </div>
                    </div>

                    {/* Título del servicio */}
                    <h4 className="font-display font-extrabold text-2xl text-white mb-4 group-hover:text-brand-gold transition-colors duration-300 drop-shadow-sm flex items-center gap-2">
                      <span>{service.title}</span>
                    </h4>

                    {/* Descripción del servicio */}
                    <p className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300 leading-relaxed font-normal drop-shadow-xs">
                      {service.description}
                    </p>
                  </div>

                  {/* Barra inferior: Indicador de explorar galería fotográfica con flecha animada */}
                  <div className="mt-8 pt-5 border-t border-white/20 group-hover:border-brand-gold/40 flex items-center justify-between transition-colors duration-300">
                    <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Ver fotos del predio</span>
                    </span>

                    <div className="flex items-center gap-1 text-brand-gold font-semibold text-xs group-hover:translate-x-1.5 transition-transform duration-300">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline">Explorar</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Galería Fotográfica Institucional:
          Estrictamente SIN ningún texto, solo el logo de ADG y los manejadores para pasar las fotos.
          Diseño más verde, blanco e institucional. */}
      {isGalleryOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-green-dark/85 backdrop-blur-md p-2 sm:p-5 md:p-8 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeGallery();
          }}
        >
          {/* Institutional frame with white & emerald gradients and clean white backdrop */}
          <div className="relative w-full max-w-6xl h-[92vh] bg-gradient-to-b from-white via-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border-2 border-brand-green/20">
            
            {/* Barra superior institucional: Fondo verde marca ADG con logo en blanco y botón cerrar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-dark z-20 shadow-md border-b border-brand-green-light/30">
              <div className="flex items-center">
                <img 
                  src={logoCompletoBlanco} 
                  alt="ADG" 
                  className="h-8 sm:h-9 w-auto object-contain select-none drop-shadow-sm" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <button
                onClick={closeGallery}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-brand-green-dark flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95 border border-white/25"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Visor central con marco blanco e iluminación institucional */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-radial from-white via-gray-50 to-emerald-50/40 p-3 sm:p-8 select-none">
              {/* Subtle background brand glow */}
              <div className="absolute w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] flex items-center justify-center p-2 bg-white rounded-2xl shadow-xl border border-gray-200/80">
                <img
                  key={currentIndex}
                  src={ALL_GALLERY_IMAGES[currentIndex]}
                  alt=""
                  className="max-h-[70vh] max-w-[88vw] sm:max-w-[80vw] w-auto h-auto object-contain rounded-xl select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Manejador Anterior (Flecha izquierda) - Verde institucional y blanco */}
              <button
                onClick={prevImage}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white hover:bg-brand-green text-brand-green-dark hover:text-white flex items-center justify-center transition-all duration-200 shadow-xl border-2 border-brand-green/30 hover:border-brand-green cursor-pointer active:scale-95 group"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-7 sm:w-8 h-7 sm:h-8 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Manejador Siguiente (Flecha derecha) - Verde institucional y blanco */}
              <button
                onClick={nextImage}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white hover:bg-brand-green text-brand-green-dark hover:text-white flex items-center justify-center transition-all duration-200 shadow-xl border-2 border-brand-green/30 hover:border-brand-green cursor-pointer active:scale-95 group"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-7 sm:w-8 h-7 sm:h-8 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Barra inferior institucional con acento verde y dorado (sin textos) */}
            <div className="px-6 py-3 bg-white border-t border-gray-100 flex items-center justify-center gap-1.5 overflow-x-auto select-none">
              {ALL_GALLERY_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-7 h-2 bg-brand-green shadow-sm' 
                      : 'w-2 h-2 bg-gray-200 hover:bg-brand-green/50'
                  }`}
                  aria-label={`Ver foto ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
