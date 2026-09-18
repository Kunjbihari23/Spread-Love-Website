import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'magic';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  href,
  external,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer shadow-sm hover:shadow-md';

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-[var(--color-pink-500)] to-[var(--color-rose-500)] text-white hover:from-[var(--color-pink-600)] hover:to-[var(--color-rose-600)] shadow-pink-500/25',
    secondary:
      'bg-gradient-to-r from-[var(--color-amber-400)] to-[var(--color-amber-500)] text-amber-950 hover:from-[var(--color-amber-500)] hover:to-[var(--color-amber-600)] shadow-amber-500/20',
    outline:
      'border-2 border-[var(--color-purple-500)] text-[var(--color-purple-700)] hover:bg-[var(--color-purple-50)]',
    ghost:
      'text-[var(--color-purple-700)] hover:bg-[var(--color-purple-100)] shadow-none',
    magic:
      'bg-gradient-to-r from-[var(--color-pink-500)] via-[var(--color-purple-500)] to-[var(--color-amber-400)] text-white hover:opacity-95 shadow-purple-500/30 animate-pulse-subtle',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-1.5 text-xs gap-1.5 min-h-[36px]',
    md: 'px-6 py-2.5 text-sm gap-2 min-h-[44px]',
    lg: 'px-8 py-3.5 text-base gap-2.5 min-h-[52px]',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
