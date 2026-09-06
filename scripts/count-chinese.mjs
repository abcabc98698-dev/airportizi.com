import fs from "node:fs";

export function analyzeMarkdown(filePath) {
	if (!fs.existsSync(filePath)) {
		console.error(`File not found: ${filePath}`);
		return null;
	}

	const raw = fs.readFileSync(filePath, "utf8");
	const fileSizeKB = (Buffer.byteLength(raw, "utf8") / 1024).toFixed(2);

	// 1. Remove Frontmatter
	let text = raw.replace(/^---[\s\S]*?---\s*/, "");

	// 2. Count & Remove Mermaid
	const mermaidMatches = text.match(/```mermaid[\s\S]*?```/g) || [];
	const mermaidCount = mermaidMatches.length;
	text = text.replace(/```mermaid[\s\S]*?```/g, "");

	// 3. Count & Remove Code blocks (bash, powershell, yaml, json, etc.)
	const codeMatches = text.match(/```[\s\S]*?```/g) || [];
	const codeCount = codeMatches.length;
	text = text.replace(/```[\s\S]*?```/g, "");

	// 4. Remove inline code
	text = text.replace(/`[^`]+`/g, "");

	// 5. Remove HTML tags
	text = text.replace(/<[^>]+>/g, "");

	// 6. Remove Markdown links, retaining label: [label](url) -> label
	text = text.replace(/!\[.*?\]\(.*?\)/g, "");
	text = text.replace(/\[(.*?)\]\(.*?\)/g, "$1");

	// 7. Remove raw URLs
	text = text.replace(/https?:\/\/\S+/g, "");

	// 8. Count H2, H3
	const h2Matches = raw.match(/^##\s+.+$/gm) || [];
	const h3Matches = raw.match(/^###\s+.+$/gm) || [];

	// 9. Count cases & FAQs
	const caseMatches = raw.match(/案例[一二三四五12345]|^###\s+案例/gm) || [];
	const contentBody = raw.replace(/^---[\s\S]*?---\s*/, "");
	const sections = contentBody.split(/\n##\s+/);
	const faqSection = sections.find(
		(s) => s.includes("常见问题") || s.includes("FAQ"),
	);
	const faqMatches = faqSection ? faqSection.match(/\n###\s+/g) || [] : [];

	// 10. Remove Table delimiters, headers, borders
	text = text.replace(/\|/g, " ");
	text = text.replace(/[-:]{3,}/g, " ");

	// 11. Remove markdown structural characters
	text = text.replace(/^[#>\-*+]\s*/gm, "");

	// 12. Pure Chinese character matching
	const chineseMatches = text.match(/[\u4e00-\u9fa5]/g) || [];
	const pureChineseCount = chineseMatches.length;

	// Total characters excluding spaces
	const totalCharsNoSpace = text.replace(/\s+/g, "").length;

	return {
		fileSizeKB,
		pureChineseCount,
		totalCharsNoSpace,
		h2Count: h2Matches.length,
		h3Count: h3Matches.length,
		mermaidCount,
		codeCount,
		caseCount: caseMatches.length,
		faqCount: faqMatches.length,
		isPass: pureChineseCount >= 7500,
	};
}

if (process.argv[2]) {
	const res = analyzeMarkdown(process.argv[2]);
	if (res) {
		console.log("================ 文章自动验收结果 ================");
		console.log(`Markdown 文件大小：${res.fileSizeKB} KB`);
		console.log(`纯中文字符数：${res.pureChineseCount}`);
		console.log(`总有效非空字符数：${res.totalCharsNoSpace}`);
		console.log(`H2 核心章节：${res.h2Count}`);
		console.log(`H3 子章节：${res.h3Count}`);
		console.log(`Mermaid 数量：${res.mermaidCount}`);
		console.log(`代码块数量：${res.codeCount}`);
		console.log(`实战案例数量：${res.caseCount}`);
		console.log(`FAQ 数量：${res.faqCount}`);
		console.log("正文最低要求：7500 纯中文字符");
		console.log(`验收结论：${res.isPass ? "PASS ✅" : "FAIL ❌"}`);
		console.log("================================================");
	}
}
