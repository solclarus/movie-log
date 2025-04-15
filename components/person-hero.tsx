import { ReadMore } from "@/components/read-more";
import { getPerson } from "@/lib/tmdb/person";
import { differenceInDays, format } from "date-fns";
import {
	BriefcaseIcon,
	CalendarIcon,
	GlobeIcon,
	ImageOff,
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
					</div>
				</div>
				<div className="md:col-span-2">
					<h1 className="text-4xl font-bold mb-3">{person.name}</h1>

					<div className="grid grid-cols-1 gap-3">
						{person.known_for_department && (
							<div>
								<div className="flex text-muted-foreground  items-center gap-1 mb-1">
									<BriefcaseIcon size={"16"} />
									<p className="text-sm">Job</p>
								</div>
								<p className="text-foreground">{person.known_for_department}</p>
							</div>
						)}

						{person.birthday && (
							<div>
								<div className="flex text-muted-foreground  items-center gap-1 mb-1">
									<UserIcon size={"16"} />
									<p className="text-sm">
										{person.deathday ? "Died Age" : "Age"}
									</p>
								</div>
								<p className="text-foreground">
									{`${Math.floor(differenceInDays(person.deathday ? person.deathday : new Date(), person.birthday) / 365)}歳`}
								</p>
							</div>
						)}

						{person.birthday && (
							<div>
								<div className="flex text-muted-foreground  items-center gap-1 mb-1">
									<CalendarIcon size={"16"} />
									<p className="text-sm">Birth Day</p>
								</div>
								<p className="text-foreground">
									{format(person.birthday, "yyyy年M月d日")}
								</p>
							</div>
						)}

						{person.deathday && (
							<div>
								<div className="flex text-muted-foreground  items-center gap-1 mb-1">
									<CalendarIcon size={"16"} />
									<p className="text-sm">Death Day</p>
								</div>
								<p className="text-foreground">
									{format(person.deathday, "yyyy年M月d日")}
								</p>
							</div>
						)}

						{person.place_of_birth && (
							<div>
								<div className="flex text-muted-foreground  items-center gap-1 mb-1">
									<MapPinIcon size={"16"} />
									<p className="text-sm">Birth Place</p>
								</div>
								<p className="text-foreground">{person.place_of_birth}</p>
							</div>
						)}

						{person.imdb_id && (
							<div>
								<div className="flex text-muted-foreground items-center gap-1 mb-1">
									<GlobeIcon size={"16"} />
									<p className="text-sm">IMDb</p>
								</div>
								<a
									href={`https://www.imdb.com/name/${person.imdb_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									IMDb
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
			{person.biography && <ReadMore text={person.biography} />}
		</div>
	);
};
