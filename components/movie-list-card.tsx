import type { Movie } from "@/types/tmdb";
import { ImageOff, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MovieListCard = (movie: Movie) => {
  return (
    <div role="group">
      <Link href={`/movies/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-md border bg-muted">
          {movie.poster_path ? (
            <Image
              alt={movie.title!}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              width={200}
              height={300}
              className="h-full w-full rounded-md"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-800">
              <ImageOff size={40} className="text-gray-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity hover:opacity-100">
            <div className="absolute bottom-0 p-3 text-white">
              {movie.vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                  <span className="font-semibold text-sm">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
              <h2 className="line-clamp-1 text-sm">{movie.title}</h2>
              {/* {movie.release_date !== "" && (
                <p className="text-xs text-gray-300">
                  {format(movie.release_date, "yyyy")}
                </p>
              )} */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
