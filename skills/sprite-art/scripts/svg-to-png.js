#!/usr/bin/env node
/**
 * SVG to PNG Converter
 * Converts SVG pixel art to PNG with optional scaling
 * 
 * Usage: node svg-to-png.js <input.svg> <output.png> [scale]
 * 
 * Example: node svg-to-png.js sprite.svg sprite.png 4
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: sharp module not found.');
  console.error('Install with: npm install sharp');
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: svg-to-png.js <input.svg> <output.png> [scale]');
    console.log('');
    console.log('Arguments:');
    console.log('  input.svg   Input SVG file');
    console.log('  output.png  Output PNG file');
    console.log('  scale       Optional: integer scale factor (default: 1)');
    console.log('');
    console.log('Example:');
    console.log('  node svg-to-png.js sprite.svg sprite.png 4');
    console.log('  # Converts 32x32 SVG to 128x128 PNG');
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1];
  const scale = args[2] ? parseInt(args[2], 10) : 1;

  if (!fs.existsSync(inputFile)) {
    console.error('Input file not found:', inputFile);
    process.exit(1);
  }

  // Read SVG and extract dimensions from viewBox
  const svgContent = fs.readFileSync(inputFile, 'utf8');
  const viewBoxMatch = svgContent.match(/viewBox="0 0 (\d+) (\d+)"/);
  
  let width, height;
  if (viewBoxMatch) {
    width = parseInt(viewBoxMatch[1], 10) * scale;
    height = parseInt(viewBoxMatch[2], 10) * scale;
  } else {
    // Fallback: try to get from width/height attributes
    const widthMatch = svgContent.match(/width="(\d+)"/);
    const heightMatch = svgContent.match(/height="(\d+)"/);
    width = widthMatch ? parseInt(widthMatch[1], 10) * scale : 32 * scale;
    height = heightMatch ? parseInt(heightMatch[1], 10) * scale : 32 * scale;
  }

  console.log(`Converting: ${inputFile} → ${outputFile}`);
  console.log(`  Output size: ${width}x${height} (${scale}x scale)`);

  await sharp(inputFile, { density: 72 * scale })
    .resize(width, height, { 
      kernel: sharp.kernel.nearest  // Preserve pixel art crispness
    })
    .png()
    .toFile(outputFile);

  console.log('Done!');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
