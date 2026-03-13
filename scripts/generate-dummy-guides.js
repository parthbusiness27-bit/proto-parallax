import fs from 'fs';
import path from 'path';
import { categories } from './categories.js';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

// Ensure directory exists
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
}

// Generate Date Helper to make them stagger chronologically
let dateCounter = new Date('2024-01-01');
let totalPosts = 0;

categories.forEach(cat => {
    cat.subcategories.forEach((subcat) => {
        dateCounter.setDate(dateCounter.getDate() + 1);

        // Format date string for frontmatter
        const dateStr = dateCounter.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });

        const num = Math.floor(Math.random() * 5) + 1; // Random hero image 1-5
        
        // Slugify the subcategory for the filename
        const subcatSlug = subcat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const content = `---
title: 'Complete Guide to ${subcat}'
description: 'A comprehensive masterclass analyzing ${subcat} opportunities in the ${cat.title} space. Learn how to launch, scale, and monetize this workflow.'
pubDate: '${dateStr}'
heroImage: '../../assets/blog-placeholder-${num}.jpg'
category: '${cat.slug}'
---

# Introduction to ${subcat}

Welcome to our definitive guide on **${subcat}**, a core component of ${cat.title}. This masterclass is designed to take you from a complete beginner to confidently executing this business model. 

Generating income through ${subcat} is one of the most reliable pathways in the modern digital economy. Whether you have zero technical experience or you're an established professional looking to pivot, this guide breaks down the exact framework required.

## The Core Strategy

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing.

### Step 1: Research and Validation

Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus.

### Step 2: Implementation

Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. 

## Expected Timelines & ROI

Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in.
`;

        const filename = `${cat.slug}-${subcatSlug}.md`;
        const filePath = path.join(blogDir, filename);

        fs.writeFileSync(filePath, content);
        console.log(`Generated: ${filename}`);
        totalPosts++;
    });
});

console.log(`Successfully generated ${totalPosts} dummy guide posts!`);
