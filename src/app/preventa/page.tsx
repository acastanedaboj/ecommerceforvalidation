'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { CheckCircle, ShoppingBag, Truck, Package, Heart } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { formatPrice, isValidEmail } from '@/lib/utils';
import toast from 'react-hot-toast';

const products = [
  { value: 'prod_granola_clasica', label: 'Granola Clásica' },
  { value: 'prod_granola_naranja', label: 'Granola de Naranja' },
];

export default function PreventaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellidos: '',
    producto: '',
    cantidad: 1,
  });
  const [errors, setErrors] = useState({
    email: '',
    nombre: '',
    apellidos: '',
    producto: '',
    cantidad: '',
  });

  // Scroll to top when form is submitted successfully
  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSubmitted]);

  const validateForm = (): boolean => {
    const newErrors = {
      email: '',
      nombre: '',
      apellidos: '',
      producto: '',
      cantidad: '',
    };
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Por favor, introduce un email válido';
      isValid = false;
    }

    // Nombre validation
    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre es obligatorio';
      isValid = false;
    }

    // Apellidos validation
    if (!formData.apellidos.trim() || formData.apellidos.trim().length < 2) {
      newErrors.apellidos = 'Los apellidos son obligatorios';
      isValid = false;
    }

    // Producto validation
    if (!formData.producto) {
      newErrors.producto = 'Por favor, selecciona un producto';
      isValid = false;
    }

    // Cantidad validation
    const cantidad = parseInt(formData.cantidad.toString());
    if (!cantidad || cantidad < 1 || cantidad > 10) {
      newErrors.cantidad = 'La cantidad debe estar entre 1 y 10';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrige los errores del formulario');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/preventa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el pedido');
      }

      toast.success('¡Pedido registrado con éxito!');
      setIsSubmitted(true);
    } catch (error) {
      toast.error('Error al procesar tu pedido. Por favor, inténtalo de nuevo.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Calculate price
  const UNIT_PRICE_CENTS = 900; // 9.00€
  const totalCents = formData.cantidad * UNIT_PRICE_CENTS;
  const totalPrice = formatPrice(totalCents);

  // Success state
  if (isSubmitted) {
    return (
      <div className="section">
        <div className="container-custom max-w-2xl text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent-100">
            <CheckCircle className="h-10 w-10 text-accent-600" />
          </div>
          <h1 className="mb-4 font-display text-3xl text-neutral-900">
            ¡Pedido registrado con éxito!
          </h1>
          <p className="mb-8 text-neutral-600">
            Hemos recibido tu preventa correctamente. Te contactaremos muy pronto para coordinar la
            entrega en mano de tu granola.
          </p>
          <a href="/" className="btn-primary">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="badge-primary mb-4">Preventa Especial</span>
          <h1 className="mb-4 font-display text-4xl text-neutral-900 md:text-5xl">
            Sé de los primeros en probar nuestra granola artesanal
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Forma parte de nuestra campaña de validación. Reserva tu granola ahora y recíbela
            directamente de nuestras manos. Solo 7€ por bolsa de 150g.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Truck className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-neutral-900">Entrega en mano</h3>
            <p className="text-sm text-neutral-600">
              Sin gastos de envío. Te la entregaremos personalmente en tu zona.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Heart className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-neutral-900">Apoya el proyecto</h3>
            <p className="text-sm text-neutral-600">
              Tu pedido nos ayuda a validar la demanda y crecer como proyecto artesanal.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-neutral-900">Producto fresco</h3>
            <p className="text-sm text-neutral-600">
              Elaborada después de recibir tu pedido para garantizar máxima frescura.
            </p>
          </div>
        </div>

        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          {/* How it works */}
          <div>
            <h2 className="mb-6 font-display text-2xl text-neutral-900">¿Cómo funciona?</h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm text-[#ffffec]">
                  1
                </div>
                <div>
                  <h3 className="mb-1 text-neutral-900">Rellena el formulario</h3>
                  <p className="text-sm text-neutral-600">
                    Indica tu nombre, email, el sabor que prefieres y la cantidad que deseas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm text-[#ffffec]">
                  2
                </div>
                <div>
                  <h3 className="mb-1 text-neutral-900">Preparamos tu pedido</h3>
                  <p className="text-sm text-neutral-600">
                    Elaboramos tu granola de forma artesanal con ingredientes frescos y de calidad.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm text-[#ffffec]">
                  3
                </div>
                <div>
                  <h3 className="mb-1 text-neutral-900">Te contactamos para la entrega</h3>
                  <p className="text-sm text-neutral-600">
                    Coordinamos contigo para entregarte tu granola en mano.
                  </p>
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-8 rounded-xl bg-cream-50 p-6">
              <h3 className="mb-3 text-neutral-900">Sabores disponibles:</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary-600">•</span>
                  <div>
                    <strong>Granola Clásica:</strong> Nuestra receta original con miel ecológica,
                    avena sin gluten y frutos secos premium.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary-600">•</span>
                  <div>
                    <strong>Granola de Naranja:</strong> Con ralladura de naranja natural y miel de
                    azahar. Frescura mediterránea en cada bocado.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 font-display text-2xl text-neutral-900">Reserva tu granola</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  placeholder="tu@email.com"
                />

                <Input
                  label="Nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  error={errors.nombre}
                  required
                  placeholder="Tu nombre"
                />

                <Input
                  label="Apellidos"
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  error={errors.apellidos}
                  required
                  placeholder="Tus apellidos"
                />

                <Select
                  label="Sabor de granola"
                  name="producto"
                  value={formData.producto}
                  onChange={handleChange}
                  options={products}
                  error={errors.producto}
                  required
                  placeholder="Selecciona tu sabor favorito"
                />

                <Input
                  label="Cantidad"
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  error={errors.cantidad}
                  required
                  min="1"
                  max="10"
                  helperText="Máximo 10 unidades por pedido"
                />

                {/* Price summary */}
                <div className="rounded-xl bg-cream-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-neutral-700">Precio por unidad:</span>
                    <span className="text-neutral-900">9,00€</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-200 pt-2">
                    <span className="text-neutral-900">Total:</span>
                    <span className="text-2xl font-bold text-primary-600">{totalPrice}</span>
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">
                    {formData.cantidad} {formData.cantidad === 1 ? 'unidad' : 'unidades'}
                  </p>
                </div>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  leftIcon={<ShoppingBag className="h-5 w-5" />}
                  className="w-full"
                >
                  {isLoading ? 'Procesando...' : 'Reservar mi granola'}
                </Button>

                <p className="text-center text-xs text-neutral-500">
                  Al enviar este formulario, aceptas que te contactemos para coordinar la entrega.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
