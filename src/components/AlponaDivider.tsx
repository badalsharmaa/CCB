import { motion } from 'motion/react';

interface AlponaDividerProps {
  color?: string;
  height?: string;
  className?: string;
}

export function AlponaDivider({ 
  color = 'currentColor', 
  height = 'h-12', 
  className = '' 
}: AlponaDividerProps) {
  // Map Tailwind height classes to negative margins to keep it centered between sections
  const marginMap: Record<string, string> = {
    'h-12': '-my-6',
    'h-16': '-my-8',
    'h-20': '-my-10',
    'h-24': '-my-12',
  };

  const marginClass = marginMap[height] || '-my-6';

  return (
    <div className={`w-full ${height} relative z-30 overflow-hidden pointer-events-none ${marginClass} ${className}`}>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full h-full"
        style={{
          backgroundColor: color,
          maskImage: 'url("/assets/alpona/linear_border.png")',
          WebkitMaskImage: 'url("/assets/alpona/linear_border.png")',
          maskRepeat: 'repeat-x',
          WebkitMaskRepeat: 'repeat-x',
          maskSize: 'auto 100%',
          WebkitMaskSize: 'auto 100%',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />
    </div>
  );
}
