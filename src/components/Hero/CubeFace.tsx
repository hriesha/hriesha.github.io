import React from 'react';
import { getFaceTransform } from '../../utils';
import styles from './CubeFace.module.css';

export interface CubeFaceProps {
  position: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
  size: number;
  imageUrl: string;
}

export const CubeFace: React.FC<CubeFaceProps> = ({ position, size, imageUrl }) => {
  const transform = getFaceTransform(position, size);

  return (
    <div
      className={`${styles.cubeFace} ${styles[`cubeFace--${position}`]}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform,
      }}
    >
      <img
        src={imageUrl}
        alt={`Cube face - ${position}`}
        className={styles.faceImage}
        loading="lazy"
        draggable="false"
      />
    </div>
  );
};
