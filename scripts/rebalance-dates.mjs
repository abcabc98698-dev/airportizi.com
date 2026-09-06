import fs from "node:fs";
import path from "node:path";

// Exact chronological schedule: 85 articles -> 85 distinct dates
const schedule = [
	// 1. Foundation & Beginner (Jan 2 to Jan 14)
	{ file: "first-time-buying-airport-beginner-guide.md", date: "2026-01-02" },
	{
		file: "airport-routes-bgp-iepl-iplc-cn2-9929-guide.md",
		date: "2026-01-04",
	},
	{ file: "vpn-vs-iepl-dedicated-line-guide.md", date: "2026-01-06" },
	{ file: "client-setup-clash-verge-shadowrocket.md", date: "2026-01-08" },
	{ file: "free-trial-discount-coupon-codes.md", date: "2026-01-10" },
	{ file: "cheap-airports-low-budget-plans-guide.md", date: "2026-01-12" },
	{ file: "ten-yuan-budget-airports-selection-guide.md", date: "2026-01-14" },

	// 2. Early Brands & Core Lines (Jan 16 to Jan 31)
	{ file: "guangshuyun-review.md", date: "2026-01-16" },
	{ file: "brand-xingdaomeng-review.md", date: "2026-01-17" },
	{ file: "brand-weifeng-review.md", date: "2026-01-19" },
	{ file: "brand-feimaoyun-review.md", date: "2026-01-21" },
	{ file: "brand-weitu-review.md", date: "2026-01-23" },
	{ file: "brand-ermaoyun-review.md", date: "2026-01-25" },
	{ file: "brand-yifanyun-review.md", date: "2026-01-27" },
	{ file: "yuzhouyun-review-8-yuan.md", date: "2026-01-28" },
	{ file: "iepl-airports-dedicated-lines-guide-2026.md", date: "2026-01-30" },
	{
		file: "dedicated-lines-iepl-iplc-vs-standard-transit-guide.md",
		date: "2026-01-31",
	},

	// 3. ISP Carriers & Line Optimization (Feb 2 to Feb 14)
	{
		file: "telecom-broadband-airport-line-selection-guide.md",
		date: "2026-02-02",
	},
	{
		file: "unicom-broadband-airports-node-selection-guide.md",
		date: "2026-02-04",
	},
	{
		file: "china-mobile-network-airports-selection-guide.md",
		date: "2026-02-06",
	},
	{
		file: "three-major-carriers-optimized-airports-guide.md",
		date: "2026-02-08",
	},
	{
		file: "cheap-iepl-airports-low-budget-dedicated-lines-guide.md",
		date: "2026-02-09",
	},
	{
		file: "low-latency-airports-ping-measurement-guide.md",
		date: "2026-02-11",
	},
	{ file: "peak-hours-stable-airports-selection-guide.md", date: "2026-02-13" },
	{ file: "most-stable-airports-long-term-guide-2026.md", date: "2026-02-14" },

	// 4. Clients Ecosystem & Multi-Platform (Feb 16 to Feb 28)
	{ file: "clash-airports-subscription-guide.md", date: "2026-02-16" },
	{
		file: "clash-verge-windows-airports-selection-guide.md",
		date: "2026-02-17",
	},
	{ file: "v2rayn-windows-airports-subscription-guide.md", date: "2026-02-18" },
	{
		file: "windows-airports-clash-verge-vs-v2rayn-guide.md",
		date: "2026-02-19",
	},
	{ file: "mac-airports-macos-user-guide.md", date: "2026-02-21" },
	{ file: "android-airports-clients-selection-guide.md", date: "2026-02-22" },
	{
		file: "iphone-airports-shadowrocket-selection-guide.md",
		date: "2026-02-23",
	},
	{ file: "shadowrocket-airports-iphone-guide.md", date: "2026-02-24" },
	{
		file: "sing-box-airports-multi-platform-selection-guide.md",
		date: "2026-02-25",
	},
	{
		file: "clients-comparison-clash-verge-sing-box-surge-loon.md",
		date: "2026-02-27",
	},
	{
		file: "multi-device-airports-simultaneous-connection-guide.md",
		date: "2026-02-28",
	},

	// 5. Brands & Billing/Data Models (Mar 1 to Mar 15)
	{ file: "brand-guangnianti-review.md", date: "2026-03-01" },
	{ file: "brand-jilianyun-review.md", date: "2026-03-02" },
	{ file: "brand-kexinyun-review.md", date: "2026-03-03" },
	{ file: "brand-kuaili-review.md", date: "2026-03-04" },
	{ file: "brand-lingmao-review.md", date: "2026-03-05" },
	{ file: "brand-quanqiuyun-review.md", date: "2026-03-06" },
	{ file: "brand-sogoyun-review.md", date: "2026-03-07" },
	{ file: "brand-sujie-review.md", date: "2026-03-08" },
	{ file: "brand-u1s1-review.md", date: "2026-03-09" },
	{
		file: "airport-billing-cycles-monthly-quarterly-yearly-comparison-guide.md",
		date: "2026-03-11",
	},
	{
		file: "monthly-payment-airports-no-annual-plan-guide.md",
		date: "2026-03-12",
	},
	{ file: "annual-payment-airports-long-term-guide.md", date: "2026-03-14" },
	{ file: "no-expiration-pay-as-you-go-airports-guide.md", date: "2026-03-15" },

	// 6. Traffic Quotas & Selection Decisions (Mar 16 to Mar 25)
	{ file: "60gb-small-traffic-budget-airports-guide.md", date: "2026-03-16" },
	{
		file: "small-traffic-airports-50gb-100gb-plans-guide.md",
		date: "2026-03-17",
	},
	{
		file: "large-traffic-airports-200gb-plus-comparison-guide.md",
		date: "2026-03-18",
	},
	{
		file: "student-airports-low-budget-small-traffic-guide.md",
		date: "2026-03-19",
	},
	{
		file: "cost-effective-airports-pricing-traffic-lines.md",
		date: "2026-03-21",
	},
	{
		file: "reliable-airports-selection-indicators-guide.md",
		date: "2026-03-22",
	},
	{
		file: "which-airport-is-best-guide-budget-scenarios.md",
		date: "2026-03-23",
	},
	{ file: "recommend-stable-cheap-airports-2026.md", date: "2026-03-24" },
	{ file: "comparison-airports-pricing-lines.md", date: "2026-03-25" },

	// 7. Regional Nodes & Streaming (Mar 26 to Apr 5)
	{ file: "global-nodes-speedtest-benchmark-guide.md", date: "2026-03-26" },
	{
		file: "hong-kong-nodes-low-latency-airports-selection-guide.md",
		date: "2026-03-27",
	},
	{
		file: "japan-nodes-ai-streaming-airports-selection-guide.md",
		date: "2026-03-28",
	},
	{
		file: "singapore-nodes-low-latency-ai-airports-selection-guide.md",
		date: "2026-03-29",
	},
	{
		file: "us-nodes-chatgpt-claude-streaming-airports-guide.md",
		date: "2026-03-30",
	},
	{
		file: "us-native-ip-airports-ai-streaming-selection-guide.md",
		date: "2026-03-31",
	},
	{
		file: "streaming-airports-netflix-youtube-disney-comparison-guide.md",
		date: "2026-04-01",
	},
	{ file: "netflix-streaming-unlock-airports-guide.md", date: "2026-04-02" },
	{
		file: "youtube-4k-airports-speed-traffic-routes-guide.md",
		date: "2026-04-03",
	},
	{
		file: "airports-comparison-price-traffic-stability-guide.md",
		date: "2026-04-04",
	},
	{
		file: "airport-rankings-2026-pricing-lines-nodes-stability.md",
		date: "2026-04-05",
	},

	// 8. AI Ecosystem, Developers, Risk & Flagship Pillars (Apr 6 to Apr 21)
	{ file: "ai-chatgpt-claude-cursor-airports.md", date: "2026-04-06" },
	{ file: "chatgpt-airports-openai-selection-guide.md", date: "2026-04-07" },
	{ file: "chatgpt-native-ip-airports-guide.md", date: "2026-04-08" },
	{ file: "claude-airports-ip-node-selection-guide.md", date: "2026-04-09" },
	{
		file: "claude-native-ip-airports-routes-regions-guide.md",
		date: "2026-04-10",
	},
	{
		file: "claude-code-developer-airports-selection-guide.md",
		date: "2026-04-11",
	},
	{ file: "gemini-airports-google-ai-selection-guide.md", date: "2026-04-12" },
	{
		file: "ai-developer-airports-chatgpt-claude-gemini-selection-guide.md",
		date: "2026-04-13",
	},
	{
		file: "ai-airports-chatgpt-claude-gemini-comparison-guide.md",
		date: "2026-04-14",
	},
	{
		file: "cursor-claude-code-ai-developer-proxy-tuning-guide.md",
		date: "2026-04-15",
	},
	{
		file: "programmer-airports-github-ai-developer-tools-guide.md",
		date: "2026-04-16",
	},
	{
		file: "troubleshooting-proxy-connection-failed-guide.md",
		date: "2026-04-17",
	},
	{ file: "risk-warning-runaway-record.md", date: "2026-04-18" },
	{ file: "proxy-security-privacy-compliance-guide.md", date: "2026-04-19" },
	{ file: "ranking-overall-performance-stability.md", date: "2026-04-20" },
	{ file: "recommend-2026-best-airports.md", date: "2026-04-21" },
];

