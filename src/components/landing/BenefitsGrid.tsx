import { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  title?: string;
  subtitle?: string;
  benefits: Benefit[];
  columns?: 2 | 3 | 4;
}

export function BenefitsGrid({
  title,
  subtitle,
  benefits,
  columns = 4,
}: BenefitsGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-20 md:py-28 bg-cream-100">
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-display text-stone-800">{title}</h2>
            )}
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-px bg-stone-200`}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-cream-100 p-10 text-center group hover:bg-white transition-colors"
              >
                <Icon
                  className="w-8 h-8 text-earth-600 mx-auto mb-6"
                  strokeWidth={1}
                />
                <h3 className="font-display text-lg text-stone-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
