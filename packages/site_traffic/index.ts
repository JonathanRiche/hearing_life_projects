import { getCouponEvents } from "./src/getEvents";

// Parse command line arguments
const args = process.argv.slice(2);
const saveToCsv = args.includes("--csv") || args.includes("-c");
const csvFileIndex = args.findIndex((arg) => arg === "--csv" || arg === "-c");
const customFileName = csvFileIndex !== -1 ? args[csvFileIndex + 1] : undefined;
const csvFileName: string =
	customFileName && !customFileName.startsWith("-") ? customFileName : "site_events.csv";

const page_stats = await getCouponEvents({
	site_id: 55,
	created_at: "2025-09-01",
	country: "CA",
	// limit: 10,
});

if (saveToCsv && page_stats.length > 0) {
	// Convert data to CSV format
	const firstRow = page_stats[0];
	if (firstRow) {
		const headers = Object.keys(firstRow).join(",");
		const rows = page_stats
			.map((row) =>
				Object.values(row)
					.map((value) => {
						// Handle values that might contain commas or quotes
						const stringValue = String(value ?? "");
						if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
							return `"${stringValue.replace(/"/g, '""')}"`;
						}
						return stringValue;
					})
					.join(",")
			)
			.join("\n");

		const csvContent = `${headers}\n${rows}`;

		// Write to file
		await Bun.write(csvFileName, csvContent);
		console.log(`Data saved to ${csvFileName} (${page_stats.length} records)`);
	}
} else if (saveToCsv) {
	console.log("No data to save to CSV");
} else {
	console.log(page_stats);
}

