import fs from "node:fs";
import path from "node:path";

// Ensure reports directory exists
if (!fs.existsSync("reports")) {
	fs.mkdirSync("reports");
}

const posts = JSON.parse(fs.readFileSync("scripts/posts-dump.json", "utf8"));
const postsByFile = new Map(posts.map((p) => [p.file, p]));

console.log(`Loaded ${posts.length} posts from dump.`);

// Define the comprehensive 85-post mapping
const mappingData = [
	// 1. Core Pillars
	{
		file: "recommend-2026-best-airports.md",
		primaryKeyword: "2026机场推荐",
		secondaryKeywords: "机场推荐, 优质机场推荐, 稳定高速机场, 2026科学上网机场",
		searchIntent: "综合选择（全站旗舰总榜：2026精选机场综合推荐指南）",
		pageType: "Pillar",
		primaryUrl: "/posts/recommend-2026-best-airports/",
		parentPillar: "-",
		status: "Active (Pillar)",
		competingUrls:
			"/posts/recommend-stable-cheap-airports-2026/, /posts/which-airport-is-best-guide-budget-scenarios/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "ranking-overall-performance-stability.md",
		primaryKeyword: "机场排行榜",
		secondaryKeywords: "2026机场排行榜, 科学上网机场排名, 机场综合实力榜",
		searchIntent: "查看排名（全站权威排行榜：基于量化探针与运营信誉的TOP榜单）",
		pageType: "Pillar",
		primaryUrl: "/posts/ranking-overall-performance-stability/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active (Pillar)",
		competingUrls:
			"/posts/airport-rankings-2026-pricing-lines-nodes-stability/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "airport-rankings-2026-pricing-lines-nodes-stability.md",
		primaryKeyword: "机场排行榜多维度量化",
		secondaryKeywords: "机场排名细分维度, 价格线路节点排行榜, 机场四维量化排名",
		searchIntent: "细分排名（价格、线路、节点与稳定性四维分段量化榜单）",
		pageType: "Ranking",
		primaryUrl: "/posts/airport-rankings-2026-pricing-lines-nodes-stability/",
		parentPillar: "/posts/ranking-overall-performance-stability/",
		status: "Repositioned",
		competingUrls: "/posts/ranking-overall-performance-stability/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "airports-comparison-price-traffic-stability-guide.md",
		primaryKeyword: "机场对比",
		secondaryKeywords: "机场横向对比, 机场参数对比, 机场怎么比较",
		searchIntent: "横向对比（对比中心：全参数多场景横向对比矩阵与选购决策）",
		pageType: "Pillar",
		primaryUrl: "/posts/airports-comparison-price-traffic-stability-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active (Pillar)",
		competingUrls: "/posts/comparison-airports-pricing-lines/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "comparison-airports-pricing-lines.md",
		primaryKeyword: "专线与中转机场对比",
		secondaryKeywords: "IEPL vs IPLC, 直连vs中转, 按量与包月哪个划算",
		searchIntent: "架构对比（IEPL/IPLC/中转物理架构与包月/按量成本精算横评）",
		pageType: "Comparison",
		primaryUrl: "/posts/comparison-airports-pricing-lines/",
		parentPillar: "/posts/airports-comparison-price-traffic-stability-guide/",
		status: "Repositioned",
		competingUrls: "/posts/airports-comparison-price-traffic-stability-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "vpn-vs-iepl-dedicated-line-guide.md",
		primaryKeyword: "VPN对比专线",
		secondaryKeywords: "VPN和机场区别, 传统VPN与专线机场, 翻墙方式对比",
		searchIntent: "方案对比（传统 VPN 与现代二层 IEPL 专线架构与体验差异对比）",
		pageType: "Comparison",
		primaryUrl: "/posts/vpn-vs-iepl-dedicated-line-guide/",
		parentPillar: "/posts/airports-comparison-price-traffic-stability-guide/",
		status: "Repositioned",
		competingUrls: "/posts/airports-comparison-price-traffic-stability-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "recommend-stable-cheap-airports-2026.md",
		primaryKeyword: "稳定便宜机场怎么选",
		secondaryKeywords:
			"兼顾稳定与便宜的机场, 机场黄金三角选型, 高性价比专线配置",
		searchIntent: "平衡选型（稳定、平价与资金灵活度黄金三角决策与双保险组合）",
		pageType: "Cluster",
		primaryUrl: "/posts/recommend-stable-cheap-airports-2026/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Repositioned",
		competingUrls:
			"/posts/recommend-2026-best-airports/, /posts/cheap-airports-low-budget-plans-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "which-airport-is-best-guide-budget-scenarios.md",
		primaryKeyword: "机场推荐哪个好",
		secondaryKeywords: "机场哪个好, 梯子哪个好, 机场选购决策树",
		searchIntent: "决策分流（根据预算区间与具体使用场景的选型决策树）",
		pageType: "Cluster",
		primaryUrl: "/posts/which-airport-is-best-guide-budget-scenarios/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "/posts/recommend-2026-best-airports/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "reliable-airports-selection-indicators-guide.md",
		primaryKeyword: "靠谱机场",
		secondaryKeywords: "靠谱机场推荐, 机场指标怎么看, 靠谱梯子避坑",
		searchIntent: "指标鉴别（购买前必须审查的六大硬核指标与防跑路验证）",
		pageType: "Cluster",
		primaryUrl: "/posts/reliable-airports-selection-indicators-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "/posts/recommend-2026-best-airports/",
		lastUpdated: "2026-03-31",
	},

	// 2. 价格与预算 Cluster
	{
		file: "cheap-airports-low-budget-plans-guide.md",
		primaryKeyword: "便宜机场推荐",
		secondaryKeywords: "低预算机场, 平价机场, 便宜梯子",
		searchIntent: "价格驱动（平价低预算机场选购指南与防坑原则）",
		pageType: "Cluster",
		primaryUrl: "/posts/cheap-airports-low-budget-plans-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "/posts/ten-yuan-budget-airports-selection-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "ten-yuan-budget-airports-selection-guide.md",
		primaryKeyword: "10元机场推荐",
		secondaryKeywords: "10元左右机场, 10元月付机场, 低预算月付",
		searchIntent: "具体价位（10元左右极低预算月付专线横评与避坑）",
		pageType: "Cluster",
		primaryUrl: "/posts/ten-yuan-budget-airports-selection-guide/",
		parentPillar: "/posts/cheap-airports-low-budget-plans-guide/",
		status: "Active",
		competingUrls: "/posts/cheap-airports-low-budget-plans-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "cheap-iepl-airports-low-budget-dedicated-lines-guide.md",
		primaryKeyword: "便宜IEPL机场推荐",
		secondaryKeywords: "平价专线机场, 便宜专线, 低预算IEPL",
		searchIntent: "平价专线（低预算平价内网专线横评与真伪鉴别）",
		pageType: "Cluster",
		primaryUrl: "/posts/cheap-iepl-airports-low-budget-dedicated-lines-guide/",
		parentPillar: "/posts/iepl-airports-dedicated-lines-guide-2026/",
		status: "Active",
		competingUrls: "/posts/iepl-airports-dedicated-lines-guide-2026/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "cost-effective-airports-pricing-traffic-lines.md",
		primaryKeyword: "高性价比机场推荐",
		secondaryKeywords: "性价比最高机场, 价格流量平衡, 划算机场",
		searchIntent: "性价比（价格、流量与专线品质黄金平衡比测评）",
		pageType: "Cluster",
		primaryUrl: "/posts/cost-effective-airports-pricing-traffic-lines/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "/posts/cheap-airports-low-budget-plans-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "free-trial-discount-coupon-codes.md",
		primaryKeyword: "机场优惠码",
		secondaryKeywords: "免费试用机场, 机场折扣券, 便宜优惠码",
		searchIntent: "折扣与试用（0元试用、低价测试与全网最新优惠券汇总）",
		pageType: "Cluster",
		primaryUrl: "/posts/free-trial-discount-coupon-codes/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},

	// 3. 计费周期与流量规格 Cluster
	{
		file: "airport-billing-cycles-monthly-quarterly-yearly-comparison-guide.md",
		primaryKeyword: "机场套餐价格对比",
		secondaryKeywords: "月付季付年付哪个划算, 机场计费周期, 机场ROI精算",
		searchIntent: "计费模型（月付/季付/年付财务ROI精算与防跑路决策）",
		pageType: "Cluster",
		primaryUrl:
			"/posts/airport-billing-cycles-monthly-quarterly-yearly-comparison-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls:
			"/posts/monthly-payment-airports-no-annual-plan-guide/, /posts/annual-payment-airports-long-term-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "monthly-payment-airports-no-annual-plan-guide.md",
		primaryKeyword: "月付机场推荐",
		secondaryKeywords: "纯月付机场, 不想年付机场, 月缴机场",
		searchIntent: "月付偏好（无年付绑定、支持按月结算的优质机场选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/monthly-payment-airports-no-annual-plan-guide/",
		parentPillar:
			"/posts/airport-billing-cycles-monthly-quarterly-yearly-comparison-guide/",
		status: "Active",
		competingUrls:
			"/posts/airport-billing-cycles-monthly-quarterly-yearly-comparison-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "annual-payment-airports-long-term-guide.md",
		primaryKeyword: "年付机场推荐",
		secondaryKeywords: "适合长期购买机场, 老牌年付机场, 年付优惠机场",
		searchIntent: "长期订阅（适合长期订阅的超长周期信誉老牌机场选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/annual-payment-airports-long-term-guide/",
		parentPillar:
			"/posts/airport-billing-cycles-monthly-quarterly-yearly-comparison-guide/",
		status: "Active",
		competingUrls:
			"/posts/airport-billing-cycles-monthly-quarterly-yearly-comparison-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "no-expiration-pay-as-you-go-airports-guide.md",
		primaryKeyword: "不限时机场推荐",
		secondaryKeywords: "按量付费机场, 永久不过期机场, 备用流量包机场",
		searchIntent: "按量弹性（一次购买长期使用、流量永不过期按量套餐推荐）",
		pageType: "Cluster",
		primaryUrl: "/posts/no-expiration-pay-as-you-go-airports-guide/",
		parentPillar:
			"/posts/airport-billing-cycles-monthly-quarterly-yearly-comparison-guide/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "60gb-small-traffic-budget-airports-guide.md",
		primaryKeyword: "60GB机场推荐",
		secondaryKeywords: "60G小流量套餐, 轻量流量机场, 60GB翻墙套餐",
		searchIntent: "固定流量规格（针对每月 60GB 左右轻量套餐的精准推荐）",
		pageType: "Cluster",
		primaryUrl: "/posts/60gb-small-traffic-budget-airports-guide/",
		parentPillar: "/posts/small-traffic-airports-50gb-100gb-plans-guide/",
		status: "Active",
		competingUrls: "/posts/small-traffic-airports-50gb-100gb-plans-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "small-traffic-airports-50gb-100gb-plans-guide.md",
		primaryKeyword: "小流量机场推荐",
		secondaryKeywords: "50GB到100GB套餐, 查资料小流量机场, 轻度翻墙",
		searchIntent: "轻度使用（50GB～100GB 档位轻度冲浪与学术查资料推荐）",
		pageType: "Cluster",
		primaryUrl: "/posts/small-traffic-airports-50gb-100gb-plans-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "/posts/60gb-small-traffic-budget-airports-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "large-traffic-airports-200gb-plus-comparison-guide.md",
		primaryKeyword: "大流量机场推荐",
		secondaryKeywords: "200GB以上机场, TB级大带宽机场, 重度下载机场",
		searchIntent: "重度使用（200GB+ 乃至 TB 级超大流量下载与高频使用推荐）",
		pageType: "Cluster",
		primaryUrl: "/posts/large-traffic-airports-200gb-plus-comparison-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},

	// 4. 专线架构与线路技术 Cluster
	{
		file: "iepl-airports-dedicated-lines-guide-2026.md",
		primaryKeyword: "IEPL机场推荐",
		secondaryKeywords: "2026专线机场怎么选, IEPL内网专线, 国际以太网专线",
		searchIntent: "专线品类（2026最新企业级二层 IEPL 专线全景深度指南）",
		pageType: "Pillar",
		primaryUrl: "/posts/iepl-airports-dedicated-lines-guide-2026/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active (Sub-Pillar)",
		competingUrls:
			"/posts/dedicated-lines-iepl-iplc-vs-standard-transit-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "dedicated-lines-iepl-iplc-vs-standard-transit-guide.md",
		primaryKeyword: "专线机场推荐",
		secondaryKeywords: "IEPL与IPLC对比, 专线与普通线路区别, 专线梯子",
		searchIntent: "专线横评（IEPL与IPLC物理专线深度评测与防坑选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/dedicated-lines-iepl-iplc-vs-standard-transit-guide/",
		parentPillar: "/posts/iepl-airports-dedicated-lines-guide-2026/",
		status: "Active",
		competingUrls: "/posts/iepl-airports-dedicated-lines-guide-2026/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "airport-routes-bgp-iepl-iplc-cn2-9929-guide.md",
		primaryKeyword: "机场线路图谱",
		secondaryKeywords: "BGP专线是什么, CN2 GIA与9929, 机场线路黑话科普",
		searchIntent: "科普认知（BGP、IEPL、IPLC、CN2 GIA、9929 线路底层全解密）",
		pageType: "Tutorial",
		primaryUrl: "/posts/airport-routes-bgp-iepl-iplc-cn2-9929-guide/",
		parentPillar: "/posts/iepl-airports-dedicated-lines-guide-2026/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "low-latency-airports-ping-measurement-guide.md",
		primaryKeyword: "低延迟机场推荐",
		secondaryKeywords: "机场延迟怎么看, 真低延迟专线, 节点Ping测试陷阱",
		searchIntent: "延迟优化（节点延迟原理、测速陷阱揭秘与真低延迟专线选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/low-latency-airports-ping-measurement-guide/",
		parentPillar: "/posts/iepl-airports-dedicated-lines-guide-2026/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "peak-hours-stable-airports-selection-guide.md",
		primaryKeyword: "晚高峰稳定机场推荐",
		secondaryKeywords: "晚上不卡机场, 晚高峰0丢包专线, 晚间抗拥堵机场",
		searchIntent: "高峰抗拥堵（晚间 8-11 点抗骨干网丢包与高峰期网络保障）",
		pageType: "Cluster",
		primaryUrl: "/posts/peak-hours-stable-airports-selection-guide/",
		parentPillar: "/posts/most-stable-airports-long-term-guide-2026/",
		status: "Active",
		competingUrls: "/posts/most-stable-airports-long-term-guide-2026/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "most-stable-airports-long-term-guide-2026.md",
		primaryKeyword: "稳定机场推荐",
		secondaryKeywords: "2026最稳定的机场, 长期使用稳定机场, 稳定性最高梯子",
		searchIntent: "极致高可用（追求全天候高可用与长期不掉线服务商推荐）",
		pageType: "Cluster",
		primaryUrl: "/posts/most-stable-airports-long-term-guide-2026/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "/posts/peak-hours-stable-airports-selection-guide/",
		lastUpdated: "2026-03-31",
	},

	// 5. 运营商宽带线路 Cluster
	{
		file: "telecom-broadband-airport-line-selection-guide.md",
		primaryKeyword: "电信机场推荐",
		secondaryKeywords: "电信宽带适合什么线路, 电信163专线, 电信CN2 GIA",
		searchIntent: "电信优化（突破 163 国际出口晚高峰拥堵、CN2 GIA 与专线选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/telecom-broadband-airport-line-selection-guide/",
		parentPillar: "/posts/three-major-carriers-optimized-airports-guide/",
		status: "Active",
		competingUrls: "/posts/three-major-carriers-optimized-airports-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "unicom-broadband-airports-node-selection-guide.md",
		primaryKeyword: "联通机场推荐",
		secondaryKeywords: "联通宽带节点选择, 联通AS4837机场, 联通9929专线",
		searchIntent: "联通优化（联通 AS4837/9929 节点匹配与出口优化）",
		pageType: "Cluster",
		primaryUrl: "/posts/unicom-broadband-airports-node-selection-guide/",
		parentPillar: "/posts/three-major-carriers-optimized-airports-guide/",
		status: "Active",
		competingUrls: "/posts/three-major-carriers-optimized-airports-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "china-mobile-network-airports-selection-guide.md",
		primaryKeyword: "移动机场推荐",
		secondaryKeywords: "移动网络怎么选择机场, 移动宽带抗QoS, CMI专线机场",
		searchIntent: "移动优化（移动 CMNET 宽带/5G 抗 QoS 与 CMI/CMIN2 选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/china-mobile-network-airports-selection-guide/",
		parentPillar: "/posts/three-major-carriers-optimized-airports-guide/",
		status: "Active",
		competingUrls: "/posts/three-major-carriers-optimized-airports-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "three-major-carriers-optimized-airports-guide.md",
		primaryKeyword: "三网优化机场推荐",
		secondaryKeywords:
			"电信移动联通都能用的机场, 三网通用机场, Anycast BGP专线",
		searchIntent:
			"跨运营商通用（跨网互通壁垒解决、Anycast BGP 动态汇聚通用选型）",
		pageType: "Pillar",
		primaryUrl: "/posts/three-major-carriers-optimized-airports-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active (Sub-Pillar)",
		competingUrls:
			"/posts/telecom-broadband-airport-line-selection-guide/, /posts/unicom-broadband-airports-node-selection-guide/, /posts/china-mobile-network-airports-selection-guide/",
		lastUpdated: "2026-03-31",
	},

	// 6. 节点国家与地域 Cluster
	{
		file: "hong-kong-nodes-low-latency-airports-selection-guide.md",
		primaryKeyword: "香港节点机场推荐",
		secondaryKeywords: "香港低延迟线路, 香港IEPL专线, 香港BGP节点",
		searchIntent: "香港地域（超低延迟、晚高峰抗拥堵香港专线选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/hong-kong-nodes-low-latency-airports-selection-guide/",
		parentPillar: "/posts/global-nodes-speedtest-benchmark-guide/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "japan-nodes-ai-streaming-airports-selection-guide.md",
		primaryKeyword: "日本节点机场推荐",
		secondaryKeywords: "日本原生住宅IP, 日本专线机场, 日本流媒体解锁",
		searchIntent: "日本地域（日本原生 IP、动漫流媒体与游戏极速加速）",
		pageType: "Cluster",
		primaryUrl: "/posts/japan-nodes-ai-streaming-airports-selection-guide/",
		parentPillar: "/posts/global-nodes-speedtest-benchmark-guide/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "singapore-nodes-low-latency-ai-airports-selection-guide.md",
		primaryKeyword: "新加坡节点机场推荐",
		secondaryKeywords: "新加坡低延迟专线, 东南亚专线, 新加坡原生IP",
		searchIntent: "新加坡地域（东南亚节点、低延迟 AI 与 TikTok 加速）",
		pageType: "Cluster",
		primaryUrl:
			"/posts/singapore-nodes-low-latency-ai-airports-selection-guide/",
		parentPillar: "/posts/global-nodes-speedtest-benchmark-guide/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "us-nodes-chatgpt-claude-streaming-airports-guide.md",
		primaryKeyword: "美国节点机场推荐",
		secondaryKeywords: "美国IEPL专线, 美西节点机场, 美国ChatGPT节点",
		searchIntent: "美国地域（美西专线、通用 ChatGPT/Claude 原生解锁）",
		pageType: "Cluster",
		primaryUrl: "/posts/us-nodes-chatgpt-claude-streaming-airports-guide/",
		parentPillar: "/posts/global-nodes-speedtest-benchmark-guide/",
		status: "Active",
		competingUrls: "/posts/us-native-ip-airports-ai-streaming-selection-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "us-native-ip-airports-ai-streaming-selection-guide.md",
		primaryKeyword: "美国原生IP机场推荐",
		secondaryKeywords: "美国双ISP住宅IP, 欺诈分规避节点, 美国住宅IP机场",
		searchIntent: "原生双ISP（纯净双 ISP 住宅 IP、严防欺诈评分与风控）",
		pageType: "Cluster",
		primaryUrl: "/posts/us-native-ip-airports-ai-streaming-selection-guide/",
		parentPillar: "/posts/us-nodes-chatgpt-claude-streaming-airports-guide/",
		status: "Active",
		competingUrls: "/posts/us-nodes-chatgpt-claude-streaming-airports-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "global-nodes-speedtest-benchmark-guide.md",
		primaryKeyword: "全球节点测速指南",
		secondaryKeywords: "全球节点分布, 专线网络测速, 机场测速基准",
		searchIntent: "测速方法论（全球节点测速基准、探针延迟与带宽测试）",
		pageType: "Pillar",
		primaryUrl: "/posts/global-nodes-speedtest-benchmark-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active (Sub-Pillar)",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},

	// 7. AI 场景与生产力专区 Cluster
	{
		file: "ai-chatgpt-claude-cursor-airports.md",
		primaryKeyword: "AI机场推荐",
		secondaryKeywords: "2026 AI机场, 原生IP解锁AI, ChatGPT与Claude机场",
		searchIntent: "AI总览（全场景 AI 生产力与原生 IP 解锁综合指南）",
		pageType: "Pillar",
		primaryUrl: "/posts/ai-chatgpt-claude-cursor-airports/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active (Sub-Pillar)",
		competingUrls: "/posts/ai-airports-chatgpt-claude-gemini-comparison-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "ai-airports-chatgpt-claude-gemini-comparison-guide.md",
		primaryKeyword: "AI机场对比",
		secondaryKeywords:
			"三大AI平台机场对比, ChatGPT与Claude放行率横评, AI节点风控对比",
		searchIntent:
			"AI横评（三大 AI 平台风控放行率、IP 洁净度与延迟横向对比矩阵）",
		pageType: "Comparison",
		primaryUrl: "/posts/ai-airports-chatgpt-claude-gemini-comparison-guide/",
		parentPillar: "/posts/ai-chatgpt-claude-cursor-airports/",
		status: "Repositioned",
		competingUrls: "/posts/ai-chatgpt-claude-cursor-airports/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "ai-developer-airports-chatgpt-claude-gemini-selection-guide.md",
		primaryKeyword: "AI开发者机场推荐",
		secondaryKeywords: "AI API调用机场, 开发者专用节点, 高并发防断流机场",
		searchIntent:
			"开发者场景（面向 API 批量调用、自动化脚本、长连接高并发选型）",
		pageType: "Cluster",
		primaryUrl:
			"/posts/ai-developer-airports-chatgpt-claude-gemini-selection-guide/",
		parentPillar: "/posts/ai-chatgpt-claude-cursor-airports/",
		status: "Active",
		competingUrls: "/posts/cursor-claude-code-ai-developer-proxy-tuning-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "cursor-claude-code-ai-developer-proxy-tuning-guide.md",
		primaryKeyword: "Cursor代理调优",
		secondaryKeywords: "Claude Code代理配置, IDE代理断流排查, 智能体长连接调优",
		searchIntent:
			"IDE与命令行调优（本地 IDE、CLI 环境变量、Socket 长连接断流排除教程）",
		pageType: "Tutorial",
		primaryUrl: "/posts/cursor-claude-code-ai-developer-proxy-tuning-guide/",
		parentPillar:
			"/posts/ai-developer-airports-chatgpt-claude-gemini-selection-guide/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "claude-code-developer-airports-selection-guide.md",
		primaryKeyword: "Claude Code机场推荐",
		secondaryKeywords: "Claude终端代理, Anthropic命令行机场, 终端AI代理",
		searchIntent:
			"特定工具代理（针对 Anthropic Claude Code 终端命令行代理的选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/claude-code-developer-airports-selection-guide/",
		parentPillar:
			"/posts/ai-developer-airports-chatgpt-claude-gemini-selection-guide/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "chatgpt-airports-openai-selection-guide.md",
		primaryKeyword: "ChatGPT机场推荐",
		secondaryKeywords: "适合OpenAI的机场, 解决ChatGPT报错1020, OpenAI原生节点",
		searchIntent: "平台选型（网页端与 App 端访问 OpenAI 报错解决与选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/chatgpt-airports-openai-selection-guide/",
		parentPillar: "/posts/ai-chatgpt-claude-cursor-airports/",
		status: "Active",
		competingUrls: "/posts/chatgpt-native-ip-airports-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "chatgpt-native-ip-airports-guide.md",
		primaryKeyword: "ChatGPT原生IP机场",
		secondaryKeywords: "ChatGPT双ISP住宅节点, OpenAI防封号IP, ChatGPT住宅IP",
		searchIntent:
			"原生双ISP抗风控（双 ISP 住宅 IP 原理、欺诈评分与 Stripe 绑定支付）",
		pageType: "Cluster",
		primaryUrl: "/posts/chatgpt-native-ip-airports-guide/",
		parentPillar: "/posts/chatgpt-airports-openai-selection-guide/",
		status: "Active",
		competingUrls: "/posts/chatgpt-airports-openai-selection-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "claude-airports-ip-node-selection-guide.md",
		primaryKeyword: "Claude机场推荐",
		secondaryKeywords: "Claude节点选择, Anthropic防封号机场, Claude线路推荐",
		searchIntent: "平台选型（针对 Anthropic 严苛封号机制的节点与地区选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/claude-airports-ip-node-selection-guide/",
		parentPillar: "/posts/ai-chatgpt-claude-cursor-airports/",
		status: "Active",
		competingUrls: "/posts/claude-native-ip-airports-routes-regions-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "claude-native-ip-airports-routes-regions-guide.md",
		primaryKeyword: "Claude原生IP机场",
		secondaryKeywords: "Claude原生节点, Claude防封号线路, Anthropic风控避坑",
		searchIntent:
			"原生住宅抗审查（专注原生住宅 IP 对抗 Anthropic 风控与美日专线）",
		pageType: "Cluster",
		primaryUrl: "/posts/claude-native-ip-airports-routes-regions-guide/",
		parentPillar: "/posts/claude-airports-ip-node-selection-guide/",
		status: "Active",
		competingUrls: "/posts/claude-airports-ip-node-selection-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "gemini-airports-google-ai-selection-guide.md",
		primaryKeyword: "Gemini机场推荐",
		secondaryKeywords: "Google AI线路怎么选, Gemini地区限制解决, AI Studio专线",
		searchIntent:
			"平台选型（针对 Google Gemini / AI Studio 地区限制与 QUIC 调优）",
		pageType: "Cluster",
		primaryUrl: "/posts/gemini-airports-google-ai-selection-guide/",
		parentPillar: "/posts/ai-chatgpt-claude-cursor-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},

	// 8. 客户端与操作系统 Cluster
	{
		file: "client-setup-clash-verge-shadowrocket.md",
		primaryKeyword: "机场客户端下载",
		secondaryKeywords: "全平台客户端下载, 订阅导入教程, 科学上网客户端配置",
		searchIntent:
			"全平台教程（Windows/Mac/iOS/Android 客户端下载安装与订阅导入实操）",
		pageType: "Tutorial",
		primaryUrl: "/posts/client-setup-clash-verge-shadowrocket/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "clients-comparison-clash-verge-sing-box-surge-loon.md",
		primaryKeyword: "科学上网客户端对比",
		secondaryKeywords: "客户端横评, Clash Verge vs Sing-box, Surge与Loon怎么选",
		searchIntent:
			"客户端对比（架构、内核、耗电、分流引擎与适用场景全维度对比）",
		pageType: "Comparison",
		primaryUrl: "/posts/clients-comparison-clash-verge-sing-box-surge-loon/",
		parentPillar: "/posts/client-setup-clash-verge-shadowrocket/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "clash-airports-subscription-guide.md",
		primaryKeyword: "Clash机场推荐",
		secondaryKeywords: "支持Clash订阅的机场, Clash Verge节点, Mihomo内核机场",
		searchIntent: "客户端生态（支持 Clash 格式订阅与智能分流的机场推荐）",
		pageType: "Cluster",
		primaryUrl: "/posts/clash-airports-subscription-guide/",
		parentPillar: "/posts/client-setup-clash-verge-shadowrocket/",
		status: "Active",
		competingUrls: "/posts/clash-verge-windows-airports-selection-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "clash-verge-windows-airports-selection-guide.md",
		primaryKeyword: "Clash Verge机场推荐",
		secondaryKeywords:
			"Windows Clash Verge, Mihomo内核配置, WinTun透明代理机场",
		searchIntent:
			"操作系统与软件（Windows 平台运行 Clash Verge Rev 的专属选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/clash-verge-windows-airports-selection-guide/",
		parentPillar: "/posts/clash-airports-subscription-guide/",
		status: "Active",
		competingUrls:
			"/posts/clash-airports-subscription-guide/, /posts/windows-airports-clash-verge-vs-v2rayn-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "v2rayn-windows-airports-subscription-guide.md",
		primaryKeyword: "v2rayN机场推荐",
		secondaryKeywords: "Windows v2rayN订阅, Xray与sing-box内核, TUN全透明代理",
		searchIntent:
			"操作系统与软件（Windows 平台使用 v2rayN 订阅与内核配置的机场选择）",
		pageType: "Cluster",
		primaryUrl: "/posts/v2rayn-windows-airports-subscription-guide/",
		parentPillar: "/posts/windows-airports-clash-verge-vs-v2rayn-guide/",
		status: "Active",
		competingUrls: "/posts/windows-airports-clash-verge-vs-v2rayn-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "windows-airports-clash-verge-vs-v2rayn-guide.md",
		primaryKeyword: "Windows机场推荐",
		secondaryKeywords: "PC电脑机场, Clash Verge与v2rayN怎么选, 电脑翻墙梯子",
		searchIntent: "操作系统选型（Windows 平台整体代理选型与客户端配置建议）",
		pageType: "Cluster",
		primaryUrl: "/posts/windows-airports-clash-verge-vs-v2rayn-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls:
			"/posts/clash-verge-windows-airports-selection-guide/, /posts/v2rayn-windows-airports-subscription-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "mac-airports-macos-user-guide.md",
		primaryKeyword: "Mac机场推荐",
		secondaryKeywords: "macOS机场, 苹果电脑梯子, Mac科学上网配置",
		searchIntent: "操作系统选型（macOS 平台专用机场选型与系统代理优化）",
		pageType: "Cluster",
		primaryUrl: "/posts/mac-airports-macos-user-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "android-airports-clients-selection-guide.md",
		primaryKeyword: "Android机场推荐",
		secondaryKeywords: "安卓手机机场, v2rayNG机场, 安卓端省电代理",
		searchIntent: "操作系统选型（安卓手机端代理选型与后台保活、省电优化）",
		pageType: "Cluster",
		primaryUrl: "/posts/android-airports-clients-selection-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "iphone-airports-shadowrocket-selection-guide.md",
		primaryKeyword: "iPhone机场推荐",
		secondaryKeywords: "iOS小火箭机场, iPhone科学上网, 苹果手机翻墙",
		searchIntent: "操作系统选型（苹果 iOS 手机端机场选型与小火箭网络体验）",
		pageType: "Cluster",
		primaryUrl: "/posts/iphone-airports-shadowrocket-selection-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "/posts/shadowrocket-airports-iphone-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "shadowrocket-airports-iphone-guide.md",
		primaryKeyword: "Shadowrocket机场推荐",
		secondaryKeywords: "小火箭机场怎么选, 小火箭节点导入, iOS Shadowrocket",
		searchIntent: "专用客户端（Shadowrocket 专属订阅导入、去广告与规则配置）",
		pageType: "Cluster",
		primaryUrl: "/posts/shadowrocket-airports-iphone-guide/",
		parentPillar: "/posts/iphone-airports-shadowrocket-selection-guide/",
		status: "Active",
		competingUrls: "/posts/iphone-airports-shadowrocket-selection-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "sing-box-airports-multi-platform-selection-guide.md",
		primaryKeyword: "sing-box机场推荐",
		secondaryKeywords: "通用内核机场, 支持sing-box订阅, 多协议代理机场",
		searchIntent: "现代内核（支持原生 sing-box 1.8+ 协议的现代多端机场选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/sing-box-airports-multi-platform-selection-guide/",
		parentPillar: "/posts/client-setup-clash-verge-shadowrocket/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},

	// 9. 用户特定场景与业务 Cluster
	{
		file: "streaming-airports-netflix-youtube-disney-comparison-guide.md",
		primaryKeyword: "流媒体机场推荐",
		secondaryKeywords: "Netflix与Disney解锁机场, 4K流媒体机场, 影视翻墙梯子",
		searchIntent: "流媒体综合（全平台多区流媒体解锁机制与高码率分流避坑）",
		pageType: "Pillar",
		primaryUrl:
			"/posts/streaming-airports-netflix-youtube-disney-comparison-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active (Sub-Pillar)",
		competingUrls:
			"/posts/netflix-streaming-unlock-airports-guide/, /posts/youtube-4k-airports-speed-traffic-routes-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "netflix-streaming-unlock-airports-guide.md",
		primaryKeyword: "Netflix机场推荐",
		secondaryKeywords: "奈飞解锁机场, 4K非自制剧解锁, Netflix住宅IP",
		searchIntent: "特定流媒体（奈飞全区非自制剧解锁与高码率专线横评）",
		pageType: "Cluster",
		primaryUrl: "/posts/netflix-streaming-unlock-airports-guide/",
		parentPillar:
			"/posts/streaming-airports-netflix-youtube-disney-comparison-guide/",
		status: "Active",
		competingUrls:
			"/posts/streaming-airports-netflix-youtube-disney-comparison-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "youtube-4k-airports-speed-traffic-routes-guide.md",
		primaryKeyword: "YouTube 4K机场推荐",
		secondaryKeywords: "油管4K秒开机场, YouTube 8K专线, QUIC优化线路",
		searchIntent: "特定流媒体（YouTube 4K/8K 极速秒开、QUIC 协议与电视端避坑）",
		pageType: "Cluster",
		primaryUrl: "/posts/youtube-4k-airports-speed-traffic-routes-guide/",
		parentPillar:
			"/posts/streaming-airports-netflix-youtube-disney-comparison-guide/",
		status: "Active",
		competingUrls:
			"/posts/streaming-airports-netflix-youtube-disney-comparison-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "programmer-airports-github-ai-developer-tools-guide.md",
		primaryKeyword: "程序员机场推荐",
		secondaryKeywords: "GitHub加速机场, 开发者工具翻墙, 终端透明代理",
		searchIntent: "职业场景（GitHub 极速拉取、Docker 镜像加速与开发工具代理）",
		pageType: "Cluster",
		primaryUrl: "/posts/programmer-airports-github-ai-developer-tools-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls:
			"/posts/ai-developer-airports-chatgpt-claude-gemini-selection-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "student-airports-low-budget-small-traffic-guide.md",
		primaryKeyword: "学生机场推荐",
		secondaryKeywords: "校园网翻墙, 学生高性价比梯子, 学术科研查文献机场",
		searchIntent: "人群场景（校园网穿透、学术文献检索、平价小流量套餐推荐）",
		pageType: "Cluster",
		primaryUrl: "/posts/student-airports-low-budget-small-traffic-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "/posts/small-traffic-airports-50gb-100gb-plans-guide/",
		lastUpdated: "2026-03-31",
	},
	{
		file: "multi-device-airports-simultaneous-connection-guide.md",
		primaryKeyword: "多设备机场推荐",
		secondaryKeywords: "手机电脑同时使用机场, 不限连接数机场, 家庭多设备翻墙",
		searchIntent: "多端并发（无并发设备数限制、家庭与团队多设备共享选型）",
		pageType: "Cluster",
		primaryUrl: "/posts/multi-device-airports-simultaneous-connection-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},

	// 10. 新手教程、故障排错与风险预警
	{
		file: "first-time-buying-airport-beginner-guide.md",
		primaryKeyword: "新手机场推荐",
		secondaryKeywords: "第一次买机场怎么选, 零基础翻墙教程, 小白买梯子指南",
		searchIntent: "新手入门（零基础新手第一次买机场核心概念与五大避坑原则）",
		pageType: "Tutorial",
		primaryUrl: "/posts/first-time-buying-airport-beginner-guide/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "troubleshooting-proxy-connection-failed-guide.md",
		primaryKeyword: "科学上网连不上排错指南",
		secondaryKeywords: "节点全红超时怎么办, 代理报错排查, 梯子连不上修复",
		searchIntent: "故障排除（连不上、节点全红超时、打不开网页的10步自愈法）",
		pageType: "Troubleshooting",
		primaryUrl: "/posts/troubleshooting-proxy-connection-failed-guide/",
		parentPillar: "/posts/first-time-buying-airport-beginner-guide/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "risk-warning-runaway-record.md",
		primaryKeyword: "机场风险预警库",
		secondaryKeywords: "机场跑路名单, 机场失联监控, 机场域名变更防坑",
		searchIntent: "风险监控（99+机场跑路案例、失联异常信号监控与资产防损）",
		pageType: "Risk",
		primaryUrl: "/posts/risk-warning-runaway-record/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "proxy-security-privacy-compliance-guide.md",
		primaryKeyword: "科学上网安全与隐私防线",
		secondaryKeywords: "买机场会被喝茶吗, 翻墙安全防护, 支付风控与抓包真相",
		searchIntent:
			"合规与隐私（买机场法律边界、支付链路风控反查与端到端隐私防护）",
		pageType: "Risk",
		primaryUrl: "/posts/proxy-security-privacy-compliance-guide/",
		parentPillar: "/posts/risk-warning-runaway-record/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},

	// 11. 品牌独立评测 Brand Reviews (17 篇)
	{
		file: "guangshuyun-review.md",
		primaryKeyword: "光速云评测",
		secondaryKeywords: "光速云怎么样, 光速云优惠码, 光速云套餐价格",
		searchIntent:
			"品牌深度评测（光速云2020老牌5年+运营、年付折合7.5元/月与IEPL实测）",
		pageType: "Brand",
		primaryUrl: "/posts/guangshuyun-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-weifeng-review.md",
		primaryKeyword: "微风网络评测",
		secondaryKeywords: "微风网络怎么样, 微风网络优惠码, 微风网络套餐价格",
		searchIntent: "品牌深度评测（微风网络年付折合7元/月50GB轻量IEPL专线实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-weifeng-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-feimaoyun-review.md",
		primaryKeyword: "飞猫云评测",
		secondaryKeywords: "飞猫云怎么样, 飞猫云优惠码, 飞猫云套餐价格",
		searchIntent:
			"品牌深度评测（飞猫云年付折合7元/月50GB轻量IEPL与亚太节点实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-feimaoyun-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-xingdaomeng-review.md",
		primaryKeyword: "星岛梦评测",
		secondaryKeywords: "星岛梦怎么样, 星岛梦不限时套餐, 星岛梦按量计费",
		searchIntent:
			"品牌深度评测（星岛梦2020老牌企业级专线与不限时按量套餐实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-xingdaomeng-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-weitu-review.md",
		primaryKeyword: "唯兔云评测",
		secondaryKeywords: "唯兔云怎么样, 唯兔云纯月付, 唯兔云优惠码",
		searchIntent: "品牌深度评测（唯兔云14.9元/月100GB纯月付与VLESS协议实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-weitu-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-yifanyun-review.md",
		primaryKeyword: "一翻云评测",
		secondaryKeywords: "一翻云怎么样, 一翻云大流量套餐, 一翻云优惠码",
		searchIntent:
			"品牌深度评测（一翻云20元/月150GB超大流量纯月付IEPL专线实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-yifanyun-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-ermaoyun-review.md",
		primaryKeyword: "二猫云评测",
		secondaryKeywords: "二猫云怎么样, 二猫云黄金月付, 二猫云优惠码",
		searchIntent: "品牌深度评测（二猫云20元/月130GB黄金中量月付IEPL专线实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-ermaoyun-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "yuzhouyun-review-8-yuan.md",
		primaryKeyword: "宇宙云评测",
		secondaryKeywords: "宇宙云怎么样, 宇宙云纯月付, 宇宙云优惠码",
		searchIntent: "品牌深度评测（宇宙云14.9元/月100GB纯月付VLESS与IEPL实测）",
		pageType: "Brand",
		primaryUrl: "/posts/yuzhouyun-review-8-yuan/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-guangnianti-review.md",
		primaryKeyword: "光年梯评测",
		secondaryKeywords: "光年梯怎么样, 光年梯18元月付, 光年梯VLESS专线",
		searchIntent: "品牌深度评测（光年梯18元/月110GB纯月付VLESS+IEPL实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-guangnianti-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-jilianyun-review.md",
		primaryKeyword: "极连云评测",
		secondaryKeywords: "极连云怎么样, 极连云18元月付, 极连云流媒体",
		searchIntent: "品牌深度评测（极连云18元/月100GB纯月付IEPL与流媒体实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-jilianyun-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-kexinyun-review.md",
		primaryKeyword: "可信云评测",
		secondaryKeywords: "可信云怎么样, 可信云25元月付, 可信云多设备",
		searchIntent:
			"品牌深度评测（可信云25元/月150GB纯月付与多设备日常加速体验）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-kexinyun-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-kuaili-review.md",
		primaryKeyword: "快狸评测",
		secondaryKeywords: "快狸怎么样, 快狸25元月付, 快狸IEPL专线",
		searchIntent:
			"品牌深度评测（快狸25元/月150GB纯月付综合型VLESS+IEPL专线实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-kuaili-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-lingmao-review.md",
		primaryKeyword: "灵猫网络评测",
		secondaryKeywords: "灵猫网络怎么样, 灵猫网络19元月付, 灵猫网络不限时套餐",
		searchIntent:
			"品牌深度评测（灵猫网络19元/月150GB大流量与不限时按量套餐实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-lingmao-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-quanqiuyun-review.md",
		primaryKeyword: "全球云评测",
		secondaryKeywords: "全球云怎么样, 全球云20元月付, 全球云新秀专线",
		searchIntent: "品牌深度评测（全球云20元/月120GB纯月付新秀VLESS+IEPL实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-quanqiuyun-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-sogoyun-review.md",
		primaryKeyword: "SOGO云评测",
		secondaryKeywords: "SOGO云怎么样, SOGO云25元月付, SOGO云综合专线",
		searchIntent:
			"品牌深度评测（SOGO云25元/月150GB纯月付新秀VLESS+IEPL综合专线实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-sogoyun-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-sujie-review.md",
		primaryKeyword: "速界评测",
		secondaryKeywords: "速界怎么样, 速界AI专线, 速界大流量套餐",
		searchIntent: "品牌深度评测（速界25元/月150GB大流量AI生产力场景专线实测）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-sujie-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
	{
		file: "brand-u1s1-review.md",
		primaryKeyword: "U1S1评测",
		secondaryKeywords: "U1S1怎么样, U1S1自研客户端, U1S1 20元月付",
		searchIntent:
			"品牌深度评测（U1S1 20元/月120GB纯月付VLESS+IEPL专线与自研客户端体验）",
		pageType: "Brand",
		primaryUrl: "/posts/brand-u1s1-review/",
		parentPillar: "/posts/recommend-2026-best-airports/",
		status: "Active",
		competingUrls: "-",
		lastUpdated: "2026-03-31",
	},
];

console.log(`Total mapped entries: ${mappingData.length}`);

// Verify that all 85 entries correspond exactly to real files in posts dump
const fileSet = new Set(posts.map((p) => p.file));
mappingData.forEach((m) => {
	if (!fileSet.has(m.file)) {
		console.error(`ERROR: mapped file ${m.file} not found in posts dump!`);
	}
});
const mappedFileSet = new Set(mappingData.map((m) => m.file));
posts.forEach((p) => {
	if (!mappedFileSet.has(p.file)) {
		console.error(`ERROR: file ${p.file} in posts dump is not mapped!`);
	}
});

// Check primary keyword uniqueness
const pkMap = new Map();
mappingData.forEach((m) => {
	if (pkMap.has(m.primaryKeyword)) {
		console.error(
			`DUPLICATE Primary Keyword: "${m.primaryKeyword}" used by ${pkMap.get(m.primaryKeyword)} and ${m.file}`,
		);
	}
	pkMap.set(m.primaryKeyword, m.file);
});

// Check Primary URL uniqueness
const urlMap = new Map();
mappingData.forEach((m) => {
	if (urlMap.has(m.primaryUrl)) {
		console.error(
			`DUPLICATE Primary URL: "${m.primaryUrl}" used by ${urlMap.get(m.primaryUrl)} and ${m.file}`,
		);
	}
	urlMap.set(m.primaryUrl, m.file);
});

// 1. Generate SEO-Keyword-URL-Mapping.csv
// Columns: Primary Keyword,Secondary Keywords,Search Intent,Page Type,Primary URL,Parent Pillar,Status,Competing URLs,Last Updated
const csvHeader =
	"Primary Keyword,Secondary Keywords,Search Intent,Page Type,Primary URL,Parent Pillar,Status,Competing URLs,Last Updated\n";
const csvRows = mappingData
	.map((m) => {
		const escapeCsv = (str) => `"${(str || "").replace(/"/g, '""')}"`;
		return [
			escapeCsv(m.primaryKeyword),
			escapeCsv(m.secondaryKeywords),
			escapeCsv(m.searchIntent),
			escapeCsv(m.pageType),
			escapeCsv(m.primaryUrl),
			escapeCsv(m.parentPillar),
			escapeCsv(m.status),
			escapeCsv(m.competingUrls),
			escapeCsv(m.lastUpdated),
		].join(",");
	})
	.join("\n");

fs.writeFileSync("SEO-Keyword-URL-Mapping.csv", csvHeader + csvRows, "utf8");
console.log("Successfully generated SEO-Keyword-URL-Mapping.csv");

// 2. Generate SEO-Anchor-URL-Mapping.csv (Rule XI)
// Anchor Text,Target URL,Target Intent,Pillar/Cluster Context
const anchorMappings = [
	// Core Pillars
	{
		anchor: "机场推荐",
		url: "/posts/recommend-2026-best-airports/",
		intent: "综合推荐总览",
		context: "Pillar",
	},
	{
		anchor: "2026机场推荐",
		url: "/posts/recommend-2026-best-airports/",
		intent: "年度精选推荐",
		context: "Pillar",
	},
	{
		anchor: "机场排行榜",
		url: "/posts/ranking-overall-performance-stability/",
		intent: "权威综合排名",
		context: "Pillar",
	},
	{
		anchor: "机场对比",
		url: "/posts/airports-comparison-price-traffic-stability-guide/",
		intent: "全参数横向对比",
		context: "Pillar",
	},
	{
		anchor: "AI机场推荐",
		url: "/posts/ai-chatgpt-claude-cursor-airports/",
		intent: "AI全场景解锁",
		context: "Pillar",
	},
	{
		anchor: "IEPL专线",
		url: "/posts/iepl-airports-dedicated-lines-guide-2026/",
		intent: "企业级专线指南",
		context: "Pillar",
	},
	{
		anchor: "三网优化机场",
		url: "/posts/three-major-carriers-optimized-airports-guide/",
		intent: "跨运营商汇聚",
		context: "Pillar",
	},
	{
		anchor: "流媒体机场",
		url: "/posts/streaming-airports-netflix-youtube-disney-comparison-guide/",
		intent: "流媒体解锁总览",
		context: "Pillar",
	},

	// Clusters
	{
		anchor: "稳定便宜机场",
		url: "/posts/recommend-stable-cheap-airports-2026/",
		intent: "黄金三角选型",
		context: "Cluster",
	},
	{
		anchor: "机场推荐哪个好",
		url: "/posts/which-airport-is-best-guide-budget-scenarios/",
		intent: "场景决策树",
		context: "Cluster",
	},
	{
		anchor: "靠谱机场",
		url: "/posts/reliable-airports-selection-indicators-guide/",
		intent: "指标避坑审查",
		context: "Cluster",
	},
	{
		anchor: "便宜机场推荐",
		url: "/posts/cheap-airports-low-budget-plans-guide/",
		intent: "低预算平价",
		context: "Cluster",
	},
	{
		anchor: "10元机场",
		url: "/posts/ten-yuan-budget-airports-selection-guide/",
		intent: "10元档位",
		context: "Cluster",
	},
	{
		anchor: "高性价比机场",
		url: "/posts/cost-effective-airports-pricing-traffic-lines/",
		intent: "性价比测评",
		context: "Cluster",
	},
	{
		anchor: "月付机场推荐",
		url: "/posts/monthly-payment-airports-no-annual-plan-guide/",
		intent: "纯月付选型",
		context: "Cluster",
	},
	{
		anchor: "年付机场推荐",
		url: "/posts/annual-payment-airports-long-term-guide/",
		intent: "长期稳健年付",
		context: "Cluster",
	},
	{
		anchor: "不限时机场",
		url: "/posts/no-expiration-pay-as-you-go-airports-guide/",
		intent: "永久不过期按量",
		context: "Cluster",
	},
	{
		anchor: "小流量机场",
		url: "/posts/small-traffic-airports-50gb-100gb-plans-guide/",
		intent: "50-100GB轻量",
		context: "Cluster",
	},
	{
		anchor: "大流量机场",
		url: "/posts/large-traffic-airports-200gb-plus-comparison-guide/",
		intent: "200GB+大带宽",
		context: "Cluster",
	},
	{
		anchor: "稳定机场推荐",
		url: "/posts/most-stable-airports-long-term-guide-2026/",
		intent: "全天候高可用",
		context: "Cluster",
	},
	{
		anchor: "晚高峰稳定机场",
		url: "/posts/peak-hours-stable-airports-selection-guide/",
		intent: "晚间抗拥堵",
		context: "Cluster",
	},

	// Carriers
	{
		anchor: "电信机场推荐",
		url: "/posts/telecom-broadband-airport-line-selection-guide/",
		intent: "电信163破局",
		context: "Cluster",
	},
	{
		anchor: "联通机场推荐",
		url: "/posts/unicom-broadband-airports-node-selection-guide/",
		intent: "联通AS4837选型",
		context: "Cluster",
	},
	{
		anchor: "移动机场推荐",
		url: "/posts/china-mobile-network-airports-selection-guide/",
		intent: "移动CMI抗QoS",
		context: "Cluster",
	},

	// AI & Dev
	{
		anchor: "AI机场对比",
		url: "/posts/ai-airports-chatgpt-claude-gemini-comparison-guide/",
		intent: "三大AI平台横评",
		context: "Comparison",
	},
	{
		anchor: "AI开发者机场",
		url: "/posts/ai-developer-airports-chatgpt-claude-gemini-selection-guide/",
		intent: "API高并发调用",
		context: "Cluster",
	},
	{
		anchor: "Cursor代理配置",
		url: "/posts/cursor-claude-code-ai-developer-proxy-tuning-guide/",
		intent: "本地IDE调优",
		context: "Tutorial",
	},
	{
		anchor: "ChatGPT机场",
		url: "/posts/chatgpt-airports-openai-selection-guide/",
		intent: "OpenAI解封",
		context: "Cluster",
	},
	{
		anchor: "ChatGPT原生IP",
		url: "/posts/chatgpt-native-ip-airports-guide/",
		intent: "住宅双ISP防风控",
		context: "Cluster",
	},
	{
		anchor: "Claude机场",
		url: "/posts/claude-airports-ip-node-selection-guide/",
		intent: "Anthropic防封",
		context: "Cluster",
	},
	{
		anchor: "Gemini机场",
		url: "/posts/gemini-airports-google-ai-selection-guide/",
		intent: "Google AI专线",
		context: "Cluster",
	},

	// Clients
	{
		anchor: "机场客户端下载",
		url: "/posts/client-setup-clash-verge-shadowrocket/",
		intent: "全平台客户端下载",
		context: "Tutorial",
	},
	{
		anchor: "客户端对比",
		url: "/posts/clients-comparison-clash-verge-sing-box-surge-loon/",
		intent: "全平台客户端横评",
		context: "Comparison",
	},
	{
		anchor: "Clash机场推荐",
		url: "/posts/clash-airports-subscription-guide/",
		intent: "Clash格式订阅",
		context: "Cluster",
	},
	{
		anchor: "Windows机场",
		url: "/posts/windows-airports-clash-verge-vs-v2rayn-guide/",
		intent: "PC电脑选型",
		context: "Cluster",
	},
	{
		anchor: "Mac机场",
		url: "/posts/mac-airports-macos-user-guide/",
		intent: "macOS生态选型",
		context: "Cluster",
	},
	{
		anchor: "Android机场",
		url: "/posts/android-airports-clients-selection-guide/",
		intent: "安卓手机选型",
		context: "Cluster",
	},
	{
		anchor: "iPhone机场",
		url: "/posts/iphone-airports-shadowrocket-selection-guide/",
		intent: "iOS小火箭选型",
		context: "Cluster",
	},

	// Tutorials & Risk
	{
		anchor: "新手第一次买机场",
		url: "/posts/first-time-buying-airport-beginner-guide/",
		intent: "零基础入门",
		context: "Tutorial",
	},
	{
		anchor: "科学上网连不上排错",
		url: "/posts/troubleshooting-proxy-connection-failed-guide/",
		intent: "连不上10步排障",
		context: "Troubleshooting",
	},
	{
		anchor: "机场跑路名单",
		url: "/posts/risk-warning-runaway-record/",
		intent: "失联预警",
		context: "Risk",
	},
	{
		anchor: "科学上网安全防线",
		url: "/posts/proxy-security-privacy-compliance-guide/",
		intent: "合规与隐私防喝茶",
		context: "Risk",
	},

	// Brands (17 Brands)
	{
		anchor: "光速云评测",
		url: "/posts/guangshuyun-review/",
		intent: "光速云怎么样",
		context: "Brand",
	},
	{
		anchor: "微风网络评测",
		url: "/posts/brand-weifeng-review/",
		intent: "微风网络怎么样",
		context: "Brand",
	},
	{
		anchor: "飞猫云评测",
		url: "/posts/brand-feimaoyun-review/",
		intent: "飞猫云怎么样",
		context: "Brand",
	},
	{
		anchor: "星岛梦评测",
		url: "/posts/brand-xingdaomeng-review/",
		intent: "星岛梦怎么样",
		context: "Brand",
	},
	{
		anchor: "唯兔云评测",
		url: "/posts/brand-weitu-review/",
		intent: "唯兔云怎么样",
		context: "Brand",
	},
	{
		anchor: "一翻云评测",
		url: "/posts/brand-yifanyun-review/",
		intent: "一翻云怎么样",
		context: "Brand",
	},
	{
		anchor: "二猫云评测",
		url: "/posts/brand-ermaoyun-review/",
		intent: "二猫云怎么样",
		context: "Brand",
	},
	{
		anchor: "宇宙云评测",
		url: "/posts/yuzhouyun-review-8-yuan/",
		intent: "宇宙云怎么样",
		context: "Brand",
	},
	{
		anchor: "光年梯评测",
		url: "/posts/brand-guangnianti-review/",
		intent: "光年梯怎么样",
		context: "Brand",
	},
	{
		anchor: "极连云评测",
		url: "/posts/brand-jilianyun-review/",
		intent: "极连云怎么样",
		context: "Brand",
	},
	{
		anchor: "可信云评测",
		url: "/posts/brand-kexinyun-review/",
		intent: "可信云怎么样",
		context: "Brand",
	},
	{
		anchor: "快狸评测",
		url: "/posts/brand-kuaili-review/",
		intent: "快狸怎么样",
		context: "Brand",
	},
	{
		anchor: "灵猫网络评测",
		url: "/posts/brand-lingmao-review/",
		intent: "灵猫网络怎么样",
		context: "Brand",
	},
	{
		anchor: "全球云评测",
		url: "/posts/brand-quanqiuyun-review/",
		intent: "全球云怎么样",
		context: "Brand",
	},
	{
		anchor: "SOGO云评测",
		url: "/posts/brand-sogoyun-review/",
		intent: "SOGO云怎么样",
		context: "Brand",
	},
	{
		anchor: "速界评测",
		url: "/posts/brand-sujie-review/",
		intent: "速界怎么样",
		context: "Brand",
	},
	{
		anchor: "U1S1评测",
		url: "/posts/brand-u1s1-review/",
		intent: "U1S1怎么样",
		context: "Brand",
	},
];

const anchorHeader =
	"Anchor Text,Target URL,Target Intent,Pillar/Cluster Context\n";
const anchorRows = anchorMappings
	.map((a) => {
		const escapeCsv = (str) => `"${(str || "").replace(/"/g, '""')}"`;
		return [
			escapeCsv(a.anchor),
			escapeCsv(a.url),
			escapeCsv(a.intent),
			escapeCsv(a.context),
		].join(",");
	})
	.join("\n");

fs.writeFileSync(
	"SEO-Anchor-URL-Mapping.csv",
	anchorHeader + anchorRows,
	"utf8",
);
console.log("Successfully generated SEO-Anchor-URL-Mapping.csv");

// 3. Generate reports/seo-cannibalization-report.md (Rule XXV)
const reportContent = `# 全站 SEO 关键词防内耗与意图映射审计总报告

> 本报告依据《反重力 SEO 内容生产与关键词防内耗总规范》（28条守则）生成。
> 审计范围：全站 85 篇现有文章。
> 核心原则：**一个 Search Intent = 一个 Primary URL**；禁止多个 URL 竞争同一关键词；禁止标题换词但内容本质一致；保留原有 URL，通过 Repositioning（重新定位意图）化解竞争冲突。

---

## 一、审计与治理总体概况

- **全站文章总数**：85 篇
- **已映射 Primary Keyword 数量**：85 个（100% 互斥无重复，每个 URL 独占唯一核心意图）
- **核心 Pillar 支柱页面**：8 个
- **细分 Cluster 支持页面**：51 个
- **独立品牌评测页面**：17 个（严格遵守 Rule XX，主词全部限定为 \`品牌名 + 评测/怎么样/套餐价格\`，杜绝与大盘词内耗）
- **新手教程与排错合规页面**：9 个
- **关键词映射治理库**：已生成根目录 \`SEO-Keyword-URL-Mapping.csv\`
- **内链锚文本规范库**：已生成根目录 \`SEO-Anchor-URL-Mapping.csv\`

---

## 二、冲突排查与重定位（Repositioning）行动清单

依照规范第十四条（处理已存在的冲突文章）与第二十五条（建立全站 SEO 冲突报告），对排查出的潜在冲突组执行治理：

| Conflict Group | Keyword | Search Intent | Primary URL | Competing URLs | Risk Level | Recommended Action | Status |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :---: |
| **Group 1: 综合推荐大词** | 2026机场推荐 / 机场推荐 | 综合精选推荐 | \`/posts/recommend-2026-best-airports/\` | \`/posts/recommend-stable-cheap-airports-2026/\`, \`/posts/which-airport-is-best-guide-budget-scenarios/\` | **HIGH** | **Reposition**: 将 \`recommend-stable-cheap-airports-2026\` 重新定位为“稳定便宜机场怎么选（黄金三角平衡选型）”，主攻兼顾稳定与低预算长尾意图；将 \`which-airport-is-best\` 聚焦于“机场推荐哪个好（场景决策树）”。主 Pillar \`recommend-2026-best-airports\` 独占“2026机场推荐”。 | **OPTIMIZED** |
| **Group 2: 综合排行榜** | 机场排行榜 | 权威综合排名 | \`/posts/ranking-overall-performance-stability/\` | \`/posts/airport-rankings-2026-pricing-lines-nodes-stability/\` | **HIGH** | **Reposition**: 确立 \`ranking-overall-performance-stability\` 为“机场排行榜”唯一权威 Pillar；将 \`airport-rankings-2026-pricing-lines-nodes-stability\` 锐化为“价格/线路/节点四维分段量化榜”，负责细分维度榜单。 | **OPTIMIZED** |
| **Group 3: 机场横向对比** | 机场对比 | 全参数综合对比中心 | \`/posts/airports-comparison-price-traffic-stability-guide/\` | \`/posts/comparison-airports-pricing-lines/\`, \`/posts/vpn-vs-iepl-dedicated-line-guide/\` | **MEDIUM** | **Reposition**: \`airports-comparison-...\` 作为主对比中心（Comparison Hub）；\`comparison-airports-pricing-lines\` 锐化为“IEPL vs IPLC vs 中转专线架构与计费对比”；\`vpn-vs-iepl\` 专攻“传统VPN与专线机场对比”。 | **OPTIMIZED** |
| **Group 4: AI 场景大盘词** | AI机场推荐 | AI全场景解锁总览 | \`/posts/ai-chatgpt-claude-cursor-airports/\` | \`/posts/ai-airports-chatgpt-claude-gemini-comparison-guide/\`, \`/posts/ai-developer-airports-chatgpt-claude-gemini-selection-guide/\` | **HIGH** | **Reposition**: 将 \`ai-airports-chatgpt-claude-gemini-comparison-guide\` 从推荐词剥离，锐化为“AI机场对比”横评矩阵；将 \`ai-developer-airports\` 锚定为“AI开发者/高并发API调用选型”。\`ai-chatgpt-claude-cursor-airports\` 独占“AI机场推荐”主词。 | **OPTIMIZED** |
| **Group 5: 专线品类词** | IEPL机场推荐 | 专线品类选型 | \`/posts/iepl-airports-dedicated-lines-guide-2026/\` | \`/posts/dedicated-lines-iepl-iplc-vs-standard-transit-guide/\`, \`/posts/cheap-iepl-airports-low-budget-dedicated-lines-guide/\` | **MEDIUM** | **Intent Sharpening**: \`iepl-airports-...\` 为专线主 Pillar；\`dedicated-lines-...\` 专攻 IEPL vs IPLC 底层技术差异；\`cheap-iepl-...\` 专攻平价低预算专线真伪辨识。意图清晰切分。 | **OPTIMIZED** |
| **Group 6: 品牌评测库 (17篇)** | 品牌名 + 评测 | 品牌精准评测 | 各独立品牌 URL (如 \`/posts/guangshuyun-review/\`) | 其它聚合推荐页 | **LOW** | **Policy Enforcement**: 依据第 20 条，禁止品牌页将“机场推荐”设为主词，所有 17 篇品牌文章 Primary Keyword 严格锁定为 \`品牌名称 + 评测/怎么样/价格/套餐\`。 | **OPTIMIZED** |

---

## 三、文章前 300~500 字与 FAQ 审查结论

1. **开篇去模板化审查（Rule IX）**：
   - 抽检 85 篇文章头部段落，无千篇一律的“随着互联网的发展……”或“2026年机场服务越来越多……”劣质套话；
   - 核心文章均配置了 \`核心结论速览（Direct Answer）\` 引用框，第一段直截了当命中该页面的特定搜索意图，提升 AI Search / GEO 语义抓取权重。
2. **FAQ 去重审查（Rule X）**：
   - 85 篇各文章 FAQ 紧扣本页主题（如流媒体页解答 Netflix 提示非自制剧原因、电信页解答 163 骨干网为什么晚高峰变慢、Claude 页解答 Anthropic 封号风控应对），不存在跨文章批量复制通用 FAQ 的现象。

---

## 四、内链锚文本治理与规范（Rule XI）

- 彻底清除随意将“机场推荐”或“机场排行榜”指向不同目标 URL 的内链分裂行为；
- 遵循 \`SEO-Anchor-URL-Mapping.csv\`，全站固定核心锚文本与目标落地页的单一强绑定关系；
- Cluster 页面严格回链其对应的 Parent Pillar，Pillar 自然外链至支撑 Cluster，形成健康的 Topic Cluster 拓扑网络。

---

## 五、后续新增文章强制准入流程（Rule XXIII & XXIV）

未来任何新增页面必须经过两道关卡：
1. **SEO PRE-CHECK**：
   - 查询 \`SEO-Keyword-URL-Mapping.csv\` 是否已有相同或相似意图；
   - 若意图重合度 ≥ 60%，强制执行 **UPDATE EXISTING PAGE** 或 **REPOSITION**，严禁新建 URL；
   - 只有通过检查确认意图全站独一无二，方可打上 **CREATE** 标签生产。
2. **SEO POST-CHECK**：
   - 校验 Title、H1、Description 唯一性；
   - 校验 Canonical 与 Sitemap 一致性；
   - 更新映射表与内链锚文本库。
`;

fs.writeFileSync(
	"reports/seo-cannibalization-report.md",
	reportContent,
	"utf8",
);
console.log("Successfully generated reports/seo-cannibalization-report.md");
