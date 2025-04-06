import { MovieList } from "@/components/movie-list";
import { MoviePagination } from "@/components/movie-pagination";
import type { Locale } from "@/i18n/routing";
import { getMovieList } from "@/lib/tmdb";
import { searchParamsSchema } from "@/schemas/search-params";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<{ category?: string; page?: string }>;
};

export default async function MovieCategory({ params, searchParams }: Props) {
  const t = await getTranslations("Movie.List.search");
  const { locale } = await params;
  const rawParams = (await searchParams) || {};

  if (!rawParams.category) {
    redirect("/movie?category=now-playing");
  }

  const result = searchParamsSchema.safeParse(rawParams);

  if (!result.success) {
    redirect("/movie?category=now-playing");
  }

  const validParams = result.data;

  const {
    results: movies,
    total_pages: totalPages,
    total_results: totalResults,
    dates,
  } = await getMovieList(
    validParams.category.replace(/-/g, "_"),
    locale,
    validParams.page,
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      {dates && (
        <div className="flex items-center">
          <span className="text-muted-foreground">
            {format(new Date(dates.minimum), "yyyy/MM/dd")} ~{" "}
            {format(new Date(dates.maximum), "yyyy/MM/dd")}
          </span>
        </div>
      )}
      <div className="w-full flex-col items-center rounded-md border bg-muted p-4">
        {t("results", { count: totalResults })}
      </div>
      <MovieList movies={movies} />
      <MoviePagination totalPages={totalPages} />
    </div>
  );
}
