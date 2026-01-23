'use client';

import { useSession, signOut } from 'next-auth/react';
import { Settings, Mail, Bell, Shield, LogOut } from 'lucide-react';

export default function AjustesPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Profile settings */}
      <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-earth-600" strokeWidth={1.5} />
          <h2 className="text-xl font-serif text-stone-800">Ajustes de cuenta</h2>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-start gap-4 pb-6 border-b border-cream-100">
            <div className="w-10 h-10 bg-cream-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-stone-800 mb-1">Correo electronico</h3>
              <p className="text-stone-500">{session?.user?.email}</p>
              <p className="text-sm text-stone-400 mt-2">
                Vinculado con tu cuenta de Google
              </p>
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-start gap-4 pb-6 border-b border-cream-100">
            <div className="w-10 h-10 bg-cream-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-stone-800 mb-1">Notificaciones</h3>
              <p className="text-stone-500 text-sm mb-4">
                Gestiona las comunicaciones que recibes
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-earth-600 border-cream-300 rounded focus:ring-earth-500"
                  />
                  <span className="text-stone-700">Actualizaciones de pedidos</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-earth-600 border-cream-300 rounded focus:ring-earth-500"
                  />
                  <span className="text-stone-700">Recordatorios de suscripcion</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-earth-600 border-cream-300 rounded focus:ring-earth-500"
                  />
                  <span className="text-stone-700">Ofertas y novedades</span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-cream-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-stone-800 mb-1">Privacidad</h3>
              <p className="text-stone-500 text-sm mb-4">
                Tus datos estan seguros con nosotros
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/legal/privacidad"
                  className="text-sm text-earth-600 hover:text-earth-700 underline"
                >
                  Politica de privacidad
                </a>
                <a
                  href="/legal/cookies"
                  className="text-sm text-earth-600 hover:text-earth-700 underline"
                >
                  Politica de cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 border border-red-100">
        <h3 className="font-medium text-stone-800 mb-4">Cerrar sesion</h3>
        <p className="text-stone-500 text-sm mb-4">
          Cerraras la sesion en este dispositivo. Podras volver a iniciar sesion en cualquier momento.
        </p>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesion</span>
        </button>
      </div>
    </div>
  );
}
