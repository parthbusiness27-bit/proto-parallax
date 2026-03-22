import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../src/content/blog');
const assetsDir = path.join(__dirname, '../src/assets/blog');

function createSVG(title, subtitle) {
  const colors = [
    ['#4F46E5', '#10B981'],
    ['#EC4899', '#8B5CF6'],
    ['#F59E0B', '#EF4444'],
    ['#3B82F6', '#2DD4BF']
  ];
  const [c1, c2] = colors[Math.floor(Math.random() * colors.length)];

  return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#grad)" rx="24"/>
  <rect width="1120" height="550" x="40" y="40" fill="#ffffff" fill-opacity="0.1" rx="16" filter="url(#shadow)"/>
  
  <rect width="80" height="8" x="560" y="200" fill="#ffffff" fill-opacity="0.5" rx="4"/>
  
  <text x="600" y="320" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${title.replace(/[^a-zA-Z0-9 ]/g, '')}</text>
  <text x="600" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="32" font-weight="500" fill="#ffffff" fill-opacity="0.9" text-anchor="middle" dominant-baseline="middle">${subtitle}</text>
  
  <g transform="translate(550, 480)" fill="#ffffff">
    <circle cx="0" cy="0" r="8" fill-opacity="0.5"/>
    <circle cx="50" cy="0" r="12" fill-opacity="0.8"/>
    <circle cx="100" cy="0" r="8" fill-opacity="0.5"/>
  </g>
</svg>
`.trim();
}

const filesToProcess = [
  'freelancing-video-editing.mdx',
  'freelancing-logo-design.mdx',
  'freelancing-content-writing.mdx',
  'freelancing-guide-earn-money.mdx'
];

filesToProcess.forEach(file => {
  const fullPath = path.join(contentDir, file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Find all image tags like ![alt text](../../assets/blog/old-image.png)
  const imgRegex = /!\[(.*?)\]\(\.\.\/\.\.\/assets\/blog\/(.*?)\)/g;
  
  let match;
  let newContent = content;
  let updated = false;

  while ((match = imgRegex.exec(content)) !== null) {
    const altText = match[1];
    const oldFileName = match[2];
    
    // Ignore if it's already an SVG or one of our newly generated images
    if (oldFileName.endsWith('.svg') || oldFileName.includes('_177')) continue;

    const baseName = file.replace('.mdx', '');
    const cleanAlt = altText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newFileName = `${baseName}-${cleanAlt}.svg`;
    
    // Generate the SVG
    const svgContent = createSVG(altText.toUpperCase(), `Visual Data & Strategy for ${baseName.split('-').slice(1).join(' ').toUpperCase()}`);
    fs.writeFileSync(path.join(assetsDir, newFileName), svgContent);
    
    // Replace in markdown
    newContent = newContent.replace(`../../assets/blog/${oldFileName}`, `../../assets/blog/${newFileName}`);
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log(`Updated images for ${file}`);
  }
});

console.log('Finished generating SVG infographics.');
