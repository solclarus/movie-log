import { MovieInfo } from "@/components/movie-info";
import type { MovieDetails } from "@/types/tmdb";
import { ImageOff } from "lucide-react";
import Image from "next/image";

type Props = {
  movie: MovieDetails;
};

export function MovieHero({ movie }: Props) {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-10% from-background via-50% via-background/70 to-90% to-transparent" />
      {movie.poster_path ? (
        <Image
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          fill
          className="object-cover md:hidden"
          priority
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-800 md:hidden">
          <ImageOff size={80} className="text-gray-500" />
        </div>
      )}
      {movie.backdrop_path ? (
        <Image
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          fill
          priority
          className="hidden object-cover md:block"
        />
      ) : (
        <div className="hidden h-full w-full items-center justify-center bg-gray-800 md:flex">
          <ImageOff size={100} className="text-gray-500" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <MovieInfo movie={movie} />
      </div>
    </div>
  );
}
