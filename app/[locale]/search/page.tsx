import { MovieList } from "@/components/movie-list";
import { MoviePagination } from "@/components/movie-pagination";
import { SearchBox } from "@/components/search-box";
import type { Locale } from "@/i18n/routing";
import { searchMovies } from "@/lib/tmdb";
import { Suspense } from "react";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<{ query?: string; page?: string }>;
};

export default async function Search({ params, searchParams }: Props) {
  const { locale } = await params;
  const { query, page } = (await searchParams) || {};
  const currentPage = page ? Number(page) : 1;
  const { results: movies, total_pages: totalPages } = await searchMovies(
    locale,
    currentPage,
    query || "",
  );

  return (
    <div className="mt-8 flex flex-col items-center space-y-8">
      <SearchBox placeholder={query} />
      <Suspense key={`${query}-${page}`} fallback={"loading..."}>
        <MovieList movies={movies} />
      </Suspense>
      <MoviePagination totalPages={totalPages} />
    </div>
  );
}
