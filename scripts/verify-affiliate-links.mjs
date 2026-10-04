import fs from "node:fs";
import path from "node:path";

function getFiles(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	for (const file of list) {
		const full = path.join(dir, file);
		const stat = fs.statSync(full);
		if (stat && stat.isDirectory()) {
			if (file !== "_astro" && file !== "pagefind") {
				results = results.concat(getFiles(full));
			}
		} else if (file.endsWith(".html")) {
			results.push(full);
		}
	}
	return results;
}

const files = getFiles("dist");
let totalLinks = 0;
let affiliateLinks = 0;
let properlyMarkedAffiliate = 0;
const unmarkedAffiliate = [];

const affiliateDomains = [
	"gscloud.pro",
	"feimaoyun.com",
	"weifeng.cloud",
	"xingdaomeng.com",
	"weitu.cloud",
	"yuzhouyun.com",
	"ermaoyun.com",
	"sujie.cloud",
];

for (const f of files) {
	const html = fs.readFileSync(f, "utf8");
	const aMatches = [...html.matchAll(/<a\b[^>]*>/gi)];
	for (const m of aMatches) {
		totalLinks++;
		const fullTag = m[0];
		const isAffiliate =
			affiliateDomains.some((d) => fullTag.includes(d)) ||
			fullTag.includes("aff=") ||
			fullTag.includes("register?code=");
		if (isAffiliate) {
			affiliateLinks++;
			if (fullTag.includes("sponsored") && fullTag.includes("nofollow")) {
				properlyMarkedAffiliate++;
			} else {
				unmarkedAffiliate.push({ file: f, tag: fullTag });
			}
		}
	}
}

console.log("==========================================");
console.log("AFFILIATE LINK COMPLIANCE AUDIT");
console.log("==========================================");
console.log(`Total HTML files examined: ${files.length}`);
console.log(`Total <a> tags scanned: ${totalLinks}`);
console.log(`Total Affiliate Links detected: ${affiliateLinks}`);
console.log(
	`Properly Marked (sponsored + nofollow): ${properlyMarkedAffiliate}`,
);
console.log(`Unmarked Affiliate Links: ${unmarkedAffiliate.length}`);
if (unmarkedAffiliate.length > 0) {
	console.log("Sample unmarked links:");
	unmarkedAffiliate
		.slice(0, 5)
		.forEach((u) => console.log(`  [${u.file}] -> ${u.tag}`));
} else {
	console.log(">>> 100% PASS! ALL AFFILIATE LINKS ARE FULLY COMPLIANT! <<<");
}
console.log("==========================================");
