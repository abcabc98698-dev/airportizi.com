import fs from "node:fs";

const files = fs
	.readdirSync("src/content/posts")
	.filter((f) => f.endsWith(".md"));
const list = files.map((f) => {
	const txt = fs.readFileSync("src/content/posts/" + f, "utf8");
	const mPub = txt.match(/published:\s*([^\r\n]+)/);
	const mUp = txt.match(/updated:\s*([^\r\n]+)/);
	const mPin = txt.match(/pinned:\s*([^\r\n]+)/);
	const mTitle = txt.match(/title:\s*([^\r\n]+)/);
	return {
		file: f,
		title: mTitle ? mTitle[1].replace(/["']/g, "").trim() : "",
		published: mPub ? mPub[1].trim() : "",
		updated: mUp ? mUp[1].trim() : "",
		pinned: mPin ? mPin[1].trim() : "false",
	};
});

const groups = {};
list.forEach((item) => {
	if (!groups[item.published]) groups[item.published] = [];
	groups[item.published].push(item);
});

console.log("=== DATE GROUPS ===");
for (const [date, flist] of Object.entries(groups).sort()) {
	console.log(`\nDate: ${date} (${flist.length} 篇):`);
	flist.forEach((item) => {
		console.log(`  - ${item.file} | ${item.title.slice(0, 40)}`);
	});
}
