import { MovieList } from "@/components/movie-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Locale } from "@/i18n/routing";
import { getMovieCredits, getMovieRecommendations } from "@/lib/tmdb";
import type { MovieDetails } from "@/types/tmdb";
import { format } from "date-fns";
import { getLocale, getTranslations } from "next-intl/server";
import { PeopleList } from "./people-list";

type Props = {
  movie: MovieDetails;
};

export async function MovieTabs({ movie }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Movie.Detail");
  const id = movie.id.toString();
  const results = await getMovieCredits(id, locale);

  const { cast, crew } = results ? results : { cast: [], crew: [] };
  const { results: recommendations } = await getMovieRecommendations(
    id,
    locale,
  );

  const movieInfo = [
    {
      label: t("tabs.overview.releaseDate"),
      value: movie.release_date
        ? format(movie.release_date, "yyyy/MM/dd")
        : "-",
    },
    {
      label: t("tabs.overview.runtime"),
      value: movie.runtime ? `${movie.runtime}分` : "-",
    },
    {
      label: t("tabs.overview.productionCompanies"),
      value:
        movie.production_companies?.map((company) => company.name).join("・") ||
        "-",
    },
    {
      label: t("tabs.overview.productionCountries"),
      value:
        movie.production_countries?.map((country) => country.name).join("・") ||
        "-",
    },
    {
      label: t("tabs.overview.languages"),
      value: movie.spoken_languages?.map((lang) => lang.name).join("・") || "-",
    },
    {
      label: t("tabs.overview.budget"),
      value: movie.budget ? `$${movie.budget.toLocaleString()}` : "-",
    },
    {
      label: t("tabs.overview.revenue"),
      value: movie.revenue ? `$${movie.revenue.toLocaleString()}` : "-",
    },
  ];

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="about">{t("tabs.overview.title")}</TabsTrigger>
        <TabsTrigger value="cast">{t("tabs.cast")}</TabsTrigger>
        <TabsTrigger value="crew">{t("tabs.crew")}</TabsTrigger>
        <TabsTrigger value="recommendations">
          {t("tabs.recommendations")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="space-y-4 pt-4">
        <ul className="space-y-3">
          {movieInfo.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-4 border-border/50 border-b pb-2 last:border-0"
            >
              <span className="whitespace-nowrap text-muted-foreground text-sm">
                {item.label}
              </span>
              <span className="ml-auto text-right font-medium text-sm">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="cast" className="space-y-4 pt-4">
        <PeopleList people={cast} />
      </TabsContent>
      <TabsContent value="crew" className="space-y-4 pt-4">
        <PeopleList people={crew} />
      </TabsContent>
      <TabsContent value="recommendations" className="space-y-6 pt-4">
        <MovieList movies={recommendations} />
      </TabsContent>
    </Tabs>
  );
}
