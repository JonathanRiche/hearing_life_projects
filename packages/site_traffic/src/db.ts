import { SQL } from "bun";

export type SiteEvent = {
	id: string;
	created_at: Date;
	page_url: string;
	referer: string;
	browser: string;
	operating_system: string;
	device_type: string;
	country: string;
	region: string;
	city: string;
	rid: string;
	event: string;
	tag_id: string;
	client_page_url: string;
	screen_width: string;
	screen_height: string;
	account_id: string;
	site_id: string;
	query_params: unknown[];
	bot_data: unknown | null;
	custom_data: unknown | null;
	postal: string;
};

export function getLytxDB() {
	if (!process.env.LYTX_DATABASE_URL) {
		throw new Error("DATABASE_URL is not set in .env");
	}
	const client = new SQL(process.env.LYTX_DATABASE_URL, {
		idleTimeout: 30,
		max: 10,
		connectionTimeout: 10, // Connection timeout 10s
		prepare: false,
	});
	return client;
}
