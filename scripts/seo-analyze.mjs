import fs from "node:fs";

const posts = JSON.parse(fs.readFileSync("scripts/posts-dump.json", "utf8"));

console.log(`Loaded ${posts.length} posts.`);

// Group posts by topic keywords
const clusters = {
	AI专区: [],
	价格与预算: [],
	运营商线路: [],
	客户端生态: [],
	国家与节点: [],
	品牌评测: [],
	综合排行与对比: [],
	协议与专线技术: [],
	计费周期与流量包: [],
	新手与教程: [],
	安全合规与风险: [],
	其他: [],
};

posts.forEach((p) => {
	const f = p.file.toLowerCase();
	const t = p.title.toLowerCase();

	if (f.startsWith("brand-") || f.includes("guangshuyun-review")) {
		clusters["品牌评测"].push(p);
	} else if (
		f.includes("chatgpt") ||
		f.includes("claude") ||
		f.includes("gemini") ||
		f.includes("cursor") ||
		f.includes("ai-")
	) {
		clusters["AI专区"].push(p);
	} else if (
		f.includes("telecom") ||
		f.includes("unicom") ||
		f.includes("china-mobile") ||
		f.includes("three-major-carriers")
	) {
		clusters["运营商线路"].push(p);
	} else if (
		f.includes("clash") ||
		f.includes("sing-box") ||
		f.includes("v2rayn") ||
		f.includes("shadowrocket") ||
		f.includes("client") ||
		f.includes("windows-") ||
		f.includes("mac-") ||
		f.includes("android-") ||
		f.includes("iphone-")
	) {
		clusters["客户端生态"].push(p);
	} else if (
		f.includes("us-") ||
		f.includes("singapore-") ||
		f.includes("japan-") ||
		f.includes("hong-kong-") ||
		f.includes("global-nodes")
	) {
		clusters["国家与节点"].push(p);
	} else if (
		f.includes("ranking") ||
		f.includes("comparison") ||
		f.includes("vpn-vs-iepl")
	) {
		clusters["综合排行与对比"].push(p);
	} else if (
		f.includes("iepl") ||
		f.includes("routes-bgp") ||
		f.includes("dedicated-lines")
	) {
		clusters["协议与专线技术"].push(p);
	} else if (
		f.includes("annual") ||
		f.includes("monthly") ||
		f.includes("billing") ||
		f.includes("ten-yuan") ||
		f.includes("no-expiration") ||
		f.includes("small-traffic") ||
		f.includes("large-traffic") ||
		f.includes("60gb") ||
		f.includes("cheap-airports")
	) {
		clusters["计费周期与流量包"].push(p);
	} else if (
		f.includes("student-airports") ||
		f.includes("first-time-buying") ||
		f.includes("troubleshooting")
	) {
		clusters["新手与教程"].push(p);
	} else if (f.includes("risk-") || f.includes("proxy-security")) {
		clusters["安全合规与风险"].push(p);
	} else {
		clusters["其他"].push(p);
	}
});

console.log("\n=== CLUSTER DISTRIBUTION ===");
for (const [cluster, items] of Object.entries(clusters)) {
	console.log(`- ${cluster}: ${items.length} 篇`);
}

// Find potential title similarities within each cluster
console.log("\n=== CHECKING HIGH SIMILARITY PAIRS ===");
const conflicts = [];

for (const [cluster, items] of Object.entries(clusters)) {
	for (let i = 0; i < items.length; i++) {
		for (let j = i + 1; j < items.length; j++) {
			const a = items[i];
			const b = items[j];

			// calculate token overlap in titles
			const wordsA = new Set(a.title.split(/[\s：，、与和（）()]+/));
			const wordsB = new Set(b.title.split(/[\s：，、与和（）()]+/));
			let intersection = 0;
			for (const w of wordsA) {
				if (w.length > 1 && wordsB.has(w)) intersection++;
			}

			if (intersection >= 3) {
				conflicts.push({
					cluster,
					postA: { file: a.file, title: a.title, url: a.url },
					postB: { file: b.file, title: b.title, url: b.url },
					commonTokens: intersection,
				});
			}
		}
	}
}

console.log(`Found ${conflicts.length} pairs with significant title overlap:`);
conflicts.forEach((c, idx) => {
	console.log(`\n[${idx + 1}] [${c.cluster}] Overlap count: ${c.commonTokens}`);
	console.log(`  A: ${c.postA.file} -> ${c.postA.title}`);
	console.log(`  B: ${c.postB.file} -> ${c.postB.title}`);
});

fs.writeFileSync(
	"scripts/conflicts-analysis.json",
	JSON.stringify({ clusters, conflicts }, null, 2),
);
