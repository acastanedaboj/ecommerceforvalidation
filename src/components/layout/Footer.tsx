import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { NAVIGATION, BUSINESS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#6d4d45] text-[#fcf8d5]" role="contentinfo">
      {/* Main footer content */}
      <div className="container-custom pb-12 pt-24 md:pb-16 md:pt-20 lg:pb-20 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-12 lg:gap-8">
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
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#fcf8d5] md:text-base">
              Granola artesanal sin gluten y sin lactosa elaborada con ingredientes naturales.
              Tostada lentamente en nuestro obrador dedicado en Málaga.
            </p>

            {/* Social links */}
            <div className="mt-8 flex gap-3">
              <a
                href={BUSINESS.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#5a3f38] p-3 text-[#fcf8d5] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a322c]"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="rounded-xl bg-[#5a3f38] p-3 text-[#fcf8d5] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a322c]"
                aria-label="Envíanos un email"
              >
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Tienda links */}
          <div className="lg:col-span-2">
            <h3
              className="mb-5 text-[15px] font-bold text-[#fcf8d5]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              Tienda
            </h3>
            <ul className="space-y-3.5">
              {NAVIGATION.footer.tienda.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#fcf8d5] transition-colors hover:text-[#fcf8d5]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa links */}
          <div className="lg:col-span-2">
            <h3
              className="mb-5 text-[15px] font-bold text-[#fcf8d5]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              Empresa
            </h3>
            <ul className="space-y-3.5">
              {NAVIGATION.footer.empresa.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#fcf8d5] transition-colors hover:text-[#fcf8d5]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-4">
            <h3
              className="mb-5 text-[15px] font-bold text-[#fcf8d5]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="group flex items-center gap-3 text-sm text-[#fcf8d5] transition-colors hover:text-[#fcf8d5]"
                >
                  <Mail
                    className="h-4 w-4 text-[#fcf8d5] transition-colors group-hover:text-[#fcf8d5]"
                    strokeWidth={1.5}
                  />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#fcf8d5]">
                <MapPin className="h-4 w-4 text-[#fcf8d5]" strokeWidth={1.5} />
                Málaga, España
              </li>
              <li
                className="mt-2 text-xs text-[#fcf8d5]"
                style={{ opacity: 0.6, paddingLeft: '28px' }}
              >
                Entrega gratuita en el centro de Málaga
              </li>
            </ul>
          </div>
        </div>

        {/* SEO links — tag cloud */}
        <div className="mt-12 border-t border-[#fcf8d5]/10 pt-10">
          <p className="mb-4 text-[10px] uppercase tracking-widest text-[#fcf8d5]/40">Explora</p>
          <nav aria-label="Temas relacionados">
            <ul className="flex flex-wrap gap-2">
              {NAVIGATION.footer.recursos.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-full bg-[#5a3f38] px-3 py-1.5 text-xs text-[#fcf8d5]/70 transition-all duration-200 hover:bg-[#4a322c] hover:text-[#fcf8d5]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ffffec]/30 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="container-custom py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-[#fcf8d5]">
            {currentYear} {BUSINESS.name}. Todos los derechos reservados.
          </p>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {NAVIGATION.footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#fcf8d5] transition-colors hover:text-[#fcf8d5]"
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
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#fcf8d5]">
            <span>Pago seguro:</span>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#4a322c] px-2.5 py-1">Visa</span>
              <span className="rounded-md bg-[#4a322c] px-2.5 py-1">Mastercard</span>
              <span className="rounded-md bg-[#4a322c] px-2.5 py-1">Stripe</span>
            </div>
            <span className="hidden text-[#fcf8d5] sm:inline">|</span>
            <span>Envío seguro a toda España</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
