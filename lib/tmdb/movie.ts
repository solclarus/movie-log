import { createEndpoint, fetchTMDB } from "@/lib/tmdb/utils";
import type {
	Credits,
	Movie,
	MovieDetails,
	Review,
	TMDBListResponse,
} from "@/types/tmdb";
import { cache } from "react";

export const getMovie = {
	list: cache(async (list: string, page = 1, region = "JP") => {
		const endpoint = await createEndpoint(`movie/${list}`, {
			region,
			page,
		});

		return await fetchTMDB<TMDBListResponse<Movie>>(endpoint);
	}),

	recommendations: cache(async (id: string) => {
		const endpoint = await createEndpoint(`movie/${id}/recommendations`);
		return await fetchTMDB<TMDBListResponse<Movie>>(endpoint);
	}),

	similar: cache(async (id: string) => {
		const endpoint = await createEndpoint(`movie/${id}/similar`);
		return await fetchTMDB<TMDBListResponse<Movie>>(endpoint);
	}),

	details: cache(async (id: string) => {
		const endpoint = await createEndpoint(`movie/${id}`);
		return await fetchTMDB<MovieDetails>(endpoint);
	}),

	credits: cache(async (id: string) => {
		const endpoint = await createEndpoint(`movie/${id}/credits`);
		return await fetchTMDB<Credits>(endpoint);
	}),

	reviews: cache(async (id: string) => {
		const endpoint = await createEndpoint(`movie/${id}/reviews`);
		return await fetchTMDB<TMDBListResponse<Review>>(endpoint);
	}),
};
