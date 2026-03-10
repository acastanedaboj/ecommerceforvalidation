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
    <section style={{ padding: '80px 0', background: 'var(--off)' }}>
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <p style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(17,17,17,.35)', marginBottom: '16px' }}>
                {subtitle}
              </p>
            )}
            {title && (
              <h2 style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
            )}
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-px`} style={{ background: 'rgba(0,0,0,.06)' }}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="p-10 text-center group transition-colors"
                style={{ background: 'var(--off)' }}
              >
                <Icon
                  className="w-8 h-8 mx-auto mb-6"
                  style={{ color: 'var(--brown)' }}
                  strokeWidth={1}
                />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '12px' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.7 }}>
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
