import fs from "node:fs";
import path from "node:path";

const files = fs
	.readdirSync("src/content/posts")
	.filter((f) => f.endsWith(".md"));

let unpinnedCount = 0;
files.forEach((f) => {
	const filePath = path.join("src/content/posts", f);
	let content = fs.readFileSync(filePath, "utf8");

	if (f === "guangshuyun-review.md") {
		// Ensure guangshuyun is pinned
		if (!content.includes("pinned: true")) {
			content = content.replace(/^pinned:\s*false/m, "pinned: true");
			fs.writeFileSync(filePath, content, "utf8");
			console.log("Ensured guangshuyun-review.md is pinned: true");
		} else {
			console.log("guangshuyun-review.md is already pinned: true");
		}
	} else {
		// Other posts should not be pinned to avoid cluttering homepage with 16 pinned badges
		if (content.includes("pinned: true")) {
			content = content.replace(/^pinned:\s*true/m, "pinned: false");
			fs.writeFileSync(filePath, content, "utf8");
			unpinnedCount++;
		}
	}
});

console.log(`Unpinned ${unpinnedCount} other posts.`);
