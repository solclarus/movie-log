import { MovieListCard } from "@/components/movie-list-card";
import type { Movie } from "@/types/tmdb";
import { Suspense } from "react";

type Props = {
	movies: Movie[];
};

export function MovieList({ movies }: Props) {
	return (
		<div className="w-full">
			<Suspense fallback={"loading..."}>
				<div className="grid-list">
					{movies.map((movie: Movie) => (
						<MovieListCard key={movie.id} movie={movie} />
					))}
				</div>
			</Suspense>
		</div>
	);
}
