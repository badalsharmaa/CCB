import React from 'react';

// Dividers 1-8 extracted from the ornamental divider sheet
// Usage: pick a divider number (1-8), each has a slightly different style

interface Props {
  divider?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** invert: makes the dark divider show on dark backgrounds */
  invert?: boolean;
}

const sizeMap = { sm: 'h-6', md: 'h-8', lg: 'h-10' };

export function Divider({ divider = 2, className = '', size = 'md', invert = false }: Props) {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <img
        src={`/assets/dividers/divider-${divider}.png`}
        alt=""
        aria-hidden="true"
        className={`${sizeMap[size]} w-auto object-contain opacity-70 ${invert ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}

/** Flanks a heading — places divider-left and divider-right on same line as children */
export function HeadingWithDividers({
  children,
  divider = 2,
  className = '',
  invert = false,
}: {
  children: React.ReactNode;
  divider?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <img
        src={`/assets/dividers/divider-${divider}.png`}
        alt=""
        aria-hidden="true"
        className={`h-7 w-auto object-contain opacity-60 flex-shrink-0 hidden sm:block ${invert ? 'brightness-0 invert' : ''}`}
        style={{ transform: 'scaleX(-1)' }}
      />
      <span className="flex-shrink-0">{children}</span>
      <img
        src={`/assets/dividers/divider-${divider}.png`}
        alt=""
        aria-hidden="true"
        className={`h-7 w-auto object-contain opacity-60 flex-shrink-0 hidden sm:block ${invert ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}

/** Old capsule ornament — kept for backward compat */
export function SectionOrnamentDivider({ className = '' }: { className?: string }) {
  return <Divider divider={1} size="lg" className={`py-6 ${className}`} />;
}

/** @deprecated use Divider instead */
export function HeadingOrnament({ className = '' }: { className?: string }) {
  return null;
}
