'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BundleBuilder } from './BundleBuilder';
import type { BundlePackSize } from '@/types/bundle';

interface BundleBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackSize?: BundlePackSize;
  initialProductId?: string;
}

export function BundleBuilderModal({
  isOpen,
  onClose,
  initialPackSize = 4,
  initialProductId,
}: BundleBuilderModalProps) {
  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-40',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Crear pack mixto"
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-lg',
          'bg-cream-100 shadow-soft-xl overflow-hidden',
          'transform transition-transform duration-300 ease-bounce-soft',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'absolute top-4 right-4 z-10',
            'w-10 h-10 rounded-full bg-white shadow-soft',
            'flex items-center justify-center',
            'text-stone-500 hover:text-stone-700',
            'transition-all duration-200 hover:scale-105',
            'focus-visible:ring-2 focus-visible:ring-earth-400'
          )}
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="h-full overflow-y-auto">
          <BundleBuilder
            initialPackSize={initialPackSize}
            initialProductId={initialProductId}
            onClose={onClose}
            className="min-h-full"
          />
        </div>
      </div>
    </>
  );
}

export default BundleBuilderModal;
