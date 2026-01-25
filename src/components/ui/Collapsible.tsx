'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  icon,
  className,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
      // After animation, set height to auto for dynamic content
      const timeout = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timeout);
    } else {
      // First set explicit height, then animate to 0
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
      requestAnimationFrame(() => {
        setHeight(0);
      });
    }
  }, [isOpen]);

  const uniqueId = `collapsible-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={cn('collapsible', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="collapsible-trigger"
        aria-expanded={isOpen}
        aria-controls={`${uniqueId}-content`}
        id={`${uniqueId}-trigger`}
      >
        <span className="flex items-center gap-3">
          {icon && (
            <span className="text-stone-400">{icon}</span>
          )}
          <span>{title}</span>
        </span>
        <ChevronDown
          className={cn(
            'collapsible-icon',
            isOpen && 'collapsible-icon-open'
          )}
        />
      </button>
      <div
        id={`${uniqueId}-content`}
        role="region"
        aria-labelledby={`${uniqueId}-trigger`}
        className="collapsible-content"
        style={{ height: height !== undefined ? `${height}px` : 'auto' }}
      >
        <div ref={contentRef} className="pb-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Collapsible;
