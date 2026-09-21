import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'interactive';
  glass?: boolean;
  border?: boolean;
  /** Default padding. Media cards MUST use padded={false} — Tailwind className "p-0" cannot override base p-*. */
  padded?: boolean;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  elevation = 'md',
  glass = false,
  border = true,
  padded = true,
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const elevationStyles = {
    none: '',
    sm: 'shadow-[var(--shadow-sm)]',
    md: 'shadow-[var(--shadow-md)]',
    lg: 'shadow-[var(--shadow-lg)]',
    interactive:
      'shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1 transition-all duration-300',
  };

  const baseStyles = `rounded-3xl ${padded ? 'p-6 sm:p-8' : 'p-0'} transition-all duration-300`;
  const glassStyles = glass
    ? 'bg-white/85 backdrop-blur-md backdrop-saturate-150'
    : 'bg-white';
  const borderStyles = border ? 'border border-[var(--color-purple-100)]' : '';

  return (
    <Component
      className={`${baseStyles} ${glassStyles} ${borderStyles} ${elevationStyles[elevation]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
