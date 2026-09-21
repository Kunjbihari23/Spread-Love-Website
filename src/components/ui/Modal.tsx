import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type Lenis from 'lenis';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'lg',
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (!isOpen) return;

    const lenis = getLenis();
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    // Lock page scroll (native + Lenis)
    document.body.style.overflow = 'hidden';
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }
    lenis?.stop();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Keep wheel/touch scroll inside modal — never bubble to page
  useEffect(() => {
    if (!isOpen) return;

    const el = contentRef.current;
    if (!el) return;

    const stopPageScroll = (e: WheelEvent | TouchEvent) => {
      // Allow scroll only inside modal content; block page Lenis/body
      e.stopPropagation();
    };

    el.addEventListener('wheel', stopPageScroll, { passive: true });
    el.addEventListener('touchmove', stopPageScroll, { passive: true });

    return () => {
      el.removeEventListener('wheel', stopPageScroll);
      el.removeEventListener('touchmove', stopPageScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-purple-100 transition-all transform animate-scaleUp flex flex-col`}
        data-lenis-prevent
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 p-5 sm:p-6 pb-4 border-b border-gray-100 shrink-0">
          {title && (
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug pr-2">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content — only this region scrolls */}
        <div
          ref={contentRef}
          className="p-5 sm:p-8 overflow-y-auto overscroll-contain flex-1 min-h-0"
          data-lenis-prevent
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
