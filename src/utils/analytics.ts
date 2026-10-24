/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Google Analytics 4 (GA4) Integration Helper
 * Provee inicialización segura y seguimiento de páginas y eventos
 * respetando entornos de desarrollo, producción y ausencia de ID de medición.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    GA_MEASUREMENT_ID?: string;
  }
}

// Obtener ID desde variable de entorno Vite o global de ventana
export const getMeasurementId = (): string | undefined => {
  return (
    (import.meta as any).env?.VITE_GA_MEASUREMENT_ID ||
    (typeof window !== 'undefined' ? window.GA_MEASUREMENT_ID : undefined)
  );
};

let isInitialized = false;

/**
 * Inicializa gtag.js e inyecta el script de Google Analytics de forma no invasiva.
 * Si no se configuró un Measurement ID (ej: G-XXXXXXXXXX), no ejecuta nada ni genera errores.
 */
export function initGA(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  const measurementId = getMeasurementId();
  if (!measurementId || !measurementId.startsWith('G-')) {
    // Modo pasivo: ID no configurado aún
    return;
  }

  try {
    // 1. Inicializar dataLayer y función gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      send_page_view: false // Control manual de vistas de página para SPA
    });

    // 2. Inyectar script de Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.id = 'google-analytics-gtag';
    document.head.appendChild(script);

    isInitialized = true;
  } catch (err) {
    console.warn('No se pudo inicializar Google Analytics:', err);
  }
}

/**
 * Registra una vista de página en Google Analytics (compatible con navegación SPA).
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;

  const measurementId = getMeasurementId();
  if (!measurementId || !window.gtag) return;

  try {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  } catch (e) {
    // No-op
  }
}

/**
 * Registra eventos comerciales personalizados (ej: uso del simulador, consulta por WhatsApp, envío de contacto).
 */
export function trackEvent(action: string, category: string, label?: string, value?: number): void {
  if (typeof window === 'undefined') return;

  const measurementId = getMeasurementId();
  if (!measurementId || !window.gtag) return;

  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  } catch (e) {
    // No-op
  }
}
