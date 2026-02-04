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
    <section className="py-20 md:py-28 bg-cream-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          {subtitle && (
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">
              {subtitle}
            </p>
          )}
          <h2 className="font-display text-stone-800">{title}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-stone-200 last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="font-display text-lg text-stone-800 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-stone-400 transition-transform flex-shrink-0',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                )}
              >
                <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
