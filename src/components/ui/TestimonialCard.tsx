'use client';

import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  rating: number;
  avatar?: string;
  verified?: boolean;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role = 'Cliente',
  rating,
  avatar,
  verified = true,
  className,
}: TestimonialCardProps) {
  // Get initials from author name
  const initials = author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        'relative bg-white rounded-2xl p-8 shadow-soft border border-cream-100',
        'transition-all duration-400 hover:shadow-soft-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Decorative quote mark */}
      <span className="absolute top-4 right-6 font-display text-6xl text-earth-100 leading-none select-none">
        &ldquo;
      </span>

      {/* Rating stars */}
      <div className="flex gap-1 mb-4" aria-label={`Valoracion: ${rating} de 5 estrellas`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-cream-200 text-cream-200'
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="relative z-10 mb-6">
        <p className="text-stone-600 leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      {/* Author info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-earth-100 to-earth-200 flex items-center justify-center">
            <span className="text-earth-600 font-medium text-sm">
              {initials}
            </span>
          </div>
        )}

        {/* Name and role */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-stone-800">{author}</p>
            {verified && (
              <CheckCircle className="w-4 h-4 text-olive-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-stone-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
