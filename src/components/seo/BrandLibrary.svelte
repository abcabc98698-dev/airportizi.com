<script lang="ts">
import type { BrandItem } from "@/data/brands";

interface Props {
	brands: BrandItem[];
}

let { brands }: Props = $props();

let query = $state("");
let statusFilter = $state<"all" | "measured" | "vendor" | "historical">("all");
let billingFilter = $state<"all" | "monthly" | "budget" | "payg">("all");
let featureFilter = $state<"all" | "dedicated" | "thirdparty" | "unlock">(
	"all",
);
let sortBy = $state<"rank" | "monthlyPrice" | "screenshots" | "year">("rank");
let copiedId = $state<string | null>(null);

const counts = $derived({
	all: brands.length,
	measured: brands.filter((b) => b.dataStatus === "measured").length,
	vendor: brands.filter((b) => b.dataStatus === "vendor").length,
	historical: brands.filter((b) => b.dataStatus === "historical").length,
});

const filteredBrands = $derived.by(() => {
	const q = query.trim().toLowerCase();
	const list = brands.filter((b) => {
		if (statusFilter !== "all" && b.dataStatus !== statusFilter) {
			return false;
		}
		if (billingFilter === "monthly" && !b.billingModes.includes("月付")) {
			return false;
		}
		if (
			billingFilter === "budget" &&
			(b.annualMonthlyEq === null || b.annualMonthlyEq > 10)
		) {
			return false;
		}
		if (billingFilter === "payg" && !b.billingModes.includes("不限时")) {
			return false;
		}
		if (
			featureFilter === "dedicated" &&
			!b.protocols.some((p) => p.includes("IEPL") || p.includes("IPLC")) &&
			!b.lineType.includes("IEPL") &&
			!b.lineType.includes("IPLC")
		) {
			return false;
		}
		if (featureFilter === "thirdparty" && !b.supportsThirdParty) {
			return false;
		}
		if (featureFilter === "unlock" && !b.hasUnlockImg) {
			return false;
		}
		if (!q) return true;
		const hay = [
			b.name,
			b.alias ?? "",
			b.positioning,
			b.lineType,
			b.coupon ?? "",
			...b.protocols,
			...b.tags,
		]
			.join(" ")
			.toLowerCase();
		return hay.includes(q);
	});

	return [...list].sort((a, b) => {
		if (sortBy === "rank") return a.rank - b.rank;
		if (sortBy === "screenshots") {
			return b.screenshotCount - a.screenshotCount || a.rank - b.rank;
		}
		if (sortBy === "monthlyPrice") {
			const ap = a.monthlyMinPrice ?? a.annualMonthlyEq ?? 999;
			const bp = b.monthlyMinPrice ?? b.annualMonthlyEq ?? 999;
			return ap - bp || a.rank - b.rank;
		}
		const ay = Number.parseInt(a.foundedYear, 10) || 2099;
		const by = Number.parseInt(b.foundedYear, 10) || 2099;
		return ay - by || a.rank - b.rank;
	});
});

function copyCoupon(id: string, code: string) {
	if (typeof navigator !== "undefined" && navigator.clipboard) {
		navigator.clipboard.writeText(code).catch(() => {});
		copiedId = id;
		setTimeout(() => {
			if (copiedId === id) copiedId = null;
		}, 1800);
	}
}

function resetFilters() {
	query = "";
	statusFilter = "all";
	billingFilter = "all";
	featureFilter = "all";
	sortBy = "rank";
}

function statusBadgeClass(status: BrandItem["dataStatus"]): string {
	if (status === "measured") {
		return "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-emerald-500/25";
	}
	if (status === "vendor") {
		return "bg-amber-500/12 text-amber-700 dark:text-amber-300 border-amber-500/25";
	}
	return "bg-slate-500/12 text-slate-700 dark:text-slate-300 border-slate-500/25";
}
</script>

