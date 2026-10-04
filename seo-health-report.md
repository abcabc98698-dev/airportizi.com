# 预防性 SEO 健康检查与技术优化审计报告

> **审计执行时间**：2026-10-04  
> **审计对象**：Airportizi 机场指南 (`https://airportizi.com`)  
> **审计版本基线**：Production Build (123 HTML Pages / 85 Markdown Posts)  
> **执行原则**：先审计，后修改；等确认后再执行修改；只输出真实可复现的发现；通过项直接标注 PASS。

---

## 9.1 健康评分

| 维度 | 权重 | 得分 | 说明 |
| :--- | :---: | :---: | :--- |
| **技术 SEO** | 25% | **92 / 100** | 爬虫可访问性、Canonical、Sitemap 与 URL 规范性表现优异；Sitemap 缺少 `lastmod` 标签，安全响应头缺少 HSTS。 |
| **内容质量** | 25% | **94 / 100** | 全站平均字数达 8,714 汉字，无 Thin Content；关键词意图 100% 映射互斥；存在 3 组栏目页与文章页 H1 重复，多数内容集中在 2026 Q1。 |
| **E-E-A-T** | 20% | **76 / 100** | 存在关于页面与实验室测速说明；但 85 篇博文缺少明确作者署名，全站缺失独立的“评测方法论”、“隐私政策”与“服务条款”。 |
| **联盟链接合规** | 15% | **58 / 100** | **高危短板**：全站 1,424 处商业返利链接均仅标记 `noopener noreferrer`，未配置 `rel="nofollow sponsored"`；缺少显式推广披露与佣金说明。 |
| **内部链接** | 10% | **90 / 100** | 全站无内部死链与空链接，点击深度控制在 2 层以内，锚文本高度精准；`/series/` 页面未被导航收录，存在孤立页面。 |
| **结构化数据** | 5% | **92 / 100** | 8 大聚合栏目完整实现 `ItemList` + `FAQPage`，85 篇博文具备 `BlogPosting` + `BreadcrumbList`，语法 100% 合法；部分文章 FAQ 未结构化，关于页缺少 Organization。 |
| **综合得分** | **100%** | **85.3 / 100** | **等级：B+（良好，但存在商业合规与技术安全隐患需在放量前修复）** |

---

## 详细审计检查结果汇总（一至八项）

### 一、技术 SEO 健康检查
- **1.1 Robots 与爬虫可访问性**：`PASS ✅`
  - `docs/public/robots.txt` 不存在（项目采用 `src/pages/robots.txt.ts` 动态渲染至 `dist/robots.txt`，机制合规）。
  - `dist/robots.txt` 无 `Disallow: /` 封禁。
  - 显式声明允许主流爬虫：`Googlebot`、`bingbot`、`Baiduspider`、`yisouspider`。
  - 正确声明正式域名 Sitemap：`https://airportizi.com/sitemap.xml` 与 `sitemap-index.xml`。
  - 仅屏蔽 `/_astro/`, `/archive/?*`, `/search/?*`, `/dynamic/comments/`，核心栏目 100% 可访问。
- **1.2 Canonical 与 Noindex**：`PASS ✅`
  - 全站 123 个生成页面中，108 个正式收录页面 canonical 全部自引用并指向 `https://airportizi.com`，无跨域、无参数、无非首页指向首页异常。
  - 404 页、搜索页及 12 个功能关闭的重定向桩页面均包含 `noindex` 且 canonical 统一指向 `/404/`，逻辑严密。
  - 部署配置文件 `vercel.json` 与 `wrangler.jsonc` 均未配置 `X-Robots-Tag: noindex`。
- **1.3 Sitemap 健康度**：`WARNING ⚠️`
  - `sitemap.xml` 与 `sitemap-0.xml` 均可访问，共收录 108 个正式 URL，无 404、无 noindex、无草稿、无重复 URL。
  - **异常发现**：`sitemap-0.xml` 中所有 URL 仅包含 `<loc>`，**缺少 `<lastmod>` 属性**，不利于搜索引擎精准感知页面内容更新。
