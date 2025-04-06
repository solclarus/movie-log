import type { Cast, Crew } from "@/types/tmdb";
import { ImageOff } from "lucide-react";
import Image from "next/image";

type Props = {
  person: Cast | Crew;
};

export function PersonCard({ person }: Props) {
  const isCast = "character" in person;

  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-md border bg-muted">
      {person.profile_path ? (
        <Image
          alt={person.name}
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          width={200}
          height={300}
          className="h-full w-full rounded-md"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-800">
          <ImageOff size={40} className="text-gray-500" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity active:opacity-100 md:hover:opacity-100">
        <div className="absolute bottom-0 p-3 text-white">
          <h2 className="line-clamp-1 font-bold text-sm">{person.name}</h2>
          <h2 className="line-clamp-1 text-xs">
            {isCast ? person.character : person.job}
          </h2>
        </div>
      </div>
    </div>
  );
}
