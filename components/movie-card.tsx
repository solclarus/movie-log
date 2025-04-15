import { ImageOff, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
	id: number;
	poster_path: string;
	title: string;
	vote_average?: number;
	roles?: string[];
};

export function MovieCard(props: Props) {
	return (
		<div className="group">
			<Link href={`/movie/${props.id}`} className="block">
				<div className="relative aspect-[2/3] overflow-hidden rounded-md border bg-muted">
					{props.poster_path ? (
						<Image
							alt={props.title}
							src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
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
							{props.vote_average && props.vote_average > 0 && (
								<div className="flex items-center gap-1">
									<Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
									<span className="font-semibold text-sm">
										{props.vote_average.toFixed(1)}
									</span>
								</div>
							)}
							<h2 className="line-clamp-1 text-sm font-bold">{props.title}</h2>
							{props.roles && (
								<p className="line-clamp-1 text-xs">{props.roles.join("・")}</p>
							)}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
