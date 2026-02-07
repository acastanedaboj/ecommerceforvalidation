'use client';

import { useState } from 'react';
import { useCookieConsent, type CookieConsent } from '@/hooks/useCookieConsent';
import { Button } from '@/components/ui/Button';
import { X, Cookie, Settings } from 'lucide-react';
import Link from 'next/link';

export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, savePreferences } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  if (!showBanner) return null;

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-neutral-200 shadow-2xl">
      <div className="container-custom py-4">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  Este sitio web utiliza cookies
                </h3>
                <p className="text-sm text-neutral-600">
                  Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación y analizar el uso del sitio.{' '}
                  <Link href="/legal/cookies" className="text-primary-600 hover:underline">
                    Más información
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <Button onClick={() => setShowSettings(true)} variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configurar
              </Button>
              <Button onClick={rejectAll} variant="outline" size="sm">Rechazar</Button>
              <Button onClick={acceptAll} variant="primary" size="sm">Aceptar todas</Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configuración de cookies
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-neutral-500 hover:text-neutral-700" aria-label="Cerrar configuración">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 mb-4">
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-900 mb-1">Cookies necesarias</h4>
                    <p className="text-sm text-neutral-600">
                      Esenciales para el funcionamiento del sitio web (carrito de compra, inicio de sesión). No se pueden desactivar.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-primary-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-900 mb-1">Cookies de análisis</h4>
                    <p className="text-sm text-neutral-600">
                      Nos ayudan a entender cómo los visitantes interactúan con el sitio web (Google Analytics). Datos anonimizados.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => setPreferences((prev) => ({...prev, analytics: !prev.analytics}))}
                      className={`w-12 h-6 rounded-full transition-colors flex items-center ${preferences.analytics ? 'bg-primary-600 justify-end' : 'bg-neutral-300 justify-start'} px-1`}
                      aria-label={preferences.analytics ? 'Desactivar cookies de análisis' : 'Activar cookies de análisis'}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-900 mb-1">Cookies de marketing</h4>
                    <p className="text-sm text-neutral-600">
                      Se utilizan para mostrar anuncios relevantes y medir la efectividad de campañas publicitarias.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => setPreferences((prev) => ({...prev, marketing: !prev.marketing}))}
                      className={`w-12 h-6 rounded-full transition-colors flex items-center ${preferences.marketing ? 'bg-primary-600 justify-end' : 'bg-neutral-300 justify-start'} px-1`}
                      aria-label={preferences.marketing ? 'Desactivar cookies de marketing' : 'Activar cookies de marketing'}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 justify-end">
              <Button onClick={() => setShowSettings(false)} variant="outline" size="sm">Cancelar</Button>
              <Button onClick={handleSavePreferences} variant="primary" size="sm">Guardar preferencias</Button>
            </div>
            <p className="text-xs text-neutral-500 mt-3 text-center">
              Consulta nuestra{' '}
              <Link href="/legal/cookies" className="underline hover:text-primary-600">Política de Cookies</Link>
              {' '}y{' '}
              <Link href="/legal/privacidad" className="underline hover:text-primary-600">Política de Privacidad</Link>
              {' '}para más información.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
