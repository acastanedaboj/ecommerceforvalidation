'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, Clock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { BUSINESS } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function ContactoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Mensaje enviado correctamente. Te responderemos pronto.');

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-neutral-900 mb-4">
            Contacto
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
            Rellena el formulario o contacta directamente con nosotros.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-1">
            <div className="bg-primary-50 rounded-2xl p-8">
              <h2 className="text-xl text-neutral-900 mb-6">
                Información de contacto
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-900">Email</p>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="text-primary-600 hover:underline"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-900">Dirección</p>
                    <p className="text-neutral-600">
                      {BUSINESS.address.street}
                      <br />
                      {BUSINESS.address.postalCode} {BUSINESS.address.city}
                      <br />
                      {BUSINESS.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-900">Horario de atención</p>
                    <p className="text-neutral-600">
                      Lunes a Viernes: 9:00 - 18:00
                      <br />
                      Fines de semana: Cerrado
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-primary-200">
                <p className="text-neutral-900 mb-3">Síguenos en redes</p>
                <div className="flex gap-3">
                  <a
                    href={BUSINESS.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:bg-primary-100 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href={BUSINESS.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:bg-primary-100 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
              <h2 className="text-xl text-neutral-900 mb-6">
                Envíanos un mensaje
              </h2>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="label">Asunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="pedido">Pregunta sobre mi pedido</option>
                    <option value="producto">Información de producto</option>
                    <option value="suscripcion">Suscripción</option>
                    <option value="mayorista">Venta mayorista / B2B</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="label">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="input resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-neutral-600">
                    He leído y acepto la{' '}
                    <a href="/legal/privacidad" className="text-primary-600 hover:underline">
                      política de privacidad
                    </a>
                  </label>
                </div>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Enviar mensaje
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12">
          <div className="rounded-2xl overflow-hidden h-64 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.0!2d-4.4295!3d36.7213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f7be5c5c8a7d%3A0x0!2sAvda.%20Sor%20Teresa%20Prat%2C%2015%2C%2029003%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1706000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Poppy - Avda. Sor Teresa Prat, 15, Málaga"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
