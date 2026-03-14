import fs from 'fs';
import path from 'path';
import https from 'https';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const assetsDir = path.join(process.cwd(), 'src', 'assets', 'blog');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

async function downloadImage(url, dest) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to get '${url}' (${response.status} ${response.statusText})`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Safety check for valid image size (prevent saving HTML/404s)
    if (buffer.length < 5000) {
        throw new Error(`Downloaded file is too small (${buffer.length} bytes), likely an error page.`);
    }
    
    fs.writeFileSync(dest, buffer);
}

function processBlogs() {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    let i = 0;

    console.log(`Found ${files.length} blog posts. Starting generation...`);

    const runNext = async () => {
        if (i >= files.length) {
            console.log('Finished processing all files!');
            return;
        }

        const file = files[i];
        i++;

        const filePath = path.join(blogDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
        const categoryMatch = content.match(/category:\s*['"]([^'"]+)['"]/);
        
        if (!titleMatch) {
            console.log(`Skipping ${file} - No title found`);
            runNext();
            return;
        }

        const category = categoryMatch ? categoryMatch[1].replace(/[^a-zA-Z0-9]/g, '') : 'business';
        const slug = file.replace(/\.mdx?$/, '');
        const imageName = `${slug}.jpg`;
        const imageDest = path.join(assetsDir, imageName);

        // Fetch a random relevant image from loremflickr (or picsum if lorem fails)
        const seed = Math.floor(Math.random() * 100000);
        const imageUrl = `https://loremflickr.com/1020/510/${category}?lock=${seed}`;
        
        if (fs.existsSync(imageDest)) {
             // Check if it's a valid JPEG
             const fd = fs.openSync(imageDest, 'r');
             const buf = Buffer.alloc(2);
             fs.readSync(fd, buf, 0, 2, 0);
             fs.closeSync(fd);
             
             if (buf[0] !== 0xff || buf[1] !== 0xd8) {
                 console.log(`[${i}/${files.length}] Deleting invalid image for ${file}`);
                 fs.unlinkSync(imageDest);
                 // Will proceed to download
             } else {
                 console.log(`[${i}/${files.length}] Image already exists and is valid for ${file}`);
             }
        }
        
        if (!fs.existsSync(imageDest)) {
             console.log(`[${i}/${files.length}] Downloading image for ${file} (Category: ${category})...`);
             try {
                await downloadImage(imageUrl, imageDest);
             } catch (e) {
                console.error(`Error downloading image for ${file}:`, e.message);
                runNext();
                return;
             }
        }
        
        const newImagePath = `../../assets/blog/${imageName}`;
        const updatedContent = content.replace(/heroImage:\s*['"][^'"]+['"]/, `heroImage: '${newImagePath}'`);
        
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent);
            console.log(`Updated frontmatter for ${file}`);
        }
        
        setTimeout(runNext, 50); // Be gentle to API
    };

    runNext();
}

processBlogs();
