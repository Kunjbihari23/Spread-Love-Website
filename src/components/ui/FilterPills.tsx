import React from 'react';

export interface FilterOption<T extends string | number> {
  id: T;
  label: string;
  count?: number;
}

export interface FilterPillsProps<T extends string | number> {
  options: FilterOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
}

export function FilterPills<T extends string | number>({
  options,
  activeId,
  onChange,
  className = '',
}: FilterPillsProps<T>) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1.5 bg-purple-50/80 border border-purple-100/80 rounded-full shadow-inner overflow-x-auto max-w-full ${className}`}
      role="tablist"
    >
      {options.map((opt) => {
        const isActive = opt.id === activeId;
        return (
          <button
            key={String(opt.id)}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.id)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer select-none ${
              isActive
                ? 'bg-gradient-to-r from-[var(--color-pink-500)] to-[var(--color-rose-500)] text-white shadow-md shadow-pink-500/20 scale-[1.02]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            }`}
          >
            {opt.label}
            {typeof opt.count === 'number' && (
              <span
                className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
