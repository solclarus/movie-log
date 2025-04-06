import { MovieListCard } from "@/components/movie-list-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Movie } from "@/types/tmdb";
import { Suspense } from "react";

type Props = {
  movies: Movie[];
};

export function MovieList({ movies }: Props) {
  if (movies.length === 0) {
    return <div>映画が見つかりませんでした</div>;
  }

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="grid-list">
            {Array.from({ length: movies.length }).map((_, i) => (
              <Skeleton
                key={`skeleton-${i}-${Date.now()}`}
                className="relative aspect-[2/3] overflow-hidden rounded-md border bg-muted"
              />
            ))}
          </div>
        }
      >
        <div className="grid-list">
          {movies.map((movie: Movie) => (
            <MovieListCard key={movie.id} movie={movie} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
