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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-accent-600" />
          </div>
          <h1 className="text-3xl font-display text-neutral-900 mb-4">
            ¡Gracias por tu interés!
          </h1>
          <p className="text-neutral-600 mb-8">
            Hemos recibido tu solicitud. Nuestro equipo comercial revisará tu información
            y se pondrá en contacto contigo en un plazo de 24-48 horas laborables.
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
          <span className="badge-secondary mb-4">B2B / Horeca</span>
          <h1 className="text-4xl md:text-5xl font-display text-neutral-900 mb-4">
            Soluciones para profesionales
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Ofrecemos condiciones especiales para cafeterías, hoteles, tiendas
            especializadas y distribuidores. Descubre cómo ofrecer nuestra granola
            artesanal a tus clientes.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-neutral-900 mb-2">Formato profesional</h3>
            <p className="text-neutral-600 text-sm">
              Bolsas de 1kg ideales para preparación en cocina, buffets de desayuno
              o venta a granel.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Building className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-neutral-900 mb-2">Precios mayoristas</h3>
            <p className="text-neutral-600 text-sm">
              Descuentos progresivos según volumen. Condiciones especiales para
              pedidos recurrentes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-neutral-900 mb-2">Logística adaptada</h3>
            <p className="text-neutral-600 text-sm">
              Envíos programados según tus necesidades. Plazos de entrega acordados.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product info */}
          <div>
            <h2 className="text-2xl font-display text-neutral-900 mb-6">
              Nuestros formatos profesionales
            </h2>

            <div className="space-y-6">
              {/* 1kg format */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-neutral-900">Granola Clásica 1kg</h3>
                    <p className="text-sm text-neutral-500">SKU: GRAN-1KG</p>
                  </div>
                  <span className="badge-primary">Horeca</span>
                </div>
                <p className="text-neutral-600 text-sm mb-4">
                  Mismo producto artesanal que nuestra versión retail, en formato
                  económico de 1kg. Ideal para hoteles, cafeterías y tiendas a granel.
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    Avena certificada sin gluten
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    Miel ecológica y frutos secos premium
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    Caducidad: 6 meses desde fabricación
                  </li>
                </ul>
                <p className="mt-4 text-primary-600">
                  Precio: Consultar según volumen
                </p>
              </div>

              {/* Retail packs */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-neutral-900">Granola 250g (retail)</h3>
                    <p className="text-sm text-neutral-500">Varios sabores</p>
                  </div>
                  <span className="badge-secondary">Tiendas</span>
                </div>
                <p className="text-neutral-600 text-sm mb-4">
                  Para tiendas especializadas que quieran ofrecer nuestra granola
                  a sus clientes. Disponible en todos los sabores.
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    Packaging retail atractivo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    Material POS disponible
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    Pedido mínimo: 24 unidades
                  </li>
                </ul>
                <p className="mt-4 text-primary-600">
                  Precio: Desde 6,50€/ud (según volumen)
                </p>
              </div>
            </div>

            {/* Why choose us */}
            <div className="mt-8 bg-primary-50 rounded-xl p-6">
              <h3 className="text-neutral-900 mb-4">
                ¿Por qué elegir Poppy?
              </h3>
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
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 sticky top-24">
              <h2 className="text-xl text-neutral-900 mb-6">
                Solicitar información comercial
              </h2>

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

                <div className="grid sm:grid-cols-2 gap-4">
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
                  leftIcon={<Mail className="w-4 h-4" />}
                >
                  Enviar solicitud
                </Button>

                <p className="text-xs text-neutral-500 text-center">
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
