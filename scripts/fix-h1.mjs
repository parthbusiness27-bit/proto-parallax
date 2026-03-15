/**
 * fix-h1.mjs
 * Removes the first H1 heading line from all blog markdown files.
 * Keeps all sub-headings (##, ###, etc.) intact.
 */
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const BLOG_DIR = new URL('../src/content/blog/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const files = await readdir(BLOG_DIR);
const mdFiles = files.filter(f => f.endsWith('.md'));

let fixed = 0;
let skipped = 0;

for (const file of mdFiles) {
  const filePath = join(BLOG_DIR, file);
  const content = await readFile(filePath, 'utf-8');
  
  // Find the end of frontmatter (second ---)
  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd === -1) { skipped++; continue; }
  
  const afterFrontmatter = content.slice(frontmatterEnd + 3);
  
  // Check if there's a lone H1 line (# text) — not ## or ###
  const h1Regex = /\n# [^\n]+\n/;
  if (!h1Regex.test(afterFrontmatter)) {
    // Also check for H1 at the very start (no leading newline after frontmatter)
    const h1StartRegex = /^\s*# [^\n]+\n/;
    if (!h1StartRegex.test(afterFrontmatter)) {
      skipped++;
      continue;
    }
  }
  
  // Remove ALL single-# H1 headings from the post body
  const newAfterFrontmatter = afterFrontmatter
    .replace(/^\s*# [^\n]+\n/gm, '');
  
  const newContent = content.slice(0, frontmatterEnd + 3) + newAfterFrontmatter;
  
  if (newContent !== content) {
    await writeFile(filePath, newContent, 'utf-8');
    fixed++;
  } else {
    skipped++;
  }
}

console.log(`✅ Fixed H1 in ${fixed} files.`);
console.log(`⏩ Skipped ${skipped} files (no H1 found or already clean).`);