console.log(`Schedule contains ${schedule.length} posts.`);

// Verify uniqueness of dates
const dateSet = new Set();
schedule.forEach((s) => {
	if (dateSet.has(s.date)) {
		console.error(`DUPLICATE date: ${s.date} in schedule!`);
	}
	dateSet.add(s.date);
});
console.log(`Unique dates: ${dateSet.size} out of ${schedule.length}`);

// Verify all files exist in src/content/posts
const existingFiles = new Set(
	fs.readdirSync("src/content/posts").filter((f) => f.endsWith(".md")),
);
schedule.forEach((s) => {
	if (!existingFiles.has(s.file)) {
		console.error(`ERROR: File not found: ${s.file}`);
	}
});
existingFiles.forEach((f) => {
	if (!schedule.find((s) => s.file === f)) {
		console.error(`ERROR: Existing file missing from schedule: ${f}`);
	}
});

// Update published date in each file
let updatedCount = 0;
schedule.forEach((s) => {
	const filePath = path.join("src/content/posts", s.file);
	const content = fs.readFileSync(filePath, "utf8");

	// Replace published: ...
	const newContent = content.replace(
		/^published:\s*([^\r\n]+)/m,
		`published: ${s.date}`,
	);
	if (newContent !== content) {
		fs.writeFileSync(filePath, newContent, "utf8");
		updatedCount++;
	}
});

console.log(`Updated dates in ${updatedCount} files.`);
