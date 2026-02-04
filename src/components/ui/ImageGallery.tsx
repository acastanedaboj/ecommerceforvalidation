'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  enableZoom?: boolean;
  className?: string;
}

export function ImageGallery({
  images,
  productName,
  enableZoom = true,
  className,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const currentImage = images[selectedIndex] || images[0];
  const hasMultipleImages = images.length > 1;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableZoom) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Main image container */}
      <div className="relative">
        <div
          className={cn(
            'relative aspect-square overflow-hidden rounded-2xl bg-cream-100',
            enableZoom && 'cursor-zoom-in'
          )}
          onMouseEnter={() => enableZoom && setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={currentImage}
            alt={`${productName} - Imagen ${selectedIndex + 1}`}
            fill
            className={cn(
              'object-cover transition-transform duration-500 ease-out',
              isZooming && 'scale-150'
            )}
            style={
              isZooming
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : undefined
            }
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selectedIndex === 0}
          />
        </div>

        {/* Navigation arrows */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-soft hover:bg-white hover:shadow-soft-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-earth-400 focus-visible:ring-offset-2"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5 text-stone-600" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-soft hover:bg-white hover:shadow-soft-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-earth-400 focus-visible:ring-offset-2"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-5 h-5 text-stone-600" />
            </button>
          </>
        )}

        {/* Image counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-stone-900/70 backdrop-blur-sm text-[#ffffec] text-xs font-medium rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultipleImages && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300',
                'focus-visible:ring-2 focus-visible:ring-earth-400 focus-visible:ring-offset-2',
                selectedIndex === index
                  ? 'ring-2 ring-earth-500 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              )}
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={selectedIndex === index ? 'true' : 'false'}
            >
              <Image
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dots indicator for mobile */}
      {hasMultipleImages && (
        <div className="flex justify-center gap-2 md:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                selectedIndex === index
                  ? 'w-6 bg-earth-500'
                  : 'bg-stone-300 hover:bg-stone-400'
              )}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
