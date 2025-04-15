import { MovieCard } from "@/components/movie-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { aggregateMovie } from "@/lib/tmdb/lib";
import { getPerson } from "@/lib/tmdb/person";

type Props = {
	id: string;
};

export const Filmography = async ({ id }: Props) => {
	const credits = await getPerson.credits(id);

	if (!credits) return null;

	const hasCast = credits.cast.length > 0;
	const hasCrew = credits.crew.length > 0;

	if (!hasCast && !hasCrew) return null;

	if (hasCast && !hasCrew) {
		const movieCast = aggregateMovie(credits.cast, "cast");
		return (
			<div>
				<h2 className="text-2xl font-semibold mb-4">出演作品</h2>
				<div className="grid-list">
					{movieCast.map((movie) => (
						<MovieCard
							key={movie.id}
							id={movie.id}
							poster_path={movie.poster_path}
							title={movie.title}
							roles={movie.roles}
						/>
					))}
				</div>
			</div>
		);
	}

	if (!hasCast && hasCrew) {
		const movieCrew = aggregateMovie(credits.crew, "crew");
		return (
			<div>
				<h2 className="text-2xl font-semibold mb-4">制作作品</h2>
				<div className="grid-list">
					{movieCrew.map((movie) => (
						<MovieCard
							key={movie.id}
							id={movie.id}
							poster_path={movie.poster_path}
							title={movie.title}
							roles={movie.roles}
						/>
					))}
				</div>
			</div>
		);
	}

	const movieCast = aggregateMovie(credits.cast, "cast");
	const movieCrew = aggregateMovie(credits.crew, "crew");
	return (
		<div>
			<Tabs defaultValue="cast">
				<TabsList className="w-full">
					<TabsTrigger value="cast">出演作品</TabsTrigger>
					<TabsTrigger value="crew">制作作品</TabsTrigger>
				</TabsList>
				<TabsContent value="cast" className="space-y-4 pt-4">
					<div className="grid-list">
						{movieCast.map((movie) => (
							<MovieCard
								key={movie.id}
								id={movie.id}
								poster_path={movie.poster_path}
								title={movie.title}
								roles={movie.roles}
							/>
						))}
					</div>
				</TabsContent>
				<TabsContent value="crew" className="space-y-4 pt-4">
					<div className="grid-list">
						{movieCrew.map((movie) => (
							<MovieCard
								key={movie.id}
								id={movie.id}
								poster_path={movie.poster_path}
								title={movie.title}
								roles={movie.roles}
							/>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};
