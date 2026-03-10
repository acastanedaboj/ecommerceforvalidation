import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface LandingHeroProps {
  title: string;
  highlight?: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCta?: {
    text: string;
    href: string;
  };
  badges?: string[];
  image?: string;
}

export function LandingHero({
  title,
  highlight,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCta,
  badges,
  image,
}: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--white)' }}>
      <div className="container-custom" style={{ paddingTop: '160px', paddingBottom: '64px' }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brown)', background: 'var(--off)', padding: '4px 12px', borderRadius: '100px' }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
              {title}
              {highlight && (
                <>
                  <br />
                  <span style={{ color: 'var(--brown)' }}>{highlight}</span>
                </>
              )}
            </h1>

            <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85, marginBottom: '40px' }}>
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={ctaHref} className="btn-pill group">
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-pill" style={{ borderColor: 'rgba(0,0,0,.15)' }}>
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          </div>

          {/* Image */}
          {image && (
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-lg mx-auto">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
