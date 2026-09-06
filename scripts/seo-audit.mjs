import fs from "node:fs";
import path from "node:path";

const postsDir = "src/content/posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

console.log(`Found ${files.length} posts in ${postsDir}`);

const posts = [];

for (const file of files) {
	const fullPath = path.join(postsDir, file);
	const content = fs.readFileSync(fullPath, "utf8");

	// parse frontmatter
	const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!fmMatch) continue;

	const fm = fmMatch[1];
	const titleMatch = fm.match(/title:\s*(.*)/);
	const descMatch = fm.match(/description:\s*(.*)/);
	const catMatch = fm.match(/category:\s*(.*)/);
	const tagsMatch = fm.match(/tags:\s*\[(.*?)\]/);
	const seriesMatch = fm.match(/series:\s*(.*)/);

	const title = titleMatch
		? titleMatch[1].trim().replace(/^["']|["']$/g, "")
		: "";
	const description = descMatch
		? descMatch[1].trim().replace(/^["']|["']$/g, "")
		: "";
	const category = catMatch
		? catMatch[1].trim().replace(/^["']|["']$/g, "")
		: "";
	const tags = tagsMatch
		? tagsMatch[1].split(",").map((t) => t.trim().replace(/^["']|["']$/g, ""))
		: [];
	const series = seriesMatch
		? seriesMatch[1].trim().replace(/^["']|["']$/g, "")
		: "";

	// Extract body after frontmatter
	const body = content.slice(fmMatch[0].length);

	// Extract H2 headings
	const h2Matches = [...body.matchAll(/^##\s+(.*)/gm)].map((m) => m[1].trim());

	// Extract internal links
	const links = [...body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]
		.map((m) => ({
			text: m[1].trim(),
			url: m[2].trim(),
		}))
		.filter(
			(l) =>
				l.url.startsWith("/") ||
				l.url.startsWith("./") ||
				l.url.startsWith("../"),
		);

	// First 500 chars of body
	const bodyTextClean = body
		.replace(/```[\s\S]*?```/g, "")
		.replace(/\[.*?\]\(.*?\)/g, "")
		.replace(/[#*`_~>-]/g, "")
		.replace(/\s+/g, " ")
		.trim();
	const intro = bodyTextClean.slice(0, 300);

	posts.push({
		file,
		slug: file.replace(/\.md$/, ""),
		url: `/posts/${file.replace(/\.md$/, "")}/`,
		title,
		description,
		category,
		tags,
		series,
		h2Count: h2Matches.length,
		h2List: h2Matches,
		intro,
		links,
	});
}

// Write json report for analysis
fs.writeFileSync("scripts/posts-dump.json", JSON.stringify(posts, null, 2));
console.log(
	"Successfully extracted metadata for all posts into scripts/posts-dump.json",
);
