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
    <section className="relative bg-white overflow-hidden">
      <div className="container-custom pt-10 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-block text-xs tracking-widest uppercase text-earth-600 bg-earth-100 px-3 py-1 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-stone-800 mb-6">
              {title}
              {highlight && (
                <>
                  <br />
                  <span className="text-earth-600">{highlight}</span>
                </>
              )}
            </h1>

            <p className="text-base md:text-lg text-stone-600 mb-10 leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={ctaHref} className="btn-primary btn-lg group">
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-outline btn-lg">
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          </div>

          {/* Image */}
          {image && (
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-lg mx-auto">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
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
