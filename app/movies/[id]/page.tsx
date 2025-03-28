import { Badge } from "@/components/ui/badge";
import { getMovie } from "@/lib/tmdb";
import type { Genre } from "@/types/tmdb";
import { ImageIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetail({ params }: Props) {
  const id = (await params).id;
  const movie = await getMovie(id);

  return (
    <main>
      {movie.backdrop_path ? (
        <div className="relative hidden max-h-[60vh] overflow-hidden rounded-md border md:block">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            width={1920}
            height={1080}
            className="shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
      ) : (
        <div className="relative flex h-[60vh] items-center justify-center rounded-md border bg-gray-600 md:block">
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon size={100} className="text-gray-500" />
          </div>
        </div>
      )}
      <div className="md:container">
        <div className="grid gap-4 md:grid-cols-[auto,1fr] md:gap-10 xl:gap-16">
          <div className="-mt-16 md:-mt-32 lg:-mt-64 relative aspect-[2/3] w-full place-self-start md:w-40 md:overflow-hidden md:rounded-lg md:border md:shadow-lg lg:w-64">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              fill
              className="bg-muted object-cover"
              priority
            />
          </div>
          <div className="mt-4 space-y-4 p-3 md:p-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>
                <Star fill="yellow" className="mr-1 h-3 w-3" />
                {movie.vote_average.toFixed(1)}
              </Badge>
              {movie.genres.map((genre: Genre) => (
                <Link key={genre.id} href={`/search?with_genres=${genre.id}`}>
                  <Badge variant="secondary">{genre.name}</Badge>
                </Link>
              ))}
            </div>
            <h1 className="font-extrabold text-2xl xl:text-4xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-muted-foreground italic xl:text-lg">
                {movie.tagline}
              </p>
            )}
            <p className="text-muted-foreground xl:text-lg">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
