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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-accent-600" />
          </div>
          <h1 className="text-3xl font-display text-neutral-900 mb-4">
            ¡Pedido registrado con éxito!
          </h1>
          <p className="text-neutral-600 mb-8">
            Hemos recibido tu preventa correctamente. Te contactaremos muy pronto para
            coordinar la entrega en mano de tu granola.
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
        <div className="text-center mb-12">
          <span className="badge-primary mb-4">Preventa Especial</span>
          <h1 className="text-4xl md:text-5xl font-display text-neutral-900 mb-4">
            Sé de los primeros en probar nuestra granola artesanal
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Forma parte de nuestra campaña de validación. Reserva tu granola ahora y
            recíbela directamente de nuestras manos. Solo 9€ por bolsa de 250g.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-neutral-900 mb-2">Entrega en mano</h3>
            <p className="text-neutral-600 text-sm">
              Sin gastos de envío. Te la entregaremos personalmente en tu zona.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-neutral-900 mb-2">Apoya el proyecto</h3>
            <p className="text-neutral-600 text-sm">
              Tu pedido nos ayuda a validar la demanda y crecer como proyecto artesanal.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-neutral-900 mb-2">Producto fresco</h3>
            <p className="text-neutral-600 text-sm">
              Elaborada después de recibir tu pedido para garantizar máxima frescura.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* How it works */}
          <div>
            <h2 className="text-2xl font-display text-neutral-900 mb-6">
              ¿Cómo funciona?
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-[#ffffec] rounded-full flex items-center justify-center text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-neutral-900 mb-1">
                    Rellena el formulario
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Indica tu nombre, email, el sabor que prefieres y la cantidad que
                    deseas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-[#ffffec] rounded-full flex items-center justify-center text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-neutral-900 mb-1">
                    Preparamos tu pedido
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Elaboramos tu granola de forma artesanal con ingredientes frescos
                    y de calidad.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-[#ffffec] rounded-full flex items-center justify-center text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-neutral-900 mb-1">
                    Te contactamos para la entrega
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Coordinamos contigo para entregarte tu granola en mano.
                  </p>
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-8 bg-cream-50 rounded-xl p-6">
              <h3 className="text-neutral-900 mb-3">
                Sabores disponibles:
              </h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <div>
                    <strong>Granola Clásica:</strong> Nuestra receta original con miel
                    ecológica, avena sin gluten y frutos secos premium.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <div>
                    <strong>Granola de Naranja:</strong> Con ralladura de naranja
                    natural y miel de azahar. Frescura mediterránea en cada bocado.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 sticky top-24">
              <h2 className="text-2xl font-display text-neutral-900 mb-6">
                Reserva tu granola
              </h2>

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
                <div className="bg-cream-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-700 text-sm">Precio por unidad:</span>
                    <span className="text-neutral-900">9,00€</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-200">
                    <span className="text-neutral-900">Total:</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {totalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    {formData.cantidad} {formData.cantidad === 1 ? 'unidad' : 'unidades'}
                  </p>
                </div>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  leftIcon={<ShoppingBag className="w-5 h-5" />}
                  className="w-full"
                >
                  {isLoading ? 'Procesando...' : 'Reservar mi granola'}
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  Al enviar este formulario, aceptas que te contactemos para coordinar la
                  entrega.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
