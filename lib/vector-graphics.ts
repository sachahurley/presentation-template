/**
 * Utility functions for generating minimal vector line graphics
 * Creates simple, clean SVG patterns for presentation backgrounds
 */

/**
 * Generates a simple geometric grid pattern as SVG data URL
 * Perfect for minimal, clean backgrounds
 */
export function generateGridPattern(
  width: number = 1920,
  height: number = 1080,
  gridSize: number = 60,
  strokeColor: string = "currentColor",
  opacity: number = 0.1
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="${gridSize}" height="${gridSize}" patternUnits="userSpaceOnUse">
          <path d="M ${gridSize} 0 L 0 0 0 ${gridSize}" fill="none" stroke="${strokeColor}" stroke-width="1" opacity="${opacity}"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  `.trim();

  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Generates a simple abstract geometric composition
 * Creates minimal line art with circles and lines
 * Theme-aware: uses darker colors for light mode, lighter for dark mode
 */
export function generateAbstractPattern(
  width: number = 1920,
  height: number = 1080,
  isDark: boolean = false,
  opacity: number = 0.28
): string {
  // Theme-aware colors: darker for light mode, lighter for dark mode
  const strokeColor = isDark ? "#E0E0E0" : "#333333"; // Light gray for dark mode, dark gray for light mode
  
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.3;
  
  // Create SVG with proper formatting (no extra whitespace)
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><g stroke="${strokeColor}" stroke-width="2" fill="none" opacity="${opacity}"><circle cx="${centerX}" cy="${centerY}" r="${radius}"/><line x1="${centerX - radius}" y1="${centerY}" x2="${centerX + radius}" y2="${centerY}"/><line x1="${centerX}" y1="${centerY - radius}" x2="${centerX}" y2="${centerY + radius}"/><circle cx="${centerX - radius * 0.7}" cy="${centerY}" r="${radius * 0.1}"/><circle cx="${centerX + radius * 0.7}" cy="${centerY}" r="${radius * 0.1}"/><circle cx="${centerX}" cy="${centerY - radius * 0.7}" r="${radius * 0.1}"/><circle cx="${centerX}" cy="${centerY + radius * 0.7}" r="${radius * 0.1}"/></g></svg>`;

  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Generates a minimal line art pattern with flowing curves
 * Creates subtle, organic shapes perfect for design presentations
 */
export function generateFlowPattern(
  width: number = 1920,
  height: number = 1080,
  strokeColor: string = "currentColor",
  opacity: number = 0.12
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <g stroke="${strokeColor}" stroke-width="1.5" fill="none" opacity="${opacity}">
        <!-- Flowing curves -->
        <path d="M ${width * 0.1} ${height * 0.3} Q ${width * 0.3} ${height * 0.2}, ${width * 0.5} ${height * 0.3} T ${width * 0.9} ${height * 0.3}" />
        <path d="M ${width * 0.1} ${height * 0.7} Q ${width * 0.3} ${height * 0.8}, ${width * 0.5} ${height * 0.7} T ${width * 0.9} ${height * 0.7}" />
        <!-- Connecting vertical lines -->
        <line x1="${width * 0.2}" y1="${height * 0.2}" x2="${width * 0.2}" y2="${height * 0.8}" />
        <line x1="${width * 0.5}" y1="${height * 0.2}" x2="${width * 0.5}" y2="${height * 0.8}" />
        <line x1="${width * 0.8}" y1="${height * 0.2}" x2="${width * 0.8}" y2="${height * 0.8}" />
      </g>
    </svg>
  `.trim();

  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Gets a vector background pattern for a deck
 * Returns a simple, minimal pattern suitable for title slides
 * Note: For theme-aware backgrounds, use generateAbstractPattern directly with theme detection
 */
export function getVectorBackground(deckSlug: string, isDark: boolean = false): string {
  // Use abstract pattern for AI/design presentations
  // This creates a visible, professional background
  return generateAbstractPattern(1920, 1080, isDark, 0.28);
}

