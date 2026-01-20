import { CursorPosition } from '../hooks';

export interface Rotation {
  x: number; // degrees
  y: number; // degrees
}

export interface FaceVisibility {
  front: boolean;
  right: boolean;
  back: boolean;
  left: boolean;
  top: boolean;
  bottom: boolean;
}

/**
 * Calculate rotation angles from normalized cursor position
 * @param cursor - Normalized cursor position (-1 to 1 for both x and y)
 * @param sensitivity - How much the cube rotates (degrees per unit)
 * @returns Rotation angles in degrees
 */
export const calculateRotation = (
  cursor: CursorPosition,
  sensitivity: number = 20
): Rotation => {
  return {
    x: cursor.y * sensitivity,  // vertical cursor movement → rotateX
    y: cursor.x * sensitivity,  // horizontal cursor movement → rotateY
  };
};

/**
 * Determine which face of the cube is most visible based on rotation
 * @param rotation - Current rotation angles
 * @returns Object indicating visibility of each face
 */
export const getFaceVisibility = (rotation: Rotation): FaceVisibility => {
  const { x, y } = rotation;

  // Normalize angles to 0-360 range
  const normalizedY = ((y % 360) + 360) % 360;
  const normalizedX = ((x % 360) + 360) % 360;

  // Determine which faces are visible
  // For Y-axis rotation (horizontal):
  const front = normalizedY < 45 || normalizedY > 315;
  const right = normalizedY >= 45 && normalizedY < 135;
  const back = normalizedY >= 135 && normalizedY < 225;
  const left = normalizedY >= 225 && normalizedY < 315;

  // For X-axis rotation (vertical):
  const top = normalizedX > 315 || normalizedX < 45;
  const bottom = normalizedX >= 135 && normalizedX < 225;

  return { front, right, back, left, top, bottom };
};

/**
 * Get the primary (most visible) face of the cube
 * @param visibility - Face visibility object
 * @returns Name of the primary face
 */
export const getPrimaryFace = (visibility: FaceVisibility): string => {
  // Priority order: front, right, back, left, top, bottom
  const entries = Object.entries(visibility);
  const visibleFace = entries.find(([_, isVisible]) => isVisible);
  return visibleFace ? visibleFace[0] : 'front';
};

/**
 * Get the face number (1-6) from rotation
 * @param rotation - Current rotation angles
 * @returns Face number (1=front, 2=right, 3=back, 4=left, 5=top, 6=bottom)
 */
export const getFaceNumber = (rotation: Rotation): number => {
  const visibility = getFaceVisibility(rotation);
  const primaryFace = getPrimaryFace(visibility);

  const faceMap: Record<string, number> = {
    front: 1,
    right: 2,
    back: 3,
    left: 4,
    top: 5,
    bottom: 6,
  };

  return faceMap[primaryFace] || 1;
};

/**
 * Calculate transform for a cube face
 * @param face - Face position (front, right, back, left, top, bottom)
 * @param size - Size of the cube in pixels
 * @returns CSS transform string
 */
export const getFaceTransform = (face: string, size: number): string => {
  const half = size / 2;

  const transforms: Record<string, string> = {
    front: `rotateY(0deg) translateZ(${half}px)`,
    right: `rotateY(90deg) translateZ(${half}px)`,
    back: `rotateY(180deg) translateZ(${half}px)`,
    left: `rotateY(-90deg) translateZ(${half}px)`,
    top: `rotateX(90deg) translateZ(${half}px)`,
    bottom: `rotateX(-90deg) translateZ(${half}px)`,
  };

  return transforms[face] || transforms.front;
};
