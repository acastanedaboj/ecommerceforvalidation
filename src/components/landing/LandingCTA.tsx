import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LandingCTAProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCta?: {
    text: string;
    href: string;
  };
  variant?: 'primary' | 'light';
}

export function LandingCTA({
  title,
  description,
  ctaText,
  ctaHref,
  secondaryCta,
  variant = 'primary',
}: LandingCTAProps) {
  if (variant === 'primary') {
    return (
      <section style={{ padding: '80px 0', background: 'var(--brown)' }}>
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--white)', marginBottom: '24px' }}>
            {title}
          </h2>
          {description && (
            <p style={{ color: 'rgba(255,255,255,.65)', fontWeight: 300, fontSize: '14px', lineHeight: 1.85, marginBottom: '40px' }}>{description}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaHref}
              className="btn-pill-white inline-flex items-center justify-center gap-2"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="btn-pill inline-flex items-center justify-center gap-2"
                style={{ borderColor: 'rgba(255,255,255,.3)', color: 'var(--white)' }}
              >
                {secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="container-custom text-center max-w-2xl mx-auto">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '24px' }}>{title}</h2>
        {description && (
          <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '40px' }}>{description}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ctaHref}
            className="btn-pill inline-flex items-center justify-center gap-2"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="btn-pill inline-flex items-center justify-center gap-2"
              style={{ borderColor: 'rgba(0,0,0,.15)' }}
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