<section class="mb-6" aria-label="机场品牌交互筛选数据库">
	<div class="card-base p-5 md:p-6 mb-4">
		<div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
			<div>
				<h2 class="text-lg md:text-xl font-bold text-90">
					全站 42 家收录机场交互筛选数据库
				</h2>
				<p class="text-xs md:text-sm text-60 mt-1">
					严格区分「有实测大图 ({counts.measured}家 / 24张原图)」、「商家标称待实测 ({counts.vendor}家)」与「历史归档待核实 ({counts.historical}家)」，不混淆年付折算与真实月付价。
				</p>
			</div>
			<div class="text-xs text-50 shrink-0">
				当前命中 <span class="text-(--primary) font-bold text-sm">{filteredBrands.length}</span> / {counts.all} 家
			</div>
		</div>

		<!-- 搜索与排序 -->
		<div class="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
			<div class="md:col-span-8">
				<label for="brand-search-input" class="sr-only">搜索机场品牌、协议或优惠码</label>
				<input
					id="brand-search-input"
					type="search"
					bind:value={query}
					placeholder="搜索品牌名（如 光速云 / Firefly / 飞猫云）、协议（VLESS / IEPL）或优惠码..."
					class="w-full px-3.5 py-2 rounded-lg text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-90 placeholder:text-40 focus:outline-none focus:border-(--primary)"
				/>
			</div>
			<div class="md:col-span-4">
				<label for="brand-sort-select" class="sr-only">排序方式</label>
				<select
					id="brand-sort-select"
					bind:value={sortBy}
					class="w-full px-3 py-2 rounded-lg text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-90 focus:outline-none focus:border-(--primary)"
				>
					<option value="rank">按综合收录序号排序 (TOP 优先)</option>
					<option value="screenshots">按实测/解锁截图数量优先</option>
					<option value="monthlyPrice">按入门价格从低到高排序</option>
					<option value="year">按运营开站年份从早到晚</option>
				</select>
			</div>
		</div>

		<!-- 多维筛选标签栏 -->
		<div class="space-y-2.5 text-xs">
			<div class="flex flex-wrap items-center gap-1.5">
				<span class="text-40 font-semibold mr-1">实证口径:</span>
				<button
					type="button"
					onclick={() => (statusFilter = "all")}
					class={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
						statusFilter === "all"
							? "bg-(--primary) text-white dark:text-black border-transparent font-semibold"
							: "bg-(--btn-regular-bg) text-70 border-black/10 dark:border-white/10 hover:border-(--primary)/40"
					}`}
				>
					全部 ({counts.all})
				</button>
				<button
					type="button"
					onclick={() => (statusFilter = "measured")}
					class={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
						statusFilter === "measured"
							? "bg-emerald-600 text-white border-transparent font-semibold"
							: "bg-(--btn-regular-bg) text-70 border-black/10 dark:border-white/10 hover:border-emerald-500/40"
					}`}
				>
					有实测图 ({counts.measured})
				</button>
				<button
					type="button"
					onclick={() => (statusFilter = "vendor")}
					class={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
						statusFilter === "vendor"
							? "bg-amber-600 text-white border-transparent font-semibold"
							: "bg-(--btn-regular-bg) text-70 border-black/10 dark:border-white/10 hover:border-amber-500/40"
					}`}
				>
					商家标称·待实测 ({counts.vendor})
				</button>
				<button
					type="button"
					onclick={() => (statusFilter = "historical")}
					class={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
						statusFilter === "historical"
							? "bg-slate-600 text-white border-transparent font-semibold"
							: "bg-(--btn-regular-bg) text-70 border-black/10 dark:border-white/10 hover:border-slate-500/40"
					}`}
				>
					历史归档 ({counts.historical})
				</button>
			</div>

			<div class="flex flex-wrap items-center gap-1.5">
				<span class="text-40 font-semibold mr-1">计费周期:</span>
				{#each [
					{ id: "all", label: "不限周期" },
					{ id: "monthly", label: "支持纯月付" },
					{ id: "budget", label: "年付折合≤10元/月" },
					{ id: "payg", label: "含不限时流量包" },
				] as opt}
					<button
						type="button"
						onclick={() =>
							(billingFilter = opt.id as "all" | "monthly" | "budget" | "payg")}
						class={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
							billingFilter === opt.id
								? "bg-(--primary) text-white dark:text-black border-transparent font-semibold"
								: "bg-(--btn-regular-bg) text-70 border-black/10 dark:border-white/10 hover:border-(--primary)/40"
						}`}
					>
						{opt.label}
					</button>
				{/each}
			</div>

			<div class="flex flex-wrap items-center justify-between gap-2">
				<div class="flex flex-wrap items-center gap-1.5">
					<span class="text-40 font-semibold mr-1">网络与客户端:</span>
					{#each [
						{ id: "all", label: "全部属性" },
						{ id: "dedicated", label: "IEPL / IPLC 专线" },
						{ id: "thirdparty", label: "支持 Clash / 小火箭订阅" },
						{ id: "unlock", label: "含流媒体/AI解锁实测图" },
					] as opt}
						<button
							type="button"
							onclick={() =>
								(featureFilter = opt.id as
									| "all"
									| "dedicated"
									| "thirdparty"
									| "unlock")}
							class={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
								featureFilter === opt.id
									? "bg-(--primary) text-white dark:text-black border-transparent font-semibold"
									: "bg-(--btn-regular-bg) text-70 border-black/10 dark:border-white/10 hover:border-(--primary)/40"
							}`}
						>
							{opt.label}
						</button>
					{/each}
				</div>

				{#if query || statusFilter !== "all" || billingFilter !== "all" || featureFilter !== "all"}
					<button
						type="button"
						onclick={resetFilters}
						class="text-xs text-(--primary) hover:underline cursor-pointer"
					>
						清空筛选条件
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- 品牌卡片矩阵 -->
	{#if filteredBrands.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each filteredBrands as brand (brand.id)}
				<article
					class="card-base p-5 flex flex-col justify-between border border-black/5 dark:border-white/10 hover:border-(--primary)/50 transition-all"
				>
					<div>
						<div class="flex items-start justify-between gap-2 mb-2.5">
							<div class="flex flex-wrap items-center gap-2">
								<span
									class={`text-[11px] px-2 py-0.5 rounded font-bold ${
										brand.rank <= 10
											? "bg-(--primary) text-white dark:text-black"
											: "bg-black/8 dark:bg-white/10 text-60"
									}`}
								>
									#{brand.rank}
								</span>
								<h3 class="text-base md:text-lg font-bold text-90">
									<a href={brand.url} class="hover:text-(--primary) transition-colors">
										{brand.name}
									</a>
								</h3>
								<span class="text-xs text-40">({brand.foundedYear})</span>
							</div>
							<span
								class={`text-[11px] px-2 py-0.5 rounded border shrink-0 font-medium ${statusBadgeClass(brand.dataStatus)}`}
							>
								{brand.dataStatusLabel}
							</span>
						</div>

						<p class="text-xs md:text-sm text-70 mb-3 leading-relaxed">
							{brand.positioning}
						</p>

						<!-- 关键数据网格 -->
						<div class="grid grid-cols-2 gap-2 text-xs bg-black/4 dark:bg-white/5 rounded-lg p-3 mb-3">
							<div>
								<div class="text-40 mb-0.5">真实月付门槛</div>
								<div class="font-semibold text-90">
									{brand.monthlyMinPrice !== null
										? `¥${brand.monthlyMinPrice}/月起`
										: "无纯月付 (见年/季付)"}
								</div>
							</div>
							<div>
								<div class="text-40 mb-0.5">年付/季付/按量</div>
								<div class="font-semibold text-90">
									{brand.annualPriceLabel || brand.paygPriceLabel || "仅常规月付"}
								</div>
							</div>
							<div>
								<div class="text-40 mb-0.5">协议与线路</div>
								<div class="text-70 truncate" title={brand.lineType}>
									{brand.protocols.slice(0, 2).join(" · ")}
								</div>
							</div>
							<div>
								<div class="text-40 mb-0.5">流媒体 / AI 口径</div>
								<div class="text-70 truncate" title={brand.aiLabel}>
									{brand.aiLabel}
								</div>
							</div>
						</div>

						<!-- 优惠码与兼容标签 -->
						<div class="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
							{#if brand.coupon}
								<button
									type="button"
									onclick={() => copyCoupon(brand.id, brand.coupon!)}
									class="px-2 py-0.5 rounded bg-(--primary)/10 text-(--primary) font-mono font-semibold hover:bg-(--primary)/20 transition-colors cursor-pointer"
									title="点击复制优惠码"
								>
									优惠码: {brand.coupon} {copiedId === brand.id ? "✓ 已复制" : ""}
								</button>
							{/if}
							{#if brand.supportsThirdParty}
								<span class="px-2 py-0.5 rounded bg-black/5 dark:bg-white/8 text-60">
									支持 Clash / 小火箭
								</span>
							{:else}
								<span class="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-300 font-medium">
									仅专属客户端
								</span>
							{/if}
							{#if brand.paygPriceLabel}
								<span class="px-2 py-0.5 rounded bg-black/5 dark:bg-white/8 text-60">
									含不限时流量包
								</span>
							{/if}
						</div>

						{#if brand.riskNote}
							<p class="text-[11px] text-amber-700 dark:text-amber-300/90 bg-amber-500/8 border border-amber-500/15 rounded-md px-2.5 py-1.5 mb-3">
								客观提示：{brand.riskNote}
							</p>
						{/if}
					</div>

					<!-- 底部操作栏 -->
					<div class="flex items-center justify-between gap-2 pt-3 border-t border-black/5 dark:border-white/10 text-xs">
						<a
							href={brand.url}
							class="inline-flex items-center gap-1 font-semibold text-(--primary) hover:underline"
						>
							阅读深度评测档案 →
						</a>
						{#if brand.affUrl}
							<a
								href={brand.affUrl}
								target="_blank"
								rel="sponsored nofollow noopener noreferrer"
								class="px-3 py-1 rounded-md bg-(--btn-regular-bg) hover:bg-(--primary) hover:text-white dark:hover:text-black text-80 font-medium transition-colors"
							>
								官方入口
							</a>
						{:else}
							<span class="text-40">官方入口待核实</span>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="card-base p-8 text-center text-60">
			<p class="mb-3">未找到同时满足当前筛选条件的机场品牌。</p>
			<button
				type="button"
				onclick={resetFilters}
				class="px-4 py-1.5 rounded-lg bg-(--primary) text-white dark:text-black text-sm font-medium cursor-pointer"
			>
				重置全部筛选条件
			</button>
		</div>
	{/if}
</section>
