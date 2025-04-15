import { MovieList } from "@/components/movie-list";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getMovie } from "@/lib/tmdb/movie";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function Home() {
	const data = await getMovie.list("now_playing");

	if (!data) {
		return <div>映画が見つかりませんでした</div>;
	}

	const { results: movies } = data;

	return (
		<div className="mt-10 flex flex-col items-center space-y-8">
			<div className=" space-y-2 text-center">
				<h1 className="bg-gradient-to-r from-purple-500 via-red-500 to-amber-500 bg-clip-text font-bold text-6xl text-transparent tracking-tighter">
					{siteConfig.name}
				</h1>
				<p className="text-muted-foreground">{siteConfig.description}</p>
			</div>
			<Button asChild>
				<Link href="/search">
					<Search />
					映画を探す
				</Link>
			</Button>
			<MovieList movies={movies} />
		</div>
	);
}
