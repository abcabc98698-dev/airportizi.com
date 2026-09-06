import fs from "node:fs";

const html = fs.readFileSync("dist/index.html", "utf8");
const wrappers = html.split('class="post-card-wrapper');

wrappers.slice(1).forEach((w, idx) => {
	const classList = w.split('"')[0];
	const hasPinnedClass = classList.split(/\s+/).includes("pinned");
	const titleMatch = w.match(
		/class="post-card-title[^"]*"[^>]*>([\s\S]*?)<\/a>/,
	);
	const linkMatch = w.match(/href="([^"]*posts\/[^"]*)"/);
	const title = titleMatch
		? titleMatch[1].replace(/<[^>]+>/g, "").trim()
		: "Unknown title";
	const link = linkMatch ? linkMatch[1] : "Unknown link";

	console.log(
		`[Card ${idx + 1}] ${hasPinnedClass ? "📌【置顶 PINNED】" : "📄【普通】"}`,
	);
	console.log(`  Classes: post-card-wrapper${classList}`);
	console.log(`  Title:   ${title}`);
	console.log(`  Link:    ${link}\n`);
});
