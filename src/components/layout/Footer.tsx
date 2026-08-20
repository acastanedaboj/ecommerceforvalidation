import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { NAVIGATION, BUSINESS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#6d4d45] text-[#ffffec]" role="contentinfo">
      {/* Main footer content */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center">
              <Image
                src="/images/logo.svg"
                alt={BUSINESS.name}
                width={100}
                height={35}
                className="h-8 w-auto brightness-0 hue-rotate-[15deg] invert saturate-[10] sepia transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-[#ffffec]">
              Granola elaborada con amor, ingredientes ecológicos y sin gluten real. Tostada
              lentamente con miel de apicultores locales.
            </p>

            {/* Social links */}
            <div className="mt-8 flex gap-3">
              <a
                href={BUSINESS.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#5a3f38] p-3 text-[#ffffec] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a322c]"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="rounded-xl bg-[#5a3f38] p-3 text-[#ffffec] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a322c]"
                aria-label="Envíanos un email"
              >
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Tienda links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 font-display text-lg font-medium text-[#ffffec]">Tienda</h3>
            <ul className="space-y-3.5">
              {NAVIGATION.footer.tienda.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#ffffec] transition-colors hover:text-[#ffffec]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 font-display text-lg font-medium text-[#ffffec]">Empresa</h3>
            <ul className="space-y-3.5">
              {NAVIGATION.footer.empresa.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#ffffec] transition-colors hover:text-[#ffffec]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 font-display text-lg font-medium text-[#ffffec]">Recursos</h3>
            <ul className="space-y-3.5">
              {NAVIGATION.footer.recursos.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#ffffec] transition-colors hover:text-[#ffffec]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 font-display text-lg font-medium text-[#ffffec]">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="group flex items-center gap-3 text-sm text-[#ffffec] transition-colors hover:text-[#ffffec]"
                >
                  <Mail
                    className="h-4 w-4 text-[#ffffec] transition-colors group-hover:text-[#ffffec]"
                    strokeWidth={1.5}
                  />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#ffffec]">
                <MapPin className="h-4 w-4 text-[#ffffec]" strokeWidth={1.5} />
                Málaga, España
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ffffec]/30 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="container-custom py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-[#ffffec]">
            {currentYear} {BUSINESS.name}. Todos los derechos reservados.
          </p>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {NAVIGATION.footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#ffffec] transition-colors hover:text-[#ffffec]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Payment methods - Minimal */}
      <div className="bg-[#5a3f38] py-5">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#ffffec]">
            <span>Pago seguro:</span>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#4a322c] px-2.5 py-1">Visa</span>
              <span className="rounded-md bg-[#4a322c] px-2.5 py-1">Mastercard</span>
              <span className="rounded-md bg-[#4a322c] px-2.5 py-1">Stripe</span>
            </div>
            <span className="hidden text-[#ffffec] sm:inline">|</span>
            <span>Envío seguro a toda España</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
