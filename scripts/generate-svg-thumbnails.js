import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const assetsDir = path.join(process.cwd(), 'public', 'assets', 'blog');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// 7 professional, vibrant gradient palettes
const gradients = [
    ['#4f46e5', '#10b981'], // Indigo to Emerald (0)
    ['#ec4899', '#8b5cf6'], // Pink to Purple (1)
    ['#f59e0b', '#ef4444'], // Amber to Red (2)
    ['#3b82f6', '#2dd4bf'], // Blue to Teal (3)
    ['#8b5cf6', '#3b82f6'], // Purple to Blue (4)
    ['#10b981', '#3b82f6'], // Emerald to Blue (5)
    ['#f43f5e', '#f97316'], // Rose to Orange (6)
];

const categoryColors = {
    'freelancing': 0,
    'ecommerce': 1,
    'programming-development': 3,
    'content-creation': 1,
    'digital-marketing': 4,
    'automation-agencies': 2,
    'software-saas': 3,
    'digital-products': 4,
    'stock-content': 6,
    'ai-services': 5,
    'virtual-assistance': 0,
    'website-businesses': 1,
    'affiliate-marketing': 5,
    'online-research-testing': 4,
    'online-communities': 2,
    'gaming-streaming': 6,
    'online-trading': 3,
    'automation-tools': 5,
    'side-hustles': 6
};

function wrapText(text, maxCharsPerLine) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (const word of words) {
        if ((currentLine + word).length > maxCharsPerLine) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    }
    if (currentLine.trim()) lines.push(currentLine.trim());
    return lines;
}

function processBlogs() {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    console.log(`Found ${files.length} guides. Generating custom SVG banners...`);

    let i = 0;
    for (const file of files) {
        i++;
        const filePath = path.join(blogDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
        const categoryMatch = content.match(/category:\s*['"]([^'"]+)['"]/);
        
        if (!titleMatch) continue;

        const title = titleMatch[1];
        const category = categoryMatch ? categoryMatch[1].trim() : 'default';
        const colorIndex = categoryColors[category] !== undefined ? categoryColors[category] : Math.floor(Math.random() * gradients.length);
        const grad = gradients[colorIndex];

        const slug = file.replace(/\.mdx?$/, '');
        const imageName = `${slug}.svg`;
        const imageDest = path.join(assetsDir, imageName);

        const lines = wrapText(title, 25);
        let tspanElements = '';
        const lineHeight = 65;
        const totalHeight = lines.length * lineHeight;
        const startY = 255 - (totalHeight / 2) + (lineHeight / 2);

        lines.forEach((line, idx) => {
            tspanElements += `<tspan x="510" y="${startY + (idx * lineHeight)}">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan>`;
        });

        const svgContent = `
<svg width="1020" height="510" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${grad[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${grad[1]};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="15" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="1020" height="510" fill="url(#bgGrad)" />
  
  <!-- Subtle Grid Pattern Background -->
  <g opacity="0.1" stroke="#ffffff" stroke-width="1">
    <path d="M0,51 L1020,51 M0,102 L1020,102 M0,153 L1020,153 M0,204 L1020,204 M0,255 L1020,255 M0,306 L1020,306 M0,357 L1020,357 M0,408 L1020,408 M0,459 L1020,459" />
    <path d="M102,0 L102,510 M204,0 L204,510 M306,0 L306,510 M408,0 L408,510 M510,0 L510,510 M612,0 L612,510 M714,0 L714,510 M816,0 L816,510 M918,0 L918,510" />
  </g>

  <!-- Large floating circles for aesthetics -->
  <circle cx="100" cy="80" r="150" fill="#ffffff" opacity="0.05" />
  <circle cx="950" cy="450" r="200" fill="#ffffff" opacity="0.05" />
  
  <!-- Text Label -->
  <rect x="50" y="40" width="160" height="40" rx="20" fill="#000000" opacity="0.2" />
  <text x="130" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2" opacity="0.9">
    HUSTLE TEACHER
  </text>
  
  <!-- Main Title -->
  <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" fill="#ffffff" text-anchor="middle" filter="url(#shadow)">
      ${tspanElements}
  </text>
  
  <!-- Content Tag -->
  <rect x="510" y="440" width="220" height="36" rx="18" fill="#ffffff" transform="translate(-110)" opacity="0.9" />
  <text x="510" y="464" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="bold" fill="${grad[0]}" text-anchor="middle" letter-spacing="1">
    ${category.toUpperCase().replace(/-/g, ' ')}
  </text>
</svg>`.trim();

        fs.writeFileSync(imageDest, svgContent);

        // Update markdown frontmatter
        const newImagePath = `/assets/blog/${imageName}`;
        let updatedContent = content;
        
        if (content.match(/heroImage:\s*['"][^'"]+['"]/)) {
            updatedContent = content.replace(/heroImage:\s*['"][^'"]+['"]/, `heroImage: '${newImagePath}'`);
        } else {
            updatedContent = content.replace(/title:\s*['"]([^'"]+)['"]/, `title: '$1'\nheroImage: '${newImagePath}'`);
        }
        
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent);
        }
    }
    
    console.log('Successfully generated 100% relatable custom SVG thumbnails!');
}

processBlogs();
