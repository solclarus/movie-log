import { MovieList } from "@/components/movie-list";
import { MoviePagination } from "@/components/movie-pagination";
import { SearchBox } from "@/components/search-box";
import { countPages, searchMovies } from "@/lib/tmdb";
import { Suspense } from "react";

export default async function Search(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await countPages(query);
  const movies = await searchMovies(query, currentPage);

  return (
    <div className="mt-8 flex flex-col items-center space-y-8">
      <SearchBox placeholder={query} />
      <Suspense key={query + currentPage} fallback={"loading..."}>
        {movies.length === 0 && <div>映画が見つかりませんでした</div>}
        <MovieList movies={movies} />
      </Suspense>
      <MoviePagination totalPages={totalPages} />
    </div>
  );
}
