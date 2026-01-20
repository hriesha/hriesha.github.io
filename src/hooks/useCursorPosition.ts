import { useState, useEffect } from 'react';

export interface CursorPosition {
  x: number; // normalized -1 to 1
  y: number; // normalized -1 to 1
}

/**
 * Custom hook to track cursor position normalized to -1 to 1 range
 * Uses RAF (requestAnimationFrame) throttling for performance
 */
export const useCursorPosition = (): CursorPosition => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor position to -1 to 1 range
      // Center of screen = (0, 0)
      // Top-left = (-1, -1), Bottom-right = (1, 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      setPosition({ x, y });
    };

    // Throttle updates using requestAnimationFrame for smooth performance
    const throttledHandler = (e: MouseEvent) => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        handleMouseMove(e);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', throttledHandler);

    return () => {
      window.removeEventListener('mousemove', throttledHandler);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return position;
};
