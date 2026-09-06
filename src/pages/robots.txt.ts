import type { APIRoute } from "astro";

export const prerender = true;

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /_astro/
Disallow: /archive/?*
Disallow: /search/?*
Disallow: /dynamic/comments/

# 明确支持主流中文与国际搜索引擎爬虫
User-agent: Googlebot
Allow: /

User-agent: bingbot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: yisouspider
Allow: /

Sitemap: ${new URL("sitemap.xml", import.meta.env.SITE).href}
Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
