import { PersonCard } from "@/components/person-card";
import type { AggregatedPerson } from "@/lib/tmdb/lib";

type Props = {
	people: AggregatedPerson[];
};

export function PersonList({ people }: Props) {
	if (people.length === 0) {
		return <div>データが見つかりませんでした</div>;
	}

	return (
		<div className="grid-list">
			{people.map((person, i) => (
				<PersonCard key={`${person.id}-${i}`} person={person} />
			))}
		</div>
	);
}
