import fs from 'fs';
import path from 'path';

function findHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = findHtmlFiles('./dist');
let found = false;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const jsonStr = match[1];
    if (jsonStr.includes('"Review"') || jsonStr.includes('"AggregateRating"')) {
      console.log(`\n--- Found in ${file} ---`);
      console.log(jsonStr.substring(0, 500) + '...');
      found = true;
    }
  }
}

if (!found) {
  console.log('\nNo Review or AggregateRating schema found in dist HTML files.');
}
