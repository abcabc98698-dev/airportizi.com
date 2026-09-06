import fs from "node:fs";

const html = fs.readFileSync(
	"C:/Users/Pro User/.gemini/antigravity/brain/8af0d2d7-8e64-45a6-b57c-f9055fd3c8cf/.system_generated/steps/815/content.md",
	"utf8",
);
const rows = html.match(/<tr class="st-row[^>]*>[\s\S]*?<\/tr>/gi) || [];
console.log("Total rows found in jichangcha:", rows.length);

const items = rows.map((r) => {
	const name = (r.match(/data-name="([^"]+)"/) || [])[1] || "";
	const year = (r.match(/data-year="([^"]+)"/) || [])[1] || "";
	const cat = (r.match(/data-cat="([^"]+)"/) || [])[1] || "";
	const levelMatch = r.match(
		/<span[^>]*class="[^"]*rounded-full[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/span>/,
	);
	const level = levelMatch ? levelMatch[1].replace(/<[^>]+>/g, "").trim() : "";
	const dateMatch =
		r.match(/<td[^>]*class="[^"]*tabular-nums[^"]*"[^>]*>([\s\S]*?)<\/td>/g) ||
		[];
	const date = dateMatch[1]
		? dateMatch[1]
				.replace(/<[^>]+>/g, "")
				.replace(/\$/g, "")
				.trim()
		: "";
	const sourceMatch = r.match(/href="([^"]+)"/);
	const source = sourceMatch ? sourceMatch[1] : "";
	return { name, year, cat, level, date, source };
});

console.log("Sample items:", items.slice(0, 10));

// Output markdown table
let md =
	"| 序号 | 涉事机场/服务名称 | 类型/警告级别 | 记录时间 | 历史背景与原因复盘 |\n| :---: | :--- | :--- | :---: | :--- |\n";
items.forEach((it, idx) => {
	let statusIcon = "🔴 跑路";
	if (
		it.level.includes("观察") ||
		it.level.includes("预警") ||
		it.level.includes("风险")
	) {
		statusIcon = `🟡 ${it.level}`;
	} else if (it.level.includes("跑路")) {
		statusIcon = "🔴 确认跑路";
	} else {
		statusIcon = `⚠️ ${it.level}`;
	}
	md += `| ${idx + 1} | **${it.name}** | ${statusIcon} | ${it.date || it.year} | 社区公开发帖预警，涉及${it.level}，停止充值 |\n`;
});

fs.writeFileSync("scripts/jichangcha-table.txt", md, "utf8");
console.log(
	"Wrote table to scripts/jichangcha-table.txt, total:",
	items.length,
);
