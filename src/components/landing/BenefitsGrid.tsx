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

export function BenefitsGrid({ title, subtitle, benefits, columns = 4 }: BenefitsGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="mb-16 text-center">
            {subtitle && (
              <p className="mb-4 text-xs uppercase tracking-widest text-stone-500">{subtitle}</p>
            )}
            {title && <h2 className="font-display text-stone-800">{title}</h2>}
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-px bg-stone-200`}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-cream-100 p-10 text-center transition-colors hover:bg-white"
              >
                <Icon className="mx-auto mb-6 h-8 w-8 text-earth-600" strokeWidth={1} />
                <h3 className="mb-3 font-display text-lg text-stone-800">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
