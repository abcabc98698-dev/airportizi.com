const urls = [
	"http://localhost:4321/posts/recommend-stable-cheap-airports-2026/",
	"http://localhost:4321/posts/airport-rankings-2026-pricing-lines-nodes-stability/",
	"http://localhost:4321/posts/comparison-airports-pricing-lines/",
	"http://localhost:4321/posts/vpn-vs-iepl-dedicated-line-guide/",
	"http://localhost:4321/posts/ai-airports-chatgpt-claude-gemini-comparison-guide/",
	"http://localhost:4321/posts/recommend-2026-best-airports/",
	"http://localhost:4321/posts/ranking-overall-performance-stability/",
];

async function run() {
	for (const u of urls) {
		try {
			const res = await fetch(u);
			const text = await res.text();
			const titleMatch = text.match(/<title>([^<]*)<\/title>/);
			console.log(
				`[${res.status}] ${u} -> ${titleMatch ? titleMatch[1] : "No title"}`,
			);
		} catch (err) {
			console.error(`FAIL: ${u}`, err.message);
		}
	}
}

run();
