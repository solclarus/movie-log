export * from "@/types/tmdb/credits";
export * from "@/types/tmdb/genres";
export * from "@/types/tmdb/movie";
export * from "@/types/tmdb/reviews";

export type TMDBListResponse<T> = {
	results: T[];
	page: number;
	total_pages: number;
	total_results: number;
	dates?: {
		maximum: string;
		minimum: string;
	};
};

export type ProductionCountry = {
	iso_3166_1: string;
	name: string;
};

export type ProductionCompany = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
};

export type SpokenLanguage = {
	english_name: string;
	iso_639_1: string;
	name: string;
};
