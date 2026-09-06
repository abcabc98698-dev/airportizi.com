import fs from "node:fs";
import path from "node:path";

const files = fs
	.readdirSync("src/content/posts")
	.filter((f) => f.endsWith(".md"));
const catMap = new Map();

files.forEach((f) => {
	const content = fs.readFileSync(path.join("src/content/posts", f), "utf8");
	const m = content.match(/category:\s*(.+)/);
	const cat = m ? m[1].replace(/["\r\n]/g, "").trim() : "未分类";
	if (!catMap.has(cat)) {
		catMap.set(cat, []);
	}
	catMap.get(cat).push(f);
});

console.log("=== ALL CATEGORIES & ARTICLE COUNTS ===");
for (const [cat, postList] of catMap.entries()) {
	postList.slice(0, 5).forEach((p) => {
		console.log(`   - ${p}`);
	});
	if (postList.length > 5) console.log(`   ... 还有 ${postList.length - 5} 篇`);
}
