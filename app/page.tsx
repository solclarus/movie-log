import { MovieList } from "@/components/movie-list";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getPopularMovies } from "@/lib/tmdb";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const movies = await getPopularMovies();

  return (
    <div className="mt-10 flex flex-col items-center space-y-8">
      <div className=" space-y-2 text-center">
        <h1 className="font-bold text-4xl">{siteConfig.name}</h1>
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
