import { cache } from "react";

export const baseUrl: string = "https://api.themoviedb.org/3";

const fetchFromTMDB = async (endpoint: string) => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
		},
	};

	try {
		const response = await fetch(`${baseUrl}/${endpoint}`, options);
		if (!response.ok) {
			throw new Error(`HTTPエラー: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("データ取得エラー:", error);
		return null;
	}
};

export const getNowPlayingMovies = cache(async () => {
	const data = await fetchFromTMDB("movie/now_playing");
	return data ? data.results : [];
});

export const getPopularMovies = cache(async () => {
	const data = await fetchFromTMDB("movie/popular");
	return data ? data.results : [];
});

export const getSimilarMovies = cache(async (id: string) => {
	const data = await fetchFromTMDB(`movie/${id}/similar`);
	return data ? data.results : [];
});

export const searchMovies = cache(async (query: string, page: number) => {
	const data = await fetchFromTMDB(
		`search/movie?query=${encodeURIComponent(
			query,
		)}&include_adult=false&language=ja-JP&page=${page}`,
	);
	return data ? data.results : [];
});

export const getMovie = cache(async (id: string) => {
	return await fetchFromTMDB(`movie/${id}`);
});

export const getMovieCredits = cache(async (id: string) => {
	return await fetchFromTMDB(`movie/${id}/credits`);
});

export const countPages = cache(async (query: string) => {
	const { total_pages } = await fetchFromTMDB(
		`search/movie?query=${encodeURIComponent(query)}`,
	);
	return total_pages || 1;
});

export const getReviews = cache(async (id: string) => {
	const data = await fetchFromTMDB(`movie/${id}/reviews`);
	return data ? data.results : [];
});
