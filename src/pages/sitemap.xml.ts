import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
	const siteUrl = import.meta.env.SITE || "https://airportizi.com";
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${new URL("sitemap-0.xml", siteUrl).href}</loc>
  </sitemap>
</sitemapindex>`.trim();

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
