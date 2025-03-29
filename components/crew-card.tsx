import type { Crew } from "@/types/tmdb";
import { ImageOff } from "lucide-react";
import Image from "next/image";

type Props = {
	crew: Crew;
};

export function CrewCard({ crew }: Props) {
	return (
		<div className="relative aspect-[2/3] overflow-hidden rounded-md border bg-muted">
			{crew.profile_path ? (
				<Image
					alt={crew.name}
					src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
					width={200}
					height={300}
					className="h-full w-full rounded-md"
				/>
			) : (
				<div className="flex h-full w-full items-center justify-center bg-gray-800">
					<ImageOff size={40} className="text-gray-500" />
				</div>
			)}
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
				<div className="absolute bottom-0 p-3 text-white">
					<h2 className="line-clamp-1 text-sm font-bold">{crew.name}</h2>
					<h2 className="line-clamp-1 text-xs">{crew.job}</h2>
				</div>
			</div>
		</div>
	);
}
