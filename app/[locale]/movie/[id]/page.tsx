import { MovieHero } from "@/components/movie-hero";
import { MovieTabs } from "@/components/movie-tabs";
import { getMovie } from "@/lib/tmdb/movie";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MovieDetail({ params }: Props) {
	const { id } = await params;
	const [movie, credits, recommendations] = await Promise.all([
		getMovie.details(id),
		getMovie.credits(id),
		getMovie.recommendations(id),
	]);

	if (!movie) return null;

	return (
		<>
			<MovieHero movie={movie} />
			{/* <MovieRecordButtons movie={movie} /> */}
			<MovieTabs
				movie={movie}
				credits={credits}
				recommendations={recommendations}
			/>
		</>
	);
}
