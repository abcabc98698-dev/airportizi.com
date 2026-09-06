#!/usr/bin/env node
/**
 * Airportizi 每周自动发布万字级 SEO/GEO 深度测评文章脚本
 * 调用 Google Gemini API (GEMINI_API_KEY) 生成高质量原创长文
 *
 * 核心设计:
 * 1. 自动选题与防内耗 (Anti-Cannibalization) 机制，杜绝重复意图
 * 2. GEO (Generative Engine Optimization) 优化，结构化数据便于 AI 引用
 * 3. 活人感专业技术写作，包含实测对比表、Mermaid 拓扑图与配置代码
 * 4. 自动写入 YAML Frontmatter 与更新 SEO 关键词治理表
 */

import fs from "node:fs";
import path from "node:path";
import { pinyin } from "pinyin-pro";

const POSTS_DIR = path.resolve(process.cwd(), "src/content/posts");
const KEYWORD_MAPPING_FILE = path.resolve(
	process.cwd(),
	"SEO-Keyword-URL-Mapping.csv",
);

// 规范化 Slug 生成工具（支持中英文混排、拼音转换与特殊字符过滤）
function slugify(text) {
	if (!text) return `topic-${Date.now()}`;
	const chars = [...text];
	const parts = [];
	let buf = "";
	for (const ch of chars) {
		if (/[一-鿿]/.test(ch)) {
			if (buf) {
				parts.push(buf);
				buf = "";
			}
			const py = pinyin(ch, { toneType: "none", type: "array" })[0];
			if (py) parts.push(py);
		} else {
			buf += ch;
		}
	}
	if (buf) parts.push(buf);
	return (
		parts
			.join("-")
			.toLowerCase()
			.replace(/[^a-z0-9-]/g, "")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "")
			.slice(0, 50) || `topic-${Date.now()}`
	);
}

