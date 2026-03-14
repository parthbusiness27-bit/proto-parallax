import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const assetsDir = path.join(process.cwd(), 'public', 'assets', 'blog');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

async function downloadImage(url, dest) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to get '${url}' (${response.status})`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    if (buffer.length < 5000) {
        throw new Error(`Downloaded file is too small (${buffer.length} bytes), likely an error.`);
    }
    
    fs.writeFileSync(dest, buffer);
}

async function processBlogs() {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    console.log(`Found ${files.length} blog posts. Starting AI thumbnail generation...`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(blogDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
        if (!titleMatch) {
            console.log(`Skipping ${file} - No title found`);
            continue;
        }

        const title = titleMatch[1];
        const slug = file.replace(/\.mdx?$/, '');
        const imageName = `${slug}.jpg`;
        const imageDest = path.join(assetsDir, imageName);

        const safeTitle = title.replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
        const shortTitle = safeTitle.split(' ').slice(0, 6).join(' ');
        const prompt = encodeURIComponent(`YouTube thumbnail, vibrant flat illustration, modern business style, representing: ${shortTitle}`);
        const seed = Math.floor(Math.random() * 100000);
        const imageUrl = `https://pollinations.ai/p/${prompt}?width=1020&height=510&seed=${seed}&nologo=true`;
        
        let needsDownload = true;
        if (fs.existsSync(imageDest)) {
             const fd = fs.openSync(imageDest, 'r');
             const buf = Buffer.alloc(2);
             fs.readSync(fd, buf, 0, 2, 0);
             fs.closeSync(fd);
             
             if (buf[0] !== 0xff || buf[1] !== 0xd8) {
                 console.log(`[${i+1}/${files.length}] Deleting invalid image for ${file}`);
                 fs.unlinkSync(imageDest);
             } else {
                 console.log(`[${i+1}/${files.length}] Valid image already exists for ${slug}, skipping download.`);
                 needsDownload = false;
             }
        }
        
        if (needsDownload) {
             console.log(`[${i+1}/${files.length}] Generating AI thumbnail for: "${shortTitle}"...`);
             let retries = 3;
             while(retries > 0) {
                 try {
                    await downloadImage(imageUrl, imageDest);
                    await new Promise(r => setTimeout(r, 800)); // Be gentle
                    break;
                 } catch (e) {
                    console.error(`Attempt failed for ${file}:`, e.message);
                    retries--;
                    if(retries > 0) {
                        await new Promise(r => setTimeout(r, 2000));
                    }
                 }
             }
        }
        
        // Update frontmatter to point directly to the new public asset
        const newImagePath = `/assets/blog/${imageName}`;
        let updatedContent = content;
        
        if (content.match(/heroImage:\s*['"][^'"]+['"]/)) {
            updatedContent = content.replace(/heroImage:\s*['"][^'"]+['"]/, `heroImage: '${newImagePath}'`);
        } else {
            // Insert heroImage if missing
            updatedContent = content.replace(/title:\s*['"]([^'"]+)['"]/, `title: '$1'\nheroImage: '${newImagePath}'`);
        }
        
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent);
        }
    }
    
    console.log('Finished generating all AI thumbnails!');
}

processBlogs();
