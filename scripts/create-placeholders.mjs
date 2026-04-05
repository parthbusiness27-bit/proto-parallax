import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read categories.js directly and use eval or similar approach, since it's an ES6 module
const categoriesRaw = fs.readFileSync(path.join(__dirname, 'categories.js'), 'utf8');
const categoriesStr = categoriesRaw.replace('export const categories =', 'const categories =') + '\nmodule.exports = categories;';
fs.writeFileSync(path.join(__dirname, 'categories-temp.cjs'), categoriesStr);

let categories;
try {
    const require = require || await import('module').then(m => m.createRequire(import.meta.url));
    categories = require('./categories-temp.cjs');
} catch (err) {
    console.error(err);
} finally {
    fs.unlinkSync(path.join(__dirname, 'categories-temp.cjs'));
}

const generateSlug = (text) => {
    return text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

const blogDir = path.join(__dirname, '../src/content/blog');
const assetsDir = path.join(__dirname, '../src/assets/blog');

// Copy a dummy SVG for cloning if available
const dummySvgPath = path.join(__dirname, '../src/assets/blog/agencies-seo-agency.svg');

let count = 0;

categories.forEach(category => {
    category.subcategories.forEach(sub => {
        const subSlug = generateSlug(sub);
        const fileNameBase = `${category.slug}-${subSlug}`;
        
        const mdPath = path.join(blogDir, `${fileNameBase}.md`);
        const mdxPath = path.join(blogDir, `${fileNameBase}.mdx`);
        const svgPath = path.join(assetsDir, `${fileNameBase}.svg`);
        
        if (!fs.existsSync(mdPath) && !fs.existsSync(mdxPath)) {
            console.log(`Creating ${fileNameBase}.md...`);
            const content = `---
title: 'Complete Guide to ${sub}'
description: "Explore the most effective ${sub} techniques used by top professionals today. Find out how to consistently generate revenue and stand out in the market."
metaDescription: "Explore the most effective ${sub} techniques used by top professionals today. Find out how to consistently generate revenue and stand out in the market."
pubDate: '${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}'
heroImage: '../../assets/blog/${fileNameBase}.svg'
category: '${category.slug}'
---
Welcome to our definitive guide on **${sub}**, a core component of ${category.title}. This masterclass is designed to take you from a complete beginner to confidently executing this business model. 

Generating income through ${sub} is one of the most reliable pathways in the modern digital economy. Whether you have zero technical experience or you're an established professional looking to pivot, this guide breaks down the exact framework required.

## 🎯 The Core Strategy

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### 🪜 Step 1: Research and Validation

Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus.

### 🪜 Step 2: Implementation

Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit.

## ⏳ Expected Timelines & ROI

Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra.
`;
            fs.writeFileSync(mdPath, content);
            count++;
            
            if (fs.existsSync(dummySvgPath) && !fs.existsSync(svgPath)) {
                fs.copyFileSync(dummySvgPath, svgPath);
            } else if (!fs.existsSync(svgPath)) {
                // If no dummy svg exists, create a simple text placeholder
                fs.writeFileSync(svgPath, `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#333"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="#fff">${sub}</text></svg>`);
            }
        }
    });
});
console.log('Processed ' + count + ' missing placeholder blogs and assets successfully!');
