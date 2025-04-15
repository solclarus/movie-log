import type { AggregatedPerson } from "@/lib/tmdb/lib";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
	person: AggregatedPerson;
};

export function PersonCard({ person }: Props) {
	return (
		<div className="group">
			<Link href={`/person/${person.id}`} className="block">
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
							<p className="text-xs whitespace-pre-line">
								{person.roles.join("\n")}
							</p>
							<h2 className="line-clamp-1 font-bold text-sm">{person.name}</h2>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
