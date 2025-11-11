import { getLytxDB, type SiteEvent } from "./db";
type EventParams = {
	site_id: number;
	created_at: string;
	country?: string;
	limit?: number;
};
export type PageStatRecord = {
	id: string;
	event: string;
	client_page_url: string;
	created_at: Date;
	postal: string;
	country: string;

};
export async function getCouponEvents(params: EventParams) {
	const sql = getLytxDB();
	const { site_id, created_at, country, limit } = params;

	const countryFilter = country ? sql`AND country = ${country}` : sql``;
	const limitClause = limit ? sql`LIMIT ${limit}` : sql``;

	const data = await sql<Array<SiteEvent>>`
    SELECT id, event, client_page_url, created_at, postal, city,region,country,referer 
    FROM site_events
    WHERE site_id = ${site_id}
      AND created_at > CAST(${created_at} AS timestamp)
		${countryFilter}
${limitClause}
  `;

	await sql.end();
	return data;
}
