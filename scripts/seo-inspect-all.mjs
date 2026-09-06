import fs from "node:fs";

const posts = JSON.parse(fs.readFileSync("scripts/posts-dump.json", "utf8"));

const catalog = posts.map((p, idx) => ({
	index: idx + 1,
	file: p.file,
	slug: p.slug,
	url: p.url,
	title: p.title,
	category: p.category,
	tags: p.tags,
	description: p.description,
}));

fs.writeFileSync(
	"scripts/all-posts-catalog.json",
	JSON.stringify(catalog, null, 2),
);

console.log(
	`Saved catalog of ${catalog.length} posts to scripts/all-posts-catalog.json`,
);

// Group by category and print
const byCat = {};
catalog.forEach((p) => {
	if (!byCat[p.category]) byCat[p.category] = [];
	byCat[p.category].push(p);
});

for (const [cat, items] of Object.entries(byCat)) {
	console.log(`\n=== [${cat}] (${items.length} 篇) ===`);
	items.forEach((item) => {
		console.log(`- [${item.index}] ${item.file} | ${item.title}`);
	});
}
