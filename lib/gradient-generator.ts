/**
 * Utility functions for generating abstract gradient swirl background images
 * 
 * This creates deterministic, unique gradient swirls based on a seed (like deck slug).
 * The same seed will always produce the same gradient pattern, ensuring consistency.
 */

/**
 * Generates a deterministic color palette based on a seed string
 * Uses a simple hash function to convert the seed into color values
 */
function generateColorPalette(seed: string): string[] {
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get consistent color ranges
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 60) % 360; // Complementary color
  const hue3 = (hue1 + 120) % 360; // Triadic color
  
  // Generate colors with good saturation and lightness for gradients
  const colors = [
    `hsl(${hue1}, 70%, 50%)`, // Primary color
    `hsl(${hue2}, 65%, 55%)`, // Secondary color
    `hsl(${hue3}, 75%, 45%)`, // Accent color
    `hsl(${(hue1 + 180) % 360}, 60%, 60%)`, // Complementary accent
  ];
  
  return colors;
}

/**
 * Generates control points for swirl paths based on seed
 * Creates smooth, organic-looking curves
 */
function generateSwirlPoints(seed: string, width: number, height: number): number[][] {
  // Create hash from seed for deterministic randomness
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  
  const points: number[][] = [];
  const numPoints = 8; // Number of control points for the swirl
  
  for (let i = 0; i < numPoints; i++) {
    // Use hash + index to create deterministic but varied points
    const angle = (hash + i * 45) % 360;
    const radius = (width * 0.3) + ((hash + i * 100) % (width * 0.2));
    const x = width / 2 + Math.cos(angle * Math.PI / 180) * radius;
    const y = height / 2 + Math.sin(angle * Math.PI / 180) * radius;
    points.push([x, y]);
  }
  
  return points;
}

/**
 * Generates an SVG path string for a smooth swirl curve
 */
function generateSwirlPath(points: number[][]): string {
  if (points.length < 2) return '';
  
  let path = `M ${points[0][0]} ${points[0][1]}`;
  
  // Use quadratic bezier curves for smooth transitions
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    const prevPoint = points[i - 1];
    const controlX = (prevPoint[0] + x) / 2;
    const controlY = (prevPoint[1] + y) / 2;
    
    if (i === 1) {
      path += ` Q ${controlX} ${controlY}, ${x} ${y}`;
    } else {
      path += ` T ${x} ${y}`;
    }
  }
  
  return path;
}

/**
 * Generates an abstract gradient swirl SVG image as a data URL
 * 
 * @param seed - A unique identifier (like deck slug) to generate consistent gradients
 * @param width - Width of the image in pixels (default: 1920 for 16:9 aspect ratio)
 * @param height - Height of the image in pixels (default: 1080 for 16:9 aspect ratio)
 * @returns Data URL string that can be used as an image src
 * 
 * Example usage:
 * const bgImage = generateGradientSwirl('my-deck-slug');
 * // Use in img src or CSS background-image
 */
export function generateGradientSwirl(
  seed: string,
  width: number = 1920,
  height: number = 1080
): string {
  // Generate color palette based on seed
  const colors = generateColorPalette(seed);
  
  // Generate swirl control points
  const swirlPoints = generateSwirlPoints(seed, width, height);
  let swirlPath = generateSwirlPath(swirlPoints);
  
  // Ensure we have a valid path
  if (!swirlPath || swirlPath.length === 0) {
    // Fallback to a simple circle path if path generation fails
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;
    swirlPath = `M ${centerX} ${centerY} m -${radius},0 a ${radius},${radius} 0 1,0 ${radius * 2},0 a ${radius},${radius} 0 1,0 -${radius * 2},0`;
  }
  
  // Escape colors for use in SVG (HSL colors should be fine, but ensure they're properly quoted)
  const escapeColor = (color: string) => color; // HSL colors are already properly formatted
  
  // Create multiple gradient layers for depth
  const gradients = colors.map((color, index) => {
    const offset = index * (100 / colors.length);
    const escapedColor = escapeColor(color);
    return `<stop offset="${offset}%" stop-color="${escapedColor}" stop-opacity="${0.6 + index * 0.1}" />`;
  }).join('');
  
  // Create SVG with multiple swirl layers and radial gradients
  // Using compact format without newlines for better data URL compatibility
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="baseGradient" cx="50%" cy="50%" r="70%">${gradients}</radialGradient><linearGradient id="swirlGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.8" /><stop offset="50%" stop-color="${colors[1]}" stop-opacity="0.6" /><stop offset="100%" stop-color="${colors[2]}" stop-opacity="0.7" /></linearGradient><filter id="blur"><feGaussianBlur in="SourceGraphic" stdDeviation="20" /></filter></defs><rect width="100%" height="100%" fill="url(#baseGradient)" /><path d="${swirlPath}" stroke="url(#swirlGradient)" stroke-width="${width * 0.15}" fill="none" opacity="0.4" filter="url(#blur)" /><path d="${swirlPath}" stroke="${colors[3]}" stroke-width="${width * 0.08}" fill="none" opacity="0.3" transform="rotate(180 ${width/2} ${height/2})" /><rect width="100%" height="100%" fill="url(#swirlGradient)" opacity="0.2" /></svg>`;
  
  // Convert SVG to data URL - properly encode for use in CSS url()
  // encodeURIComponent handles all special characters correctly
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Helper function to get background image for a deck
 * Automatically generates one if not provided
 * 
 * @param deckSlug - The slug of the deck
 * @param customImageUrl - Optional custom image URL to override auto-generation
 * @returns Data URL string for the background image
 */
export function getDeckBackgroundImage(
  deckSlug: string,
  customImageUrl?: string
): string {
  // If custom image is provided, use it
  if (customImageUrl) {
    return customImageUrl;
  }
  
  // Otherwise, generate one based on the deck slug
  return generateGradientSwirl(deckSlug);
}

