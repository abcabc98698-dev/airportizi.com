# 全站 SEO 关键词防内耗与意图映射审计总报告

> 本报告依据《反重力 SEO 内容生产与关键词防内耗总规范》（28条守则）生成。
> 审计范围：全站 85 篇现有文章。
> 核心原则：**一个 Search Intent = 一个 Primary URL**；禁止多个 URL 竞争同一关键词；禁止标题换词但内容本质一致；保留原有 URL，通过 Repositioning（重新定位意图）化解竞争冲突。

---

## 一、审计与治理总体概况

- **全站文章总数**：85 篇
- **已映射 Primary Keyword 数量**：85 个（100% 互斥无重复，每个 URL 独占唯一核心意图）
- **核心 Pillar 支柱页面**：8 个
- **细分 Cluster 支持页面**：51 个
- **独立品牌评测页面**：17 个（严格遵守 Rule XX，主词全部限定为 `品牌名 + 评测/怎么样/套餐价格`，杜绝与大盘词内耗）
- **新手教程与排错合规页面**：9 个
- **关键词映射治理库**：已生成根目录 `SEO-Keyword-URL-Mapping.csv`
- **内链锚文本规范库**：已生成根目录 `SEO-Anchor-URL-Mapping.csv`

---

## 二、冲突排查与重定位（Repositioning）行动清单

依照规范第十四条（处理已存在的冲突文章）与第二十五条（建立全站 SEO 冲突报告），对排查出的潜在冲突组执行治理：

| Conflict Group | Keyword | Search Intent | Primary URL | Competing URLs | Risk Level | Recommended Action | Status |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :---: |
| **Group 1: 综合推荐大词** | 2026机场推荐 / 机场推荐 | 综合精选推荐 | `/posts/recommend-2026-best-airports/` | `/posts/recommend-stable-cheap-airports-2026/`, `/posts/which-airport-is-best-guide-budget-scenarios/` | **HIGH** | **Reposition**: 将 `recommend-stable-cheap-airports-2026` 重新定位为“稳定便宜机场怎么选（黄金三角平衡选型）”，主攻兼顾稳定与低预算长尾意图；将 `which-airport-is-best` 聚焦于“机场推荐哪个好（场景决策树）”。主 Pillar `recommend-2026-best-airports` 独占“2026机场推荐”。 | **OPTIMIZED** |
| **Group 2: 综合排行榜** | 机场排行榜 | 权威综合排名 | `/posts/ranking-overall-performance-stability/` | `/posts/airport-rankings-2026-pricing-lines-nodes-stability/` | **HIGH** | **Reposition**: 确立 `ranking-overall-performance-stability` 为“机场排行榜”唯一权威 Pillar；将 `airport-rankings-2026-pricing-lines-nodes-stability` 锐化为“价格/线路/节点四维分段量化榜”，负责细分维度榜单。 | **OPTIMIZED** |
| **Group 3: 机场横向对比** | 机场对比 | 全参数综合对比中心 | `/posts/airports-comparison-price-traffic-stability-guide/` | `/posts/comparison-airports-pricing-lines/`, `/posts/vpn-vs-iepl-dedicated-line-guide/` | **MEDIUM** | **Reposition**: `airports-comparison-...` 作为主对比中心（Comparison Hub）；`comparison-airports-pricing-lines` 锐化为“IEPL vs IPLC vs 中转专线架构与计费对比”；`vpn-vs-iepl` 专攻“传统VPN与专线机场对比”。 | **OPTIMIZED** |
| **Group 4: AI 场景大盘词** | AI机场推荐 | AI全场景解锁总览 | `/posts/ai-chatgpt-claude-cursor-airports/` | `/posts/ai-airports-chatgpt-claude-gemini-comparison-guide/`, `/posts/ai-developer-airports-chatgpt-claude-gemini-selection-guide/` | **HIGH** | **Reposition**: 将 `ai-airports-chatgpt-claude-gemini-comparison-guide` 从推荐词剥离，锐化为“AI机场对比”横评矩阵；将 `ai-developer-airports` 锚定为“AI开发者/高并发API调用选型”。`ai-chatgpt-claude-cursor-airports` 独占“AI机场推荐”主词。 | **OPTIMIZED** |
| **Group 5: 专线品类词** | IEPL机场推荐 | 专线品类选型 | `/posts/iepl-airports-dedicated-lines-guide-2026/` | `/posts/dedicated-lines-iepl-iplc-vs-standard-transit-guide/`, `/posts/cheap-iepl-airports-low-budget-dedicated-lines-guide/` | **MEDIUM** | **Intent Sharpening**: `iepl-airports-...` 为专线主 Pillar；`dedicated-lines-...` 专攻 IEPL vs IPLC 底层技术差异；`cheap-iepl-...` 专攻平价低预算专线真伪辨识。意图清晰切分。 | **OPTIMIZED** |
| **Group 6: 品牌评测库 (17篇)** | 品牌名 + 评测 | 品牌精准评测 | 各独立品牌 URL (如 `/posts/guangshuyun-review/`) | 其它聚合推荐页 | **LOW** | **Policy Enforcement**: 依据第 20 条，禁止品牌页将“机场推荐”设为主词，所有 17 篇品牌文章 Primary Keyword 严格锁定为 `品牌名称 + 评测/怎么样/价格/套餐`。 | **OPTIMIZED** |

---

## 三、文章前 300~500 字与 FAQ 审查结论

1. **开篇去模板化审查（Rule IX）**：
   - 抽检 85 篇文章头部段落，无千篇一律的“随着互联网的发展……”或“2026年机场服务越来越多……”劣质套话；
   - 核心文章均配置了 `核心结论速览（Direct Answer）` 引用框，第一段直截了当命中该页面的特定搜索意图，提升 AI Search / GEO 语义抓取权重。
2. **FAQ 去重审查（Rule X）**：
   - 85 篇各文章 FAQ 紧扣本页主题（如流媒体页解答 Netflix 提示非自制剧原因、电信页解答 163 骨干网为什么晚高峰变慢、Claude 页解答 Anthropic 封号风控应对），不存在跨文章批量复制通用 FAQ 的现象。

---

## 四、内链锚文本治理与规范（Rule XI）

- 彻底清除随意将“机场推荐”或“机场排行榜”指向不同目标 URL 的内链分裂行为；
- 遵循 `SEO-Anchor-URL-Mapping.csv`，全站固定核心锚文本与目标落地页的单一强绑定关系；
- Cluster 页面严格回链其对应的 Parent Pillar，Pillar 自然外链至支撑 Cluster，形成健康的 Topic Cluster 拓扑网络。

---

## 五、后续新增文章强制准入流程（Rule XXIII & XXIV）

未来任何新增页面必须经过两道关卡：
1. **SEO PRE-CHECK**：
   - 查询 `SEO-Keyword-URL-Mapping.csv` 是否已有相同或相似意图；
   - 若意图重合度 ≥ 60%，强制执行 **UPDATE EXISTING PAGE** 或 **REPOSITION**，严禁新建 URL；
   - 只有通过检查确认意图全站独一无二，方可打上 **CREATE** 标签生产。
2. **SEO POST-CHECK**：
   - 校验 Title、H1、Description 唯一性；
   - 校验 Canonical 与 Sitemap 一致性；
   - 更新映射表与内链锚文本库。
