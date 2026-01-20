let currentFaceNumber: number | null = null;
let updateTimeout: number | null = null;

/**
 * Update the browser favicon to show a mini version of the current cube face
 * @param faceNumber - Number of the cube face (1-6)
 * @param imageUrl - URL of the image to display
 */
export const updateFavicon = (faceNumber: number, imageUrl: string): void => {
  // Skip if same face and debounce rapid updates
  if (currentFaceNumber === faceNumber) return;

  // Clear any pending updates
  if (updateTimeout !== null) {
    clearTimeout(updateTimeout);
  }

  // Debounce favicon updates to avoid excessive redraws
  updateTimeout = window.setTimeout(() => {
    currentFaceNumber = faceNumber;

    // Create canvas to generate favicon
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Load and draw the image
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS if needed

    img.onload = () => {
      // Draw image to canvas
      ctx.drawImage(img, 0, 0, 32, 32);

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Update or create favicon link element
      let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");

      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        document.head.appendChild(link);
      }

      link.href = dataUrl;
    };

    img.onerror = () => {
      console.warn(`Failed to load favicon image: ${imageUrl}`);
    };

    img.src = imageUrl;
  }, 500); // 500ms debounce
};

/**
 * Reset the favicon to default
 */
export const resetFavicon = (): void => {
  currentFaceNumber = null;

  if (updateTimeout !== null) {
    clearTimeout(updateTimeout);
    updateTimeout = null;
  }

  const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (link) {
    link.href = '/vite.svg'; // Default Vite favicon
  }
};

/**
 * Preload all cube face images for smoother favicon transitions
 * @param imageUrls - Array of image URLs to preload
 */
export const preloadFaviconImages = (imageUrls: string[]): void => {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};
