import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicAssetsDir = path.join(__dirname, '../public/assets');
const pubCategoriesDir = path.join(publicAssetsDir, 'categories');

const filesToOptimize = [
  path.join(publicAssetsDir, 'success-kid.jpg'),
  path.join(publicAssetsDir, 'success-worker.jpg'),
  path.join(publicAssetsDir, 'success-housewife.jpg'),
  path.join(pubCategoriesDir, 'agencies.jpg'),
  path.join(pubCategoriesDir, 'startups.jpg'),
  path.join(pubCategoriesDir, 'web3-blockchain.jpg'),
  path.join(pubCategoriesDir, 'no-code-development.jpg'),
  path.join(pubCategoriesDir, 'creator-economy.jpg'),
  path.join(pubCategoriesDir, 'affiliate-marketing.jpg')
];

async function optimizeImages() {
  for (const file of filesToOptimize) {
    if (fs.existsSync(file)) {
      try {
        const stats = fs.statSync(file);
        console.log(`Original size of ${path.basename(file)}: ${(stats.size / 1024).toFixed(2)} KB`);
        
        // Read file to buffer
        const buffer = fs.readFileSync(file);
        
        // Optimize and convert to standard JPEG
        const optimizedBuffer = await sharp(buffer)
          .resize(800) // downscale width to max 800px for speedy loading
          .jpeg({ quality: 75, force: true }) // force format to proper jpeg
          .toBuffer();
          
        fs.writeFileSync(file, optimizedBuffer);
        
        const newStats = fs.statSync(file);
        console.log(`Optimized size of ${path.basename(file)}: ${(newStats.size / 1024).toFixed(2)} KB`);
      } catch (e) {
        console.error(`Error optimizing ${file}:`, e.message);
      }
    } else {
      console.log(`File not found: ${file}`);
    }
  }
}

optimizeImages().then(() => console.log('Optimization complete!'));
