import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

// High-converting YouTube/Blog style text frameworks for Titles
const titleTemplates = [
    "How to Start [Topic] in 2026 With Zero Experience",
    "[Topic] For Beginners: The Ultimate Step-by-Step Blueprint",
    "How I Make Money With [Topic] (Complete Breakdown)",
    "Stop Overcomplicating [Topic] — High Income Strategy",
    "Top 5 [Topic] Strategies That Actually Work in 2026",
    "[Topic] Income Tutorial: From $0 to $10,000/Month",
    "The Dark Truth About [Topic] (And How To Win)",
    "[Topic] Masterclass: Everything You Need to Know",
    "How To Build a Passive Income Empire With [Topic]",
    "Zero Investment [Topic] Strategy for Complete Beginners"
];

const descriptionTemplates = [
    "Discover the exact step-by-step framework to master [Topic] and start generating reliable online income this year. Perfect for complete beginners.",
    "Learn the hidden strategies behind [Topic] that industry experts use to scale their side hustles into full-time internet businesses.",
    "Want to succeed with [Topic]? This comprehensive blueprint reveals the low-cost strategies you need to launch and grow fast.",
    "Stop guessing and start executing. Follow our complete guide to [Topic] designed specifically to help beginners earn their first high-income paycheck online.",
    "Unlock the ultimate growth strategies for [Topic]. We break down the exact software, tactics, and zero-effort shortcuts to maximize your ROI."
];

function getRandomTemplate(templates) {
    return templates[Math.floor(Math.random() * templates.length)];
}

function processTopic(filename) {
    // Convert 'affiliate-marketing-deal-coupon-websites.md' -> 'Deal Coupon Websites'
    const name = filename.replace(/\.mdx?$/, '');
    
    // Split by dash and take the last 2-3 words, or clean up the whole thing
    const parts = name.split('-');
    
    // Usually the last 2-3 words represent the core sub-topic (e.g. 'deal coupon websites' from the above)
    // If it's too short, use the whole thing.
    let topicWords = parts;
    if (parts.length > 3) {
        topicWords = parts.slice(Math.max(parts.length - 3, 1));
    }
    
    let topic = topicWords.join(' ');
    
    // Title Case
    topic = topic.split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
        
    return topic;
}

function processBlogs() {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    let updatedCount = 0;

    console.log(`Rewriting titles and descriptions for ${files.length} blog posts...`);

    files.forEach(file => {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        const topic = processTopic(file);
        
        const newTitle = getRandomTemplate(titleTemplates).replace('[Topic]', topic);
        const newDesc = getRandomTemplate(descriptionTemplates).replace('[Topic]', topic);
        
        const oldTitleMatch = content.match(/title:\s*['"](.*?)['"]/);
        const oldDescMatch = content.match(/description:\s*['"](.*?)['"]/);
        
        if (oldTitleMatch && oldTitleMatch[1].startsWith('Complete Guide to')) {
            // Replace Frontmatter
            content = content.replace(/title:\s*['"].*?['"]/, `title: '${newTitle.replace(/'/g, "\\'")}'`);
            content = content.replace(/description:\s*['"].*?['"]/, `description: '${newDesc.replace(/'/g, "\\'")}'`);
            
            // Rewrite the H1 too
            content = content.replace(/# Introduction to .*/, `# The Blueprint for ${topic}`);
            
            fs.writeFileSync(filePath, content);
            console.log(`[+] Rewrote SEO metadata for: ${file}`);
            updatedCount++;
        }
    });

    console.log(`Successfully SEO-optimized ${updatedCount} blog posts!`);
}

processBlogs();
