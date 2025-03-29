import { MovieHero } from "@/components/movie-hero";
import { MovieTabs } from "@/components/movie-tabs";
import { getMovie } from "@/lib/tmdb";
import type { MovieDetails } from "@/types/tmdb";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MovieDetail({ params }: Props) {
	const id = (await params).id;
	const movie = (await getMovie(id)) as MovieDetails;

	return (
		<div>
			<MovieHero movie={movie} />
			<p className="text-muted-foreground mb-6">{movie.overview}</p>
			<MovieTabs movie={movie} />
		</div>
	);
}
