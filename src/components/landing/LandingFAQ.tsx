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

export function LandingFAQ({ title = 'Preguntas frecuentes', subtitle, faqs }: LandingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: '80px 0', background: 'var(--off)' }}>
      <div className="container-custom">
        <div className="mb-16 text-center">
          {subtitle && (
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(17,17,17,.35)',
                marginBottom: '16px',
              }}
            >
              {subtitle}
            </p>
          )}
          <h2 style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}
              className="last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="group flex w-full items-center justify-between py-6 text-left"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    paddingRight: '16px',
                  }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-shrink-0 transition-transform',
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
                <p
                  style={{
                    fontSize: '14px',
                    color: 'rgba(17,17,17,.5)',
                    fontWeight: 300,
                    lineHeight: 1.85,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
