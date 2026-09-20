#!/usr/bin/env node
/**
 * Sprite Sheet Generator
 * Combines individual frame images into a sprite sheet
 * 
 * Usage: node make-spritesheet.js <input-dir> <output-file> <frame-width> <frame-height> [frames-per-row]
 * 
 * Example: node make-spritesheet.js ./frames/ sheet.png 32 32 4
 */

const fs = require('fs');
const path = require('path');

// Check for sharp, provide helpful message if missing
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
  
  if (args.length < 4) {
    console.log('Usage: make-spritesheet.js <input-dir> <output-file> <frame-width> <frame-height> [frames-per-row]');
    console.log('');
    console.log('Arguments:');
    console.log('  input-dir      Directory containing frame images (PNG or SVG)');
    console.log('  output-file    Output sprite sheet path');
    console.log('  frame-width    Width of each frame in pixels');
    console.log('  frame-height   Height of each frame in pixels');
    console.log('  frames-per-row Optional: frames per row (default: all in one row)');
    console.log('');
    console.log('Example:');
    console.log('  node make-spritesheet.js ./walk-frames/ walk-sheet.png 32 32 4');
    process.exit(1);
  }

  const inputDir = args[0];
  const outputFile = args[1];
  const frameWidth = parseInt(args[2], 10);
  const frameHeight = parseInt(args[3], 10);
  
  // Get all image files sorted
  const files = fs.readdirSync(inputDir)
    .filter(f => /\.(png|svg|jpg|jpeg)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.error('No image files found in', inputDir);
    process.exit(1);
  }

  const framesPerRow = args[4] ? parseInt(args[4], 10) : files.length;
  const rows = Math.ceil(files.length / framesPerRow);
  const sheetWidth = framesPerRow * frameWidth;
  const sheetHeight = rows * frameHeight;

  console.log(`Creating sprite sheet: ${sheetWidth}x${sheetHeight}`);
  console.log(`  Frames: ${files.length}`);
  console.log(`  Frame size: ${frameWidth}x${frameHeight}`);
  console.log(`  Layout: ${framesPerRow} per row, ${rows} rows`);

  // Create composite operations
  const composites = [];
  
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(inputDir, files[i]);
    const col = i % framesPerRow;
    const row = Math.floor(i / framesPerRow);
    
    // Resize frame to exact dimensions
    const frameBuffer = await sharp(filePath)
      .resize(frameWidth, frameHeight, { fit: 'fill' })
      .toBuffer();

    composites.push({
      input: frameBuffer,
      left: col * frameWidth,
      top: row * frameHeight,
    });
  }

  // Create sprite sheet
  await sharp({
    create: {
      width: sheetWidth,
      height: sheetHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite(composites)
  .png()
  .toFile(outputFile);

  console.log(`Sprite sheet saved to: ${outputFile}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
