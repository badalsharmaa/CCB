import React from 'react';

interface MarqueeProps {
  items: React.ReactNode[];
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: string;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = 'left',
  duration = '20s',
  pauseOnHover = true,
  className = '',
  itemClassName = '',
  orientation = 'horizontal',
}) => {
  const isVertical = orientation === 'vertical';

  let animationClass = '';
  if (direction === 'left') animationClass = 'animate-marquee-left';
  if (direction === 'right') animationClass = 'animate-marquee-right';
  if (direction === 'up') animationClass = 'animate-marquee-up';
  if (direction === 'down') animationClass = 'animate-marquee-down';

  return (
    <div
      className={`flex overflow-hidden ${isVertical ? 'flex-col h-full' : 'w-full'} ${pauseOnHover ? 'pause-on-hover' : ''} ${className}`}
      style={{ '--duration': duration } as React.CSSProperties}
    >
      <div className={`flex ${isVertical ? 'flex-col h-max min-h-full' : 'w-max min-w-full'} shrink-0 ${animationClass}`}>
        {items.map((item, i) => (
          <div key={i} className={`shrink-0 ${itemClassName}`}>
            {item}
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <div key={`dup-${i}`} className={`shrink-0 ${itemClassName}`} aria-hidden="true">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
