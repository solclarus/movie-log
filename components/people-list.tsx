import { PersonCard } from "@/components/person-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Cast, Crew } from "@/types/tmdb";
import { Suspense } from "react";

type Props = {
  people: Cast[] | Crew[];
};

export function PeopleList({ people }: Props) {
  if (people.length === 0) {
    return <div>データが見つかりませんでした</div>;
  }

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="grid-list">
            {Array.from({ length: people.length }).map((_, i) => (
              <Skeleton
                key={`skeleton-${i}-${Date.now()}`}
                className="relative aspect-[2/3] overflow-hidden rounded-md border bg-muted"
              />
            ))}
          </div>
        }
      >
        <div className="grid-list">
          {people.map((person, i) => (
            <PersonCard key={`${person.id}-${i}`} person={person} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
