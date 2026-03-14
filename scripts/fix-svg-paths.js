import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const publicDir = path.join(process.cwd(), 'public', 'assets', 'blog');
const srcDir = path.join(process.cwd(), 'src', 'assets', 'blog');

if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

// Copy SVGs to src
const svgs = fs.readdirSync(publicDir).filter(f => f.endsWith('.svg'));
for(const svg of svgs) {
    fs.copyFileSync(path.join(publicDir, svg), path.join(srcDir, svg));
}

// Update markdown files to use relative path so Astro image() schema can resolve it
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
for (const file of files) {
   const filePath = path.join(blogDir, file);
   let content = fs.readFileSync(filePath, 'utf-8');
   const slug = file.replace(/\.mdx?$/, '');
   const newPath = `heroImage: '../../assets/blog/${slug}.svg'`;
   
   if (content.match(/heroImage:\s*['"]\/assets\/blog\/[^'"]+['"]/)) {
        content = content.replace(/heroImage:\s*['"]\/assets\/blog\/[^'"]+['"]/, newPath);
   }
   fs.writeFileSync(filePath, content);
}

console.log('Fixed paths and moved SVGs to src/assets/blog!');
