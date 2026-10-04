import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/navBarConfig";

// ============================================================================
// 导航栏配置 - 根据顺序动态生成导航栏链接
// NavBar Configuration - Dynamically generate navigation bar links based on order
// ============================================================================
const getDynamicNavBarConfig = (): NavBarConfig => {
	// 基础导航栏链接
	const links: NavBarLink[] = [];

	// 1. 首页
	links.push({
		name: "首页",
		url: "/",
		icon: "material-symbols:home-rounded",
		children: [
			{
				name: "最新推荐",
				url: "/posts/recommend-2026-best-airports/",
				icon: "material-symbols:recommend-rounded",
			},
			{
				name: "热门榜单",
				url: "/posts/ranking-overall-performance-stability/",
				icon: "material-symbols:leaderboard-rounded",
			},
			{
				name: "热门品牌",
				url: "/brands/",
				icon: "material-symbols:storefront-rounded",
			},
			{
				name: "最新文章",
				url: "/archive/",
				icon: "material-symbols:article-rounded",
			},
			{
				name: "系列专题",
				url: "/series/",
				icon: "material-symbols:layers-rounded",
			},
			{
				name: "风险动态",
				url: "/dynamic/",
				icon: "material-symbols:warning-rounded",
			},
		],
	});

	// 2. 机场推荐
	links.push({
		name: "机场推荐",
		url: "/jichang/",
		icon: "material-symbols:recommend",
		children: [
			{
				name: "2026机场推荐",
				url: "/posts/recommend-2026-best-airports/",
				icon: "material-symbols:star-rounded",
			},
			{
				name: "稳定机场推荐",
				url: "/jichang/",
				icon: "material-symbols:verified-rounded",
			},
			{
				name: "性价比机场推荐",
				url: "/free/",
				icon: "material-symbols:savings-rounded",
			},
			{
				name: "便宜机场推荐",
				url: "/free/",
				icon: "material-symbols:price-check-rounded",
			},
			{
				name: "IEPL机场推荐",
				url: "/vpn/",
				icon: "material-symbols:speed-rounded",
			},
			{
				name: "节点选择指南",
				url: "/nodes/",
				icon: "material-symbols:data-usage-rounded",
			},
			{
				name: "月付机场推荐",
				url: "/jichang/",
				icon: "material-symbols:calendar-month-rounded",
			},
			{
				name: "新手机场推荐",
				url: "/tutorial/",
				icon: "material-symbols:help-outline-rounded",
			},
		],
	});

	// 3. 机场排行榜
	links.push({
		name: "机场排行榜",
		url: "/posts/ranking-overall-performance-stability/",
		icon: "material-symbols:leaderboard",
		children: [
			{
				name: "综合排行榜",
				url: "/posts/ranking-overall-performance-stability/",
				icon: "material-symbols:military-tech-rounded",
			},
			{
				name: "性价比排行",
				url: "/posts/ranking-overall-performance-stability/#2-性价比排行榜看重单位价格获得的流量与体验",
				icon: "material-symbols:trending-up-rounded",
			},
			{
				name: "稳定性排行",
				url: "/posts/ranking-overall-performance-stability/#1-稳定性排行榜看重晚高峰不掉线无感断流",
				icon: "material-symbols:shield-rounded",
			},
			{
				name: "价格排行",
				url: "/posts/ranking-overall-performance-stability/#细分维度二月付价格档位排行榜",
				icon: "material-symbols:attach-money-rounded",
			},
			{
				name: "AI机场排行",
				url: "/posts/ai-chatgpt-claude-cursor-airports/",
				icon: "material-symbols:smart-toy-rounded",
			},
			{
				name: "流媒体排行",
				url: "/posts/ranking-overall-performance-stability/#细分维度四海外流媒体-4k8k-影音排行",
				icon: "material-symbols:play-circle-rounded",
			},
			{
				name: "防失联备用排行",
				url: "/posts/ranking-overall-performance-stability/#细分维度五小流量与防失联备用排行不限时套餐",
				icon: "material-symbols:pie-chart-rounded",
			},
		],
	});

	// 4. 机场对比
	links.push({
		name: "机场对比",
		url: "/posts/comparison-airports-pricing-lines/",
		icon: "material-symbols:compare-arrows-rounded",
		children: [
			{
				name: "机场对比工具",
				url: "/posts/comparison-airports-pricing-lines/",
				icon: "material-symbols:query-stats-rounded",
			},
			{
				name: "专线 vs 中转对比",
				url: "/posts/comparison-airports-pricing-lines/#-一-线路类型大-pk直连-vs-bgp中转-vs-iepliplc-物理专线",
				icon: "material-symbols:payments-rounded",
			},
			{
				name: "包月 vs 按量对比",
				url: "/posts/comparison-airports-pricing-lines/#-二-价格模型全景对比年付折算价-vs-真实月付价-vs-不限时套餐",
				icon: "material-symbols:network-check-rounded",
			},
			{
				name: "协议深度解析",
				url: "/posts/comparison-airports-pricing-lines/#-三-传输协议深度解析vless-vs-shadowsocks-vs-trojan-vs-hysteria2",
				icon: "material-symbols:alt-route-rounded",
			},
			{
				name: "16大品牌横向PK",
				url: "/posts/comparison-airports-pricing-lines/#-四-16-家品牌综合矩阵横向参数总览",
				icon: "material-symbols:swords-rounded",
			},
		],
	});

	// 5. 机场品牌库
	links.push({
		name: "机场品牌库",
		url: "/brands/",
		icon: "material-symbols:storefront",
		children: [
			{
				name: "全部品牌",
				url: "/brands/",
				icon: "material-symbols:grid-view-rounded",
			},
			{
				name: "光速云 (TOP 1 主推)",
				url: "/posts/guangshuyun-review/",
				icon: "material-symbols:bolt-rounded",
			},
			{
				name: "微风网络 (TOP 2)",
				url: "/posts/brand-weifeng-review/",
				icon: "material-symbols:air-rounded",
			},
			{
				name: "飞猫云 (TOP 3)",
				url: "/posts/brand-feimaoyun-review/",
				icon: "material-symbols:pets-rounded",
			},
			{
				name: "星岛梦 (TOP 4)",
				url: "/posts/brand-xingdaomeng-review/",
				icon: "material-symbols:auto-awesome-rounded",
			},
			{
				name: "唯兔云 (TOP 5)",
				url: "/posts/brand-weitu-review/",
				icon: "material-symbols:hub-rounded",
			},
			{
				name: "宇宙云",
				url: "/posts/yuzhouyun-review-8-yuan/",
				icon: "material-symbols:cloud-done-rounded",
			},
			{
				name: "二猫云",
				url: "/posts/brand-ermaoyun-review/",
				icon: "material-symbols:cruelty-free-rounded",
			},
			{
				name: "折扣优惠码",
				url: "/free/",
				icon: "material-symbols:loyalty-rounded",
			},
		],
	});

	// 6. AI机场
	links.push({
		name: "AI机场",
		url: "/posts/ai-chatgpt-claude-cursor-airports/",
		icon: "material-symbols:smart-toy",
		children: [
			{
				name: "ChatGPT机场",
				url: "/posts/ai-chatgpt-claude-cursor-airports/",
				icon: "simple-icons:openai",
			},
			{
				name: "Claude 3.7机场",
				url: "/posts/ai-chatgpt-claude-cursor-airports/",
				icon: "simple-icons:anthropic",
			},
			{
				name: "Cursor/Copilot",
				url: "/posts/ai-chatgpt-claude-cursor-airports/",
				icon: "material-symbols:code-rounded",
			},
			{
				name: "Claude Code终端",
				url: "/posts/ai-chatgpt-claude-cursor-airports/",
				icon: "material-symbols:terminal-rounded",
			},
			{
				name: "速界 (AI专项优化)",
				url: "/posts/brand-sujie-review/",
				icon: "material-symbols:bolt-rounded",
			},
			{
				name: "AI风控拦截原理",
				url: "/posts/ai-chatgpt-claude-cursor-airports/#-为什么普通机场用不了-claude-37-和-chatgpt",
				icon: "material-symbols:lock-reset-rounded",
			},
		],
	});

	// 7. 客户端
	links.push({
		name: "客户端",
		url: "/clash/",
		icon: "material-symbols:devices-rounded",
		children: [
			{
				name: "客户端生态总览",
				url: "/clash/",
				icon: "material-symbols:download-rounded",
			},
			{
				name: "全平台使用教程",
				url: "/posts/client-setup-clash-verge-shadowrocket/",
				icon: "material-symbols:apps-rounded",
			},
			{
				name: "Clash Verge配置",
				url: "/posts/client-setup-clash-verge-shadowrocket/#1-windows-电脑配置教程clash-verge-rev",
				icon: "material-symbols:desktop-windows-rounded",
			},
			{
				name: "Shadowrocket小火箭",
				url: "/posts/client-setup-clash-verge-shadowrocket/#2-iphone--ipad-苹果手机配置教程小火箭-shadowrocket",
				icon: "material-symbols:rocket-rounded",
			},
			{
				name: "常见报错排查",
				url: "/posts/client-setup-clash-verge-shadowrocket/#3-常见报错与排错指南",
				icon: "material-symbols:help-rounded",
			},
		],
	});

	// 8. 使用教程
	links.push({
		name: "使用教程",
		url: "/tutorial/",
		icon: "material-symbols:school-rounded",
		children: [
			{
				name: "教程中心",
				url: "/tutorial/",
				icon: "material-symbols:menu-book-rounded",
			},
			{
				name: "小白入门配置",
				url: "/posts/client-setup-clash-verge-shadowrocket/",
				icon: "material-symbols:import-contacts-rounded",
			},
			{
				name: "节点选择指南",
				url: "/nodes/",
				icon: "material-symbols:hub-rounded",
			},
			{
				name: "VPN与专线知识",
				url: "/vpn/",
				icon: "material-symbols:shield-lock-rounded",
			},
			{
				name: "优惠省钱指南",
				url: "/free/",
				icon: "material-symbols:savings-rounded",
			},
		],
	});

	// 9. 风险预警
	links.push({
		name: "风险预警",
		url: "/tizi/",
		icon: "material-symbols:warning-rounded",
		children: [
			{
				name: "防坑与预警中心",
				url: "/tizi/",
				icon: "material-symbols:shield-rounded",
			},
			{
				name: "机场跑路记录",
				url: "/posts/risk-warning-runaway-record/",
				icon: "material-symbols:report-rounded",
			},
			{
				name: "跑路前兆分析",
				url: "/posts/risk-warning-runaway-record/#典型机场跑路前兆信号命中-2-条以上立即警惕",
				icon: "material-symbols:dns-rounded",
			},
			{
				name: "防割韭菜三原则",
				url: "/posts/risk-warning-runaway-record/#科学上网防割韭菜的三大保命原则",
				icon: "material-symbols:change-circle-rounded",
			},
			{
				name: "实时风险动态",
				url: "/dynamic/",
				icon: "material-symbols:history-rounded",
			},
		],
	});

	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

// ============================================================================
// 链接预设 - 可自由自定义导航栏链接的名称、图标和URL
// Link Presets - Allows free customization of the name, icon, and URL of navigation bar links
// ============================================================================
export const LinkPresets: Record<string, NavBarLink> = {
	Home: {
		name: "主页",
		url: "/",
		icon: "material-symbols:home",
	},
	Archive: {
		name: "归档",
		url: "/archive/",
		icon: "material-symbols:archive",
	},
	Categories: {
		name: "分类",
		url: "/categories/",
		icon: "material-symbols:folder-open-rounded",
	},
	Tags: {
		name: "标签",
		url: "/tags/",
		icon: "material-symbols:tag-rounded",
	},
	Series: {
		name: "系列",
		url: "/series/",
		icon: "material-symbols:layers",
	},
	Friends: {
		name: "友链",
		url: "/friends/",
		icon: "material-symbols:link-2-rounded",
		pageKey: "friends",
	},
	Guestbook: {
		name: "留言",
		url: "/guestbook/",
		icon: "material-symbols:chat",
		pageKey: "guestbook",
	},
	Dynamic: {
		name: "动态",
		url: "/dynamic/",
		icon: "material-symbols:forum-rounded",
		pageKey: "dynamic",
	},
	Gallery: {
		name: "相册",
		url: "/gallery/",
		icon: "material-symbols:photo-library",
		pageKey: "gallery",
	},
	Booknav: {
		name: "书签导航",
		url: "/booknav/",
		icon: "material-symbols:bookmarks",
		pageKey: "booknav",
	},
	Bilibili: {
		name: "哔哩哔哩",
		url: "/bilibili/",
		icon: "fa7-brands:bilibili",
		pageKey: "bilibili",
	},
	Bangumi: {
		name: "番组计划",
		url: "/bangumi/",
		icon: "material-symbols:movie",
		pageKey: "bangumi",
	},
	VNDB: {
		name: "VNDB",
		url: "/vndb/",
		icon: "material-symbols:chrome-reader-mode-rounded",
		pageKey: "vndb",
	},
	MAL: {
		name: "AnimeList",
		url: "/myanimelist/",
		icon: "material-symbols:menu-book",
		pageKey: "mal",
	},
	Sponsor: {
		name: "打赏",
		url: "/sponsor/",
		icon: "material-symbols:favorite",
		pageKey: "sponsor",
	},
	About: {
		name: "关于我",
		url: "/about/",
		icon: "material-symbols:person",
	},
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
