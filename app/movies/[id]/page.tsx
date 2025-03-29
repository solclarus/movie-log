import { MovieDetailTabs } from "@/components/movie-detail-tabs";
import { Badge } from "@/components/ui/badge";
import { getMovie } from "@/lib/tmdb";
import type { MovieDetails } from "@/types/tmdb";
import { format } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MovieDetail({ params }: Props) {
	const id = (await params).id;
	const movie = (await getMovie(id)) as MovieDetails;

	return (
		<div className="flex flex-col min-h-screen bg-background">
			<div className="relative w-full h-[60vh] rounded-lg overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
				<div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent z-10" />

				<Image
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt={movie.title}
					fill
					className="object-cover"
					priority
				/>
				<div className="relative h-full z-20">
					<div className="flex absolute bottom-0 left-0 right-0 gap-3 md:gap-6 flex-col items-center md:items-end md:flex-row p-6">
						<div className="relative w-[200px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
							<Image
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								fill
								className="object-cover"
							/>
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
							<div className="flex flex-wrap items-center gap-2">
								<Badge variant={"outline"} className="flex items-center gap-1">
									<Star className="ml-1 w-3 h-3 fill-yellow-400 text-yellow-400" />{" "}
									{movie.vote_average.toFixed(1)}
								</Badge>
								<Badge variant={"outline"}>
									{format(movie.release_date, "yyyy")}
								</Badge>
								<Badge variant={"outline"}>{movie.runtime} min</Badge>
							</div>
							<div className="flex flex-wrap items-center gap-2">
								{movie.genres.map((genre) => (
									<Link key={genre.id} href={`/search?with_genres=${genre.id}`}>
										<Badge>{genre.name}</Badge>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<main className="flex-1  w-full px-4 py-6 md:py-8 lg:py-12">
				<div className="gap-8">
					<div className="space-y-8">
						<section>
							<h2 className="text-2xl font-bold mb-4">Overview</h2>
							<p className="text-muted-foreground">{movie.overview}</p>
						</section>
						<MovieDetailTabs movie={movie} />
					</div>
				</div>
			</main>
		</div>
	);
}
