import { getMovieCredits, getReviews, getSimilarMovies } from "@/lib/tmdb";
import type { Cast, Movie, MovieDetails, Review } from "@/types/tmdb";

import { CastCard } from "@/components/cast-card";
import { MovieList } from "@/components/movie-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";

type Props = {
	movie: MovieDetails;
};

export async function MovieDetailTabs({ movie }: Props) {
	const id = movie.id.toString();
	const credits = await getMovieCredits(id);
	const cast = credits.cast as Cast[];
	const similarMovies = (await getSimilarMovies(id)) as Movie[];
	const reviews = (await getReviews(id)) as Review[];

	return (
		<Tabs defaultValue="about" className="w-full">
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger value="about">About</TabsTrigger>
				<TabsTrigger value="cast">Cast</TabsTrigger>
				<TabsTrigger value="review">Review</TabsTrigger>
				<TabsTrigger value="similar">Similar</TabsTrigger>
			</TabsList>
			<TabsContent value="about" className="space-y-4 pt-4">
				<div className="grid grid-cols-1 gap-8">
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-semibold mb-3 flex items-center">
								製作情報
							</h3>
							<ul className="space-y-3">
								{[
									{ label: "監督", value: "クリストファー・ノーラン" },
									{ label: "脚本", value: "クリストファー・ノーラン" },
									{
										label: "製作",
										value: "エマ・トーマス, クリストファー・ノーラン",
									},
									{ label: "音楽", value: "ハンス・ジマー" },
									{ label: "撮影", value: "ウォーリー・フィスター" },
								].map((item, i) => (
									<li
										key={`${item.label}-${i}`}
										className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0"
									>
										<span className="text-muted-foreground">{item.label}</span>
										<span className="font-medium text-sm">{item.value}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-semibold mb-3 flex items-center">
								その他
							</h3>
							<ul className="space-y-3">
								{[
									{ label: "公開日", value: "2010年7月16日" },
									{ label: "製作国", value: "アメリカ, イギリス" },
									{ label: "言語", value: "英語, 日本語, フランス語" },
									{ label: "予算", value: "$160,000,000" },
									{ label: "興行収入", value: "$836,836,967" },
								].map((item, i) => (
									<li
										key={`${item.label}-${i}`}
										className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0"
									>
										<span className="text-muted-foreground">{item.label}</span>
										<span className="font-medium text-sm">{item.value}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="cast" className="space-y-4 pt-4">
				<div className="grid-list">
					{cast.map((actor) => (
						<CastCard key={actor.id} cast={actor} />
					))}
				</div>
			</TabsContent>
			<TabsContent value="review" className="space-y-6 pt-4">
				{reviews.map((review) => (
					<div key={review.id} className="border-b pb-4 last:border-0">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<Avatar className="w-8 h-8">
									<AvatarImage
										src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
										alt={review.author}
									/>
									<AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
								</Avatar>
								<span className="font-medium">{review.author}</span>
							</div>
							<div className="flex">
								{Array.from({
									length: Math.round(review.author_details.rating ?? 0),
								}).map((_, i) => (
									<Star
										key={`${review.id}-${i}`}
										className="w-4 h-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
						</div>
						<p className="text-sm text-muted-foreground">{review.content}</p>
					</div>
				))}
			</TabsContent>
			<TabsContent value="similar" className="space-y-6 pt-4">
				<MovieList movies={similarMovies} />
			</TabsContent>
		</Tabs>
	);
}
