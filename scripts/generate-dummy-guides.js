import fs from 'fs';
import path from 'path';

const categories = [
    { title: "Side Hustles for Students", slug: "side-hustles" },
    { title: "Skill-Based Income", slug: "skill-based" },
    { title: "Tech & Programming", slug: "tech-programming" },
    { title: "Content Creator Income", slug: "content-creator" },
    { title: "Digital Product Businesses", slug: "digital-products" },
    { title: "Online Business Models", slug: "online-business" },
    { title: "AI-Powered Income", slug: "ai-income" },
    { title: "Virtual Assistant & Support", slug: "virtual-assistant" },
    { title: "Affiliate & Monetization", slug: "affiliate" },
    { title: "Digital Assets & Trading", slug: "digital-assets" },
    { title: "Automation & Tools", slug: "automation" }
];

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

// Ensure directory exists
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
}

// Generate Date Helper to make them stagger chronologically
let dateCounter = new Date('2024-01-01');

categories.forEach(cat => {
    for (let i = 1; i <= 3; i++) {
        dateCounter.setDate(dateCounter.getDate() + 2);

        // Format date string for frontmatter
        const dateStr = dateCounter.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });

        const num = Math.floor(Math.random() * 5) + 1; // Random hero image 1-5

        const content = `---
title: 'Complete Guide to ${cat.title} - Part ${i}'
description: 'A comprehensive, step-by-step masterclass analyzing ${cat.title} opportunities. Learn how to launch, scale, and monetize this workflow.'
pubDate: '${dateStr}'
heroImage: '../../assets/blog-placeholder-${num}.jpg'
category: '${cat.slug}'
---

# Introduction to ${cat.title}

Welcome to Part ${i} of our definitive guide on **${cat.title}**. This masterclass is designed to take you from a complete beginner to confidently executing this business model. 

Generating income through ${cat.slug.replace('-', ' ')} is one of the most reliable pathways in the modern digital economy. Whether you have zero technical experience or you're an established professional looking to pivot, this guide breaks down the exact framework required.

## The Core Strategy

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing.

### Step 1: Research and Validation

Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus.

### Step 2: Implementation

Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. 

## Expected Timelines & ROI

Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in.

Tempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras.
`;

        const filename = `${cat.slug}-guide-part-${i}.md`;
        const filePath = path.join(blogDir, filename);

        fs.writeFileSync(filePath, content);
        console.log(`Generated: ${filename}`);
    }
});

console.log('Successfully generated 33 dummy guide posts!');