- **1.4 URL 规范**：`PASS ✅`
  - 全站 123 个 URL 统一小写，无中文 URL，末尾斜杠策略（`trailingSlash: "always"`）全局一致。
  - 全站无带参动态 URL 被索引。85 篇核心文章在 `SEO-Keyword-URL-Mapping.csv` 中 100% 互斥，无关键词竞争内耗。
- **1.5 404 与异常状态码**：`PASS ✅`
  - 抽测 30 个核心 URL，正常页面均返回 `200 OK`，平均响应时间 8~15ms。
  - 非法测试路径 `/non-existent-test-404-url/` 正确返回真实 `404` 状态码，无 Soft 404。
- **1.6 HTTPS 与安全**：`WARNING ⚠️`
  - 全站 123 个页面中，HTTP 混合内容（Mixed Content）数量为 0。
  - **异常发现**：`vercel.json` 缺少 `Strict-Transport-Security` (HSTS) 安全响应头配置。

---

### 二、内容质量健康检查
- **2.1 内容深度**：`PASS ✅`
  - 全站 85 篇博文中：
    - `< 300字`：0 篇
    - `< 500字`：0 篇
    - `500 - 1000字`：1 篇（`proxy-security-privacy-compliance-guide.md`，948 汉字）
    - `1000 - 3000字`：1 篇（`client-setup-clash-verge-shadowrocket.md`，1,385 汉字）
    - `5000 - 7500字`：7 篇
    - `7500+字`：76 篇（占比 89.4%）
  - 全站博文平均纯中文字数达 **8,714 汉字**，最大文章达 14,092 汉字，完全免除 Thin Content 算法惩罚风险。
- **2.2 内容原创性**：`PASS ✅`
  - 抽检 10 篇文章正文与开篇，均配置专属“核心结论速览（Direct Answer）”和特定场景参数对比表，逻辑完整，具备高原创技术深度。
- **2.3 内容重复度**：`WARNING ⚠️`
  - 重复 Title：0 处。
  - 重复 Description：0 处。
  - **异常发现**：存在 3 处 H1 标签完全重合：
    1. `/free/` 与 `/posts/free-trial-discount-coupon-codes/` 共享 H1: `免费试用、极简低价与机场专属优惠码专区`
    2. `/jichang/` 与 `/posts/ranking-overall-performance-stability/` 共享 H1: `2026 科学上网机场推荐与权威排行榜`
    3. `/nodes/` 与 `/posts/global-nodes-speedtest-benchmark-guide/` 共享 H1: `全球节点分布与专线网络测速指南`
- **2.4 内容更新频率**：`WARNING ⚠️`
  - 85 篇文章中，有 70 篇文章的 `published` / `updated` 日期集中在 2026 年 1~4 月（距当前时间超过 180 天），超过 12 个月的为 0 篇。需按计划滚动更新。
- **2.5 内容覆盖度**：`PASS ✅`
  - 8 大 Pillar 支柱、51 个 Cluster 支持页、17 个独立品牌评测页与 9 个工具教程已完整上线。

---

### 三、E-E-A-T 健康检查
- **3.1 作者信息**：`WARNING ⚠️`
  - **异常发现**：全站 85 篇博文的 frontmatter 中 `author` 字段全部为空字符 `""`，仅依赖全局配置回退显示为 `Airportizi`，缺乏作者个人背景、专业领域及社交主页认证链接。
- **3.2 信任信号**：`WARNING ⚠️`
  - 存在关于我们页面 `/about/`（`src/content/spec/about.md`），内含测速环境与核心监测指标说明。
  - **异常发现**：全站缺失独立的“评测方法论（Methodology）”页面；缺失“隐私政策（Privacy Policy）”与“服务条款（Terms of Service）”合规法律文本。
- **3.3 数据来源透明度**：`PASS ✅`
  - 评测中展示了测速环境（广州电信、上海联通、杭州移动）及监测指标（TCP握手耗时、晚高峰丢包、流媒体与AI解锁）。

---

