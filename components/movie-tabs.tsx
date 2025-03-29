import { getMovieCredits, getSimilarMovies } from "@/lib/tmdb";
import type { Cast, Crew, Movie, MovieDetails } from "@/types/tmdb";

import { CastCard } from "@/components/cast-card";
import { MovieList } from "@/components/movie-list";
import {} from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { CrewCard } from "./crew-card";

type Props = {
	movie: MovieDetails;
};

export async function MovieTabs({ movie }: Props) {
	const id = movie.id.toString();
	const credits = await getMovieCredits(id);
	const cast = credits.cast as Cast[];
	const crew = credits.crew as Crew[];
	const similarMovies = (await getSimilarMovies(id)) as Movie[];

	const movieInfo = [
		{
			label: "公開日",
			value: movie.release_date
				? format(movie.release_date, "yyyy/MM/dd")
				: "-",
		},
		{
			label: "製作国",
			value:
				movie.production_countries?.map((country) => country.name).join("・") ||
				"-",
		},
		{
			label: "言語",
			value: movie.spoken_languages?.map((lang) => lang.name).join("・") || "-",
		},
		{
			label: "予算",
			value: movie.budget ? `$${movie.budget.toLocaleString()}` : "-",
		},
		{
			label: "興行収入",
			value: movie.revenue ? `$${movie.revenue.toLocaleString()}` : "-",
		},
	];

	return (
		<Tabs defaultValue="about" className="w-full">
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger value="about">About</TabsTrigger>
				<TabsTrigger value="cast">Cast</TabsTrigger>
				<TabsTrigger value="crew">Crew</TabsTrigger>
				<TabsTrigger value="similar">Similar</TabsTrigger>
			</TabsList>
			<TabsContent value="about" className="space-y-4 pt-4">
				<ul className="space-y-3">
					{movieInfo.map((item) => (
						<li
							key={item.label}
							className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0"
						>
							<span className="text-muted-foreground text-sm">
								{item.label}
							</span>
							<span className="font-medium text-sm">{item.value}</span>
						</li>
					))}
				</ul>
			</TabsContent>
			<TabsContent value="cast" className="space-y-4 pt-4">
				<div className="grid-list">
					{cast.map((person, i) => (
						<CastCard key={`${person.id}-${i}`} cast={person} />
					))}
				</div>
			</TabsContent>
			<TabsContent value="crew" className="space-y-4 pt-4">
				<div className="grid-list">
					{crew.map((person, i) => (
						<CrewCard key={`${person.id}-${i}`} crew={person} />
					))}
				</div>
			</TabsContent>
			<TabsContent value="similar" className="space-y-6 pt-4">
				<MovieList movies={similarMovies} />
			</TabsContent>
		</Tabs>
	);
}
