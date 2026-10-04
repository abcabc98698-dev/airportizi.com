<div align="center">

# 🚀 Airportizi 机场指南 (airportizi.com)

> **2026 精选稳定机场推荐 · 节点测评与科学上网指南 · 企业级防失联安全导航站**

[![Website](https://img.shields.io/badge/Website-airportizi.com-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white)](https://airportizi.com)
[![Astro 7](https://img.shields.io/badge/Astro-7.2.10-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.57.0-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Pagefind](https://img.shields.io/badge/Search-Pagefind_v1.5-blueviolet?style=for-the-badge)](https://pagefind.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

[🌐 访问官网](https://airportizi.com/) • [📊 机场排行榜](https://airportizi.com/posts/airport-rankings-2026-pricing-lines-nodes-stability/) • [⚡ 光速云测评 (首推)](https://airportizi.com/posts/guangshuyun-review/) • [🛡️ 跑路预警动态](https://airportizi.com/dynamic/) • [🏷️ 品牌库大全](https://airportizi.com/brands/)

</div>

---

## 📖 项目简介 (Overview)

**Airportizi 机场指南**（[airportizi.com](https://airportizi.com)）是专为跨境办公、海外开发者、外贸电商、AI 从业者与科研人员量身打造的中立评测与选型导航网站。全站依托 **Astro 7 + Tailwind CSS 4 + Svelte 5** 现代化技术栈构建，集成了严苛的 **SEO 自动化发布门禁**、**IndexNow 毫秒级推送**、**离线客户端极速全文搜索** 与 **防内耗关键词治理体系**。

全站涵盖 **85+ 篇独立原创测评**、**16+ 主流品牌全景档案**、**8 大核心业务落地页**，专注呈现真实千兆测速大图、晚高峰延迟丢包监控、ChatGPT / Claude / Cursor 原生解锁实测与机场跑路失联实时预警。

---

## ✨ 核心特性 (Key Features)

- ⚡ **极致性能表现**：静态站点全量预渲染（SSG），零多余客户端 JS，Core Web Vitals 性能评分 98+，首屏秒开体验。
- 🛡️ **发布安全门禁 (`pnpm seo:check`)**：内置 10 大发布拦截检查（Robots、Noindex、Canonical、Sitemap、404 死链、核心落地页、Schema JSON-LD、重复 Title/H1、页面数量突变检测），杜绝意外掉索引。
- 🚀 **IndexNow 搜索引擎主动推送 (`pnpm seo:indexnow`)**：内置密钥认证与本地增量缓存，内容构建后毫秒级同步推送至 Bing、Yandex、Seznam 等搜索引擎。
- 🔍 **客户端全文检索 (Pagefind)**：无需第三方服务器支撑，基于 WebAssembly 的极速离线中文分词搜索，毫秒响应。
- 🗺️ **八大专题落地页 (Pillars & Clusters)**：
  - `/vpn/`：VPN 与国际专线加速选购指南
  - `/jichang/`：2026 稳定机场推荐与横向测评总汇
  - `/clash/`：Clash / Clash Verge / Mihomo 全平台配置
  - `/nodes/`：全球骨干网络、BGP 汇聚与 IEPL/IPLC 专线科普
  - `/tizi/`：梯子测评与科学上网加速器推荐
  - `/free/`：免费试用机场、白嫖节点与优惠折扣码汇总
  - `/tutorial/`：客户端跨平台下载安装与排错教程
  - `/brands/`：16+ 梯子机场品牌数据库全景档案
- 📊 **结构化数据体系 (Schema JSON-LD)**：标准支持 `WebSite`、`Organization`、`CollectionPage`、`BreadcrumbList`、`BlogPosting`、`ProfilePage` 与 `FAQPage`。
- 🏷️ **防内耗关键词治理**：根目录内置 `SEO-Keyword-URL-Mapping.csv` 与 `SEO-Anchor-URL-Mapping.csv`，确保一个搜索意图对应唯一主 URL，零内部竞食。

---

## 🛠️ 技术架构 (Tech Stack)

| 领域 | 选型 | 说明 |
| :--- | :--- | :--- |
| **框架基座** | [Astro 7.2](https://astro.build/) | 现代化内容优先 Web 框架，静态全量预渲染 |
| **交互组件** | [Svelte 5](https://svelte.dev/) | 搜索面板、海报生成、主题交互 Islands 组件 |
| **样式工程** | [Tailwind CSS 4](https://tailwindcss.com/) | 极致体积的原子化 CSS 引擎，支持动态色彩系统 |
| **内容层** | Astro Content Layer API | 强类型 Frontmatter 模式校验，Markdown / MDX 原生支持 |
| **搜索系统** | [Pagefind](https://pagefind.app/) | 离线静态索引生成，支持中英文分词与高亮预览 |
| **代码高亮** | Expressive Code | 现代代码块渲染、行号标注、折叠展示与复制支持 |
| **数学公式** | KaTeX + mhchem | 服务端极速数学与化学公式解析 |
| **质量规范** | [Biome](https://biomejs.dev/) | 高性能格式化与静态代码诊断（Tab 缩进、双引号） |
| **部署环境** | Cloudflare Pages / Workers / Vercel / Nginx | 纯静态托管兼容，支持全球边缘 CDN 加速 |

---

## 📁 目录结构 (Directory Structure)

```text
airportizi.com/
├── .github/                  # GitHub Actions 工作流 (自动化构建与部署)
├── public/                   # 静态公开资源 (Favicon、IndexNow 密钥文件等)
│   └── d29068e8c1ed460e92ff8506d9735cd8.txt  # IndexNow 验证 Key
├── reports/                  # SEO 审计与防内耗治理分析报告
├── scripts/                  # 工程化自动化脚本库
│   ├── seo-health-check.mjs  # 🛡️ SEO 发布安全门禁自动化检查脚本
│   ├── indexnow.mjs          # 🚀 IndexNow 主动推送脚本 (增量/全量)
│   ├── run-pagefind.ts       # 静态搜索索引生成工具
│   ├── subset-fonts.ts       # 字体文件静态子集裁剪
│   └── generate-lqips.ts     # 图片低质量占位图生成
├── src/
│   ├── assets/               # 本地源图片与媒体资源
│   ├── components/           # Astro & Svelte 可复用 UI 与 SEO 组件
│   │   └── seo/              # 专题落地页 CategoryLanding 组件
│   ├── config/               # 站点、导航、侧边栏、壁纸全局配置文件
│   │   └── siteConfig.ts     # 主域名、Meta、验证代码全局声明
│   ├── content/              # 内容层
│   │   ├── dynamic/          # 实时跑路预警与防失联动态
│   │   └── posts/            # 85+ 篇正式评测、选型指南与使用教程
│   ├── layouts/              # 页面全局 Layout (SEO Head、JSON-LD 注入)
│   ├── pages/                # 页面路由
│   │   ├── brands/           # /brands/ 品牌库大全
│   │   ├── clash/            # /clash/ 客户端专栏
│   │   ├── free/             # /free/ 免费资源与优惠码
│   │   ├── jichang/          # /jichang/ 机场推荐
│   │   ├── nodes/            # /nodes/ 节点与线路专区
│   │   ├── posts/            # /posts/[...slug]/ 文章详情页
│   │   ├── tizi/             # /tizi/ 梯子专区
│   │   ├── tutorial/         # /tutorial/ 使用教程专区
│   │   ├── vpn/              # /vpn/ 专线与网络架构专区
│   │   ├── robots.txt.ts     # 动态生成合规 robots.txt
│   │   └── sitemap.xml.ts    # 动态输出标准 sitemapindex
│   ├── styles/               # 全局样式与 CSS 变量系统
│   └── utils/                # URL 规范、SEO 诊断、内容处理实用工具
├── SEO-Keyword-URL-Mapping.csv # 📊 85 篇核心意图关键词映射表
├── SEO-Anchor-URL-Mapping.csv  # 🔗 全站内链关键锚文本规范映射表
├── astro.config.mjs          # Astro 配置文件
└── package.json              # 项目依赖与运行脚本
```

---

## 🚀 快速上手 (Getting Started)

### 环境要求
- **Node.js** >= 22.23.0
- **pnpm** >= 11.0.0 (`preinstall` 脚本默认强制要求 pnpm)

### 安装依赖
```bash
git clone https://github.com/abcabc98698-dev/airportizi.com.git
cd airportizi.com
pnpm install
```

### 本地开发
```bash
# 启动本地热重载开发服务器
pnpm dev
# 访问 http://localhost:4321
```

### 代码检查与格式化
```bash
# 执行 Astro 语法诊断与类型检查
pnpm check
pnpm type-check

# 执行 Biome 规范校验与代码自动格式化
pnpm lint
pnpm format
```

---

## 🛡️ 生产构建与 SEO 发布门禁 (Build & SEO Gates)

为杜绝发布导致搜索引擎意外掉索引，项目建立了严格的发布门禁流程：

```bash
# 1. 执行全量静态打包 (自动生成静态 HTML、图标集、字体裁剪与 Pagefind 索引)
pnpm build

# 2. 执行 SEO 上线前安全门禁检查
pnpm seo:check
```

只有当 `pnpm seo:check` 最终输出：
```text
RELEASE_DECISION: READY
PRODUCTION_STATUS: LIVE_HEALTHY
```
才允许推送部署。

### 搜索引擎极速收录 (IndexNow)
部署上线后，可执行以下命令自动将新增/更新的 URL 秒级推送给 Bing 等搜索引擎：
```bash
# 智能增量模式 (只推送有更新的页面)
pnpm seo:indexnow

# 强制全量推送模式 (全量推送 Sitemap 108 个正式 URL)
node scripts/indexnow.mjs --all
```

---

## 🌐 部署指南 (Deployment)

### Cloudflare Pages (推荐)
1. 登录 Cloudflare 控制台 -> **Workers & Pages** -> **Create application** -> **Pages**。
2. 连接 GitHub 仓库 `abcabc98698-dev/airportizi.com`。
3. 构建配置：
   - **Framework preset**: `None` / `Astro`
   - **Build command**: `pnpm build`
   - **Output directory**: `dist`
   - **Node.js Version**: 设置环境变量 `NODE_VERSION = 22.23.0`
4. 绑定自定义域名 `airportizi.com`。
5. 配置重定向规则（Redirect Rule）：将 `www.airportizi.com` 301 永久重定向至 `https://airportizi.com/`。

---

## 📜 许可证 (License)

本项目遵循 [MIT License](LICENSE) 开源协议。

---

<div align="center">
  <sub>Built with ❤️ for privacy, security and extreme web performance.</sub><br/>
  <sub>© 2026 Airportizi 机场指南 (airportizi.com). All rights reserved.</sub>
</div>

---

## 🙏 致谢与灵感 (Credits & Acknowledgments)

- 基础开源框架基于 [Astro](https://astro.build/) 构建。
- UI 交互与动画受 [Firefly](https://github.com/CuteLeaf/Firefly) 与 [fuwari](https://github.com/saicaca/fuwari) 启发并深度重构定制。
- 搜索系统基于 [Pagefind](https://pagefind.app/) 离线全文索引。
- 所有测速图表与测评数据均来自真实物理网络环境与千兆测速节点交叉验证。

---

<div align="center">
  <sub>© 2026 <b>Airportizi 机场指南</b> (airportizi.com). All rights reserved.</sub>
</div>