### 四、联盟链接合规检查
- **4.1 链接标记**：`CRITICAL ❌`
  - 全站扫描发现外部链接 2,691 个，其中商业返利/注册直达链接 **1,424 个**。
  - **未标记 `sponsored` 或 `nofollow` 的联盟链接数量：1,424 个（100% 不合规）**！
  - 现状：所有外部链接均被统一配置为 `rel="noopener noreferrer"`。根据 Google 官方《滥用链接防范指南》，商业付费与推广引流链接必须添加 `rel="sponsored"` 或 `rel="nofollow"`，否则存在被判定为“违规链接计划（Link Schemes）”并遭受人工处置的严重风险。
- **4.2 推广披露**：`WARNING ⚠️`
  - 包含返利外链的文章未在正文显眼位置（如顶部说明框或底部）统一添加标准“推广声明（Affiliate Disclosure）”。全站缺少独立的推广披露说明页面。
- **4.3 佣金关系说明**：`WARNING ⚠️`
  - 缺少明确声明：“通过推广链接购买不影响您的实际支付价格，佣金用于本站探针服务器维保”以及“本站与各服务商保持完全独立、无从属关系”。

---

### 五、内部链接与架构健康检查
- **5.1 死链与空链接**：`PASS ✅`
  - 全站内部死链数为 0；空 `href=""` 数量为 0。`href="#"` 共 337 处，均属于 UI 控件行为，无异常。
- **5.2 点击深度**：`PASS ✅`
  - 从首页 `/` 出发计算 BFS 拓扑深度：全站 108 个索引页面深度均在 1~2 层以内，深度 3 层及以上的页面数量为 0。
- **5.3 孤立页面**：`WARNING ⚠️`
  - **异常发现**：`/series/`（系列归档页，`src/pages/series/index.astro`）在 `sitemap.xml` 中正常收录，但全站主导航、侧边栏及正文中**没有任何一条内部链接指向 `/series/`**，属于孤立页面（Orphan Page）。
- **5.4 锚文本**：`PASS ✅`
  - 无“点击这里”、“阅读更多”等无意义锚文本，完全遵守 `SEO-Anchor-URL-Mapping.csv` 进行精准语义映射。
- **5.5 导航结构**：`PASS ✅`
  - 导航完全基于标准 HTML `<a href="...">` 标签，服务端静态渲染，爬虫可无障碍解析。

---

### 六、结构化数据检查
- **6.1 Schema 覆盖度**：`PASS ✅`
  - 8 大栏目落地页（`/brands/`, `/jichang/`, `/clash/`, `/free/`, `/nodes/`, `/tizi/`, `/tutorial/`, `/vpn/`）：100% 具备 `CollectionPage` + `BreadcrumbList` + `ItemList` + `FAQPage` 组合。
  - 85 篇博文：100% 具备 `BlogPosting` + `BreadcrumbList` + `Person` + `Organization`。
  - 首页：具备 `WebSite` + `SearchAction` + `Organization` + `Person`。
  - **轻微缺陷**：`/about/` 仅标记 `ProfilePage`，未补充 `AboutPage` 与 `Organization` 联合实体；博文详情页正文 FAQ 暂未输出独立的 `FAQPage` Schema。
- **6.2 Schema 正确性**：`PASS ✅`
  - 95 处 JSON-LD 语法解析 100% 合法，无语法错误；URL 均使用正式域名 `https://airportizi.com`；无伪造评分或虚构评测数据。

---

### 七、性能与体验检查
- **7.1 Core Web Vitals**：`PASS ✅`
  - 纯 SSG 静态生成架构，首屏响应迅速（TTFB < 25ms），关键样式内联，CLS 预期接近 0。
- **7.2 移动端**：`PASS ✅`
  - 具备标准 Viewport 设置，响应式布局适配完备，字体与触控按键均支持高分辨率屏幕自适应。
- **7.3 资源优化**：`PASS ✅`
  - 图片均预生成 AVIF/WebP 格式并配备现代 srcset；Astro Font API 自动子集化核心字体；静态资源具备指纹缓存。

---

