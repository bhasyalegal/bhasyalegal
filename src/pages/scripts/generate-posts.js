import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, '../src/content/blog');
const outputFile = path.join(__dirname, '../public/posts.json');

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const posts = files.map((file) => {
  const slug = file.replace(/\.md$/, '');
  const fullPath = path.join(postsDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const { data, content: markdown } = matter(content);
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    author: data.author || 'Bhasya Legal',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || '',
    content: markdown,
  };
});

// Sort by date descending
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`✅ Generated ${posts.length} blog posts to public/posts.json`);