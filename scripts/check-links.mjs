import fs from "node:fs";
import path from "node:path";

function getAllHtmlFiles(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);
		if (stat && stat.isDirectory()) {
			results = results.concat(getAllHtmlFiles(fullPath));
		} else if (file.endsWith(".html")) {
			results.push(fullPath);
		}
	});
	return results;
}

const htmlFiles = getAllHtmlFiles("dist");
console.log(`Found ${htmlFiles.length} HTML files in dist.`);

const broken = new Map();

htmlFiles.forEach((filePath) => {
	const content = fs.readFileSync(filePath, "utf-8");
	const hrefRegex = /href=["'](\/[^"'#?]*)["']/g;
	let match = hrefRegex.exec(content);
	while (match !== null) {
		const url = match[1];
		if (
			url.startsWith("//") ||
			url.startsWith("/_astro/") ||
			url.startsWith("/api/") ||
			url.startsWith("/favicon")
		)
			continue;

		const target = path.join("dist", url);
		let exists = false;
		if (fs.existsSync(target)) {
			if (fs.statSync(target).isDirectory()) {
				exists = fs.existsSync(path.join(target, "index.html"));
			} else {
				exists = true;
			}
		} else {
			if (fs.existsSync(target + ".html")) {
				exists = true;
			} else if (fs.existsSync(path.join(target, "index.html"))) {
				exists = true;
			}
		}

		if (!exists) {
			const relPath = path.relative("dist", filePath);
			if (!broken.has(url)) {
				broken.set(url, []);
			}
			broken.get(url).push(relPath);
		}
		match = hrefRegex.exec(content);
	}
});

console.log(`Unique broken links found: ${broken.size}`);
for (const [url, sources] of broken.entries()) {
	console.log(`❌ Broken Link: ${url}`);
	console.log(
		`   Referenced in (${sources.length} files): ${sources.slice(0, 3).join(", ")}`,
	);
}
