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
      <section className="bg-earth-600 py-20 md:py-28">
        <div className="container-custom mx-auto max-w-2xl text-center">
          <h2 className="mb-6 font-display text-3xl text-[#ffffec] md:text-4xl">{title}</h2>
          {description && <p className="mb-10 text-[#ffffec]/70">{description}</p>}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 bg-[#ffffec] px-8 py-4 font-medium text-earth-700 transition-colors hover:bg-cream-100"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 border border-[#ffffec]/30 px-8 py-4 font-medium text-[#ffffec] transition-colors hover:bg-[#ffffec]/10"
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
    <section className="bg-white py-20 md:py-28">
      <div className="container-custom mx-auto max-w-2xl text-center">
        <h2 className="mb-6 font-display text-stone-800">{title}</h2>
        {description && <p className="mb-10 text-stone-600">{description}</p>}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2 bg-earth-600 px-8 py-4 font-medium text-[#ffffec] transition-colors hover:bg-earth-700"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 border border-stone-300 px-8 py-4 font-medium text-stone-800 transition-colors hover:border-stone-400"
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
