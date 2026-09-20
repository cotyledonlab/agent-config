---
name: sprite-art
description: AI skill for sprite-art
---

# Sprite Art Generation Skill

A skill for programmatically generating 2D pixel art sprites, sprite sheets, and game tiles.

## Overview

This skill enables Claude to generate pixel art assets using:
- **SVG with pixel-perfect rectangles** - Scalable, editable, converts to PNG
- **Node.js Canvas** - Direct bitmap generation for complex effects
- **Palette-consistent coloring** - Professional game-ready results

## Core Techniques

### 1. SVG Pixel Art Generation

SVG is ideal for pixel art because each pixel is a discrete rectangle:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" 
     style="image-rendering: pixelated">
  <rect x="15" y="10" width="1" height="1" fill="#5c3a21"/>
  <!-- Each pixel is a 1x1 rect at integer coordinates -->
</svg>
```

**Key SVG attributes:**
- `viewBox="0 0 W H"` - Defines pixel grid (e.g., 32x32)
- `width/height` - Output size (multiply for scaling)
- `image-rendering: pixelated` - Prevents anti-aliasing
- `shape-rendering: crispEdges` - Sharp pixel boundaries

### 2. Pixel Matrix Approach

Define sprites as 2D arrays for easy editing:

```javascript
const sprite = [
  "..####..",
  ".#1111#.",
  "#111111#",
  "#1#11#1#",  // 1 = skin, # = outline, . = transparent
  "#111111#",
  ".#1111#.",
  "..#11#..",
  "..#..#..",
];

const palette = {
  '.': 'transparent',
  '#': '#1a1a2e',
  '1': '#e8c39e',
};
```

### 3. Sprite Sheet Layout

Organize frames in horizontal strips or grids:

```
| Frame 0 | Frame 1 | Frame 2 | Frame 3 |  ← Idle animation
| Frame 0 | Frame 1 | Frame 2 | Frame 3 |  ← Walk animation
| Frame 0 | Frame 1 | Frame 2 | Frame 3 |  ← Attack animation
```

Standard layout: `width = frameWidth × framesPerRow`, `height = frameHeight × rows`

### 4. Common Sprite Sizes

| Type | Size | Use Case |
|------|------|----------|
| 8×8 | Tiny | Icons, particles |
| 16×16 | Small | Retro units, items |
| 32×32 | Medium | Standard units, tiles |
| 64×64 | Large | Buildings, bosses |
| 128×128 | XL | Portraits, large structures |

### 5. Outline Techniques

**Hard outline (1px black):**
- Draw outline pass first, then fill
- Creates classic pixel art look

**Selective outline:**
- Darker shade of adjacent color
- More modern, softer look

**No outline:**
- Rely on color contrast
- Good for terrain tiles

## Color Palettes

See `references/palettes.md` for curated game palettes.

**Palette rules:**
1. Limit to 8-16 colors per sprite
2. Use 2-3 shades per hue (base, shadow, highlight)
3. Maintain consistent saturation
4. Reserve 1 color for outlines

## Animation Principles

### Frame Counts
- Idle: 2-4 frames (subtle breathing)
- Walk: 4-8 frames (full cycle)
- Attack: 3-6 frames (wind-up, strike, recover)
- Death: 4-8 frames

### Timing
- Standard: 100-150ms per frame
- Fast action: 50-80ms per frame
- Idle: 200-300ms per frame

## Output Formats

### SVG → PNG Conversion

```bash
# Using sharp (Node.js)
node scripts/svg-to-png.js input.svg output.png 4

# Using Inkscape CLI
inkscape -w 128 -h 128 input.svg -o output.png

# Using ImageMagick
convert -density 1200 input.svg -resize 128x128 output.png
```

### Sprite Sheet Generation

```bash
node scripts/make-spritesheet.js ./frames/ output.png 32 32 4
# Args: input-dir output-file frame-width frame-height frames-per-row
```

## File Naming Conventions

```
unit_soldier_idle_00.svg
unit_soldier_idle_01.svg
unit_soldier_walk_00.svg
building_barracks_00.svg
terrain_grass_00.svg
terrain_grass_01.svg  # Variation
```

## Quick Reference

### Minimal SVG Template
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" 
     style="image-rendering:pixelated;shape-rendering:crispEdges">
  <!-- pixels here -->
</svg>
```

### Pixel Helper Function
```javascript
function pixel(x, y, color) {
  return `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
}
```

### Matrix to SVG
```javascript
function matrixToSVG(matrix, palette, size) {
  let pixels = '';
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const char = matrix[y][x];
      if (palette[char] && palette[char] !== 'transparent') {
        pixels += `<rect x="${x}" y="${y}" width="1" height="1" fill="${palette[char]}"/>`;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" 
          style="image-rendering:pixelated;shape-rendering:crispEdges">${pixels}</svg>`;
}
```

## See Also

- `references/palettes.md` - Color palette collections
- `references/conventions.md` - Sprite design conventions
- `scripts/make-spritesheet.js` - Sprite sheet generator
- `scripts/svg-to-png.js` - SVG conversion utility
- `examples/` - Sample sprites and code
