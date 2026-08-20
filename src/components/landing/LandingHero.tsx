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
    <section className="relative overflow-hidden bg-white">
      <div className="container-custom pb-16 pt-10 md:pb-24 md:pt-14 lg:pb-28 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            {badges && badges.length > 0 && (
              <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-earth-100 px-3 py-1 text-xs uppercase tracking-widest text-earth-600"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <h1 className="mb-6 font-display text-stone-800">
              {title}
              {highlight && (
                <>
                  <br />
                  <span className="text-earth-600">{highlight}</span>
                </>
              )}
            </h1>

            <p className="mb-10 text-base leading-relaxed text-stone-600 md:text-lg">{subtitle}</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href={ctaHref} className="btn-primary btn-lg group">
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              <div className="relative mx-auto aspect-[4/5] max-w-lg">
                <div className="relative h-full w-full overflow-hidden rounded-lg">
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
