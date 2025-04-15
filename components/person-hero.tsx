import { getPerson } from "@/lib/tmdb/person";
import { format } from "date-fns";
import {
	CalendarIcon,
	FilmIcon,
	GlobeIcon,
	MapPinIcon,
	UserIcon,
} from "lucide-react";
import Image from "next/image";

type Props = {
	id: string;
};

export const PersonHero = async ({ id }: Props) => {
	const person = await getPerson.details(id);

	if (!person) return null;

	return (
		<div className="mb-12">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="md:col-span-1">
					<div className="rounded-lg overflow-hidden shadow-lg">
						<Image
							src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
							alt={person.name}
							width={500}
							height={750}
							className="w-full h-auto object-cover"
						/>
					</div>
				</div>
				<div className="md:col-span-2">
					<div className="space-y-6">
						<div>
							<h1 className="text-4xl font-bold mb-2">{person.name}</h1>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="flex items-start gap-2">
								<UserIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">職業</p>
									<p>{person.known_for_department}</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CalendarIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">生年月日</p>
									<p>
										{person.birthday
											? format(new Date(person.birthday), "yyyy年M月d日")
											: "-"}
										{person.birthday
											? ` (${Math.floor((new Date().getTime() - new Date(person.birthday).getTime()) / 31557600000)}歳)`
											: ""}
									</p>
								</div>
							</div>

							{person.deathday && (
								<div className="flex items-start gap-2">
									<CalendarIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
									<div>
										<p className="text-sm font-medium">没年月日</p>
										<p>{format(new Date(person.deathday), "yyyy年M月d日")}</p>
									</div>
								</div>
							)}

							<div className="flex items-start gap-2">
								<MapPinIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">出身地</p>
									<p>{person.place_of_birth || "-"}</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<UserIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">性別</p>
									<p>{person.gender}</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<FilmIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">人気度</p>
									<p>{person.popularity.toFixed(1)}</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<GlobeIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">IMDb</p>
									<a
										href={`https://www.imdb.com/name/${person.imdb_id}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline"
									>
										IMDb
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