### 八、搜索表现诊断
- **8.1 站长平台验证状态**：`WARNING ⚠️`
  - `src/config/siteConfig.ts` 中的 `seoVerification`（google, bing, baidu, sogou 等）目前均为空字符串，尚未绑定站长平台验证令牌。
- **8.2 索引与提交机制**：`PASS ✅`
  - `scripts/indexnow.mjs` 配置健全，具备向 Bing / IndexNow 主动提交全量 108 个页面的能力。

---

## 9.2 问题清单

### 🔴 CRITICAL（立即修复：直接触发搜索引擎算法惩罚隐患）

#### 问题 C-1: 全站 1,424 处商业返利链接缺少 `rel="sponsored nofollow"` 属性
- **问题描述**：所有指向第三方服务商的注册直达和返利购买链接，生成的 HTML 标签均为 `rel="noopener noreferrer"`。Google 明确规定商业推广和产生收益的联盟链接必须标注 `sponsored` 或 `nofollow`，大量直出且未标记的外部商业链接极易触发 Google 针对 Link Schemes 的反作弊惩罚。
- **发现位置**：
  - `src/plugins/rehype-external-links.mjs`：第 40 行
  - `src/components/widget/CommercialPartners.astro`：第 235 行
  - `src/components/widget/Advertisement.astro`：第 91、125 行
- **影响范围**：全站 85 篇博文正文外链、侧边栏商企合作卡片、广告横幅组件，共波及 1,424 处商业外链。
- **修复建议**：
  1. 在 `rehype-external-links.mjs` 中增加商业域名/带参白名单识别规则，凡命中推广域名或包含 `code=`、`aff=`、`aff_id=` 的外链，自动输出 `rel="nofollow sponsored noopener"`；
  2. 在 `CommercialPartners.astro` 与 `Advertisement.astro` 组件中显式增加 `rel="nofollow sponsored noopener"`。

---

### 🟠 HIGH（本周修复：显著影响排名与 E-E-A-T 评分）

#### 问题 H-1: 缺少显式推广披露与佣金关系说明（Affiliate Disclosure）
- **问题描述**：涉及返利链接的页面缺少置顶或底部的显著推广披露，全站缺乏独立的“推广说明与免责声明”页面，未阐明佣金不影响读者购买价格，易受到 Google 实用内容系统（Helpful Content System）和评价指南的降权。
- **发现位置**：
  - `src/content/posts/*.md`（全站 85 篇博文）
  - `src/components/widget/SiteInfo.astro`
- **影响范围**：全站转化页面与整体商业透明度。
- **修复建议**：
  1. 在文章详情页模板（`src/pages/posts/[...slug].astro`）头部或底部植入标准 Disclosure 提示条；
  2. 新增独立的 `/disclosure/` 或在 `/about/` 页面中补充完整的佣金与独立性声明。

#### 问题 H-2: 缺少法律合规与方法论页面（Privacy, Terms, Methodology）
- **问题描述**：站内缺少独立的“隐私政策”、“服务条款”和“评测方法论”页面，在海外主流搜索引擎（Google、Bing）中缺少权威合规信任凭证。
- **发现位置**：
  - 路由缺失：`/privacy/`, `/terms/`, `/methodology/`
- **影响范围**：网站 E-E-A-T 基础信任度。
- **修复建议**：
  1. 在 `src/content/spec/` 或 `src/pages/` 下补充 `privacy.md`、`terms.md` 与 `methodology.md`；
  2. 在全站页脚（Footer）放置对应页面链接。

#### 问题 H-3: 85 篇博文缺失明确作者（Author）元数据与作者档案
- **问题描述**：全部 85 篇 Markdown 博文 frontmatter 均未填写 `author`，默认退回至站点名称，缺乏具有专业技术背景的作者画像展示，不符合 Google 评测类内容的“真实创作者（Experience & Expertise）”准则。
- **发现位置**：
  - `src/content/posts/*.md`（85 篇文件的 frontmatter）
  - `src/config/profileConfig.ts`：第 12 行
