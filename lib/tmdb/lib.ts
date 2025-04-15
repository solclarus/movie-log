import type { Cast, Crew } from "@/types/tmdb";
import type { MovieCast, MovieCrew } from "@/types/tmdb/person";

export type AggregatedMovie = {
	id: number;
	title: string;
	poster_path: string;
	roles: string[];
	type: "cast" | "crew";
};

export type AggregatedPerson = {
	id: number;
	name: string;
	profile_path: string;
	roles: string[];
	type: "cast" | "crew";
};

export const aggregateMovie = <T extends MovieCast | MovieCrew>(
	movies: T[],
	type: "cast" | "crew",
): AggregatedMovie[] => {
	const movieMap = new Map<number, AggregatedMovie>();

	for (const movie of movies) {
		if (!movie || typeof movie !== "object") continue;

		const role =
			type === "cast"
				? (movie as MovieCast).character
				: (movie as MovieCrew).job;

		if (movieMap.has(movie.id)) {
			const existingMovie = movieMap.get(movie.id);
			if (existingMovie && !existingMovie.roles.includes(role)) {
				existingMovie.roles.push(role);
			}
		} else {
			movieMap.set(movie.id, {
				id: movie.id,
				title: movie.title,
				poster_path: movie.poster_path,
				roles: [role],
				type: type,
			});
		}
	}
	return Array.from(movieMap.values());
};

export const aggregatePerson = <T extends Cast | Crew>(
	people: T[],
	type: "cast" | "crew",
): AggregatedPerson[] => {
	const personMap = new Map<number, AggregatedPerson>();

	for (const person of people) {
		if (!person || typeof person !== "object") continue;

		const role =
			type === "cast" ? (person as Cast).character : (person as Crew).job;

		if (personMap.has(person.id)) {
			const existingPerson = personMap.get(person.id);
			if (existingPerson && !existingPerson.roles.includes(role)) {
				existingPerson.roles.push(role);
			}
		} else {
			personMap.set(person.id, {
				id: person.id,
				name: person.name,
				profile_path: person.profile_path,
				roles: [role],
				type: type,
			});
		}
	}
	return Array.from(personMap.values());
};
