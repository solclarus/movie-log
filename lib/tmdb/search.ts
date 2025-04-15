import { createEndpoint, fetchTMDB } from "@/lib/tmdb/utils";
import type { Movie, TMDBListResponse } from "@/types/tmdb";
import { cache } from "react";

export const searchMovies = cache(async (page: number, query: string) => {
	const endpoint = await createEndpoint("search/movie", {
		query,
		page,
		include_adult: false,
	});

	return await fetchTMDB<TMDBListResponse<Movie>>(endpoint);
});