- **影响范围**：全站所有文章的 Schema 结构化数据及前端作者展示。
- **修复建议**：
  1. 完善主作者简介，补充网络工程师/安全测评师等专业背景信息；
  2. 为博文批量配置统一的专业作者署名。

#### 问题 H-4: `/series/` 系列专题页面成为孤立页面（Orphan Page）
- **问题描述**：`/series/` 页面已构建并进入 `sitemap-0.xml`，但主导航菜单未将其收录，且正文及侧边栏均无内链指向该 URL，导致爬虫仅能通过站点地图发现，无法获得站内权重传递。
- **发现位置**：
  - `src/config/navBarConfig.ts`：第 12~372 行（`getDynamicNavBarConfig` 中缺少 Series 入口）
- **影响范围**：`/series/` 页面收录与权重传递。
- **修复建议**：在主导航二级菜单或页脚导航中加入“系列专题（/series/）”入口。

#### 问题 H-5: 部署配置缺少 HSTS (`Strict-Transport-Security`) 安全头
- **问题描述**：`vercel.json` 配置了 `X-Content-Type-Options` 等响应头，但未包含 HSTS，不能在浏览器层面强制要求走 HTTPS，影响安全评分。
- **发现位置**：
  - `vercel.json`：第 6~27 行
- **影响范围**：全站安全协议强制性。
- **修复建议**：在 `vercel.json` 的 headers 列表中补充 `"key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload"`。

---

### 🟡 MEDIUM（本月修复：优化机会与细节提升）

#### 问题 M-1: Sitemap 中缺少 `<lastmod>` 更新时间标签
- **问题描述**：`sitemap-0.xml` 仅包含 `<loc>`，未输出 `<lastmod>`。搜索引擎无法通过站点地图快速识别哪些页面是新发布或近期更新的。
- **发现位置**：
  - `dist/sitemap-0.xml`
  - `astro.config.mjs` 中的 `@astrojs/sitemap` 配置
- **影响范围**：全站 108 个页面的抓取效率。
- **修复建议**：在 `astro.config.mjs` 的 sitemap 插件配置中增加 `serialize` 钩子，将文章 frontmatter 中的 `updated` 或 `published` 日期动态映射为 `<lastmod>`。

#### 问题 M-2: 3 组栏目页与核心文章页存在 H1 标签完全重合
- **问题描述**：
  1. `/free/` 与 `/posts/free-trial-discount-coupon-codes/` 均使用 H1：`免费试用、极简低价与机场专属优惠码专区`；
  2. `/jichang/` 与 `/posts/ranking-overall-performance-stability/` 均使用 H1：`2026 科学上网机场推荐与权威排行榜`；
  3. `/nodes/` 与 `/posts/global-nodes-speedtest-benchmark-guide/` 均使用 H1：`全球节点分布与专线网络测速指南`。
  虽然 URL 与搜索意图已通过 CSV 隔离，但相同的 H1 会降低页面主题的独特性识别度。
- **发现位置**：
  - `src/pages/free/index.astro`、`src/pages/jichang/index.astro`、`src/pages/nodes/index.astro`
- **影响范围**：3 个核心业务频道页的独占性。
- **修复建议**：区分频道页与文章页的 H1。频道页侧重“导航中心/聚合大厅”，文章页侧重“深度评测指南”。

#### 问题 M-3: 70 篇文章时间戳已超过 180 天未更新
- **问题描述**：70 篇博文发布时间为 2026 年 1~4 月，缺乏下半年（Q3/Q4）的更新维护记录，易在“2026最新机场”类即时性搜索竞争中出现排名下滑。
- **发现位置**：
  - `src/content/posts/*.md`（70 篇文件）
- **影响范围**：时效性关键词排名（Freshness Factor）。
- **修复建议**：结合最新节点跑路动态与测速数据，分批次为核心文章刷新 `updated` 字段并追加最新复测结论。

---

### 🟢 LOW（可选：锦上添花）

