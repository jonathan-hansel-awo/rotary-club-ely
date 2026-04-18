import sharp from 'sharp'
import { readFileSync } from 'fs'

// Apple touch icon — 180x180 from the logo PNG
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
  .toFile('./public/og-default_2.png')

console.log('✓ og-default_2.png generated')