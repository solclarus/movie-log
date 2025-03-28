import { MovieList } from "@/components/movie-list";
import { getPopularMovies } from "@/lib/tmdb";

export default async function Movies() {
  const movies = await getPopularMovies();

  return (
    <div>
      <div className="flex flex-col items-center space-y-8">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}
