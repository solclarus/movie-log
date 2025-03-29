import { Badge } from "@/components/ui/badge";
import type { MovieDetails } from "@/types/tmdb";
import { format } from "date-fns";
import { ImageOff, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
	movie: MovieDetails;
};

export function MovieInfo({ movie }: Props) {
	return (
		<div className="relative h-full z-20">
			<div className="flex absolute bottom-0 left-0 right-0 gap-3 md:gap-6 flex-col items-center md:items-end md:flex-row p-6">
				<div className="relative w-[200px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg hidden md:block">
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
				<div className="flex flex-col items-center justify-center md:items-start md:justify-end gap-2">
					<h1 className="text-3xl font-extrabold text-center md:text-start">
						{movie.title}
					</h1>
					{movie.tagline && (
						<p className="italic text-muted-foreground text-center md:text-start">
							{movie.tagline}
						</p>
					)}
					<div className="flex flex-wrap items-center justify-center gap-2">
						{movie.vote_average > 0 && (
							<Badge variant={"outline"} className="flex items-center gap-1">
								<Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{" "}
								{movie.vote_average.toFixed(1)}
							</Badge>
						)}
						{movie.release_date && (
							<Badge variant={"outline"}>
								{format(movie.release_date, "yyyy")}
							</Badge>
						)}
						{movie.runtime && (
							<Badge variant={"outline"}>{movie.runtime} min</Badge>
						)}
					</div>
					<div className="flex flex-wrap items-center justify-center gap-2">
						{movie.genres.map((genre) => (
							<Link key={genre.id} href={`/search?with_genres=${genre.id}`}>
								<Badge>{genre.name}</Badge>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
