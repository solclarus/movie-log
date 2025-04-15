import { MoviePagination } from "@/components/movie-pagination";
import { getPerson } from "@/lib/tmdb/person";
import { format } from "date-fns";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
	searchParams?: Promise<{ page?: string }>;
};

export default async function MovieCategory({ searchParams }: Props) {
	const page = (await searchParams)?.page;
	const data = await getPerson.list(Number(page));

	if (!data) {
		redirect("/movie?category=now-playing");
	}

	const { results: people, total_pages: totalPages, dates } = data;

	return (
		<div className="w-full flex flex-col items-center space-y-4">
			{dates && (
				<div className="flex items-center">
					<span className="text-muted-foreground">
						{format(new Date(dates.minimum), "yyyy/MM/dd")} ~{" "}
						{format(new Date(dates.maximum), "yyyy/MM/dd")}
					</span>
				</div>
			)}
			<div className="w-full grid-list">
				{people.map((person, i) => (
					<Link
						key={i}
						className="relative aspect-[2/3] overflow-hidden rounded-md border bg-muted"
						href={`person/${person.id}`}
					>
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
					</Link>
				))}
			</div>
			<MoviePagination totalPages={totalPages} />
		</div>
	);
}
