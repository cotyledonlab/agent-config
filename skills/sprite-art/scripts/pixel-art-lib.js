/**
 * Pixel Art Generation Library
 * Helper functions for creating SVG pixel art programmatically
 */

/**
 * Standard RTS color palette
 */
const RTS_PALETTE = {
  // Core
  transparent: 'transparent',
  outline: '#1a1a2e',
  
  // Metals
  metalDark: '#2d2d44',
  metalMid: '#4a4a5c',
  metalLight: '#8b8b9e',
  highlight: '#e8e8ec',
  
  // Earth tones
  earthDark: '#3d2817',
  earthMid: '#5c3a21',
  sand: '#8b6914',
  sandLight: '#d4a857',
  
  // Greens
  forestDark: '#1e3d1a',
  grass: '#3d7a3d',
  grassLight: '#7cb342',
  
  // Blues
  waterDark: '#1a3d5c',
  waterMid: '#3d7a9e',
  waterLight: '#7cb8d4',
  
  // Accents
  danger: '#b33939',
  fire: '#d4843d',
  energy: '#e8d857',
  
  // Skin
  skinDark: '#8b5a3d',
  skinMid: '#b37a5c',
  skinLight: '#d4a878',
};

/**
 * Convert a character matrix to SVG pixel art
 * @param {string[]} matrix - Array of strings, each character is a pixel
 * @param {Object} palette - Map of character to color
 * @param {number} size - Width/height of the sprite
 * @returns {string} SVG content
 */
function matrixToSVG(matrix, palette, size) {
  let pixels = '';
  
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      const color = palette[char];
      if (color && color !== 'transparent' && color !== 'none') {
        pixels += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
      }
    }
  }
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" style="image-rendering:pixelated;shape-rendering:crispEdges">${pixels}</svg>`;
}

/**
 * Create a single pixel element
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate  
 * @param {string} color - Fill color
 * @returns {string} SVG rect element
 */
function pixel(x, y, color) {
  return `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
}

/**
 * Create a filled rectangle
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} w - Width
 * @param {number} h - Height
 * @param {string} color - Fill color
 * @returns {string} SVG rect element
 */
function rect(x, y, w, h, color) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
}

/**
 * Create an outlined rectangle (1px border)
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} w - Width
 * @param {number} h - Height
 * @param {string} fillColor - Fill color
 * @param {string} outlineColor - Outline color
 * @returns {string} SVG elements
 */
function outlinedRect(x, y, w, h, fillColor, outlineColor) {
  let svg = '';
  // Outline
  svg += rect(x, y, w, 1, outlineColor); // top
  svg += rect(x, y + h - 1, w, 1, outlineColor); // bottom
  svg += rect(x, y, 1, h, outlineColor); // left
  svg += rect(x + w - 1, y, 1, h, outlineColor); // right
  // Fill
  if (w > 2 && h > 2) {
    svg += rect(x + 1, y + 1, w - 2, h - 2, fillColor);
  }
  return svg;
}

/**
 * Wrap pixels in an SVG document
 * @param {string} content - SVG inner content
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 * @returns {string} Complete SVG document
 */
function wrapSVG(content, width, height = width) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="image-rendering:pixelated;shape-rendering:crispEdges">${content}</svg>`;
}

/**
 * Create a simple drop shadow
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} w - Width
 * @param {number} h - Height
 * @returns {string} SVG elements for shadow
 */
function dropShadow(x, y, w, h) {
  return rect(x + 1, y + h, w, 2, 'rgba(0,0,0,0.3)');
}

module.exports = {
  RTS_PALETTE,
  matrixToSVG,
  pixel,
  rect,
  outlinedRect,
  wrapSVG,
  dropShadow,
};
