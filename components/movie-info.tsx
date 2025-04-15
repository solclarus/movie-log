import { Badge } from "@/components/ui/badge";
import type { MovieDetails } from "@/types/tmdb";
import { ImageOff, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
	movie: MovieDetails;
};

export function MovieInfo({ movie }: Props) {
	return (
		<div className="absolute inset-x-0 bottom-0 z-20">
			<div className="container mx-auto p-6">
				<div className="flex flex-col items-center md:flex-row md:items-end md:gap-6">
					<div className="relative hidden aspect-[2/3] h-[300px] w-[200px] shrink-0 overflow-hidden rounded-xl shadow-lg md:block">
						{movie.poster_path ? (
							<Image
								alt={movie.title}
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								fill
								className="object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center bg-gray-800">
								<ImageOff size={40} className="text-gray-500" />
							</div>
						)}
					</div>
					<div className="flex flex-col items-center gap-2 md:max-w-[calc(100%-232px)] md:items-start">
						<h1 className="text-center font-extrabold text-3xl md:text-left">
							{movie.title}
						</h1>
						{movie.tagline && (
							<p className="text-center text-muted-foreground italic md:text-left">
								{movie.tagline}
							</p>
						)}
						<div className="flex items-center justify-center md:justify-start">
							{movie.vote_average > 0 && (
								<Badge variant="outline" className="flex items-center gap-1">
									<Star className="fill-yellow-400 text-yellow-400" />
									{movie.vote_average.toFixed(1)}
								</Badge>
							)}
						</div>

						<div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
							{movie.genres.map((genre) => (
								<Link key={genre.id} href={`/search?with_genres=${genre.id}`}>
									<Badge variant="secondary">{genre.name}</Badge>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
