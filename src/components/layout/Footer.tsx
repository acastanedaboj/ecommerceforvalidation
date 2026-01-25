import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { NAVIGATION, BUSINESS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-cream-200" role="contentinfo">
      {/* Main footer content */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center group"
            >
              <Image
                src="/images/logo.svg"
                alt={BUSINESS.name}
                width={140}
                height={50}
                className="h-10 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="mt-5 text-cream-400 max-w-sm leading-relaxed">
              Granola elaborada con amor, ingredientes ecológicos y sin gluten real.
              Tostada lentamente con miel de apicultores locales.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-8">
              <a
                href={BUSINESS.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-stone-800 hover:bg-earth-600 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="p-3 bg-stone-800 hover:bg-earth-600 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Envíanos un email"
              >
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Tienda links */}
          <div className="lg:col-span-2">
            <h3 className="text-cream-50 font-display font-medium text-lg mb-5">Tienda</h3>
            <ul className="space-y-3.5">
              {NAVIGATION.footer.tienda.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream-400 hover:text-cream-100 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa links */}
          <div className="lg:col-span-2">
            <h3 className="text-cream-50 font-display font-medium text-lg mb-5">Empresa</h3>
            <ul className="space-y-3.5">
              {NAVIGATION.footer.empresa.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream-400 hover:text-cream-100 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h3 className="text-cream-50 font-display font-medium text-lg mb-5">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-3 text-cream-400 hover:text-cream-100 transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 text-cream-500 group-hover:text-earth-400 transition-colors" strokeWidth={1.5} />
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="flex items-center gap-3 text-cream-400 hover:text-cream-100 transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 text-cream-500 group-hover:text-earth-400 transition-colors" strokeWidth={1.5} />
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-cream-400 text-sm">
                <MapPin className="w-4 h-4 text-cream-500" strokeWidth={1.5} />
                {BUSINESS.address.city}, {BUSINESS.address.country}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom">
        <div className="h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-cream-500">
            {currentYear} {BUSINESS.name}. Todos los derechos reservados.
          </p>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {NAVIGATION.footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-cream-500 hover:text-cream-200 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Payment methods - Minimal */}
      <div className="bg-stone-950/50 py-5">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-cream-600">
            <span>Pago seguro:</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-stone-800/50 rounded-md">Visa</span>
              <span className="px-2.5 py-1 bg-stone-800/50 rounded-md">Mastercard</span>
              <span className="px-2.5 py-1 bg-stone-800/50 rounded-md">Stripe</span>
            </div>
            <span className="hidden sm:inline text-cream-700">|</span>
            <span>Envío seguro a toda España</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
