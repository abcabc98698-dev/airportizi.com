import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题，留空则走i18n默认标题
	title: "2026 测速与风控简报",

	// 公告内容
	content:
		"已同步更新2026年3月最新晚高峰测速、AI工具（ChatGPT/Claude 3.7）解锁测试与机场跑路预警名单。建议使用月付并收藏本站防失联！",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "查看排行榜",
		// 链接 URL
		url: "/archive/?category=机场排行榜",
		// 内部链接
		external: false,
	},
};
