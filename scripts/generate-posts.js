  import fs from "fs";
  import path from "path";
  import { fileURLToPath } from "url";
  import matter from "gray-matter";

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const postsDir = path.join(__dirname, "../src/content/blog");
  const outputFile = path.join(__dirname, "../public/posts.json");

  // Ensure directories exist
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const publicDir = path.dirname(outputFile);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  let posts = [];

  try {
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));

    posts = files.map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(postsDir, file);
      const content = fs.readFileSync(fullPath, "utf8");

      const parsed = matter(content);
      const data = parsed.data || {};
      const markdown = parsed.content || "";

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString().split("T")[0],
        author: data.author || "Bhasya Legal",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "",
        content: markdown
      };
    });

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  } catch (err) {
    console.error("❌ Error generating posts:", err);
    posts = [];
  }

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

  console.log(`✅ Generated ${posts.length} blog posts`);