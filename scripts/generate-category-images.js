import fs from 'fs';
import path from 'path';

const categoriesContent = fs.readFileSync(path.join(process.cwd(), 'scripts', 'categories.js'), 'utf-8');
const slugs = [...categoriesContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

const assetsDir = path.join(process.cwd(), 'public', 'assets', 'categories');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

async function downloadImage(url, dest) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to GET '${url}'`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    if (buffer.length < 5000) {
        throw new Error(`File too small: ${buffer.length}`);
    }
    fs.writeFileSync(dest, buffer);
}

async function processCategories() {
    console.log(`Found ${slugs.length} categories.`);
    for (let i = 0; i < slugs.length; i++) {
        const slug = slugs[i];
        const dest = path.join(assetsDir, `${slug}.jpg`);
        
        let keyword = slug.replace(/-/g, ',');
        const url = `https://loremflickr.com/800/450/${keyword}?lock=${Math.floor(Math.random() * 100000)}`;
        
        if (fs.existsSync(dest)) {
            const buf = Buffer.alloc(2);
            const fd = fs.openSync(dest, 'r');
            fs.readSync(fd, buf, 0, 2, 0);
            fs.closeSync(fd);
            if (buf[0] === 0xff && buf[1] === 0xd8) {
                console.log(`[${i+1}/${slugs.length}] Image already exists and valid for ${slug}`);
                continue;
            }
        }
        
        console.log(`[${i+1}/${slugs.length}] Downloading image for ${slug}...`);
        try {
            await downloadImage(url, dest);
            // wait 50ms
            await new Promise(r => setTimeout(r, 50));
        } catch (e) {
            console.error(`Failed on ${slug}: ${e.message}`);
        }
    }
    console.log("Done generating category images!");
}

processCategories();
