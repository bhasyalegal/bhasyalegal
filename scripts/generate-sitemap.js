import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = "https://bhasyalegal.com";

const outputPath = path.join(__dirname, "../public/sitemap.xml");

// Ensure public folder exists
const publicDir = path.dirname(outputPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const pages = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/services", priority: 0.9, changefreq: "monthly" },
  { path: "/attorneys", priority: 0.8, changefreq: "monthly" },
  { path: "/blog", priority: 0.7, changefreq: "daily" },
  { path: "/contact", priority: 0.7, changefreq: "monthly" },
  { path: "/tools", priority: 0.6, changefreq: "monthly" }
];

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `
  <url>
    <loc>${baseUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync(outputPath, sitemap);

console.log("✅ Sitemap generated successfully");