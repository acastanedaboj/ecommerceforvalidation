'use client';

import { Suspense, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';

function RegisterContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptsNewsletter, setAcceptsNewsletter] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setFormError('La contraseña debe tener al menos 8 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      // Register the user
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          acceptsNewsletter,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || 'Error al crear la cuenta');
        setIsLoading(false);
        return;
      }

      // Auto-login after successful registration
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        // Registration succeeded but login failed - redirect to login
        router.push('/auth/login?registered=true');
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setFormError('Error al crear la cuenta. Intentalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-stone-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <Image
              src="/images/logo.svg"
              alt="Poppy"
              width={160}
              height={56}
              className="h-14 w-auto"
              priority
            />
          </Link>
          <h1 className="font-display text-3xl font-medium text-stone-800 mb-3">
            Crear cuenta
          </h1>
          <p className="text-stone-500">
            Registrate para gestionar tus pedidos y suscripciones
          </p>
        </div>

        {/* Error message */}
        {formError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {formError}
          </div>
        )}

        {/* Register card */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          {/* Registration form */}
          <form onSubmit={handleRegister} className="space-y-4 mb-6">
            <Input
              label="Nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimo 8 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <Input
              label="Confirmar contraseña"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              required
            />

            {/* Newsletter checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="newsletter"
                checked={acceptsNewsletter}
                onChange={(e) => setAcceptsNewsletter(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300 text-earth-600 focus:ring-earth-500"
              />
              <label htmlFor="newsletter" className="text-sm text-stone-600">
                Quiero recibir novedades, recetas y ofertas exclusivas por email
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-stone-500 mb-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-earth-600 hover:text-earth-700 font-medium">
              Inicia sesion
            </Link>
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cream-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-stone-400">o registrate con</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-cream-200 rounded-xl hover:border-cream-300 hover:bg-cream-50 transition-all duration-300 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-stone-700 group-hover:text-stone-900">
              Continuar con Google
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-stone-400">
          Al crear una cuenta, aceptas nuestros{' '}
          <Link href="/legal/condiciones-venta" className="underline hover:text-stone-600">
            Terminos de servicio
          </Link>{' '}
          y{' '}
          <Link href="/legal/privacidad" className="underline hover:text-stone-600">
            Politica de privacidad
          </Link>
        </p>
      </div>
    </div>
  );
}

function RegisterLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-stone-500">Cargando...</div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterContent />
    </Suspense>
  );
}
