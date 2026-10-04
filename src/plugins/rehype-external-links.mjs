import { visit } from "unist-util-visit";

const INFORMATIONAL_DOMAINS = [
	"github.com",
	"github.io",
	"wikipedia.org",
	"w3.org",
	"mozilla.org",
	"microsoft.com",
	"apple.com",
	"google.com",
	"cloudflare.com",
	"astro.build",
	"jsdelivr.net",
	"npmjs.com",
	"openai.com",
	"anthropic.com",
	"speedtest.net",
	"fast.com",
	"ipinfo.io",
	"bgp.he.net",
];

function isAffiliateOrSponsored(urlStr) {
	try {
		const u = new URL(urlStr);
		const host = u.hostname.toLowerCase();
		if (
			u.searchParams.has("code") ||
			u.searchParams.has("aff") ||
			u.searchParams.has("aff_id") ||
			u.searchParams.has("r") ||
			u.searchParams.has("invite") ||
			u.hash.includes("code=") ||
			u.hash.includes("aff=") ||
			u.pathname.includes("/register") ||
			u.pathname.includes("/aff.php")
		) {
			return true;
		}

		if (
			host.includes("aff.") ||
			host.includes("aff-") ||
			host.includes("-aff") ||
			host.includes("aff")
		) {
			return true;
		}

		const isInfo = INFORMATIONAL_DOMAINS.some(
			(d) => host === d || host.endsWith(`.${d}`),
		);
		if (isInfo) {
			return false;
		}

		return true;
	} catch {
		return false;
	}
}

/**
 * 为文章中的外部链接添加 target="_blank"
 * 商业合作/返利外链添加 rel="nofollow sponsored noopener noreferrer"
 * 信息类/开源外链添加 rel="noopener noreferrer"
 *
 * @param {Object} options
 * @param {string} [options.siteUrl] - 站点URL，用于判断是否为内部链接
 * @returns {Function} rehype transformer
 */
export default function rehypeExternalLinks(options = {}) {
	const siteUrl = options.siteUrl || "";
	let siteHost = "";
	try {
		siteHost = new URL(siteUrl).host;
	} catch (_e) {
		/* ignore */
	}

	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "a") return;

			const href = node.properties?.href;
			if (typeof href !== "string") return;

			// 只处理 http/https 绝对链接
			if (!href.startsWith("http://") && !href.startsWith("https://")) return;

			// 跳过本站链接
			if (siteHost) {
				try {
					if (new URL(href).host === siteHost) return;
				} catch (_e) {
					/* ignore */
				}
			}

			node.properties.target = "_blank";
			if (isAffiliateOrSponsored(href)) {
				node.properties.rel = "nofollow sponsored noopener noreferrer";
			} else {
				node.properties.rel = "noopener noreferrer";
			}
		});
	};
}
