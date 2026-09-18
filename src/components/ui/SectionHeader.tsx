import React from 'react';

export interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${alignClass} ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-[var(--color-pink-50)] border border-[var(--color-pink-200)] text-[var(--color-pink-700)] text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {badgeIcon && <span className="inline-block">{badgeIcon}</span>}
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--color-text-main)] mb-4 leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--color-text-muted)] font-medium max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
