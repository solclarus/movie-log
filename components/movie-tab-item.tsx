import { MovieList } from "@/components/movie-list";
import { PersonList } from "@/components/person-list";
import { aggregatePerson } from "@/lib/tmdb/lib";
import { getMovie } from "@/lib/tmdb/movie";

export const CastTab = async ({ id }: { id: string }) => {
	const data = await getMovie.credits(id);

	if (!data || !data.cast || data.cast.length === 0) return null;

	const cast = aggregatePerson(data.cast, "cast");
	return <PersonList people={cast} />;
};

export const CrewTab = async ({ id }: { id: string }) => {
	const data = await getMovie.credits(id);

	if (!data || !data.crew || data.crew.length === 0) return null;

	const crew = aggregatePerson(data.crew, "crew");
	return <PersonList people={crew} />;
};

export const RecommendationsTab = async ({ id }: { id: string }) => {
	const data = await getMovie.recommendations(id);

	if (!data || !data.results || data.results.length === 0) return null;

	return <MovieList movies={data.results} />;
};