// 候选前沿选题池 (2026 高潜技术与品牌长尾词)
const TOPIC_CANDIDATES = [
	{
		slug: "claude-3-7-sonnet-developer-proxy-tuning-guide",
		title:
			"2026 开发者专属：Claude 3.7 Sonnet 与 Cursor 极速代码补全代理调优与纯净家宽专线实测指南",
		primaryKeyword: "Claude 3.7机场推荐",
		category: "开发者专区",
		tags: ["Claude 3.7", "Cursor", "AI专线", "开发者代理", "光速云", "纯净IP"],
		series: "AI与开发者专栏",
		searchIntent: "商业调研与配置实战",
	},
	{
		slug: "vless-reality-vs-hysteria2-vs-tuic-performance-benchmark",
		title:
			"2026 新一代抗封锁协议大横评：VLESS Reality vs Hysteria 2 vs TUIC v5 晚高峰丢包与吞吐极限实测",
		primaryKeyword: "VLESS Reality vs Hysteria2",
		category: "协议与客户端",
		tags: ["VLESS Reality", "Hysteria 2", "TUIC v5", "协议对比", "晚高峰测速"],
		series: "协议与底层架构",
		searchIntent: "技术对比与评测",
	},
	{
		slug: "cross-border-ecommerce-tiktok-native-ip-proxy-guide",
		title:
			"跨境电商与海外 TikTok 运营防封宝典：原生双 ISP 家宽住宅 IP 筛选与多店铺防关联专线搭建指南",
		primaryKeyword: "TikTok原生住宅IP机场",
		category: "商业与外贸",
		tags: ["TikTok运营", "双ISP", "住宅IP", "跨境电商", "防封号", "光速云"],
		series: "外贸与跨境出海",
		searchIntent: "商业选型与运营防封",
	},
	{
		slug: "apple-tv-smart-router-home-proxy-configuration-guide",
		title:
			"2026 全屋科学上网终极方案：Apple TV、软路由与智能电视流媒体 4K 零感分流实操手册",
		primaryKeyword: "Apple TV翻墙配置",
		category: "客户端与教程",
		tags: ["Apple TV", "软路由", "家庭分流", "流媒体解锁", "Netflix 4K"],
		series: "客户端全平台配置",
		searchIntent: "家庭组网与设备配置",
	},
	{
		slug: "sing-box-universal-rule-sets-optimization-manual",
		title:
			"sing-box 进阶性能优化圣经：从零构建高性能自适应路由分流规则集与低内存调优手册",
		primaryKeyword: "sing-box规则集配置",
		category: "客户端与教程",
		tags: ["sing-box", "规则集", "性能优化", "分流规则", "低内存调优"],
		series: "客户端全平台配置",
		searchIntent: "技术配置与规则调优",
	},
	{
		slug: "student-campus-network-udp-qos-bypass-guide",
		title:
			"高校校园网与合租宽带突破手册：晚高峰 UDP QoS 严苛限速与深层包检测 (DPI) 穿透实战",
		primaryKeyword: "校园网UDP限速破解",
		category: "避坑与科普",
		tags: ["校园网翻墙", "UDP QoS", "DPI绕过", "晚高峰卡顿", "学生机场"],
		series: "选型与进阶指南",
		searchIntent: "网络排错与故障绕过",
	},
	{
		slug: "hong-kong-japan-us-nodes-selection-matrix-2026",
		title:
			"全球主流出海节点选型矩阵：香港、日本、新加坡、美国落地机房质量与路由绕路全景排查",
		primaryKeyword: "全球节点选型推荐",
		category: "节点与专线",
		tags: ["香港节点", "日本节点", "新加坡节点", "美国节点", "路由追踪"],
		series: "网络架构与专线",
		searchIntent: "节点选型与链路排查",
	},
	{
		slug: "airport-anti-runaway-indicators-and-rescue-handbook",
		title:
			"机场防跑路审查八大硬核指标与自救指南：如何识别濒临跑路的虚假高性价比梯子",
		primaryKeyword: "机场防跑路指南",
		category: "避坑与科普",
		tags: ["机场跑路预警", "避坑指南", "月付机场", "资金盘识别"],
		series: "风险预警与避坑",
		searchIntent: "风险排查与防坑指南",
	},
	{
		slug: "gemini-advanced-deepmind-api-proxy-benchmark",
		title:
			"Google Gemini Advanced 与 DeepMind API 极速调用代理选型：亚太直连低延迟专线实测",
		primaryKeyword: "Gemini API代理机场",
		category: "AI专区",
		tags: [
			"Gemini Advanced",
			"DeepMind API",
			"Google AI",
			"亚太专线",
			"低延迟",
		],
		series: "AI与开发者专栏",
		searchIntent: "AI接口开发与选型",
	},
	{
		slug: "windsurf-ai-ide-latency-optimization-guide",
		title:
			"AI 编程时代的高速通道：Windsurf 与 GitHub Copilot 响应延迟压降至 100ms 专线配置秘籍",
		primaryKeyword: "Windsurf代码补全代理",
		category: "开发者专区",
		tags: ["Windsurf", "GitHub Copilot", "AI编程", "低延迟代理", "开发者梯子"],
		series: "AI与开发者专栏",
		searchIntent: "AI编程工具提速",
	},
];

