'use client';

import Image from 'next/image';
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
        'relative rounded-2xl border border-cream-100 bg-white p-8 shadow-soft',
        'transition-all duration-400 hover:-translate-y-1 hover:shadow-soft-lg',
        className
      )}
    >
      {/* Decorative quote mark */}
      <span className="absolute right-6 top-4 select-none font-display text-6xl leading-none text-earth-100">
        &ldquo;
      </span>

      {/* Rating stars */}
      <div className="mb-4 flex gap-1" aria-label={`Valoracion: ${rating} de 5 estrellas`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < rating ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="relative z-10 mb-6">
        <p className="italic leading-relaxed text-stone-600">&ldquo;{quote}&rdquo;</p>
      </blockquote>

      {/* Author info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {avatar ? (
          <Image
            src={avatar}
            alt={author}
            width={48}
            height={48}
            className="h-12 w-12 object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-earth-100 to-earth-200">
            <span className="text-sm font-medium text-earth-600">{initials}</span>
          </div>
        )}

        {/* Name and role */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-stone-800">{author}</p>
            {verified && <CheckCircle className="h-4 w-4 flex-shrink-0 text-olive-500" />}
          </div>
          <p className="text-sm text-stone-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
