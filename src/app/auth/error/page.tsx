'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Hay un problema con la configuracion del servidor. Contacta con soporte.';
      case 'AccessDenied':
        return 'No tienes permiso para acceder a esta pagina.';
      case 'Verification':
        return 'El enlace de verificacion ha expirado o ya ha sido usado.';
      case 'OAuthSignin':
        return 'Error al iniciar el proceso de autenticacion.';
      case 'OAuthCallback':
        return 'Error al procesar la respuesta del proveedor.';
      case 'OAuthCreateAccount':
        return 'No se pudo crear una cuenta con este proveedor.';
      case 'EmailCreateAccount':
        return 'No se pudo crear una cuenta con este email.';
      case 'Callback':
        return 'Error en el proceso de autenticacion.';
      case 'OAuthAccountNotLinked':
        return 'Este email ya esta asociado a otra cuenta. Inicia sesion con el metodo original.';
      case 'EmailSignin':
        return 'Error al enviar el email de verificacion.';
      case 'CredentialsSignin':
        return 'Credenciales incorrectas.';
      case 'SessionRequired':
        return 'Debes iniciar sesion para acceder a esta pagina.';
      default:
        return 'Ha ocurrido un error inesperado. Intentalo de nuevo.';
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" style={{ paddingTop: '140px', paddingBottom: '48px' }}>
      <div className="max-w-md w-full text-center">
        {/* Error icon */}
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(239,68,68,.1)', borderRadius: '100px' }}>
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: '#dc2626' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '16px' }}>
          Error de autenticacion
        </h1>

        <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, marginBottom: '32px' }}>
          {getErrorMessage(error)}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/login"
            className="btn-pill"
          >
            Volver a intentar
          </Link>
          <Link
            href="/"
            className="btn-pill"
            style={{ borderColor: 'rgba(0,0,0,.15)' }}
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-stone-500">Cargando...</div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<ErrorLoading />}>
      <ErrorContent />
    </Suspense>
  );
}