#### 问题 L-1: 博文详情页正文 FAQ 未输出 `FAQPage` Schema
- **问题描述**：8 大频道聚合页均已输出完整的 `FAQPage` 结构化数据，但 85 篇博文详情页中包含的具体 FAQ 问答尚未转译为 Schema，未充分争取 SERP 富媒体卡片展示机会。
- **发现位置**：
  - `src/pages/posts/[...slug].astro`
- **修复建议**：在博文详情页中增加自动提取正文 `### FAQ` 并生成对应 `FAQPage` JSON-LD 的逻辑。

#### 问题 L-2: 搜索引擎站长平台所有权验证码待挂载
- **问题描述**：`src/config/siteConfig.ts` 中的 `seoVerification` 预留配置目前为空。
- **发现位置**：
  - `src/config/siteConfig.ts`：第 80~86 行
- **修复建议**：网站正式上线并提交 GSC / Bing Webmaster 后，将对应验证 token 填入即可。

---

## 9.3 优化路线图（优先级 TOP 10）

1. **【最高优先级·本周】商业联盟外链合规化改造**：修复 `rehype-external-links.mjs` 及商用组件，确保 1,424 处返利链接全部带上 `rel="nofollow sponsored noopener"`。
2. **【最高优先级·本周】部署 HSTS 安全响应头**：在 `vercel.json` 中配置 `Strict-Transport-Security`，消除技术安全漏洞。
3. **【高优先级·本周】建立推广披露说明（Affiliate Disclosure）机制**：在文章详情页模板中添加醒目的佣金与独立性免责声明框。
4. **【高优先级·本周】新建法律合规页面**：创建 `/privacy/`（隐私政策）与 `/terms/`（服务条款）并接入页脚。
5. **【高优先级·本周】消灭孤立页面**：将 `/series/` 系列专题页面链接补充至主导航或页脚，使其获得站内正常权重传递。
6. **【中优先级·本月】消除 3 处频道落地页与博文页的重复 H1**：微调 `/free/`、`/jichang/`、`/nodes/` 标题，使其与对应文章形成差异化。
7. **【中优先级·本月】Sitemap 启用 `<lastmod>` 属性输出**：配置 `@astrojs/sitemap` 序列化插件，输出每篇文章的真实更新时间。
8. **【中优先级·本月】补充“评测方法论（Methodology）”页面**：将测速环境、三网探针机制、防跑路指标固化为独立权威页面。
9. **【中优先级·本月】完善作者（Author）档案与元数据**：在 85 篇博文中规范署名，补充专业资质介绍以增强 E-E-A-T。
10. **【常规维护】核心文章时效性滚动更新**：结合第四季度实测数据与跑路预警，分批次刷新 70 篇历史文章的 `updated` 属性与内容结论。

---

## 9.4 长期监控建议

### 建议每月执行的检查项
1. **自动化健康门禁**：每次构建发布前执行 `pnpm seo:check`（即 `scripts/seo-health-check.mjs`），拦截意图冲突与死链。
2. **外链合规抽检**：运行外链扫描脚本，确保新增品牌评测文章的外链 100% 具备 `sponsored` 标记。
3. **死链与 404 排查**：使用自动化探针扫描内外部死链，对失效机场域名及时发布风险警示或下架。

### 建议每季度执行的检查项
1. **内容时效性刷新**：审查超过 90 天未更新的 Pillar 支柱页面，刷新各服务商套餐价格、晚高峰测速结果和折扣码。
2. **意图冲突审计**：更新 `SEO-Keyword-URL-Mapping.csv`，核对全站新增文章是否存在搜索意图同质化现象。
3. **Core Web Vitals 实测**：通过 Google Search Console 检查 LCP、CLS 与 INP 真实用户指标（CrUX 数据）。

### 建议每年执行的检查项
1. **全站年度关键词迭代**：将“2026”年度主词平滑演进与重定向至次年主词，更新所有榜单年份标签。
2. **结构化数据标准对齐**：核对 Google 官方 Search Central 最新的 Schema.org 规范变更，适配最新富媒体格式。
3. **信息架构与深度审计**：复查全站点击深度图谱，清理低效 Cluster，强化核心高转化落地页的内部权重分配。
