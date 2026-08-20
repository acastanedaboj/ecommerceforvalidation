'use client';

import { useState } from 'react';
import { useCookieConsent, type CookieConsent } from '@/hooks/useCookieConsent';
import { Button } from '@/components/ui/Button';
import { X, Cookie, Settings } from 'lucide-react';
import Link from 'next/link';

export function CookieBanner() {
  const { showBanner, mounted, acceptAll, rejectAll, savePreferences } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Don't render on server or if banner shouldn't show
  if (!mounted || !showBanner) return null;

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white shadow-2xl">
      <div className="container-custom py-4">
        {!showSettings ? (
          // Simple banner view
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-start gap-3">
              <Cookie className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
              <div>
                <h3 className="mb-1 font-semibold text-neutral-900">
                  Este sitio web utiliza cookies
                </h3>
                <p className="text-sm text-neutral-600">
                  Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación
                  y analizar el uso del sitio.{' '}
                  <Link href="/legal/cookies" className="text-primary-600 hover:underline">
                    Más información
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Configurar
              </Button>
              <Button onClick={rejectAll} variant="outline" size="sm">
                Rechazar
              </Button>
              <Button onClick={acceptAll} variant="primary" size="sm">
                Aceptar todas
              </Button>
            </div>
          </div>
        ) : (
          // Settings view
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold text-neutral-900">
                <Settings className="h-5 w-5" />
                Configuración de cookies
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-neutral-500 hover:text-neutral-700"
                aria-label="Cerrar configuración"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 space-y-4">
              {/* Necessary cookies */}
              <div className="rounded-lg border border-neutral-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="mb-1 font-medium text-neutral-900">Cookies necesarias</h4>
                    <p className="text-sm text-neutral-600">
                      Esenciales para el funcionamiento del sitio web (carrito de compra, inicio de
                      sesión). No se pueden desactivar.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="flex h-6 w-12 items-center justify-end rounded-full bg-primary-600 px-1">
                      <div className="h-4 w-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics cookies */}
              <div className="rounded-lg border border-neutral-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="mb-1 font-medium text-neutral-900">Cookies de análisis</h4>
                    <p className="text-sm text-neutral-600">
                      Nos ayudan a entender cómo los visitantes interactúan con el sitio web (Google
                      Analytics). Datos anonimizados.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          analytics: !prev.analytics,
                        }))
                      }
                      className={`flex h-6 w-12 items-center rounded-full transition-colors ${
                        preferences.analytics
                          ? 'justify-end bg-primary-600'
                          : 'justify-start bg-neutral-300'
                      } px-1`}
                      aria-label={
                        preferences.analytics
                          ? 'Desactivar cookies de análisis'
                          : 'Activar cookies de análisis'
                      }
                    >
                      <div className="h-4 w-4 rounded-full bg-white"></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Marketing cookies */}
              <div className="rounded-lg border border-neutral-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="mb-1 font-medium text-neutral-900">Cookies de marketing</h4>
                    <p className="text-sm text-neutral-600">
                      Se utilizan para mostrar anuncios relevantes y medir la efectividad de
                      campañas publicitarias.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          marketing: !prev.marketing,
                        }))
                      }
                      className={`flex h-6 w-12 items-center rounded-full transition-colors ${
                        preferences.marketing
                          ? 'justify-end bg-primary-600'
                          : 'justify-start bg-neutral-300'
                      } px-1`}
                      aria-label={
                        preferences.marketing
                          ? 'Desactivar cookies de marketing'
                          : 'Activar cookies de marketing'
                      }
                    >
                      <div className="h-4 w-4 rounded-full bg-white"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-end gap-2 sm:flex-row">
              <Button onClick={() => setShowSettings(false)} variant="outline" size="sm">
                Cancelar
              </Button>
              <Button onClick={handleSavePreferences} variant="primary" size="sm">
                Guardar preferencias
              </Button>
            </div>

            <p className="mt-3 text-center text-xs text-neutral-500">
              Consulta nuestra{' '}
              <Link href="/legal/cookies" className="underline hover:text-primary-600">
                Política de Cookies
              </Link>{' '}
              y{' '}
              <Link href="/legal/privacidad" className="underline hover:text-primary-600">
                Política de Privacidad
              </Link>{' '}
              para más información.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
