import { MovieInfo } from "@/components/movie-info";
import type { MovieDetails } from "@/types/tmdb";
import { ImageOff } from "lucide-react";
import Image from "next/image";

type Props = {
	movie: MovieDetails;
};

export function MovieHero({ movie }: Props) {
	return (
		<div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-t from-background from-10% via-background/70 via-50% to-transparent to-90% z-10" />
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
					className="object-cover hidden md:block"
				/>
			) : (
				<div className="hidden md:flex h-full w-full items-center justify-center bg-gray-800">
					<ImageOff size={100} className="text-gray-500" />
				</div>
			)}
			<MovieInfo movie={movie} />
		</div>
	);
}
