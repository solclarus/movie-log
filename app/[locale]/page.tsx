import { MovieList } from "@/components/movie-list";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { getMovieList } from "@/lib/tmdb";
import { Search } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const { results: movies } = await getMovieList("now_playing", locale);

  return (
    <div className="mt-10 flex flex-col items-center space-y-8">
      <div className=" space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-purple-500 via-red-500 to-amber-500 bg-clip-text font-bold text-6xl text-transparent tracking-tighter">
          {siteConfig.name}
        </h1>
        <p className="text-muted-foreground">{siteConfig.description}</p>
      </div>
      <Button asChild>
        <Link href="/search">
          <Search />
          映画を探す
        </Link>
      </Button>
      <MovieList movies={movies} />
    </div>
  );
}
