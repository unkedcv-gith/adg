import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  override state: State = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adg_canje_excel_config_v5');
        const cleanUrl = window.location.origin + window.location.pathname;
        window.location.href = cleanUrl;
      }
    } catch (_) {
      window.location.reload();
    }
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              ADG Almacén de Granos S.A.
            </span>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
              Recuperación Automática
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Se detectó un problema temporal al cargar los datos en tu navegador. Hemos preparado un restablecimiento limpio para que puedas continuar navegando de forma segura y estable.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Restablecer y Abrir de Nuevo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer text-xs"
              >
                <Home className="w-4 h-4" />
                <span>Ir al Inicio de la Web</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mt-6">
              ADG · Daireaux, Buenos Aires · +54 9 2314 40-5179
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
