import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const blogDir = path.join(__dirname, '../src/content/blog');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

let count = 0;

categories.forEach(category => {
    category.subcategories.forEach(sub => {
        const subSlug = generateSlug(sub);
        const fileNameBase = `${category.slug}-${subSlug}`;
        
        const mdPath = path.join(blogDir, `${fileNameBase}.md`);
        const mdxPath = path.join(blogDir, `${fileNameBase}.mdx`);
        
        if (!fs.existsSync(mdPath) && !fs.existsSync(mdxPath)) {
            const content = `---
title: 'Complete Guide to ${sub}'
description: 'Explore the most effective ${sub} techniques used by top professionals today. Find out how to consistently generate revenue and stand out in the market.'
metaDescription: 'Explore the most effective ${sub} techniques used by top professionals today. Find out how to consistently generate revenue and stand out in the market.'
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
        }
    });
});
console.log('Processed ' + count + ' missing placeholder blogs successfully!');