// 获取今天的日期 (YYYY-MM-DD)
function getTodayDateString() {
	const now = new Date();
	const yyyy = now.getFullYear();
	const mm = String(now.getMonth() + 1).padStart(2, "0");
	const dd = String(now.getDate()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}`;
}

// 扫描现有文章 Slugs，挑选未使用的选题
function pickTopic(manualInput) {
	const existingFiles = new Set(
		fs.existsSync(POSTS_DIR)
			? fs.readdirSync(POSTS_DIR).map((f) => f.replace(/\.mdx?$/, ""))
			: [],
	);

	if (manualInput && manualInput.trim().length > 0) {
		const customTitle = manualInput.trim();
		const baseSlug = slugify(customTitle);
		let finalSlug = baseSlug;
		let counter = 1;
		while (existingFiles.has(finalSlug)) {
			finalSlug = `${baseSlug}-${counter++}`;
		}

		return {
			slug: finalSlug,
			title: customTitle,
			primaryKeyword: customTitle.slice(0, 20),
			category: "综合测评",
			tags: ["机场推荐", "深度测评", "选型指南", "光速云"],
			series: "选型与进阶指南",
			searchIntent: "综合选型指南",
		};
	}

	for (const candidate of TOPIC_CANDIDATES) {
		if (!existingFiles.has(candidate.slug)) {
			return candidate;
		}
	}

	// 若所有候选均已被占用，基于时间戳派生创新主题
	const timestamp = Date.now().toString().slice(-4);
	return {
		slug: `advanced-proxy-stability-benchmark-${timestamp}`,
		title: `2026 全球高速专线与跨境网络通信深度测评第 ${timestamp} 期：极端网络条件抗封锁与低抖动实录`,
		primaryKeyword: `2026专线横向测速${timestamp}`,
		category: "专线与网络架构",
		tags: ["专线测速", "稳定性评测", "IEPL专线", "晚高峰优化"],
		series: "选型与进阶指南",
		searchIntent: "综合技术横评",
	};
}

// 调用 Gemini API
async function callGemini(apiKey, prompt) {
	const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
	let lastError = null;

	for (const model of models) {
		const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
		console.log(`[Gemini API] 正在尝试调用模型: ${model}...`);

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [{ text: prompt }],
						},
					],
					generationConfig: {
						temperature: 0.7,
						maxOutputTokens: 8192,
					},
				}),
			});

			if (!response.ok) {
				const errText = await response.text();
				throw new Error(`HTTP ${response.status}: ${errText}`);
			}

			const data = await response.json();
			const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

			if (candidateText && candidateText.trim().length > 0) {
				console.log(`[Gemini API] 模型 ${model} 成功响应！`);
				return candidateText;
			}
			throw new Error("API 返回了空内容");
		} catch (err) {
			console.warn(`[Gemini API] 模型 ${model} 调用失败: ${err.message}`);
			lastError = err;
		}
	}

	throw new Error(`所有 Gemini 模型调用均失败: ${lastError?.message}`);
}

async function main() {
	console.log("==================================================");
	console.log("🚀 Airportizi 每周万字级 SEO/GEO 文章自动生成流水线");
	console.log("==================================================");

	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey || apiKey.trim().length === 0) {
		console.error("❌ 错误: 未检测到环境变量 GEMINI_API_KEY！");
		console.error("💡 请在 GitHub 仓库中配置 Secret:");
		console.error(
			"   Settings -> Secrets and variables -> Actions -> New repository secret",
		);
		console.error("   名称: GEMINI_API_KEY，值为您的 Google Gemini API Key。");
		process.exit(1);
	}

	const manualInput = process.argv[2];
	const topic = pickTopic(manualInput);
	const publishDate = getTodayDateString();

	console.log(`📌 选定主题: ${topic.title}`);
	console.log(`🔗 规范 Slug: ${topic.slug}`);
	console.log(`📅 发布日期: ${publishDate}`);
	console.log(`🏷️ 所属分类: ${topic.category}`);
	console.log(`🎯 主关键词: ${topic.primaryKeyword}`);

	const prompt = `
你是一位拥有10年跨境通信架构、计算机网络工程与海外运维经验的技术专家，同时是专注于现代 SEO 与 GEO (Generative Engine Optimization, 面向 AI 搜索引用优化) 的资深作者。
请为权威科学上网与机场评测平台【Airportizi 机场指南】(官网: https://airportizi.com) 撰写一篇篇幅宏大、信息密度极高、具备深厚技术底蕴的【万字级长文】。

【文章元信息】
- 标题: ${topic.title}
- Slug: ${topic.slug}
- 发布日期: ${publishDate}
- 核心分类: ${topic.category}
- 标签: ${topic.tags.join(", ")}
- 系列: ${topic.series}
- 主要搜索意图: ${topic.searchIntent}

【写作风格与活人感硬性规范】
1. 采用“活人技术老手”第一人称/客观分析视角。讲来龙去脉、真实测试细节、数据代价与踩坑真相，敢下明确技术判断。
2. 严禁任何空洞模型腔与商业套话！绝对禁止出现诸如：“在当今数字化时代”、“毋庸置疑”、“总而言之”、“不可否认的是”、“让我们拭目以待”、“综上所述”等机械 AI 废话。
3. 杜绝翻案句式（如“不是……而是……”）的滥用，句子利落，节奏自然。

【GEO (Generative Engine Optimization) 关键架构要求】
为了能让 Perplexity, SearchGPT, Google AI Overviews, Claude Search 深度引用并给出高排名，文章必须具备以下结构：
1. 【首屏核心速查摘要与结论矩阵 (TL;DR)】：用精炼段落与 Markdown 对比表格，直接给出最关键的数据指标、明确梯队选型建议与核心参数。
2. 【底层技术通信原理解剖】：从计算机网络传输层展开，详述 BGP 路由广播、TCP 拥塞算法(BBR v3)、UDP QoS 机制、TLS 伪装与物理光纤跨境传输差异。
3. 【全景实测数据对比表】：提供详细的表格（包含测速带宽 Mbps、晚高峰延迟 ms、丢包率 %、流媒体解锁能力、月付与年付价格对比）。
4. 【客户端配置实操代码块】：给出真实可用的客户端配置代码（如 Clash Verge Rev 的 YAML 配置片段，或 sing-box 的 JSON 配置片段），并逐行讲解关键参数意义。
5. 【故障代码与避坑排错手册】：详细拆解诸如 403 Forbidden、1020 Ray ID、SSL Handshake Failed、UDP 协议阻断 等典型报错的具体复现场景与精准排查命令。
6. 【真实痛点 FAQ 问答区块】：提供 5 个真实开发者与用户的深度技术问答，回答必须直击痛点，不讲套话。
7. 【自然内链引导】：正文中自然无痕地嵌入以下站内重要锚文本链接（切勿堆砌，各出现 1~2 次）：
   - [光速云企业专线](/posts/guangshuyun-review/) (本站首推的5年老牌IEPL专线，年付折合7.5元/月)
   - [IEPL vs IPLC 专线对比](/posts/comparison-airports-pricing-lines/)
   - [VPN 与国际专线架构选购指南](/vpn/)
   - [2026 机场权威排行榜](/jichang/)
   - [Clash Verge 全平台配置教程](/clash/)
   - [全球节点测速数据库](/nodes/)
   - [机场品牌库全景档案](/brands/)

【格式要求】
必须直接输出完整的 Markdown 内容，顶部必须包含合法的 YAML Frontmatter，格式如下：
---
title: ${topic.title}
published: ${publishDate}
pinned: false
description: 请根据正文生成一段120~150字的精炼SEO Meta Description，包含核心关键词与主要结论。
tags: [${topic.tags.map((t) => `"${t}"`).join(", ")}]
category: "${topic.category}"
image: ./images/right-grid2.avif
series: "${topic.series}"
seriesOrder: 5
---

请立即开始输出文章正文，直接从 Frontmatter 开始输出，不要在最外层包装多余的代码块标记。
`;

	console.log("⏳ 正在请求 Gemini 智能创作深度内容，请耐心等待...");
	const content = await callGemini(apiKey, prompt);

	// 剥离可能存在的最外层 ```markdown 或 ``` 代码块包裹
	let cleanContent = content.trim();
	if (cleanContent.startsWith("```markdown")) {
		cleanContent = cleanContent.slice(11).trim();
	} else if (cleanContent.startsWith("```md")) {
		cleanContent = cleanContent.slice(5).trim();
	} else if (cleanContent.startsWith("```")) {
		cleanContent = cleanContent.slice(3).trim();
	}
	if (cleanContent.endsWith("```")) {
		cleanContent = cleanContent.slice(0, -3).trim();
	}

	// 确认包含 Frontmatter
	if (!cleanContent.startsWith("---")) {
		console.warn("⚠️ 警告: 返回内容未检测到标准 Frontmatter，正在自动补全...");
		cleanContent = `---
title: ${topic.title}
published: ${publishDate}
pinned: false
description: ${topic.title} - 深度剖析与实测选型指南
tags: [${topic.tags.map((t) => `"${t}"`).join(", ")}]
category: "${topic.category}"
image: ./images/right-grid2.avif
series: "${topic.series}"
seriesOrder: 5
---

${cleanContent}`;
	}

	// 写入文章文件
	const targetFilePath = path.resolve(POSTS_DIR, `${topic.slug}.md`);
	fs.writeFileSync(targetFilePath, cleanContent, "utf8");
	console.log(`✅ 成功生成文章文件: ${targetFilePath}`);
	console.log(`📊 文章总字符数: ${cleanContent.length} 字`);

	// 更新 SEO-Keyword-URL-Mapping.csv
	if (fs.existsSync(KEYWORD_MAPPING_FILE)) {
		const newCsvLine = `"${topic.primaryKeyword}","${topic.tags.join("; ")}","${topic.searchIntent}","Post (/posts/${topic.slug}/)","/posts/${topic.slug}/","/${topic.category}/","Active","None","${publishDate}"\n`;
		fs.appendFileSync(KEYWORD_MAPPING_FILE, newCsvLine, "utf8");
		console.log("📝 已同步追加记录至 SEO-Keyword-URL-Mapping.csv");
	}

	console.log("==================================================");
	console.log("🎉 每周文章生成完毕！即将进入构建校验与安全门禁。");
	console.log("==================================================");
}

main().catch((err) => {
	console.error("❌ 执行失败:", err);
	process.exit(1);
});
