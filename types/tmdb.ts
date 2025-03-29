export type Movie = {
	id: number;
	poster_path: string;
	adult: boolean;
	overview: string;
	release_date: string;
	genre_ids: number[];
	original_title: string;
	original_language: string;
	title: string;
	backdrop_path?: string;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
};

export type MovieDetails = {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection?: BelongsToCollection;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path?: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type BelongsToCollection = {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
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

export type Genre = {
	id: number;
	name: string;
};

export type Cast = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
};

export type Crew = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
	department: string;
	job: string;
};

export type Review = {
	author: string;
	author_details: {
		name: string;
		username: string;
		avatar_path: string;
		rating: number;
	};
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
};
