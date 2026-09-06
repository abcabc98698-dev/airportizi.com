import fs from "node:fs";

const files = [
	"dist/index.html",
	"dist/vpn/index.html",
	"dist/jichang/index.html",
	"dist/clash/index.html",
	"dist/nodes/index.html",
	"dist/tizi/index.html",
	"dist/free/index.html",
	"dist/tutorial/index.html",
	"dist/brands/index.html",
];

for (const f of files) {
	if (!fs.existsSync(f)) {
		console.log(`Missing: ${f}`);
		continue;
	}
	const html = fs.readFileSync(f, "utf8");
	const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || "";
	const descMatch = html.match(
		/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i,
	);
	const desc = descMatch ? descMatch[1] : "";
	const canonicalMatch = html.match(
		/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i,
	);
	const canonical = canonicalMatch ? canonicalMatch[1] : "";
	const robotsMatch = html.match(
		/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i,
	);
	const robots = robotsMatch ? robotsMatch[1] : "";
	const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
	const schemas = (
		html.match(/<script\s+type=["']application\/ld\+json["']>/gi) || []
	).length;
	const ogUrlMatch = html.match(
		/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i,
	);
	const ogUrl = ogUrlMatch ? ogUrlMatch[1] : "";

	console.log(`=== ${f} ===`);
	console.log(`Title: ${title}`);
	console.log(`Canonical: ${canonical}`);
	console.log(`Robots: ${robots}`);
	console.log(`OG URL: ${ogUrl}`);
	console.log(`H1 count: ${h1Matches.length}`);
	console.log(`Schema count: ${schemas}`);
}
