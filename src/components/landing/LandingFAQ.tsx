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
    <section className="bg-cream-50 py-20 md:py-28">
      <div className="container-custom">
        <div className="mb-16 text-center">
          {subtitle && (
            <p className="mb-4 text-xs uppercase tracking-widest text-stone-500">{subtitle}</p>
          )}
          <h2 className="font-display text-stone-800">{title}</h2>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-stone-200 last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="group flex w-full items-center justify-between py-6 text-left"
              >
                <span className="pr-4 font-display text-lg text-stone-800">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-shrink-0 text-stone-400 transition-transform',
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
                <p className="leading-relaxed text-stone-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
