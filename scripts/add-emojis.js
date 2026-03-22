import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../src/content/blog');

const emojiMap = {
  'strategy': '🎯',
  'core': '🎯',
  'timeline': '⏳',
  'roi': '💰',
  'expected': '📈',
  'money': '💵',
  'how to': '🛠️',
  'guide': '📖',
  'step': '🪜',
  'prerequisite': '📋',
  'next': '🚀',
  'conclusion': '🏁',
  'faq': '❓',
  'question': '🤔',
  'answer': '💡',
  'tool': '🧰',
  'resource': '📚',
  'link': '🔗',
  'mistake': '⚠️',
  'avoid': '🛑',
  'tip': '💡',
  'trick': '✨',
  'secret': '🤫',
  'benefit': '⭐',
  'pro': '✅',
  'con': '❌',
  'example': '📝',
  'case study': '📊',
  'what is': '🧐',
  'why': '❓',
  'when': '⏰',
  'where': '🗺️',
  'who': '👤',
  'intro': '👋',
  'welcome': '🎉',
  'summary': '📝',
  'overview': '🔍'
};

const defaultEmojis = ['💡', '✨', '🔥', '⚡', '🚀', '🎯', '📈'];

function getEmoji(text) {
  const lowerText = text.toLowerCase();
  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (lowerText.includes(keyword)) {
      return emoji;
    }
  }
  // Return random default
  return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updatedCount += processDirectory(fullPath);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = false;

      // Regex to match ## Header or ### Header
      // Ensure we don't match if it already starts with an emoji or non-word character (excluding quotes/brackets)
      // ^(#{2,3})\s+([a-zA-Z0-9'"`\[])
      const headerRegex = /^(#{2,3})\s+([a-zA-Z0-9'"`\[])/gm;

      content = content.replace(headerRegex, (match, hashes, firstChar, offset, string) => {
        // Extract the full line to analyze for keywords
        const lineEnd = string.indexOf('\n', offset);
        const fullLine = lineEnd !== -1 ? string.slice(offset, lineEnd) : string.slice(offset);
        
        const emoji = getEmoji(fullLine);
        updated = true;
        return `${hashes} ${emoji} ${firstChar}`;
      });

      if (updated) {
        fs.writeFileSync(fullPath, content, 'utf8');
        updatedCount++;
      }
    }
  }
  return updatedCount;
}

const count = processDirectory(contentDir);
console.log(`Successfully added emojis to headers in ${count} files.`);
