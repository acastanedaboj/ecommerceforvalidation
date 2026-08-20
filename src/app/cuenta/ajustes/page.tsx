'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Settings, Mail, Bell, Shield, LogOut, Check } from 'lucide-react';

export default function AjustesPage() {
  const { data: session } = useSession();
  const [acceptsNewsletter, setAcceptsNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch user preferences on mount
  useEffect(() => {
    async function fetchPreferences() {
      try {
        const res = await fetch('/api/user/preferences');
        if (res.ok) {
          const data = await res.json();
          setAcceptsNewsletter(data.acceptsNewsletter || false);
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (session?.user) {
      fetchPreferences();
    } else {
      setIsLoading(false);
    }
  }, [session]);

  // Update newsletter preference
  const handleNewsletterChange = async (checked: boolean) => {
    setAcceptsNewsletter(checked);
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acceptsNewsletter: checked }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      // Revert on error
      setAcceptsNewsletter(!checked);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile settings */}
      <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <Settings className="h-6 w-6 text-earth-600" strokeWidth={1.5} />
          <h2 className="font-serif text-xl text-stone-800">Ajustes de cuenta</h2>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-start gap-4 border-b border-cream-100 pb-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cream-100">
              <Mail className="h-5 w-5 text-stone-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-medium text-stone-800">Correo electronico</h3>
              <p className="text-stone-500">{session?.user?.email}</p>
              <p className="mt-2 text-sm text-stone-400">
                {session?.user?.image
                  ? 'Vinculado con tu cuenta de Google'
                  : 'Cuenta con email y contraseña'}
              </p>
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-start gap-4 border-b border-cream-100 pb-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cream-100">
              <Bell className="h-5 w-5 text-stone-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-medium text-stone-800">Notificaciones</h3>
              <p className="mb-4 text-sm text-stone-500">Gestiona las comunicaciones que recibes</p>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    disabled
                    className="h-4 w-4 rounded border-cream-300 text-earth-600 focus:ring-earth-500"
                  />
                  <span className="text-stone-700">Actualizaciones de pedidos</span>
                  <span className="text-xs text-stone-400">(siempre activo)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    disabled
                    className="h-4 w-4 rounded border-cream-300 text-earth-600 focus:ring-earth-500"
                  />
                  <span className="text-stone-700">Recordatorios de suscripcion</span>
                  <span className="text-xs text-stone-400">(siempre activo)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={acceptsNewsletter}
                    onChange={(e) => handleNewsletterChange(e.target.checked)}
                    disabled={isLoading || isSaving}
                    className="h-4 w-4 rounded border-cream-300 text-earth-600 focus:ring-earth-500"
                  />
                  <span className="text-stone-700">Ofertas, recetas y novedades</span>
                  {isSaving && <span className="text-xs text-stone-400">Guardando...</span>}
                  {saveSuccess && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <Check className="h-3 w-3" /> Guardado
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cream-100">
              <Shield className="h-5 w-5 text-stone-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-medium text-stone-800">Privacidad</h3>
              <p className="mb-4 text-sm text-stone-500">Tus datos estan seguros con nosotros</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/legal/privacidad"
                  className="text-sm text-earth-600 underline hover:text-earth-700"
                >
                  Politica de privacidad
                </a>
                <a
                  href="/legal/cookies"
                  className="text-sm text-earth-600 underline hover:text-earth-700"
                >
                  Politica de cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-soft sm:p-8">
        <h3 className="mb-4 font-medium text-stone-800">Cerrar sesion</h3>
        <p className="mb-4 text-sm text-stone-500">
          Cerraras la sesion en este dispositivo. Podras volver a iniciar sesion en cualquier
          momento.
        </p>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600 transition-colors hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar sesion</span>
        </button>
      </div>
    </div>
  );
}
