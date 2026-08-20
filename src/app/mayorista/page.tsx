'use client';

import { useState } from 'react';
import { Building, Package, Truck, Phone, Mail, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

const businessTypes = [
  { value: 'cafeteria', label: 'Cafetería / Coffee Shop' },
  { value: 'tienda', label: 'Tienda de alimentación' },
  { value: 'hotel', label: 'Hotel / Hostelería' },
  { value: 'gimnasio', label: 'Gimnasio / Centro wellness' },
  { value: 'distribuidor', label: 'Distribuidor' },
  { value: 'otro', label: 'Otro' },
];

export default function MayoristaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    location: '',
    estimatedVolume: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/mayorista', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
      }

      toast.success('Solicitud enviada correctamente');
      setIsSubmitted(true);
    } catch (error) {
      toast.error('Error al enviar la solicitud. Intentalo de nuevo.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="section">
        <div className="container-custom max-w-2xl text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent-100">
            <CheckCircle className="h-10 w-10 text-accent-600" />
          </div>
          <h1 className="mb-4 font-display text-3xl text-neutral-900">¡Gracias por tu interés!</h1>
          <p className="mb-8 text-neutral-600">
            Hemos recibido tu solicitud. Nuestro equipo comercial revisará tu información y se
            pondrá en contacto contigo en un plazo de 24-48 horas laborables.
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
          <span className="badge-secondary mb-4">B2B / Horeca</span>
          <h1 className="mb-4 font-display text-4xl text-neutral-900 md:text-5xl">
            Soluciones para profesionales
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Ofrecemos condiciones especiales para cafeterías, hoteles, tiendas especializadas y
            distribuidores. Descubre cómo ofrecer nuestra granola artesanal a tus clientes.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-neutral-900">Formato profesional</h3>
            <p className="text-sm text-neutral-600">
              Bolsas de 1kg ideales para preparación en cocina, buffets de desayuno o venta a
              granel.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Building className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-neutral-900">Precios mayoristas</h3>
            <p className="text-sm text-neutral-600">
              Descuentos progresivos según volumen. Condiciones especiales para pedidos recurrentes.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Truck className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-neutral-900">Logística adaptada</h3>
            <p className="text-sm text-neutral-600">
              Envíos programados según tus necesidades. Plazos de entrega acordados.
            </p>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product info */}
          <div>
            <h2 className="mb-6 font-display text-2xl text-neutral-900">
              Nuestros formatos profesionales
            </h2>

            <div className="space-y-6">
              {/* 1kg format */}
              <div className="rounded-xl bg-neutral-50 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-neutral-900">Granola Clásica 1kg</h3>
                    <p className="text-sm text-neutral-500">SKU: GRAN-1KG</p>
                  </div>
                  <span className="badge-primary">Horeca</span>
                </div>
                <p className="mb-4 text-sm text-neutral-600">
                  Mismo producto artesanal que nuestra versión retail, en formato económico de 1kg.
                  Ideal para hoteles, cafeterías y tiendas a granel.
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent-600" />
                    Avena certificada sin gluten
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent-600" />
                    Miel ecológica y frutos secos premium
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent-600" />
                    Caducidad: 6 meses desde fabricación
                  </li>
                </ul>
                <p className="mt-4 text-primary-600">Precio: Consultar según volumen</p>
              </div>

              {/* Retail packs */}
              <div className="rounded-xl bg-neutral-50 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-neutral-900">Granola 150g (retail)</h3>
                    <p className="text-sm text-neutral-500">Varios sabores</p>
                  </div>
                  <span className="badge-secondary">Tiendas</span>
                </div>
                <p className="mb-4 text-sm text-neutral-600">
                  Para tiendas especializadas que quieran ofrecer nuestra granola a sus clientes.
                  Disponible en todos los sabores.
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent-600" />
                    Packaging retail atractivo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent-600" />
                    Material POS disponible
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent-600" />
                    Pedido mínimo: 24 unidades
                  </li>
                </ul>
                <p className="mt-4 text-primary-600">Precio: Desde 6,50€/ud (según volumen)</p>
              </div>
            </div>

            {/* Why choose us */}
            <div className="mt-8 rounded-xl bg-primary-50 p-6">
              <h3 className="mb-4 text-neutral-900">¿Por qué elegir Poppy?</h3>
              <ul className="space-y-3 text-sm text-neutral-700">
                <li>✓ Producto diferenciador: granola de verdad</li>
                <li>✓ Sin gluten certificado: atrae a clientes celíacos</li>
                <li>✓ Historia de marca: conecta con consumidores conscientes</li>
                <li>✓ Flexibilidad: adaptamos formatos a tus necesidades</li>
                <li>✓ Soporte comercial: te ayudamos con la venta</li>
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl text-neutral-900">Solicitar información comercial</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nombre de la empresa"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Persona de contacto"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Teléfono"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <Select
                  label="Tipo de negocio"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  options={businessTypes}
                  placeholder="Selecciona..."
                  required
                />

                <Input
                  label="Ubicación"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ciudad / Provincia"
                />

                <Select
                  label="Volumen estimado mensual"
                  name="estimatedVolume"
                  value={formData.estimatedVolume}
                  onChange={handleChange}
                  options={[
                    { value: '1-10', label: '1-10 kg/mes' },
                    { value: '10-50', label: '10-50 kg/mes' },
                    { value: '50-100', label: '50-100 kg/mes' },
                    { value: '100+', label: 'Más de 100 kg/mes' },
                  ]}
                  placeholder="Selecciona..."
                />

                <div>
                  <label className="label">Mensaje (opcional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="input resize-none"
                    placeholder="Cuéntanos más sobre tu negocio y necesidades..."
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full"
                  leftIcon={<Mail className="h-4 w-4" />}
                >
                  Enviar solicitud
                </Button>

                <p className="text-center text-xs text-neutral-500">
                  Te responderemos en 24-48h laborables
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
