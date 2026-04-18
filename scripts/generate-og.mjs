import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'

// Apple touch icon — 180x180
await sharp('./public/rotary-logo.png')
  .resize(180, 180)
  .png()
  .toFile('./public/apple-touch-icon.png')
console.log('✓ apple-touch-icon.png generated')

// OG default image — from SVG
const svg = readFileSync('./public/og-default.svg')
await sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile('./public/og-default.png')
console.log('✓ og-default.png generated')

// Favicon sizes as PNGs
await sharp('./public/rotary-logo.png').resize(16, 16).png().toFile('./public/favicon-16.png')
await sharp('./public/rotary-logo.png').resize(32, 32).png().toFile('./public/favicon-32.png')
await sharp('./public/rotary-logo.png').resize(48, 48).png().toFile('./public/favicon-48.png')
console.log('✓ favicon PNGs generated')