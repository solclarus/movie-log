import { createEndpoint, fetchTMDB } from "@/lib/tmdb/utils";
import type { TMDBListResponse } from "@/types/tmdb";
import type { MovieCredits, Person, PersonDetails } from "@/types/tmdb/person";
import { cache } from "react";

export const getPerson = {
	list: cache(async (page = 1) => {
		const endpoint = await createEndpoint("person/popular", {
			page,
		});

		return await fetchTMDB<TMDBListResponse<Person>>(endpoint);
	}),

	details: cache(async (id: string) => {
		const endpoint = await createEndpoint(`person/${id}`);
		return await fetchTMDB<PersonDetails>(endpoint);
	}),

	credits: cache(async (id: string) => {
		const endpoint = await createEndpoint(`person/${id}/movie_credits`);
		return await fetchTMDB<MovieCredits>(endpoint);
	}),
};
