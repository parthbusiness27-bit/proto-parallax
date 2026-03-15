/**
 * fix-descriptions.mjs  
 * Trims meta descriptions that are over 160 chars.
 * Descriptions shorter than 120 chars are flagged but not changed
 * (they're from frontmatter and would need manual content expansion).
 * 
 * Target: 120–160 characters per description.
 */
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const BLOG_DIR = new URL('../src/content/blog/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const files = await readdir(BLOG_DIR);
const mdFiles = files.filter(f => f.endsWith('.md'));

let trimmed = 0;
let tooShort = 0;
let ok = 0;

for (const file of mdFiles) {
  const filePath = join(BLOG_DIR, file);
  const content = await readFile(filePath, 'utf-8');
  
  // Extract description from frontmatter
  const descMatch = content.match(/^description:\s*['"](.+?)['"]\s*$/m);
  if (!descMatch) continue;
  
  const desc = descMatch[1];
  const len = desc.length;
  
  if (len > 160) {
    // Trim at the last word boundary before 157 chars and add ...
    let trimmed_desc = desc.slice(0, 157);
    const lastSpace = trimmed_desc.lastIndexOf(' ');
    if (lastSpace > 100) trimmed_desc = trimmed_desc.slice(0, lastSpace);
    trimmed_desc = trimmed_desc.replace(/[.,;:!?]+$/, '') + '...';
    
    const newContent = content.replace(
      /^(description:\s*['"])(.+?)(['"])\s*$/m,
      `$1${trimmed_desc}$3`
    );
    
    if (newContent !== content) {
      await writeFile(filePath, newContent, 'utf-8');
      trimmed++;
      console.log(`✂️  Trimmed [${len}→${trimmed_desc.length}]: ${file}`);
    }
  } else if (len < 120) {
    tooShort++;
    console.log(`⚠️  Short desc [${len} chars]: ${file} — "${desc}"`);
  } else {
    ok++;
  }
}

console.log(`\n✅ Trimmed: ${trimmed} files`);
console.log(`⚠️  Too short (manual review needed): ${tooShort} files`);
console.log(`✓  Already OK: ${ok} files`);
