import fs from "fs";

async function check() {
	const r2 = await fetch("http://127.0.0.1:4321/posts/guangshuyun-review/");
	const text2 = await r2.text();
	console.log("Images in Guangshuyun:");
	imgMatches.forEach((m) => {
		console.log("  ", m);
	});

	console.log("Search for speedtest in Guangshuyun:");
	console.log(text2.includes("speedtest"));

	const rHome = await fetch("http://127.0.0.1:4321/");
	const homeText = await rHome.text();
	console.log("Search for 万达云 on Home:");
	console.log(homeText.includes("万达云"));
	console.log("Search for 风险预警 on Home:");
	console.log(homeText.includes("风险预警"));

	// Find where dynamic alerts appear on Home
	const alertIndex = homeText.indexOf("风险");
	if (alertIndex !== -1) {
		console.log(
			"Snippet around 风险 on Home:",
			homeText.slice(alertIndex - 50, alertIndex + 200),
		);
	} else {
		console.log("No 风险 on Home");
	}
}
check();
