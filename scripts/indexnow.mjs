/**
 * IndexNow 搜索引擎主动推送脚本
 * 支持 Bing, Yandex, Seznam, Naver 等支持 IndexNow 协议的搜索引擎
 * 官方主域: https://airportizi.com
 */

import fs from "node:fs";
import path from "node:path";

const HOST = "airportizi.com";
const KEY = "f6280db51f0842dbbe3e32e854d9241b";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const CACHE_FILE = path.resolve(process.cwd(), ".indexnow-cache.json");
const SITEMAP_FILE = path.resolve(process.cwd(), "dist/sitemap-0.xml");

async function submitToIndexNow(urlList) {
	if (!urlList || urlList.length === 0) {
		console.log("[IndexNow] 没有需要提交的 URL（无变更）。");
		return true;
	}

	console.log(
		`[IndexNow] 准备向 api.indexnow.org 提交 ${urlList.length} 个 URL...`,
	);

	const payload = {
		host: HOST,
		key: KEY,
		keyLocation: KEY_LOCATION,
		urlList: urlList.slice(0, 10000),
	};

	try {
		const res = await fetch("https://api.indexnow.org/indexnow", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(payload),
		});

		if (res.status === 200 || res.status === 202) {
			console.log(
				`[IndexNow] 提交成功！HTTP 状态码: ${res.status} (OK / Accepted)`,
			);
			return true;
		}
		const text = await res.text();
		console.warn(`[IndexNow] 提交返回状态: ${res.status} - ${text}`);
		return false;
	} catch (err) {
		console.error("[IndexNow] 网络提交出错:", err.message);
		return false;
	}
}

function parseSitemapUrls() {
	if (!fs.existsSync(SITEMAP_FILE)) {
		console.error(
			"[IndexNow] 未找到 dist/sitemap-0.xml，请先执行 pnpm build！",
		);
		process.exit(1);
	}
	const content = fs.readFileSync(SITEMAP_FILE, "utf8");
	const matches = content.match(/<loc>(.*?)<\/loc>/g);
	if (!matches) return [];
	return matches.map((m) => m.replace(/<\/?loc>/g, "").trim());
}

async function main() {
	const args = process.argv.slice(2);
	const isAll = args.includes("--all");
	const specificUrls = args.filter(
		(a) => a.startsWith("http://") || a.startsWith("https://"),
	);

	if (specificUrls.length > 0) {
		console.log(`[IndexNow] 手动指定模式: 提交 ${specificUrls.length} 个 URL`);
		await submitToIndexNow(specificUrls);
		return;
	}

	const allUrls = parseSitemapUrls();
	console.log(`[IndexNow] Sitemap 中共扫描到 ${allUrls.length} 个正式 URL`);

	if (isAll) {
		console.log("[IndexNow] 全量模式 (--all): 强制推送所有 Sitemap URL");
		const ok = await submitToIndexNow(allUrls);
		if (ok) {
			fs.writeFileSync(
				CACHE_FILE,
				JSON.stringify({ lastSubmitted: Date.now(), urls: allUrls }, null, 2),
				"utf8",
			);
		}
		return;
	}

	// 增量检查模式
	let cache = { lastSubmitted: 0, urls: [] };
	if (fs.existsSync(CACHE_FILE)) {
		try {
			cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
		} catch {
			cache = { lastSubmitted: 0, urls: [] };
		}
	}

	const cachedSet = new Set(cache.urls || []);
	const newUrls = allUrls.filter((u) => !cachedSet.has(u));

	if (newUrls.length === 0 && cache.urls && cache.urls.length > 0) {
		console.log("[IndexNow] 增量检查: 所有 URL 已在上次提交记录中，无新 URL。");
		console.log(
			"            提示: 如需强制全量提交，可运行 node scripts/indexnow.mjs --all",
		);
		return;
	}

	const urlsToSubmit = newUrls.length > 0 ? newUrls : allUrls;
	console.log(`[IndexNow] 发现 ${urlsToSubmit.length} 个需要推送的 URL`);
	const success = await submitToIndexNow(urlsToSubmit);
	if (success) {
		fs.writeFileSync(
			CACHE_FILE,
			JSON.stringify({ lastSubmitted: Date.now(), urls: allUrls }, null, 2),
			"utf8",
		);
	}
}

main();
