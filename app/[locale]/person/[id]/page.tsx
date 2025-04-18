import { Filmography } from "@/components/filmography";
import { PersonHero } from "@/components/person-hero";
import { aggregateMovie } from "@/lib/tmdb/lib";
import { getPerson } from "@/lib/tmdb/person";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function PersonDetail({ params }: Props) {
	const { id } = await params;
	const credits = await getPerson.credits(id);

	if (!credits) return null;

	const hasCast = credits.cast.length > 0;
	const hasCrew = credits.crew.length > 0;

	if (!hasCast && !hasCrew) return null;

	const movieCast = hasCast ? aggregateMovie(credits.cast, "cast") : [];
	const movieCrew = hasCrew ? aggregateMovie(credits.crew, "crew") : [];

	return (
		<div>
			<PersonHero id={id} />
			<Filmography castMovies={movieCast} crewMovies={movieCrew} />
		</div>
	);
}
