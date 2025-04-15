import { MovieList } from "@/components/movie-list";
import { MoviePagination } from "@/components/movie-pagination";
import { SearchBox } from "@/components/search-box";
import { searchMovies } from "@/lib/tmdb/search";

type Props = {
	searchParams?: Promise<{ query?: string; page?: string }>;
};

export default async function Search({ searchParams }: Props) {
	const { query, page } = (await searchParams) || {};
	const currentPage = page ? Number(page) : 1;
	const data = await searchMovies(currentPage, query || "");
	if (!data) {
		return <div>Movie not found</div>;
	}
	const { results: movies, total_pages: totalPages } = data;

	return (
		<div className="mt-8 flex flex-col items-center space-y-8">
			<SearchBox placeholder={query} />
			<MovieList movies={movies} />
			<MoviePagination totalPages={totalPages} />
		</div>
	);
}
