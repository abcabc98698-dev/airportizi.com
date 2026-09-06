import fs from "node:fs";

const posts = JSON.parse(fs.readFileSync("scripts/posts-dump.json", "utf8"));

let md = "# 全站 85 篇文章总览\n\n";

const byCat = {};
posts.forEach((p, idx) => {
	if (!byCat[p.category]) byCat[p.category] = [];
	byCat[p.category].push({ idx: idx + 1, ...p });
});

for (const [cat, items] of Object.entries(byCat)) {
	md += `## 【${cat}】(${items.length} 篇)\n\n`;
	md += "| 序号 | 文件名 | 标题 | 核心标签 |\n";
	md += "| :--- | :--- | :--- | :--- |\n";
	items.forEach((p) => {
		md += `| ${p.idx} | \`${p.file}\` | ${p.title} | ${(p.tags || []).slice(0, 3).join(", ")} |\n`;
	});
	md += "\n";
}

fs.writeFileSync("scripts/all-posts-catalog.md", md, "utf8");
console.log("Successfully generated scripts/all-posts-catalog.md");
