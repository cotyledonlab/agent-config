#!/usr/bin/env node
/**
 * Example: Generate an RTS soldier unit sprite
 * Demonstrates the matrix-to-SVG technique
 */

const fs = require('fs');

// Define palette
const palette = {
  '.': 'transparent',
  '#': '#1a1a2e',  // outline
  'G': '#3d7a3d',  // green (uniform)
  'g': '#1e3d1a',  // dark green
  'L': '#7cb342',  // light green
  'S': '#b37a5c',  // skin
  's': '#8b5a3d',  // skin shadow
  'B': '#3d2817',  // brown (boots)
  'b': '#5c3a21',  // light brown
  'M': '#4a4a5c',  // metal
  'm': '#2d2d44',  // dark metal
  'P': '#2d2d44',  // pants
  'p': '#1a1a2e',  // pants shadow
};

// 32x32 soldier sprite matrix (simplified)
const soldier = [
  '................................',
  '................................',
  '................................',
  '...........gggggggggg...........',
  '...........gGGGGGGGGL...........',
  '...........gGGGGGGGGL...........',
  '...........gGGGGGGGGL...........',
  '...........gGGGGGGGGL...........',
  '............sSSSSSSS............',
  '............sSSSSSSS............',
  '............sS##S##S............',
  '............sSSSSSSS............',
  '............sSSssSS.............',
  '.......gGGG.gGGGGGGGGGG.mMM.....',
  '.......gGGG.gGGGGGGGGGG.mMM.....',
  '.......gGGG.gGGGGGGGGGG.mMM.....',
  '.......gGGG.gGGGGGGGGGG.mMM.....',
  '.......gGGG.gGGGGGGGGGG.mMM.....',
  '.......gGGG.gGGGGGGGGGG.mMM.....',
  '..........bbbbbbbbbbbb..mMM.....',
  '.......SSS..PPPPPPPPPP..mMM.....',
  '............pPP....pPP..mMM.....',
  '............pPP....pPP..........',
  '............pPP....pPP..........',
  '............pPP....pPP..........',
  '............pPP....pPP..........',
  '...........bBBB...bBBB..........',
  '...........bBBB...bBBB..........',
  '...........BBBB...BBBB..........',
  '................................',
  '................................',
  '................................',
];

function matrixToSVG(matrix, palette, size) {
  let pixels = '';
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      const color = palette[char];
      if (color && color !== 'transparent') {
        pixels += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" style="image-rendering:pixelated;shape-rendering:crispEdges">${pixels}</svg>`;
}

const svg = matrixToSVG(soldier, palette, 32);
const outPath = process.argv[2] || 'soldier-example.svg';
fs.writeFileSync(outPath, svg);
console.log(`Saved: ${outPath}`);
