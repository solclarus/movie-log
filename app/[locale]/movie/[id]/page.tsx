import { MovieRecordButtons } from "@/components/buttons";
import { MovieHero } from "@/components/movie-hero";
import { MovieTabs } from "@/components/movie-tabs";
import type { Locale } from "@/i18n/routing";
import { getMovie } from "@/lib/tmdb";
import type { MovieDetails } from "@/types/tmdb";

type Props = {
  params: Promise<{ id: string; locale: Locale }>;
};

export default async function MovieDetail({ params }: Props) {
  const { id, locale } = await params;
  const movie = (await getMovie(id, locale)) as MovieDetails;

  return (
    <div>
      <MovieHero movie={movie} />
      <p className="mb-6 text-muted-foreground">{movie.overview}</p>
      <MovieRecordButtons movie={movie} />
      <MovieTabs movie={movie} />
    </div>
  );
}
