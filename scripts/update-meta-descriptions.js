import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../src/content/blog');

const templates = [
  "Master {topic} with this comprehensive guide for 2026. Learn the essential strategies, tools, and methodologies to build a sustainable online income.",
  "Looking to start with {topic}? Our step-by-step breakdown explains exactly how beginners can transition from zero experience into high-value expertise.",
  "Explore the most effective {topic} techniques used by top professionals today. Find out how to consistently generate revenue and stand out in the freelance market.",
  "Your ultimate roadmap to {topic}. We cover the core fundamentals, advanced tactics, and everything you need to start scaling your digital business fast.",
  "A complete beginner's guide to dominating {topic}. Avoid common pitfalls and discover the proven methods for securing high-paying clients in this niche.",
  "Ready to excel at {topic}? Read our latest deep dive into the industry's best practices, essential tools, and insider tips for rapid career growth.",
  "Transform your understanding of {topic}. This in-depth article provides actionable steps to elevate your skills and secure long-term freelance success.",
  "Everything you need to know about starting in {topic}. Learn how to leverage modern strategies to boost your hourly rate and build a reliable client base.",
  "The 2026 playbook for {topic}. Unlock the secrets to mastering this high-demand skill and take your online earning potential to the next level.",
  "A practical, no-fluff guide to {topic}. Discover exact workflows and premium strategies that top earners use to stay ahead of the digital competition."
];

function getRandomTemplate(topic) {
  const index = Math.floor(Math.random() * templates.length);
  return templates[index].replace('{topic}', topic);
}

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Extract title
      const titleMatch = content.match(/^title:\s*["']?([^"'\n]+)["']?/m);
      if (!titleMatch) return;
      const title = titleMatch[1].replace(/^(Top |Best |How to |Start |Master )/i, '').trim();
      
      // Create a simplified topic from title
      const topic = title.split(' ').slice(0, 4).join(' ').replace(/[^a-zA-Z0-9 ]/g, '');

      // Check if description is generic
      const isGeneric = /Stop guessing and start executing|Want to succeed with|Unlock the ultimate growth strategies|Learn the hidden strategies behind|Discover the exact step-by-step framework/i.test(content);
      
      if (isGeneric) {
        const newDesc = getRandomTemplate(topic);
        
        // Replace description
        content = content.replace(/^description:\s*["'].*?["']/m, `description: "${newDesc}"`);
        
        // Replace metaDescription if it exists, otherwise add it
        if (/^metaDescription:/m.test(content)) {
          content = content.replace(/^metaDescription:\s*["'].*?["']/m, `metaDescription: "${newDesc}"`);
        } else {
          content = content.replace(/^(description:.*)$/m, `$1\nmetaDescription: "${newDesc}"`);
        }

        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${file}`);
      }
    }
  });
}

processDirectory(contentDir);
console.log('Finished updating meta descriptions.');
