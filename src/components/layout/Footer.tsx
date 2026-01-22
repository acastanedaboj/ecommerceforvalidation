import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { NAVIGATION, BUSINESS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      {/* Main footer content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-display font-bold text-white hover:text-primary-400 transition-colors"
            >
              <span className="text-3xl">🌾</span>
              {BUSINESS.name}
            </Link>
            <p className="mt-4 text-neutral-400 max-w-md">
              Granola artesanal elaborada con amor, ingredientes ecológicos y sin gluten real.
              Tostada lentamente con miel de apicultores locales y los mejores frutos secos.
            </p>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a
                href={BUSINESS.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 hover:bg-primary-600 rounded-lg transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 hover:bg-primary-600 rounded-lg transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tienda links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tienda</h3>
            <ul className="space-y-3">
              {NAVIGATION.footer.tienda.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {NAVIGATION.footer.empresa.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-3">
              {NAVIGATION.footer.ayuda.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-wrap gap-6 text-sm text-neutral-400">
            <a
              href={`mailto:${BUSINESS.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              {BUSINESS.email}
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              {BUSINESS.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {BUSINESS.address.city}, {BUSINESS.address.country}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>&copy; {currentYear} {BUSINESS.name}. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {NAVIGATION.footer.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods & Trust badges */}
      <div className="bg-neutral-950 py-4">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-neutral-500">
            <span>Pago seguro con:</span>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-neutral-800 rounded">Visa</span>
              <span className="px-2 py-1 bg-neutral-800 rounded">Mastercard</span>
              <span className="px-2 py-1 bg-neutral-800 rounded">Stripe</span>
            </div>
            <span className="hidden sm:inline">|</span>
            <span>Envío seguro a toda España</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
