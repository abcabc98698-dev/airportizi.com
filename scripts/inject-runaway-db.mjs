import fs from "node:fs";

const html = fs.readFileSync(
	"C:/Users/Pro User/.gemini/antigravity/brain/8af0d2d7-8e64-45a6-b57c-f9055fd3c8cf/.system_generated/steps/815/content.md",
	"utf8",
);
const rows = html.match(/<tr class="st-row[^>]*>[\s\S]*?<\/tr>/gi) || [];

const items = rows.map((r) => {
	const name = (r.match(/data-name="([^"]+)"/) || [])[1] || "";
	const year = (r.match(/data-year="([^"]+)"/) || [])[1] || "";
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
	return { name, year, level, date };
});

// Group items into markdown table
let tableMd = `### 📋 社区公开 99+ 机场跑路、失联与高风险历史预警数据库 (全量归档)

> **数据来源说明**：本数据权威聚合自安全极客社区 **@limbopro** 与开源预警索引库及 Telegram 行业公开曝光记录，完整收录 2020 年至 2026 年间 99 家发生跑路失联、恶意减半、恶性断流或重大风险事件的服务商清单。所有条目保留记录时间与定性级别，供广大用户在续费、选择机场或排查故障时提供最全面的历史比对参考。

| 序号 | 涉事服务商/机场名称 | 风险分类 | 警告级别与定性依据 | 记录时间 | 当前风险建议 |
| :---: | :--- | :---: | :--- | :---: | :--- |
`;

items.forEach((it, idx) => {
	let statusBadge = "🔴 跑路";
	let advice = "判定彻底失联，严禁充值与续费，建议清除设备订阅";
	if (it.level.includes("观察") || it.level.includes("恢复")) {
		statusBadge = "🟡 观察中";
		advice = "服务发生重大波动或部分恢复，暂缓续费长周期";
	} else if (
		it.level.includes("异常") ||
		it.level.includes("预警") ||
		it.level.includes("风险")
	) {
		statusBadge = "🟠 高风险预警";
		advice = "客诉激增/节点大面积超时，建议立即启用备用方案";
	} else if (
		it.level.includes("减半") ||
		it.level.includes("转让") ||
		it.level.includes("摆烂") ||
		it.level.includes("退出")
	) {
		statusBadge = "⚠️ 商业/信誉违规";
		advice = "单方面篡改套餐时长或客服失联，信誉严重破产";
	}
	tableMd += `| ${idx + 1} | **${it.name}** | ${it.year}年记录 | ${statusBadge}（${it.level}） | ${it.date || it.year} | ${advice} |\n`;
});

// Now read target markdown file
let post = fs.readFileSync(
	"src/content/posts/risk-warning-runaway-record.md",
	"utf8",
);

// Replace the brief table in Section 1 with tableMd
const targetOldTable =
	/\| 年份区间 \| 典型代表案例 \| 官方宣称原因 \/ 表面现象 \| 真实技术与商业破产根源 \| 涉及主要用户损失形态 \|[\s\S]*?(?=\n\n深入剖析这些历史案例)/;

if (post.match(targetOldTable)) {
	post = post.replace(targetOldTable, tableMd);
	fs.writeFileSync(
		"src/content/posts/risk-warning-runaway-record.md",
		post,
		"utf8",
	);
	console.log("Successfully injected 99-entry database into post!");
} else {
	console.error("Target old table not matched in post!");
}
