'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface LandingFAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export function LandingFAQ({
  title = 'Preguntas frecuentes',
  subtitle,
  faqs,
}: LandingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: '80px 0', background: 'var(--off)' }}>
      <div className="container-custom">
        <div className="text-center mb-16">
          {subtitle && (
            <p style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(17,17,17,.35)', marginBottom: '16px' }}>
              {subtitle}
            </p>
          )}
          <h2 style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}
              className="last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', paddingRight: '16px' }}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 transition-transform flex-shrink-0',
                    openIndex === index && 'rotate-180'
                  )}
                  style={{ color: 'var(--brown)' }}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                )}
              >
                <p style={{ fontSize: '14px', color: 'rgba(17,17,17,.5)', fontWeight: 300, lineHeight: 1.85 }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
