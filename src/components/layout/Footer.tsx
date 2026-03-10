import Link from 'next/link';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { NAVIGATION, BUSINESS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--brown)', color: 'var(--white)' }} role="contentinfo">
      {/* Main footer content */}
      <div className="container-custom" style={{ padding: '56px 56px 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '40px',
            marginBottom: '40px',
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Poppy
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.65)', fontWeight: 300, lineHeight: 1.7 }}>
              Granola artesanal sin gluten elaborada con ingredientes naturales.
              Tostada lentamente en nuestro obrador dedicado en Málaga.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <a
                href={BUSINESS.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  padding: '10px',
                  background: 'rgba(255,255,255,.08)',
                  color: 'rgba(255,255,255,.75)',
                }}
                aria-label="Siguenos en Instagram"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  padding: '10px',
                  background: 'rgba(255,255,255,.08)',
                  color: 'rgba(255,255,255,.75)',
                }}
                aria-label="Envianos un email"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Tienda links */}
          <div>
            <h4 style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', marginBottom: '16px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              tienda
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAVIGATION.footer.tienda.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,.75)', textDecoration: 'none', fontWeight: 300 }}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa links */}
          <div>
            <h4 style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', marginBottom: '16px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              nosotros
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAVIGATION.footer.empresa.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,.75)', textDecoration: 'none', fontWeight: 300 }}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', marginBottom: '16px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              contacto
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,.75)', textDecoration: 'none', fontWeight: 300 }}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,.75)', textDecoration: 'none', fontWeight: 300 }}
                  className="hover:text-white transition-colors"
                >
                  instagram
                </a>
              </li>
              <li style={{ fontSize: '13px', color: 'rgba(255,255,255,.55)', fontWeight: 300 }}>
                malaga, espana
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,.15)',
          }}
        >
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)', fontWeight: 300 }}>
            &copy; {currentYear} Poppy. todos los derechos reservados.
          </span>
          <div className="flex gap-5">
            {NAVIGATION.footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)', textDecoration: 'none', fontWeight: 300 }}
                className="hover:text-white transition-colors"
              >
                {item.name.toLowerCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
