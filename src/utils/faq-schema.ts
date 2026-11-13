export interface FaqSchemaItem {
	question: string;
	answer: string;
}

/**
 * 清理 Markdown 语法，保留纯文本用于 JSON-LD FAQPage 摘要。
 */
function stripMarkdown(input: string): string {
	return input
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, "")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/^>\s?/gm, "")
		.replace(/^[-*+]\s+/gm, "")
		.replace(/^\d+\.\s+/gm, "")
		.replace(/\*\*([^*]+)\*\*/g, "$1")
		.replace(/__([^_]+)__/g, "$1")
		.replace(/\*([^*]+)\*/g, "$1")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

/**
 * 从文章 Markdown 正文的 FAQ / 常见问题章节提取问答对，
 * 仅提取与页面实际正文一致的结构化问答。
 */
export function extractFaqItemsFromMarkdown(markdown: string): FaqSchemaItem[] {
	if (!markdown) return [];

	const normalized = markdown.replace(/\r\n/g, "\n");
	const headerMatch = normalized.match(
		/^##\s+[^\n]*(?:FAQ|常见问题|高频问题|疑难解答|疑问解答)[^\n]*$/im,
	);
	if (!headerMatch || headerMatch.index === undefined) return [];

	const afterHeader = normalized.slice(
		headerMatch.index + headerMatch[0].length,
	);
	const nextSectionMatch = afterHeader.match(/\n(?:---+\s*\n+)?##\s+[^#\n]/);
	const sectionBody =
		nextSectionMatch?.index !== undefined
			? afterHeader.slice(0, nextSectionMatch.index)
			: afterHeader;

	const headingRegex = /^(?:#{3,4}\s+)+([^\n]+)$/gm;
	const matches = [...sectionBody.matchAll(headingRegex)];
	if (matches.length === 0) return [];

	const items: FaqSchemaItem[] = [];
	for (let i = 0; i < matches.length; i++) {
		const rawHeading = matches[i][1]
			.replace(/^#+\s*/, "")
			.replace(/^\*{1,2}|\*{1,2}$/g, "")
			.trim();
		const question = stripMarkdown(rawHeading);
		if (!question || question.length < 4) continue;

		const start = (matches[i].index ?? 0) + matches[i][0].length;
		const end =
			i + 1 < matches.length
				? (matches[i + 1].index ?? sectionBody.length)
				: sectionBody.length;

		let rawAnswer = sectionBody.slice(start, end).trim();
		rawAnswer = rawAnswer.replace(/\n---\s*$/g, "").trim();
		const cleanAnswer = stripMarkdown(rawAnswer)
			.replace(/^(?:答|回答)[：:]\s*/i, "")
			.trim();

		if (cleanAnswer.length >= 15) {
			items.push({
				question,
				answer:
					cleanAnswer.length > 600
						? `${cleanAnswer.slice(0, 597)}...`
						: cleanAnswer,
			});
		}
	}

	return items;
}

export function buildFaqPageEntity(
	items: FaqSchemaItem[],
): Record<string, unknown> {
	return {
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}
