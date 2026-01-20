import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationProps {
  once?: boolean;
  margin?: string;
  delay?: number;
}

/**
 * Custom hook for scroll-triggered animations using Framer Motion
 * Returns ref and animation props ready to spread on motion components
 */
export const useScrollAnimation = ({
  once = true,
  margin = '-100px',
  delay = 0,
}: ScrollAnimationProps = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: margin as any,
  });

  return {
    ref,
    initial: { opacity: 0, y: 50 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    },
  } as const;
};
