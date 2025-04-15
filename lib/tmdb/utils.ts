import { BASE_URL } from "@/constants/tmdb";
import { getLocale } from "next-intl/server";

export const fetchTMDB = async <T>(endpoint: string): Promise<T | null> => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
		},
	};

	try {
		const url = `${BASE_URL}/${endpoint}`;
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`HTTPエラー: ${response.status}`);
		}
		return (await response.json()) as T;
	} catch (error) {
		console.error("データ取得エラー:", error);
		return null;
	}
};

export const createEndpoint = async (
	path: string,
	params: Record<string, string | number | boolean> = {},
): Promise<string> => {
	const locale = await getLocale();

	const allParams = { language: locale, ...params };

	const queryParams = Object.entries(allParams)
		.map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
		.join("&");

	return `${path}?${queryParams}`;
};
