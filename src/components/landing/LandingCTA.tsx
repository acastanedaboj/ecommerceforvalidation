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
      <section className="py-20 md:py-28 bg-earth-600">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-[#ffffec] mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-[#ffffec]/70 mb-10">{description}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 bg-[#ffffec] text-earth-700 px-8 py-4 font-medium hover:bg-cream-100 transition-colors"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 border border-[#ffffec]/30 text-[#ffffec] px-8 py-4 font-medium hover:bg-[#ffffec]/10 transition-colors"
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
    <section className="py-20 md:py-28 bg-white">
      <div className="container-custom text-center max-w-2xl mx-auto">
        <h2 className="font-display text-stone-800 mb-6">{title}</h2>
        {description && (
          <p className="text-stone-600 mb-10">{description}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2 bg-earth-600 text-[#ffffec] px-8 py-4 font-medium hover:bg-earth-700 transition-colors"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-800 px-8 py-4 font-medium hover:border-stone-400 transition-colors"
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
