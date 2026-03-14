import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');

function getAllHtmlFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllHtmlFiles(filePath, fileList);
        } else if (filePath.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function checkLinks() {
    const htmlFiles = getAllHtmlFiles(distDir);
    let brokenLinksCount = 0;
    const brokenLinksMap = {};

    console.log(`Scanning ${htmlFiles.length} HTML files for broken internal links...`);

    for (const file of htmlFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        // Match href="something"
        const linkRegex = /href=["'](\/?[^"']+)["']/g;
        let match;

        while ((match = linkRegex.exec(content)) !== null) {
            let link = match[1];

            // Ignore external links and mailto/tel
            if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('#')) {
                continue;
            }

            // Remove hash and query params for file checking
            link = link.split('#')[0].split('?')[0];
            
            if (!link) continue;

            // Resolve link to local file path
            let targetPath;
            if (link.startsWith('/')) {
                // Absolute path from root (dist folder)
                targetPath = path.join(distDir, link);
            } else {
                // Relative path
                targetPath = path.join(path.dirname(file), link);
            }

            // Astro resolving logic:
            // /about -> dist/about/index.html OR dist/about.html
            // /assets/image.png -> dist/assets/image.png
            
            let exists = fs.existsSync(targetPath);
            
            if (!exists && targetPath.endsWith('/')) {
                exists = fs.existsSync(path.join(targetPath, 'index.html'));
            }
            if (!exists && !path.extname(targetPath)) {
                exists = fs.existsSync(targetPath + '.html') || fs.existsSync(path.join(targetPath, 'index.html'));
            }

            if (!exists) {
                brokenLinksCount++;
                const relFile = path.relative(process.cwd(), file);
                if (!brokenLinksMap[link]) {
                    brokenLinksMap[link] = new Set();
                }
                brokenLinksMap[link].add(relFile);
            }
        }
    }

    const uniqueBrokenLinks = Object.keys(brokenLinksMap);
    console.log(`\nFound ${brokenLinksCount} total broken link occurrences across ${uniqueBrokenLinks.length} unique URLs.`);
    
    if (uniqueBrokenLinks.length > 0) {
        console.log('\nTop broken URLs and where they are found:');
        for (const link of uniqueBrokenLinks.slice(0, 50)) {
            const temp = Array.from(brokenLinksMap[link]);
            console.log(`- ${link} (found in ${temp.length} files, e.g., ${temp.slice(0, 3).join(', ')})`);
        }
    }
}

checkLinks();
