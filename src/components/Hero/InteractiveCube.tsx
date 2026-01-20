import React, { useState, useEffect } from 'react';
import { CubeFace } from './CubeFace';
import { useCursorPosition, useReducedMotion } from '../../hooks';
import { calculateRotation, getFaceNumber } from '../../utils/cubeTransforms';
import { updateFavicon, preloadFaviconImages } from '../../utils/faviconUpdater';
import styles from './InteractiveCube.module.css';

// Import placeholder images
import cubeFace1 from '../../assets/images/cube-face-1.svg';
import cubeFace2 from '../../assets/images/cube-face-2.svg';
import cubeFace3 from '../../assets/images/cube-face-3.svg';
import cubeFace4 from '../../assets/images/cube-face-4.svg';
import cubeFace5 from '../../assets/images/cube-face-5.svg';
import cubeFace6 from '../../assets/images/cube-face-6.svg';

const CUBE_IMAGES = [cubeFace1, cubeFace2, cubeFace3, cubeFace4, cubeFace5, cubeFace6];

export interface InteractiveCubeProps {
  size?: number;
}

export const InteractiveCube: React.FC<InteractiveCubeProps> = ({ size = 300 }) => {
  const [rotation, setRotation] = useState({ x: -15, y: 15 }); // Initial tilt
  const cursorPosition = useCursorPosition();
  const prefersReducedMotion = useReducedMotion();

  // Preload images for favicon on mount
  useEffect(() => {
    preloadFaviconImages(CUBE_IMAGES);
  }, []);

  // Handle cursor-responsive rotation or gentle auto-rotation
  useEffect(() => {
    if (prefersReducedMotion) {
      // Gentle auto-rotation for reduced motion preference
      const interval = setInterval(() => {
        setRotation(prev => ({
          x: prev.x,
          y: (prev.y + 0.3) % 360,
        }));
      }, 50); // ~20fps for smooth but gentle rotation

      return () => clearInterval(interval);
    } else {
      // Cursor-responsive rotation
      const newRotation = calculateRotation(cursorPosition, 20);
      setRotation(newRotation);
    }
  }, [cursorPosition, prefersReducedMotion]);

  // Update favicon when primary face changes
  useEffect(() => {
    const faceNumber = getFaceNumber(rotation);
    const imageUrl = CUBE_IMAGES[faceNumber - 1];
    updateFavicon(faceNumber, imageUrl);
  }, [rotation]);

  const transitionDuration = prefersReducedMotion ? '0.05s' : '0.3s';

  return (
    <div className={styles.cubeContainer}>
      <div
        className={styles.cube}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: `transform ${transitionDuration} ease-out`,
        }}
      >
        <CubeFace position="front" size={size} imageUrl={CUBE_IMAGES[0]} />
        <CubeFace position="right" size={size} imageUrl={CUBE_IMAGES[1]} />
        <CubeFace position="back" size={size} imageUrl={CUBE_IMAGES[2]} />
        <CubeFace position="left" size={size} imageUrl={CUBE_IMAGES[3]} />
        <CubeFace position="top" size={size} imageUrl={CUBE_IMAGES[4]} />
        <CubeFace position="bottom" size={size} imageUrl={CUBE_IMAGES[5]} />
      </div>
    </div>
  );
};
